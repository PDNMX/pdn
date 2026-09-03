/** @vitest-environment jsdom */

import React from 'react'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import axios from 'axios'
import { Busqueda } from '../src/components/Sistema6/BusquedaV2.jsx'

vi.mock('axios', () => ({
  default: vi.fn()
}))

vi.mock('../src/components/Sistema6/SearchControls', () => ({
  default: ({ setInputText, search }) => (
    <div>
      <button onClick={() => setInputText('prueba')}>Escribir frase</button>
      <button onClick={search}>Buscar</button>
    </div>
  )
}))

vi.mock('../src/components/Sistema6/TablaResultados', () => ({
  default: ({ loading, pagination }) => loading
    ? <div role='progressbar'>Cargando</div>
    : <div data-testid='results-table'>Total: {pagination.total}</div>
}))

const renderSearch = () => render(
  <Busqueda dataSupplier='SHCP' classes={{ root: 'root' }} />
)

const mockInitialSuccess = ({ data = [], total = 0 } = {}) => {
  axios
    .mockResolvedValueOnce({ data: [] })
    .mockResolvedValueOnce({
      data: {
        data,
        pagination: { page: 0, pageSize: 10, total }
      }
    })
    .mockResolvedValueOnce({ data: [] })
}

describe('estados del buscador S6', () => {
  afterEach(() => {
    cleanup()
  })

  beforeEach(() => {
    axios.mockReset()
  })

  it('muestra progreso y oculta la tabla si la carga inicial falla', async () => {
    axios.mockRejectedValue({ code: 'ECONNABORTED' })

    renderSearch()

    expect(screen.getByRole('progressbar')).toBeTruthy()
    expect(await screen.findByText(/tardó demasiado en responder/i)).toBeTruthy()
    expect(screen.queryByTestId('results-table')).toBeNull()
    expect(screen.queryByRole('progressbar')).toBeNull()
  })

  it('distingue una respuesta exitosa sin resultados de un error', async () => {
    mockInitialSuccess()

    renderSearch()

    expect(await screen.findByText(/No se encontraron resultados/i)).toBeTruthy()
    expect(screen.queryByTestId('results-table')).toBeNull()
  })

  it('conserva el total y los últimos resultados si una búsqueda posterior falla', async () => {
    mockInitialSuccess({ data: [{ ocid: 'registro-1' }], total: 12 })

    renderSearch()

    expect((await screen.findByTestId('results-table')).textContent).toContain('Total: 12')

    fireEvent.click(screen.getByRole('button', { name: 'Escribir frase' }))
    expect(screen.getByTestId('results-table').textContent).toContain('Total: 12')

    axios.mockRejectedValueOnce({ code: 'ECONNABORTED' })
    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }))

    expect(await screen.findByText(/tardó demasiado en responder/i)).toBeTruthy()
    await waitFor(() => {
      expect(screen.getByTestId('results-table').textContent).toContain('Total: 12')
    })
  })
})
