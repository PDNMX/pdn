import React, { useState, /* useEffect */ } from 'react';
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
import { useSearch } from '../hooks/useSearch';
import { GOBIERNO_TIPOS, AMBITO_TIPOS } from '../utils/search';

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

const FormServidores = ({ classes }) => {
  const initialFormState = {
    nombre: '',
    apellidoUno: '',
    apellidoDos: '',
    entePublico: '',
    ordenGobierno: '',
    ambito: '',
    tipoFalta: '',
    tipoSancion: '',
  };

  const [tipoFalta, setTipoFalta] = useState('grave');
  const [formData, setFormData] = useState(initialFormState);

  const { results, loading, error, performSearch, clearResults } = useSearch('servidores');

  // Opcionalmente, puedes ejecutar la búsqueda inicial al montar el componente
  /* useEffect(() => {
    handleInitialSearch();
  }, []); */

  /* const handleInitialSearch = () => {
    performSearch({}, tipoFalta); // Búsqueda inicial sin filtros
  }; */

  const handleClear = () => {
    setFormData(initialFormState);
    clearResults();
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

  const handleSearch = () => {
    performSearch(formData, tipoFalta);
  };

  const renderResults = () => {
    if (!results || results.length === 0) {
      return (
        <Box className={classes.noResults}>
          <Typography>No se encontraron resultados</Typography>
        </Box>
      );
    }

    return results.map((result, index) => (
      <TableContainer component={Paper} className={classes.tableContainer} key={index}>
        <Typography variant="h6" padding={2}>
          Resultados del proveedor: {result.providerId}
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>Nombre</TableCell>
              <TableCell className={classes.tableHeaderCell}>Ente Público</TableCell>
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

        <Grid item xs={12} md={12}>
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
            <InputLabel>Nivel u Orden de Gobierno</InputLabel>
            <Select
              name="ordenGobierno"
              value={formData.ordenGobierno}
              onChange={handleInputChange}
              label="Orden de Gobierno"
            >
              <MenuItem value={GOBIERNO_TIPOS.FEDERAL}>Federal</MenuItem>
              <MenuItem value={GOBIERNO_TIPOS.ESTATAL}>Estatal</MenuItem>
              <MenuItem value={GOBIERNO_TIPOS.MUNICIPAL}>Municipal/Alcaldía</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
        <FormControl variant="outlined" className={classes.formControl} size="small" fullWidth>
            <InputLabel>Ámbito Público</InputLabel>
            <Select
              name="ambito"
              value={formData.ambito}
              onChange={handleInputChange}
              label="Ámbito"
            >
              <MenuItem value={AMBITO_TIPOS.EJECUTIVO}>Ejecutivo</MenuItem>
              <MenuItem value={AMBITO_TIPOS.LEGISLATIVO}>Legislativo</MenuItem>
              <MenuItem value={AMBITO_TIPOS.JUDICIAL}>Judicial</MenuItem>
              <MenuItem value={AMBITO_TIPOS.ORGANO_AUTONOMO}>Órgano Autónomo</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
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

        <Grid item xs={12} md={6}>
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
        <Button variant="contained" className={classes.searchButton} onClick={handleSearch} disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </Button>
      </Box>

      {error && (
        <Box className={classes.errorMessage}>
          <Typography>{error}</Typography>
        </Box>
      )}

      {loading ? (
        <Box className={classes.loading}>
          <CircularProgress />
        </Box>
      ) : (
        results && (
          <Box className={classes.resultsContainer}>
            {/* <Typography variant="h6" gutterBottom>
              Resultados de la búsqueda
            </Typography> */}
            {renderResults()}
          </Box>
        )
      )}
    </div>
  );
};

FormServidores.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormServidores);
