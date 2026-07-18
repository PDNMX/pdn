import { Typography, Grid, Paper, Box } from '@mui/material'
import { withStyles } from 'tss-react/mui';
import { useParams } from 'react-router-dom'
import HeaderV2 from '../HomeV2/HeaderV2'
import pdnRoutes from '../../routes'
import estados from './estados.json'
import CustomizedProgressBar from './CustomizedProgressBar'
import icon_s1 from '../../assets/rediseno/ico_sistemas/ico_s1_color.svg'
import icon_s2 from '../../assets/rediseno/ico_sistemas/ico_s2_color.svg'
import icon_s3 from '../../assets/rediseno/ico_sistemas/ico_s3_color.svg'
import icon_s6 from '../../assets/rediseno/ico_sistemas/ico_s6_color.svg'
import VistaDetalleSistema from './VistaDetalleSistema'

const colors = {
  s1: '#F29888',
  s2: '#B25FAC',
  s3: '#9085DA',
  s6: '#42A5CC'
}

const styles = theme => ({
  rootItem: {
    maxWidth: 2060, // Regresado a 1600
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    margin: '0 32px',
    [theme.breakpoints.down('xl')]: {
      maxWidth: 1400
    },
    [theme.breakpoints.down('lg')]: {
      maxWidth: 1200
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%'
    }
  },
  rootPaper: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    color: theme.palette.primary.contrastText,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.primary.main,
    borderRadius: '10px',
    overflowX: 'hidden'
  },
  headerCard: {
    flexGrow: 1,
    background: theme.palette.background.default,
  }
});

const percentage = (a, b) => {
  if (a === 0 || b === 0) {
    return 0
  } else {
    return (a / b * 100).toFixed(0)
  }
}

