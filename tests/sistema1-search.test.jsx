/** @vitest-environment jsdom */

import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { afterEach, describe, expect, it, vi } from 'vitest'

import theme from '../src/BaseTheme2023.js'
import Declaraciones from '../src/components/Sistema1/index.jsx'
import FormSearch from '../src/components/Sistema1/formSearch.jsx'

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

afterEach(cleanup)

describe('buscador del Sistema 1', () => {
  it('monta el buscador directamente al abrir la pestaña predeterminada', () => {
    render(
      <ThemeProvider theme={theme}>
        <Declaraciones />
      </ThemeProvider>
    )

    expect(screen.getByText('Aquí puedes consultar:')).toBeTruthy()
  })

  it('mantiene las viñetas y su contenido en la misma línea', () => {
    const query = {
      nombres: '',
      primerApellido: '',
      segundoApellido: '',
      escolaridadNivel: '',
      nivelOrdenGobierno: '',
      nombreEntePublico: '',
      entidadFederativa: 0,
      municipioAlcaldia: 0,
      empleoCargoComision: '',
      nivelEmpleoCargoComision: '',
      superficieConstruccionMin: '',
      superficieConstruccionMax: '',
      superficieTerrenoMin: '',
      superficieTerrenoMax: '',
      valorAdquisicionMin: '',
      valorAdquisicionMax: '',
      totalIngresosNetosMin: '',
      totalIngresosNetosMax: '',
      formaAdquisicion: ''
    }

    render(
      <ThemeProvider theme={theme}>
        <FormSearch
          query={query}
          handleInputChange={() => {}}
          catEscolaridadNivel={[]}
          catFormaAdquisicion={[]}
          catEntidadesFederativas={[{ cve_agee: 0, nom_agee: 'Todos' }]}
          catMunicipios={[{ cve_agem: 0, nom_agem: 'Todos' }]}
          btnSearch={false}
          handlerFind={() => {}}
          cleanForm={() => {}}
          handleOrdenamiento={() => {}}
          ordenamiento={{}}
        />
      </ThemeProvider>
    )

    const statement = screen.getByText('Las declaraciones patrimoniales de las y los servidores públicos.')
    expect(window.getComputedStyle(statement).display).toBe('inline')
  })
})
