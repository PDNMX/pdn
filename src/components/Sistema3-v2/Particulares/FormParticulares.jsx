import React, { useState } from 'react';
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useSearch } from '../hooks/useSearch';
import { FALTA_FISICA_LABELS, FALTA_MORAL_LABELS, SANCION_FISICA_LABELS, SANCION_MORAL_LABELS } from '../utils/search';
import DetailDialogParticulares from '../components/DetailDialogParticulares';
import PaginationControls from '../components/PaginationControls';
import ProviderAccordion from '../components/ProviderAccordion';
import commonStyles from '../commonStyles';

const styles = theme => ({
  ...commonStyles(theme),
});

const FormParticulares = ({ classes, providers }) => {
  const [tipoPersona, setTipoPersona] = useState('fisica');
  const [formData, setFormData] = useState({
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    rfc: '',
    nombreRazonSocial: '',
    faltaCometida: '',
    tipoSancion: '',
  });
  const [selectedRecord, setSelectedRecord] = useState(null);
  const { results, loading, error, pagination, performSearch, clearResults } = useSearch();

  /* const getEndpointByTipoPersona = () => {
    return tipoPersona === 'fisica' ? 'faltas_graves_personas_fisicas' : 'faltas_graves_personas_morales';
  }; */

  const handlePageChange = (providerId, newPage) => {
    const endpoint = getEndpointByTipoPersona();
    performSearch(formData, endpoint, providers, providerId, newPage);
  };

  const handleTipoPersonaChange = event => {
    const newTipoPersona = event.target.value;
    setTipoPersona(newTipoPersona);

    setFormData({
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
      rfc: '',
      nombreRazonSocial: '',
      faltaCometida: '', // Limpiar al cambiar tipo de persona
      tipoSancion: '', // Limpiar al cambiar tipo de persona
    });
    clearResults();
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setFormData({
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
      rfc: '',
      nombreRazonSocial: '',
      faltaCometida: '',
      tipoSancion: '',
    });
    clearResults();
  };

  const handleSearch = () => {
    const endpoint = tipoPersona === 'fisica' ? 'faltas_graves_personas_fisicas' : 'faltas_graves_personas_morales';

    performSearch(formData, endpoint, providers);
  };

  const handleRowClick = record => {
    setSelectedRecord(record);
  };

  const renderPersonaFisicaForm = () => (
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
          label="Primer Apellido"
          name="primerApellido"
          value={formData.primerApellido}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          className={classes.formControl}
          label="Segundo Apellido"
          name="segundoApellido"
          value={formData.segundoApellido}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
          fullWidth
        />
      </Grid>
    </Grid>
  );

  const renderPersonaMoralForm = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <TextField
          className={classes.formControl}
          label="RFC"
          name="rfc"
          value={formData.rfc}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          className={classes.formControl}
          label="Nombre o Razón Social"
          name="nombreRazonSocial"
          value={formData.nombreRazonSocial}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
          fullWidth
        />
      </Grid>
    </Grid>
  );

  const renderCommonFields = () => {
    const faltaTipos = tipoPersona === 'fisica' ? FALTA_FISICA_LABELS : FALTA_MORAL_LABELS;
    const sancionTipos = tipoPersona === 'fisica' ? SANCION_FISICA_LABELS : SANCION_MORAL_LABELS;

    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl variant="outlined" className={classes.formControl} size="small" fullWidth>
            <InputLabel>Falta Cometida</InputLabel>
            <Select
              name="faltaCometida"
              value={formData.faltaCometida}
              onChange={handleInputChange}
              label="Falta Cometida"
            >
              {Object.entries(faltaTipos).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
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
              {Object.entries(sancionTipos).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    );
  };

  const renderResults = () => {
    if (!results || results.length === 0) {
      return (
        <Box className={classes.noResults}>
          <Typography>No se encontraron resultados</Typography>
        </Box>
      );
    }

    let totalRegistros = 0;
    results.forEach(result => {
      totalRegistros += result.providerData.pagination.totalItems;
    });

    if (totalRegistros === 0) {
      return (
        <Box className={classes.noResults}>
          <Typography>No se encontraron resultados que coincidan con los criterios de búsqueda</Typography>
        </Box>
      );
    }

    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Se encontraron {totalRegistros} registro(s)
        </Typography>
        {results.map((result, index) => (
          <ProviderAccordion
            key={index}
            provider={providers.find(p => p.id === result.providerId)}
            loading={loading}
            totalRegistros={result.providerData.pagination?.totalItems}
          >
            <TableContainer component={Paper} className={classes.tableContainer}>
              <Table>
                <TableHead>
                  <TableRow>
                    {tipoPersona === 'fisica' ? (
                      <TableCell className={classes.tableHeaderCell}>Nombre</TableCell>
                    ) : (
                      <>
                        <TableCell className={classes.tableHeaderCell}>RFC</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Razón Social</TableCell>
                      </>
                    )}
                    <TableCell className={classes.tableHeaderCell}>Expediente</TableCell>
                    <TableCell className={classes.tableHeaderCell}>Fecha</TableCell>
                    <TableCell className={classes.tableHeaderCell}>Tipo de Sanción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {result.providerData.data.map((item, i) => (
                    <TableRow
                      key={i}
                      onClick={() => handleRowClick(item)}
                      className={classes.tableRow}
                      hover
                      style={{ cursor: 'pointer' }}
                    >
                      {tipoPersona === 'fisica' ? (
                        <TableCell>
                          {`${item.datosGenerales?.nombres || ''} ${item.datosGenerales?.primerApellido || ''} ${
                            item.datosGenerales?.segundoApellido || ''}`}
                        </TableCell>
                      ) : (
                        <>
                          <TableCell>{item.datosGenerales?.rfc || 'N/A'}</TableCell>
                          <TableCell>{item.datosGenerales?.nombreRazonSocial || 'N/A'}</TableCell>
                        </>
                      )}
                      <TableCell>{item.expediente || 'N/A'}</TableCell>
                      <TableCell>{new Date(item.fecha).toLocaleDateString('es-MX')}</TableCell>
                      <TableCell>{item.tipoSancion?.map(sancion => sancion.valor).join(', ') || 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {pagination[result.providerId] && (
                <PaginationControls
                  pagination={pagination[result.providerId]}
                  onPageChange={(newPage) => handlePageChange(result.providerId, newPage)}
                />
              )}
            </TableContainer>
          </ProviderAccordion>
        ))}

        <DetailDialogParticulares
          open={!!selectedRecord}
          onClose={() => setSelectedRecord(null)}
          data={selectedRecord}
          tipoPersona={tipoPersona}
        />
      </Box>
    );
  };

  return (
    <div className={classes.root}>
      <Box className={classes.tipoPersonaSelector}>
        <Typography variant="subtitle1" className={classes.sectionTitle}>
          Selecciona el tipo de persona:
        </Typography>

        <RadioGroup value={tipoPersona} onChange={handleTipoPersonaChange} className={classes.radioGroup}>
          <FormControlLabel value="fisica" control={<Radio color="primary" />} label="Persona Física" />
          <FormControlLabel value="moral" control={<Radio color="primary" />} label="Persona Moral" />
        </RadioGroup>
      </Box>

      {tipoPersona === 'fisica' ? renderPersonaFisicaForm() : renderPersonaMoralForm()}
      {renderCommonFields()}

      <Box className={classes.buttonContainer}>
        <Button variant="outlined" className={classes.clearButton} onClick={handleClear}>
          Limpiar
        </Button>
        <Button
          variant="contained"
          className={classes.searchButton}
          onClick={handleSearch}
          disabled={loading || !providers || providers.length === 0}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </Button>
      </Box>

      {/* ... Resultados y DetailDialog similar a FormServidores ... */}
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
        results && <Box className={classes.resultsContainer}>{renderResults()}</Box>
      )}
    </div>
  );
};

FormParticulares.propTypes = {
  classes: PropTypes.object.isRequired,
  providers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default withStyles(styles)(FormParticulares);
