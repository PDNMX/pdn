import withStyles from '@mui/styles/withStyles'
import { Box, Paper, Typography, Badge } from '@mui/material'
import VerticalProgressBar from './VerticalProgressBar'
import PieChart from './PieChart'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import GavelIcon from '@mui/icons-material/Gavel'

const styles = theme => ({
  paper: {
    flexGrow: 1,
    background: theme.palette.background.default,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.primary.main,
    borderRadius: '10px 10px 10px 10px'
  },
  text: {
    color: theme.palette.text.primary,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  tribunalSello: {
    position: 'absolute',
    right: '-15px',
    top: '-15px',
    backgroundColor: '#9085DA',
    borderRadius: '50%',
    padding: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    zIndex: 1,
    transform: 'rotate(15deg)'
  }
})

const bar_colors = ['#a95879', '#e8bb59', '#b78779', '#7dade3', '#e388af']

const percentage = (a, b) => {
  if (a === 0) {
    return 0
  } else {
    return (a / b * 100).toFixed(0)
  }
}

const VistaDetalleSistema = props => {
  const { estado, system, classes, avance_s1, avance_s2, avance_s3, avance_s6 } = props
  const { icon, color, name } = system
  const get_value = id => {
    switch (id) {
      case 1:
        return avance_s1
      case 2:
        return avance_s2
      case 3:
        return avance_s3
      case 6:
        return avance_s6
      default:
        return avance_s1
    }
  }

  // Determinar si debemos mostrar el sello del tribunal
  const mostrarSelloTribunal = system.id === 3 && estado.data.s3.s3t;

  // Determinar el texto del título según el sistema
  const tituloConexion = system.id === 3 
    ? "Total de órganos internos de control conectados" 
    : "Total de instituciones conectadas";

  /* Vista detallada por Sistema */
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch' }} justifyContent='center'>

      <Paper elevation={15} sx={{ m: 1, p: 2, maxWidth: 200, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center', position: 'relative' }} className={classes.paper}>
        
        <Box p={2}>
          <img src={icon} style={{ width: '120px' }} alt={estado.name} />
        </Box>

        <Box p={1}>
          <Typography paragraph fontWeight='bold' color={color} align='center'>
            {name}
          </Typography>
        </Box>
      </Paper>

      <Paper elevation={15} sx={{ m: 1, p: 2, display: 'flex', justifyContent: 'center', position: 'relative' }} className={classes.paper}>
        {/* Si es sistema 3 y tribunal conectado, mostrar cinta o indicador */}
        {mostrarSelloTribunal && (
          <Box 
            sx={{
              position: 'absolute',
              top: '0',
              right: '0',
              backgroundColor: '#9085DA',
              color: 'white',
              padding: '4px 10px',
              borderRadius: '0 0 0 8px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <GavelIcon fontSize="small" style={{ marginRight: '4px' }} />
            Tribunal Conectado
          </Box>
        )}

        {/* Contenido existente */}
        <Box display='flex' flexWrap='wrap'>
          <Box p={1} textAlign='center'>
            <Typography variant='h5' sx={{ color: bar_colors[0], fontWeight: 'bold' }}>
              {percentage(
                estado.data[`s${system.id}`].ejecutivo.tiene,
                estado.data[`s${system.id}`].ejecutivo.total
              )}%
            </Typography>
            <Typography variant='body2' className={classes.text}>
              {estado.data[`s${system.id}`].ejecutivo.tiene} de {estado.data[`s${system.id}`].ejecutivo.total}
            </Typography>
            <VerticalProgressBar
              color={bar_colors[0]} value={percentage(
                estado.data[`s${system.id}`].ejecutivo.tiene,
                estado.data[`s${system.id}`].ejecutivo.total
              )}
            />
            <Typography className={classes.text}>
              Ejecutivo
            </Typography>
          </Box>

          <Box p={1} textAlign='center'>
            <Typography variant='h5' sx={{ color: bar_colors[1], fontWeight: 'bold' }}>
              {percentage(
                estado.data[`s${system.id}`].legislativo.tiene,
                estado.data[`s${system.id}`].legislativo.total
              )}%
            </Typography>
            <Typography variant='body2' className={classes.text}>
              {estado.data[`s${system.id}`].legislativo.tiene} de {estado.data[`s${system.id}`].legislativo.total}
            </Typography>
            <VerticalProgressBar
              color={bar_colors[1]} value={percentage(
                estado.data[`s${system.id}`].legislativo.tiene,
                estado.data[`s${system.id}`].legislativo.total
              )}
            />
            <Typography className={classes.text}>Legislativo</Typography>
          </Box>

          <Box p={1} textAlign='center'>
            <Typography variant='h5' sx={{ color: bar_colors[2], fontWeight: 'bold' }}>
              {percentage(
                estado.data[`s${system.id}`].judicial.tiene,
                estado.data[`s${system.id}`].judicial.total
              )}%
            </Typography>
            <Typography variant='body2' className={classes.text}>
              {estado.data[`s${system.id}`].judicial.tiene} de {estado.data[`s${system.id}`].judicial.total}
            </Typography>
            <VerticalProgressBar
              color={bar_colors[2]} value={percentage(
                estado.data[`s${system.id}`].judicial.tiene,
                estado.data[`s${system.id}`].judicial.total
              )}
            />
            <Typography className={classes.text}>Judicial</Typography>
          </Box>

          <Box p={1} textAlign='center'>
            <Typography variant='h5' sx={{ color: bar_colors[3], fontWeight: 'bold' }}>
              {percentage(
                estado.data[`s${system.id}`].ocas.tiene,
                estado.data[`s${system.id}`].ocas.total
              )}%
            </Typography>
            <Typography variant='body2' className={classes.text}>
              {estado.data[`s${system.id}`].ocas.tiene} de {estado.data[`s${system.id}`].ocas.total}
            </Typography>
            <VerticalProgressBar
              color={bar_colors[3]} value={percentage(
                estado.data[`s${system.id}`].ocas.tiene,
                estado.data[`s${system.id}`].ocas.total
              )}
            />
            <Typography className={classes.text}>Autónomos</Typography>
          </Box>

          <Box p={1} textAlign='center'>
            <Box sx={{
              borderColor: '#707274',
              borderStyle: 'solid',
              borderWidth: '0 2px 0 2px',
              paddingRight: 2,
              paddingLeft: 2
            }}
            >
              <Typography variant='h5' sx={{ color: bar_colors[4], fontWeight: 'bold' }}>
                {percentage(
                  estado.data[`s${system.id}`].municipal.tiene,
                  estado.data[`s${system.id}`].municipal.total
                )}%
              </Typography>
              <Typography variant='body2' className={classes.text}>
                {estado.data[`s${system.id}`].municipal.tiene} de {estado.data[`s${system.id}`].municipal.total}
              </Typography>
              <VerticalProgressBar
                color={bar_colors[4]} value={percentage(
                  estado.data[`s${system.id}`].municipal.tiene,
                  estado.data[`s${system.id}`].municipal.total
                )}
              />
              <Typography className={classes.text} variant='body2'>Municipios y</Typography>
              <Typography className={classes.text} variant='body2'>Org. Municipales</Typography>
            </Box>
          </Box>

          <Box p={1} textAlign='center' display='flex' flexWrap='wrap' alignContent='center' sx={{ maxWidth: 300, position: 'relative' }}>

            {/* Radial chart */}
            <Box>
              <Typography color='#707274' sx={{ fontWeight: 'bold' }} variant='h6'>
                {tituloConexion}
              </Typography>

              <PieChart color={color} value={get_value(system.id)} />

              <Typography variant='h3' sx={{ fontWeight: 'bold' }} color={color}>
                {get_value(system.id)}%
              </Typography>
              <Typography color='#707274' variant='h6'>
                {
                  estado.data[`s${system.id}`].ejecutivo.tiene +
                  estado.data[`s${system.id}`].legislativo.tiene +
                  estado.data[`s${system.id}`].judicial.tiene +
                  estado.data[`s${system.id}`].ocas.tiene +
                  estado.data[`s${system.id}`].municipal.tiene
                } de {
                  estado.data[`s${system.id}`].ejecutivo.total +
                  estado.data[`s${system.id}`].legislativo.total +
                  estado.data[`s${system.id}`].judicial.total +
                  estado.data[`s${system.id}`].ocas.total +
                  estado.data[`s${system.id}`].municipal.total
                }
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default withStyles(styles)(VistaDetalleSistema)