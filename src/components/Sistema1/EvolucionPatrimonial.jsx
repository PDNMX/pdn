import { Typography, Paper, Box } from '@mui/material'
import { withStyles } from 'tss-react/mui';
import styles from '../style'
import iconS1 from '../../assets/rediseno2023/imgs/iconos/sistemas/ico_s1.svg'

const EvolucionPatrimonial = ({ classes }) => (
  <Paper elevation={15} className={classes.paper1} sx={{ marginBottom: '60px' }}>
    <Box sx={{ maxWidth: '900px', paddingTop: '50px', paddingBottom: '50px', margin: '0 auto' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4
        }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 2
          }}>
          <img
            src={iconS1}
            alt='Evolución patrimonial'
            style={{
              width: '180px',
              opacity: 0.85,
              filter: 'brightness(0) saturate(100%) invert(26%) sepia(32%) saturate(1527%) hue-rotate(267deg) brightness(90%) contrast(89%)'
            }}
          />
        </Box>
        <Box sx={{ maxWidth: '640px', textAlign: 'justify' }}>
          <Typography className={classes.text_color} sx={{
            marginBottom: "16px"
          }}>
            En cumplimiento del <strong>Transitorio Quinto</strong> de la {' '}
            <a
              href='https://dof.gob.mx/nota_to_doc.php?codnota=5729579'
              target='_blank'
              rel='noopener noreferrer'
              className={classes.enlaces}
            >
              Declaratoria de Inicio de Funciones
            </a>
            {' '}del Sistema de Evolución Patrimonial, de Declaración de Intereses y Constancia de presentación
            de Declaración Fiscal (S1) de la Plataforma Digital Nacional, previsto en el artículo 49,
            fracción i de la{' '}
            <a
              href='https://www.diputados.gob.mx/LeyesBiblio/pdf/LGSNA_200521.pdf'
              target='_blank'
              rel='noopener noreferrer'
              className={classes.enlaces}
            >
              Ley General del Sistema Nacional Anticorrupción
            </a>
            , inicia el proceso de 
            <strong> implementación</strong> y en <strong>fase de pilotaje</strong> el módulo de Evolución Patrimonial,
            con las autoridades que integran las diferentes SESEAS.
          </Typography>
          <Typography className={classes.text_color} sx={{
            marginBottom: "16px"
          }}>
            Esta herramienta permitirá a los Órganos Internos de Control (OIC) y a las autoridades
            fiscalizadoras visualizar, de manera transparente, la evolución del patrimonio de las
            personas servidoras públicas a lo largo del tiempo, cruzando sus declaraciones anuales,
            de inicio y de conclusión de encargo conforme a la normatividad aplicable.
          </Typography>
        </Box>
      </Box>
    </Box>
  </Paper>
)

export default withStyles(EvolucionPatrimonial, styles);
