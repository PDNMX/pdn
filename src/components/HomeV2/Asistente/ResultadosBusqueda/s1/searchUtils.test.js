import { describe, expect, it } from 'vitest'

import {
  buildSearchQuery,
  normalizeRequestError,
  providerFromSettledResult
} from './searchUtils'

const provider = {
  supplier_id: 'SFP',
  supplier_name: 'Secretaría de la Función Pública',
  status: 'ACTIVE',
  finding: true
}

describe('buildSearchQuery', () => {
  it('separa el ente público del empleo y normaliza campos faltantes', () => {
    const query = buildSearchQuery({
      nombres: ' Jonathan ',
      nombreEntePublico: ' Comisión Federal de Electricidad ',
      empleoCargoComision: ' Ayudante técnico '
    })

    expect(query.nombres).toBe('Jonathan')
    expect(query.nombreEntePublico).toBe('Comisión Federal de Electricidad')
    expect(query.empleoCargoComision).toBe('Ayudante técnico')
    expect(query.primerApellido).toBe('')
  })
})

describe('providerFromSettledResult', () => {
  it('conserva una respuesta exitosa', () => {
    const result = providerFromSettledResult(provider, {
      status: 'fulfilled',
      value: {
        data: {
          pagination: { totalRows: 3, page: 1 },
          results: [{ id: 'declaracion-1' }]
        }
      }
    })

    expect(result.estatus).toBe(true)
    expect(result.total).toBe(3)
    expect(result.data).toHaveLength(1)
    expect(result.error).toBeUndefined()
  })

  it('convierte un rechazo HTTP en error del proveedor sin lanzar excepción', () => {
    const result = providerFromSettledResult(provider, {
      status: 'rejected',
      reason: { response: { status: 504, statusText: 'Gateway Timeout' } }
    })

    expect(result.finding).toBe(false)
    expect(result.total).toBe(0)
    expect(result.error).toEqual({ status: 504, statusText: 'Gateway Timeout' })
  })

  it('tolera errores de red sin response', () => {
    const result = providerFromSettledResult(provider, {
      status: 'rejected',
      reason: new TypeError('Network Error')
    })

    expect(result.error.status).toBe(0)
    expect(result.error.statusText).toContain('conexión')
  })
})

describe('normalizeRequestError', () => {
  it('identifica el timeout configurado en Axios', () => {
    expect(normalizeRequestError({ code: 'ECONNABORTED' })).toEqual({
      status: 408,
      statusText: 'Tiempo de espera agotado'
    })
  })
})
