import { Grid, Typography } from '@mui/material';
import React from 'react';
import withStyles from '@mui/styles/withStyles';

import Mercado from './Cards/Mercado';
import Interconexion from './Cards/Interconexion';

const style = theme => ({
  root: {
    flexGrow: 1,
    color: '#FFF',
    fontSize: '16px'
  }
});

const Cards = props => {
  const { classes } = props;
  return (
    <Grid container spacing={0} justifyContent={'center'} className={classes.root}>
      <Grid item xs={12} md={6} lg={3}>
        <Mercado />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Interconexion />
      </Grid>
    </Grid>
  );
};

export default withStyles(style)(Cards);
