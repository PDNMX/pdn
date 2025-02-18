// Components/TotalPorEstado.jsx
import React from 'react';
import { Paper, Typography } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import { ResponsivePie } from '@nivo/pie';  // Cambiado de PieChart a ResponsivePie

const styles = theme => ({
  paper: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
    height: '100%',
    minHeight: 300,
    background:'linear-gradient(0deg, hsl(197deg 100% 93.82% / 30%) 43%, hsl(0deg 0% 100% / 80%) 100%)',
    boxShadow: 'none'
  },
  chart: {
    height: 250
  }
});

const TotalPorEstado = ({ classes, totalEstado }) => (
  <Paper className={classes.paper} elevation={3}>
    <Typography variant="h6" gutterBottom align="center">
      Estado de Procedimientos
    </Typography>
    <div className={classes.chart}>
      <ResponsivePie
        data={totalEstado.map(item => ({
          id: item.estado,
          label: item.estado,
          value: item.count
        }))}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'nivo' }}
        enableArcLinkLabels={true}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="#ffffff"
      />
    </div>
  </Paper>
);

export default withStyles(styles)(TotalPorEstado);