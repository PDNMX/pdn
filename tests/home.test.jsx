/** @vitest-environment jsdom */

import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { MemoryRouter } from 'react-router-dom'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import theme from '../src/BaseTheme2023.js'
import Home from '../src/components/HomeV2/Home.jsx'

vi.mock('../src/components/HomeV2/AnimatedCanvas.jsx', () => ({
  default: () => <canvas />
}))

vi.mock('../src/routes/index.js', () => ({
  default: [{
    path: '/declaraciones',
    name: 'Sistema de Declaraciones',
    colorDegradado: '#713972',
    iconLight: '/sistema-declaraciones.svg',
    type: 'system'
  }]
}))

beforeAll(() => {
  class IntersectionObserver {
    observe () {}
    unobserve () {}
    disconnect () {}
  }

  vi.stubGlobal('IntersectionObserver', IntersectionObserver)
})

describe('página principal', () => {
  it('se monta y renderiza su contenido principal', async () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Home />
        </ThemeProvider>
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Aceptar' }))

    expect(await screen.findByRole('heading', { name: 'PLATAFORMA DIGITAL NACIONAL' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Sistemas de la Plataforma Digital Nacional' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Blog' })).toBeTruthy()
  })
})
