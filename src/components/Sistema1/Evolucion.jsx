import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Stack,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BusinessIcon from "@mui/icons-material/Business";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PublicIcon from "@mui/icons-material/Public";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import makeStyles from "@mui/styles/makeStyles";

import style from "../style";
import StatCard from "./evolucion/components/StatCard";
import RiskCard from "./evolucion/components/RiskCard";

const useBaseStyles = makeStyles(style);
const API_BASE_URL = (process.env.REACT_APP_S1_EVOLUCION_BACKEND || "http://localhost:3003").replace(/\/$/, "");
const AXES = ["datos_personales", "flujo_financiero", "congruencia_patrimonial", "conflicto_interes"];
const AXIS_LABELS = {
  datos_personales: "Congruencia en datos personales",
  flujo_financiero: "Congruencia en flujos financieros",
  congruencia_patrimonial: "Congruencia patrimonial",
  conflicto_interes: "Conflicto de interes",
  riesgo_global: "Riesgo global",
};
const RISK_LABELS = {
  datos_personales: "Indice de congruencia en datos personales",
  flujo_financiero: "Indice de congruencia en flujos financieros",
  congruencia_patrimonial: "Indice de congruencia patrimonial",
  conflicto_interes: "Indice de conflicto de interes",
};
const STATUS_SX = {
  better: { icon: <CheckCircleOutlineIcon fontSize="small" />, backgroundColor: "#d4edda", color: "#155724", border: "1px solid #c3e6cb" },
  equal: { icon: <InfoOutlinedIcon fontSize="small" />, backgroundColor: "#e2e3e5", color: "#383d41", border: "1px solid #d6d8db" },
  worse: { icon: <WarningAmberOutlinedIcon fontSize="small" />, backgroundColor: "#fff3cd", color: "#856404", border: "1px solid #ffeeba" },
};
const PANEL_SX = { p: { xs: 2, md: 3 }, border: "1px solid", borderColor: "background.border", borderRadius: 3, backgroundColor: "background.paper" };

function getStats(data) {
  return data?.totales ? { total: data.totales.totalDeclaraciones || 0, complete: data.totales.completas || 0, simplified: data.totales.noCompletas || 0 } : { total: 0, complete: 0, simplified: 0 };
}

function axisPct(axisData) {
  if (!axisData) return 0;
  let ok = 0;
  let fail = 0;
  Object.keys(axisData).forEach((metricId) => {
    const value = axisData[metricId] || {};
    ok += value.CUMPLE || 0;
    fail += value.NO_CUMPLE || 0;
  });
  const total = ok + fail;
  return total ? Number(((ok / total) * 100).toFixed(1)) : 0;
}

function buildRiskCards(metricasPorEje = {}, tipo = "completas") {
  const group = metricasPorEje?.[tipo] || {};
  return AXES.map((axis) => {
    const metrics = group[axis] || {};
    let fail = 0;
    let total = 0;
    Object.keys(metrics).forEach((metricId) => {
      const value = metrics[metricId] || {};
      fail += value.NO_CUMPLE || 0;
      total += (value.CUMPLE || 0) + (value.NO_CUMPLE || 0);
    });
    const percentage = total ? Number(((fail / total) * 100).toFixed(1)) : 0;
    const riskLevel = percentage === 0 ? "none" : percentage < 10 ? "low" : percentage < 30 ? "medium" : "high";
    return { title: RISK_LABELS[axis], count: fail, percentage, riskLevel };
  });
}

function getMetricCounts(metricasPorEje = {}, tipo = "completas") {
  const group = metricasPorEje?.[tipo] || {};
  let evaluadas = 0;
  let noHomologadas = 0;
  let sinDato = 0;
  Object.keys(group).forEach((axis) => {
    Object.keys(group[axis] || {}).forEach((metricId) => {
      const value = group[axis][metricId] || {};
      evaluadas += (value.CUMPLE || 0) + (value.NO_CUMPLE || 0);
      noHomologadas += value.NO_HOMOLOGADO || 0;
      sinDato += value.SIN_DATO || 0;
    });
  });
  return { evaluadas, noHomologadas, sinDato };
}

