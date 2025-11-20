import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  TextField,
  Typography,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { withStyles } from "@mui/styles";
import { dataGridLocaleText } from "../../styles/datagridLocaleText";
import { dataGridStyles } from "../../styles/dataGridStyles";
import { dataGridSx } from "../../styles/dataGridSx";

const DataGridBase = ({
  classes,
  title,
  descriptionItems,
  data,
  enableSearch = true,
  searchableFields,
  children, // Nueva prop para contenido personalizado
}) => {
  // Si se pasan children, no necesitamos data
  const { rows = [], columns = [], loading = false, error = null } = data || {};
  const [searchTerm, setSearchTerm] = React.useState("");

  // Lógica de filtrado reutilizable (solo si no hay children)
  const filteredRows = React.useMemo(() => {
    if (children || !enableSearch || !searchTerm) return rows;
    const lowerSearch = searchTerm.toLowerCase();

    return rows.filter((row) =>
      (searchableFields || Object.keys(row)).some((key) => {
        const value = row[key];
        return (
          typeof value === "string" && value.toLowerCase().includes(lowerSearch)
        );
      })
    );
  }, [searchTerm, rows, enableSearch, searchableFields, children]);

  if (loading && !children) {
    return (
      <Box
        className={classes.dataGridContainer}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={400}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <Box p={1}>
        {title && (
          <Typography
            variant="h6"
            className={classes.sectionTitle}
            gutterBottom
          >
            <b>{title}</b>
          </Typography>
        )}
        {descriptionItems && (
          <ul className={classes.ul}>
            {descriptionItems.map((text, idx) => (
              <li key={idx} className={classes.li}>
                <Typography color="textPrimary" display="inline">
                  {text}
                </Typography>
              </li>
            ))}
          </ul>
        )}
      </Box>

      {/* Solo mostrar búsqueda si no hay children y está habilitada */}
      {!children && enableSearch && (
        <Box sx={{ marginBottom: 2, position: "relative", top: -20 }}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="search-field"
              label="Buscar"
              variant="standard"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>
        </Box>
      )}

      {error && !children && (
        <Box className={classes.errorContainer}>
          <Typography color="error">
            <b>Error al cargar los datos:</b> {error}
          </Typography>
        </Box>
      )}

      <Box className={classes.dataGridContainer}>
        {children ? (
          // Renderizar contenido personalizado si se pasa children
          children
        ) : (
          // Renderizar DataGrid por defecto
          <DataGrid
            rows={filteredRows}
            columns={columns}
            loading={loading}
            localeText={dataGridLocaleText}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 10 } },
            }}
            pageSizeOptions={[10, 25, 50, 100]}
            disableRowSelectionOnClick
            filterMode="client"
            sx={dataGridSx}
          />
        )}
      </Box>
    </Box>
  );
};

export default withStyles(dataGridStyles)(DataGridBase);
