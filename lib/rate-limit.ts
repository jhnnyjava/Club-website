// Simple in-memory rate limiter
// For production, use Redis or a similar solution

interface RateLimitStore {
  [key: string]: {
    count: number
    resetAt: number
  }
}

const store: RateLimitStore = {}

export class RateLimiter {
  private windowMs: number
  private maxRequests: number

  constructor(windowMs: number = 60000, maxRequests: number = 10) {
    this.windowMs = windowMs
    this.maxRequests = maxRequests
  }

  check(identifier: string): { allowed: boolean; remaining: number; resetAt: number } {
    const now = Date.now()
    const key = `ratelimit:${identifier}`

    if (!store[key] || store[key].resetAt < now) {
      store[key] = {
        count: 1,
        resetAt: now + this.windowMs,
      }
      return {
        allowed: true,
        remaining: this.maxRequests - 1,
        resetAt: store[key].resetAt,
      }
    }

    store[key].count++

    if (store[key].count > this.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: store[key].resetAt,
      }
    }

    return {
      allowed: true,
      remaining: this.maxRequests - store[key].count,
      resetAt: store[key].resetAt,
    }
  }

  reset(identifier: string): void {
    delete store[`ratelimit:${identifier}`]
  }

  // Clean up expired entries periodically
  cleanup(): void {
    const now = Date.now()
    Object.keys(store).forEach((key) => {
      if (store[key].resetAt < now) {
        delete store[key]
      }
    })
  }
}

export const rateLimiter = new RateLimiter(
  parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'),
  parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10')
)

// Run cleanup every 5 minutes
if (typeof window === 'undefined') {
  setInterval(() => {
    rateLimiter.cleanup()
  }, 5 * 60 * 1000)
}
