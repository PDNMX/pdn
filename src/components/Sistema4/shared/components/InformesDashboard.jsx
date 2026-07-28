import React from "react";
import {
  Box,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import AnalyticsMetricCard from "./AnalyticsMetricCard";
import AnalyticsBarChart from "./AnalyticsBarChart";
import {
  aggregateAnalyticsRows,
  summarizeNumericField,
} from "../services/analyticsUtils";

const numberFormatter = new Intl.NumberFormat("es-MX", {
  maximumFractionDigits: 2,
});

const amountFormatter = new Intl.NumberFormat("es-MX", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const coverageText = (summary) =>
  `${summary.valid} de ${summary.total} registros con dato disponible`;

const metricValue = (summary, amount = false) => {
  if (!summary.hasData) return "Sin datos";
  return amount
    ? `$${amountFormatter.format(summary.value)}`
    : numberFormatter.format(summary.value);
};

const InformesDashboard = ({ rows, showTitle = true }) => {
  const [dimension, setDimension] = React.useState("año");
  const metrics = React.useMemo(
    () => ({
      performed: summarizeNumericField(rows, "actosRealizados"),
      pending: summarizeNumericField(rows, "actosPendientes"),
      audited: summarizeNumericField(rows, "montoTotalAuditado"),
      clarify: summarizeNumericField(rows, "montoPorAclarar"),
      recover: summarizeNumericField(rows, "montoPorRecuperar"),
    }),
    [rows]
  );
  const chartData = React.useMemo(
    () =>
      aggregateAnalyticsRows(rows, dimension, {
        realizados: "actosRealizados",
        pendientes: "actosPendientes",
        auditado: "montoTotalAuditado",
        aclarar: "montoPorAclarar",
        recuperar: "montoPorRecuperar",
      }),
    [rows, dimension]
  );

  const handleDimension = (_event, nextDimension) => {
    if (nextDimension) setDimension(nextDimension);
  };

  return (
    <Box component="section" aria-label="Resumen de informes públicos">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: 1.5,
          mb: 2,
        }}
      >
        {showTitle && (
          <Box>
            <Typography
              component="h3"
              variant="h6"
              sx={{ color: "#713972", fontWeight: 800 }}
            >
              Resumen gráfico de informes públicos
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Resultados y montos reportados en el universo seleccionado.
            </Typography>
          </Box>
        )}
        <ToggleButtonGroup
          value={dimension}
          exclusive
          onChange={handleDimension}
          size="small"
          aria-label="Desglose de informes"
          sx={{ ml: showTitle ? 0 : "auto" }}
        >
          <ToggleButton value="año">Por año</ToggleButton>
          <ToggleButton value="entidadFederativa">Por entidad</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <AnalyticsMetricCard
            label="Informes públicos"
            value={numberFormatter.format(rows.length)}
            subtitle="Registros en la selección actual"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AnalyticsMetricCard
            label="Auditorías / actos realizados"
            value={metricValue(metrics.performed)}
            subtitle={coverageText(metrics.performed)}
            accent="#4f8b3d"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AnalyticsMetricCard
            label="Auditorías / actos pendientes"
            value={metricValue(metrics.pending)}
            subtitle={coverageText(metrics.pending)}
            accent="#9b5a18"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AnalyticsMetricCard
            label="Monto total auditado"
            value={metricValue(metrics.audited, true)}
            subtitle={coverageText(metrics.audited)}
            accent="#5a4a9c"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AnalyticsMetricCard
            label="Monto por aclarar"
            value={metricValue(metrics.clarify, true)}
            subtitle={coverageText(metrics.clarify)}
            accent="#b06b18"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AnalyticsMetricCard
            label="Monto por recuperar"
            value={metricValue(metrics.recover, true)}
            subtitle={coverageText(metrics.recover)}
            accent="#a13f4f"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <AnalyticsBarChart
            title={`Resultados de fiscalización ${
              dimension === "año" ? "por año" : "por entidad"
            }`}
            data={chartData}
            keys={["realizados", "pendientes"]}
            labels={{
              realizados: "Actos realizados",
              pendientes: "Actos pendientes",
            }}
            colors={["#5f9d48", "#d88a28"]}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AnalyticsBarChart
            title={`Montos reportados ${
              dimension === "año" ? "por año" : "por entidad"
            }`}
            description="Montos en pesos según la fuente."
            data={chartData}
            keys={["auditado", "aclarar", "recuperar"]}
            labels={{
              auditado: "Total auditado",
              aclarar: "Por aclarar",
              recuperar: "Por recuperar",
            }}
            colors={["#6554a5", "#d88a28", "#b34a5b"]}
            amount
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default InformesDashboard;

