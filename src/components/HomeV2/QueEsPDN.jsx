import React from 'react'
import withStyles from '@mui/styles/withStyles'
import { Typography, Grid, Stack } from '@mui/material'
// import { Link } from "react-router-dom";
import BuscadorModal from './Buscador/BotonPrincipal'

/* import bgPDN from "../../assets/rediseno2023/imgs/fondos/fondo-mapa.svg"; */
import lgoSNA from '../../assets/rediseno2023/imgs/iconos/logotipos/logo-sna.svg'
import lgoSESNA from '../../assets/rediseno2023/imgs/iconos/logotipos/logo-sesna.svg'
import ButtonPDN from '../Compartidos/ButtonPDN'

const styles = () => ({
  container: {
    /* background: `url(${bgPDN}) 10% -10px no-repeat rgb(255, 255, 255)`, */
    maxWidth: 1500,
    margin: 'auto',
    /* background: "#f2f0f2", */
    paddingTop: '4rem',
    paddingBottom: '4rem'
  }
})

const QueEsPDN = (props) => {
  const { classes } = props

  return (
    <>
      <div className='rootHome'>
        <Grid
          container
          alignItems='row'
          justifyContent='center'
          className={classes.container}
        >
          <Grid
            item
            md={5}
            lg={5}
            xs={12}
            p={{ xs: 1, xl: 0 }}
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          >
            <Typography variant='h1'>
              PLATAFORMA
              <br />
              DIGITAL NACIONAL
            </Typography>
            <Typography variant='h2'>Inteligencia Anticorrupción</Typography>
            <div>
              <img
                style={{ margin: '1rem' }}
                src={lgoSNA}
                alt='Sistema Nacional Anticorrupción'
              />
              <img
                style={{ margin: '1rem' }}
                src={lgoSESNA}
                alt='Secretaría Ejecutiva del Sistema Nacional Anticorrupción'
              />
            </div>
            <br />
            <BuscadorModal />
          </Grid>
          <Grid item lg={7} md={7} xs={12} align='left' p={{ xs: 1, lg: 0 }}>
            <Typography>
              La <b>Plataforma Digital Nacional (PDN)</b> del Sistema Nacional
              Anticorrupción (SNA) es un <b>instrumento de inteligencia</b> que
              tiene como objetivo eliminar las barreras de información para que
              los datos públicos sean comparables, accesibles y utilizables a
              efecto de combatir cualquier acto de corrupción.
              <br />
              <br />
              <b>
                La Secretaría Ejecutiva del Sistema Nacional Anticorrupción
                (SESNA)
              </b>
              , organismo descentralizado no sectorizado, es responsable de
              administrar la <b>PDN</b>.<br />
              <br />
              La PDN no es generadora ni un repositorio de datos, sino una
              plataforma de <b>interoperabilidad</b> que consulta información de
              diversas fuentes.
              <br />
              <br />
            </Typography>
          </Grid>

          {/* <Grid item xs={12} pr={{ xs: 0, md: 1 }}>
            <Stack direction="row" justifyContent={{ xs: "center", md: "end" }}>
              <Link className={classes.link} to="/about">
                <ButtonPDN style={{ color: "white" }}>Conoce más</ButtonPDN>
              </Link>
            </Stack>
          </Grid> */}
        </Grid>
      </div>
    </>
  )
}
export default withStyles(styles)(QueEsPDN)
