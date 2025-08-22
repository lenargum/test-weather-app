export type GeoHit = {
    name: string
    country: string
    latitude: number
    longitude: number
  }
  
  export type CurrentWeather = {
    temperature: number
    windspeed: number
    winddirection: number
    weathercode: number
    time: string
  }
  
  export type HourlyWeather = {
    time: string[]
    temperature_2m: number[]
    precipitation: number[]
    weathercode: number[]
    windspeed_10m: number[]
    relativehumidity_2m: number[]
  }
  
  export type DayForecast = {
    date: string
    weekday: string
    temperature: number
    weathercode: number
  }

  export type WeatherResult = {
    place: string
    current: CurrentWeather
    currentHumidity?: number
    hourly: Array<{
      time: string
      temperature: number
      precipitation: number
      weathercode: number
      windspeed: number
      humidity: number
    }>
    weekly: DayForecast[]
  }
  
  export type CitySummary = {
    city: string
    temperature: number
    weathercode: number
    humidity: number
  }
  