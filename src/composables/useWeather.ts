import { ref } from 'vue'
import type { GeoHit, WeatherResult, HourlyWeather, CurrentWeather, CitySummary, DayForecast } from '@/types'
import { CITIES } from '@/constants'

const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast'

export function useWeather() {
  const loading = ref(true)
  const error = ref<string | null>(null)
  const data = ref<WeatherResult | null>(null)
  const citiesWeather = ref<CitySummary[]>([])
  const citiesLoading = ref(true)

  async function search(city: string) {
    data.value = null
    error.value = null
    if (!city.trim()) {
      error.value = 'Введите город'
      return
    }
    loading.value = true
    try {
      // 1) Геокодинг
      const geoRes = await fetch(
        `${GEOCODE_URL}?name=${encodeURIComponent(city)}&count=1&language=ru&format=json`
      )
      if (!geoRes.ok) throw new Error('Geocoding failed')
      const geoJson = await geoRes.json()
      const hit: GeoHit | undefined = geoJson?.results?.[0]
      if (!hit) throw new Error('Город не найден')

      // 2) Fetch current/hourly AND weekly forecast in parallel
      const currentParams = new URLSearchParams({
        latitude: String(hit.latitude),
        longitude: String(hit.longitude),
        current_weather: 'true',
        current: 'relativehumidity_2m',
        hourly: 'temperature_2m,precipitation,weathercode,windspeed_10m,relativehumidity_2m',
        forecast_days: '1', // Only need today for hourly
        timezone: 'auto'
      })

      const weeklyParams = new URLSearchParams({
        latitude: String(hit.latitude),
        longitude: String(hit.longitude),
        daily: 'temperature_2m_max,weathercode',
        forecast_days: '7',
        timezone: 'auto'
      })

      // Fetch both in parallel for better performance
      const [currentRes, weeklyRes] = await Promise.all([
        fetch(`${WEATHER_URL}?${currentParams.toString()}`),
        fetch(`${WEATHER_URL}?${weeklyParams.toString()}`)
      ])

      if (!currentRes.ok || !weeklyRes.ok) throw new Error('Weather request failed')
      
      const [currentJson, weeklyJson] = await Promise.all([
        currentRes.json(),
        weeklyRes.json()
      ])

      const wJson = currentJson
      const wWeeklyJson = weeklyJson

      const current: CurrentWeather = wJson.current_weather
      const hourly: HourlyWeather = wJson.hourly
      const currentData = wJson.current

      // Get current hour index to find humidity
      const currentHour = new Date(current.time).getHours()
      const currentHumidity = currentData?.relativehumidity_2m?.[0] || 
        hourly.relativehumidity_2m[currentHour]

      // Filter to get hourly data every 3 hours (now only today's data since forecast_days: '1')
      const hourlyData = []
      for (let i = 0; i < hourly.time.length; i += 3) {
        hourlyData.push({
          time: hourly.time[i],
          temperature: hourly.temperature_2m[i],
          precipitation: hourly.precipitation[i],
          weathercode: hourly.weathercode[i],
          windspeed: hourly.windspeed_10m[i],
          humidity: hourly.relativehumidity_2m[i]
        })
      }

      // Process weekly forecast from separate fetch
      const daily = wWeeklyJson.daily
      const weeklyData: DayForecast[] = daily.time.map((date: string, index: number) => {
        const dateObj = new Date(date)
        const weekday = dateObj.toLocaleDateString('ru-RU', { weekday: 'long' })
        
        return {
          date,
          weekday: weekday.charAt(0).toUpperCase() + weekday.slice(1),
          temperature: daily.temperature_2m_max[index],
          weathercode: daily.weathercode[index]
        }
      })

      data.value = {
        place: `${hit.name}, ${hit.country}`,
        current,
        currentHumidity,
        hourly: hourlyData,
        weekly: weeklyData
      }
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  async function fetchAllCities() {
    citiesLoading.value = true
    citiesWeather.value = []

    try {
      const results = await Promise.all(
        CITIES.map(async (city) => {
          try {
            // 1) Geocoding
            const geoRes = await fetch(
              `${GEOCODE_URL}?name=${encodeURIComponent(city)}&count=1&language=ru&format=json`
            )
            if (!geoRes.ok) return null
            const geoJson = await geoRes.json()
            const hit = geoJson?.results?.[0]
            if (!hit) return null

            // 2) Weather for this city
            const params = new URLSearchParams({
              latitude: String(hit.latitude),
              longitude: String(hit.longitude),
              current_weather: 'true',
              current: 'relativehumidity_2m',
              timezone: 'auto'
            })

            const wRes = await fetch(`${WEATHER_URL}?${params.toString()}`)
            if (!wRes.ok) return null
            const wJson = await wRes.json()

            return {
              city,
              temperature: wJson.current_weather.temperature,
              weathercode: wJson.current_weather.weathercode,
              humidity: wJson.current?.relativehumidity_2m?.[0] || 0
            } as CitySummary
          } catch {
            return null
          }
        })
      )

      // Filter out failed requests
      citiesWeather.value = results.filter((r): r is CitySummary => r !== null)
    } catch (e: unknown) {
      console.error('Error fetching all cities:', e)
    } finally {
      citiesLoading.value = false
    }
  }

  return { 
    loading, 
    error, 
    data, 
    search,
    citiesWeather,
    citiesLoading,
    fetchAllCities
  }
}
