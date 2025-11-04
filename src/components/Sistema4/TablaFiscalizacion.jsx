import React from "react";
import withStyles from "@mui/styles/withStyles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableFooter,
  Paper,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  TextField,
  Autocomplete,
  Link,
  Button,
  Grid,
} from "@mui/material";

// Datos vacíos - este componente es solo para el tab de "Intercambio de Información"
const datosASF = [];
const datosBuenGobierno = [];

const styles = (theme) => ({
  root: {},
  container: {
    marginTop: "30px",
    marginBottom: "30px",
    overflowX: "auto",
  },
  progress: {
    position: "fixed",
    margin: "auto",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  tablePagination: {
    overflowX: "auto",
    fontSize: "0.75rem",
  },
  desc: {
    color: theme.palette.primary.main,
  },
  ul: {
    listStyle: "none",
    paddingLeft: "20px",
  },
  li: {
    "&:before": {
      content: '"•"',
      color: theme.palette.primary.main,
      fontWeight: "bold",
      display: "inline-block",
      width: "1em",
      marginLeft: "-1em",
    },
  },
  paper: {
    backgroundColor: theme.palette.background.opaque,
    padding: theme.spacing(2),
    color: theme.palette.primary.contrastText,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: theme.palette.background.border,
    borderRadius: "0px 10px 10px 10px",
  },
  tableBody: {
    background: theme.palette.background.default,
  },
  tableHead: {
    backgroundColor: theme.palette.primary.main,
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  tableHeadCell: {
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    borderBottom: `2px solid ${theme.palette.primary.dark}`,
    position: "sticky",
    top: 0,
    backgroundColor: theme.palette.primary.main,
  },
  selectControl: {
    minWidth: 200,
    marginBottom: theme.spacing(2),
  },
  searchField: {
    minWidth: 300,
    marginBottom: theme.spacing(2),
  },
  tabButton: {
    background: "#e0d1e0",
    borderRadius: "15px 15px 0 0",
    borderBottom: "2px solid #713972",
    border: "1px solid #b39db3",
    padding: theme.spacing(1.5, 3),
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "#f0e1f0",
    },
  },
  tabButtonSelected: {
    background: "#fff2ff",
    borderRadius: "14px 15px 0 0",
    border: "1px solid #b39db3",
    borderBottom: "none",
    padding: theme.spacing(1.5, 3),
    cursor: "pointer",
    position: "relative",
    zIndex: 1,
  },
});

const TablaFiscalizacion = (props) => {
  const { classes, tipo } = props;

  const [state, setState] = React.useState({
    anio: "2024",
    page: 0,
    rowsPerPage: 10,
    fuente: "todas", // "todas", "ASF", "Buen Gobierno"
    searchValue: null,
    searchInputValue: "",
  });

  const handleChangeYear = (event) => {
    setState({
      ...state,
      anio: event.target.value,
      page: 0,
    });
  };

  const handleChangeFuente = (event) => {
    setState({
      ...state,
      fuente: event.target.value,
      page: 0,
    });
  };

  const handleChangePage = (event, page) => {
    setState({
      ...state,
      page,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setState({
      ...state,
      rowsPerPage: event.target.value,
      page: 0,
    });
  };

  const handleSearchChange = (event, newValue) => {
    setState({
      ...state,
      searchValue: newValue,
      page: 0,
    });
  };

  const handleSearchInputChange = (event, newInputValue) => {
    setState({
      ...state,
      searchInputValue: newInputValue,
    });
  };

  // Combinar datos de ASF y Buen Gobierno con una marca de origen
  const datosASFMarcados = datosASF.map((item) => ({ ...item, fuente: "ASF" }));
  const datosBuenGobiernoMarcados = datosBuenGobierno.map((item) => ({
    ...item,
    fuente: "Buen Gobierno",
  }));

  // Combinar todos los datos
  let todosDatos = [...datosASFMarcados, ...datosBuenGobiernoMarcados];

  // Filtrar por fuente si no es "todas"
  if (state.fuente !== "todas") {
    todosDatos = todosDatos.filter((item) => item.fuente === state.fuente);
  }

  // Filtrar por año
  let datosFiltrados = todosDatos.filter((item) =>
    item.folio.includes(state.anio)
  );

  // Filtrar por búsqueda si hay un valor seleccionado
  if (state.searchValue) {
    datosFiltrados = datosFiltrados.filter(
      (item) =>
        item.entidad === state.searchValue.entidad ||
        item.programa === state.searchValue.programa
    );
  }

  // Paginación
  const totalRows = datosFiltrados.length;
  const startIndex = state.page * state.rowsPerPage;
  const endIndex = startIndex + state.rowsPerPage;
  const datosPaginados = datosFiltrados.slice(startIndex, endIndex);

  const getTitulo = () => {
    if (tipo === "programa") {
      return "Programa anual de actividades";
    }
    return "Informes públicos de fiscalización";
  };

  const getDescripcion = () => {
    if (tipo === "programa") {
      return [
        "Consulta los programas anuales de actividades de las entidades fiscalizadoras.",
        "Visualiza el detalle de cada programa incluyendo montos, fechas y estatus de ejecución.",
      ];
    }
    return [
      "Consulta los informes públicos de fiscalización generados por las entidades de control.",
      "Accede a información detallada sobre las auditorías y seguimientos realizados.",
    ];
  };

  return (
    <div>
      <Paper className={classes.paper} elevation={15}>
        {/* Información */}
        <Box p={1}>
          <Typography paragraph>
            <b>Aquí puedes consultar:</b>
          </Typography>

          <ul className={classes.ul}>
            {getDescripcion().map((desc, index) => (
              <li key={index} className={classes.li}>
                <Typography color="textPrimary" display="inline">
                  {desc}
                </Typography>
              </li>
            ))}
          </ul>
        </Box>

        {/* Selectores de filtro */}
        {tipo !== "intercambio" && (
          <Box p={1} sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <FormControl className={classes.selectControl}>
              <InputLabel id="year-select-label">Año</InputLabel>
              <Select
                labelId="year-select-label"
                id="year-select"
                value={state.anio}
                label="Año"
                onChange={handleChangeYear}
              >
                <MenuItem value="2024">2024</MenuItem>
                <MenuItem value="2025">2025</MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.selectControl}>
              <InputLabel id="fuente-select-label">Fuente</InputLabel>
              <Select
                labelId="fuente-select-label"
                id="fuente-select"
                value={state.fuente}
                label="Fuente"
                onChange={handleChangeFuente}
              >
                <MenuItem value="todas">Todas las fuentes</MenuItem>
                <MenuItem value="ASF">
                  ASF (Auditoría Superior de la Federación)
                </MenuItem>
                <MenuItem value="Buen Gobierno">Buen Gobierno</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}

        {/* Selector de año solo para intercambio */}
        {tipo === "intercambio" && (
          <Box p={1}>
            <FormControl className={classes.selectControl}>
              <InputLabel id="year-select-label">Año</InputLabel>
              <Select
                labelId="year-select-label"
                id="year-select"
                value={state.anio}
                label="Año"
                onChange={handleChangeYear}
              >
                <MenuItem value="2024">2024</MenuItem>
                <MenuItem value="2025">2025</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}

        {/* Contenido para Intercambio de información */}
        {tipo === "intercambio" ? (
          <Box p={2}>
            <Typography variant="h6" gutterBottom>
              Filtros de búsqueda
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={4}>
                <Autocomplete
                  options={[
                    "Auditoría Superior de la Federación",
                    "Secretaría de la Función Pública",
                    "Instituto Nacional Electoral",
                    "Comisión Nacional de Derechos Humanos",
                  ]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Entidad emisora"
                      variant="outlined"
                      size="small"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Autocomplete
                  options={[
                    "Auditoría Superior de la Federación",
                    "Secretaría de la Función Pública",
                    "Órganos de Control Estatales",
                    "Tribunales de Justicia",
                  ]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Entidad receptora"
                      variant="outlined"
                      size="small"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Autocomplete
                  options={[
                    "Solicitud de información",
                    "Respuesta",
                    "Informe de auditoría",
                    "Notificación",
                    "Seguimiento",
                  ]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tipo de comunicación"
                      variant="outlined"
                      size="small"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  label="Fecha inicio"
                  type="date"
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  label="Fecha fin"
                  type="date"
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Box
                  sx={{ display: "flex", alignItems: "center", height: "100%" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      height: "40px",
                      fontWeight: "bold",
                      background: "#713972",
                      "&:hover": {
                        background: "#5a2c5b",
                      },
                    }}
                  >
                    Buscar
                  </Button>
                </Box>
              </Grid>
            </Grid>

            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ mt: 2, fontStyle: "italic" }}
            >
              * Los filtros son predictivos. Comience a escribir para ver
              sugerencias.
            </Typography>
          </Box>
        ) : (
          // Contenido para programa e informes
          <>
            <Box p={1}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6">
                  {getTitulo()} - Año {state.anio}
                  {state.fuente !== "todas" && ` - ${state.fuente}`}
                </Typography>

                <Autocomplete
                  className={classes.searchField}
                  options={datosFiltrados}
                  getOptionLabel={(option) => option.entidad || ""}
                  value={state.searchValue}
                  onChange={handleSearchChange}
                  inputValue={state.searchInputValue}
                  onInputChange={handleSearchInputChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Buscar por entidad o programa"
                      variant="outlined"
                      size="small"
                    />
                  )}
                  renderOption={(props, option) => (
                    <li {...props}>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {option.entidad}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {option.programa}
                        </Typography>
                      </Box>
                    </li>
                  )}
                  filterOptions={(options, { inputValue }) => {
                    if (!inputValue) return options;
                    return options.filter(
                      (option) =>
                        option.entidad
                          .toLowerCase()
                          .includes(inputValue.toLowerCase()) ||
                        option.programa
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
                    );
                  }}
                />
              </Box>

              <div className={classes.container}>
                <Table
                  aria-labelledby="tableTitle"
                  style={{ tableLayout: "fixed" }}
                >
                  <TableHead className={classes.tableHead}>
                    <TableRow>
                      {/* Encabezados unificados - columnas comunes para ASF y Buen Gobierno */}
                      <TableCell className={classes.tableHeadCell}>
                        Registro / Folio
                      </TableCell>
                      <TableCell className={classes.tableHeadCell}>
                        Fuente
                      </TableCell>
                      <TableCell className={classes.tableHeadCell}>
                        Entidad / Institución
                      </TableCell>
                      <TableCell className={classes.tableHeadCell}>
                        Programa / Actividad
                      </TableCell>
                      <TableCell className={classes.tableHeadCell}>
                        Tipo de Acto de Fiscalización
                      </TableCell>
                      <TableCell className={classes.tableHeadCell}>
                        Origen de los datos
                      </TableCell>
                      <TableCell className={classes.tableHeadCell}>
                        Hipervínculo
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className={classes.tableBody}>
                    {datosPaginados.length > 0 ? (
                      datosPaginados.map((row, index) => (
                        <TableRow hover tabIndex={-1} key={row.id}>
                          <TableCell>{row.folio}</TableCell>
                          <TableCell>
                            <Typography
                              variant="caption"
                              sx={{
                                fontWeight: "bold",
                                color:
                                  row.fuente === "ASF" ? "#1976d2" : "#9c27b0",
                              }}
                            >
                              {row.fuente}
                            </Typography>
                          </TableCell>
                          <TableCell>{row.entidad}</TableCell>
                          <TableCell>{row.programa}</TableCell>
                          <TableCell>
                            {/* Mostrar detalles específicos según la fuente */}
                            {row.fuente === "ASF" ? (
                              <Typography variant="body2">
                                {row.monto && (
                                  <>
                                    <strong>Monto:</strong> {row.monto}
                                  </>
                                )}
                              </Typography>
                            ) : (
                              <Box>
                                {row.area && (
                                  <Typography variant="body2">
                                    <strong>Área:</strong> {row.area}
                                  </Typography>
                                )}
                                {row.responsable && (
                                  <Typography variant="body2">
                                    <strong>Responsable:</strong>{" "}
                                    {row.responsable}
                                  </Typography>
                                )}
                              </Box>
                            )}
                          </TableCell>
                          <TableCell>{row.origenDatos}</TableCell>
                          <TableCell>
                            <Link
                              href={row.hipervinculo}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Ver documento
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          <Typography>
                            No hay datos disponibles para el año {state.anio}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter className={classes.tableBody}>
                    <TableRow>
                      <TablePagination
                        sx={{
                          ".MuiTablePagination-select": {
                            color: "black",
                          },
                        }}
                        className={classes.tablePagination}
                        colSpan={7}
                        count={totalRows}
                        rowsPerPage={state.rowsPerPage}
                        rowsPerPageOptions={[10, 25, 50]}
                        page={state.page}
                        backIconButtonProps={{
                          "aria-label": "Página anterior",
                        }}
                        nextIconButtonProps={{
                          "aria-label": "Página siguiente",
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Registros por página"
                        labelDisplayedRows={({ from, to, count }) => {
                          return `${from}-${to} de ${count}`;
                        }}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </Box>
          </>
        )}
      </Paper>
    </div>
  );
};

export default withStyles(styles)(TablaFiscalizacion);
