// Components/LoadingComponent.jsx
import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import withStyles from '@mui/styles/withStyles';

const styles = theme => ({
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    minHeight: '2.5rem', // Mismo tamaño que la fuente del número
  },
  spinner: {
    color: theme.palette.primary.main,
  }
});

const LoadingComponent = ({ classes }) => {
  return (
    <Box className={classes.loadingContainer}>
      <CircularProgress className={classes.spinner} size={30} thickness={4} />
    </Box>
  );
};

export default withStyles(styles)(LoadingComponent);