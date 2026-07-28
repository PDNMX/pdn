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

const ProgramasDashboard = ({ rows, showTitle = true }) => {
  const [dimension, setDimension] = React.useState("año");
  const acts = React.useMemo(
    () => summarizeNumericField(rows, "totalAuditorias"),
    [rows]
  );
  const amount = React.useMemo(
    () => summarizeNumericField(rows, "totalMontoAuditar"),
    [rows]
  );
  const chartData = React.useMemo(
    () =>
      aggregateAnalyticsRows(rows, dimension, {
        actos: "totalAuditorias",
        monto: "totalMontoAuditar",
      }),
    [rows, dimension]
  );

  const handleDimension = (_event, nextDimension) => {
    if (nextDimension) setDimension(nextDimension);
  };

  return (
    <Box component="section" aria-label="Resumen de programas anuales">
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
              Resumen gráfico de programas anuales
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Auditorías y montos programados en el universo seleccionado.
            </Typography>
          </Box>
        )}
        <ToggleButtonGroup
          value={dimension}
          exclusive
          onChange={handleDimension}
          size="small"
          aria-label="Desglose de programas"
          sx={{ ml: showTitle ? 0 : "auto" }}
        >
          <ToggleButton value="año">Por año</ToggleButton>
          <ToggleButton value="entidadFederativa">Por entidad</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Grid
        container
        spacing={{ xs: 1, sm: 2 }}
        sx={{
          mb: 2,
          "& > .MuiGrid-item": { display: "flex", minWidth: 0 },
        }}
      >
        <Grid item xs={12} sm={4}>
          <AnalyticsMetricCard
            label="Programas anuales"
            value={numberFormatter.format(rows.length)}
            subtitle="Registros en la selección actual"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AnalyticsMetricCard
            label="Auditorías / actos programados"
            value={acts.hasData ? numberFormatter.format(acts.value) : "Sin datos"}
            subtitle={coverageText(acts)}
            accent="#4f8b3d"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AnalyticsMetricCard
            label="Monto total a auditar"
            value={
              amount.hasData
                ? `$${amountFormatter.format(amount.value)}`
                : "Sin datos"
            }
            subtitle={coverageText(amount)}
            accent="#9b5a18"
          />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={{ xs: 1, sm: 2 }}
        sx={{ "& > .MuiGrid-item": { display: "flex", minWidth: 0 } }}
      >
        <Grid item xs={12} lg={6}>
          <AnalyticsBarChart
            title={`Auditorías / actos programados ${
              dimension === "año" ? "por año" : "por entidad"
            }`}
            data={chartData}
            keys={["actos"]}
            labels={{ actos: "Actos programados" }}
            colors={["#5f9d48"]}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AnalyticsBarChart
            title={`Monto a auditar ${
              dimension === "año" ? "por año" : "por entidad"
            }`}
            description="Montos en pesos según la fuente."
            data={chartData}
            keys={["monto"]}
            labels={{ monto: "Monto a auditar" }}
            colors={["#9b5a18"]}
            amount
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProgramasDashboard;
