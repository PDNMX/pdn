// Components/FooterPage.jsx
import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import withStyles from '@mui/styles/withStyles';

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(0),
    boxShadow: 'none',
  },
  text: {
    color: theme.palette.text.secondary,
    paddingLeft: theme.spacing(2),
  },
  content: {
    display:'block',
    marginTop:'0px',
  }
});

const FooterPage = ({ classes, dataSet, provider, referenceDate }) => (
  <Paper className={classes.paper} elevation={1}>
    <Grid className={classes.content} container spacing={2} justifyContent="space-between">
      <Grid>
        <Typography variant="body2" className={classes.text}>
          Conjunto de datos: {dataSet}
        </Typography>
      </Grid>
      <Grid>
        <Typography variant="body2" className={classes.text}>
          Proveedor: {provider}
        </Typography>
      </Grid>
      <Grid>
        <Typography variant="body2" className={classes.text}>
          Fecha de consulta: {referenceDate}
        </Typography>
      </Grid>
    </Grid>
  </Paper>
);

export default withStyles(styles)(FooterPage);