const VistaDetalleEstado = props => {
  const { classes } = props
  const { id_estado } = useParams()
  const section = pdnRoutes.find(r => r.path === '/cobertura/:id_estado')
  
  // Buscar el estado por id o por nombre
  let estado = estados.find(e => e.route && e.route.includes(id_estado));
  
  // Si no se encuentra, buscar por nombre (para estados con disabled: true)
  if (!estado) {
    const normalizedId = id_estado.toLowerCase();
    estado = estados.find(e => 
      e.name.toLowerCase().replace(/\s+/g, '-').replace(/ó/g, 'o').replace(/á/g, 'a')
        .replace(/é/g, 'e').replace(/í/g, 'i').replace(/ú/g, 'u').replace(/ñ/g, 'n') === normalizedId
    );
  }
  
  // Si aún no se encuentra, redirigir o mostrar un mensaje apropiado
  if (!estado) {
    console.error(`Estado no encontrado para id: ${id_estado}`);
    return (
      <div>
        <HeaderV2 section={section} />
        <Grid container spacing={0} sx={{
          justifyContent: 'center'
        }}>
          <Grid className={classes.rootItem} size={12}>
            <Paper elevation={15} className={classes.rootPaper}>
              <Typography
                variant='h3'
                align='center'
                sx={{
                  color: '#713972',
                  marginBottom: "16px"
                }}>
                Estado no encontrado
              </Typography>
              <Typography
                align='center'
                sx={{
                  color: '#000',
                  marginBottom: "16px"
                }}>
                No se encontró información para el estado solicitado.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }

  // Asegurarnos de que el estado tenga la nueva estructura para s3
  if (Object.prototype.hasOwnProperty.call(estado.data.s3, 's3oic')) {
    const s3t = estado.data.s3.s3t;
    const totalOIC = estado.data.s3.s3oic.total;
    const tieneOIC = estado.data.s3.s3oic.tiene;
    
    estado.data.s3 = {
      "ejecutivo": { "tiene": Math.round(tieneOIC * 0.4), "total": Math.round(totalOIC * 0.4) },
      "legislativo": { "tiene": Math.round(tieneOIC * 0.1), "total": Math.round(totalOIC * 0.1) },
      "judicial": { "tiene": Math.round(tieneOIC * 0.1), "total": Math.round(totalOIC * 0.1) },
      "ocas": { "tiene": Math.round(tieneOIC * 0.1), "total": Math.round(totalOIC * 0.1) },
      "municipal": { "tiene": Math.round(tieneOIC * 0.3), "total": Math.round(totalOIC * 0.3) },
      "s3t": s3t
    };
  }

  const systems = [
    {
      id: 1,
      color: colors.s1,
      icon: icon_s1,
      name: 'Sistema de evolución patrimonial, de declaración de intereses y constancia de presentación de declaración fiscal'
    },
    {
      id: 2,
      color: colors.s2,
      icon: icon_s2,
      name: 'Sistema de los servidores públicos que intervengan en procedimientos de contrataciones públicas'
    },
    {
      id: 3,
      color: colors.s3,
      icon: icon_s3,
      name: 'Sistema nacional de servidores públicos y particulares sancionados'
    },
    {
      id: 6,
      color: colors.s6,
      icon: icon_s6,
      name: 'Sistema de información pública de contrataciones'
    }
  ]

  const avance_s1 = percentage(
    estado.data.s1.ejecutivo.tiene +
        estado.data.s1.legislativo.tiene +
        estado.data.s1.judicial.tiene +
        estado.data.s1.ocas.tiene +
        estado.data.s1.municipal.tiene
    ,
    estado.data.s1.ejecutivo.total +
        estado.data.s1.legislativo.total +
        estado.data.s1.judicial.total +
        estado.data.s1.ocas.total +
        estado.data.s1.municipal.total
  )

  const avance_s2 = percentage(
    estado.data.s2.ejecutivo.tiene +
        estado.data.s2.legislativo.tiene +
        estado.data.s2.judicial.tiene +
        estado.data.s2.ocas.tiene +
        estado.data.s2.municipal.tiene,
    estado.data.s2.ejecutivo.total +
        estado.data.s2.legislativo.total +
        estado.data.s2.judicial.total +
        estado.data.s2.ocas.total +
        estado.data.s2.municipal.total
  )

  const avance_s3 = percentage(
    estado.data.s3.ejecutivo.tiene +
        estado.data.s3.legislativo.tiene +
        estado.data.s3.judicial.tiene +
        estado.data.s3.ocas.tiene +
        estado.data.s3.municipal.tiene,
    estado.data.s3.ejecutivo.total +
        estado.data.s3.legislativo.total +
        estado.data.s3.judicial.total +
        estado.data.s3.ocas.total +
        estado.data.s3.municipal.total
  )

  const avance_s6 = percentage(
    estado.data.s6.ejecutivo.tiene +
        estado.data.s6.legislativo.tiene +
        estado.data.s6.judicial.tiene +
        estado.data.s6.ocas.tiene +
        estado.data.s6.municipal.tiene,
    estado.data.s6.ejecutivo.total +
        estado.data.s6.legislativo.total +
        estado.data.s6.judicial.total +
        estado.data.s6.ocas.total +
        estado.data.s6.municipal.total
  )

  return (
    <div>
      <HeaderV2 section={section} />
      <Grid container spacing={0} sx={{
        justifyContent: 'center'
      }}>
        <Grid className={classes.rootItem} size={12}>
          <Paper elevation={15} className={classes.rootPaper}>

            <Typography
              variant='h3'
              align='center'
              sx={{
                color: '#713972',
                marginBottom: "16px"
              }}>
              {estado.name}
            </Typography>

            <Typography
              align='center'
              sx={{
                color: '#000',
                marginBottom: "16px"
              }}>
              Información al 30 de junio de 2026, reportada por la Secretaría Ejecutiva del Sistema Estatal Anticorrupción 
            </Typography>

            {/* Header con resumen general - Unificado */}
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 3, 
              mb: 3,
              p: 2,
              '@media (max-width: 900px)': {
                flexDirection: 'column',
                gap: 2
              }
            }}>
              {/* Icono del estado */}
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src={`/img/cobertura/iconos_estados/${estado.icon2}`} 
                  style={{ width: '280px', padding: '23px' }} 
                  alt={estado.name} 
                />
              </Box>

              {/* Barras de progreso */}
              <Box sx={{ 
                paddingTop: '40px', 
                flexGrow: 1,
                minWidth: '300px',
                '@media (max-width: 900px)': {
                  paddingTop: '20px',
                  width: '100%'
                }
              }}>
                <Box sx={{
                  display: 'flex'
                }}>
                  <img src={icon_s1} alt='Sistema 1' style={{ width: '40px', padding: '2px' }} />
                  <CustomizedProgressBar value={avance_s1} color={colors.s1} />
                </Box>

                <Box sx={{
                  display: 'flex'
                }}>
                  <img src={icon_s2} alt='Sistema 2' style={{ width: '40px', padding: '2px' }} />
                  <CustomizedProgressBar value={avance_s2} color={colors.s2} />
                </Box>

                <Box sx={{
                  display: 'flex'
                }}>
                  <img src={icon_s3} alt='Sistema 3' style={{ width: '40px', padding: '2px' }} />
                  <CustomizedProgressBar value={avance_s3} color={colors.s3} />
                </Box>

                <Box sx={{
                  display: 'flex'
                }}>
                  <img src={icon_s6} alt='Sistema 6' style={{ width: '40px', padding: '2px' }} />
                  <CustomizedProgressBar value={avance_s6} color={colors.s6} />
                </Box>
              </Box>

              {/* Estadísticas */}
              <Box sx={{ 
                p: 2, 
                textAlign: 'center', 
                minWidth: 200,
                '@media (max-width: 900px)': {
                  width: '100%'
                }
              }}>
                <Typography
                  variant='h5'
                  sx={{
                    color: '#713972',
                    fontWeight: 'bold',
                    mb: 2
                  }}>
                  Instituciones en la PDN
                </Typography>

                <Typography variant='h4' sx={{ color: colors.s1, fontWeight: 'bold' }}>
                  {avance_s1}%
                </Typography>
                <Typography
                  sx={{
                    color: '#713972',
                    textAlign: 'center'
                  }}>
                  {
                    estado.data.s1.ejecutivo.tiene +
                    estado.data.s1.legislativo.tiene +
                    estado.data.s1.judicial.tiene +
                    estado.data.s1.ocas.tiene +
                    estado.data.s1.municipal.tiene
                  } de {
                    estado.data.s1.ejecutivo.total +
                    estado.data.s1.legislativo.total +
                    estado.data.s1.judicial.total +
                    estado.data.s1.ocas.total +
                    estado.data.s1.municipal.total
                  }
                </Typography>

                <Typography variant='h4' sx={{ color: colors.s2, fontWeight: 'bold' }}>
                  {avance_s2}%
                </Typography>
                <Typography
                  sx={{
                    color: '#713972',
                    textAlign: 'center'
                  }}>
                  {
                    estado.data.s2.ejecutivo.tiene +
                    estado.data.s2.legislativo.tiene +
                    estado.data.s2.judicial.tiene +
                    estado.data.s2.ocas.tiene +
                    estado.data.s2.municipal.tiene
                  } de {
                    estado.data.s2.ejecutivo.total +
                    estado.data.s2.legislativo.total +
                    estado.data.s2.judicial.total +
                    estado.data.s2.ocas.total +
                    estado.data.s2.municipal.total
                  }
                </Typography>

                <Typography variant='h4' sx={{ color: colors.s3, fontWeight: 'bold' }}>
                  {avance_s3}%
                </Typography>
                <Typography
                  sx={{
                    color: '#713972',
                    textAlign: 'center'
                  }}>
                  {
                    estado.data.s3.ejecutivo.tiene +
                    estado.data.s3.legislativo.tiene +
                    estado.data.s3.judicial.tiene +
                    estado.data.s3.ocas.tiene +
                    estado.data.s3.municipal.tiene
                  } de {
                    estado.data.s3.ejecutivo.total +
                    estado.data.s3.legislativo.total +
                    estado.data.s3.judicial.total +
                    estado.data.s3.ocas.total +
                    estado.data.s3.municipal.total
                  }
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    color: '#713972',
                    textAlign: 'center'
                  }}>
                  Tribunal: {estado.data.s3.s3t ? 'Sí' : 'No'}
                </Typography>

                <Typography variant='h4' sx={{ color: colors.s6, fontWeight: 'bold' }}>
                  {avance_s6}%
                </Typography>
                <Typography
                  sx={{
                    color: '#713972',
                    textAlign: 'center'
                  }}>
                  {
                    estado.data.s6.ejecutivo.tiene +
                    estado.data.s6.legislativo.tiene +
                    estado.data.s6.judicial.tiene +
                    estado.data.s6.ocas.tiene +
                    estado.data.s6.municipal.tiene
                  } de {
                    estado.data.s6.ejecutivo.total +
                    estado.data.s6.legislativo.total +
                    estado.data.s6.judicial.total +
                    estado.data.s6.ocas.total +
                    estado.data.s6.municipal.total
                  }
                </Typography>
              </Box>
            </Box>

            {/* Grid responsivo para 2 columnas en pantallas grandes - SIN bordes individuales */}
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 0,
              '@media (min-width: 1850px)': {
                gridTemplateColumns: '1fr 1fr'
              }
            }}>
              {systems.map(system => (
                <VistaDetalleSistema
                  key={system.id}
                  estado={estado} 
                  system={system}
                  avance_s1={avance_s1}
                  avance_s2={avance_s2}
                  avance_s3={avance_s3}
                  avance_s6={avance_s6}
                />
              ))}
            </Box>

          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(VistaDetalleEstado, styles);
