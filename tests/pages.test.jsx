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
