import React from "react";
import withStyles from "@mui/styles/withStyles";
import { Grid, Box, Typography, Paper, Tab, Tabs } from "@mui/material";
import HeaderV2 from "../HomeV2/HeaderV2";
import pdnRoutes from "../../routes/index";
import { ThemeProvider } from "@mui/material/styles";
import ThemeV2 from "../../ThemeV2";

import AssessmentIcon from "@mui/icons-material/Assessment";
import DescriptionIcon from "@mui/icons-material/Description";
import SearchIcon from "@mui/icons-material/Search";

import TablaAuditorias from "./pages/TablaAuditorias/TablaAuditorias.jsx";
import TablaInformes from "./pages/TablaInformes/TablaInformes.jsx";
import TablaConsulta from "./pages/TablaConsulta/TablaConsulta.jsx";
import AlertPrototipo from "./shared/components/AlertPrototipo.jsx";
import { Sistema4DataProvider } from "./shared/context/Sistema4DataContext";
import styles from "./styles/styles.js";

import DescargaSistema4 from "./shared/components/DescargaSistema4";
import { useSistema4Data } from "./shared/context/Sistema4DataContext";

const Index = ({ classes }) => {
  const [tab, setTab] = React.useState(0);
  const [alertOpen, setAlertOpen] = React.useState(true);
  const handleTabChange = (i) => setTab(i);
  const system = pdnRoutes.find((route) => route.path === "/fiscalizacion");

  const tabs = [
    {
      icon: <AssessmentIcon />,
      label: "Programas Anuales de Auditorías (Fiscalización)",
      aria: "auditorias",
      content: <TablaAuditorias />,
    },
    {
      icon: <DescriptionIcon />,
      label: "Informes Públicos de Fiscalización",
      aria: "informes",
      content: <TablaInformes />,
    },
    {
      icon: <SearchIcon />,
      label:
        "Intercambio de Información entre los Miembros del Sistema Nacional de Fiscalización (Consulta)",
      aria: "consulta",
      content: <TablaConsulta />,
    },
  ];


  return (
    <Sistema4DataProvider>
      <div className={classes.root}>
        <HeaderV2 section={system} />

        <Grid container justifyContent="center">
          <Grid item xs={12} className={classes.section}>
            {/* Prototipo leyenda */}
            <AlertPrototipo open={alertOpen} setOpen={setAlertOpen} />

            <Paper className={classes.mainContainer} elevation={0}>
              {/* Tabs */}
              <Box className={classes.tabsContainer}>
              <Tabs
                value={tab}
                onChange={(e, newValue) => handleTabChange(newValue)}
                className={classes.tabs}
                variant={window.innerWidth <= 960 ? "scrollable" : "fullWidth"}
                scrollButtons="auto"
                orientation={window.innerWidth <= 960 ? "vertical" : "horizontal"}
                centered={window.innerWidth > 960}
              >
                {tabs.map((t, i) => (
                  <Tab
                    key={i}
                    className={classes.tab}
                    icon={
                      <Box className={classes.tabLabel}>
                        {React.cloneElement(t.icon, { className: classes.tabIcon })}
                        <span>{t.label}</span>
                      </Box>
                    }
                    aria-label={t.aria || `tab-${i}`}
                  />
                ))}
              </Tabs>
            </Box>

              {/* Contenido */}
              <ThemeProvider theme={ThemeV2}>
                <Box className={classes.tabPanel}>{tabs[tab].content}</Box>
              </ThemeProvider>
            </Paper>

            <Box mt={3} textAlign="center">
              <DescargaSistema4
                fileName={tabs[tab].fileName}
                data={tabs[tab].data}
              />
            </Box>
          </Grid>
        </Grid>
      </div>
    </Sistema4DataProvider>
  );
};

export default withStyles(styles)(Index);
