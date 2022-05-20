import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { Grid } from '@mui/material';
import img from '../../assets/rediseno/svg_iconos_azul/SVG/s1_01.svg';

import { Typography } from '@mui/material';
import withStyles from '@mui/styles/withStyles';

import Busqueda from './Busqueda';
// import PerfilMaterialUI from '../Declaraciones/PerfilMaterialUI';
// import Stats from '../Declaraciones/Estadisticas/Stats';

import styles from './style';
import { ThemeProvider } from '@mui/material/styles';
import ThemeV2 from '../../ThemeV2';
import pdnRoutes from '../../routes';
import HeaderV2 from '../HomeV2/HeaderV2';
import Disclaimer from './Disclaimer';
// import MyPaper from './MyPaper';

const titulo = 'Sistema de evolución patrimonial, de declaración de intereses y constancia de presentación de declaración fiscal';
//const subtitulo = 'Declaraciones';
//const copy = 'Consulta y visualiza los datos <b>públicos</b> de las declaraciones patrimoniales, y de intereses, así como la constancia de declaración anual de impuestos de las y los servidores públicos.';

class Declaraciones extends React.Component {
  state = {
    open: true
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const system = pdnRoutes.find(route => route.path === '/declaraciones');

    return (
      <ThemeProvider theme={ThemeV2}>
        <HeaderV2 section={system} />
        <Grid container spacing={0}>
          <Grid item xs={12} style={{ maxWidth: 1200, margin: '0 auto', marginTop: 50 }}>
            <Grid container spacing={0}>
              <Grid item lg={3} xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                <figure className={classes.selectedTab}>
                  <img src={img} alt={titulo} className={classes.logo} />
                </figure>
                <Typography variant='subtitle1' className={classes.labelCard}>
                  Buscar una persona servidora pública
                </Typography>
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
        </Grid>
        <Disclaimer open={this.state.open} handleClose={this.handleClose} />
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(Declaraciones);
