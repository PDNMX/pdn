import { Typography, Grid, Stack } from '@mui/material'
import { withStyles } from '@mui/styles'

import logoMDA from '../../../assets/rediseno2023/imgs/iconos/logotipos/ico_mda.svg'
import ReactGA from 'react-ga4'
import ButtonPDN from '../../Compartidos/ButtonPDN'

const styles = () => ({
  container: {
    maxWidth: 1500,
    margin: 'auto',
    background: '#fff',
    paddingTop: '3rem',
    paddingBottom: '3rem'
  },
  root: {
    background: '#fff'
  },
  logoMDA: {
    padding: 0,
    height: '15rem'
  }
})

const CardMercardo = (props) => {
  const { classes } = props
  return (
    <div className={classes.root}>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        className={classes.container}
      >
        <Grid item xs={12} lg={2}>
          <Stack direction='row' justifyContent={{ xs: 'center', lg: 'end' }}>
            <img alt='Logo MDA' src={logoMDA} className={classes.logoMDA} />
          </Stack>
        </Grid>
        <Grid item xs={12} lg={6} p={{ xs: 1, lg: 0 }}>
          <Typography variant='h6' paragraph>
            El <strong>Mercado Digital Anticorrupción (MDA)</strong> es un
            espacio en el que se encuentran disponibles{' '}
            <strong>herramientas de uso libre</strong> con las que se busca
            facilitar el desarrollo y conexión con los sistemas que conforman la
            Plataforma Digital Nacional.
            <br />
            Cuenta con herramientas que fueron desarrolladas por diversas
            instituciones y que cumplen los objetivos de la PDN.
          </Typography>
        </Grid>
        <Grid item sm={12} xs={12} pr={{ xs: 0, md: 1 }}>
          <Stack direction='row' justifyContent={{ xs: 'center', md: 'end' }}>
            <ButtonPDN
              href={process.env.REACT_APP_LINK_MDA}
              onClick={() => ReactGA.pageview('/mda')}
              style={{ color: 'white' }}
            >
              CONOCE MÁS
            </ButtonPDN>
          </Stack>
        </Grid>
      </Grid>
    </div>
  )
}
export default withStyles(styles)(CardMercardo)
