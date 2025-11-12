export const dataGridStyles = (theme) => ({
  root: {
    padding: theme.spacing(3),
    // paddingBottom: theme.spacing(0),
  },
  sectionTitle: {
    color: "#666",
    marginBottom: theme.spacing(3),
  },
  searchContainer: {
    marginBottom: theme.spacing(3),
  },
  ul: {
    listStyle: "none",
    paddingLeft: "20px",
    marginTop: theme.spacing(0),
  },
  li: {
    "&:before": {
      content: '"•"',
      color: theme.palette.primary.main,
      fontWeight: "bold",
      display: "inline-block",
      width: "1em",
      marginLeft: "-1em",
    },
  },
  dataGridContainer: {
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
    color: "#000",
    fontWeight: "bold",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});