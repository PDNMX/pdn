import React from 'react'
import { Typography, FormControlLabel, Checkbox, IconButton } from '@mui/material'
import CampaignIcon from '@mui/icons-material/Campaign'
import CloseIcon from '@mui/icons-material/Close'
import ReactGA from 'react-ga4'
import ButtonPDN from './ButtonPDN'

const SURVEY_URL = 'https://forms.office.com/Pages/ResponsePage.aspx?id=Xtvls0QpN0iZ9XSIrOVDGWnfNeMo7ANNk53KKYMuMJFUOU5ZRURNWlJWMk8wMUxNMFBUWExDR1pVVi4u&origin=QRCode'
const SURVEY_DISMISS_KEY = 'pdn_survey_banner_hidden'
const LEGACY_SURVEY_DISMISS_KEY = 's1_survey_banner_hidden'

const SurveyFloatingBanner = () => {
  const [showSurveyBanner, setShowSurveyBanner] = React.useState(false)
  const [disableSurveyBanner, setDisableSurveyBanner] = React.useState(false)

  React.useEffect(() => {
    if (!SURVEY_URL) {
      return
    }

    try {
      const isHidden = window.localStorage.getItem(SURVEY_DISMISS_KEY) === '1' || window.localStorage.getItem(LEGACY_SURVEY_DISMISS_KEY) === '1'
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
      } catch {
        // ignore localStorage failures
      }
    }

    setShowSurveyBanner(false)
    ReactGA.event({ category: 'encuesta-pdn', action: 'close' })
  }

  if (!SURVEY_URL || !showSurveyBanner) {
    return null
  }

  return (
    <div
      style={{
        position: 'fixed',
        right: '16px',
        top: '104px',
        width: 'calc(100vw - 32px)',
        maxWidth: '380px',
        zIndex: 1200
      }}
    >
      <div
        style={{
          borderRadius: '12px',
          padding: '12px 14px',
          background: 'linear-gradient(90deg, #fff4df 0%, #ffe8c7 100%)',
          border: '1px solid #f1c27d',
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CampaignIcon style={{ color: '#9b2c2c' }} />
            <Typography style={{ color: '#4b2b0b', fontWeight: 700 }}>Encuesta de experiencia de personas usuarias</Typography>
          </div>
          <IconButton size='small' aria-label='Cerrar encuesta' onClick={handleCloseSurveyBanner}>
            <CloseIcon fontSize='small' />
          </IconButton>
        </div>
        <Typography style={{ color: '#4b2b0b', marginTop: '6px' }}>Ya esta disponible la encuesta de la PDN. Participa y ayudanos a mejorar la plataforma.</Typography>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
          <ButtonPDN
            href={SURVEY_URL}
            target='_blank'
            rel='noopener noreferrer'
            onClick={() => ReactGA.event({ category: 'encuesta-pdn', action: 'click' })}
            style={{
              margin: 0,
              boxShadow: '0 8px 18px rgba(122, 62, 124, 0.3)'
            }}
          >
            Participar en encuesta
          </ButtonPDN>
          <FormControlLabel
            style={{ marginRight: 0 }}
            control={<Checkbox color='primary' size='small' checked={disableSurveyBanner} onChange={(event) => setDisableSurveyBanner(event.target.checked)} />}
            label={<Typography style={{ color: '#4b2b0b', fontSize: '0.85rem' }}>No volver a mostrar</Typography>}
          />
        </div>
      </div>
    </div>
  )
}

export default SurveyFloatingBanner
