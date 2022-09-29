import React from 'react';
import { withStyles } from '@mui/styles';
import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import img1 from '../../assets/rediseno/svg_iconos_azul/SVG/s3_01.svg';
import img2 from '../../assets/rediseno/svg_iconos_azul/SVG/s3_02.svg';
import img3 from '../../assets/rediseno/svg_iconos_azul/SVG/s3_03.svg';
import img4 from '../../assets/rediseno/svg_iconos_azul/SVG/s3_04.svg';
import BuscadorServidoresSancionados from './Servidores/BuscadorServidoresSancionados';
import BuscadorParticularesSancionados from './Particulares/BuscadorParticularesSancionados';
import HeaderV2 from '../HomeV2/HeaderV2';
import Dashboard from './dashboard/Servidores/Dashboard';
import Dashboard2 from './dashboard/Particulares/Dashboard';
import classNames from 'classnames';
import bgimg from '../../assets/rediseno/fondo_cruces_dark.png';
import pdnRoutes from '../../routes/index';
import ReactGA from 'react-ga';

import { ThemeProvider } from '@mui/material/styles';
import ThemeV2 from '../../ThemeV2';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primario.main,
    backgroundImage: `url(${bgimg})`,
    backgroundRepeat: 'repeat',
    backgroundPosition: 'fixed'
  },
  whiteText: {
    //color: theme.palette.textGrey.color
  },
  section: {
    maxWidth: '1200px',
    marginTop: theme.spacing(8)
  },
  sectionT: {
    color: theme.palette.primario.contrastText
  },
  image: {
    width: '60px'
  },
  card: {
    'backgroundColor': theme.palette.background.opaque,
    'paddingLeft': theme.spacing(1),
    'paddingRight': theme.spacing(1),
    'paddingTop': theme.spacing(1),
    'paddingBottom': theme.spacing(1),
    'margin': 0,
    '&:hover': {
      cursor: 'pointer',
      borderColor: theme.palette.secundario.main,
      transition: 'background 0.3s ease',
      opacity: 0.7
    },
    'display': 'inline-block',
    'float': 'left',
    'padding': 0,
    'borderStyle': 'solid',
    'borderColor': theme.palette.background.opaque,
    'borderBottomStyle': 'none',
    'borderRadius': '10px 10px 0px 0px',
    'marginRight': 10
  },
  cardSeleccionada: {
    borderColor: theme.palette.secundario.main,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    margin: 0,
    borderStyle: 'solid',
    borderBottomStyle: 'none',
    borderRadius: '10px 10px 0px 0px',
    display: 'inline-block',
    float: 'left',
    marginRight: 10,
    opacity: 0.7
  },
  labelCard: {
    color: theme.palette.S3.color,
    marginLeft: theme.spacing(1),
    paddingTop: theme.spacing(1)
  }
});

const Index = ({ classes }) => {
  const [idContent, setIdContent] = React.useState(1);
  const system = pdnRoutes.find(route => route.path === '/sancionados');

  return (
    <ThemeProvider theme={ThemeV2}>
      <div className={classes.root}>
        <HeaderV2 section={system} />
        <Grid container justifyContent='center' alignItems={'center'}>
          <Grid item xs={12} className={classes.section}>
            <Grid container>
              <Grid item md={3} xs={12} onClick={() => setIdContent(1)}>
                <figure className={classNames(idContent !== 1 ? classes.card : classes.cardSeleccionada)}>
                  <img src={img1} alt='Servidores públicos sancionados' className={classes.image} />
                </figure>
                <Typography variant='subtitle1' style={{ fontWeight: idContent === 1 ? 500 : 300 }} className={classes.labelCard}>
                  Buscador de Servidores públicos sancionados
                </Typography>
              </Grid>
              <Grid item md={3} xs={12} onClick={() => setIdContent(2)}>
                <figure className={classNames(idContent !== 2 ? classes.card : classes.cardSeleccionada)}>
                  <img src={img2} alt='Particulares sancionados' className={classes.image} />
                </figure>
                <Typography variant='subtitle1' style={{ fontWeight: idContent === 2 ? 500 : 300 }} className={classes.labelCard}>
                  Buscador de Particulares sancionados
                </Typography>
              </Grid>
              <Grid
                item
                md={3}
                xs={12}
                onClick={() => {
                  setIdContent(3);
                  ReactGA.event({ category: 'visor-s3SP', action: 'click' });
                }}
              >
                <figure className={classNames(idContent !== 3 ? classes.card : classes.cardSeleccionada)}>
                  <img src={img3} alt='Visor de datos (Servidores públicos sancionados)' className={classes.image} />
                </figure>
                <Typography variant='subtitle1' style={{ fontWeight: idContent === 3 ? 500 : 300 }} className={classes.labelCard}>
                  Visor de datos (Servidores públicos sancionados)
                </Typography>
              </Grid>
              <Grid
                item
                md={3}
                xs={12}
                onClick={() => {
                  setIdContent(4);
                  ReactGA.event({ category: 'visor-s3P', action: 'click' });
                }}
              >
                <figure className={classNames(idContent !== 4 ? classes.card : classes.cardSeleccionada)}>
                  <img src={img4} alt='Visor de datos (Particulares sancionados)' className={classes.image} />
                </figure>
                <Typography variant='subtitle1' style={{ fontWeight: idContent === 4 ? 500 : 300 }} className={classes.labelCard}>
                  Visor de datos (Particulares sancionados)
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent='center'>
          <Grid item xs={12} className={classes.sectionT}>
            {idContent === 1 && <BuscadorServidoresSancionados />}
            {idContent === 2 && <BuscadorParticularesSancionados />}
            {idContent === 3 && <Dashboard />}
            {idContent === 4 && <Dashboard2 />}
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);
