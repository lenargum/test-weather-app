export type GeoHit = {
  name: string
  country: string
  latitude: number
  longitude: number
}

// Base weather data
export type BaseWeather = {
  temperature: number
  weathercode: number
}

// Extended weather types
export type CurrentWeather = BaseWeather & {
  windspeed: number
  winddirection: number
  time: string
}

export type HourlyWeather = {
  time: string[]
  temperature_2m: number[]
  precipitation: number[]
  weathercode: number[]
  windspeed_10m: number[]
  relative_humidity_2m: number[]
}

export type HourlyItem = BaseWeather & {
  time: string
  precipitation: number
  windspeed: number
  humidity: number
}

export type DayForecast = BaseWeather & {
  date: string
  weekday: string
  weekdayShort: string
}

export type WeatherResult = {
  place: string
  current: CurrentWeather
  currentHumidity?: number
  hourly: HourlyItem[]
  weekly: DayForecast[]
}

export type CitySummary = BaseWeather & {
  city: string
  humidity: number
}
