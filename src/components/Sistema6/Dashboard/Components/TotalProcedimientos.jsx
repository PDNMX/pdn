// Components/TotalProcedimientos.jsx
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import CountUp from 'react-countup';
import { Business } from '@mui/icons-material';
import LoadingComponent from './LoadingComponent';

const styles = theme => ({
  paper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#b5dae8',
    color: theme.palette.primary.contrastText,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  icon: {
    fontSize: 48,
    marginBottom: theme.spacing(2)
  },
  number: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1)
  }
});

const TotalProcedimientos = ({ classes, totalCases, isLoading }) => {
  return (
    <Paper className={classes.paper} elevation={3}>
      <Business className={classes.icon} />
      <Typography variant="h6" gutterBottom>
        Total de Procedimientos
      </Typography>
      <Box className={classes.number}>
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <CountUp end={totalCases || 0} separator="," duration={2.5} />
        )}
      </Box>
    </Paper>
  );
};

export default withStyles(styles)(TotalProcedimientos);