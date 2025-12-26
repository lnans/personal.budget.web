import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Decodes a JWT token and returns the payload
 * @param token - The JWT token string
 * @returns The decoded payload or null if invalid
 */
function decodeJwt(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      return null
    }

    const payload = parts[1]
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(decoded) as Record<string, unknown>
  } catch {
    return null
  }
}

/**
 * Gets the expiration time from a JWT token
 * @param token - The JWT token string
 * @returns The expiration date or null if invalid/not found
 */
export function getTokenExpiration(token: string | null): Date | null {
  if (!token) {
    return null
  }

  const payload = decodeJwt(token)
  if (!payload || typeof payload.exp !== 'number') {
    return null
  }

  // exp is in seconds, Date constructor expects milliseconds
  return new Date(payload.exp * 1000)
}

/**
 * Checks if a JWT token is expired
 * @param token - The JWT token string
 * @returns true if expired or invalid, false if still valid
 */
export function isTokenExpired(token: string | null): boolean {
  const exp = getTokenExpiration(token)
  if (!exp) {
    return true
  }

  return Date.now() >= exp.getTime()
}
