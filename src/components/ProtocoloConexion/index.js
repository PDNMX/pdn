import React from 'react';
import withStyles from '@mui/styles/withStyles';
import bgimg from '../../assets/rediseno/fondo_cruces_dark.png';
import HeaderV2 from '../HomeV2/HeaderV2';
import pdnRoutes from '../../routes';
import { Grid, Paper, Box } from '@mui/material';
import ProtocoloConexion from './ProtocoloConexion';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primario.main,
    backgroundImage: `url(${bgimg})`,
    backgroundRepeat: 'repeat',
    backgroundPosition: 'fixed'
    /* color: '#f2f2f2' */
  },
  rootItem: {
    maxWidth: '1200px',
    padding: theme.spacing(1),
    paddingTop: 90,
    paddingBottom: 90
  },
  item: {
    maxWidth: 1200,
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingTop: 40,
    paddingBottom: theme.spacing(10)
  },
  paper: {
    backgroundColor: theme.palette.background.opaque,
    padding: theme.spacing(2),
    color: theme.palette.primario.contrastText,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.secundario.main,
    borderRadius: '10px 10px 10px 10px',
    display: 'flex',
    justifyContent: 'center'
  },
  box: {
    maxWidth: '900px',
    paddingTop: '50px',
    paddingBottom: '50px'
  }
});

const Protocolo = props => {
  const { classes } = props;
  const section = pdnRoutes.find(route => route.path === '/protocolo-de-conexion');
  return (
    <div className={classes.root}>
      <HeaderV2 section={section} />
      <Grid container justifyContent='center' spacing={0}>
        <Grid item xs={12} className={classes.rootItem}>
          <Paper className={classes.paper} elevation={15}>
            <Box className={classes.box}>
              <ProtocoloConexion />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Protocolo);
