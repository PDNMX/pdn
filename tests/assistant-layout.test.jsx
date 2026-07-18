/** @vitest-environment jsdom */

import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { describe, expect, it } from 'vitest'

import theme from '../src/BaseTheme2023.js'
import LinearStepper from '../src/components/HomeV2/Asistente/LinearStepper.jsx'

describe('acomodo del asistente de búsqueda', () => {
  it('mantiene centradas las imágenes de las opciones', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <LinearStepper stateChanger={() => {}} />
      </ThemeProvider>
    )

    const images = [...container.querySelectorAll('img[src*="/img/asistente/"]')]
    expect(images).toHaveLength(6)

    for (const image of images) {
      const styles = window.getComputedStyle(image)
      expect(styles.display).toBe('block')
      expect(styles.width).toBe('30%')
      expect(styles.marginLeft).toBe('auto')
      expect(styles.marginRight).toBe('auto')
      expect(styles.objectFit).toBe('contain')
    }
  })
})
