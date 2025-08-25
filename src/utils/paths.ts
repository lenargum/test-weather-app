/**
 * Generate a public asset path that works in both development and production
 * @param path - The asset path relative to public directory (without leading slash)
 * @returns Full path including base URL
 */
export function getPublicPath(path: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  // Use Vite's BASE_URL which is '/' in dev and '/test-weather-app/' in production
  const base = import.meta.env.BASE_URL
  
  return `${base}${cleanPath}`
}

/**
 * Generate path for weather icon
 * @param iconName - Name of the icon file (without extension)
 * @returns Full path to the icon
 */
export function getIconPath(iconName: string): string {
  return getPublicPath(`icons/${iconName}.svg`)
}