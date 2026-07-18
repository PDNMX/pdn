/** @vitest-environment jsdom */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { describe, expect, it, vi } from 'vitest'

import theme from '../src/BaseTheme2023.js'
import Declaraciones from '../src/components/Sistema1/index.jsx'

vi.mock('../src/routes/index.js', () => ({
  default: [{ path: '/declaraciones', name: 'Declaraciones' }]
}))

vi.mock('../src/components/HomeV2/HeaderV2.jsx', () => ({
  default: () => null
}))

vi.mock('../src/components/Sistema1/Busqueda.jsx', () => ({
  default: () => <div>Aquí puedes consultar:</div>
}))

vi.mock('../src/components/Sistema1/EvolucionPatrimonial.jsx', () => ({
  default: () => <div>Módulo de evolución patrimonial</div>
}))

vi.mock('../src/components/Sistema1/Disclaimer.jsx', () => ({
  default: () => null
}))

describe('buscador del Sistema 1', () => {
  it('monta el buscador directamente al abrir la pestaña predeterminada', () => {
    render(
      <ThemeProvider theme={theme}>
        <Declaraciones />
      </ThemeProvider>
    )

    expect(screen.getByText('Aquí puedes consultar:')).toBeTruthy()
  })
})
