export const weatherDescriptions: Record<number, string> = {
  0: 'Солнечно',
  1: 'Солнечно',
  2: 'Облачно',
  3: 'Облачно',
  45: 'Туман',
  48: 'Изморозь',
  51: 'Морось',
  53: 'Морось',
  55: 'Морось',
  56: 'Морось',
  57: 'Морось',
  61: 'Дождь',
  63: 'Дождь',
  65: 'Дождь',
  66: 'Дождь',
  67: 'Дождь',
  71: 'Снег',
  73: 'Снег',
  75: 'Снег',
  77: 'Снег',
  80: 'Ливень',
  81: 'Ливень',
  82: 'Ливень',
  85: 'Снегопад',
  86: 'Снегопад',
  95: 'Гроза',
  96: 'Гроза',
  99: 'Гроза',
}

export type WeatherIconType = 'sunny' | 'cloudy' | 'rainy' | 'windy'

export const weatherIconMapping: Record<number, WeatherIconType> = {
  0: 'sunny',
  1: 'cloudy',
  2: 'cloudy', 
  3: 'cloudy',
  45: 'cloudy',
  48: 'cloudy',
  51: 'rainy',
  53: 'rainy',
  55: 'rainy',
  56: 'rainy',
  57: 'rainy',
  61: 'rainy',
  63: 'rainy',
  65: 'rainy',
  66: 'rainy',
  67: 'rainy',
  71: 'rainy',
  73: 'rainy',
  75: 'rainy',
  77: 'rainy',
  80: 'rainy',
  81: 'rainy',
  82: 'rainy',
  85: 'rainy',
  86: 'rainy',
  95: 'rainy',
  96: 'rainy',
  99: 'rainy',
}

export function getWeatherDescription(code: number): string {
  return weatherDescriptions[code] || 'Неизвестно'
}

export function getWeatherIcon(code: number): WeatherIconType {
  return weatherIconMapping[code] || 'windy'
}

export function getWeatherIconPath(code: number): string {
  const iconType = getWeatherIcon(code)
  return `/icons/${iconType}.svg`
}

export function getWeatherIconAlt(code: number): string {
  const iconType = getWeatherIcon(code)
  const altMapping: Record<WeatherIconType, string> = {
    sunny: 'Солнечно',
    cloudy: 'Облачно',
    rainy: 'Дождь',
    windy: 'Ветрено'
  }
  return altMapping[iconType]
}

export function getTimeOfDay(hour: number): string {
  if (hour >= 0 && hour < 6) return 'Ночь'
  if (hour >= 6 && hour < 12) return 'Утро'
  if (hour >= 12 && hour < 18) return 'День'
  return 'Вечер'
}
