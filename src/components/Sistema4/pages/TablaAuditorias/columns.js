import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const tooltipComponentsProps = {
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
      nombreDocumento: 135,
      año: 55,
      entidadFederativa: 130,
      entePublico: 200,
      ambito: 90,
      totalAuditorias: 175,
      totalMontoAuditar: 165,
      enlace: 70,
      detalles: 65,
    };
  }

  if (mode === "compact") {
    return {
      nombreDocumento: 220,
      año: 65,
      entidadFederativa: 130,
      entePublico: 220,
      ambito: 90,
      totalAuditorias: 175,
      totalMontoAuditar: 165,
      enlace: 70,
      detalles: 70,
    };
  }

  return {
    nombreDocumento: 250,
    año: 75,
    entidadFederativa: 145,
    entePublico: 220,
    ambito: 90,
    totalAuditorias: 175,
    totalMontoAuditar: 165,
    enlace: 90,
    detalles: 70,
  };
};

export const mapSheetToGridData = (item, index) => ({
  id: item.id || index + 1,
  año: item["Año"],
  entidadFederativa: item["Entidad Federativa"],
  entePublico: item["Ente Público"],
  ambito: item["Ámbito"],
  nombreDocumento: item["Nombre del Documento"],
  enlace: item["Enlace/Hipervínculo"],
  totalAuditorias: item["Total de Auditorías/Actos de Fiscalización"],
  totalMontoAuditar: item["Total del Monto a Auditar"],
});

export const createColumns = ({ mode = "full", onViewDetails }) => {
  const widths = getColumnWidths(mode);

  return [
    {
      field: "año",
      headerName: "Año",
      flex: 0.5,
      minWidth: widths.año,
      sortable: true,
      renderCell: renderTruncatedCell,
    },
    {
      field: "nombreDocumento",
      headerName: "Nombre del Documento",
      flex: mode === "mobile" ? 1.6 : 2,
      minWidth: widths.nombreDocumento,
      sortable: true,
      renderCell: renderTruncatedCell,
    },
    {
      field: "entidadFederativa",
      headerName: "Entidad Federativa",
      flex: 1.25,
      minWidth: widths.entidadFederativa,
      sortable: true,
      renderCell: renderTruncatedCell,
      renderHeader: renderHeader("Entidad Federativa"),
    },
    {
      field: "entePublico",
      headerName: "Ente Público",
      flex: 1.75,
      minWidth: widths.entePublico,
      sortable: true,
      renderCell: renderTruncatedCell,
    },
    {
      field: "ambito",
      headerName: "Ámbito",
      flex: 0.75,
      minWidth: widths.ambito,
      sortable: true,
      renderCell: renderTruncatedCell,
    },
    {
      field: "totalAuditorias",
      headerName: "Auditorías / Actos",
      flex: 1.25,
      minWidth: widths.totalAuditorias,
      sortable: true,
      renderCell: renderTruncatedCell,
      renderHeader: renderHeader(
        "Auditorías / Actos",
        "Total de Auditorías / Actos de Fiscalización"
      ),
    },
    {
      field: "totalMontoAuditar",
      headerName: "Monto a Auditar",
      flex: 1.1,
      minWidth: widths.totalMontoAuditar,
      sortable: true,
      renderCell: renderTruncatedCell,
      renderHeader: renderHeader(
        "Monto a Auditar",
        "Total del Monto a Auditar"
      ),
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
            title="Ver documento"
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
              aria-label="Ver documento"
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
            aria-label={`Ver detalles del programa ${
              params.row.nombreDocumento || ""
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
