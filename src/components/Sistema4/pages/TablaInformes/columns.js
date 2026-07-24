import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

export const tooltipComponentsProps = {
  tooltip: {
    sx: {
      maxWidth: 360,
      padding: "10px 12px",
      border: "1px solid rgba(255, 255, 255, 0.16)",
      borderRadius: "8px",
      backgroundColor: "#4d284e",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.24)",
      color: "#fff",
      fontSize: "0.85rem",
      lineHeight: 1.45,
      overflowWrap: "anywhere",
    },
  },
  arrow: {
    sx: {
      color: "#4d284e",
    },
  },
};

const TruncatedCell = ({ value }) => {
  const textRef = React.useRef(null);
  const [isTruncated, setIsTruncated] = React.useState(false);
  const displayValue =
    value === null || value === undefined || value === ""
      ? "N/A"
      : String(value);

  React.useEffect(() => {
    const element = textRef.current;
    if (!element) return undefined;

    const updateTruncation = () => {
      setIsTruncated(element.scrollWidth > element.clientWidth);
    };

    updateTruncation();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(updateTruncation);
      observer.observe(element);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", updateTruncation);
    return () => window.removeEventListener("resize", updateTruncation);
  }, [displayValue]);

  return (
    <Tooltip
      title={displayValue}
      arrow
      placement="top"
      enterDelay={250}
      disableHoverListener={!isTruncated}
      disableFocusListener={!isTruncated}
      componentsProps={tooltipComponentsProps}
    >
      <span
        ref={textRef}
        style={{
          display: "block",
          width: "100%",
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          cursor: isTruncated ? "help" : "default",
        }}
      >
        {displayValue}
      </span>
    </Tooltip>
  );
};

const renderTruncatedCell = (params) => (
  <TruncatedCell value={params.value} />
);

const renderHeader = (label, fullLabel = label) => () => (
  <Tooltip
    title={fullLabel}
    arrow
    placement="top"
    enterDelay={350}
    componentsProps={tooltipComponentsProps}
  >
    <span
      style={{
        display: "block",
        lineHeight: 1.15,
        overflow: "hidden",
        whiteSpace: "normal",
      }}
    >
      {label}
    </span>
  </Tooltip>
);

const getColumnWidths = (mode) => {
  if (mode === "mobile") {
    return {
      nombreInforme: 135,
      año: 55,
      entidadFederativa: 130,
      entePublico: 200,
      actosRealizados: 150,
      actosPendientes: 150,
      montoTotalAuditado: 145,
      montoPorAclarar: 125,
      montoPorRecuperar: 125,
      enlace: 70,
      detalles: 65,
    };
  }

  if (mode === "compact") {
    return {
      nombreInforme: 220,
      año: 65,
      entidadFederativa: 130,
      entePublico: 220,
      actosRealizados: 150,
      actosPendientes: 150,
      montoTotalAuditado: 145,
      montoPorAclarar: 125,
      montoPorRecuperar: 125,
      enlace: 70,
      detalles: 70,
    };
  }

  return {
    nombreInforme: 220,
    año: 70,
    entidadFederativa: 130,
    entePublico: 200,
    actosRealizados: 150,
    actosPendientes: 150,
    montoTotalAuditado: 145,
    montoPorAclarar: 125,
    montoPorRecuperar: 125,
    enlace: 90,
    detalles: 70,
  };
};

export const mapSheetToGridData = (item, index) => ({
  id: item.id || index + 1,
  año: item["Año"],
  entidadFederativa: item["Entidad Federativa"],
  entePublico: item["Ente Público"],
  nombreInforme: item["Nombre del Informe"],
  actosRealizados: item["Auditorías/Actos de Fiscalización Realizados"],
  enlace: item["Enlace/Hipervínculo"],
  actosPendientes: item["Auditorías/Actos de Fiscalización Pendientes"],
  montoTotalAuditado: item["Monto total auditado"],
  montoPorAclarar: item["Monto por aclarar"],
  montoPorRecuperar: item["Monto por recuperar"],
});

