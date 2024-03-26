import { withStyles } from '@mui/styles'
import { Box, Typography } from '@mui/material'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import logo from '../../assets/ico-evolucion.svg'
import ButtonPDN from '../Compartidos/ButtonPDN'

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: '200px',
    backgroundColor: theme.palette.background.paperChart,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: theme.spacing(2)
  },
  logo: {
    width: '130px'
  },
  manitad: {
    paddingRight: '6px',
    maxHeight: '40px'
  },
  manitai: {
    maxHeight: '40px'
  },
  headingText: {
    color: theme.palette.text.main,
    fontWeight: 'bold',
    maxWidth: '450px'
  }
})

const Evolucion = props => {
  const { classes } = props
  const url_herramienta = 'https://evolucion.plataformadigitalnacional.org'
  const url_manual = 'https://drive.google.com/file/d/1hZgaoSR6r2_vu0KyUNqkboaZ7dTucW_G/view'

  return (
    <div className={classes.root}>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>

        <Box p={3}>
          <img src={logo} alt='Semana PDN' className={classes.logo} />
        </Box>

        <Box p={3}>
          <Typography variant='h5' className={classes.headingText} paragraph>
            Herramienta de Verificación de
            Evolucion patrimonial y de intereses
          </Typography>

          <ButtonPDN
            href={url_herramienta} target='_blank' variant='contained'
            startIcon={<DirectionsWalkIcon />}
          >
            Acceso
          </ButtonPDN>

          <ButtonPDN
            href={url_manual} target='_blank' variant='contained'
            startIcon={<MenuBookIcon />}
          >
            Manual de usuario
          </ButtonPDN>
        </Box>

      </Box>
    </div>
  )
}

export default withStyles(styles)(Evolucion)