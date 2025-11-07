import React, { useState, useMemo } from "react";
import { withStyles } from "@mui/styles";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";

const styles = (theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  sectionTitle: {
    color: "#666",
    marginBottom: theme.spacing(3),
  },
  searchContainer: {
    marginBottom: theme.spacing(3),
  },
  dataGridContainer: {
    height: 600,
    width: "100%",
    "& .MuiDataGrid-root": {
      border: "1px solid rgba(224, 224, 224, 1)",
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#713972 !important",
      color: "#fff !important",
    },
    "& .MuiDataGrid-columnHeader": {
      backgroundColor: "#713972 !important",
      color: "#fff !important",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      fontWeight: "bold !important",
      color: "#fff !important",
    },
    "& .MuiDataGrid-cell": {
      borderBottom: "1px solid rgba(224, 224, 224, 1)",
    },
    "& .MuiDataGrid-row:hover": {
      backgroundColor: "rgba(113, 57, 114, 0.04)",
    },
    "& .MuiDataGrid-footerContainer": {
      borderTop: "2px solid #713972",
    },
    "& .MuiDataGrid-columnHeader .MuiIconButton-root": {
      color: "#fff !important",
    },
    "& .MuiDataGrid-sortIcon": {
      color: "#fff !important",
    },
    "& .MuiDataGrid-menuIconButton": {
      color: "#fff !important",
    },
    "& .MuiDataGrid-iconButtonContainer": {
      visibility: "visible !important",
    },
    "& .MuiDataGrid-menuIcon": {
      visibility: "visible !important",
    },
  },
});

const TablaConsulta = ({ classes }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchTerm) return datosConsulta;

    const lowerSearch = searchTerm.toLowerCase();
    return datosConsulta.filter(
      (item) =>
        item.folio.toLowerCase().includes(lowerSearch) ||
        item.año.toLowerCase().includes(lowerSearch) ||
        item.tipoIntercambio.toLowerCase().includes(lowerSearch) ||
        item.entidadSolicitante.toLowerCase().includes(lowerSearch) ||
        item.entidadReceptora.toLowerCase().includes(lowerSearch) ||
        item.tema.toLowerCase().includes(lowerSearch) ||
        item.estado.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const columns = [
    {
      field: "año",
      headerName: "Año",
      width: 100,
      sortable: true,
    },
    {
      field: "tipoIntercambio",
      headerName: "Tipo de Intercambio",
      width: 200,
      sortable: true,
    },
    {
      field: "entidadSolicitante",
      headerName: "Entidad Solicitante",
      width: 250,
      sortable: true,
    },
    {
      field: "entidadReceptora",
      headerName: "Entidad Receptora",
      width: 250,
      sortable: true,
    },
    {
      field: "tema",
      headerName: "Tema",
      width: 280,
      sortable: true,
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const isCompleted = params.value === "Completado";
        return (
          <Chip
            label={params.value}
            size="small"
            sx={{
              backgroundColor: isCompleted ? "#e8f5e9" : "#fff3e0",
              color: isCompleted ? "#2e7d32" : "#e65100",
              fontWeight: 500,
            }}
          />
        );
      },
    },
  ];

  return (
    <Box className={classes.root}>
      <Typography variant="h6" className={classes.sectionTitle}>
        Intercambio de Información entre los Miembros del Sistema Nacional de
        Fiscalización
      </Typography>

      <Box className={classes.searchContainer}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Buscar por folio, año, tipo, entidad o tema..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box className={classes.dataGridContainer}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 50, 100]}
          disableRowSelectionOnClick
          localeText={{
            noRowsLabel: "No se encontraron resultados",
            noResultsOverlayLabel: "No se encontraron resultados.",
            errorOverlayDefaultLabel: "Ha ocurrido un error.",
            footerRowSelected: (count) =>
              count !== 1
                ? `${count.toLocaleString()} filas seleccionadas`
                : `${count.toLocaleString()} fila seleccionada`,
            footerTotalRows: "Filas totales:",
            footerTotalVisibleRows: (visibleCount, totalCount) =>
              `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,
            MuiTablePagination: {
              labelRowsPerPage: "Filas por página:",
              labelDisplayedRows: ({ from, to, count }) =>
                `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default withStyles(styles)(TablaConsulta);
