import withStyles from '@mui/styles/withStyles'
import { Box, Typography } from '@mui/material'
import VerticalProgressBar from './VerticalProgressBar'
import PieChart from './PieChart'
import GavelIcon from '@mui/icons-material/Gavel'

const styles = theme => ({
  container: {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:last-child': {
      borderBottom: 'none'
    },
    '@media (max-width: 1450px)': {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    },
    '@media (max-width: 900px)': {
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5)
    }
  },
  text: {
    color: theme.palette.text.primary,
    textAlign: 'center',
    fontWeight: 'bold'
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
    <Box className={classes.container}>
      
      {/* Header con ícono y nombre del sistema */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1.5,
        mb: 2,
        pb: 1.5,
        borderBottom: `2px solid ${color}`
      }}>
        <img src={icon} style={{ width: '40px', height: '40px' }} alt={`Sistema ${system.id}`} />
        <Typography variant='subtitle1' fontWeight='bold' color={color} sx={{ flexGrow: 1, fontSize: '0.85rem' }}>
          {name}
        </Typography>
        
        {/* Si es sistema 3 y tribunal conectado, mostrar badge */}
        {mostrarSelloTribunal && (
          <Box sx={{
            backgroundColor: '#9085DA',
            color: 'white',
            padding: '3px 10px',
            borderRadius: '15px',
            fontSize: '0.7rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            whiteSpace: 'nowrap'
          }}>
            <GavelIcon fontSize="small" sx={{ fontSize: '0.9rem' }} />
            Tribunal Conectado
          </Box>
        )}
      </Box>

      {/* Contenido de las gráficas - todas en línea */}
      <Box display='flex' flexWrap='nowrap' justifyContent='center' alignItems='flex-end' gap={1.5} sx={{ 
        minHeight: '340px',
        '@media (max-width: 900px)': {
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 3,
          minHeight: 'auto'
        }
      }}>
        
        <Box p={0.5} textAlign='center' sx={{
          '@media (max-width: 900px)': {
            flexBasis: 'calc(50% - 24px)',
            minWidth: 'auto'
          },
          '@media (max-width: 600px)': {
            flexBasis: 'calc(33.333% - 24px)',
            minWidth: '100px'
          }
        }}>
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
          <Box sx={{ minHeight: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography className={classes.text} variant='body2'>
              Ejecutivo
            </Typography>
          </Box>
        </Box>

        <Box p={0.5} textAlign='center' sx={{
          '@media (max-width: 900px)': {
            flexBasis: 'calc(50% - 24px)',
            minWidth: 'auto'
          },
          '@media (max-width: 600px)': {
            flexBasis: 'calc(33.333% - 24px)',
            minWidth: '100px'
          }
        }}>
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
          <Box sx={{ minHeight: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography className={classes.text} variant='body2'>Legislativo</Typography>
          </Box>
        </Box>

        <Box p={0.5} textAlign='center' sx={{
          '@media (max-width: 900px)': {
            flexBasis: 'calc(50% - 24px)',
            minWidth: 'auto'
          },
          '@media (max-width: 600px)': {
            flexBasis: 'calc(33.333% - 24px)',
            minWidth: '100px'
          }
        }}>
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
          <Box sx={{ minHeight: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography className={classes.text} variant='body2'>Judicial</Typography>
          </Box>
        </Box>

        <Box p={0.5} textAlign='center' sx={{
          '@media (max-width: 900px)': {
            flexBasis: 'calc(50% - 24px)',
            minWidth: 'auto'
          },
          '@media (max-width: 600px)': {
            flexBasis: 'calc(33.333% - 24px)',
            minWidth: '100px'
          }
        }}>
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
          <Box sx={{ minHeight: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography className={classes.text} variant='body2'>Autónomos</Typography>
          </Box>
        </Box>

        <Box p={0.5} textAlign='center' sx={{
          '@media (max-width: 900px)': {
            flexBasis: 'calc(50% - 24px)',
            minWidth: 'auto'
          },
          '@media (max-width: 600px)': {
            flexBasis: 'calc(33.333% - 24px)',
            minWidth: '110px'
          }
        }}>
          <Box sx={{
            borderColor: '#707274',
            borderStyle: 'solid',
            borderWidth: '0 2px 0 2px',
            paddingRight: 1.5,
            paddingLeft: 1.5
          }}>
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
            <Box sx={{ minHeight: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography className={classes.text} variant='body2'>Municipios y</Typography>
              <Typography className={classes.text} variant='body2'>Org. Municipales</Typography>
            </Box>
          </Box>
        </Box>

        {/* Gráfica circular */}
        <Box p={0.5} textAlign='center' sx={{ 
          maxWidth: 300, 
          minWidth: 240,
          '@media (max-width: 900px)': {
            flexBasis: '100%',
            maxWidth: '100%',
            minWidth: 'auto',
            marginTop: 2
          }
        }}>
          <Typography color='#707274' sx={{ 
            fontWeight: 'bold', 
            minHeight: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            lineHeight: 1.1,
            paddingX: 1
          }}>
            {tituloConexion}
          </Typography>

          <PieChart color={color} value={get_value(system.id)} />

          <Typography variant='h3' sx={{ fontWeight: 'bold' }} color={color}>
            {get_value(system.id)}%
          </Typography>
          <Typography color='#707274' variant='subtitle1'>
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
  )
}

export default withStyles(styles)(VistaDetalleSistema)