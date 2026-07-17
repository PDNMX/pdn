import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  checkProviderAvailability,
  fetchProviders,
  searchInProvider
} from '../src/components/Sistema3-v2/utils/api.js'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('API del Sistema 3', () => {
  it('valida la respuesta de proveedores', async () => {
    const providers = [{ id: 'sesna' }]
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true, data: providers })
    })
    vi.stubGlobal('fetch', fetchMock)

    await expect(fetchProviders('https://api.example')).resolves.toEqual(providers)
    expect(fetchMock).toHaveBeenCalledWith('https://api.example/api/v1/providers')
  })

  it('rechaza respuestas con un contrato inválido', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true, data: null })
    }))

    await expect(fetchProviders('https://api.example')).rejects.toThrow('Formato de datos inválido')
  })

  it('construye la búsqueda paginada y conserva el identificador del proveedor', async () => {
    const providerData = { pagination: { totalItems: 1 }, data: [{ id: 1 }] }
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(providerData)
    })
    vi.stubGlobal('fetch', fetchMock)

    await expect(searchInProvider(
      'https://api.example',
      'faltas',
      'proveedor 1',
      { nombre: { _icontains: 'Ana' } },
      2,
      10
    )).resolves.toEqual({ providerId: 'proveedor 1', providerData })

    const url = new URL(fetchMock.mock.calls[0][0])
    expect(url.pathname).toBe('/api/v1/faltas/proveedor%201')
    expect(url.searchParams.get('page')).toBe('2')
    expect(url.searchParams.get('limit')).toBe('10')
    expect(JSON.parse(url.searchParams.get('filter'))).toEqual({ nombre: { _icontains: 'Ana' } })
  })

  it('trata una falla de red como proveedor no disponible', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))

    await expect(checkProviderAvailability('https://api.example', 'faltas', 'sesna'))
      .resolves.toEqual({ providerId: 'sesna', available: false })
  })
})
