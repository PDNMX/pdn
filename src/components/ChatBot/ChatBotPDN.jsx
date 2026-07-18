import { useEffect, useMemo, useRef, useState } from 'react'
import { keyframes } from '@emotion/react'
import { Box, Paper, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ReactGA from 'react-ga4'

import IconChat from './ico-chat.svg'
import IconErizo from './ico-erizo.svg'
import steps from './steps'

const colors = {
  primary: '#815374',
  background: '#f5f8fb',
  text: '#4a4a4a'
}

const scaleIn = keyframes`
  to { transform: scale(1); }
`

const getBubbleRadius = (user, first, last) => {
  if (!first && !last) return user ? '18px 0 0 18px' : '0 18px 18px 0'
  if (!first && last) return user ? '18px 0 18px 18px' : '0 18px 18px 18px'
  return user ? '18px 18px 0 18px' : '18px 18px 18px 0'
}

const ChatBotPDN = () => {
  const stepById = useMemo(() => new Map(steps.map(step => [step.id, step])), [])
  const initialStep = stepById.get('msjInicial')
  const [opened, setOpened] = useState(false)
  const [currentStepId, setCurrentStepId] = useState(initialStep.trigger)
  const [messages, setMessages] = useState([
    { id: initialStep.id, author: 'bot', text: initialStep.message }
  ])
  const messagesRef = useRef(null)

  useEffect(() => {
    if (!opened || !messagesRef.current) return

    messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  }, [messages, opened])

  const toggleFloating = () => {
    const nextValue = !opened
    setOpened(nextValue)

    if (nextValue) ReactGA.event({ category: 'chatbot', action: 'click' })
  }

  const advance = (stepId, previousValue, history) => {
    let nextStep = stepById.get(stepId)
    const nextHistory = [...history]

    while (nextStep && !nextStep.options) {
      const text = typeof nextStep.message === 'function'
        ? nextStep.message({ previousValue })
        : nextStep.message

      if (text) {
        nextHistory.push({ id: `${nextStep.id}-${nextHistory.length}`, author: 'bot', text })
      }

      if (nextStep.end || !nextStep.trigger) {
        setMessages(nextHistory)
        setCurrentStepId(null)
        return
      }

      nextStep = stepById.get(nextStep.trigger)
    }

    setMessages(nextHistory)
    setCurrentStepId(nextStep?.id ?? null)
  }

  const selectOption = option => {
    const nextHistory = [
      ...messages,
      { id: `user-${messages.length}`, author: 'user', text: option.label }
    ]
    advance(option.trigger, option.value, nextHistory)
  }

  const currentStep = currentStepId ? stepById.get(currentStepId) : null

  return (
    <Box className='chatbot'>
      <Paper
        elevation={0}
        role='dialog'
        aria-label='Chat PDN'
        aria-hidden={!opened}
        sx={{
          position: 'fixed',
          right: 32,
          bottom: 32,
          width: 350,
          height: 520,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: '10px',
          backgroundColor: colors.background,
          boxShadow: '0 12px 24px 0 rgba(0, 0, 0, 0.15)',
          transform: opened ? 'scale(1)' : 'scale(0)',
          transformOrigin: 'bottom right',
          transition: 'transform 0.3s ease, visibility 0s linear 0.3s',
          visibility: opened ? 'visible' : 'hidden',
          pointerEvents: opened ? 'auto' : 'none',
          zIndex: 999,
          ...(opened && { transition: 'transform 0.3s ease' }),
          '@media screen and (max-width: 568px)': {
            right: '0 !important',
            bottom: '0 !important',
            width: '100%',
            height: '100%',
            borderRadius: 0
          }
        }}
      >
        <Box
          sx={{
            minHeight: 56,
            height: 56,
            px: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#fff',
            fill: '#fff',
            backgroundColor: colors.primary
          }}
        >
          <Typography
            component='h2'
            sx={{
              m: 0,
              color: '#fff',
              fontSize: '15px',
              fontWeight: 700,
              lineHeight: 'normal'
            }}
          >
            Chat PDN
          </Typography>
          <Box
            component='button'
            type='button'
            aria-label='Cerrar Chat PDN'
            onClick={toggleFloating}
            sx={{
              width: 24,
              height: 24,
              p: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 0,
              color: '#fff',
              background: 'transparent',
              cursor: 'pointer'
            }}
          >
            <CloseIcon sx={{ width: 24, height: 24 }} />
          </Box>
        </Box>

        <Box
          ref={messagesRef}
          aria-live='polite'
          sx={{
            height: 'calc(100% - 56px)',
            mt: '2px',
            pt: '6px',
            overflowY: 'scroll'
          }}
        >
          {messages.map((message, index) => {
            const user = message.author === 'user'
            const first = index === 0 || messages[index - 1].author !== message.author
            const last = index === messages.length - 1 || messages[index + 1].author !== message.author
            const showAvatar = !user

            return (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: user ? 'flex-end' : 'flex-start'
                }}
              >
                <Box
                  sx={{
                    display: 'inline-block',
                    order: user ? 1 : 0,
                    p: '6px'
                  }}
                >
                  {first && showAvatar && (
                    <Box
                      component='img'
                      src={IconErizo}
                      alt='avatar'
                      sx={{
                        display: 'block',
                        width: 40,
                        minWidth: 40,
                        height: 40,
                        p: '3px',
                        borderRadius: '50% 50% 0 50%',
                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.15)'
                      }}
                    />
                  )}
                </Box>
                <Box
                  sx={{
                    maxWidth: '50%',
                    position: 'relative',
                    display: 'inline-block',
                    p: '12px',
                    mb: '10px',
                    ml: !first && showAvatar ? '46px' : 0,
                    mt: first ? 0 : '-8px',
                    overflow: 'hidden',
                    borderRadius: getBubbleRadius(user, first, last),
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.15)',
                    color: user ? colors.text : '#fff',
                    backgroundColor: user ? '#fff' : colors.primary,
                    fontSize: '14px',
                    lineHeight: 'normal',
                    transform: 'scale(0)',
                    transformOrigin: user
                      ? (first ? 'bottom right' : 'top right')
                      : (first ? 'bottom left' : 'top left'),
                    animation: `${scaleIn} 0.3s ease forwards`
                  }}
                >
                  {message.text}
                </Box>
              </Box>
            )
          })}

          {currentStep?.options && (
            <Box component='ul' sx={{ m: '2px 0 12px', p: '0 6px', listStyle: 'none' }}>
              {currentStep.options.map(option => (
                <Box
                  component='li'
                  key={`${currentStep.id}-${option.value}`}
                  sx={{
                    display: 'inline-block',
                    m: '2px',
                    transform: 'scale(0)',
                    animation: `${scaleIn} 0.3s ease forwards`
                  }}
                >
                  <Box
                    component='button'
                    type='button'
                    onClick={() => selectOption(option)}
                    sx={{
                      display: 'inline-block',
                      p: '12px',
                      border: 0,
                      borderRadius: '22px',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.15)',
                      color: '#fff',
                      backgroundColor: colors.primary,
                      fontFamily: 'inherit',
                      fontSize: '14px',
                      cursor: 'pointer',
                      '&:hover': { opacity: 0.7 }
                    }}
                  >
                    {option.label}
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Paper>

      <Box
        component='button'
        type='button'
        aria-label='Abrir Chat PDN'
        aria-expanded={opened}
        aria-hidden={opened}
        tabIndex={opened ? -1 : 0}
        onClick={toggleFloating}
        sx={{
          position: 'fixed',
          right: 32,
          bottom: 32,
          width: 56,
          height: 56,
          p: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 0,
          borderRadius: '100%',
          boxShadow: '0 12px 24px 0 rgba(0, 0, 0, 0.15)',
          color: '#fff',
          fill: '#fff',
          backgroundColor: colors.primary,
          transform: opened ? 'scale(0)' : 'scale(1)',
          transition: 'transform 0.3s ease',
          cursor: 'pointer',
          zIndex: 999,
          '&:hover': { backgroundColor: '#552a4f' }
        }}
      >
        <Box component='img' src={IconChat} alt='' sx={{ width: 24, height: 24 }} />
      </Box>
    </Box>
  )
}

export default ChatBotPDN
