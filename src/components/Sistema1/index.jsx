import React from 'react'

import { Route, Routes } from 'react-router-dom'
import { Grid, Typography } from '@mui/material'
import img from '../../assets/rediseno/svg_iconos_azul/SVG/s1_01.svg'
import QueryStatsIcon from '@mui/icons-material/QueryStats'

import { withStyles } from 'tss-react/mui';

import Busqueda from './Busqueda'
import EvolucionPatrimonial from './EvolucionPatrimonial'
// import PerfilMaterialUI from '../Declaraciones/PerfilMaterialUI'
// import Stats from '../Declaraciones/Estadisticas/Stats'

import styles from '../style'
/* import { ThemeProvider } from '@mui/material/styles'
import ThemeV2 from '../../ThemeV2' */
import pdnRoutes from '../../routes'
import HeaderV2 from '../HomeV2/HeaderV2'
import Disclaimer from './Disclaimer'
// import MyPaper from './MyPaper'

const titulo = 'Sistema de evolución patrimonial, de declaración de intereses y constancia de presentación de declaración fiscal'
// const subtitulo = 'Declaraciones'
// const copy = 'Consulta y visualiza los datos <b>públicos</b> de las declaraciones patrimoniales, y de intereses, así como la constancia de declaración anual de impuestos de las y los servidores públicos.'

class Declaraciones extends React.Component {
  state = {
    open: true,
    activeTab: 'busqueda'
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleTabChange = (tab) => {
    this.setState({ activeTab: tab })
  }

  render() {
    const { classes } = this.props
    const { activeTab } = this.state
    const system = pdnRoutes.find(route => route.path === '/declaraciones')

    return (
      <div>
        <HeaderV2 section={system} />
        <Grid
          container
          sx={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Grid className={classes.section} size={12}>
            <Grid container spacing={0}>
              <Grid style={{ display: 'flex', alignItems: 'stretch' }}>
                <figure
                  className={activeTab === 'busqueda' ? classes.selectedTab : classes.card}
                  onClick={() => this.handleTabChange('busqueda')}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={img} alt={titulo} className={classes.logo} />{' '}
                  <Typography variant='subtitle1' className={classes.labelCard}>
                    Buscador de una persona servidora pública
                  </Typography>
                </figure>
              </Grid>
              <Grid style={{ display: 'flex', alignItems: 'stretch' }}>
                <figure
                  className={activeTab === 'evolucion' ? classes.selectedTab : classes.card}
                  onClick={() => this.handleTabChange('evolucion')}
                  style={{ cursor: 'pointer' }}
                >
                  <QueryStatsIcon sx={{ width: '60px', height: '60px', color: 'primary.main' }} />{' '}
                  <Typography variant='subtitle1' className={classes.labelCard}>
                   Módulo de evolución patrimonial
                  </Typography>
                </figure>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container sx={{
          justifyContent: 'center'
        }}>
          <Grid className={classes.contentsSection} size={12}>
            {activeTab === 'busqueda' && (
              <Routes>
                <Route path='/declaraciones' element={<Busqueda />} />

                {/* <Route path="/declaraciones/perfil/:id?" component={PerfilMaterialUI} />
								<Route path="/declaraciones/estadisticas" component={Stats} /> */}
              </Routes>
            )}
            {activeTab === 'evolucion' && <EvolucionPatrimonial />}
          </Grid>
        </Grid>
        <Disclaimer open={this.state.open} handleClose={this.handleClose} />
      </div>
    );
  }
}

export default withStyles(Declaraciones, styles);
