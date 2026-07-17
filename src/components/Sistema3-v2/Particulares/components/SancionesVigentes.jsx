import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Box, CircularProgress } from '@mui/material';
import { GavelOutlined } from '@mui/icons-material';
import { searchInProvider } from '../../utils/api';
import { buildSearchQuery } from '../../utils/search';

const SancionesVigentes = ({ providers }) => {
  const [loading, setLoading] = useState(true);
  const [inhabilitaciones, setInhabilitaciones] = useState({
    fisica: 0,
    moral: 0,
    total: 0
  });
  const analysisCompleted = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!providers?.length || analysisCompleted.current) return;

      try {
        setLoading(true);
        const baseUrl = process.env.REACT_APP_S3_V2_BACKEND;
        
        // Construir el filtro usando la estructura correcta
        const inhabilitacionFilter = buildSearchQuery({
          tipoSancion: 'INHABILITACION'
        });

        // Obtener datos tanto de personas físicas como morales
        const [fisicaResults, moralResults] = await Promise.all([
          Promise.all(providers.map(provider => 
            searchInProvider(baseUrl, 'faltas_graves_personas_fisicas', provider.id, inhabilitacionFilter)
          )),
          Promise.all(providers.map(provider => 
            searchInProvider(baseUrl, 'faltas_graves_personas_morales', provider.id, inhabilitacionFilter)
          ))
        ]);

        // Contar totales usando pagination
        const totalFisicas = fisicaResults.reduce((total, result) => {
          return total + (result?.providerData?.pagination?.totalItems || 0);
        }, 0);

        const totalMorales = moralResults.reduce((total, result) => {
          return total + (result?.providerData?.pagination?.totalItems || 0);
        }, 0);

        setInhabilitaciones({
          fisica: totalFisicas,
          moral: totalMorales,
          total: totalFisicas + totalMorales
        });

        analysisCompleted.current = true;

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

  if (loading) {
    return (
      <Paper 
        elevation={0} 
        sx={{
          height: '100%',
          minHeight: '200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
          border: '1px solid #e0e0e0',
          borderRadius: 2,
        }}
      >
        <CircularProgress />
      </Paper>
    );
  }

  return (
    <Paper 
      elevation={0} 
      sx={{
        height: '100%',
        minHeight: '200px',
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
        <GavelOutlined sx={{ fontSize: 150 }} />
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
          Inhabilitaciones
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
          {formatNumber(inhabilitaciones.fisica)} de personas físicas
        </Typography>

        <Typography 
          variant="body1" 
          color="textSecondary"
          sx={{
            lineHeight: 1.5,
            maxWidth: '90%'
          }}
        >
          {formatNumber(inhabilitaciones.moral)} de personas morales
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

SancionesVigentes.propTypes = {
  providers: PropTypes.array.isRequired
};

export default SancionesVigentes;
