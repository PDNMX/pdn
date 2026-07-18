import React from 'react'
import { withStyles } from 'tss-react/mui';
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
import styles from '../style'

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
      <Grid
        container
        sx={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Grid style={{ maxWidth: 1200, margin: '0 auto', marginTop: 50 }} size={12}>
          <Grid container spacing={0}>
            <Grid
              style={{ display: 'flex',  alignItems: 'stretch' }}
              onClick={() => handleSelectTab(0)}
              id={0}
              size={{
                lg: 3,
                xs: 12
              }}>

              <figure className={isSelected(0) ? classes.selectedTab : classes.card}>
                <img src={img1} className={classes.logo} alt='explora' />


                <Typography variant='subtitle1'  className={classes.labelCard}>
                  Buscador de contrataciones
                </Typography>
              </figure>

            </Grid>
            <Grid
              style={{ display: 'flex',  alignItems: 'stretch' }}
              onClick={() => handleSelectTab(1)}
              id={1}
              size={{
                lg: 3,
                xs: 12
              }}>

              <figure className={isSelected(1) ? classes.selectedTab : classes.card}>
                <img src={img3} className={classes.logo} alt='Visualiza' />


                <Typography variant='subtitle1'  className={classes.labelCard}>
                  Visualizador de contrataciones
                </Typography>
              </figure>

            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{
        justifyContent: 'center'
      }}>
        <Grid className={classes.sectionT} size={12}>
          <Grid container spacing={0}>
            <ThemeProvider theme={ThemeV2}>
              {selectedTab === 0
                ? <Grid className={classes.tabItem} style={{ overflow: 'auto' }} size={12}>
                  <Paper className={classes.paper1} elevation={15}>
                    <Box
                      sx={{
                        paddingLeft: 1,
                        paddingRight: 1,
                        paddingBottom: 3
                      }}>

                      <SelectSupplier dataSupplier={dataSupplier} setDataSupplier={setDataSupplier} />

                    </Box>
                    {/* TODO: add supplier  support */}
                    <Busqueda dataSupplier={dataSupplier} />
                  </Paper>
                </Grid>
                : <Grid className={classes.tabItem} size={12}>
                  <Paper className={classes.paper2} elevation={15}>
                    <Box
                      sx={{
                        paddingTop: 1,
                        paddingBottom: 3
                      }}>
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
        </Grid>
      </Grid>
      {/* <Grid container spacing={0} justifyContent="center" style={{backgroundColor: "#34b3eb"}}>
            <Grid item xs={12} className={classes.item}>
                <Perspectivas/>
            </Grid>
        </Grid> */}
      <Grid container spacing={0} sx={{
        justifyContent: 'center'
      }}>
        <Grid className={classes.item} size={12}>
          <Descarga url={process.env.REACT_APP_BULK_S6} tipoGA='bulk-s6' />
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(Index, styles);
