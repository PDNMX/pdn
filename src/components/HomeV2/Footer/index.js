import { Grid } from '@mui/material';

import { useTheme } from '@emotion/react';
import useMediaQuery from '@mui/material/useMediaQuery';

import LeftFooter from './leftFooter';
import CenterFooter from './centerFooter';
import RightFooter from './rightFooter';
import MobileFooter from './mobileFooter';

import { makeStyles } from '@mui/styles';
import css from './cssFooter';
const useStyles = makeStyles(css);

function useIsWidthUp(breakpoint) {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up(breakpoint));
}
const Footer = props => {
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
    <MobileFooter />
  );
};

export default Footer;
