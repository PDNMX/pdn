import React from "react";
import { Tooltip } from "@mui/material";

export const mapSheetToGridData = (item, index) => ({
  id: index + 1,
  entePublico: item.ente_publico || "",
  responsable: item.responsable || "",
  grupoDeTrabajo: item.grupo_de_trabajo || "",
  filial: item.filial || "",
});

const filialTooltips = {
  "ASOFIS": "Asociación de Organismos de Fiscalización Superior y Control Gubernamental",
  "CPCE-F": "Comisión Permanente de Contralores Estados-Federación",
};

export const columns = [
  {
    field: "entePublico",
    headerName: "Ente Público",
    flex: 2.5,
    minWidth: 350,
    sortable: true,
  },
  {
    field: "responsable",
    headerName: "Responsable",
    flex: 2,
    minWidth: 300,
    sortable: true,
  },
  {
    field: "grupoDeTrabajo",
    headerName: "Grupo de Trabajo",
    flex: 1.5,
    minWidth: 200,
    sortable: true,
  },
  {
    field: "filial",
    headerName: "Filial",
    flex: 1,
    minWidth: 120,
    sortable: true,
    renderCell: (params) => {
      const tooltipText = filialTooltips[params.value] || params.value;
      return (
        <Tooltip title={tooltipText} arrow placement="top">
          <span>{params.value}</span>
        </Tooltip>
      );
    },
  },
];
