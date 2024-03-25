import { useEffect, useRef } from 'react'
import withStyles from '@mui/styles/withStyles'
import { Typography, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import legislacion_icono from '../../assets/rediseno2023/imgs/iconos/menu/ico_sistemas123.svg'
import mapa_s2s3_icono from '../../assets/rediseno2023/imgs/iconos/menu/ico_legislacion.svg'
import icon_cobertura from '../../assets/rediseno2023/imgs/iconos/menu/ico_cobertura.svg'
import Box from '@mui/material/Box'
import ReactGA from 'react-ga4'

const styles = theme => ({
  root: {
    backgroundColor: '#f7f7f7',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    top: '95px'
  },
  item: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#c0c0c0',
    minWidth: theme.spacing(25),
    transition: 'height 2s',
    height: '70%',
    borderRadius: '8px',
    borderWidth: 0,
    borderColor: '#c0c0c0',
    maxWidth: theme.spacing(25),
    transition: 'height 2s',
    height: '70%',
    borderRadius: '8px',
    borderRadius: '0.6em',
    boxShadow:
      '0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25), 0 8px 16px -8px hsla(0, 0%, 0%, 0.3), 0 -6px 16px -6px hsla(0, 0%, 0%, 0.03)',
    transition: 'all ease 200ms',

    '&:hover': {
      transform: 'scale(1.03)',
      boxShadow:
        '0 13px 40px -5px hsla(240, 30.1%, 28%, 0.12), 0 8px 32px -8px hsla(0, 0%, 0%, 0.14), 0 -6px 32px -6px hsla(0, 0%, 0%, 0.02)'
    },
    display: 'flex',
    flexDirection: 'column',
    textDecoration: 'none'
  },
  opc: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    textAlign: 'center'
  },
  icon: {
    maxWidth: theme.spacing(9),
    paddingBottom: theme.spacing(1)
  },
  link: {
    textDecoration: 'none',
    color: '#00f'
  }
})

const InterconexionMenu = props => {
  const { classes } = props
  const innerRef = useRef(null)

  useEffect(() => {
    const x = document.getElementById('interconexionMenu')
    x.addEventListener('mouseleave', toggle)
    return () => {
      x.removeEventListener('mouseleave', toggle)
    }
  }, [])

  const toggle = () => {
    props.toogle()
  }

  return (
    <Box
      id='interconexionMenu' ref={innerRef} className={classes.root} sx={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >

      <Link className={classes.link} href='/mapa-sla/' onClick={() => ReactGA.pageview('/mapa-sla')}>
        <Box
          className={`${classes.item}`} sx={{
            m: 1,
            p: 2,
            color: '#c0c0c0'
          }}
        >
          <div className={`${classes.opc} `}>
            <img src={legislacion_icono} alt='Legislación' className={classes.icon} />
            <Typography color='#3a1c3a'>Legislación</Typography>

          </div>
        </Box>
      </Link>

      <Link className={classes.link} href='/mapa-avance/' onClick={() => ReactGA.pageview('/mapa-avance')}>
        <Box
          className={`${classes.item}`} sx={{
            m: 1,
            p: 2,
            color: '#c0c0c0'
          }}
        >
          <div className={`${classes.opc} `}>

            <img src={mapa_s2s3_icono} alt='Sistemas 1, 2 y 3' className={classes.icon} />
            <Typography color='#3a1c3a'>Sistemas 1, 2 y 3</Typography>

          </div>
        </Box>
      </Link>

      <Link className={classes.link} component={RouterLink} to='/cobertura'>
        <Box
          className={`${classes.item}`} sx={{
            m: 1,
            p: 2,
            color: '#c0c0c0'
          }}
        >
          <div className={`${classes.opc} `}>
            <img src={icon_cobertura} alt='Cobertura' className={classes.icon} />
            <Typography color='#3a1c3a'>Cobertura</Typography>
          </div>
        </Box>
      </Link>

    </Box>
  )
}
export default withStyles(styles)(InterconexionMenu)
