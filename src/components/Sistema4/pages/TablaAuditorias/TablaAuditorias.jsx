import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { useSistema4Data } from "../../shared/context/Sistema4DataContext";
import { createColumns } from "./columns";
import DataGridBase from "../../shared/components/DataGridBase";
import AnalyticsFilters from "../../shared/components/AnalyticsFilters";
import ProgramasDashboard from "../../shared/components/ProgramasDashboard";
import {
  EMPTY_ANALYTICS_FILTERS,
  PROGRAM_FILTER_FIELDS,
  filterAnalyticsRows,
} from "../../shared/services/analyticsUtils";

const displayValue = (value) =>
  value === null || value === undefined || value === ""
    ? "N/A"
    : String(value);

const DetailValue = ({ label, value }) => (
  <Box
    sx={{
      height: "100%",
      padding: 1.5,
      border: "1px solid rgba(113, 57, 114, 0.14)",
      borderRadius: 2,
      backgroundColor: "rgba(113, 57, 114, 0.035)",
    }}
  >
    <Typography
      variant="caption"
      sx={{
        display: "block",
        marginBottom: 0.5,
        color: "text.secondary",
        fontWeight: 700,
      }}
    >
      {label}
    </Typography>
    <Typography
      variant="body2"
      sx={{ color: "text.primary", overflowWrap: "anywhere" }}
    >
      {displayValue(value)}
    </Typography>
  </Box>
);

const getVisibilityModel = (mode) => {
  if (mode === "mobile") {
    return {
      nombreDocumento: true,
      año: true,
      entidadFederativa: false,
      entePublico: false,
      ambito: false,
      totalAuditorias: false,
      totalMontoAuditar: false,
      enlace: false,
      detalles: true,
    };
  }

  if (mode === "compact") {
    return {
      nombreDocumento: true,
      año: true,
      entidadFederativa: true,
      entePublico: true,
      ambito: false,
      totalAuditorias: false,
      totalMontoAuditar: false,
      enlace: true,
      detalles: true,
    };
  }

  return {
    nombreDocumento: true,
    año: true,
    entidadFederativa: true,
    entePublico: true,
    ambito: true,
    totalAuditorias: true,
    totalMontoAuditar: true,
    enlace: true,
    detalles: false,
  };
};

