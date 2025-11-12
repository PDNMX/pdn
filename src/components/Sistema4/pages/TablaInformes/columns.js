export const mapSheetToGridData = (item, index) => ({
  id: index + 1,
  año: item.año,
  nombreInforme: item.nombreInforme,
  entePublico: item.entePublico,
  numActosFiscalizacion: item.numActosFiscalizacion,
  concluidos: item.concluidos,
  hipervinculo: item.hipervinculo,
});

export const columns = [
  { field: "año", headerName: "Año", width: 100 },
  { field: "nombreInforme", headerName: "Nombre de Informe", width: 400 },
  { field: "entePublico", headerName: "Ente Público", width: 300 },
  { field: "numActosFiscalizacion", headerName: "Actos de Fiscalización", width: 200 },
  { field: "concluidos", headerName: "Concluidos", width: 150 },
  {
    field: "hipervinculo",
    headerName: "Hipervínculo",
    width: 180,
    renderCell: (params) =>
      params.value ? (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          Ver informe
        </a>
      ) : (
        "N/A"
      ),
  },
];
