import { describe, expect, it } from 'vitest'

import { getS6ErrorMessage, S6_REQUEST_TIMEOUT_MS } from './api'

describe('manejo de errores del servicio S6', () => {
  it('configura un tiempo de espera finito', () => {
    expect(S6_REQUEST_TIMEOUT_MS).toBeGreaterThan(0)
  })

  it('explica cuando se agotó el tiempo de espera', () => {
    expect(getS6ErrorMessage({ code: 'ECONNABORTED' })).toContain('tardó demasiado')
  })

  it('explica cuando el gateway no está disponible', () => {
    expect(getS6ErrorMessage({ response: { status: 502 } })).toContain('no está disponible')
  })

  it('tolera errores de red sin respuesta HTTP', () => {
    expect(getS6ErrorMessage(new TypeError('Network Error'))).toContain('No fue posible')
  })
})
