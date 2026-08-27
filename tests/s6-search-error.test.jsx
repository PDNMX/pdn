/** @vitest-environment jsdom */

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import axios from 'axios'
import theme from '../src/BaseTheme2023.js'
import { ResultadosS6v1 } from '../src/components/HomeV2/Asistente/ResultadosBusqueda/s6/EmpresasTienenContratosGob.jsx'

vi.mock('axios', () => ({
  default: vi.fn()
}))

vi.mock('react-ga4', () => ({
  default: { event: vi.fn() }
}))

describe('errores de búsqueda del asistente S6', () => {
  beforeEach(() => {
    axios.mockRejectedValue({ code: 'ECONNABORTED' })
  })

  it('retira el indicador y muestra el error cuando la API no responde', async () => {
    const data = JSON.stringify({
      'empresas-contratos': {
        supplier: 'SHCP',
        bienServicioOtorgado: '',
        nombreRazonSocial: ''
      }
    })

    render(
      <ThemeProvider theme={theme}>
        <ResultadosS6v1 data={data} />
      </ThemeProvider>
    )

    expect(screen.getByRole('progressbar')).toBeTruthy()
    expect(await screen.findByText(/tardó demasiado en responder/i)).toBeTruthy()

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).toBeNull()
    })
  })
})
