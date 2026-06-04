import React from 'react'

import { Route, Switch } from 'react-router-dom'
import { Grid, Typography } from '@mui/material'
import img from '../../assets/rediseno/svg_iconos_azul/SVG/s1_01.svg'
import QueryStatsIcon from '@mui/icons-material/QueryStats'

import withStyles from '@mui/styles/withStyles'

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
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item xs={12} className={classes.section}>
            <Grid container spacing={0}>
              <Grid item style={{ display: 'flex', alignItems: 'stretch' }}>
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
              <Grid item style={{ display: 'flex', alignItems: 'stretch' }}>
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

        <Grid container justifyContent='center'>
          <Grid item xs={12} className={classes.contentsSection}>
            {activeTab === 'busqueda' && (
              <Switch>
                <Route exact path='/declaraciones' component={Busqueda} />

                {/* <Route path="/declaraciones/perfil/:id?" component={PerfilMaterialUI} />
								<Route path="/declaraciones/estadisticas" component={Stats} /> */}
              </Switch>
            )}
            {activeTab === 'evolucion' && <EvolucionPatrimonial />}
          </Grid>
        </Grid>
        <Disclaimer open={this.state.open} handleClose={this.handleClose} />
      </div>
    )
  }
}

export default withStyles(styles)(Declaraciones)
