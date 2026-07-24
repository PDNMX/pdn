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
      nombreInforme: true,
      año: true,
      entidadFederativa: false,
      entePublico: false,
      actosRealizados: false,
      actosPendientes: false,
      montoTotalAuditado: false,
      montoPorAclarar: false,
      montoPorRecuperar: false,
      enlace: false,
      detalles: true,
    };
  }

  if (mode === "compact") {
    return {
      nombreInforme: true,
      año: true,
      entidadFederativa: true,
      entePublico: true,
      actosRealizados: false,
      actosPendientes: false,
      montoTotalAuditado: false,
      montoPorAclarar: false,
      montoPorRecuperar: false,
      enlace: true,
      detalles: true,
    };
  }

  return {
    nombreInforme: true,
    año: true,
    entidadFederativa: true,
    entePublico: true,
    actosRealizados: true,
    actosPendientes: true,
    montoTotalAuditado: true,
    montoPorAclarar: true,
    montoPorRecuperar: true,
    enlace: true,
    detalles: false,
  };
};

const TablaInformes = () => {
  const { informes } = useSistema4Data();
  const theme = useTheme();
  const isCompactViewport = useMediaQuery(theme.breakpoints.down("xl"));
  const isMobileViewport = useMediaQuery(theme.breakpoints.down("md"));
  const isPhoneViewport = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedReport, setSelectedReport] = React.useState(null);

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
        onViewDetails: setSelectedReport,
      }),
    [mode]
  );

  React.useEffect(() => {
    setColumnVisibilityModel(getVisibilityModel(mode));
  }, [mode]);

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
    "Conforme al Artículo 55 de la LGSNA, se establece que, al menos, lo que también debe contemplar el sistema son los informes que deben hacerse públicos en términos de las disposiciones jurídicas aplicables.",
    "Esta sección reúne los informes públicos generados por las entidades de control del país como resultado de sus auditorías y revisiones. Estos documentos muestran los hallazgos, observaciones y seguimientos detectados.",
    "Puede filtrar los informes por año, entidad federativa, ente público o nombre del informe.",
  ];

  const handleCloseDetails = () => setSelectedReport(null);

  return (
    <>
      <DataGridBase
        title="Aquí puedes consultar:"
        descriptionItems={descriptionItems}
        data={{ ...informes, columns }}
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

      <Dialog
        open={Boolean(selectedReport)}
        onClose={handleCloseDetails}
        fullWidth
        maxWidth="md"
        fullScreen={isPhoneViewport}
        aria-labelledby="report-detail-title"
      >
        <DialogTitle
          id="report-detail-title"
          sx={{
            paddingRight: 7,
            color: "#713972",
            fontWeight: 700,
          }}
        >
          Detalle del informe
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
              {displayValue(selectedReport?.nombreInforme)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {displayValue(selectedReport?.año)} ·{" "}
              {displayValue(selectedReport?.entidadFederativa)}
            </Typography>
            <Typography
              variant="body2"
              sx={{ marginTop: 0.5, color: "text.primary" }}
            >
              {displayValue(selectedReport?.entePublico)}
            </Typography>
          </Box>

          <Divider sx={{ marginBottom: 2.5 }} />

          <Typography
            variant="subtitle1"
            sx={{ marginBottom: 1.5, color: "#713972", fontWeight: 700 }}
          >
            Fiscalización
          </Typography>
          <Grid container spacing={2} sx={{ marginBottom: 2.5 }}>
            <Grid item xs={12} sm={6}>
              <DetailValue
                label="Auditorías / actos realizados"
                value={selectedReport?.actosRealizados}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DetailValue
                label="Auditorías / actos pendientes"
                value={selectedReport?.actosPendientes}
              />
            </Grid>
          </Grid>

          <Typography
            variant="subtitle1"
            sx={{ marginBottom: 1.5, color: "#713972", fontWeight: 700 }}
          >
            Montos
          </Typography>
          <Grid container spacing={2} sx={{ marginBottom: 2.5 }}>
            <Grid item xs={12} sm={4}>
              <DetailValue
                label="Monto total auditado"
                value={selectedReport?.montoTotalAuditado}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DetailValue
                label="Monto por aclarar"
                value={selectedReport?.montoPorAclarar}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DetailValue
                label="Monto por recuperar"
                value={selectedReport?.montoPorRecuperar}
              />
            </Grid>
          </Grid>

          <Typography
            variant="subtitle1"
            sx={{ marginBottom: 1.5, color: "#713972", fontWeight: 700 }}
          >
            Documento
          </Typography>
          {selectedReport?.enlace ? (
            <Button
              component="a"
              href={selectedReport.enlace}
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
              Ver informe
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

export default TablaInformes;
