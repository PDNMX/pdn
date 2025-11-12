export const mapSheetToGridData = (item, index) => ({
  id: index + 1,
  folio: item.folio,
  año: item.año,
  entidad: item.entidad,
  programa: item.programa,
  area: item.area,
  responsable: item.responsable,
  origenDatos: item.origenDatos,
  hipervinculo: item.hipervinculo,
});

// export const columns = [
//   { field: "folio", headerName: "Folio", width: 150 },
//   { field: "año", headerName: "Año", width: 100 },
//   { field: "entidad", headerName: "Entidad", width: 250 },
//   { field: "programa", headerName: "Programa", width: 300 },
//   { field: "area", headerName: "Área", width: 250 },
//   { field: "responsable", headerName: "Responsable", width: 150 },
//   { field: "origenDatos", headerName: "Origen de Datos", width: 250 },
//   {
//     field: "hipervinculo",
//     headerName: "Documento",
//     width: 150,
//     sortable: false,
//     renderCell: (params) =>
//       params.value ? (
//         <a
//           href={params.value}
//           target="_blank"
//           rel="noopener noreferrer"
//           style={{ color: "#713972", fontWeight: "bold" }}
//         >
//           Ver documento
//         </a>
//       ) : (
//         "N/A"
//       ),
//   },
// ];


export const columns = [
    {
      field: "año",
      headerName: "Año",
      flex: 0.5,
      minWidth: 100,
      sortable: true,
    },
    {
      field: "entidad",
      headerName: "Ente Público",
      flex: 1.5,
      minWidth: 250,
      sortable: true,
    },
    {
      field: "programa",
      headerName: "Nombre de Documento",
      flex: 2,
      minWidth: 300,
      sortable: true,
    },
    {
      field: "hipervinculo",
      headerName: "Hipervínculo / Enlace",
      flex: 1,
      minWidth: 180,
      sortable: false,
      renderCell: (params) => 
        params.value ? (
        <a
          href={params.value}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#713972", fontWeight: "bold" }}
        >
          Ver documento
        </a>
      ) : (
        "N/A"
      ),
    },
  ];