function buildInstitutionRows(instData, nationalData) {
  if (!instData || !nationalData) return [];
  const rows = AXES.map((axis) => {
    const institutionValue = axisPct(instData.metricasPorEje?.completas?.[axis]);
    const nationalAverage = axisPct(nationalData.metricasPorEje?.completas?.[axis]);
    const status = institutionValue > nationalAverage ? "better" : institutionValue < nationalAverage ? "worse" : "equal";
    const statusLabel = status === "better" ? "Por encima del promedio" : status === "worse" ? "Por debajo del promedio" : "En el promedio";
    return { id: axis, metric: AXIS_LABELS[axis], institutionValue, nationalAverage, status, statusLabel };
  });
  const institutionGlobal = Number((rows.reduce((acc, row) => acc + row.institutionValue, 0) / rows.length).toFixed(1));
  const nationalGlobal = Number((rows.reduce((acc, row) => acc + row.nationalAverage, 0) / rows.length).toFixed(1));
  const status = institutionGlobal > nationalGlobal ? "better" : institutionGlobal < nationalGlobal ? "worse" : "equal";
  const statusLabel = status === "better" ? "Por encima del promedio" : status === "worse" ? "Por debajo del promedio" : "En el promedio";
  return [...rows, { id: "riesgo_global", metric: AXIS_LABELS.riesgo_global, institutionValue: institutionGlobal, nationalAverage: nationalGlobal, status, statusLabel }];
}

function buildNationalRows(nationalData) {
  if (!nationalData) return [];
  const rows = AXES.map((axis) => {
    const currentValue = axisPct(nationalData.metricasPorEje?.completas?.[axis]);
    const status = currentValue >= 90 ? "better" : currentValue < 75 ? "worse" : "equal";
    const statusLabel = status === "better" ? "Consistencia alta" : status === "worse" ? "Seguimiento prioritario" : "Consistencia media";
    return { id: axis, metric: AXIS_LABELS[axis], currentValue, status, statusLabel };
  });
  const globalValue = Number((rows.reduce((acc, row) => acc + row.currentValue, 0) / rows.length).toFixed(1));
  const status = globalValue >= 90 ? "better" : globalValue < 75 ? "worse" : "equal";
  const statusLabel = status === "better" ? "Consistencia alta" : status === "worse" ? "Seguimiento prioritario" : "Consistencia media";
  return [...rows, { id: "riesgo_global", metric: AXIS_LABELS.riesgo_global, currentValue: globalValue, status, statusLabel }];
}

function ignoredText(counts) {
  const parts = [];
  if (counts?.noHomologadas) parts.push(`${counts.noHomologadas} no homologadas`);
  if (counts?.sinDato) parts.push(`${counts.sinDato} sin dato`);
  return parts.length ? ` | ignoradas: ${parts.join(", ")}` : "";
}

