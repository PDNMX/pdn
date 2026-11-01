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

const renderBusqueda = async () => {
  const ref = React.createRef()

  render(
    <ThemeProvider theme={theme}>
      <Busqueda ref={ref} />
    </ThemeProvider>
  )

  // The provider catalog is loaded on mount. handlerFind() ignores the click
  // until it is available.
  await waitFor(() => expect(ref.current.state.providers).toHaveLength(2))

  return ref
}

beforeEach(() => {
  vi.stubEnv('REACT_APP_S1_BACKEND', 'http://backend')

  get.mockReset()
  post.mockReset()

  get.mockImplementation(url => {
    if (String(url).endsWith('/providers')) {
      return Promise.resolve({
        data: [{ supplier_id: 'S1', supplier_name: 'Proveedor', status: 'ACTIVE', levels: [] }]
      })
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
    expect(payload).toMatchObject({ page: 1, pageSize: 10, supplier_id: 'S1' })

    await waitFor(() => expect(ref.current.state.btnSearch).toBe(false))
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
