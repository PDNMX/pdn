import { Grid, Typography } from '@mui/material';

import { useTheme } from '@emotion/react';
import useMediaQuery from '@mui/material/useMediaQuery';

import LeftFooter from './leftFooter';
import CenterFooter from './centerFooter';
import RightFooter from './rightFooter';

import { makeStyles } from '@mui/styles';
import css from './cssFooter';

const useStyles = makeStyles(css);

function useIsWidthUp(breakpoint) {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up(breakpoint));
}
export default props => {
  const classes = useStyles();
  const isXsUp = useIsWidthUp('lg');

  return isXsUp ? (
    <Grid container className={classes.root} direction='row' alignItems='center'>
      <Grid item xs={4}>
        <LeftFooter />
      </Grid>
      <Grid item xs={4}>
        <CenterFooter />
      </Grid>
      <Grid item xs={4}>
        <RightFooter />
      </Grid>
    </Grid>
  ) : (
    <Grid container spacing={0} justifyContent={'center'} className={classes.footerMobileSeccEnlaces}>
      <Grid item xs={4}>
        <Typography className={root.linkMobile}>Preguntas frecuentes</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography className={root.linkMobile}>Boletines de prensa</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography className={root.linkMobile}>Videos</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography className={root.linkMobile}>Mapa de sitio</Typography>
      </Grid>
    </Grid>
  );
};
