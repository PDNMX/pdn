// Components/FooterPage.jsx
import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import withStyles from '@mui/styles/withStyles';

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(3)
  },
  text: {
    color: theme.palette.text.secondary
  }
});

const FooterPage = ({ classes, dataSet, provider, referenceDate }) => (
  <Paper className={classes.paper} elevation={1}>
    <Grid container spacing={2} justifyContent="space-between">
      <Grid item>
        <Typography variant="body2" className={classes.text}>
          Conjunto de datos: {dataSet}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" className={classes.text}>
          Proveedor: {provider}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" className={classes.text}>
          Fecha de consulta: {referenceDate}
        </Typography>
      </Grid>
    </Grid>
  </Paper>
);

export default withStyles(styles)(FooterPage);