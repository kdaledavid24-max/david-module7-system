/**
 * Utility to resolve static asset paths according to Vite's configured base URL.
 * Ensures asset URLs work both locally (dev) and on GitHub Pages (production).
 */
export const getAssetUrl = (path) => {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path
  }

  const base = import.meta.env?.BASE_URL || '/'
  const cleanBase = base.endsWith('/') ? base : `${base}/`

  // If already prefixed with base URL, return as is
  if (cleanBase !== '/' && path.startsWith(cleanBase)) {
    return path
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${cleanBase}${cleanPath}`
}
