// Components/TotalTipo.jsx
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import { ResponsiveBar } from '@nivo/bar';
import { spanishProcurementMethod } from './TotalMonto';
import LoadingComponent from './LoadingComponent';

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
    height: 250,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingContainer: {
    height: 250,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const TotalTipo = ({ classes, totalProcurementMethod, isLoading }) => (
  <Paper className={classes.paper} elevation={3}>
    <Typography variant="h6" gutterBottom align="center">
      Tipos de Procedimientos
    </Typography>
    
    {isLoading ? (
      <Box className={classes.loadingContainer}>
        <LoadingComponent />
      </Box>
    ) : (
      <div className={classes.chart}>
        {totalProcurementMethod && totalProcurementMethod.length > 0 ? (
          <ResponsiveBar
            data={totalProcurementMethod.map(item => ({
              tipo: spanishProcurementMethod[item.procurementMethod] || item.procurementMethod,
              count: item.total
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
        ) : (
          <Typography variant="body1" align="center">
            No hay datos disponibles
          </Typography>
        )}
      </div>
    )}
  </Paper>
);

export default withStyles(styles)(TotalTipo);