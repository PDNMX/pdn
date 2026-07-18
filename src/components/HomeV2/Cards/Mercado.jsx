import { Typography, Grid, Stack } from '@mui/material'
import { withStyles } from '@mui/styles'

import logoMDA from '../../../assets/rediseno2023/imgs/iconos/logotipos/ico_mda.svg'
import ReactGA from 'react-ga4'
import ButtonPDN from '../../Compartidos/ButtonPDN'

import ScrollAnimation from '../ScrollAnimation'

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
        className={classes.container}
        sx={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Grid
          size={{
            xs: 12,
            lg: 2
          }}>
          <Stack direction='row' sx={{
            justifyContent: { xs: 'center', lg: 'end' }
          }}>
            <ScrollAnimation>
              <img alt='Logo MDA' src={logoMDA} className={classes.logoMDA} />
            </ScrollAnimation>
          </Stack>
        </Grid>
        <Grid
          size={{
            xs: 12,
            lg: 6
          }}
          sx={{
            p: { xs: 1, lg: 0 }
          }}>
          <Typography variant='h6' sx={{
            marginBottom: "16px"
          }}>
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
        <Grid
          size={{
            sm: 12,
            xs: 12
          }}
          sx={{
            pr: { xs: 0, md: 1 }
          }}>
          <Stack direction='row' sx={{
            justifyContent: { xs: 'center', md: 'end' }
          }}>
            <ButtonPDN
              href={process.env.REACT_APP_LINK_MDA}
              onClick={() => ReactGA.send({ hitType: 'pageview', page: '/mda' })}
              style={{ color: 'white' }}
            >
              CONOCE MÁS
            </ButtonPDN>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}
export default withStyles(styles)(CardMercardo)
