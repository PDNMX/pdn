import React from "react";
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DatasetOutlinedIcon from "@mui/icons-material/DatasetOutlined";
import { useSistema4Data } from "../context/Sistema4DataContext";
import { buildPilotCoverage } from "../services/analyticsUtils";

const numberFormatter = new Intl.NumberFormat("es-MX");

const percentage = (available, total) =>
  total > 0 ? Math.round((available / total) * 100) : 0;

const Metric = ({ label, value, detail, accent = "#713972" }) => (
  <Box
    sx={{
      width: "100%",
      height: "100%",
      boxSizing: "border-box",
      p: 1.6,
      border: "1px solid rgba(53, 108, 135, 0.16)",
      borderTop: `3px solid ${accent}`,
      borderRadius: 2,
      backgroundColor: "#fff",
    }}
  >
    <Typography
      variant="caption"
      sx={{ display: "block", color: "text.secondary", fontWeight: 700 }}
    >
      {label}
    </Typography>
    <Typography
      component="p"
      sx={{ mt: 0.5, color: accent, fontSize: "1.45rem", fontWeight: 800 }}
    >
      {value}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      {detail}
    </Typography>
  </Box>
);

const AvailabilityCell = ({ programs = 0, reports = 0 }) => {
  if (!programs && !reports) {
    return (
      <Typography variant="caption" color="text.secondary">
        Sin registro
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.45 }}>
      {programs > 0 && (
        <Typography
          variant="caption"
          sx={{ color: "#713972", fontWeight: 700, whiteSpace: "nowrap" }}
        >
          {programs} PAA
        </Typography>
      )}
      {reports > 0 && (
        <Typography
          variant="caption"
          sx={{ color: "#3f7733", fontWeight: 700, whiteSpace: "nowrap" }}
        >
          {reports} {reports === 1 ? "informe" : "informes"}
        </Typography>
      )}
    </Box>
  );
};

const Sistema4PilotCoveragePanel = () => {
  const { auditorias, informes } = useSistema4Data();
  const loading = auditorias.loading || informes.loading;
  const error = auditorias.error || informes.error;
  const coverage = React.useMemo(
    () => buildPilotCoverage(auditorias.rows, informes.rows),
    [auditorias.rows, informes.rows]
  );

  const period = coverage.years.length
    ? `${coverage.years[0]}–${coverage.years[coverage.years.length - 1]}`
    : "Sin datos";

  return (
    <Box sx={{ p: { xs: 1, md: 2.5 }, pt: { xs: 1, md: 1 } }}>
      <Paper
        component="section"
        aria-labelledby="pilot-coverage-title"
        elevation={0}
        sx={{
          p: { xs: 1.75, sm: 2.25 },
          border: "1px solid rgba(53, 108, 135, 0.2)",
          borderRadius: 2.5,
          background:
            "linear-gradient(135deg, rgba(53, 108, 135, 0.06), rgba(255, 255, 255, 0.98) 58%)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.25 }}>
          <Box
            aria-hidden="true"
            sx={{
              display: { xs: "none", sm: "grid" },
              placeItems: "center",
              width: 42,
              height: 42,
              flex: "0 0 auto",
              borderRadius: 2,
              color: "#356c87",
              backgroundColor: "rgba(53, 108, 135, 0.11)",
            }}
          >
            <DatasetOutlinedIcon />
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
                mb: 0.4,
              }}
            >
              <Typography
                id="pilot-coverage-title"
                component="h3"
                variant="h6"
                sx={{ color: "#356c87", fontWeight: 800 }}
              >
                Cobertura actual del prototipo S4
              </Typography>
              <Chip
                label="Datos del prototipo"
                size="small"
                sx={{
                  color: "#356c87",
                  fontWeight: 700,
                  backgroundColor: "rgba(53, 108, 135, 0.1)",
                }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Disponibilidad de registros por entidad federativa y ejercicio.
            </Typography>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress size={30} aria-label="Cargando cobertura" />
          </Box>
        ) : error ? (
          <Alert severity="warning" sx={{ mt: 2 }}>
            No fue posible calcular la cobertura actual del prototipo.
          </Alert>
        ) : (
          <>
            <Grid
              container
              spacing={1.5}
              sx={{
                mt: 0.75,
                "& > .MuiGrid-item": { display: "flex" },
              }}
            >
              <Grid item xs={6} md={3}>
                <Metric
                  label="Entidades con información"
                  value={`${coverage.stateCount} de 32`}
                  detail="Cobertura territorial del piloto"
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <Metric
                  label="Programas anuales"
                  value={numberFormatter.format(coverage.programCount)}
                  detail="Registros PAA disponibles"
                  accent="#713972"
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <Metric
                  label="Informes públicos"
                  value={numberFormatter.format(coverage.reportCount)}
                  detail="Registros de informes disponibles"
                  accent="#4f8b3d"
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <Metric
                  label="Periodo disponible"
                  value={period}
                  detail={`${coverage.years.length} ejercicios con registros`}
                  accent="#9b5a18"
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 2.25 }}>
              <Typography
                component="h4"
                variant="subtitle1"
                sx={{ color: "text.primary", fontWeight: 800 }}
              >
                Disponibilidad por entidad y ejercicio
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Cada celda muestra registros existentes; las cantidades no son
                comparables como resultados de fiscalización.
              </Typography>
            </Box>

            <TableContainer
              sx={{
                mt: 1.25,
                border: "1px solid rgba(53, 108, 135, 0.15)",
                borderRadius: 2,
                backgroundColor: "#fff",
              }}
            >
              <Table size="small" aria-label="Cobertura del prototipo por entidad y ejercicio">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "rgba(53, 108, 135, 0.075)" }}>
                    <TableCell sx={{ minWidth: 170, fontWeight: 800 }}>
                      Entidad federativa
                    </TableCell>
                    {coverage.years.map((year) => (
                      <TableCell
                        key={year}
                        align="center"
                        sx={{ minWidth: 100, fontWeight: 800 }}
                      >
                        {year}
                      </TableCell>
                    ))}
                    <TableCell align="center" sx={{ minWidth: 115, fontWeight: 800 }}>
                      Total
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {coverage.states.map((state) => (
                    <TableRow
                      key={state.key}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" sx={{ fontWeight: 700 }}>
                        {state.state}
                      </TableCell>
                      {coverage.years.map((year) => (
                        <TableCell key={year} align="center">
                          <Box sx={{ display: "inline-flex", textAlign: "left" }}>
                            <AvailabilityCell {...state.byYear[year]} />
                          </Box>
                        </TableCell>
                      ))}
                      <TableCell align="center">
                        <AvailabilityCell
                          programs={state.programs}
                          reports={state.reports}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box
              sx={{
                mt: 1.5,
                p: 1.25,
                borderRadius: 1.5,
                color: "text.secondary",
                backgroundColor: "rgba(53, 108, 135, 0.055)",
              }}
            >
              <Typography variant="caption" sx={{ display: "block" }}>
                Enlaces registrados en la base: PAA{" "}
                <b>
                  {coverage.programsWithLink} de {coverage.programCount} (
                  {percentage(
                    coverage.programsWithLink,
                    coverage.programCount
                  )}
                  %)
                </b>
                ; informes{" "}
                <b>
                  {coverage.reportsWithLink} de {coverage.reportCount} (
                  {percentage(coverage.reportsWithLink, coverage.reportCount)}
                  %)
                </b>
                . La disponibilidad indica que existen registros en el
                prototipo; no constituye una evaluación de cumplimiento de las
                instituciones.
              </Typography>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default Sistema4PilotCoveragePanel;
