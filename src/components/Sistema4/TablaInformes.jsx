import React, { useState, useMemo } from "react";
import { withStyles } from "@mui/styles";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import { useSistema4Data } from "./utils/Sistema4DataContext";
import { dataGridStyles, dataGridLocaleText } from "./styles/dataGridStyles";
import DescargaSistema4 from "./DescargaSistema4";

const TablaInformes = ({ classes }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { informes } = useSistema4Data();
  const { rows, loading, error } = informes;

  const filteredData = useMemo(() => {
    if (!searchTerm) return rows;

    const lowerSearch = searchTerm.toLowerCase();
    return rows.filter(
      (item) =>
        (item.folio && item.folio.toLowerCase().includes(lowerSearch)) ||
        (item.año && item.año.toLowerCase().includes(lowerSearch)) ||
        (item.nombreInforme &&
          item.nombreInforme.toLowerCase().includes(lowerSearch)) ||
        (item.entePublico &&
          item.entePublico.toLowerCase().includes(lowerSearch))
    );
  }, [searchTerm, rows]);

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

  if (loading) {
    return (
      <Box
        className={classes.root}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={400}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className={classes.root}>
        <Alert severity="error">Error al cargar los datos: {error}</Alert>
      </Box>
    );
  }

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
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 50, 100]}
          disableRowSelectionOnClick
          localeText={dataGridLocaleText}
        />
      </Box>

      <DescargaSistema4 fileName="informes" data={rows} />
    </Box>
  );
};

export default withStyles(dataGridStyles)(TablaInformes);
