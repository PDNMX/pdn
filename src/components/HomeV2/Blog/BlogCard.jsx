import { Grid, Link, Typography, Stack } from '@mui/material'
import { withStyles } from '@mui/styles'
import ReactGA from 'react-ga4'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

/* function useIsWidthUp(breakpoint) {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up(breakpoint));
} */

const styles = () => ({
  root: {
    textDecoration: 'none'
  },
  image: {
    width: 150,
    paddingRight: 10
  },
  card: {
    borderRadius: '0.6em',
    boxShadow:
      '0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25), 0 8px 16px -8px hsla(0, 0%, 0%, 0.3), 0 -6px 16px -6px hsla(0, 0%, 0%, 0.03)',
    transition: 'all ease 200ms',

    '&:hover': {
      boxShadow:
        '0 13px 40px -5px hsla(240, 30.1%, 28%, 0.12), 0 8px 32px -8px hsla(0, 0%, 0%, 0.14), 0 -6px 32px -6px hsla(0, 0%, 0%, 0.02)'
    }

  }
})

const BlogCard = (props) => {
  const { classes, post } = props
  // const isXsUp = useIsWidthUp("lg");
  return (
    <Grid
      item
      md={6}
      xs={6}
      to={post.url}
      component={Link}
      href={post.url}
      onClick={() => ReactGA.pageview('/blog')}
      p={1}
      className={classes.root}
    >
      <Card sx={{ display: 'flex', height: '100%' }} className={classes.card}>
        <CardContent sx={{ height: '100%', minWidth: '5rem' }}>
          <Typography variant='title1' color='text.secondary'>
            {post.title}
            <br />
            <br />
          </Typography>
          <Typography variant='body2' sx={{ height: 'auto' }}>
            {post.excerpt.slice(0, 150) + '...'}
          </Typography>
        </CardContent>
        <Stack direction='row' justifyContent='end'>
          {/* justifyContent={isXsUp ? "space-between" : "space-evenly"} */}
          <CardMedia
            component='img'
            sx={{ width: '15rem', height: 'auto', display: { xs: 'none', sm: 'none', md: 'block' } }}
            image={post.feature_image}
          />
        </Stack>
      </Card>
    </Grid>
  )
}

export default withStyles(styles)(BlogCard)
