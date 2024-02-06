import React from 'react'
import { withStyles } from '@mui/styles'
import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import img1 from '../../assets/rediseno/svg_iconos_azul/SVG/s1_01.svg'
import img2 from '../../assets/rediseno/svg_iconos_azul/SVG/s1_01.svg'
import BuscadorServidoresSancionados from './Servidores/BuscadorServidoresSancionados'
import BuscadorParticularesSancionados from './Particulares/BuscadorParticularesSancionados'
import HeaderV2 from '../HomeV2/HeaderV2'
import Dashboard from './dashboard/Servidores/Dashboard'
import Dashboard2 from './dashboard/Particulares/Dashboard'
import classNames from 'classnames'
import pdnRoutes from '../../routes/index'

//import ReactGA from 'react-ga4'

import { ThemeProvider } from '@mui/material/styles'
import ThemeV2 from '../../ThemeV2'

const styles = theme => ({
  root: {
    flexGrow: 1
    /*     backgroundColor: theme.palette.primary.main,
    backgroundImage: `url(${bgimg})`,
    backgroundRepeat: 'repeat',
    backgroundPosition: 'fixed' */
  },
  whiteText: {
    // color: theme.palette.textGrey.color
  },
  section: {
    maxWidth: '1200px',
    marginTop: theme.spacing(8)
  },
  sectionT: {
    color: theme.palette.primary.contrastText
  },
  image: {
    width: '60px'
  },
  card: {
    backgroundColor: theme.palette.background.noSelect,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    margin: 0,
    '&:hover': {
      cursor: 'pointer',
      borderColor: theme.palette.background.border,
      transition: 'background 0.3s ease',
      opacity: 0.7
    },
    display: 'flex',
    float: 'left',
    padding: 0,
    borderStyle: 'solid',
    borderColor: theme.palette.background.opaque,
    borderBottomStyle: 'none',
    borderRadius: '10px 10px 0px 0px',
    marginRight: 10
  },
  cardSeleccionada: {
    backgroundColor: theme.palette.background.select,
    borderColor: theme.palette.background.border,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    margin: 0,
    borderStyle: 'solid',

    borderBottomStyle: 'none',
    borderRadius: '10px 10px 0px 0px',
    display: 'flex',
    float: 'left',
    marginRight: 10,
  },
  labelCard: {
    color: theme.palette.text.clear,
    marginLeft: theme.spacing(1),
    paddingTop: theme.spacing(1)
  }
})
const TabContents = props => {
  const { index } = props
  switch (index) {
    case 1:
      return <BuscadorServidoresSancionados />
    case 2:
      return <BuscadorParticularesSancionados />
//    case 3:
//      return <Dashboard />
    default:
      return <Dashboard />
  }
}
const Index = ({ classes }) => {
  const [idContent, setIdContent] = React.useState(1)
  const handleIdContent = t => setIdContent(t)
  const isIdContent = t => t === idContent
  const system = pdnRoutes.find(route => route.path === '/sancionados')

  return (
      <div className={classes.root}>
        <HeaderV2 section={system} />
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item xs={12} className={classes.section}>
            <Grid container>
              <Grid item md={3} xs={12} onClick={() => handleIdContent(1)}>
                <figure className={isIdContent(1) ? classes.cardSeleccionada : classes.card}>
                  <img src={img1} alt='Servidores públicos sancionados' className={classes.image} />
                <Typography variant='subtitle1' style={{ color: isIdContent(1) ? '#f1e9f2' : '#713972' }} className={classes.labelCard}>
                  Buscador de servidores públicos sancionados
                </Typography>
                </figure>
              </Grid>
              <Grid item md={3} xs={12} onClick={() => handleIdContent(2)}>
                <figure className={isIdContent(2) ? classes.cardSeleccionada : classes.card}>
                  <img src={img2} alt='Particulares sancionados' className={classes.image} />
                <Typography variant='subtitle1' style={{ color: isIdContent(2) ? '#f1e9f2' : '#713972' }} className={classes.labelCard}>
                  Buscador de particulares sancionados
                </Typography>
                </figure>
              </Grid>
              {/* <Grid
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
                    ReactGA.event({category: 'visor-s3P', action: 'click'});
                  }}
              >
                <figure className={classNames(idContent !== 4 ? classes.card : classes.cardSeleccionada)}>
                  <img src={img4} alt='Visor de datos (Particulares sancionados)' className={classes.image}/>
                </figure>
                <Typography variant='subtitle1' style={{fontWeight: idContent === 4 ? 500 : 300}}
                            className={classes.labelCard}>
                  Visor de datos (Particulares sancionados)
                </Typography>
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent='center'>
          <Grid item xs={12} className={classes.sectionT}>
          <ThemeProvider theme={ThemeV2}>
            <TabContents index={idContent} />
          </ThemeProvider>
          </Grid>
        </Grid>
      </div>
  )
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Index)
