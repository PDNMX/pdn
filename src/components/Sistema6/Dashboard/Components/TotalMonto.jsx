// Components/TotalMonto.jsx
import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import CountUp from 'react-countup';

const styles = theme => ({
  paper: {
    height: '100%',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
    background:'linear-gradient(0deg, hsl(197deg 100% 93.82% / 30%) 43%, hsl(0deg 0% 100% / 80%) 100%)',
    boxShadow: 'none'
  },
  montoTotal: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    textAlign: 'center',
    marginBottom: theme.spacing(2)
  },
  montoItem: {
    textAlign: 'center',
    padding: theme.spacing(0)
  }
});

const TotalMonto = ({ classes, totalMonto }) => (
  <Paper className={classes.paper} elevation={3}>
    <Typography variant="h6" gutterBottom align="center">
      Monto Total de Contrataciones
    </Typography>
    <div className={classes.montoTotal}>
      $<CountUp end={totalMonto.total} separator="," duration={2.5} decimals={2} />
    </div>
    <Grid container spacing={3}>
      {totalMonto.porTipo.map((item, index) => (
        <Grid item xs={12}  key={index}>
          <div className={classes.montoItem}>
            <Typography variant="subtitle1" gutterBottom>
              {item.tipo}
            </Typography>
            <Typography variant="h6">
              $<CountUp end={item.monto} separator="," duration={2.5} decimals={2} />
            </Typography>
          </div>
        </Grid>
      ))}
    </Grid>
  </Paper>
);

export default withStyles(styles)(TotalMonto);