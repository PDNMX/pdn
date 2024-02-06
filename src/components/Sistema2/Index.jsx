import React from 'react'
import withStyles from '@mui/styles/withStyles'
import { Grid, Typography } from '@mui/material'
import BuscadorS2 from './BuscadorS2v2'
import HeaderV2 from '../HomeV2/HeaderV2'
import Dashboard from './Dashboard/Dashboard'
import BuscadorParticularesSancionados from '../Sistema3/Particulares/BuscadorParticularesSancionados'
import img1 from '../../assets/rediseno/svg_iconos_azul/SVG/s6_01.svg'
import img2 from '../../assets/rediseno/svg_iconos_azul/SVG/s1_01.svg'
import pdnRoutes from '../../routes/index'

import { ThemeProvider } from '@mui/material/styles'
import ThemeV2 from '../../ThemeV2'

//import ReactGA from 'react-ga4'

const styles = theme => ({
  root: {
    flexGrow: 1
    /*         backgroundImage: `url(${bgimg})`,
        backgroundRepeat: "repeat", */
  },
  container: {
    paddingTop: 90
    // paddingBottom: 90
  },
  tabText: {
    // color: theme.palette.secondary.contrastText
  },
  tabsSection: {
    maxWidth: 1200, 
    padding: 0,  
  },
  contentsSection: {
    color: theme.palette.secondary.contrastText,
    maxWidth: '1200px'
  },
  image: {
    width: '60px',
    display: 'flex'
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
      return <BuscadorS2 />
    case 2:
      return <BuscadorParticularesSancionados />
//    case 3:
//      return <Dashboard />
    default:
      return <BuscadorS2 />
  }
}

const Index = props => {
  const { classes } = props
  const [contentId, setContentId] = React.useState(1)
  const handleContentId = t => setContentId(t)
  const isContentId = t => t === contentId
  const system = pdnRoutes.find(route => route.path === '/servidores')

  return (
    <div className={classes.root}>
      <HeaderV2 section={system} />

      {/* TABS */}
      <Grid container spacing={0} justifyContent='center' className={classes.container}>
        <Grid item xs={12} className={classes.tabsSection}>
          <Grid container spacing={0}>
            <Grid item md={4} xs={12} 
            style={{ display: 'flex', alignItems: 'center' }} 
            onClick={() => handleContentId(1)}>

              <figure className={ isContentId(1) ? classes.cardSeleccionada : classes.card}>
                <img
                  src={img1} alt='Servidores que intervinen en procesos de contratacion'
                  className={classes.image}
                />
              <Typography
                variant='subtitle1' className={classes.labelCard}
                style={{ color: isContentId(1) ? '#f1e9f2' : '#713972' }}
              >
                Buscador de personas servidoras públicsa que intervienen en contrataciones
              </Typography>
              </figure>
            </Grid>

            <Grid item md={4} xs={12} 
            style={{ display: 'flex', alignItems: 'center' }} 
            onClick={() => handleContentId(2)}>

              <figure className={isContentId(2) ? classes.cardSeleccionada : classes.card}>
                <img src={img2} alt='Particulares inhabilitados' className={classes.image} />
              <Typography
                variant='subtitle1'
                className={classes.labelCard}
                style={{ color: isContentId(2) ? '#f1e9f2' : '#713972' }}
              >
                Buscador de particulares inhabilitados
              </Typography>
              </figure>
            </Grid>

            {/* <Grid item md={4} xs={12}
                               onClick={() => {
                                   setContentId(3);
                                   ReactGA.event({category: 'visor-s2', action: 'click'});
                               }}
                        >

                            <figure className={contentId !== 3 ? classes.card : classes.cardSeleccionada}>
                                <img src={img3} alt="Visor de datos" className={classes.image}/>
                            </figure>
                            <Typography variant="subtitle1"
                                        style={{fontWeight: contentId === 3 ? 500 : 300}}
                                        className={classes.labelCard}>
                                Visor de datos
                            </Typography>

                        </Grid> */}

          </Grid>
        </Grid>

       <Grid item xs={12} className={classes.contentsSection}>
          <ThemeProvider theme={ThemeV2}>
            <TabContents index={contentId} />
          </ThemeProvider>
        </Grid>

      </Grid>
    </div>
  )
}

export default withStyles(styles)(Index)
