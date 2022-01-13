import { Grid, Typography } from '@mui/material';
import React from 'react';
import withStyles from '@mui/styles/withStyles';

import Mercado from './Cards/Mercado';
import Interconexion from './Cards/Interconexion';

const style = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#0d3b49',
    color: '#FFF'
    // opacity: 0.67
  }
});

const Cards = props => {
  const { classes } = props;
  return (
    <Grid container spacing={0} justifyContent={'center'} className={classes.root}>
      <Grid item xs={0} lg={3} />
      <Grid item xs={12} lg={3}>
        <Mercado />
      </Grid>
      <Grid item xs={12} lg={3}>
        <Interconexion />
      </Grid>
    </Grid>
  );
};

export default withStyles(style)(Cards);
