/** @vitest-environment jsdom */

import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { describe, expect, it, vi } from 'vitest'

import theme from '../src/BaseTheme2023.js'
import ChatBotPDN from '../src/components/ChatBot/ChatBotPDN.jsx'

vi.mock('react-ga4', () => ({
  default: { event: vi.fn() }
}))

describe('ChatPDN', () => {
  it('abre, permite navegar y vuelve a cerrar desde el botón flotante', async () => {
    render(
      <ThemeProvider theme={theme}>
        <ChatBotPDN />
      </ThemeProvider>
    )

    const openButton = screen.getByRole('button', { name: 'Abrir Chat PDN' })
    const floatingIcon = openButton.querySelector('img')

    expect(window.getComputedStyle(openButton).width).toBe('56px')
    expect(window.getComputedStyle(openButton).height).toBe('56px')
    expect(window.getComputedStyle(floatingIcon).width).toBe('24px')
    expect(window.getComputedStyle(floatingIcon).height).toBe('24px')

    fireEvent.click(openButton)

    const dialog = await screen.findByRole('dialog', { name: 'Chat PDN' })
    const title = screen.getByRole('heading', { name: 'Chat PDN' })
    expect(window.getComputedStyle(dialog).width).toBe('350px')
    expect(window.getComputedStyle(dialog).height).toBe('520px')
    expect(window.getComputedStyle(title).color).toBe('rgb(255, 255, 255)')
    expect(window.getComputedStyle(title).fontWeight).toBe('700')
    expect(screen.getByText('Hola, soy Eri, ¿En qué te puedo ayudar?')).toBeTruthy()
    expect(window.getComputedStyle(screen.getByAltText('avatar')).width).toBe('40px')

    fireEvent.click(screen.getByRole('button', { name: 'Sistemas' }))

    expect(screen.getByText('Selecciona una opción')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Declaraciones' })).toBeTruthy()

    fireEvent.click(screen.getAllByRole('button', { name: 'Cerrar Chat PDN' }).at(-1))

    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Chat PDN' })).toBeNull()
    })
  })
})
