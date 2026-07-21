import { withStyles } from 'tss-react/mui';
import { Box, Typography } from '@mui/material'
import VerticalProgressBar from './VerticalProgressBar'
import PieChart from './PieChart'
import GavelIcon from '@mui/icons-material/Gavel'

const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:last-child': {
      borderBottom: 'none'
    },
    // Versión de una sola columna (entre móvil y 2 columnas)
    '@media (min-width: 901px) and (max-width: 1849px)': {
      paddingTop: theme.spacing(1.5),
      paddingBottom: theme.spacing(1.5),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      gap: theme.spacing(3)
    },
    '@media (max-width: 1950px)': {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    },
    '@media (max-width: 900px)': {
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    }
  },
  text: {
    color: theme.palette.text.primary,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

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
    ? (
      <>
        Total de órganos internos
        <br />
        de control conectados
      </>
    )
    : <>Total de instituciones <br />conectadas</>;

  /* Vista detallada por Sistema */
  return (
    <Box className={classes.container}>
      {/* Header con ícono y nombre del sistema */}
      <Box sx={{ 
        textAlign: 'center',
        maxWidth: 200,
        minHeight: 200,
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', 
        gap: 1,
        '@media (max-width: 900px)': {
          maxWidth: '100%',
          minHeight: 'auto',
          width: '100%',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          justifyContent: 'flex-start',
          gap: 1.5,
          marginBottom: 2,
          paddingBottom: 2,
          borderBottom: `2px solid ${color}`
        }
      }}>
        <Box component="img" src={icon} alt={`Sistema ${system.id}`} sx={{
          width: '120px',
          height: '120px',
          '@media (max-width: 900px)': {
            width: '50px',
            height: '50px',
            flexShrink: 0
          }
        }} />

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
          '@media (max-width: 900px)': {
            flex: 1,
            alignItems: 'flex-start'
          }
        }}>
          <Typography variant='subtitle1' sx={{
            color,
            fontWeight: 'bold',
            flexGrow: 1, 
            fontSize: '1rem',
            '@media (max-width: 900px)': {
              fontSize: '0.85rem',
              lineHeight: 1.2
            }
          }}>
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
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              whiteSpace: 'nowrap'
            }}>
              <GavelIcon fontSize="small" sx={{ fontSize: '0.9rem' }} />
              Tribunal
            </Box>
          )}
        </Box>
      </Box>
      {/* Contenido de las gráficas - todas en línea */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          justifyContent: 'center',
          alignItems: 'flex-end',
          gap: 1.5,
          minHeight: '340px',

          '@media (max-width: 900px)': {
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 3,
            minHeight: 'auto'
          }
        }}>

        <Box
          sx={{
            p: 0.5,
            textAlign: 'center',

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

        <Box
          sx={{
            p: 0.5,
            textAlign: 'center',

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

        <Box
          sx={{
            p: 0.5,
            textAlign: 'center',

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

        <Box
          sx={{
            p: 0.5,
            textAlign: 'center',

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

        <Box
          sx={{
            p: 0.5,
            textAlign: 'center',

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
        <Box
          sx={{
            p: 0.5,
            textAlign: 'center',
            maxWidth: 300,
            minWidth: 240,

            '@media (max-width: 900px)': {
              flexBasis: '100%',
              maxWidth: '100%',
              minWidth: 'auto',
              marginTop: 2
            }
          }}>
          <Typography
            sx={{
              color: '#707274',
              fontWeight: 'bold',
              minHeight: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.95rem',
              lineHeight: 1.2,
              paddingX: 1
            }}>
            {tituloConexion}
          </Typography>

          <PieChart color={color} value={get_value(system.id)} />

          <Typography variant='h3' sx={{ color, fontWeight: 'bold' }}>
            {get_value(system.id)}%
          </Typography>
          <Typography variant='subtitle1' sx={{
            color: '#707274'
          }}>
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
  );
}

export default withStyles(VistaDetalleSistema, styles);
