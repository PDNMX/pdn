import React from 'react'

import { Route, Switch } from 'react-router-dom'
import { Grid, Typography } from '@mui/material'
import img from '../../assets/rediseno/svg_iconos_azul/SVG/s1_01.svg'

import withStyles from '@mui/styles/withStyles'

import Busqueda from './Busqueda'
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
    open: true
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props
    const system = pdnRoutes.find(route => route.path === '/declaraciones')

    return (
      <div>
        <HeaderV2 section={system} />
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item xs={12} className={classes.section}>
            <Grid container spacing={0}>
              <Grid item lg={3} xs={12} style={{ display: 'flex', alignItems: 'stretch' }}>
                <figure className={classes.selectedTab}>
                  <img src={img} alt={titulo} className={classes.logo} />{' '}
                  <Typography variant='subtitle1' className={classes.labelCard}>
                    Buscador de una persona servidora pública
                  </Typography>
                </figure>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} className={classes.contentsSection} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <Switch>
            <Route exact path='/declaraciones' component={Busqueda} />

            {/* <Route path="/declaraciones/perfil/:id?" component={PerfilMaterialUI} />
							<Route path="/declaraciones/estadisticas" component={Stats} /> */}
          </Switch>
        </Grid>
        <Disclaimer open={this.state.open} handleClose={this.handleClose} />
      </div>
    )
  }
}

export default withStyles(styles)(Declaraciones)
