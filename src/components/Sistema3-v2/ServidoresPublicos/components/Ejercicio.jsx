import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { 
  Paper,
  Typography,
  Grid,
  Box,
  CircularProgress
} from '@mui/material';
import { withStyles } from '@mui/styles';
import {
  ErrorOutline,
  Warning
} from '@mui/icons-material';
import { searchInProvider } from '../../utils/api';
import { buildSearchQuery } from '../../utils/search';

const normalizeInstitutionName = (name) => {
  if (!name) return '';
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ');
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(2),
    height: '100%',
    backgroundColor: '#fff'
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  value: {
    fontWeight: 'bold',
    fontSize: '2rem',
    marginBottom: theme.spacing(1)
  },
  subtitle: {
    color: theme.palette.text.secondary
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200
  }
});

const logInstitutionAnalysis = (results) => {
  const originalInstitutions = [];
  results.forEach(result => {
    if (result?.providerData?.data) {
      result.providerData.data.forEach(item => {
        if (item.empleoCargoComision?.nombreEntePublico) {
          originalInstitutions.push(item.empleoCargoComision.nombreEntePublico);
        }
      });
    }
  });

  const groupedByNormalized = new Map();
  originalInstitutions.forEach(original => {
    const normalized = normalizeInstitutionName(original);
    if (!groupedByNormalized.has(normalized)) {
      groupedByNormalized.set(normalized, new Set());
    }
    groupedByNormalized.get(normalized).add(original);
  });

  return {
    originalInstitutions,
    groupedByNormalized
  };
};

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
      display="flex" 
      flexDirection="column" 
      alignItems="flex-start"
      sx={{ 
        p: 3,
        position: 'relative',
        zIndex: 1
      }}
    >
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

const Ejercicio = ({ classes, providers, onDataUpdate }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    graves: {
      total: 0,
      instituciones: new Map()
    },
    noGraves: {
      total: 0,
      instituciones: new Map()
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

        const [gravesResults, noGravesResults] = await Promise.all([
          Promise.all(providers.map(provider => 
            searchInProvider(baseUrl, 'faltas_administrativas_graves', provider.id, emptyFilter)
          )),
          Promise.all(providers.map(provider => 
            searchInProvider(baseUrl, 'faltas_administrativas_no_graves', provider.id, emptyFilter)
          ))
        ]);

        if (!analysisCompleted.current) {
          logInstitutionAnalysis(gravesResults);
          logInstitutionAnalysis(noGravesResults);
          analysisCompleted.current = true;
        }

        const gravesInstitutions = new Map();
        let gravesTotal = 0;
        gravesResults.forEach(result => {
          if (result?.providerData?.data) {
            gravesTotal += result.providerData.pagination.totalItems;
            result.providerData.data.forEach(item => {
              if (item.empleoCargoComision?.nombreEntePublico) {
                const originalName = item.empleoCargoComision.nombreEntePublico;
                const normalizedName = normalizeInstitutionName(originalName);
                if (normalizedName) {
                  if (!gravesInstitutions.has(normalizedName) || 
                      originalName.length > gravesInstitutions.get(normalizedName).length) {
                    gravesInstitutions.set(normalizedName, originalName);
                  }
                }
              }
            });
          }
        });

        const noGravesInstitutions = new Map();
        let noGravesTotal = 0;
        noGravesResults.forEach(result => {
          if (result?.providerData?.data) {
            noGravesTotal += result.providerData.pagination.totalItems;
            result.providerData.data.forEach(item => {
              if (item.empleoCargoComision?.nombreEntePublico) {
                const originalName = item.empleoCargoComision.nombreEntePublico;
                const normalizedName = normalizeInstitutionName(originalName);
                if (normalizedName) {
                  if (!noGravesInstitutions.has(normalizedName) || 
                      originalName.length > noGravesInstitutions.get(normalizedName).length) {
                    noGravesInstitutions.set(normalizedName, originalName);
                  }
                }
              }
            });
          }
        });

        const totalCases = gravesTotal + noGravesTotal;
        const uniqueInstitutions = new Set([
          ...gravesInstitutions.keys(),
          ...noGravesInstitutions.keys()
        ]).size;

        setData({
          graves: {
            total: gravesTotal,
            instituciones: gravesInstitutions
          },
          noGraves: {
            total: noGravesTotal,
            instituciones: noGravesInstitutions
          }
        });

        if (onDataUpdate) {
          onDataUpdate({
            totalCases,
            uniqueInstitutions
          });
        }

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
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: 200 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  
  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12} md={6}>
        <StatsCard
          title="Personas servidoras públicas con Faltas Graves"
          total={formatNumber(data.graves.total)}
          subtitle={`${formatNumber(data.graves.instituciones.size)} Entes públicos involucrados`}
          icon={ErrorOutline}
          gradient="linear-gradient(90deg, #d32f2f 0%, #f37878 100%)"
          color="#f37878"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <StatsCard
          title="Personas servidoras públicas con Faltas No Graves"
          total={formatNumber(data.noGraves.total)}
          subtitle={`${formatNumber(data.noGraves.instituciones.size)} Entes públicos involucrados`}
          icon={Warning}
          gradient="linear-gradient(90deg, #f57c00 0%, #f5b16b 100%)"
          color="#f5b16b"
        />
      </Grid>
    </Grid>
  );
};

Ejercicio.propTypes = {
  classes: PropTypes.object.isRequired,
  providers: PropTypes.array.isRequired,
  onDataUpdate: PropTypes.func.isRequired
};

export default withStyles(styles)(Ejercicio);