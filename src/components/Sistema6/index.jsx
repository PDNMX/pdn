import React from 'react'
import withStyles from '@mui/styles/withStyles'
import Busqueda from './BusquedaV2'
import Cifras from './Cifras'
// import Perspectivas from "./Perspectivas";
import Top from './Top'
import Descarga from '../Compartidos/Descarga'
import Disclaimer from './Disclaimer'
import img1 from '../../assets/rediseno/svg_iconos_azul/SVG/s6_01.svg'
// import img2 from "../../assets/img/particulares_sancionados.svg";
import img3 from '../../assets/rediseno/svg_iconos_azul/SVG/s6_02.svg'
import { Grid, Paper, Typography, Box } from '@mui/material'
import SelectSupplier from './SelectSupplier'
import HeaderV2 from '../HomeV2/HeaderV2'
import pdnRoutes from '../../routes'

import { ThemeProvider } from '@mui/material/styles'
import ThemeV2 from '../../ThemeV2'

const styles = theme => ({
  root: {
    flexGrow: 1
    /*         backgroundImage: `url(${bgimg})`,
        backgroundRepeat: "repeat", */
  },
  tabContainer: {
    paddingTop: 90
    // paddingBottom: 90
  },
  tabItem: {
    maxWidth: 1200
  },
  item: {
    maxWidth: 1200
    /* paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8), */
    // overflow: "auto"
  },
  paper1: {
    backgroundColor: theme.palette.background.opaque,
    padding: theme.spacing(2),
    color: theme.palette.primary.contrastText,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.background.border,
    borderRadius: '0px 10px 10px 10px'
  },
  paper2: {
    backgroundColor: theme.palette.background.opaque,
    padding: theme.spacing(2),
    color: theme.palette.primary.contrastText,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.background.border,
    borderRadius: '0px 10px 10px 10px'
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
    color: theme.palette.S6.color,
    marginLeft: theme.spacing(1),
    paddingTop: theme.spacing(1)
  }
})

const Index = props => {
  const { classes } = props
  const [selectedTab, setSelectedTab] = React.useState(0)
  const [dataSupplier, setDataSupplier] = React.useState('SHCP')
  const handleSelectTab = t => setSelectedTab(t)
  const isSelected = t => t === selectedTab
  const system = pdnRoutes.find(route => route.path === '/contrataciones')

  return (
    <div className={classes.root}>
      <HeaderV2 section={system} />
      <Grid container spacing={0} justifyContent='center' className={classes.tabContainer}>
        <Grid item xs={12} style={{ padding: 0, maxWidth: 1200 }}>
          <Grid container spacing={0}>
            <Grid
              item  md={3}xs={12}
              style={{ display: 'flex', alignItems: 'center' }}
              onClick={() => handleSelectTab(0)}
              id={0}
            >

              <figure className={isSelected(0) ? classes.cardSeleccionada : classes.card}>
                <img src={img1} className={classes.image} alt='explora' />
              

              <Typography style={{ color: isSelected(0) ? '#f1e9f2' : '#713972', paddingTop: 15 }} className={classes.labelCard}>
                Buscador de contrataciones
              </Typography>
              </figure>

            </Grid>
            <Grid
              item  md={4}xs={12}
              style={{ display: 'flex', alignItems: 'center' }}
              onClick={() => handleSelectTab(1)}
              id={1}
            >

              <figure className={isSelected(1) ? classes.cardSeleccionada : classes.card}>
                <img src={img3} className={classes.image} alt='Visualiza' />
              

              <Typography style={{ color: isSelected(1) ? '#f1e9f2' : '#713972', paddingTop: 15 }} className={classes.labelCard}>
                Visualizador de contrataciones
              </Typography>
              </figure>

            </Grid>
          </Grid>
        </Grid>
        <ThemeProvider theme={ThemeV2}>
          {selectedTab === 0
            ? <Grid item xs={12} className={classes.tabItem} style={{ overflow: 'auto' }}>
              <Paper className={classes.paper1} elevation={15}>
                <Box paddingLeft={1} paddingRight={1} paddingBottom={3}>

                  <SelectSupplier dataSupplier={dataSupplier} setDataSupplier={setDataSupplier} />

                </Box>
                {/* TODO: add supplier  support */}
                <Busqueda dataSupplier={dataSupplier} />
              </Paper>
              </Grid>
            : <Grid item xs={12} className={classes.tabItem}>
              <Paper className={classes.paper2} elevation={15}>
                <Box paddingTop={1} paddingBottom={3}>
                  <SelectSupplier dataSupplier={dataSupplier} setDataSupplier={setDataSupplier} />
                </Box>

                {/* TODO: add supplier support */}
                <Disclaimer dataSupplier={dataSupplier} />

                {/* TODO: add supplier support */}
                <Cifras dataSupplier={dataSupplier} />

                {dataSupplier && dataSupplier === 'SHCP' &&
                  <Top dataSupplier={dataSupplier} />}
              </Paper>
              </Grid>}
        </ThemeProvider>
      </Grid>

      {/* <Grid container spacing={0} justifyContent="center" style={{backgroundColor: "#34b3eb"}}>
            <Grid item xs={12} className={classes.item}>
                <Perspectivas/>
            </Grid>
        </Grid> */}

      <Grid container spacing={0} justifyContent='center'>
        <Grid item xs={12} className={classes.item}>
          <Descarga url={process.env.REACT_APP_BULK_S6} tipoGA='bulk-s6' />
        </Grid>
      </Grid>

    </div>
  )
}

export default withStyles(styles)(Index)
