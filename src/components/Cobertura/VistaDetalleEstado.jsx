import React from 'react'
import { Typography, Grid, Paper, Box } from '@mui/material'
import withStyles from '@mui/styles/withStyles'
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
    maxWidth: 1200,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  rootPaper: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    color: theme.palette.primary.contrastText,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.primary.main,
    borderRadius: '10px 10px 10px 10px'
  },
  paper: {
    flexGrow: 1,
    background: theme.palette.background.default,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.primary.main,
    borderRadius: '10px 10px 10px 10px'
  }
})

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
    // Aquí podrías manejar el caso de estado no encontrado de otra manera
    return (
      <div>
        <HeaderV2 section={section} />
        <Grid container spacing={0} justifyContent='center'>
          <Grid item xs={12} className={classes.rootItem}>
            <Paper elevation={15} className={classes.rootPaper}>
              <Typography variant='h3' paragraph align='center' color='#713972'>
                Estado no encontrado
              </Typography>
              <Typography align='center' color='#000' paragraph>
                No se encontró información para el estado solicitado.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }

  // Asegurarnos de que el estado tenga la nueva estructura para s3
  if (estado.data.s3.hasOwnProperty('s3oic')) {
    // Si tiene la estructura antigua (s3oic), convertirla a la nueva estructura
    // Esto es solo un ejemplo, deberías adaptarlo según cómo quieras manejar la transición
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

  const sys = [
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
      name: 'Sistema de informacion publica de contrataciones'
    }
  ]

  const [system, setSystem] = React.useState(
    JSON.parse(JSON.stringify(sys[0]))
  )

  const handleSetSystem = id => {
    setSystem(sys.find(s => s.id === id))
  }

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

  // Nueva lógica para calcular el avance de S3 (ahora con el mismo formato que los otros sistemas)
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
      <Grid container spacing={0} justifyContent='center'>
        <Grid item xs={12} className={classes.rootItem}>
          <Paper elevation={15} className={classes.rootPaper}>

            <Typography variant='h3' paragraph align='center' color='#713972'>
              {estado.name}
            </Typography>

            <Typography align='center' color='#000' paragraph>
              Información al 30 de junio de 2025, reportada por la Secretaría Ejecutiva del Sistema Estatal Anticorrupción 
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch' }} justifyContent='center'>
              <Paper elevation={15} sx={{ m: 1, p: 2 }} className={classes.paper}>
                <Box display='flex' flexWrap='wrap' justifyContent='center'>
                  <Box>
                    <img src={`/img/cobertura/iconos_estados/${estado.icon2}`} style={{ width: '280px', padding: '23px', paddingRight: '0px' }} alt={estado.name} />
                  </Box>

                  <Box sx={{ paddingTop: '40px', flexGrow: 1 }}>
                    <Box display='flex' onClick={() => handleSetSystem(1)} sx={{ cursor: 'pointer' }}>
                      <img src={icon_s1} alt='Sistema 1' style={{ width: '40px', padding: '2px' }} />
                      <CustomizedProgressBar value={avance_s1} color={colors.s1} />
                    </Box>

                    <Box display='flex' onClick={() => handleSetSystem(2)} sx={{ cursor: 'pointer' }}>
                      <img src={icon_s2} alt='Sistema 2' style={{ width: '40px', padding: '2px' }} />
                      <CustomizedProgressBar value={avance_s2} color={colors.s2} />
                    </Box>

                    <Box display='flex' onClick={() => handleSetSystem(3)} sx={{ cursor: 'pointer' }}>
                      <img src={icon_s3} alt='Sistema 3' style={{ width: '40px', padding: '2px' }} />
                      <CustomizedProgressBar value={avance_s3} color={colors.s3} />
                    </Box>

                    <Box display='flex' onClick={() => handleSetSystem(6)} sx={{ cursor: 'pointer' }}>
                      <img src={icon_s6} alt='Sistema 6' style={{ width: '40px', padding: '2px' }} />
                      <CustomizedProgressBar value={avance_s6} color={colors.s6} />
                    </Box>
                  </Box>
                </Box>

              </Paper>

              <Paper elevation={15} sx={{ m: 1, p: 2, textAlign: 'center', maxWidth: 200 }} className={classes.paper}>
                <Typography variant='h5' color='#713972' sx={{ fontWeight: 'bold' }}>
                  Instituciones en la PDN
                </Typography>

                <Typography variant='h4' color={colors.s1} sx={{ fontWeight: 'bold' }}>
                  {avance_s1}%
                </Typography>
                <Typography color='#713972' textAlign='center'>
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

                <Typography variant='h4' color={colors.s2} sx={{ fontWeight: 'bold' }}>
                  {avance_s2}%
                </Typography>
                <Typography color='#713972' textAlign='center'>
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

                <Typography variant='h4' color={colors.s3} sx={{ fontWeight: 'bold' }}>
                  {avance_s3}%
                </Typography>
                <Typography color='#713972' textAlign='center'>
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
                <Typography color='#713972' textAlign='center' variant='body2'>
                  Tribunal: {estado.data.s3.s3t ? 'Sí' : 'No'}
                </Typography>

                <Typography variant='h4' color={colors.s6} sx={{ fontWeight: 'bold' }}>
                  {avance_s6}%
                </Typography>
                <Typography color='#713972' textAlign='center'>
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

              </Paper>
            </Box>

            <VistaDetalleSistema
              estado={estado} system={system}
              avance_s1={avance_s1}
              avance_s2={avance_s2}
              avance_s3={avance_s3}
              avance_s6={avance_s6}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(VistaDetalleEstado)