import { Grid } from '@mui/material'

import Mercado from './Mercado'
import BlogComponent from '../Blog/BlogComponent'

const Cards = () => {
  return (
    <Grid
      container
      direction='row'
      sx={{
        justifyContent: 'space-evenly',
        alignItems: 'stretch'
      }}>
      <Grid>
        <Mercado />
      </Grid>
      <Grid
        size={{
          xs: 12,
          md: 12,
          lg: 12,
          xl: 12
        }}>
        <BlogComponent />
      </Grid>
    </Grid>
  );
}

export default Cards
