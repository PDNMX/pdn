import React from 'react'
import { Typography, FormControlLabel, Checkbox, IconButton } from '@mui/material'
import CampaignIcon from '@mui/icons-material/Campaign'
import CloseIcon from '@mui/icons-material/Close'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import ReactGA from 'react-ga4'
import ButtonPDN from './ButtonPDN'

const SURVEY_URL = 'https://forms.office.com/Pages/ResponsePage.aspx?id=Xtvls0QpN0iZ9XSIrOVDGWnfNeMo7ANNk53KKYMuMJFUOU5ZRURNWlJWMk8wMUxNMFBUWExDR1pVVi4u&origin=QRCode'
const SURVEY_DISMISS_KEY = 'pdn_survey_banner_hidden'
const LEGACY_SURVEY_DISMISS_KEY = 's1_survey_banner_hidden'

const pulseKeyframes = `
  @keyframes pdnPulse {
    0%   { box-shadow: 0 0 0 0 rgba(122, 62, 124, 0.5); }
    70%  { box-shadow: 0 0 0 10px rgba(122, 62, 124, 0); }
    100% { box-shadow: 0 0 0 0 rgba(122, 62, 124, 0); }
  }
  @keyframes pdnFadeSlide {
    from { opacity: 0; transform: translateY(-10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`

const SurveyFloatingBanner = () => {
  const [showSurveyBanner, setShowSurveyBanner] = React.useState(false)
  const [disableSurveyBanner, setDisableSurveyBanner] = React.useState(false)

  React.useEffect(() => {
    if (!SURVEY_URL) return
    try {
      const isHidden =
        window.localStorage.getItem(SURVEY_DISMISS_KEY) === '1' ||
        window.localStorage.getItem(LEGACY_SURVEY_DISMISS_KEY) === '1'
      setShowSurveyBanner(!isHidden)
    } catch {
      setShowSurveyBanner(true)
    }
  }, [])

  const handleCloseSurveyBanner = () => {
    if (disableSurveyBanner) {
      try {
        window.localStorage.setItem(SURVEY_DISMISS_KEY, '1')
        window.localStorage.setItem(LEGACY_SURVEY_DISMISS_KEY, '1')
      } catch { /* ignore */ }
    }
    setShowSurveyBanner(false)
    ReactGA.event({ category: 'encuesta-pdn', action: 'close' })
  }

  if (!SURVEY_URL || !showSurveyBanner) return null

  return (
    <>
      <style>{pulseKeyframes}</style>

      <div
        style={{
          position: 'fixed',
          right: '16px',
          top: '104px',
          width: 'calc(100vw - 32px)',
          maxWidth: '390px',
          zIndex: 1200,
          animation: 'pdnFadeSlide 0.35s ease both',
        }}
      >
        <div
          style={{
            borderRadius: '16px',
            padding: '16px',
            background: 'rgba(255, 252, 240, 0.82)',
            backdropFilter: 'blur(20px) saturate(1.8)',
            WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
            border: '1px solid rgba(245, 200, 100, 0.55)',
            borderTop: '3px solid #7a3e7c',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255,255,255,0.9) inset',
          }}
        >

          {/* Fila: icono + título + cerrar */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>

            {/* Icono pulsante */}
            <div
              style={{
                flexShrink: 0,
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #9b2c2c, #7a3e7c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'pdnPulse 2.2s ease-in-out infinite',
              }}
            >
              <CampaignIcon style={{ color: '#fff', fontSize: '1.45rem' }} />
            </div>

            {/* Textos — sin sobreescribir tipografía del tema */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <Typography variant='subtitle2' style={{ lineHeight: 1.3 }}>
                Encuesta de experiencia de personas usuarias
              </Typography>
              <Typography variant='body2' color='text.secondary' style={{ marginTop: '4px' }}>
                Ya está disponible la encuesta de la PDN. Participa y ayúdanos a mejorar la plataforma.
              </Typography>
            </div>

            {/* Cerrar */}
            <IconButton
              size='small'
              aria-label='Cerrar encuesta'
              onClick={handleCloseSurveyBanner}
              style={{ flexShrink: 0, marginTop: '-2px' }}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          </div>

          {/* Divisor */}
          <div style={{ height: '1px', background: 'rgba(0,0,0,0.07)', margin: '12px 0' }} />

          {/* Botón ancho completo */}
          <ButtonPDN
            href={SURVEY_URL}
            target='_blank'
            rel='noopener noreferrer'
            fullWidth
            onClick={() => ReactGA.event({ category: 'encuesta-pdn', action: 'click' })}
            style={{
              margin: 0,
              width: '100%',
              boxShadow: '0 4px 14px rgba(122, 62, 124, 0.45)',
            }}
            endIcon={<OpenInNewIcon style={{ fontSize: '0.95rem' }} />}
          >
            Participar en encuesta
          </ButtonPDN>

          {/* Checkbox */}
          <FormControlLabel
            style={{ marginTop: '8px', marginRight: 0 }}
            control={
              <Checkbox
                size='small'
                checked={disableSurveyBanner}
                onChange={(e) => setDisableSurveyBanner(e.target.checked)}
              />
            }
            label={<Typography variant='caption'>No volver a mostrar</Typography>}
          />
        </div>
      </div>
    </>
  )
}

export default SurveyFloatingBanner
