import React, { useEffect } from 'react'
import withStyles from '@mui/styles/withStyles'
import { AppBar, Typography, Grid } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import imgHeader from '../../assets/rediseno2023/imgs/iconos/logotipos/logo_pdn-transparente.svg'
import Espe from '../../assets/rediseno2023/imgs/iconos/menu/ico_especificaciones.svg'
import Mesa from '../../assets/rediseno2023/imgs/iconos/menu/ico_mesa-ayuda.svg'
import MDA from '../../assets/rediseno2023/imgs/iconos/menu/ico_mda.svg'
import Sistemas from '../../assets/rediseno2023/imgs/iconos/menu/ico_sistemas.svg'
import Interconexion from '../../assets/rediseno2023/imgs/iconos/menu/ico_interconexion.svg'
import LoginIcon from '../../assets/rediseno/ico_login.svg'
import SistemasMenu from './SistemasMenu'
import InterconexionMenu from './InterconexionMenu'
import ReactGA from 'react-ga4'
import Link from '@mui/material/Link'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
// import {getUser} from '../Login/Auth';
import { UserContext } from '../Login/UserContext'

const styles = (theme) => ({
  opc: {
    '&:hover': {
      backgroundColor: '#ebe9f9',
      color: '#55575a',
      borderRadius: '75px'
    },
    paddingBottom: theme.spacing(2),
    textAlign: 'center',
    cursor: 'pointer',
    color: '#55575a'
  },
  selected: {
    backgroundColor: '#ebe9f9',
    color: '#55575a',
    borderRadius: '75px'
  }
})

const BannerDesktop = (props) => {
  const { classes, systems, setOpenLoginDialog } = props
  const [showSistemas, setShowSistemas] = React.useState(false)
  const [showInterconexion, setShowInterconexion] = React.useState(false)

  const { user } = React.useContext(UserContext)

  const toggle = () => {
    setTimeout(() => {
      setShowSistemas(!showSistemas)
    }, 1000)
  }

  const toggleInterconexion = () => {
    setTimeout(() => {
      setShowInterconexion(!showInterconexion)
    }, 1000)
  }

  useEffect(() => {
    if (showSistemas) {
      setShowInterconexion(false)
    }
  }, [showSistemas])

  useEffect(() => {
    if (showInterconexion) {
      setShowSistemas(false)
    }
  }, [showInterconexion])

  const handleOpenLoginDialog = () => {
    setOpenLoginDialog(true)
  }

  return (
    <>
      <AppBar
        position='static'
        style={{
          background:
            'transparent linear-gradient(230deg, #1C7CBF 0%, #1C7CBF 4%, #9F58E2 49%, #6D4061 100%) 0% 0% no-repeat padding-box',
          border: 0,
          boxShadow: 'none',
        overflowX: 'auto'
        }}
      >
        <div className='encabezado'>
          <div>
            <RouterLink to='/'>
              <img src={imgHeader} alt='PDN' />
            </RouterLink>
          </div>
          <div>
            <nav>
              <ul>
                <li className={classes.opc}>
                  <RouterLink to='/mesa-de-ayuda'>
                    <img src={Mesa} alt='PDN' />
                    <Typography>MESA DE AYUDA</Typography>
                  </RouterLink>
                </li>
                <li className={classes.opc}>
                  <RouterLink to='/especificaciones'>
                    <img src={Espe} alt='PDN' />
                    <Typography>ESPECIFICACIONES</Typography>
                  </RouterLink>
                </li>

                <li
                  className={`${classes.opc} ${
                    showSistemas ? classes.selected : ''
                  } `}
                  onClick={() => setShowSistemas(!showSistemas)}
                >
                  <img src={Sistemas} alt='Sistemas' />
                  <Typography>SISTEMAS</Typography>
                  <ArrowDropDownIcon />
                </li>

                <li
                  className={`${classes.opc} ${
                    showInterconexion ? classes.selected : ''
                  }`}
                  onClick={() => setShowInterconexion(!showInterconexion)}
                >
                  <img src={Interconexion} alt='Interconexión' />
                  <Typography>INTERCONEXIÓN</Typography>
                  <ArrowDropDownIcon />
                </li>

                <li className={classes.opc}>
                  <Link
                    href={process.env.REACT_APP_LINK_MDA}
                    onClick={() => ReactGA.pageview('/mda')}
                  >
                    <img src={MDA} alt='Mercado Digital Anticorrupción' />
                    <Typography>MERCADO DIGITAL</Typography>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            {user.loggedIn ? (
              <Grid item onClick={() => handleOpenLoginDialog()}>
                <div className='logo-sesion'>
                  <img src={LoginIcon} alt='Usuario' />
                </div>
                <div className='autenticado'>
                  <p>
                    <small>{user.nombres}</small>
                  </p>
                  <p>
                    <small>Cerrar sesión</small>
                  </p>
                </div>
              </Grid>
            ) : (
              <Grid item onClick={() => handleOpenLoginDialog()}>
                <div className='logo-sesion'>
                  <img src={LoginIcon} alt='Iniciar sesión' />
                  <p>
                    <small>Iniciar sesión</small>
                  </p>
                </div>
                {/* <div className="autenticado">
                                    <p><small>{user.nombres}</small></p>
                                    <p><small>Iniciar sesión</small></p>
                                </div> */}
                <div />
              </Grid>
            )}
          </div>
        </div>
      </AppBar>
      {/* <section className="motivo-fondo"></section> */}
      {showSistemas && (
        <SistemasMenu toogle={() => toggle()} systems={systems} />
      )}
      {showInterconexion && (
        <InterconexionMenu toogle={() => toggleInterconexion()} />
      )}
    </>
  )
}
export default withStyles(styles)(BannerDesktop)
