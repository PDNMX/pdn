import React, { useState } from "react";
import { withStyles } from "@mui/styles";
import { Grid, Box, Tabs, Tab, Paper } from "@mui/material";
import PropTypes from "prop-types";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DescriptionIcon from "@mui/icons-material/Description";
import SearchIcon from "@mui/icons-material/Search";
import HeaderV2 from "../HomeV2/HeaderV2";
import pdnRoutes from "../../routes/index";
import { ThemeProvider } from "@mui/material/styles";
import ThemeV2 from "../../ThemeV2";
import TablaAuditorias from "./TablaAuditorias";
import TablaInformes from "./TablaInformes";
import TablaConsulta from "./TablaConsulta";
import AlertPrototipo from "./AlertPrototipo";
import DisclaimerSistema4 from "./DisclaimerSistema4";
import { Sistema4DataProvider } from "./utils/Sistema4DataContext";

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
  tabIcon: {
    marginBottom: "0 !important",
    marginRight: theme.spacing(1),
    color: "inherit",
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

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`fiscalizacion-tabpanel-${index}`}
      aria-labelledby={`fiscalizacion-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Index = ({ classes }) => {
  const [value, setValue] = useState(0);
  const [alertOpen, setAlertOpen] = useState(true);
  const [disclaimerOpen, setDisclaimerOpen] = useState(true);

  const system = pdnRoutes.find((route) => route.path === "/fiscalizacion");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCloseDisclaimer = () => {
    setDisclaimerOpen(false);
  };

  return (
    <Sistema4DataProvider>
      <div className={classes.root}>
        <HeaderV2 section={system} />
        <DisclaimerSistema4
          open={disclaimerOpen}
          handleClose={handleCloseDisclaimer}
        />

        <Grid container justifyContent="center">
          <Grid item xs={12} className={classes.section}>
            <AlertPrototipo open={alertOpen} setOpen={setAlertOpen} />
            <Paper className={classes.mainContainer} elevation={0}>
              <Box className={classes.tabsContainer}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  className={classes.tabs}
                  variant={
                    window.innerWidth <= 960 ? "scrollable" : "fullWidth"
                  }
                  scrollButtons="auto"
                  orientation={
                    window.innerWidth <= 960 ? "vertical" : "horizontal"
                  }
                  centered={window.innerWidth > 960}
                >
                  <Tab
                    className={classes.tab}
                    icon={
                      <Box className={classes.tabLabel}>
                        <AssessmentIcon className={classes.tabIcon} />
                        <span>
                          Programas Anuales de Auditorías (Fiscalización)
                        </span>
                      </Box>
                    }
                    aria-label="auditorias"
                  />
                  <Tab
                    className={classes.tab}
                    icon={
                      <Box className={classes.tabLabel}>
                        <DescriptionIcon className={classes.tabIcon} />
                        <span>Informes Públicos de Fiscalización</span>
                      </Box>
                    }
                    aria-label="informes"
                  />
                  <Tab
                    className={classes.tab}
                    icon={
                      <Box className={classes.tabLabel}>
                        <SearchIcon className={classes.tabIcon} />
                        <span>
                          Consulta e Intercambio de Información (En validación)
                        </span>
                      </Box>
                    }
                    aria-label="consulta"
                  />
                </Tabs>
              </Box>

              <ThemeProvider theme={ThemeV2}>
                <TabPanel value={value} index={0} className={classes.tabPanel}>
                  <TablaAuditorias />
                </TabPanel>
                <TabPanel value={value} index={1} className={classes.tabPanel}>
                  <TablaInformes />
                </TabPanel>
                <TabPanel value={value} index={2} className={classes.tabPanel}>
                  <TablaConsulta />
                </TabPanel>
              </ThemeProvider>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Sistema4DataProvider>
  );
};

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
