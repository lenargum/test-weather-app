export const CITIES = [
  'Москва',
  'Казань',
  'Новосибирск',
  'Краснодар',
  'Красноярск',
  'Уфа',
] as const

export type City = typeof CITIES[number]