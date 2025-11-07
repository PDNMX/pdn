export const dataGridStyles = (theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  sectionTitle: {
    color: "#666",
    marginBottom: theme.spacing(3),
  },
  searchContainer: {
    marginBottom: theme.spacing(3),
  },
  dataGridContainer: {
    height: 600,
    width: "100%",
    "& .MuiDataGrid-root": {
      border: "1px solid rgba(224, 224, 224, 1)",
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#713972 !important",
      color: "#fff !important",
    },
    "& .MuiDataGrid-columnHeader": {
      backgroundColor: "#713972 !important",
      color: "#fff !important",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      fontWeight: "bold !important",
      color: "#fff !important",
    },
    "& .MuiDataGrid-cell": {
      borderBottom: "1px solid rgba(224, 224, 224, 1)",
    },
    "& .MuiDataGrid-row:hover": {
      backgroundColor: "rgba(113, 57, 114, 0.04)",
    },
    "& .MuiDataGrid-footerContainer": {
      borderTop: "2px solid #713972",
    },
    "& .MuiDataGrid-columnHeader .MuiIconButton-root": {
      color: "#fff !important",
      padding: "4px !important",
    },
    "& .MuiDataGrid-sortIcon": {
      color: "#fff !important",
    },
    "& .MuiDataGrid-menuIconButton": {
      color: "#fff !important",
      opacity: "1 !important",
      padding: "2px !important",
      margin: "0 4px !important",
    },
    "& .MuiDataGrid-iconButtonContainer": {
      visibility: "visible !important",
      width: "auto !important",
      marginLeft: "4px !important",
    },
    "& .MuiDataGrid-menuIcon": {
      visibility: "visible !important",
      opacity: "1 !important",
      fontSize: "20px !important",
    },
    "& .MuiDataGrid-columnHeader:hover .MuiDataGrid-menuIcon": {
      opacity: "1 !important",
    },
    "& .MuiDataGrid-columnHeader .MuiDataGrid-menuIcon": {
      opacity: "1 !important",
    },
    "& .MuiDataGrid-columnHeader .MuiIconButton-root svg": {
      fontSize: "1.25rem !important",
      color: "#fff !important",
    },
  },
  link: {
    color: "#713972",
    fontWeight: "bold",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

export const dataGridLocaleText = {
  noRowsLabel: "No se encontraron resultados",
  noResultsOverlayLabel: "No se encontraron resultados.",
  errorOverlayDefaultLabel: "Ha ocurrido un error.",
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} filas seleccionadas`
      : `${count.toLocaleString()} fila seleccionada`,
  footerTotalRows: "Filas totales:",
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,
  MuiTablePagination: {
    labelRowsPerPage: "Filas por página:",
    labelDisplayedRows: ({ from, to, count }) =>
      `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`,
  },
};
