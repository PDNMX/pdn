import React from 'react';
import { Grid } from '@mui/material';

import Mercado from './Mercado';
import Interconexion from './Interconexion';

const Cards = props => {
  return (
    <Grid container direction={'row'} justifyContent={'space-evenly'} alignItems='stretch'>
      <Grid item>
        <Mercado />
      </Grid>
      <Grid item>
        <Interconexion />
      </Grid>
    </Grid>
  );
};

export default Cards;
