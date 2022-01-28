import React from 'react';
import { Grid } from '@mui/material';

import Mercado from './Cards/Mercado';
import Interconexion from './Cards/Interconexion';

export default function (props) {
  return (
    <Grid container direction='row' justifyContent='center' spacing={0}>
      <Grid item xs={0} md={0} lg={2} style={{ display: 'flex' }} />
      <Grid item xs={12} md={6} lg={3} style={{ display: 'flex' }}>
        <Mercado />
      </Grid>
      <Grid item xs={0} md={0} lg={2} style={{ display: 'flex' }} />
      <Grid item xs={12} md={6} lg={3} style={{ display: 'flex' }}>
        <Interconexion />
      </Grid>
      <Grid item xs={0} md={0} lg={2} style={{ display: 'flex' }} />
    </Grid>
  );
}
