// Header.jsx
import React from 'react';
import { Grid, Typography } from '@mui/material';
import withStyles from '@mui/styles/withStyles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: `${theme.palette.background.paper}80`
  },
  containerName: {
    maxWidth: 1200,
    margin: 'auto',
    minHeight: 200,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  icon: {
    maxWidth: 100
  }
});

const Header = ({ classes, section }) => {
  return (
    <div className={classes.root}>
      <Grid
        container
        className={classes.containerName}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={9} style={{ textAlign: 'center' }}>
          {section.icon && (
            <img src={section.icon} alt="PDN" className={classes.icon} />
          )}
          <Typography
            variant="h4"
            paragraph
            style={{ color: section.color, fontWeight: 100 }}
          >
            {section.name}
          </Typography>
          {section.subName && (
            <Typography variant="h5" style={{ color: section.color }}>
              {section.subName}
            </Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Header);