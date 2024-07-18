import { Grid, Typography } from '@mui/material'

import makeStyles from '@mui/styles/makeStyles'

import style from './styleSecciones'
const useStyles = makeStyles(style)

export default function DatosReservados() {
  const classes = useStyles()

  return (
    <Grid item xs={12}>
      <Typography className={classes.alertInfo} align='center'>
        Los datos contenidos en esta sección no son públicos
      </Typography>
    </Grid>
  )
}
