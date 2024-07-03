import { useEffect, useRef } from 'react'
import withStyles from '@mui/styles/withStyles'
import { Typography, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import legislacion_icono from '../../assets/rediseno2023/imgs/iconos/menu/ico_sistemas123.svg'
import mapa_s2s3_icono from '../../assets/rediseno2023/imgs/iconos/menu/ico_legislacion.svg'
import icon_cobertura from '../../assets/rediseno2023/imgs/iconos/menu/ico_cobertura.svg'
import icon_norma from "../../assets/rediseno2023/imgs/iconos/menu/ico_norma.svg";
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
    top: '90px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  item: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#c0c0c0',
    minWidth: '375px',
    transition: 'height 2s',
    height: '70%',
    borderRadius: '8px',
    borderWidth: 0,
    borderColor: '#c0c0c0',
    maxWidth: '375px',
    transition: 'height 2s',
    height: '70%',
    borderRadius: '8px',
    borderRadius: '0.6em',
    transition: 'all ease 200ms',

    '&:hover': {
      transform: 'scale(1.03)',
      boxShadow:
        '0 13px 40px -5px hsla(240, 30.1%, 28%, 0.12), 0 8px 32px -8px hsla(0, 0%, 0%, 0.14), 0 -6px 32px -6px hsla(0, 0%, 0%, 0.02)'
    },
    display: 'flex',
    flexDirection: 'none',
    textDecoration: 'none',
    alignItems:'center'
  },
  opc: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    textAlign: 'center'
  },
  icon: {
    maxWidth: '38px',
    paddingRight: theme.spacing(1)
  },
  link: {
    textDecoration: 'none',
    color: '#00f'
  },
  list: {
      listStyleType: 'none',
      margin:'0',
      padding:'0'
  },
  listItem: {
      margin: theme.spacing(1)
  },
  row: {
    display:"flex"
  }
})

const NormatividadMenu = props => {
  const { classes } = props
  const innerRef = useRef(null)

  useEffect(() => {
    const x = document.getElementById('normatividadMenu')
    x.addEventListener('mouseleave', toggle)
    return () => {
      x.removeEventListener('mouseleave', toggle)
    }
  }, [])

  const toggle = () => {
    props.toogle()
  }

  return (
    <Box id={"normatividadMenu"} ref={innerRef} className={classes.root}>
    <div className={classes.row}>
      <div className="col">
      <ul className={classes.list}>
          <li className={classes.listItem}>
              <Link className={classes.link} href='https://www.dof.gob.mx/nota_detalle.php?codigo=5541802&fecha=23/10/2018#gsc.tab=0' target='_blank'>
                  <Box className={classes.item} sx={{ color: '#34b3eb' }}>                   
                      <img src={icon_norma} alt="Normatividad" className={classes.icon} />
                      <Typography>Bases para el funcionamiento de la PDN</Typography>
                  </Box>
              </Link>
          </li>
          <li className={classes.listItem}>
              <Link className={classes.link} href='https://dof.gob.mx/nota_detalle.php?codigo=5729579&fecha=05/06/2024#gsc.tab=0' target='_blank'>
                  <Box className={classes.item} sx={{ color: '#34b3eb' }}>
                      <img src={icon_norma} alt="Normatividad" className={classes.icon} />
                      <Typography>Declaratoria inicio de funciones S1</Typography>
                  </Box>
              </Link>
          </li>
          <li className={classes.listItem}>
              <Link className={classes.link} href='https://dof.gob.mx/nota_detalle.php?codigo=5729579&fecha=05/06/2024#gsc.tab=0' target='_blank'>
                  <Box className={classes.item} sx={{ color: '#34b3eb' }}>
                      <img src={icon_norma} alt="Normatividad" className={classes.icon} />
                      <Typography>Declaratoria inicio de funciones S1</Typography>
                  </Box>
              </Link>
          </li>
      </ul>
      </div>
      <div className="col">
      <ul className={classes.list}>
          <li className={classes.listItem}>
              <Link className={classes.link} href='https://www.dof.gob.mx/nota_detalle.php?codigo=5541802&fecha=23/10/2018#gsc.tab=0' target='_blank'>
                  <Box className={classes.item} sx={{ color: '#34b3eb' }}>                   
                      <img src={icon_norma} alt="Normatividad" className={classes.icon} />
                      <Typography>Bases para el funcionamiento de la PDN</Typography>
                  </Box>
              </Link>
          </li>
          <li className={classes.listItem}>
              <Link className={classes.link} href='https://dof.gob.mx/nota_detalle.php?codigo=5729579&fecha=05/06/2024#gsc.tab=0' target='_blank'>
                  <Box className={classes.item} sx={{ color: '#34b3eb' }}>
                      <img src={icon_norma} alt="Normatividad" className={classes.icon} />
                      <Typography>Declaratoria inicio de funciones S1</Typography>
                  </Box>
              </Link>
          </li>
          <li className={classes.listItem}>
              <Link className={classes.link} href='https://dof.gob.mx/nota_detalle.php?codigo=5729579&fecha=05/06/2024#gsc.tab=0' target='_blank'>
                  <Box className={classes.item} sx={{ color: '#34b3eb' }}>
                      <img src={icon_norma} alt="Normatividad" className={classes.icon} />
                      <Typography>Declaratoria inicio de funciones S1</Typography>
                  </Box>
              </Link>
          </li>
      </ul>
      </div>
      <div className="col">
      <ul className={classes.list}>
          <li className={classes.listItem}>
              <Link className={classes.link} href='https://www.dof.gob.mx/nota_detalle.php?codigo=5541802&fecha=23/10/2018#gsc.tab=0' target='_blank'>
                  <Box className={classes.item} sx={{ color: '#34b3eb' }}>                   
                      <img src={icon_norma} alt="Normatividad" className={classes.icon} />
                      <Typography>Bases para el funcionamiento de la PDN</Typography>
                  </Box>
              </Link>
          </li>
          <li className={classes.listItem}>
              <Link className={classes.link} href='https://dof.gob.mx/nota_detalle.php?codigo=5729579&fecha=05/06/2024#gsc.tab=0' target='_blank'>
                  <Box className={classes.item} sx={{ color: '#34b3eb' }}>
                      <img src={icon_norma} alt="Normatividad" className={classes.icon} />
                      <Typography>Declaratoria inicio de funciones S1</Typography>
                  </Box>
              </Link>
          </li>
          <li className={classes.listItem}>
              <Link className={classes.link} href='https://dof.gob.mx/nota_detalle.php?codigo=5729579&fecha=05/06/2024#gsc.tab=0' target='_blank'>
                  <Box className={classes.item} sx={{ color: '#34b3eb' }}>
                      <img src={icon_norma} alt="Normatividad" className={classes.icon} />
                      <Typography>Declaratoria inicio de funciones S1</Typography>
                  </Box>
              </Link>
          </li>
      </ul>
      </div>
    </div>
      
  </Box>
  )
}
export default withStyles(styles)(NormatividadMenu)
