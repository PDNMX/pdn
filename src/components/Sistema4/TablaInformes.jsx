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
const datosInformes = [
  {
    id: 1,
    folio: "INF-2024-001",
    año: "2024",
    nombreInforme: "Informe de Resultados de la Fiscalización 2024",
    entePublico: "Secretaría Anticorrupción y Buen Gobierno",
    hipervinculo:
      "https://www.gob.mx/cms/uploads/attachment/file/979463/INFORME_DE_FISCALIZACIO_N_19_02_2025_MASTER__VF_.pdf",
  },
  {
    id: 2,
    folio: "INF-2023-001",
    año: "2023",
    nombreInforme: "Informe de Fiscalización de la Función Pública 2023",
    entePublico: "Secretaría de la Función Pública",
    hipervinculo:
      "https://www.gob.mx/cms/uploads/attachment/file/934812/Informe_de_Fiscalizaci_n_de_la_Secretar_a_de_la_Funci_n_P_blica_2023.pdf",
  },
  {
    id: 3,
    folio: "INF-2024-002",
    año: "2024",
    nombreInforme:
      "Informe de Resultados de la Fiscalización Superior de la Cuenta Pública",
    entePublico: "Auditoría Superior de la Federación",
    hipervinculo:
      "https://informe.asf.gob.mx/Documentos/Matriz/MDB_Consolidado.pdf",
  },
  {
    id: 4,
    folio: "INF-2024-003",
    año: "2024",
    nombreInforme:
      "Informe de Resultados de la Fiscalización Superior de la Cuenta Pública",
    entePublico: "Auditoría Superior de la Federación",
    hipervinculo:
      "https://informe.asf.gob.mx/Documentos/Matriz/IR2024_Entrega_a.pdf",
  },
  {
    id: 5,
    folio: "INF-2024-004",
    año: "2024",
    nombreInforme:
      "Informe de Resultados de la Fiscalización Superior del Gasto Federalizado",
    entePublico: "Auditoría Superior de la Federación",
    hipervinculo: "https://www.asf.gob.mx/uploads/6991_AEGF/SEPARATA_AEGF.pdf",
  },
  {
    id: 6,
    folio: "INF-2023-002",
    año: "2023",
    nombreInforme:
      "Informe de Resultados de la Fiscalización Superior de la Cuenta Pública",
    entePublico: "Auditoría Superior de la Federación",
    hipervinculo:
      "https://www.asf.gob.mx/Trans/Informes/IR2023b/Documentos/Matriz/MDB_Consolidado.pdf",
  },
  {
    id: 7,
    folio: "INF-2023-003",
    año: "2023",
    nombreInforme:
      "Informe de Resultados de la Fiscalización Superior de la Cuenta Pública",
    entePublico: "Auditoría Superior de la Federación",
    hipervinculo:
      "https://www.asf.gob.mx/Trans/Informes/IR2023b/Documentos/Matriz/IR2023_Entrega_a.pdf",
  },
  {
    id: 8,
    folio: "INF-2022-001",
    año: "2022",
    nombreInforme:
      "Informe de Resultados de la Fiscalización Superior de la Cuenta Pública",
    entePublico: "Auditoría Superior de la Federación",
    hipervinculo:
      "https://www.asf.gob.mx/Trans/Informes/IR2022c/Documentos/Matriz/MDB_Consolidado.pdf",
  },
  {
    id: 9,
    folio: "INF-2022-002",
    año: "2022",
    nombreInforme: "Informe General Ejecutivo Cuenta Pública",
    entePublico: "Auditoría Superior de la Federación",
    hipervinculo:
      "https://www.asf.gob.mx/uploads/55_Informes_de_auditoria/2022_IGE_a.pdf",
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

const TablaInformes = ({ classes }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchTerm) return datosInformes;

    const lowerSearch = searchTerm.toLowerCase();
    return datosInformes.filter(
      (item) =>
        item.folio.toLowerCase().includes(lowerSearch) ||
        item.año.toLowerCase().includes(lowerSearch) ||
        item.nombreInforme.toLowerCase().includes(lowerSearch) ||
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
      field: "nombreInforme",
      headerName: "Nombre de Informe",
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
          Ver informe
        </a>
      ),
    },
  ];

  return (
    <Box className={classes.root}>
      <Typography variant="h6" className={classes.sectionTitle}>
        Informes Públicos de Fiscalización
      </Typography>

      <Box className={classes.searchContainer}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Buscar por registro, año, ente público o nombre de informe..."
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

export default withStyles(styles)(TablaInformes);
