import { Link } from 'react-router-dom'
import { Typography, Grid, Box, Paper } from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import ButtonPDN from '../components/Compartidos/ButtonPDN'
import HeaderV2 from './HomeV2/HeaderV2'

const styles = theme => ({
  root: {
    flexGrow: 1
    /*         backgroundColor: theme.palette.primary.main,
        backgroundImage: `url(${bgimg})`,
        backgroundRepeat: "repeat",
        backgroundPosition: 'fixed',
        color: '#f2f2f2' */
  },
  button: {
    // background: '#ffe01b',
    marginTop: theme.spacing(1)
  },
  item: {
    maxWidth: 1200,
    paddingTop: 90,
    paddingBottom: 90
  },
  paper: {
    backgroundColor: theme.palette.background.opaque,
    padding: theme.spacing(2),
    color: theme.palette.primary.contrastText,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.background.border,
    borderRadius: '10px 10px 10px 10px',
    display: 'flex',
    justifyContent: 'center'
  },
  box: {
    maxWidth: '900px', paddingTop: '50px', paddingBottom: '50px'
  }
})

const P404 = props => {
  const { classes } = props
  return (
    <div className={classes.root}>
      <HeaderV2 section={{
        path: '',
        name: 'No encontramos lo que buscas',
        shortName: 'Error 404',
        color: '#f2f2f2'
      }}
      />

      <Grid container spacing={0} justifyContent='center'>
        <Grid item xs={12} className={classes.item}>
          <Paper className={classes.paper} elevation={15}>
            <Box className={classes.box}>
              <Typography variant='h1' paragraph>
                Error 404
              </Typography>
              <Typography variant='h4' paragraph>
                La URL solicitada no existe en este servidor.
              </Typography>
              <ButtonPDN
                className={classes.button} component={Link}
                variant='contained' to='/'
              >
                Regresar
              </ButtonPDN>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(P404)
