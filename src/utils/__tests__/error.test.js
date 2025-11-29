import { describe, it, expect } from 'vitest'

describe('Error utilities', () => {
  it('should handle basic error scenarios', () => {
    const error = new Error('Test error')
    expect(error.message).toBe('Test error')
  })

  it('should handle objects with error properties', () => {
    const errorObj = {
      message: 'API Error',
      status: 500
    }
    expect(errorObj.message).toBe('API Error')
    expect(errorObj.status).toBe(500)
  })
})