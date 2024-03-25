import { useEffect, useRef } from 'react'
import withStyles from '@mui/styles/withStyles'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'

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
    /* '&:hover': {
      backgroundColor: '#FFF'
    }, */
    /* borderStyle: 'solid', */
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
    maxWidth: theme.spacing(7),
    paddingBottom: theme.spacing(1)
  },
  link: {
    textDecoration: 'none',
    color: '#b2bfc4'
  }

})

const SistemasMenu = props => {
  const { classes, systems } = props
  const innerRef = useRef(null)

  useEffect(() => {
    const x = document.getElementById('sistemasMenu')
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
      id='sistemasMenu' ref={innerRef} className={classes.root}
      sx={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      {
                systems.map(system => {
                  return (
                    <Link className={classes.link} to={system.path} key={system.path}>
                      <Box
                        className={`${classes.item}`} sx={{
                          m: 1,
                          p: 2,
                          /* color: "#fff", */
                          backgroundColor: system.color
                        }} key={system.path}
                      >
                        <div className={`${classes.opc} `}>

                          <img src={system.iconLight} alt='PDN' className={classes.icon} />
                          <Typography color='#fff'>{system.shortName}</Typography>

                        </div>
                      </Box>
                    </Link>
                  )
                })
            }
    </Box>
  )
}
export default withStyles(styles)(SistemasMenu)
