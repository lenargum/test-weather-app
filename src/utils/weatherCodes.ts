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
  99: 'Гроза'
}

export function getWeatherDescription(code: number): string {
  return weatherDescriptions[code] || 'Неизвестно'
}

export function getTimeOfDay(hour: number): string {
  if (hour >= 0 && hour < 6) return 'Ночь'
  if (hour >= 6 && hour < 12) return 'Утро'
  if (hour >= 12 && hour < 18) return 'День'
  return 'Вечер'
}