import React from 'react'
import { Grid } from '@mui/material'

import Mercado from './Mercado'
import BlogComponent from '../Blog/BlogComponent'

const Cards = props => {
  return (
    <Grid container direction='row' justifyContent='space-evenly' alignItems='stretch'>
      <Grid item>
        <Mercado />
      </Grid>
      <Grid item xs={12} md={12} lg={12} xl={12}>
        <BlogComponent />
      </Grid>
    </Grid>
  )
}

export default Cards
