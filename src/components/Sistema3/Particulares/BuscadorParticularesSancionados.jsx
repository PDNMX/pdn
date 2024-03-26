import { Grid, Typography, Box, Paper } from '@mui/material'
import { withStyles } from '@mui/styles'
import BusquedaParticular from './BusquedaParticular'
import Descarga from '../../Compartidos/Descarga'
/* import classNames from "classnames"; */

const styles = theme => ({
  gridTable: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1)
  },
  ul: {
    listStyle: 'none',
    paddingLeft: theme.spacing(3)
  },
  container: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2)
  },
  toolBarStyle: {
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(8),
    maxWidth: '1200px'
  },
  li: {
    '&:before': {
      content: '"•"',
      color: theme.palette.primary.main,
      fontWeight: 'bold',
      display: 'inline-block',
      width: '1em',
      marginLeft: '-1em'
    }
  },
  itemD: {
    maxWidth: 1200
    /* paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(8),
        paddingTop: theme.spacing(8) */
  },
  paper: {
    backgroundColor: theme.palette.background.opaque,
    maxWidth: 1200,
    paddingTop: theme.spacing(2),
    margin: 'auto',
    color: theme.palette.primary.contrastText,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.secondary.main,
    borderRadius: '0px 10px 10px 10px'
  }
})

function BuscadorParticularesSancionados ({ classes }) {
  return (
    <div>
      <Paper className={classes.paper} elevation={15} >
        {/* TEXTO */}
        <Grid container className={classes.container}>
          <Grid item xs={12} style={{ maxWidth: 1200, margin: 0 }}>
          <Box p={1}>
            <Typography paragraph>
              <b>Aquí puedes consultar:</b>
            </Typography>
            <ul className={classes.ul}>
              <li className={classes.li}><Typography display='inline'>Datos de la sanción firme impuesta a particulares como: número de expediente, autoridad que sanciona y resolución.</Typography></li>
              <li className={classes.li}><Typography display='inline'>Información del particular sancionado como: nombre, razón social, causa y tipo de sanción.</Typography></li>
              {/* <li className={classes.li}>
                                <Typography display='inline'>
                                    Obtén los datos de la sanción impuesta al particular como: expediente, hechos de la
                                    falta, tipo de falta, resolución, entre otros datos
                                    de interes.
                                </Typography>
                            </li> */}
            </ul>
            </Box>
          </Grid>
        </Grid>

        {/* BUSCADOR */}
        <Grid container spacing={4} justifyContent='center' className={classes.container}>
          <Grid item xs={12}>
            <BusquedaParticular />
          </Grid>
        </Grid>
      </Paper>
      {/* DESCARGA */}
      <Grid container spacing={0} justifyContent='center'>
        <Grid item xs={12} className={classes.itemD}>
          <Descarga url={process.env.REACT_APP_BULK_S3_PARTICULARES} tipoGA='bulk-s3P' />
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(BuscadorParticularesSancionados)