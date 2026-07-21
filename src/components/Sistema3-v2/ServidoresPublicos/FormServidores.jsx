import { useState /* useEffect */ } from 'react';
import { withStyles } from 'tss-react/mui';
import DetailDialog from '../components/DetailDialog';
import PaginationControls from '../components/PaginationControls';
import ProviderAccordion from '../components/ProviderAccordion';
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
import {
  GOBIERNO_TIPOS,
  AMBITO_TIPOS,
  SANCION_GRAVE_LABELS,
  SANCION_NO_GRAVE_LABELS,
  FALTA_GRAVE_LABELS,
  FALTA_NO_GRAVE_LABELS,
  ENTIDADES_FEDERATIVAS,
} from '../utils/search';
import commonStyles from '../commonStyles';

const styles = theme => ({
  ...commonStyles(theme),
});

const FormServidores = ({ classes, providers }) => {
  const initialFormState = {
    nombre: '',
    apellidoUno: '',
    apellidoDos: '',
    entePublico: '',
    ordenGobierno: '',
    ambito: '',
    faltaCometida: '',
    tipoSancion: '',
    entidadFederativa: '',
  };

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [tipoFalta, setTipoFalta] = useState('grave');
  const [formData, setFormData] = useState(initialFormState);

  const { results, loading, error, pagination, performSearch, clearResults } = useSearch();

  const renderFaltaSelect = () => (
    <FormControl variant="outlined" className={classes.formControl} size="small" fullWidth>
      <InputLabel shrink id="falta-cometida-label">
        Falta Cometida
      </InputLabel>
      <Select
        labelId="falta-cometida-label"
        name="faltaCometida"
        value={formData.faltaCometida}
        onChange={handleInputChange}
        label="Falta Cometida"
        displayEmpty
        notched
        sx={{
          '& .MuiSelect-select': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <MenuItem value="">
          <em>Todas</em>
        </MenuItem>
        {Object.entries(tipoFalta === 'grave' ? FALTA_GRAVE_LABELS : FALTA_NO_GRAVE_LABELS).map(([value, label]) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const renderSancionSelect = () => (
    <FormControl variant="outlined" className={classes.formControl} size="small" fullWidth>
      <InputLabel shrink id="tipo-sancion-label">
        Tipo de Sanción
      </InputLabel>
      <Select
        labelId="tipo-sancion-label"
        name="tipoSancion"
        value={formData.tipoSancion}
        onChange={handleInputChange}
        label="Tipo de Sanción"
        displayEmpty
        notched
        sx={{
          '& .MuiSelect-select': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <MenuItem value="">
          <em>Todas</em>
        </MenuItem>
        {Object.entries(tipoFalta === 'grave' ? SANCION_GRAVE_LABELS : SANCION_NO_GRAVE_LABELS).map(
          ([value, label]) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ),
        )}
      </Select>
    </FormControl>
  );

  // Actualizar el handler de cambio de tipo de falta para limpiar también la sanción
  const handleTipoFaltaChange = event => {
    const newTipoFalta = event.target.value;
    setTipoFalta(newTipoFalta);

    setFormData(prev => ({
      ...prev,
      faltaCometida: '', // Limpiar falta cometida al cambiar
      tipoSancion: '', // Limpiar tipo de sanción al cambiar
      nombre: newTipoFalta === 'noGrave' ? '' : prev.nombre,
      apellidoUno: newTipoFalta === 'noGrave' ? '' : prev.apellidoUno,
      apellidoDos: newTipoFalta === 'noGrave' ? '' : prev.apellidoDos,
    }));
    clearResults();
  };

  const renderNoResults = () => (
    <Box className={classes.noResults}>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        No se encontraron resultados
      </Typography>
      <Typography color="textSecondary">
        No se encontraron registros que coincidan con los criterios de búsqueda. Por favor, intenta con diferentes
        términos o menos filtros.
      </Typography>
    </Box>
  );

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

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    const endpoint = tipoFalta === 'grave' ? 'faltas_administrativas_graves' : 'faltas_administrativas_no_graves';
    performSearch(formData, endpoint, providers);
  };

  const handlePageChange = (providerId, newPage) => {
    const endpoint = tipoFalta === 'grave' ? 'faltas_administrativas_graves' : 'faltas_administrativas_no_graves';
    performSearch(formData, endpoint, providers, providerId, newPage);
  };

  const handleRowClick = record => {
    setSelectedRecord(record);
  };

  const renderResults = () => {
    if (!results || results.length === 0) {
      return renderNoResults();
    }

    let totalRegistros = 0;
    results.forEach(result => {
      totalRegistros += result.providerData.pagination.totalItems;
    });

    if (totalRegistros === 0) {
      return renderNoResults();
    }

    // Ordenar los resultados alfabéticamente por providerId de forma ascendente
    const sortedResults = [...results].sort((a, b) => {
      return a.providerId.localeCompare(b.providerId);
    });
    //console.log(sortedResults)

    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Se encontraron {totalRegistros} registro(s)
        </Typography>
        {sortedResults.map((result, index) => {
          const hasData = result.providerData.pagination?.totalItems > 0;

          return (
            <ProviderAccordion
              key={index}
              provider={providers.find(p => p.id === result.providerId)}
              loading={loading}
              totalRegistros={result.providerData.pagination?.totalItems}
            >
              {hasData ? (
                <>
                  <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {tipoFalta === 'grave' && <TableCell className={classes.tableHeaderCell}>Nombre</TableCell>}
                          <TableCell className={classes.tableHeaderCell}>Institución</TableCell>
                          <TableCell className={classes.tableHeaderCell}>Fecha</TableCell>
                          {/* <TableCell className={classes.tableHeaderCell}>Expediente</TableCell> */}
                          {tipoFalta === 'grave' && <TableCell className={classes.tableHeaderCell}>Expediente</TableCell>}
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
                            {tipoFalta === 'grave' && (
                              <>
                              <TableCell>
                                {`${item.datosGenerales?.nombres || ''} ${item.datosGenerales?.primerApellido ||
                                  ''} ${item.datosGenerales?.segundoApellido || ''}`}
                              </TableCell>
                              </>
                            )}
                            <TableCell>{item.empleoCargoComision?.nombreEntePublico || 'N/A'}</TableCell>
                            <TableCell>{item.fecha}</TableCell>
                            {tipoFalta === 'grave' && (
                              <TableCell>{item.expediente || 'N/A'}</TableCell>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {pagination[result.providerId] && (
                    <PaginationControls
                      pagination={pagination[result.providerId]}
                      onPageChange={newPage => handlePageChange(result.providerId, newPage)}
                    />
                  )}
                </>
              ) : null}
            </ProviderAccordion>
          );
        })}

        <DetailDialog open={!!selectedRecord} onClose={() => setSelectedRecord(null)} data={selectedRecord} tipoFalta={tipoFalta}/>
      </Box>
    );
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
        {tipoFalta === 'grave' && (
          <>
            <Grid
              size={{
                xs: 12,
                md: 4
              }}>
              <TextField
                className={classes.formControl}
                label="Nombre(s)"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid
              size={{
                xs: 12,
                md: 4
              }}>
              <TextField
                className={classes.formControl}
                label="Primer Apellido"
                name="apellidoUno"
                value={formData.apellidoUno}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid
              size={{
                xs: 12,
                md: 4
              }}>
              <TextField
                className={classes.formControl}
                label="Segundo Apellido"
                name="apellidoDos"
                value={formData.apellidoDos}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
          </>
        )}

        <Grid
          size={{
            xs: 12,
            md: 12
          }}>
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

        <Grid
          size={{
            xs: 12,
            md: 12
          }}>
          <FormControl variant="outlined" className={classes.formControl} size="small" fullWidth>
            <InputLabel shrink id="entidad-federativa-label">
              Entidad Federativa
            </InputLabel>
            <Select
              labelId="entidad-federativa-label"
              name="entidadFederativa"
              value={formData.entidadFederativa}
              onChange={handleInputChange}
              label="Entidad Federativa"
              displayEmpty
              notched
              sx={{
                '& .MuiSelect-select': {
                  backgroundColor: 'transparent',
                },
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 500,
                  },
                },
              }}
            >
              <MenuItem
                value=""
              >
                <em>Todas las entidades</em>
              </MenuItem>
              {Object.entries(ENTIDADES_FEDERATIVAS)
                .sort(([, a], [, b]) => a.localeCompare(b))
                .map(([value, label]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 6
          }}>
          <FormControl variant="outlined" className={classes.formControl} size="small" fullWidth>
            <InputLabel shrink id="orden-gobierno-label">
              Nivel u Orden de Gobierno
            </InputLabel>
            <Select
              labelId="orden-gobierno-label"
              name="ordenGobierno"
              value={formData.ordenGobierno}
              onChange={handleInputChange}
              label="Nivel u Orden de Gobierno"
              displayEmpty
              notched
              sx={{
                '& .MuiSelect-select': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <MenuItem value="">
                <em>Todos</em>
              </MenuItem>
              <MenuItem value={GOBIERNO_TIPOS.FEDERAL}>Federal</MenuItem>
              <MenuItem value={GOBIERNO_TIPOS.ESTATAL}>Estatal</MenuItem>
              <MenuItem value={GOBIERNO_TIPOS.MUNICIPAL}>Municipal/Alcaldía</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 6
          }}>
          <FormControl variant="outlined" className={classes.formControl} size="small" fullWidth>
            <InputLabel shrink id="ambito-label">
              Ámbito Público
            </InputLabel>
            <Select
              labelId="ambito-label"
              name="ambito"
              value={formData.ambito}
              onChange={handleInputChange}
              label="Ámbito Público"
              displayEmpty
              notched
              sx={{
                '& .MuiSelect-select': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <MenuItem value="">
                <em>Todos</em>
              </MenuItem>
              <MenuItem value={AMBITO_TIPOS.EJECUTIVO}>Ejecutivo</MenuItem>
              <MenuItem value={AMBITO_TIPOS.LEGISLATIVO}>Legislativo</MenuItem>
              <MenuItem value={AMBITO_TIPOS.JUDICIAL}>Judicial</MenuItem>
              <MenuItem value={AMBITO_TIPOS.ORGANO_AUTONOMO}>Órgano Autónomo</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 6
          }}>
          {renderFaltaSelect()}
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 6
          }}>
          {renderSancionSelect()}
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
  providers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default withStyles(FormServidores, styles);
