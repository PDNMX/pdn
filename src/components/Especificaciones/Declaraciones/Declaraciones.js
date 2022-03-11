import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import Divider from '@mui/material/Divider';
import Footer from '../../Home/Footer';
import Grid from '@mui/material/Grid';
import DescripcionEstandar from './DescripcionEstandar';
import Licencia from '../Licencia';
import Recomendaciones from './Recomendaciones';
import { Paper, Typography } from '@mui/material';
import Herramientas from '../Herramientas';
import Header from './Header/Header';
import { Link } from '@mui/material';
import Button from '@mui/material/Button';
import ProcoloConexion from '../ProcoloConexion';
import pdnRoutes from '../../../routes';
import HeaderV2 from '../../HomeV2/HeaderV2';

import styles from '../../Declaraciones2/style';
import EspecificacionesTecnicas from './EspecificacionesTecnicas';

const styles1 = theme => ({
  root: {
    flexGrow: 1
  },
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  item: {
    maxWidth: 1200,
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2)
  },
  container: {
    background: '#fff',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  divider: {
    marginBottom: theme.spacing(2)
  },
  ul: {
    listStyle: 'none',
    paddingLeft: '20px',
    color: theme.palette.text.primary
  },
  li: {
    '&:before': {
      content: '"•"',
      color: '#5fb1e6',
      fontWeight: 'bold',
      display: 'inline-block',
      width: '1em',
      marginLeft: '-1em'
    },
    'paddingBottom': theme.spacing(1)
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    background: '#ffe01b' //'#fecb6e'
  },
  rootItem: {
    maxWidth: 1200,
    padding: theme.spacing(1),
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  }
});

class Declaraciones extends React.Component {
  render() {
    const { classes } = this.props;
    const section = pdnRoutes.find(route => route.path === '/especificaciones/s1');

    return (
      <React.Fragment>
        <Grid container spacing={0} justifyContent='center' className={classes.container}>
          <Grid item xs={12}>
            <HeaderV2 section={section} />
          </Grid>

          <Grid item xs={12} style={{ maxWidth: 1190, marginTop: 50 }}>
            <Paper className={classes.paper_search} elevation={15}>
              <div style={{ maxWidth: 900, paddingTop: '50px', paddingBottom: '50px', margin: '0 auto' }}>
                <DescripcionEstandar />

                <Divider className={classes.divider} />

                <Recomendaciones />

                <Divider className={classes.divider} />

                <EspecificacionesTecnicas />

                <Divider className={classes.divider} />

                <ProcoloConexion urlPlan={'https://drive.google.com/open?id=1HZailvIOV77By1JwQKWXGTungYRBFmHi'} apiName={'Declaraciones'} />

                <Divider className={classes.divider} />

                <Licencia />

                <Divider className={classes.divider} />

                <Herramientas />
              </div>
            </Paper>
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Grid container spacing={0} justifyContent='center' className={classes.container}>
            <Grid item xs={12} className={classes.item}></Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

Declaraciones.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Declaraciones);
