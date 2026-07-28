import React from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { useSistema4Data } from "../../shared/context/Sistema4DataContext";
import AnalyticsFilters from "../../shared/components/AnalyticsFilters";
import ProgramasDashboard from "../../shared/components/ProgramasDashboard";
import InformesDashboard from "../../shared/components/InformesDashboard";
import {
  CONSOLIDATED_FILTER_FIELDS,
  EMPTY_ANALYTICS_FILTERS,
  PROGRAM_FILTER_FIELDS,
  REPORT_FILTER_FIELDS,
  combineRowsForFilters,
  filterAnalyticsRows,
} from "../../shared/services/analyticsUtils";

const InformeGrafico = () => {
  const { auditorias, informes } = useSistema4Data();
  const [filters, setFilters] = React.useState({
    ...EMPTY_ANALYTICS_FILTERS,
  });

  const filterRows = React.useMemo(
    () =>
      combineRowsForFilters([
        { rows: auditorias.rows, fields: PROGRAM_FILTER_FIELDS },
        { rows: informes.rows, fields: REPORT_FILTER_FIELDS },
      ]),
    [auditorias.rows, informes.rows]
  );

  const filteredPrograms = React.useMemo(
    () =>
      filterAnalyticsRows(
        auditorias.rows,
        filters,
        PROGRAM_FILTER_FIELDS
      ),
    [auditorias.rows, filters]
  );
  const filteredReports = React.useMemo(
    () => filterAnalyticsRows(informes.rows, filters, REPORT_FILTER_FIELDS),
    [informes.rows, filters]
  );

  if (auditorias.loading || informes.loading) {
    return (
      <Box
        role="status"
        sx={{
          minHeight: 420,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
        }}
      >
        <CircularProgress />
        <Typography color="text.secondary">
          Cargando información estadística…
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ mb: 3 }}>
        <Typography
          component="h2"
          variant="h5"
          sx={{ color: "#713972", fontWeight: 800, mb: 1 }}
        >
          Informe gráfico-estadístico
        </Typography>
        <Typography color="text.secondary">
          Panorama conjunto de los programas anuales y los informes públicos de
          fiscalización. Las secciones se presentan de forma comparable, sin
          inferir una relación de cumplimiento entre ambas fuentes.
        </Typography>
      </Box>

      {(auditorias.error || informes.error) && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          Parte de la información no pudo cargarse.
          {auditorias.error ? ` Programas: ${auditorias.error}.` : ""}
          {informes.error ? ` Informes: ${informes.error}.` : ""}
        </Alert>
      )}

      <AnalyticsFilters
        rows={filterRows}
        filters={filters}
        fields={CONSOLIDATED_FILTER_FIELDS}
        onChange={setFilters}
        title="Filtrar el panorama consolidado"
      />

      <Box
        sx={{
          p: { xs: 1.5, md: 2.5 },
          borderRadius: 2,
          backgroundColor: "rgba(95, 157, 72, 0.055)",
        }}
      >
        <ProgramasDashboard rows={filteredPrograms} />
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box
        sx={{
          p: { xs: 1.5, md: 2.5 },
          borderRadius: 2,
          backgroundColor: "rgba(113, 57, 114, 0.035)",
        }}
      >
        <InformesDashboard rows={filteredReports} />
      </Box>
    </Box>
  );
};

export default InformeGrafico;

