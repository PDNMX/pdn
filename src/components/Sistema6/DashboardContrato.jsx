// DashboardContrato.jsx
import React from 'react';
import withStyles from '@mui/styles/withStyles';
import Header from './Dashboard/Header';
import ContainerContract from './Dashboard/ContainerContract';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  section: {
    maxWidth: '1200px',
    marginTop: theme.spacing(8)
  },
  tabContainer: {
    paddingTop: 90
  },
  paper1: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '0px 10px 10px 10px'
  },
  paper2: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '0px 10px 10px 10px'
  }
});

const DashboardContrato = ({ classes }) => {
  const system = {
    path: '/contrataciones',
    name: 'Contrataciones',
    color: '#824E80'
  };

  return (
    <div className={classes.root}>
      <Header section={system} />
      <ContainerContract />
    </div>
  );
};

export default withStyles(styles)(DashboardContrato);