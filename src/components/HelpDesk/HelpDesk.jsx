import withStyles from '@mui/styles/withStyles'
import ExpansionPanels from './ExpansionPanels'
import Disclaimer from './Disclaimer'
import HeaderV2 from '../HomeV2/HeaderV2'
import pdnRoutes from '../../routes'
import { Grid, Paper, Box } from '@mui/material'

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main,
    /* backgroundImage: `url(${bgimg})`, */
    backgroundRepeat: 'repeat',
    backgroundPosition: 'fixed',
    color: '#f2f2f2'
  },
  rootItem: {
    maxWidth: '1200px'
    /* padding: theme.spacing(1), */
    /* paddingTop: 90,
    paddingBottom: 90, */
  },
  item: {
    maxWidth: 1200,
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingTop: 40,
    paddingBottom: theme.spacing(10)
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
    maxWidth: '900px',
    paddingTop: '50px',
    paddingBottom: '50px'
  }
})

const HelpDesk = (props) => {
  const { classes } = props
  const section = pdnRoutes.find((route) => route.path === '/mesa-de-ayuda')
  return (
    <>
      <HeaderV2 section={section} />
      <Grid container mt={7} mb={7} justifyContent='center' spacing={0}>
        <Grid item xs={12} className={classes.rootItem}>
          <Paper className={classes.paper} elevation={15}>
            <Box className={classes.box}>
              <Disclaimer />
              <ExpansionPanels />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default withStyles(styles)(HelpDesk)