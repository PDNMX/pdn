import { useMemo, useState } from 'react'
import { Box, Button, IconButton, Paper, Typography } from '@mui/material'
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

const ChatBotPDN = () => {
  const stepById = useMemo(() => new Map(steps.map(step => [step.id, step])), [])
  const initialStep = stepById.get('msjInicial')
  const [opened, setOpened] = useState(false)
  const [currentStepId, setCurrentStepId] = useState(initialStep.trigger)
  const [messages, setMessages] = useState([
    { id: initialStep.id, author: 'bot', text: initialStep.message }
  ])

  const toggleFloating = () => {
    setOpened(value => {
      const nextValue = !value
      if (nextValue) ReactGA.event({ category: 'chatbot', action: 'click' })
      return nextValue
    })
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
    <Box sx={{ position: 'fixed', right: 24, bottom: 24, zIndex: theme => theme.zIndex.modal }}>
      {opened && (
        <Paper
          className='chatbot'
          elevation={12}
          sx={{
            width: { xs: 'calc(100vw - 32px)', sm: 350 },
            maxHeight: 'min(520px, calc(100vh - 120px))',
            mb: 1.5,
            overflow: 'hidden',
            borderRadius: 2,
            backgroundColor: colors.background
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1.25, color: '#fff', backgroundColor: colors.primary }}>
            <Box component='img' src={IconErizo} alt='' sx={{ width: 34, height: 34 }} />
            <Typography sx={{ flexGrow: 1, fontSize: 15, fontWeight: 600 }}>Chat PDN</Typography>
            <IconButton aria-label='Cerrar Chat PDN' onClick={toggleFloating} size='small' sx={{ color: '#fff' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box aria-live='polite' sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, p: 2, maxHeight: 420, overflowY: 'auto' }}>
            {messages.map(message => (
              <Box
                key={message.id}
                sx={{
                  alignSelf: message.author === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '82%',
                  px: 1.5,
                  py: 1,
                  borderRadius: 2,
                  color: message.author === 'user' ? colors.text : '#fff',
                  backgroundColor: message.author === 'user' ? '#fff' : colors.primary
                }}
              >
                <Typography variant='body2'>{message.text}</Typography>
              </Box>
            ))}

            {currentStep?.options?.map(option => (
              <Button
                key={`${currentStep.id}-${option.value}`}
                variant='outlined'
                onClick={() => selectOption(option)}
                sx={{ justifyContent: 'flex-start', textAlign: 'left', color: colors.primary, borderColor: colors.primary }}
              >
                {option.label}
              </Button>
            ))}
          </Box>
        </Paper>
      )}

      <IconButton
        aria-label={opened ? 'Cerrar Chat PDN' : 'Abrir Chat PDN'}
        onClick={toggleFloating}
        sx={{
          float: 'right',
          width: 60,
          height: 60,
          p: 0,
          boxShadow: 6,
          backgroundColor: colors.primary,
          '&:hover': { backgroundColor: colors.primary }
        }}
      >
        <Box component='img' src={IconChat} alt='' sx={{ width: 60, height: 60 }} />
      </IconButton>
    </Box>
  )
}

export default ChatBotPDN
