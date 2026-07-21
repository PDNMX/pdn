import React from 'react'
import { Stack, Grid, Typography } from '@mui/material'
import { withStyles } from 'tss-react/mui';
import BlogCard from './BlogCard'
import axios from 'axios'
import ButtonPDN from '../../Compartidos/ButtonPDN'
import ReactGA from 'react-ga4'

import ScrollAnimation from '../ScrollAnimation'

const styles = () => ({
  container: {
    maxWidth: 1500,
    margin: 'auto',
    background: '#f2f0f2',
    paddingTop: '4rem',
    paddingBottom: '4rem'
  },
  root: {
    background: '#f2f0f2'
  }
});

const BlogComponent = (props) => {
  const { classes } = props
  const [posts, setPosts] = React.useState([])

  React.useEffect(() => {
    const config = {
      url: process.env.REACT_APP_BLOG_API_URL,
      method: 'GET',
      params: {
        key: process.env.REACT_APP_BLOG_API_KEY,
        limit: 4
      },
      json: true
    }

    axios(config)
      .then((data) => {
        // console.log(data);
        setPosts(data.data.posts)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className={classes.root}>
      <Grid
        container
        direction='row'
        className={classes.container}
        sx={{
          justifyContent: 'center',
          alignItems: 'stretch'
        }}>
        <Grid
          size={{
            md: 12,
            xs: 12
          }}
          sx={{
            pl: { xs: 1, xl: 0 }
          }}>
          <Typography variant='h4'>Blog</Typography>
          <Typography variant='h6' sx={{
            marginBottom: "16px"
          }}>
            Descubre nuestras últimas publicaciones
          </Typography>
        </Grid>

        {posts.map((p, i) => {
          return <BlogCard key={i} post={p} />
        })}

        <Grid
          size={{
            md: 12,
            sm: 12
          }}
          sx={{
            mt: 5,
            pr: { xs: 0, md: 1 }
          }}>
          <Stack direction='row' sx={{
            justifyContent: { xs: 'center', md: 'end' }
          }}>
            <ScrollAnimation>
            <ButtonPDN
              href='/blog'
              onClick={() => ReactGA.send({ hitType: 'pageview', page: '/blog' })}
              style={{ color: 'white' }}
            >
              CONOCE MÁS
            </ButtonPDN>
            </ScrollAnimation>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(BlogComponent, styles);