const TablaAuditorias = ({ onFilteredRowsChange }) => {
  const { auditorias } = useSistema4Data();
  const theme = useTheme();
  const isCompactViewport = useMediaQuery(theme.breakpoints.down("xl"));
  const isMobileViewport = useMediaQuery(theme.breakpoints.down("md"));
  const isPhoneViewport = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedProgram, setSelectedProgram] = React.useState(null);
  const [filters, setFilters] = React.useState({
    ...EMPTY_ANALYTICS_FILTERS,
  });
  const filteredRows = React.useMemo(
    () =>
      filterAnalyticsRows(
        auditorias.rows,
        filters,
        PROGRAM_FILTER_FIELDS
      ),
    [auditorias.rows, filters]
  );

  const mode = isMobileViewport
    ? "mobile"
    : isCompactViewport
      ? "compact"
      : "full";
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState(() =>
    getVisibilityModel(mode)
  );

  const columns = React.useMemo(
    () =>
      createColumns({
        mode,
        onViewDetails: setSelectedProgram,
      }),
    [mode]
  );

  React.useEffect(() => {
    setColumnVisibilityModel(getVisibilityModel(mode));
  }, [mode]);

  React.useEffect(() => {
    if (!auditorias.loading && !auditorias.error) {
      onFilteredRowsChange?.(filteredRows);
    }
  }, [
    auditorias.error,
    auditorias.loading,
    filteredRows,
    onFilteredRowsChange,
  ]);

  const responsiveGridSx = React.useMemo(() => {
    const headerFontSize = mode === "mobile" ? "0.72rem" : "0.78rem";
    const cellFontSize =
      mode === "full" ? "0.875rem" : mode === "compact" ? "0.8rem" : "0.78rem";

    return {
      "& .MuiDataGrid-columnHeaderTitle, & .MuiDataGrid-columnHeaderTitleContainerContent":
        {
          fontSize: headerFontSize,
          fontWeight: "700 !important",
          lineHeight: 1.15,
        },
      "& .MuiDataGrid-cell": {
        fontSize: cellFontSize,
      },
      "& .MuiDataGrid-columnHeader:not(.MuiDataGrid-columnHeader--sorted) .MuiDataGrid-sortIcon":
        {
          visibility: "hidden !important",
          opacity: "0 !important",
        },
      "& .MuiDataGrid-columnHeader:not(.MuiDataGrid-columnHeader--sorted) .MuiDataGrid-iconButtonContainer":
        {
          visibility: "hidden !important",
          width: "0 !important",
          margin: "0 !important",
        },
    };
  }, [mode]);

  const descriptionItems = [
    "En cumplimiento del Artículo 55 de la Ley General del Sistema Nacional Anticorrupción (LGSNA), que establece que, al menos, lo que debe contemplar el sistema son los Programas Anuales de Auditorías de los órganos de fiscalización de los tres órdenes de gobierno.",
    "En esta sección puede consultar los Programas Anuales de Auditoría (PAA) y sus documentos equivalentes, como son los Programas Anuales de Fiscalización o los Programas Anuales de Trabajo de los distintos órganos fiscalizadores del país.",
    "Utilice los filtros de la tabla para buscar los programas por año, por ente público o por nombre del documento.",
  ];

  const handleCloseDetails = () => setSelectedProgram(null);

  return (
    <>
      <DataGridBase
        title="Aquí puedes consultar:"
        descriptionItems={descriptionItems}
        data={{ ...auditorias, rows: filteredRows, columns }}
        enableSearch={false}
        beforeGrid={
          !auditorias.loading && !auditorias.error ? (
            <Box sx={{ p: { xs: 1, md: 2.5 }, pb: 0 }}>
              <AnalyticsFilters
                rows={auditorias.rows}
                filters={filters}
                fields={PROGRAM_FILTER_FIELDS}
                onChange={setFilters}
                title="Filtrar programas anuales"
              />
            </Box>
          ) : null
        }
        columnHeaderHeight={mode === "mobile" ? 64 : 72}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={setColumnVisibilityModel}
        gridSx={responsiveGridSx}
        rootSx={
          mode === "mobile"
            ? { padding: 1 }
            : mode === "compact"
              ? { padding: 2 }
              : undefined
        }
      />

      {!auditorias.loading && !auditorias.error && (
        <Box sx={{ p: { xs: 1, md: 2.5 }, pt: 0 }}>
          <ProgramasDashboard rows={filteredRows} />
        </Box>
      )}

      <Dialog
        open={Boolean(selectedProgram)}
        onClose={handleCloseDetails}
        fullWidth
        maxWidth="md"
        fullScreen={isPhoneViewport}
        aria-labelledby="program-detail-title"
      >
        <DialogTitle
          id="program-detail-title"
          sx={{
            paddingRight: 7,
            color: "#713972",
            fontWeight: 700,
          }}
        >
          Detalle del programa anual
          <IconButton
            onClick={handleCloseDetails}
            aria-label="Cerrar detalle"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "text.secondary",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Box sx={{ marginBottom: 2.5 }}>
            <Typography
              variant="h6"
              sx={{ marginBottom: 0.75, color: "text.primary", fontWeight: 700 }}
            >
              {displayValue(selectedProgram?.nombreDocumento)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {displayValue(selectedProgram?.año)} ·{" "}
              {displayValue(selectedProgram?.entidadFederativa)}
            </Typography>
            <Typography
              variant="body2"
              sx={{ marginTop: 0.5, color: "text.primary" }}
            >
              {displayValue(selectedProgram?.entePublico)}
            </Typography>
          </Box>

          <Divider sx={{ marginBottom: 2.5 }} />

          <Typography
            variant="subtitle1"
            sx={{ marginBottom: 1.5, color: "#713972", fontWeight: 700 }}
          >
            Información del programa
          </Typography>
          <Grid container spacing={2} sx={{ marginBottom: 2.5 }}>
            <Grid item xs={12} sm={4}>
              <DetailValue
                label="Ámbito"
                value={selectedProgram?.ambito}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DetailValue
                label="Total de auditorías / actos de fiscalización"
                value={selectedProgram?.totalAuditorias}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DetailValue
                label="Total del monto a auditar"
                value={selectedProgram?.totalMontoAuditar}
              />
            </Grid>
          </Grid>

          <Typography
            variant="subtitle1"
            sx={{ marginBottom: 1.5, color: "#713972", fontWeight: 700 }}
          >
            Documento
          </Typography>
          {selectedProgram?.enlace ? (
            <Button
              component="a"
              href={selectedProgram.enlace}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={<DescriptionOutlinedIcon />}
              sx={{
                backgroundColor: "#713972",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#5d2f5e",
                },
              }}
            >
              Ver documento
            </Button>
          ) : (
            <Typography variant="body2" color="text.secondary">
              N/A
            </Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ padding: 2 }}>
          <Button
            onClick={handleCloseDetails}
            sx={{ color: "#713972", textTransform: "none", fontWeight: 700 }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TablaAuditorias;
