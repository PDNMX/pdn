/** @vitest-environment jsdom */

import React, { act } from 'react'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import theme from '../src/BaseTheme2023.js'
import Busqueda from '../src/components/Sistema1/Busqueda.jsx'
import Intereses from '../src/components/Sistema1/Intereses.jsx'

const { get, post } = vi.hoisted(() => ({ get: vi.fn(), post: vi.fn() }))

vi.mock('axios', () => ({
  default: { get, post }
}))

vi.mock('react-ga4', () => ({
  default: {
    initialize: vi.fn(),
    send: vi.fn(),
    event: vi.fn()
  }
}))

const s1Provider = overrides => ({
  supplier_id: 'EDOMEX',
  supplier_name: 'Secretaría Ejecutiva del Sistema Estatal Anticorrupción del Estado México',
  system_id: 1,
  type: 'REST',
  status: 'ACTIVE',
  levels: ['estatal'],
  url: '',
  entities_url: '',
  token_url: '',
  username: '',
  password: '',
  client_id: '',
  client_secret: '',
  method: 'body',
  ...overrides
})

const providersResponse = [s1Provider()]

const renderBusqueda = async ({ waitForProviders = true } = {}) => {
  const ref = React.createRef()

  render(
    <ThemeProvider theme={theme}>
      <Busqueda ref={ref} />
    </ThemeProvider>
  )

  // The provider catalog is loaded on mount. handlerFind() ignores the click
  // until it is available.
  if (waitForProviders) {
    await waitFor(() => expect(ref.current.state.providers.length).toBeGreaterThan(1))
  }

  return ref
}

beforeEach(() => {
  vi.stubEnv('REACT_APP_S1_BACKEND', 'http://backend')

  get.mockReset()
  post.mockReset()

  get.mockImplementation(url => {
    if (String(url).endsWith('/providers')) {
      return Promise.resolve({ data: providersResponse })
    }

    return Promise.resolve({ data: [] })
  })
})

afterEach(() => {
  cleanup()
  vi.unstubAllEnvs()
})

describe('búsqueda del Sistema 1', () => {
  it('envía la paginación inicial en la primera búsqueda', async () => {
    post.mockResolvedValue({
      data: { pagination: { page: 1, pageSize: 10, totalRows: 0 }, results: [] }
    })

    const ref = await renderBusqueda()

    await act(async () => {
      ref.current.handlerFind()
    })

    await waitFor(() => expect(post).toHaveBeenCalledTimes(1))

    const [url, payload] = post.mock.calls[0]
    expect(url).toBe('http://backend/search')
    expect(payload).toMatchObject({ page: 1, pageSize: 10, supplier_id: 'EDOMEX' })

    await waitFor(() => expect(ref.current.state.btnSearch).toBe(false))

    expect(screen.getByText(providersResponse[0].supplier_name)).toBeTruthy()
  })

  it('resuelve el proveedor y reactiva el botón cuando falla la red', async () => {
    post.mockRejectedValue(new Error('Network Error'))

    const ref = await renderBusqueda()

    await act(async () => {
      ref.current.handlerFind()
    })

    await waitFor(() => expect(ref.current.state.prov[0].finding).toBe(false))

    expect(ref.current.state.prov[0].estatus).toBe(false)
    expect(ref.current.state.prov[0].error.statusText).toBe('Network Error')
    expect(ref.current.state.btnSearch).toBe(false)
  })
})

describe('proveedores del Sistema 1', () => {
  it('solicita la lista de proveedores y agrega el proveedor "Todos"', async () => {
    const ref = await renderBusqueda()

    expect(get).toHaveBeenCalledWith('http://backend/providers')
    expect(ref.current.state.providers).toEqual([
      { supplier_id: 0, supplier_name: 'Todos' },
      ...providersResponse
    ])
    expect(ref.current.state.providersError).toBe(false)
  })

  it('consulta solo a los proveedores activos', async () => {
    get.mockImplementation(url => {
      if (String(url).endsWith('/providers')) {
        return Promise.resolve({
          data: [
            s1Provider(),
            s1Provider({
              supplier_id: 'S2',
              supplier_name: 'En mantenimiento',
              status: 'MANTENIMENT'
            })
          ]
        })
      }

      return Promise.resolve({ data: [] })
    })

    post.mockResolvedValue({
      data: { pagination: { page: 1, pageSize: 10, totalRows: 3 }, results: [] }
    })

    const ref = await renderBusqueda()

    await act(async () => {
      ref.current.handlerFind()
    })

    await waitFor(() => expect(ref.current.state.btnSearch).toBe(false))

    expect(post.mock.calls.map(([, payload]) => payload.supplier_id)).toEqual(['EDOMEX'])
    expect(ref.current.state.prov.find(p => p.supplier_id === 'S2').estatus).toBe(true)
  })

  it('muestra una advertencia cuando falla la solicitud de proveedores', async () => {
    get.mockImplementation(url => {
      if (String(url).endsWith('/providers')) {
        return Promise.reject(new Error('Network Error'))
      }

      return Promise.resolve({ data: [] })
    })

    const ref = await renderBusqueda({ waitForProviders: false })

    await waitFor(() => expect(ref.current.state.providersError).toBe(true))

    expect(ref.current.state.providers).toEqual([])
    expect(screen.getByText('No se logró cargar la lista de proveedores. Por favor intenta recargar la página.')).toBeTruthy()
  })
})

describe('declaración de intereses', () => {
  it('no falla cuando la respuesta no incluye secciones', () => {
    render(
      <ThemeProvider theme={theme}>
        <Intereses data={{}} value={0} setValue={() => {}} />
      </ThemeProvider>
    )

    expect(screen.getByText('1. PARTICIPACIÓN EN EMPRESAS, SOCIEDADES O ASOCIACIONES (HASTA LOS 2 ÚLTIMOS AÑOS)')).toBeTruthy()
  })
})
