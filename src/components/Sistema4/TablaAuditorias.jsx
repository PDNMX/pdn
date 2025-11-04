import React from "react";
import withStyles from "@mui/styles/withStyles";
import { Box, Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import datosAuditorias from "./datosAuditorias.json";

const styles = (theme) => ({
  root: {},
  paper: {
    backgroundColor: theme.palette.background.opaque,
    padding: theme.spacing(2),
    color: theme.palette.primary.contrastText,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: theme.palette.background.border,
    borderRadius: "0px 10px 10px 10px",
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
  dataGridContainer: {
    height: 600,
    width: "100%",
    marginTop: theme.spacing(2),
    "& .MuiDataGrid-root": {
      border: `1px solid ${theme.palette.background.border}`,
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      fontWeight: "bold",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      fontWeight: "bold",
    },
    "& .MuiDataGrid-cell": {
      borderBottom: `1px solid ${theme.palette.background.border}`,
    },
    "& .MuiDataGrid-row:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "& .MuiDataGrid-footerContainer": {
      borderTop: `2px solid ${theme.palette.primary.main}`,
    },
  },
});

const TablaAuditorias = (props) => {
  const { classes } = props;

  const columns = [
    {
      field: "folio",
      headerName: "Folio",
      width: 150,
      filterable: true,
    },
    {
      field: "año",
      headerName: "Año",
      width: 100,
      filterable: true,
    },
    {
      field: "entidad",
      headerName: "Entidad",
      width: 250,
      filterable: true,
    },
    {
      field: "programa",
      headerName: "Programa",
      width: 300,
      filterable: true,
    },
    {
      field: "area",
      headerName: "Área",
      width: 250,
      filterable: true,
    },
    {
      field: "responsable",
      headerName: "Responsable",
      width: 150,
      filterable: true,
    },
    {
      field: "origenDatos",
      headerName: "Origen de Datos",
      width: 250,
      filterable: true,
    },
    {
      field: "hipervinculo",
      headerName: "Documento",
      width: 150,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <a
          href={params.value}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#713972", fontWeight: "bold" }}
        >
          Ver documento
        </a>
      ),
    },
  ];

  return (
    <div>
      <Paper className={classes.paper} elevation={15}>
        {/* Información */}
        <Box p={1}>
          <Typography paragraph>
            <b>Aquí puedes consultar:</b>
          </Typography>

          <ul className={classes.ul}>
            <li className={classes.li}>
              <Typography color="textPrimary" display="inline">
                Programas anuales de auditorías de las entidades fiscalizadoras.
              </Typography>
            </li>
            <li className={classes.li}>
              <Typography color="textPrimary" display="inline">
                Detalle de cada programa incluyendo áreas responsables y fechas
                de ejecución.
              </Typography>
            </li>
            <li className={classes.li}>
              <Typography color="textPrimary" display="inline">
                Utiliza los filtros en cada columna para buscar información
                específica.
              </Typography>
            </li>
          </ul>
        </Box>

        {/* DataGrid */}
        <Box className={classes.dataGridContainer}>
          <DataGrid
            rows={datosAuditorias}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 25, 50, 100]}
            disableRowSelectionOnClick
            filterMode="client"
            localeText={{
              noRowsLabel: "No hay filas",
              noResultsOverlayLabel: "No se encontraron resultados.",
              errorOverlayDefaultLabel: "Ha ocurrido un error.",
              toolbarDensity: "Densidad",
              toolbarDensityLabel: "Densidad",
              toolbarDensityCompact: "Compacta",
              toolbarDensityStandard: "Estándar",
              toolbarDensityComfortable: "Cómoda",
              toolbarColumns: "Columnas",
              toolbarColumnsLabel: "Seleccionar columnas",
              toolbarFilters: "Filtros",
              toolbarFiltersLabel: "Mostrar filtros",
              toolbarFiltersTooltipHide: "Ocultar filtros",
              toolbarFiltersTooltipShow: "Mostrar filtros",
              toolbarFiltersTooltipActive: (count) =>
                count !== 1
                  ? `${count} filtros activos`
                  : `${count} filtro activo`,
              toolbarExport: "Exportar",
              toolbarExportLabel: "Exportar",
              toolbarExportCSV: "Descargar como CSV",
              toolbarExportPrint: "Imprimir",
              columnsPanelTextFieldLabel: "Buscar columna",
              columnsPanelTextFieldPlaceholder: "Título de columna",
              columnsPanelDragIconLabel: "Reordenar columna",
              columnsPanelShowAllButton: "Mostrar todas",
              columnsPanelHideAllButton: "Ocultar todas",
              filterPanelAddFilter: "Agregar filtro",
              filterPanelDeleteIconLabel: "Borrar",
              filterPanelOperators: "Operadores",
              filterPanelOperatorAnd: "Y",
              filterPanelOperatorOr: "O",
              filterPanelColumns: "Columnas",
              filterPanelInputLabel: "Valor",
              filterPanelInputPlaceholder: "Valor de filtro",
              filterOperatorContains: "contiene",
              filterOperatorEquals: "es igual a",
              filterOperatorStartsWith: "comienza con",
              filterOperatorEndsWith: "termina con",
              filterOperatorIs: "es",
              filterOperatorNot: "no es",
              filterOperatorAfter: "después de",
              filterOperatorOnOrAfter: "en o después de",
              filterOperatorBefore: "antes de",
              filterOperatorOnOrBefore: "en o antes de",
              filterOperatorIsEmpty: "está vacío",
              filterOperatorIsNotEmpty: "no está vacío",
              columnMenuLabel: "Menú",
              columnMenuShowColumns: "Mostrar columnas",
              columnMenuFilter: "Filtrar",
              columnMenuHideColumn: "Ocultar",
              columnMenuUnsort: "Desordenar",
              columnMenuSortAsc: "Ordenar ascendente",
              columnMenuSortDesc: "Ordenar descendente",
              columnHeaderFiltersTooltipActive: (count) =>
                count !== 1
                  ? `${count} filtros activos`
                  : `${count} filtro activo`,
              columnHeaderFiltersLabel: "Mostrar filtros",
              columnHeaderSortIconLabel: "Ordenar",
              footerRowSelected: (count) =>
                count !== 1
                  ? `${count.toLocaleString()} filas seleccionadas`
                  : `${count.toLocaleString()} fila seleccionada`,
              footerTotalRows: "Filas totales:",
              footerTotalVisibleRows: (visibleCount, totalCount) =>
                `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,
              checkboxSelectionHeaderName: "Selección",
              booleanCellTrueLabel: "sí",
              booleanCellFalseLabel: "no",
              actionsCellMore: "más",
              pinToLeft: "Anclar a la izquierda",
              pinToRight: "Anclar a la derecha",
              unpin: "Desanclar",
              MuiTablePagination: {
                labelRowsPerPage: "Filas por página:",
                labelDisplayedRows: ({ from, to, count }) =>
                  `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`,
              },
            }}
            sx={{
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#713972",
                color: "white",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold",
              },
              // Hacer siempre visible el botón de menú (3 puntos)
              "& .MuiDataGrid-menuIcon": {
                color: "white !important",
                visibility: "visible !important",
                opacity: "1 !important",
              },
              "& .MuiDataGrid-iconButtonContainer": {
                visibility: "visible !important",
                width: "auto !important",
              },
              "& .MuiDataGrid-columnHeader .MuiIconButton-root": {
                color: "white !important",
                visibility: "visible !important",
                opacity: "1 !important",
              },
              // Iconos de ordenamiento
              "& .MuiDataGrid-sortIcon": {
                color: "white !important",
                opacity: "1 !important",
              },
              // Iconos de filtro
              "& .MuiDataGrid-filterIcon": {
                color: "white !important",
              },
              // Forzar visibilidad del contenedor de iconos
              "& .MuiDataGrid-columnHeader--filledGroup .MuiDataGrid-iconButtonContainer": {
                visibility: "visible !important",
              },
            }}
          />
        </Box>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(TablaAuditorias);
