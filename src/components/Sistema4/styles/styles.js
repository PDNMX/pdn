const styles = (theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "#f6f7f9",
  },
  section: {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
  },
  mainContainer: {
    backgroundColor: "#fff",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
    marginTop: theme.spacing(3),
  },
  wideTableMainContainer: {
    width: "calc(100vw - 32px)",
    maxWidth: "1680px",
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
  },
  tabsContainer: {
    backgroundColor: "#ede7f6",
    borderBottom: "1px solid rgba(113, 57, 114, 0.2)",
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: "-1px",
      left: 0,
      right: 0,
      height: "4px",
      background:
        "linear-gradient(180deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0) 100%)",
    },
  },
  tabs: {
    "& .MuiTabs-indicator": {
      backgroundColor: "#713972",
      height: "3px",
    },
    "& .MuiTabs-flexContainer": {
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
      },
    },
  },
  tab: {
    minHeight: "64px",
    textTransform: "none",
    fontSize: "0.9rem",
    fontWeight: 500,
    color: "#666",
    flex: 1,
    maxWidth: "none",
    "&.Mui-selected": {
      color: "#713972",
      fontWeight: 600,
    },
    "&:hover": {
      backgroundColor: "rgba(113, 57, 114, 0.04)",
      color: "#713972",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
      borderBottom: "1px solid rgba(113, 57, 114, 0.1)",
    },
  },
  tabLabel: {
   fontSize: "0.9rem",
    textTransform: "none",
    alignItems: "center",
    display: "flex",
    whiteSpace: "pre-wrap",
    lineHeight: "1.2",
    [theme.breakpoints.up("md")]: {
      justifyContent: "center",
      textAlign: "center",
      minHeight: "40px",
      padding: "0 7px",
    },
    [theme.breakpoints.down("md")]: {
      justifyContent: "flex-start",
      width: "100%",
      padding: theme.spacing(1, 2),
    },
  },
  tabIcon: {
    marginBottom: "0 !important",
    marginRight: theme.spacing(1),
    color: "inherit",
  },
  tabPanel: {
    backgroundColor: "#fff",
  },
  prototypeLabel: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: "#713972",
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: "0.875rem",
  },
});

export default styles;