async function fetchJson(url, signal) {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

function StatusChip({ status, label }) {
  const config = STATUS_SX[status] || STATUS_SX.equal;
  return <Chip icon={config.icon} label={label} size="small" sx={{ backgroundColor: config.backgroundColor, color: config.color, border: config.border, fontWeight: 700, borderRadius: "8px", "& .MuiChip-icon": { color: "inherit" } }} />;
}

function RiskPanel({ title, count, counts, rows, chipSx }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        ...PANEL_SX,
        backgroundColor: "background.opaque",
        border: PANEL_SX.border,
        borderColor: PANEL_SX.borderColor,
        borderRadius: PANEL_SX.borderRadius,
        boxShadow: "none",
        minWidth: 0,
      }}
    >
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={1.5} sx={{ mb: 2 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="subtitle1" sx={{ color: "primary.main", fontWeight: 700, minWidth: 0, overflowWrap: "anywhere" }}>{title}</Typography>
          <Chip size="small" label={count} sx={chipSx} />
        </Stack>
        <Tooltip title="No homologado: registros fuera del catalogo estandar, excluidos del analisis.">
          <Typography variant="caption" color="text.secondary" sx={{ minWidth: 0, overflowWrap: "anywhere" }}>Evaluadas: {counts.evaluadas}{ignoredText(counts)}</Typography>
        </Tooltip>
      </Stack>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "minmax(0, 1fr)", sm: "repeat(2, minmax(0, 1fr))" },
          gap: 2,
          minWidth: 0,
        }}
      >
        {rows.map((risk) => (
          <Box key={risk.title} sx={{ minWidth: 0 }}>
            <RiskCard {...risk} />
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

export default function Evolucion() {
  const baseClasses = useBaseStyles();
  const cacheRef = useRef({ institutions: null, institutionalYears: {}, nationalYears: null, nationalByPeriod: {}, institutionByKey: {} });
  const [tab, setTab] = useState("institutional");
  const [institution, setInstitution] = useState("");
  const [period, setPeriod] = useState("");
  const [institutions, setInstitutions] = useState([]);
  const [years, setYears] = useState([]);
  const [institutionData, setInstitutionData] = useState(null);
  const [nationalData, setNationalData] = useState(null);
  const [loadingInstitutions, setLoadingInstitutions] = useState(false);
  const [loadingYears, setLoadingYears] = useState(false);
  const [loadingInstitutionData, setLoadingInstitutionData] = useState(false);
  const [loadingNationalData, setLoadingNationalData] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    async function loadInstitutions() {
      if (cacheRef.current.institutions) return setInstitutions(cacheRef.current.institutions);
      setLoadingInstitutions(true);
      try {
        const data = await fetchJson(`${API_BASE_URL}/evolucion/instituciones`, controller.signal);
        const normalized = Array.isArray(data) ? [...data].sort((a, b) => a.localeCompare(b, "es")) : [];
        cacheRef.current.institutions = normalized;
        if (mounted) setInstitutions(normalized);
      } catch (error) {
        if (mounted && error.name !== "AbortError") setErrorMessage("No fue posible cargar el catalogo de instituciones.");
      } finally {
        if (mounted) setLoadingInstitutions(false);
      }
    }
    loadInstitutions();
    return () => { mounted = false; controller.abort(); };
  }, []);

  useEffect(() => {
    if (tab !== "institutional") return undefined;
    setInstitutionData(null);
    setYears([]);
    setPeriod("");
    if (!institution) return undefined;
    if (cacheRef.current.institutionalYears[institution]) return setYears(cacheRef.current.institutionalYears[institution]);
    let mounted = true;
    const controller = new AbortController();
    async function loadYears() {
      setLoadingYears(true);
      try {
        const data = await fetchJson(`${API_BASE_URL}/evolucion/anios/${encodeURIComponent(institution)}`, controller.signal);
        const normalized = Array.isArray(data) ? data : [];
        cacheRef.current.institutionalYears[institution] = normalized;
        if (mounted) setYears(normalized);
      } catch (error) {
        if (mounted && error.name !== "AbortError") setErrorMessage("No fue posible cargar los periodos de la institucion seleccionada.");
      } finally {
        if (mounted) setLoadingYears(false);
      }
    }
    loadYears();
    return () => { mounted = false; controller.abort(); };
  }, [tab, institution]);

  useEffect(() => {
    if (tab !== "general") return undefined;
    if (cacheRef.current.nationalYears) return setYears(cacheRef.current.nationalYears);
    let mounted = true;
    const controller = new AbortController();
    async function loadYears() {
      setLoadingYears(true);
      try {
        const data = await fetchJson(`${API_BASE_URL}/evolucion/anios-nacional`, controller.signal);
        const normalized = Array.isArray(data) ? data : [];
        cacheRef.current.nationalYears = normalized;
        if (mounted) setYears(normalized);
      } catch (error) {
        if (mounted && error.name !== "AbortError") setErrorMessage("No fue posible cargar los periodos del panorama nacional.");
      } finally {
        if (mounted) setLoadingYears(false);
      }
    }
    loadYears();
    return () => { mounted = false; controller.abort(); };
  }, [tab]);

  useEffect(() => {
    if (!period) {
      setNationalData(null);
      return undefined;
    }
    if (cacheRef.current.nationalByPeriod[period]) {
      setNationalData(cacheRef.current.nationalByPeriod[period]);
      return undefined;
    }
    let mounted = true;
    const controller = new AbortController();
    async function loadNational() {
      setLoadingNationalData(true);
      try {
        const data = await fetchJson(`${API_BASE_URL}/evolucion/nacional/${period}`, controller.signal);
        cacheRef.current.nationalByPeriod[period] = data;
        if (mounted) setNationalData(data);
      } catch (error) {
        if (mounted && error.name !== "AbortError") setErrorMessage("No fue posible cargar el concentrado nacional para el periodo seleccionado.");
      } finally {
        if (mounted) setLoadingNationalData(false);
      }
    }
    loadNational();
    return () => { mounted = false; controller.abort(); };
  }, [period]);

  useEffect(() => {
    if (tab !== "institutional" || !institution || !period) {
      setInstitutionData(null);
      return undefined;
    }
    const cacheKey = `${institution}::${period}`;
    if (cacheRef.current.institutionByKey[cacheKey]) {
      setInstitutionData(cacheRef.current.institutionByKey[cacheKey]);
      return undefined;
    }
    let mounted = true;
    const controller = new AbortController();
    async function loadInstitution() {
      setLoadingInstitutionData(true);
      try {
        const data = await fetchJson(`${API_BASE_URL}/evolucion/institucion/${encodeURIComponent(institution)}/${period}`, controller.signal);
        cacheRef.current.institutionByKey[cacheKey] = data;
        if (mounted) setInstitutionData(data);
      } catch (error) {
        if (mounted && error.name !== "AbortError") setErrorMessage("No fue posible cargar el panorama institucional para los filtros elegidos.");
      } finally {
        if (mounted) setLoadingInstitutionData(false);
      }
    }
    loadInstitution();
    return () => { mounted = false; controller.abort(); };
  }, [tab, institution, period]);

  const isInstitutional = tab === "institutional";
  const sourceData = isInstitutional ? institutionData : nationalData;
  const stats = getStats(sourceData);
  const total = stats.total || stats.complete + stats.simplified || 0;
  const pctComplete = total ? ((stats.complete / total) * 100).toFixed(1) : "0.0";
  const pctSimplified = total ? ((stats.simplified / total) * 100).toFixed(1) : "0.0";
  const riskRowsComplete = buildRiskCards(sourceData?.metricasPorEje, "completas");
  const riskRowsSimplified = buildRiskCards(sourceData?.metricasPorEje, "simplificadas");
  const completeCounts = getMetricCounts(sourceData?.metricasPorEje, "completas");
  const simplifiedCounts = getMetricCounts(sourceData?.metricasPorEje, "simplificadas");
  const comparisonRows = isInstitutional ? buildInstitutionRows(institutionData, nationalData) : buildNationalRows(nationalData);
  const loadingResults = isInstitutional ? loadingInstitutionData || loadingNationalData : loadingNationalData;
  const hasResults = isInstitutional ? Boolean(institution && period && institutionData) : Boolean(period && nationalData);

  const resetSelections = (nextTab) => {
    setErrorMessage("");
    setTab(nextTab);
    setPeriod("");
    setYears([]);
    setInstitutionData(null);
    setNationalData(null);
    if (nextTab === "general") setInstitution("");
  };

  return (
    <Paper className={baseClasses.paper_search} elevation={15}>
      <Grid container spacing={0} className={baseClasses.root}>
        <Grid item xs={12} className={baseClasses.infoBusqueda}>
          <Typography paragraph><b>Aqui puedes consultar:</b></Typography>
          <ul className={baseClasses.ul}>
            <li className={baseClasses.li}><Typography color="textPrimary" display="inline">El panorama institucional por ente publico y periodo fiscal.</Typography></li>
            <li className={baseClasses.li}><Typography color="textPrimary" display="inline">El concentrado nacional del ejercicio seleccionado.</Typography></li>
            <li className={baseClasses.li}><Typography color="textPrimary" display="inline">Hallazgos por eje y comparativos con base en declaraciones completas y simplificadas.</Typography></li>
          </ul>
        </Grid>

        <Grid item xs={12} className={baseClasses.infoBusqueda}>
          <Box sx={{ border: "1px solid", borderColor: "background.border", borderBottom: "none", borderRadius: "10px 10px 0 0", overflow: "hidden", backgroundColor: "background.noSelect" }}>
            <Tabs value={tab} onChange={(event, value) => value && value !== tab && resetSelections(value)} variant="fullWidth" sx={{ "& .MuiTabs-indicator": { backgroundColor: "primary.main", height: 2 } }}>
              <Tab
                value="institutional"
                icon={<BusinessIcon fontSize="small" />}
                iconPosition="start"
                label="Panorama institucional"
                wrapped
                sx={{
                  minHeight: 64,
                  textTransform: "none",
                  fontWeight: 600,
                  color: "text.primary",
                  backgroundColor: "background.noSelect",
                  borderBottom: "1px solid rgba(88,49,113,0.08)",
                  "&.Mui-selected": {
                    color: "primary.main",
                    backgroundColor: "rgba(88,49,113,0.12)",
                  },
                }}
              />
              <Tab
                value="general"
                icon={<PublicIcon fontSize="small" />}
                iconPosition="start"
                label="Panorama nacional"
                wrapped
                sx={{
                  minHeight: 64,
                  textTransform: "none",
                  fontWeight: 600,
                  color: "text.primary",
                  backgroundColor: "background.noSelect",
                  borderBottom: "1px solid rgba(88,49,113,0.08)",
                  "&.Mui-selected": {
                    color: "primary.main",
                    backgroundColor: "rgba(88,49,113,0.12)",
                  },
                }}
              />
            </Tabs>
          </Box>

          <Box sx={{ p: { xs: 2, md: 3 }, border: "1px solid", borderTop: "none", borderColor: "background.border", borderRadius: "0 0 10px 10px", backgroundColor: "background.opaque" }}>
            <Box sx={{ mb: 2.5, px: { xs: 1.5, md: 2 }, py: { xs: 1.5, md: 1.75 }, borderRadius: 2.5, backgroundColor: "rgba(255,255,255,0.38)", border: "1px solid rgba(88,49,113,0.12)" }}>
              <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} spacing={1.5}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0 }}>
                  <Box sx={{ width: 42, height: 42, borderRadius: "12px", backgroundColor: isInstitutional ? "S1.main" : "S6.main", color: "primary.main", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {isInstitutional ? <ApartmentIcon fontSize="small" /> : <PublicIcon fontSize="small" />}
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="caption" sx={{ display: "block", mb: 0.25, color: "text.secondary", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                      {isInstitutional ? "Panorama institucional" : "Panorama nacional"}
                    </Typography>
                    <Typography sx={{ fontSize: { xs: "1rem", md: "1.2rem" }, lineHeight: 1.2, fontWeight: 700, color: "primary.main", wordBreak: "break-word" }}>
                      {isInstitutional ? institution || "Selecciona una institucion" : period ? `Ejercicio ${period}` : "Selecciona un periodo fiscal"}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.4, color: "text.secondary", maxWidth: 700 }}>
                      {isInstitutional ? "Vista agregada por institucion con comparativo nacional del ejercicio seleccionado." : "Concentrado nacional del ejercicio fiscal seleccionado."}
                    </Typography>
                  </Box>
                </Stack>
                <Chip size="small" label={isInstitutional ? "Vista institucional" : "Vista nacional"} sx={{ backgroundColor: "background.paper", color: "primary.main", fontWeight: 700, border: "1px solid", borderColor: "rgba(88,49,113,0.16)" }} />
              </Stack>
            </Box>

            <Grid container spacing={2}>
              {isInstitutional && (
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <TextField select label="Institucion" value={institution} onChange={(event) => { setErrorMessage(""); setInstitution(event.target.value); setPeriod(""); setYears([]); setInstitutionData(null); setNationalData(null); }} disabled={loadingInstitutions} sx={{ backgroundColor: "background.noSelect" }}>
                      <MenuItem value="">Seleccione una institucion</MenuItem>
                      {institutions.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                    </TextField>
                  </FormControl>
                </Grid>
              )}

              <Grid item xs={12} md={isInstitutional ? 6 : 12}>
                <FormControl fullWidth>
                  <TextField select label="Periodo fiscal" value={period} onChange={(event) => { setErrorMessage(""); setPeriod(event.target.value); setInstitutionData(null); setNationalData(null); }} disabled={loadingYears || (isInstitutional && !institution)} sx={{ backgroundColor: "background.noSelect" }}>
                    <MenuItem value="">Seleccione un periodo fiscal</MenuItem>
                    {years.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                  </TextField>
                </FormControl>
              </Grid>

              {(loadingInstitutions || loadingYears) && (
                <Grid item xs={12}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <CircularProgress size={18} />
                    <Typography variant="body2" color="text.secondary">Actualizando catalogos disponibles...</Typography>
                  </Stack>
                </Grid>
              )}

              {errorMessage && (
                <Grid item xs={12}>
                  <Alert severity="warning" sx={{ backgroundColor: "#fff3cd", color: "#856404", border: "1px solid #ffeeba" }}>{errorMessage}</Alert>
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} className={baseClasses.infoBusqueda}>
          {loadingResults ? (
            <Paper elevation={0} sx={{ p: 4, textAlign: "center", ...PANEL_SX }}>
              <CircularProgress sx={{ mb: 2 }} />
              <Typography variant="h6" sx={{ color: "primary.main", mb: 1 }}>Cargando resultados</Typography>
              <Typography variant="body2" color="text.secondary">{isInstitutional ? "Obteniendo el panorama institucional y el comparativo nacional." : "Obteniendo el concentrado nacional del periodo seleccionado."}</Typography>
            </Paper>
          ) : hasResults ? (
            <Stack spacing={3} sx={{ minWidth: 0, pt: 2 }}>
              <Alert icon={<InsightsOutlinedIcon fontSize="inherit" />} severity="info" sx={{ backgroundColor: "#d1ecf1", color: "#0c5460", border: "1px solid #bee5eb" }}>
                {isInstitutional ? `Resultados para ${institution} en el ejercicio ${period}.` : `Concentrado nacional para el ejercicio ${period}.`}
              </Alert>

              <Box
                sx={{
                  width: "100%",
                  minWidth: 0,
                  display: "grid",
                  gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "repeat(3, minmax(0, 1fr))" },
                  gap: 2,
                  alignItems: "stretch",
                }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <StatCard value={stats.total} label="Total de declaraciones" subLabel="100% del ejercicio seleccionado" icon={DescriptionOutlinedIcon} accentColor="#713972" accentSoftColor="#f1e9f2" />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <StatCard value={stats.complete} label="Declaraciones completas" subLabel={`${pctComplete}% del total analizado`} icon={FactCheckOutlinedIcon} accentColor="#2894b5" accentSoftColor="#eff9f9" />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <StatCard value={stats.simplified} label="Declaraciones simplificadas" subLabel={`${pctSimplified}% del total analizado`} icon={PersonOutlineOutlinedIcon} accentColor="#e28276" accentSoftColor="#f9eded" />
                </Box>
              </Box>

              <Paper elevation={0} sx={{ ...PANEL_SX, minWidth: 0 }}>
                <Typography variant="h6" sx={{ color: "primary.main", mb: 1 }}>Distribucion de hallazgos por tipo de declaracion</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Identifica el volumen de observaciones detectadas por eje de analisis.</Typography>
                <Stack spacing={2.5} sx={{ minWidth: 0 }}>
                    <RiskPanel title="Declaraciones completas" count={stats.complete} counts={completeCounts} rows={riskRowsComplete} chipSx={{ backgroundColor: "#d1ecf1", color: "#0c5460", fontWeight: 700 }} />
                    <RiskPanel title="Declaraciones simplificadas" count={stats.simplified} counts={simplifiedCounts} rows={riskRowsSimplified} chipSx={{ backgroundColor: "#f8d7da", color: "#721c24", fontWeight: 700 }} />
                </Stack>
              </Paper>

              <Paper elevation={0} sx={{ ...PANEL_SX, minWidth: 0, overflow: "hidden" }}>
                <Typography variant="h6" sx={{ color: "primary.main", mb: 1 }}>{isInstitutional ? "Comparativo de metricas" : "Resumen nacional por eje"}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{isInstitutional ? "Compara el cumplimiento de la institucion seleccionada contra el promedio nacional en declaraciones completas." : "Porcentaje de cumplimiento nacional en declaraciones completas para cada eje analizado."}</Typography>
                {comparisonRows.length ? (
                  <TableContainer sx={{ width: "100%", maxWidth: "100%", overflowX: "auto" }}>
                    <Table size="small" sx={{ minWidth: isInstitutional ? 720 : 520 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 700, color: "primary.main" }}>Indice</TableCell>
                          {isInstitutional && <TableCell align="center" sx={{ fontWeight: 700, color: "primary.main" }}>Institucion</TableCell>}
                          <TableCell align="center" sx={{ fontWeight: 700, color: "primary.main" }}>{isInstitutional ? "Promedio nacional" : "Valor nacional"}</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: "primary.main" }}>Lectura</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {comparisonRows.map((row) => (
                          <TableRow key={row.id} hover>
                            <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>{row.metric}</TableCell>
                            {isInstitutional && <TableCell align="center" sx={{ fontWeight: 700 }}>{row.institutionValue}%</TableCell>}
                            <TableCell align="center">{isInstitutional ? `${row.nationalAverage}%` : `${row.currentValue}%`}</TableCell>
                            <TableCell><StatusChip status={row.status} label={row.statusLabel} /></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Alert severity="info" sx={{ backgroundColor: "#d1ecf1", color: "#0c5460", border: "1px solid #bee5eb" }}>El comparativo nacional todavia no esta disponible para los filtros seleccionados.</Alert>
                )}
              </Paper>
            </Stack>
          ) : (
            <Paper elevation={0} sx={{ p: 4, textAlign: "center", border: "1px dashed", borderColor: "background.border", backgroundColor: "background.opaque" }}>
              <CalendarMonthIcon sx={{ fontSize: 42, color: "primary.main", mb: 1 }} />
              <Typography variant="h6" sx={{ color: "primary.main", mb: 1 }}>{isInstitutional ? "Selecciona una institucion y un periodo fiscal." : "Selecciona un periodo fiscal para consultar el panorama nacional."}</Typography>
              <Typography variant="body2" color="text.secondary">Los resultados se cargan automaticamente en cuanto completes los filtros requeridos.</Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
