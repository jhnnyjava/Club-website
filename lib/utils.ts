import crypto from 'crypto'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes without conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate a secure random token
 */
export function generateToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex')
}

/**
 * Generate idempotency key
 */
export function generateIdempotencyKey(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex')
}

/**
 * Format currency
 */
export function formatCurrency(amount: number, currency: string = 'KES'): string {
  return `${currency} ${amount.toLocaleString('en-KE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  // Format as +254 712 345 678
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.startsWith('254')) {
    return `+254 ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`
  }
  return phone
}

/**
 * Calculate membership expiry date
 */
export function calculateExpiryDate(startDate: Date, durationDays: number = 30): Date {
  const expiry = new Date(startDate)
  expiry.setDate(expiry.getDate() + durationDays)
  return expiry
}

/**
 * Check if membership is expiring soon (within X days)
 */
export function isExpiringSoon(expiryDate: Date, daysThreshold: number = 30): boolean {
  const now = new Date()
  const daysUntilExpiry = Math.ceil(
    (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  )
  return daysUntilExpiry <= daysThreshold && daysUntilExpiry > 0
}

/**
 * Check if membership is expired
 */
export function isExpired(expiryDate: Date): boolean {
  return new Date() > expiryDate
}

/**
 * Get days until expiry
 */
export function getDaysUntilExpiry(expiryDate: Date): number {
  const now = new Date()
  const days = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return days > 0 ? days : 0
}

/**
 * Validate phone number (Kenyan format)
 */
export function isValidKenyanPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '')
  // Valid formats: 0712345678, 712345678, 254712345678
  return /^(0|254)?[71]\d{8}$/.test(cleaned)
}

/**
 * Sanitize user input
 */
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '')
}

/**
 * Generate receipt number
 */
export function generateReceiptNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = crypto.randomBytes(3).toString('hex').toUpperCase()
  return `ICE-${timestamp}-${random}`
}

/**
 * Hash data (for comparison, not passwords)
 */
export function hashData(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex')
}

/**
 * Sleep/delay utility
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Retry with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error | undefined

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      if (i < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, i)
        await sleep(delay)
      }
    }
  }

  throw lastError
}
