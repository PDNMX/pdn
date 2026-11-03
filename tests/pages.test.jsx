/** @vitest-environment jsdom */

import React, { act } from 'react'
import { cleanup, render } from '@testing-library/react'
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('react-ga4', () => ({
  default: {
    initialize: vi.fn(),
    send: vi.fn(),
    event: vi.fn()
  }
}))

vi.mock('../src/components/HomeV2/AnimatedCanvas.jsx', () => ({
  default: () => <canvas />
}))

vi.mock('axios', async importOriginal => {
  const axios = await importOriginal()
  const original = axios.default

  const mockedResponse = url => {
    const target = String(url)

    // Sistema 1 requests its provider catalog and its select catalogs on
    // mount. Keep the route smoke test offline.
    if (
      target.endsWith('/providers') ||
      target.startsWith('https://raw.githubusercontent.com/PDNMX/catalogos/')
    ) {
      return { data: [] }
    }

    // Contrataciones (Sistema 6) loads its catalogs and an initial search on
    // mount.
    if (target.endsWith('/api/v1/buyers') || target.endsWith('/api/v1/cycles')) {
      return { data: [] }
    }

    // Servidores (Sistema 2) loads its institution catalog on mount. The
    // component reads `entities[0].error`, so the mock cannot be an empty
    // array.
    if (target.endsWith('/api/v1/entities')) {
      return { data: [{ supplier_id: 'ANY', clave: 'ANY', id: 'ANY', nombre: 'Todas' }] }
    }

    // Both Sistema 2 and Sistema 6 search through `/api/v1/search`, but read
    // different properties from the response.
    if (target.endsWith('/api/v1/search')) {
      return {
        data: {
          data: [],
          results: [],
          pagination: { page: 0, pageSize: 10, total: 0, totalRows: 0 }
        }
      }
    }

    // Servidores (Sistema 2) summary.
    if (target.endsWith('/api/v1/summary')) {
      return { data: [] }
    }

    return null
  }

  // Keep the callable axios(config) form used by some components.
  const axiosMock = vi.fn(config => {
    const response = mockedResponse(config?.url)

    return response ? Promise.resolve(response) : original(config)
  })
  Object.assign(axiosMock, original)

  axiosMock.get = vi.fn((url, config) => {
    const response = mockedResponse(url)

    return response ? Promise.resolve(response) : original.get(url, config)
  })

  return {
    ...axios,
    default: axiosMock
  }
})

import App from '../src/App.jsx'
import pdnRoutes from '../src/routes/index.js'

const consoleMessages = []
let warnSpy
let errorSpy

beforeAll(() => {
  class Observer {
    observe () {}
    unobserve () {}
    disconnect () {}
  }

  vi.stubGlobal('IntersectionObserver', Observer)
  vi.stubGlobal('ResizeObserver', Observer)
  vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})))
  globalThis.IS_REACT_ACT_ENVIRONMENT = true

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))
  })

  window.scrollTo = vi.fn()
  HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
    fillRect: vi.fn(),
    fillText: vi.fn(),
    measureText: () => ({ width: 0 }),
    fillStyle: ''
  }))
})

beforeEach(() => {
  consoleMessages.length = 0
  warnSpy = vi.spyOn(console, 'warn').mockImplementation((...args) => {
    consoleMessages.push(`warn: ${args.map(String).join(' ')}`)
  })
  errorSpy = vi.spyOn(console, 'error').mockImplementation((...args) => {
    consoleMessages.push(`error: ${args.map(String).join(' ')}`)
  })
})

afterEach(() => {
  cleanup()
  warnSpy.mockRestore()
  errorSpy.mockRestore()
})

const pagePath = path => (path === '/cobertura/:id_estado' ? '/cobertura/aguascalientes' : path)

describe.each(pdnRoutes.map(route => [route.path, pagePath(route.path)]))(
  'página %s',
  (_routePath, path) => {
    it('carga sin warnings ni errores de consola', async () => {
      window.history.replaceState({}, '', path)

      render(<App />)

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 50))
      })

      expect(consoleMessages).toEqual([])
    })
  }
)
