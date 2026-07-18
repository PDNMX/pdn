import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { 
  Grid, 
  Box, 
  CircularProgress,
  Paper,
  Typography
} from '@mui/material';
import { withStyles } from '@mui/styles';
import { Person, Business } from '@mui/icons-material';
import { searchInProvider } from '../../utils/api';
import { buildSearchQuery } from '../../utils/search';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
});

// Componente StatsCard
const StatsCard = ({ title, total, subtitle, icon: Icon, gradient, color }) => (
  <Paper 
    elevation={0} 
    sx={{
      height: '100%',
      background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
      border: '1px solid #e0e0e0',
      borderRadius: 2,
      position: 'relative',
      overflow: 'hidden',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }
    }}
  >
    <Box 
      sx={{
        position: 'absolute',
        right: -20,
        top: -20,
        opacity: 0.05,
        transform: 'rotate(15deg)'
      }}
    >
      <Icon sx={{ fontSize: 150 }} />
    </Box>

    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        p: 3,
        position: 'relative',
        zIndex: 1
      }}>
      <Typography 
        variant="body2" 
        color="textSecondary"
        sx={{
          mb: 2,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontWeight: 500
        }}
      >
        {title}
      </Typography>

      <Typography 
        variant="h4" 
        component="div" 
        sx={{ 
          fontWeight: 700,
          mb: 1,
          color: color
        }}
      >
        {total.toLocaleString()}
      </Typography>

      <Typography 
        variant="body1" 
        color="textSecondary"
        sx={{
          lineHeight: 1.5,
          maxWidth: '90%'
        }}
      >
        {subtitle}
      </Typography>

      <Box 
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '4px',
          background: gradient,
          opacity: 0.7
        }}
      />
    </Box>
  </Paper>
);

const TipoPersona = ({ classes, providers, onDataUpdate }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    fisica: {
      total: 0,
      providersWithData: 0
    },
    moral: {
      total: 0,
      providersWithData: 0
    }
  });

  const analysisCompleted = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!providers?.length || analysisCompleted.current) return;

      try {
        setLoading(true);
        const baseUrl = process.env.REACT_APP_S3_V2_BACKEND;
        const emptyFilter = buildSearchQuery({});

        const [fisicaResults, moralResults] = await Promise.all([
          Promise.all(providers.map(provider => 
            searchInProvider(baseUrl, 'faltas_graves_personas_fisicas', provider.id, emptyFilter)
          )),
          Promise.all(providers.map(provider => 
            searchInProvider(baseUrl, 'faltas_graves_personas_morales', provider.id, emptyFilter)
          ))
        ]);

        // Process física data
        let fisicaTotal = 0;
        let providersWithFisicaData = 0;
        fisicaResults.forEach(result => {
          if (result?.providerData?.data) {
            const providerTotal = result.providerData.pagination.totalItems;
            fisicaTotal += providerTotal;
            if (providerTotal > 0) {
              providersWithFisicaData++;
            }
          }
        });

        // Process moral data
        let moralTotal = 0;
        let providersWithMoralData = 0;
        moralResults.forEach(result => {
          if (result?.providerData?.data) {
            const providerTotal = result.providerData.pagination.totalItems;
            moralTotal += providerTotal;
            if (providerTotal > 0) {
              providersWithMoralData++;
            }
          }
        });

        // Calculate totals
        const totalCases = fisicaTotal + moralTotal;

        // Update component data
        setData({
          fisica: {
            total: fisicaTotal,
            providersWithData: providersWithFisicaData
          },
          moral: {
            total: moralTotal,
            providersWithData: providersWithMoralData
          }
        });

        // Notify parent of totals
        if (onDataUpdate) {
          onDataUpdate({
            totalCases,
            totalProviders: Math.max(providersWithFisicaData, providersWithMoralData)
          });
        }

        analysisCompleted.current = true;

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [providers, onDataUpdate]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid
        size={{
          xs: 12,
          md: 6
        }}>
        <StatsCard
          title="Personas Físicas Sancionadas"
          total={data.fisica.total}
          // subtitle={`${data.fisica.providersWithData} ${data.fisica.providersWithData === 1 ? 'proveedor' : 'proveedores'} de información`}
          icon={Person}
          gradient="linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)"
          color="#1976d2"
        />
      </Grid>
      <Grid
        size={{
          xs: 12,
          md: 6
        }}>
        <StatsCard
          title="Personas Morales Sancionadas" 
          total={data.moral.total}
          //subtitle={`${data.moral.providersWithData} ${data.moral.providersWithData === 1 ? 'proveedor' : 'proveedores'} de información`}
          icon={Business}
          gradient="linear-gradient(90deg, #2e7d32 0%, #81c784 100%)"
          color="#2e7d32"
        />
      </Grid>
    </Grid>
  );
};

TipoPersona.propTypes = {
  classes: PropTypes.object.isRequired,
  providers: PropTypes.array.isRequired,
  onDataUpdate: PropTypes.func.isRequired
};

export default withStyles(styles)(TipoPersona);
