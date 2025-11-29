import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers)

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock environment variables
Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_AUTH0_DOMAIN: 'dev-da7140knihpb0sue.us.auth0.com',
    VITE_AUTH0_CLIENT_ID: 'test-client-id',
    VITE_AUTH0_AUDIENCE: 'https://api.qr_g1.com',
    VITE_AUTH0_REDIRECT_URI: 'http://localhost:5173/admin',
    VITE_API_URL: 'http://localhost:3001',
    VITE_LOOKER_REQUEST: 'https://test-looker.com',
    VITE_LOOKER_PAGES: 'https://test-looker.com'
  }
})