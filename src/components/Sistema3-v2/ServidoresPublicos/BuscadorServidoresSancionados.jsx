import React, { useState, useEffect } from 'react';
import { withStyles } from '@mui/styles';
import {
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    padding: theme.spacing(3),
  },
  sectionTitle: {
    color: '#666',
    marginBottom: theme.spacing(3),
  },
  faltasSelector: {
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2),
  },
  radioGroup: {
    flexDirection: 'row',
    gap: theme.spacing(4),
  },
  formControl: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(3),
    gap: theme.spacing(2),
  },
  searchButton: {
    backgroundColor: '#9c27b0',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#7b1fa2',
    },
  },
  clearButton: {
    color: '#9c27b0',
    borderColor: '#9c27b0',
    '&:hover': {
      borderColor: '#7b1fa2',
      backgroundColor: 'rgba(156, 39, 176, 0.04)',
    },
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
  },
  resultsContainer: {
    marginTop: theme.spacing(4),
  },
  tableContainer: {
    marginTop: theme.spacing(2),
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
  },
  noResults: {
    textAlign: 'center',
    padding: theme.spacing(3),
    backgroundColor: '#f5f5f5',
    borderRadius: theme.shape.borderRadius,
  },
  errorMessage: {
    color: theme.palette.error.main,
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.error.light,
    borderRadius: theme.shape.borderRadius,
  },
});

