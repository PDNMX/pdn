import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { EventBusy } from '@mui/icons-material';
import { searchInProvider } from '../../utils/api';
import { buildSearchQuery } from '../../utils/search';
import { 
  SANCION_GRAVE_TIPOS,
  SANCION_NO_GRAVE_TIPOS
} from '../../utils/search';

const TotalRamos = ({ providers }) => {
  const [inhabilitaciones, setInhabilitaciones] = useState({
    graves: 0,
    noGraves: 0,
    total: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!providers?.length) return;

      try {
        setLoading(true);
        const baseUrl = process.env.REACT_APP_S3_V2_BACKEND;

        const filterGraves = buildSearchQuery({
          tipoSancion: SANCION_GRAVE_TIPOS.INHABILITACION
        });

        const filterNoGraves = buildSearchQuery({
          tipoSancion: SANCION_NO_GRAVE_TIPOS.INHABILITACION
        });

        const [gravesResults, noGravesResults] = await Promise.all([
          Promise.all(providers.map(provider => 
            searchInProvider(baseUrl, 'faltas_administrativas_graves', provider.id, filterGraves)
          )),
          Promise.all(providers.map(provider => 
            searchInProvider(baseUrl, 'faltas_administrativas_no_graves', provider.id, filterNoGraves)
          ))
        ]);

        const countGraves = gravesResults.reduce((total, result) => {
          return total + (result?.providerData?.pagination?.totalItems || 0);
        }, 0);

        const countNoGraves = noGravesResults.reduce((total, result) => {
          return total + (result?.providerData?.pagination?.totalItems || 0);
        }, 0);

        const totalInhabilitaciones = countGraves + countNoGraves;

        setInhabilitaciones({
          graves: countGraves,
          noGraves: countNoGraves,
          total: totalInhabilitaciones
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [providers]);

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
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
        <EventBusy sx={{ fontSize: 150 }} />
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
          Total de Inhabilitaciones
        </Typography>

        <Typography 
          variant="h3" 
          component="div" 
          sx={{ 
            fontWeight: 700,
            mb: 1,
            color: '#963476'
          }}
        >
          {formatNumber(inhabilitaciones.total)}
        </Typography>

        <Typography 
          variant="body1" 
          color="textSecondary"
          sx={{
            lineHeight: 1.5,
            maxWidth: '90%'
          }}
        >
          {formatNumber(inhabilitaciones.graves)} por faltas graves
        </Typography>
        <Typography 
          variant="body1" 
          color="textSecondary"
          sx={{
            lineHeight: 1.5,
            maxWidth: '90%'
          }}
        >
          {formatNumber(inhabilitaciones.noGraves)} por faltas no graves
        </Typography>

        <Box 
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: 'linear-gradient(90deg, #963476 0%, #2787C5 100%)',
            opacity: 0.7
          }}
        />
      </Box>
    </Paper>
  );
};

export default TotalRamos;