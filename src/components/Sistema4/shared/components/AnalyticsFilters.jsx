import React from "react";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  EMPTY_ANALYTICS_FILTERS,
  getAnalyticsFilterOptions,
} from "../services/analyticsUtils";

const AnalyticsFilters = ({ rows, filters, fields, onChange, title }) => {
  const options = React.useMemo(
    () => getAnalyticsFilterOptions(rows, filters, fields),
    [rows, filters, fields]
  );

  const hasFilters = Object.values(filters).some(Boolean);

  const updateFilter = (field, value) => {
    if (field === "year") {
      onChange({
        ...filters,
        year: value,
        entity: "",
        publicBody: "",
      });
      return;
    }

    if (field === "entity") {
      onChange({ ...filters, entity: value, publicBody: "" });
      return;
    }

    onChange({ ...filters, [field]: value });
  };

  return (
    <Box
      component="section"
      aria-label={title || "Filtros del informe gráfico-estadístico"}
      sx={{
        mb: 3,
        p: { xs: 2, md: 2.5 },
        border: "1px solid rgba(113, 57, 114, 0.16)",
        borderRadius: 2,
        backgroundColor: "rgba(113, 57, 114, 0.035)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1,
          mb: 2,
        }}
      >
        <Typography
          component="h3"
          variant="subtitle1"
          sx={{ color: "#713972", fontWeight: 700 }}
        >
          {title || "Filtrar información"}
        </Typography>
        <Button
          onClick={() => onChange({ ...EMPTY_ANALYTICS_FILTERS })}
          disabled={!hasFilters}
          startIcon={<RestartAltIcon />}
          size="small"
          sx={{ color: "#713972", textTransform: "none", fontWeight: 700 }}
        >
          Restablecer filtros
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Buscar"
            value={filters.query}
            onChange={(event) => updateFilter("query", event.target.value)}
            placeholder="Documento, informe o ente público"
            inputProps={{ "aria-label": "Buscar en los registros" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <TextField
            select
            fullWidth
            size="small"
            label="Año"
            value={filters.year}
            onChange={(event) => updateFilter("year", event.target.value)}
          >
            <MenuItem value="">Todos</MenuItem>
            {options.years.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={8} md={3}>
          <TextField
            select
            fullWidth
            size="small"
            label="Entidad federativa"
            value={filters.entity}
            onChange={(event) => updateFilter("entity", event.target.value)}
          >
            <MenuItem value="">Todas</MenuItem>
            {options.entities.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            select
            fullWidth
            size="small"
            label="Ente público"
            value={filters.publicBody}
            onChange={(event) => updateFilter("publicBody", event.target.value)}
          >
            <MenuItem value="">Todos</MenuItem>
            {options.publicBodies.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsFilters;