const BuscadorServidoresSancionados = ({ classes }) => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [tipoFalta, setTipoFalta] = useState('grave');
  const [formData, setFormData] = useState({
    nombre: '',
    apellidoUno: '',
    apellidoDos: '',
    entePublico: '',
    ordenGobierno: '',
    ambito: '',
    tipoFalta: '',
    tipoSancion: '',
  });

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_S3_V2_BACKEND}/api/v1/providers`);
        if (!response.ok) {
          throw new Error('Error al obtener los proveedores');
        }
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setProviders(result.data);
          console.log(result.data);
        } else {
          throw new Error('Formato de datos inválido');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching providers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  const getEndpointBase = providerId => {
    const baseUrl = `${process.env.REACT_APP_S3_V2_BACKEND}/api/v1`;
    const endpoint = tipoFalta === 'grave' ? 'faltas_administrativas_graves' : 'faltas_administrativas_no_graves';
    return `${baseUrl}/${endpoint}/${providerId}`;
  };

  const buildSearchQuery = formData => {
    const filters = [];

    if (formData.nombre) {
      filters.push('filter=[datosGenerales][nombres][_icontains]=' + encodeURIComponent(formData.nombre));
    }

    return filters.join('&');
  };

  const searchInProvider = async providerId => {
    try {
      const queryString = buildSearchQuery(formData);

      if (!queryString) {
        return null;
      }

      const searchUrl = `${process.env.REACT_APP_S3_V2_BACKEND}/api/v1/${
        tipoFalta === 'grave' ? 'faltas_administrativas_graves' : 'faltas_administrativas_no_graves'
      }/${providerId}?${queryString}`;

      const response = await fetch(searchUrl);
      if (!response.ok) {
        throw new Error(`Error en proveedor ${providerId}`);
      }

      const providerData = await response.json();
      return {
        providerId,
        providerData,
      };
    } catch (error) {
      console.error(`Error searching in provider ${providerId}:`, error);
      return {
        providerId,
        error: error.message,
      };
    }
  };

  const handleSearch = async () => {
    if (!formData.nombre) {
      setError('Por favor, ingresa al menos el nombre para buscar');
      return;
    }

    setIsSearching(true);
    setError(null);
    setSearchResults(null);

    try {
      const availabilityChecks = await Promise.all(
        providers.map(async provider => {
          const baseEndpoint = getEndpointBase(provider.id);
          try {
            const response = await fetch(baseEndpoint);
            return {
              providerId: provider.id,
              available: response.ok,
            };
          } catch (error) {
            return {
              providerId: provider.id,
              available: false,
            };
          }
        }),
      );

      const availableProviders = availabilityChecks.filter(check => check.available).map(check => check.providerId);

      const searchResults = await Promise.all(availableProviders.map(providerId => searchInProvider(providerId)));

      const validResults = searchResults.filter(result => result && !result.error);
      setSearchResults(validResults);

      const errors = searchResults
        .filter(result => result && result.error)
        .map(result => `${result.providerId}: ${result.error}`);

      if (errors.length > 0) {
        setError(`Errores en algunos proveedores: ${errors.join('; ')}`);
      }
    } catch (error) {
      setError('Error al realizar la búsqueda: ' + error.message);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClear = () => {
    setFormData({
      nombre: '',
      apellidoUno: '',
      apellidoDos: '',
      entePublico: '',
      ordenGobierno: '',
      ambito: '',
      tipoFalta: '',
      tipoSancion: '',
    });
    setSearchResults(null);
    setError(null);
  };

  const handleTipoFaltaChange = event => {
    setTipoFalta(event.target.value);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }

  const renderResults = () => {
    console.log(searchResults)
    if (!searchResults || searchResults.length === 0) {
      return (
        <Box className={classes.noResults}>
          <Typography>No se encontraron resultados</Typography>
        </Box>
      );
    }

    return searchResults.map((result, index) => (
      <TableContainer component={Paper} className={classes.tableContainer} key={index}>
        <Typography variant="h6" padding={2}>
          Resultados del proveedor: {result.providerId}
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>Nombre</TableCell>
              <TableCell className={classes.tableHeaderCell}>Institución</TableCell>
              <TableCell className={classes.tableHeaderCell}>Fecha</TableCell>
              <TableCell className={classes.tableHeaderCell}>Expediente</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result.providerData.data.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{item.datosGenerales?.nombres || 'N/A'}</TableCell>
                <TableCell>{item.empleoCargoComision?.nombreEntePublico || 'N/A'}</TableCell>
                <TableCell>{item.fecha || 'N/A'}</TableCell>
                <TableCell>{item.expediente || 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ));
  };

  return (
    <div className={classes.root}>
      <Box className={classes.faltasSelector}>
        <Typography variant="subtitle1" className={classes.sectionTitle}>
          Selecciona el tipo de falta:
        </Typography>

        <RadioGroup value={tipoFalta} onChange={handleTipoFaltaChange} className={classes.radioGroup}>
          <FormControlLabel value="grave" control={<Radio color="primary" />} label="Faltas Graves" />
          <FormControlLabel value="noGrave" control={<Radio color="primary" />} label="Faltas No Graves" />
        </RadioGroup>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            className={classes.formControl}
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            className={classes.formControl}
            label="Apellido Uno"
            name="apellidoUno"
            value={formData.apellidoUno}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            className={classes.formControl}
            label="Apellido Dos"
            name="apellidoDos"
            value={formData.apellidoDos}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            className={classes.formControl}
            label="Ente Público"
            name="entePublico"
            value={formData.entePublico}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl variant="outlined" className={classes.formControl} size="small" fullWidth>
            <InputLabel>Orden de Gobierno</InputLabel>
            <Select
              name="ordenGobierno"
              value={formData.ordenGobierno}
              onChange={handleInputChange}
              label="Orden de Gobierno"
            >
              <MenuItem value="federal">Federal</MenuItem>
              <MenuItem value="estatal">Estatal</MenuItem>
              <MenuItem value="municipal">Municipal</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl variant="outlined" className={classes.formControl} size="small" fullWidth>
            <InputLabel>Ámbito</InputLabel>
            <Select name="ambito" value={formData.ambito} onChange={handleInputChange} label="Ámbito">
              <MenuItem value="ejecutivo">Ejecutivo</MenuItem>
              <MenuItem value="legislativo">Legislativo</MenuItem>
              <MenuItem value="judicial">Judicial</MenuItem>
              <MenuItem value="organoAutonomo">Órgano Autónomo</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl variant="outlined" className={classes.formControl} size="small" fullWidth>
            <InputLabel>Tipo de Falta</InputLabel>
            <Select name="tipoFalta" value={formData.tipoFalta} onChange={handleInputChange} label="Tipo de Falta">
              <MenuItem value="cohecho">Cohecho</MenuItem>
              <MenuItem value="peculado">Peculado</MenuItem>
              <MenuItem value="desvio">Desvío de recursos</MenuItem>
              <MenuItem value="abuso">Abuso de funciones</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl variant="outlined" className={classes.formControl} size="small" fullWidth>
            <InputLabel>Tipo de Sanción</InputLabel>
            <Select
              name="tipoSancion"
              value={formData.tipoSancion}
              onChange={handleInputChange}
              label="Tipo de Sanción"
            >
              <MenuItem value="inhabilitacion">Inhabilitación</MenuItem>
              <MenuItem value="suspension">Suspensión</MenuItem>
              <MenuItem value="destitucion">Destitución</MenuItem>
              <MenuItem value="economica">Sanción Económica</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box className={classes.buttonContainer}>
        <Button variant="outlined" className={classes.clearButton} onClick={handleClear}>
          Limpiar
        </Button>
        <Button
          variant="contained"
          className={classes.searchButton}
          onClick={handleSearch}
          disabled={isSearching}
          disabled={isSearching}
        >
          {isSearching ? 'Buscando...' : 'Buscar'}
        </Button>
      </Box>

      {error && (
        <Box className={classes.errorMessage}>
          <Typography>{error}</Typography>
        </Box>
      )}

      {isSearching ? (
        <Box className={classes.loading}>
          <CircularProgress />
        </Box>
      ) : (
        searchResults && (
          <Box className={classes.resultsContainer}>
            <Typography variant="h6" gutterBottom>
              Resultados de la búsqueda
            </Typography>
            {renderResults()}
          </Box>
        )
      )}
    </div>
  );
};

BuscadorServidoresSancionados.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BuscadorServidoresSancionados);
