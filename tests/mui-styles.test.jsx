import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import { describe, expect, it } from 'vitest'

import theme from '../src/BaseTheme2023.js'
import ThemeV2 from '../src/ThemeV2.js'
import MensajeErrorDatos from '../src/components/Mensajes/MensajeErrorDatos.jsx'
import DatosReservados from '../src/components/Sistema1/DatosReservados.jsx'

const renderWithTheme = (component, selectedTheme = theme) => {
  const cache = createCache({ key: 'mui-test' })

  return renderToStaticMarkup(
    <CacheProvider value={cache}>
      <ThemeProvider theme={selectedTheme}>{component}</ThemeProvider>
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

  it.each([theme, ThemeV2])('conserva el ancho completo de los contenedores Grid', selectedTheme => {
    const markup = renderWithTheme(
      <Grid container>
        <Grid size={6}>Contenido</Grid>
      </Grid>,
      selectedTheme
    )

    expect(markup).toContain('width:100%')
  })
})
