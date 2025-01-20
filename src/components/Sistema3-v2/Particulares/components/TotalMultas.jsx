import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Box, CircularProgress } from '@mui/material';
import { MonetizationOn } from '@mui/icons-material';
import { searchInProvider } from '../../utils/api';
import { buildSearchQuery } from '../../utils/search';

const TotalMultas = ({ providers }) => {
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const isMounted = useRef(true);
  const analysisCompleted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    const fetchAllPages = async (baseUrl, endpoint, providerId, filter) => {
      try {
        const firstPage = await searchInProvider(baseUrl, endpoint, providerId, filter);
        if (!firstPage?.providerData?.pagination) return [];

        const { totalItems, limit } = firstPage.providerData.pagination;
        const totalPages = Math.ceil(totalItems / limit);
        
        let allData = firstPage.providerData.data || [];

        if (totalPages > 1) {
          const remainingPages = await Promise.all(
            Array.from({ length: totalPages - 1 }, (_, i) =>
              searchInProvider(baseUrl, endpoint, providerId, filter, i + 2, limit)
            )
          );

          remainingPages.forEach(page => {
            if (page?.providerData?.data) {
              allData = [...allData, ...page.providerData.data];
            }
          });
        }

        return allData;
      } catch (error) {
        console.error('Error fetching pages:', error);
        return [];
      }
    };

    const procesarMultas = (item, providerId) => {
      let multa = 0;
      
      if (item?.tipoSancion && Array.isArray(item.tipoSancion)) {
        item.tipoSancion.forEach(sancion => {
          // Verificar tanto el valor como la clave
          const esSancionEconomica = 
            sancion?.valor?.toLowerCase().includes('económica') || 
            sancion?.clave === 'SANCION_ECONOMICA';
    
          const moneda = sancion?.sancionEconomica?.moneda?.toLowerCase() || '';
          const esMonedaMexicana = moneda.includes('mex') || moneda === 'mxn';
          const monto = sancion?.sancionEconomica?.monto;
    
          if (providerId === 'SESEA_QUINTANA_ROO') {
            console.log('\nValidaciones para QUINTANA_ROO:');
            console.log('- Clave de sanción:', sancion.clave);
            console.log('- ¿Es sanción económica?:', esSancionEconomica);
            console.log('- Moneda:', moneda);
            console.log('- ¿Es moneda mexicana?:', esMonedaMexicana);
            console.log('- Monto:', monto);
          }
    
          if (esSancionEconomica && monto !== null && monto !== undefined && esMonedaMexicana) {
            const montoStr = monto.toString().replace(/[^0-9.]/g, '');
            const montoNumerico = parseFloat(montoStr);
            
            if (!isNaN(montoNumerico) && montoNumerico > 0) {
              multa += montoNumerico;
              if (providerId === 'SESEA_QUINTANA_ROO') {
                console.log('¡Multa procesada exitosamente!');
                console.log('Monto agregado:', montoNumerico);
              }
            }
          }
        });
      }
      
      return multa;
    };

    const fetchData = async () => {
      if (!providers?.length || analysisCompleted.current) return;

      try {
        if (isMounted.current) {
          setLoading(true);
        }

        const baseUrl = process.env.REACT_APP_S3_V2_BACKEND;
        const emptyFilter = buildSearchQuery({});

        let totalMultas = 0;
        
        console.log('Iniciando procesamiento de multas con', providers.length, 'providers');

        for (const provider of providers) {
          if (!isMounted.current) return;

          console.log(`\nProcesando provider: ${provider.id}`);

          const [fisicaData, moralData] = await Promise.all([
            fetchAllPages(baseUrl, 'faltas_graves_personas_fisicas', provider.id, emptyFilter),
            fetchAllPages(baseUrl, 'faltas_graves_personas_morales', provider.id, emptyFilter)
          ]);

          console.log(`Provider ${provider.id}:`);
          console.log('- Personas físicas:', fisicaData.length, 'registros');
          console.log('- Personas morales:', moralData.length, 'registros');

          // Procesar multas de personas físicas
          fisicaData.forEach(item => {
            const multaItem = procesarMultas(item, provider.id);
            totalMultas += multaItem;
            if (multaItem > 0) {
              console.log(`Multa física encontrada en ${provider.id}:`, multaItem);
            }
          });

          // Procesar multas de personas morales
          moralData.forEach(item => {
            const multaItem = procesarMultas(item, provider.id);
            totalMultas += multaItem;
            if (multaItem > 0) {
              console.log(`Multa moral encontrada en ${provider.id}:`, multaItem);
            }
          });

          console.log(`Total acumulado después de provider ${provider.id}:`, totalMultas);
        }

        console.log('\nTotal final de multas:', totalMultas);

        if (isMounted.current) {
          setTotalAmount(totalMultas);
          analysisCompleted.current = true;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, [providers]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
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
          borderRadius: 2
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
        <MonetizationOn sx={{ fontSize: 150 }} />
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
          Multas Económicas
        </Typography>

        <Typography 
          variant="h3" 
          component="div" 
          sx={{ 
            fontWeight: 700,
            mb: 1,
            color: '#2e7d32'
          }}
        >
          {formatCurrency(totalAmount)}
        </Typography>

        <Typography 
          variant="body1" 
          color="textSecondary"
          sx={{
            lineHeight: 1.5
          }}
        >
          Total de sanciones económicas en pesos mexicanos
        </Typography>

        <Box 
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: 'linear-gradient(90deg, #2e7d32 0%, #81c784 100%)',
            opacity: 0.7
          }}
        />
      </Box>
    </Paper>
  );
};

TotalMultas.propTypes = {
  providers: PropTypes.array.isRequired
};

export default TotalMultas;