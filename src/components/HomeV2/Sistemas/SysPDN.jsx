import { Grid, Typography } from '@mui/material'
import { withStyles } from '@mui/styles'
import SysCard from './SysCard'
import IconS1 from '../../../assets/rediseno2023/imgs/iconos/sistemas/ico_s1_light.svg'
import IconS2 from '../../../assets/rediseno2023/imgs/iconos/sistemas/ico_s2_light.svg'
import IconS3 from '../../../assets/rediseno2023/imgs/iconos/sistemas/ico_s3_light.svg'
import IconS4 from '../../../assets/rediseno2023/imgs/iconos/sistemas/ico_s4_light.svg'
import IconS5 from '../../../assets/rediseno2023/imgs/iconos/sistemas/ico_s5_light.svg'
import IconS6 from '../../../assets/rediseno2023/imgs/iconos/sistemas/ico_s6_light.svg'

import pdnRoutes from '../../../routes/index'

const styles = () => ({
  container: {
    maxWidth: 1500,
    margin: 'auto',
    background: '#f2f0f2',
    paddingTop: '4rem',
    paddingBottom: '4rem'
  },
  root: {
    background: '#f2f0f2'
  }
})

const systems = [
  {
    name: 'Sistema de Declaraciones',
    color: '#F29888',
    icon: IconS1,
    url: '/declaraciones'
  },
  {
    name: 'Sistema de Servidores Públicos en contrataciones',
    color: '#b25fac',
    icon: IconS2,
    url: '/servidores'
  },
  {
    name: 'Sistema de Sancionados',
    color: '#9085da',
    icon: IconS3,
    url: '/sancionados'
  },
  {
    name: 'Sistema de Fiscalización',
    color: '#88bc69',
    icon: IconS4,
    url: '/fiscalizacion'
  },
  {
    name: 'Sistema de Denuncias',
    color: '#34c9b2',
    icon: IconS5,
    url: '/denuncias'
  },
  {
    name: 'Sistema de Contrataciones',
    color: '#42a5cc',
    icon: IconS6,
    url: '/contrataciones'
  }
]

const SysPDN = (props) => {
  const { classes } = props;
  let temp = pdnRoutes.filter(route => route.type === "system");

  return (
    <div className={classes.root}>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='stretch'
        className={classes.container}
      >
        <Grid item md={12} sm={12} pl={{ xs: 1, xl: 0 }}>
          <Typography variant='h4'>
            Sistemas de la Plataforma Digital Nacional
          </Typography>
          <Typography variant='h6' paragraph>
            El desarrollo de la <b>PDN</b> considera seis sistemas que integran
            datos estratégicos para la lucha contra la corrupción, contemplados
            en la{' '}
            <b>Ley General del Sistema Nacional Anticorrupción (LGSNA).</b>
          </Typography>
        </Grid>

        {temp.map((s, i) => {
          return <SysCard key={i} sys={s} />
        })}

      </Grid>
    </div>
  )
}

export default withStyles(styles)(SysPDN)
