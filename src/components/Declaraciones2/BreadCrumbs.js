import { Breadcrumbs, Grid, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';

import IconS1 from '../../assets/rediseno/ico_sistemas/ico_s1_color.svg';
import React from 'react';

const system = {
  icon: IconS1,
  color: '#F8CAC4',
  name: 'Sistema de evolución patrimonial, de declaración de intereses y constancia de presentación de declaración fiscal',
  shortName: 'S1'
};

const BreadCrumbs = props => {
  return (
    <React.Fragment>
      <Grid container justifyContent={'center'}>
        <Grid item xs={12} style={{ maxWidth: 1200 }}>
          <Breadcrumbs aria-label='breadcrumb' sx={{ color: '#ffffff', paddingTop: '10px' }}>
            <Link component={RouterLink} underline='hover' sx={{ display: 'flex', alignItems: 'center' }} color='#ffffff' to='/'>
              <HomeIcon sx={{ mr: 0.5 }} fontSize='inherit' />
              Plataforma Digital Nacional
            </Link>

            <Typography color={system.color} sx={{ display: 'flex', alignItems: 'center' }}>
              <GrainIcon sx={{ mr: 0.5 }} fontSize='inherit' />
              {system.name}
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid container direction={'row'} alignContent={'center'} justifyContent={'center'} style={{ padding: '50px 0px' }}>
        <Grid item style={{ height: 200 }}>
          <img src={system.icon} alt='PDN' style={{ width: 150, maxWidth: 150, marginRight: 80 }} />
        </Grid>
        <Grid item style={{ maxWidth: 900 }}>
          <Typography variant='h4' paragraph color={`${system.color}`} style={{ fontWeight: 300 }}>
            {system.name}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default BreadCrumbs;
