import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, TextField, Typography, CircularProgress, InputAdornment} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { withStyles } from "@mui/styles";
import { dataGridLocaleText } from "../../styles/datagridLocaleText";
import { dataGridStyles } from "../../styles/dataGridStyles";
import { dataGridSx } from "../../styles/dataGridSx";

const DataGridBase = ({ classes, title, descriptionItems, data,  enableSearch = true, searchPlaceholder = "Buscar...", searchableFields, }) => {

  const { rows, columns, loading, error } = data;
  const [searchTerm, setSearchTerm] = React.useState("");

   // 🔍 Lógica de filtrado reutilizable
  const filteredRows = React.useMemo(() => {
    if (!enableSearch || !searchTerm) return rows;
    const lowerSearch = searchTerm.toLowerCase();

    return rows.filter((row) =>
      (searchableFields || Object.keys(row)).some((key) => {
        const value = row[key];
        return (
          typeof value === "string" &&
          value.toLowerCase().includes(lowerSearch)
        );
      })
    );
  }, [searchTerm, rows, enableSearch, searchableFields]);

  if(loading){
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
          <Typography variant="h6" className={classes.sectionTitle} gutterBottom>
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

      {enableSearch && (
        <Box className={classes.searchContainer} mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}

      {error && (
        <Box className={classes.errorContainer}>
          <Typography color="error">
            <b>Error al cargar los datos:</b> {error}
          </Typography>
        </Box>
      )}

      <Box className={classes.dataGridContainer}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          loading={loading}
          localeText={dataGridLocaleText}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 25 } },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
          disableRowSelectionOnClick
          filterMode="client"
          sx={dataGridSx}
        />
      </Box>
    </Box>
  );
};

export default withStyles(dataGridStyles)(DataGridBase);
