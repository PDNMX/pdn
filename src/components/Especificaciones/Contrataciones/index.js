import React from 'react';
import { Paper, Box, Divider, Grid, Typography } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import Intro from './Intro';
import Licencia from '../Licencia';
import Herramientas from '../Herramientas';
import bgimg from '../../../assets/rediseno/fondo_cruces_dark.png';
import pdnRoutes from '../../../routes';
import HeaderV2 from '../../HomeV2/HeaderV2';
import ButtonPDN from '../../Compartidos/ButtonPDN';
const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primario.main,
    backgroundImage: `url(${bgimg})`,
    backgroundRepeat: 'repeat',
    backgroundPosition: 'fixed',
    color: '#f2f2f2'
  },
  rootItem: {
    maxWidth: 1200,
    padding: theme.spacing(1),
    paddingTop: 90,
    paddingBottom: 90
  },
  divider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
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

const Index = props => {
  const { classes } = props;
  const section = pdnRoutes.find(route => route.path === '/especificaciones/s6');
  return (
    <div className={classes.root}>
      <HeaderV2 section={section} />
      <Grid container justifyContent='center'>
        <Grid item xs={12} className={classes.rootItem}>
          <Paper className={classes.paper}>
            <Box className={classes.box}>
              <Intro />
              <Divider className={classes.divider} />
              <Typography paragraph variant='h5'>
                Seguridad informática
              </Typography>
              <Typography paragraph>
                El siguiente documento responde a las principales dudas en términos de seguridad
                informática que corresponden al: desarrollo, almacenamiento, operación, hospedaje,
                infraestructura y mecanismos de comunicación que rodean la administración de la
                Plataforma Digital Nacional y sus datos.
              </Typography>

              <Typography paragraph>
                <ButtonPDN target='_blank' href='https://drive.google.com/file/d/1-IvF3KYa5rups73BmVV4W8glT9csVGY9/view'>
                  Más información
                </ButtonPDN>
              </Typography>
              <Divider className={classes.divider} />
              <Licencia />
              <Divider className={classes.divider} />
              <Herramientas />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Index);
