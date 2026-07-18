import { withStyles } from 'tss-react/mui';
import { Breadcrumbs, Typography, Link } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Link as RouterLink, useParams } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import GrainIcon from '@mui/icons-material/Grain'
import estados from '../Cobertura/estados.json'
// import ReactGA from "react-ga4";

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
// const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs"/>;

const styles = (theme) => ({
  whiteText: {
    color: theme.palette.greyColor
  },
  icon: {
    maxWidth: 100
    /* [theme.breakpoints.up("md")]: {
      marginRight: 80,
    },
    [theme.breakpoints.down("md")]: {
      marginRight: 10,
      marginLeft: 10,
    }, */
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  breadcrumItem: {
    maxWidth: 1200
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.opaque + '80' // 80 hex => 128 dec => 50%
  },
  containerName: {
    maxWidth: 1200,
    margin: 'auto',
    minHeight: 200,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
})

/* function useIsWidthUp (breakpoint) {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.up(breakpoint))
} */

function HeaderV2 (props) {
  const { classes, section } = props
  //const isXsUp = useIsWidthUp('md')
  const { id_estado } = useParams()
  return (
    <div className={classes.root}>
      <Grid container spacing={0} sx={{
        justifyContent: 'center'
      }}>
        <Grid className={classes.breadcrumItem} size={12}>
          <Breadcrumbs
            aria-label='breadcrumb'
            sx={{ color: '#824E80', paddingTop: '10px' }}
          >
            <Link
              component={RouterLink}
              underline='hover'
              to='/'
              sx={{ color: '#824E80', display: 'flex', alignItems: 'center' }}
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize='inherit' />
              Plataforma Digital Nacional
            </Link>

            {section.path.includes('/especificaciones/') && (
              <Link
                component={RouterLink}
                underline='hover'
                to='/especificaciones'
                sx={{ color: '#824E80', display: 'flex', alignItems: 'center' }}
              >
                <GrainIcon sx={{ mr: 0.5 }} fontSize='inherit' />
                Especificaciones
              </Link>
            )}

            {section.path.includes('/:id_estado') && (
              <Link
                component={RouterLink}
                underline='hover'
                to='/cobertura'
                sx={{ color: '#824E80', display: 'flex', alignItems: 'center' }}
              >
                <GrainIcon sx={{ mr: 0.5 }} fontSize='inherit' />
                Cobertura
              </Link>
            )}

            <Typography
              sx={{ color: section.color, display: 'flex', alignItems: 'center' }}
            >
              <GrainIcon sx={{ mr: 0.5 }} fontSize='inherit' />
              {section.path.includes('/:id_estado')
                ? estados.find((e) => e.route.includes(id_estado)).name
                : section.shortName}
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid
        container
        className={classes.containerName}
        direction='row'
        sx={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Grid
          sx={{ textAlign: 'center' }}
          size={{
            xs: 12,
            md: 9
          }}>
          {section.icon && (
            <img src={section.icon} alt='PDN' className={classes.icon} />
          )}
          <Typography
            variant='h4'
            style={{ fontWeight: 100 }}
            sx={{
              color: section.color,
              marginBottom: "16px"
            }}
          >
            {section.name}
          </Typography>
          {section.subName && (
            <Typography variant='h5' sx={{ color: section.color }}>
              {section.subName}
            </Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

// export default withWidth()(withStyles(styles)(HeaderV2));
export default withStyles(HeaderV2, styles);
