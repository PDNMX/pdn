import React from 'react'
import { withStyles } from 'tss-react/mui';
import { Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import img1 from '../../assets/rediseno/svg_iconos_azul/SVG/s1_01.svg'
import img2 from '../../assets/rediseno/svg_iconos_azul/SVG/s1_01.svg'
import img3 from '../../assets/rediseno/svg_iconos_azul/SVG/s6_02.svg'
import img4 from '../../assets/rediseno/svg_iconos_azul/SVG/s6_02.svg'
import BuscadorServidoresSancionados from './Servidores/BuscadorServidoresSancionados'
import BuscadorParticularesSancionados from './Particulares/BuscadorParticularesSancionados'
import HeaderV2 from '../HomeV2/HeaderV2'
import Dashboard from './dashboard/Servidores/Dashboard'
import Dashboard2 from './dashboard/Particulares/Dashboard'
import pdnRoutes from '../../routes/index'

import ReactGA from 'react-ga4'

import { ThemeProvider } from '@mui/material/styles'
import ThemeV2 from '../../ThemeV2'
import styles from '../style'

const TabContents = props => {
  const { index } = props
  switch (index) {
    case 1:
      return <BuscadorServidoresSancionados />
    case 2:
      return <BuscadorParticularesSancionados />
    case 3:
      return <Dashboard />
    case 4:
      return <Dashboard2 />      
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
      <Grid
        container
        sx={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Grid className={classes.section} size={12}>
          <Grid container>
            <Grid
              onClick={() => handleIdContent(1)}
              size={{
                md: 3,
                xs: 12
              }}>
              <figure className={isIdContent(1) ? classes.selectedTab : classes.card} >
                <img src={img1} alt='Servidores públicos sancionados' className={classes.logo}  />
              <Typography  variant='subtitle1'  className={classes.labelCard}>
                Buscador de personas servidoras públicas sancionadas
              </Typography>
              </figure>
            </Grid>
            <Grid
              onClick={() => handleIdContent(2)}
              style={{ display: 'flex', alignItems: 'stretch' }}
              size={{
                md: 3,
                xs: 12
              }}>
              <figure className={isIdContent(2) ? classes.selectedTab : classes.card}>
                <img src={img2} alt='Particulares sancionados' className={classes.logo}  />
              <Typography  variant='subtitle1'  className={classes.labelCard}>
                Buscador de particulares sancionados
              </Typography>
              </figure>
            </Grid>
            <Grid
              onClick={() => {
                  setIdContent(3);
                  ReactGA.event({ category: 'visor-s3SP', action: 'click' });
                }}
              style={{ display: 'flex',      }}
              size={{
                md: 3,
                xs: 12
              }}>
              <figure className={isIdContent(3) ? classes.selectedTab : classes.card}>
                <img src={img3} alt='Particulares sancionados' className={classes.logo}  />
              <Typography  variant='subtitle1'  className={classes.labelCard}>
              Visor de datos (Servidores públicos sancionados)
              </Typography>
              </figure>
            </Grid>
            <Grid
              onClick={() => handleIdContent(4)}
              style={{ display: 'flex', alignItems: 'stretch' }}
              size={{
                md: 3,
                xs: 12
              }}>
              <figure className={isIdContent(4) ? classes.selectedTab : classes.card} >
                <img src={img4} alt='Particulares sancionados' className={classes.logo}  />
              <Typography  variant='subtitle1'  className={classes.labelCard}>
              Visor de datos (Particulares sancionados)
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
      <Grid container sx={{
        justifyContent: 'center'
      }}>
        <Grid className={classes.sectionT} size={12}>
        <ThemeProvider theme={ThemeV2}>
          <TabContents index={idContent} />
        </ThemeProvider>
        </Grid>
      </Grid>
    </div>
  );
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(Index, styles);
