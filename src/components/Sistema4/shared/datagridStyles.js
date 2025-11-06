export const commonStyles = (theme) => ({
  paper: {
    backgroundColor: theme.palette.background.opaque,
    padding: theme.spacing(2),
    color: theme.palette.primary.contrastText,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: theme.palette.background.border,
    borderRadius: "0px 10px 10px 10px",
  },
  ul: {
    listStyle: "none",
    paddingLeft: "20px",
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
    height: 600,
    width: "100%",
    marginTop: theme.spacing(2),
    "& .MuiDataGrid-root": {
      border: `1px solid ${theme.palette.background.border}`,
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      fontWeight: "bold",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      fontWeight: "bold",
    },
    "& .MuiDataGrid-cell": {
      borderBottom: `1px solid ${theme.palette.background.border}`,
    },
    "& .MuiDataGrid-row:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "& .MuiDataGrid-footerContainer": {
      borderTop: `2px solid ${theme.palette.primary.main}`,
    },
  },
  errorContainer: {
    padding: theme.spacing(3),
    textAlign: "center",
  },
});