export const createColumns = ({ mode = "full", onViewDetails }) => {
  const widths = getColumnWidths(mode);

  return [
    {
      field: "año",
      headerName: "Año",
      flex: 0.45,
      minWidth: widths.año,
      sortable: true,
      renderCell: renderTruncatedCell,
    },
    {
      field: "nombreInforme",
      headerName: "Nombre del Informe",
      flex: mode === "mobile" ? 1.6 : 1.8,
      minWidth: widths.nombreInforme,
      sortable: true,
      renderCell: renderTruncatedCell,
    },
    {
      field: "entidadFederativa",
      headerName: "Entidad Federativa",
      flex: 1,
      minWidth: widths.entidadFederativa,
      sortable: true,
      renderCell: renderTruncatedCell,
      renderHeader: renderHeader("Entidad Federativa"),
    },
    {
      field: "entePublico",
      headerName: "Ente Público",
      flex: 1.6,
      minWidth: widths.entePublico,
      sortable: true,
      renderCell: renderTruncatedCell,
    },
    {
      field: "actosRealizados",
      headerName: "Actos Realizados",
      flex: 1.2,
      minWidth: widths.actosRealizados,
      sortable: true,
      renderCell: renderTruncatedCell,
      renderHeader: renderHeader(
        "Actos Realizados",
        "Auditorías / Actos de Fiscalización Realizados"
      ),
    },
    {
      field: "actosPendientes",
      headerName: "Actos Pendientes",
      flex: 1.2,
      minWidth: widths.actosPendientes,
      sortable: true,
      renderCell: renderTruncatedCell,
      renderHeader: renderHeader(
        "Actos Pendientes",
        "Auditorías / Actos de Fiscalización Pendientes"
      ),
    },
    {
      field: "montoTotalAuditado",
      headerName: "Monto Total Auditado",
      flex: 1.1,
      minWidth: widths.montoTotalAuditado,
      sortable: true,
      renderCell: renderTruncatedCell,
      renderHeader: renderHeader("Monto Total Auditado"),
    },
    {
      field: "montoPorAclarar",
      headerName: "Monto por Aclarar",
      flex: 0.95,
      minWidth: widths.montoPorAclarar,
      sortable: true,
      renderCell: renderTruncatedCell,
      renderHeader: renderHeader("Monto por Aclarar"),
    },
    {
      field: "montoPorRecuperar",
      headerName: "Monto por Recuperar",
      flex: 0.95,
      minWidth: widths.montoPorRecuperar,
      sortable: true,
      renderCell: renderTruncatedCell,
      renderHeader: renderHeader("Monto por Recuperar"),
    },
    {
      field: "enlace",
      headerName: "Enlace",
      flex: 0.45,
      minWidth: widths.enlace,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) =>
        params.value ? (
          <Tooltip
            title="Ver informe"
            arrow
            placement="top"
            enterDelay={250}
            componentsProps={tooltipComponentsProps}
          >
            <IconButton
              component="a"
              href={params.value}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver informe"
              size="small"
              sx={{
                color: "#713972",
                transition:
                  "background-color 150ms ease, transform 150ms ease",
                "&:hover": {
                  backgroundColor: "rgba(113, 57, 114, 0.1)",
                  transform: "scale(1.08)",
                },
              }}
            >
              <DescriptionOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          "N/A"
        ),
    },
    {
      field: "detalles",
      headerName: "Detalle",
      flex: 0.45,
      minWidth: widths.detalles,
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Tooltip
          title="Ver detalles"
          arrow
          placement="top"
          enterDelay={250}
          componentsProps={tooltipComponentsProps}
        >
          <IconButton
            onClick={() => onViewDetails(params.row)}
            aria-label={`Ver detalles del informe ${
              params.row.nombreInforme || ""
            }`}
            size="small"
            sx={{
              color: "#713972",
              transition:
                "background-color 150ms ease, transform 150ms ease",
              "&:hover": {
                backgroundColor: "rgba(113, 57, 114, 0.1)",
                transform: "scale(1.08)",
              },
            }}
          >
            <VisibilityOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];
};
