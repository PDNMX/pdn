import React, { useState, useMemo } from "react";
import { withStyles } from "@mui/styles";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from '@mui/x-data-grid';

// Datos en memoria con campo folio para búsqueda
const datosAuditorias = [
  {
    id: 1,
    folio: "REG-2025-001",
    año: "2025",
    nombreDocumento: "Plan Anual de Fiscalización 2025",
    entePublico: "Secretaría Anticorrupción y Buen Gobierno",
    hipervinculo: "https://archivos.buengobierno.gob.mx/paf/paf2025.pdf",
  },
  {
    id: 2,
    folio: "REG-2024-001",
    año: "2024",
    nombreDocumento: "Plan Anual de Fiscalización 2024",
    entePublico: "Secretaría de la Función Pública",
    hipervinculo:
      "https://www.gob.mx/cms/uploads/attachment/file/901822/PAF_Inicial_2024.pdf",
  },
  {
    id: 3,
    folio: "REG-2024-002",
    año: "2024",
    nombreDocumento: "Modificación al Plan Anual de Fiscalización 2024",
    entePublico: "Secretaría de la Función Pública",
    hipervinculo:
      "https://www.gob.mx/cms/uploads/attachment/file/914672/PAF_modificado_2024.pdf",
  },
  {
    id: 4,
    folio: "REG-2024-003",
    año: "2024",
    nombreDocumento: "Modificación al Plan Anual de Fiscalización 2024 (Junio)",
    entePublico: "Secretaría de la Función Pública",
    hipervinculo:
      "https://www.gob.mx/cms/uploads/attachment/file/937692/PAF_modificado_2024_junio.pdf",
  },
  {
    id: 5,
    folio: "REG-2024-004",
    año: "2024",
    nombreDocumento:
      "Modificación al Plan Anual de Fiscalización 2024 (Septiembre)",
    entePublico: "Secretaría de la Función Pública",
    hipervinculo:
      "https://www.gob.mx/cms/uploads/attachment/file/947718/PAF_modificado_2024_septiembre.pdf",
  },
  {
    id: 6,
    folio: "REG-2024-005",
    año: "2024",
    nombreDocumento: "Plan Anual de Fiscalización 2024 (Definitivo)",
    entePublico: "Secretaría de la Función Pública",
    hipervinculo:
      "https://www.gob.mx/cms/uploads/attachment/file/986793/PAF_2024_definitivo.pdf",
  },
];

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
      opacity: "1 !important",
      padding: "2px !important",
      margin: "0 4px !important",
    },
    "& .MuiDataGrid-iconButtonContainer": {
      visibility: "visible !important",
      width: "auto !important",
      marginLeft: "4px !important",
    },
    "& .MuiDataGrid-menuIcon": {
      visibility: "visible !important",
      opacity: "1 !important",
      fontSize: "20px !important",
    },
    "& .MuiDataGrid-columnHeader:hover .MuiDataGrid-menuIcon": {
      opacity: "1 !important",
    },
    "& .MuiDataGrid-columnHeader .MuiDataGrid-menuIcon": {
      opacity: "1 !important",
    },
    "& .MuiDataGrid-columnHeader .MuiIconButton-root": {
      color: "#fff !important",
      padding: "4px !important",
    },
    "& .MuiDataGrid-columnHeader .MuiIconButton-root svg": {
      fontSize: "1.25rem !important",
      color: "#fff !important",
    },
  },
  link: {
    color: "#713972",
    fontWeight: "bold",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

const TablaAuditorias = ({ classes }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchTerm) return datosAuditorias;

    const lowerSearch = searchTerm.toLowerCase();
    return datosAuditorias.filter(
      (item) =>
        item.folio.toLowerCase().includes(lowerSearch) ||
        item.año.toLowerCase().includes(lowerSearch) ||
        item.nombreDocumento.toLowerCase().includes(lowerSearch) ||
        item.entePublico.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const columns = [
    {
      field: "año",
      headerName: "Año",
      flex: 0.5,
      minWidth: 100,
      sortable: true,
    },
    {
      field: "entePublico",
      headerName: "Ente Público",
      flex: 1.5,
      minWidth: 250,
      sortable: true,
    },
    {
      field: "nombreDocumento",
      headerName: "Nombre de Documento",
      flex: 2,
      minWidth: 300,
      sortable: true,
    },
    {
      field: "hipervinculo",
      headerName: "Hipervínculo / Enlace",
      flex: 1,
      minWidth: 180,
      sortable: false,
      renderCell: (params) => (
        <a
          href={params.value}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          Ver documento
        </a>
      ),
    },
  ];

  return (
    <Box className={classes.root}>
      <Typography variant="h6" className={classes.sectionTitle}>
        Programas Anuales de Auditorías (Fiscalización)
      </Typography>

      <Box className={classes.searchContainer}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Buscar por folio, año, ente público o nombre de documento..."
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
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          pageSizeOptions={[20, 50, 100]}
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

export default withStyles(styles)(TablaAuditorias);
