// Components/TotalTipo.jsx
import React from 'react';
import { Paper, Typography } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import { ResponsiveBar } from '@nivo/bar';  // Cambiado de Bar a ResponsiveBar

const styles = theme => ({
  paper: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
    height: '100%',
    minHeight: 300,
    background:'linear-gradient(0deg, hsl(197deg 80% 91% / 86%) 43%, hsl(0deg 0% 100% / 80%) 100%)',
    boxShadow: 'none',
    borderTop: '2px solid #81d2f2',
  },
  chart: {
    height: 250
  }
});

const TotalTipo = ({ classes, totalTipo }) => (
  <Paper className={classes.paper} elevation={3}>
    <Typography variant="h6" gutterBottom align="center">
      Tipos de Procedimientos
    </Typography>
    <div className={classes.chart}>
      <ResponsiveBar
        data={totalTipo.map(item => ({
          tipo: item.tipo,
          count: item.count
        }))}
        keys={['count']}
        indexBy="tipo"
        margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: 'nivo' }}
        axisBottom={{
          tickRotation: -45
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
      />
    </div>
  </Paper>
);

export default withStyles(styles)(TotalTipo);