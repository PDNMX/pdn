import { Grid, Typography } from '@mui/material'
import { withStyles } from '@mui/styles'
import SysCard from './SysCard'
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
