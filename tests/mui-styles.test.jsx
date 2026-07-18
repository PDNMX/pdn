import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import { describe, expect, it } from 'vitest'

import theme from '../src/BaseTheme2023.js'
import MensajeErrorDatos from '../src/components/Mensajes/MensajeErrorDatos.jsx'
import DatosReservados from '../src/components/Sistema1/DatosReservados.jsx'

const renderWithTheme = component => {
  const cache = createCache({ key: 'mui-test' })

  return renderToStaticMarkup(
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </CacheProvider>
  )
}

describe('migración de estilos MUI', () => {
  it('renderiza un componente migrado desde withStyles', () => {
    expect(renderWithTheme(<MensajeErrorDatos />)).toContain('Servicio no disponible')
  })

  it('renderiza un componente migrado desde makeStyles', () => {
    expect(renderWithTheme(<DatosReservados />)).toContain('no son públicos')
  })
})
