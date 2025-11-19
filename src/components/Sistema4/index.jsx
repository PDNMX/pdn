import React from "react";
import withStyles from "@mui/styles/withStyles";
import { Grid, Box, Typography, Paper, Tab, Tabs } from "@mui/material";
import HeaderV2 from "../HomeV2/HeaderV2";
import pdnRoutes from "../../routes/index";
import { ThemeProvider } from "@mui/material/styles";
import ThemeV2 from "../../ThemeV2";

import AssessmentIcon from "@mui/icons-material/Assessment";
import DescriptionIcon from "@mui/icons-material/Description";
import FindInPageIcon from "@mui/icons-material/FindInPage";

import TablaAuditorias from "./pages/TablaAuditorias/TablaAuditorias.jsx";
import TablaInformes from "./pages/TablaInformes/TablaInformes.jsx";
import TablaConsulta from "./pages/TablaConsulta/TablaConsulta.jsx";
import AlertPrototipo from "./shared/components/AlertPrototipo.jsx";
import {
  Sistema4DataProvider,
  useSistema4Data,
} from "./shared/context/Sistema4DataContext";
import styles from "./styles/styles.js";

import DescargaSistema4 from "./shared/components/DescargaSistema4";
import DisclaimerSistema4 from "./DisclaimerSistema4";
import { AccountBox } from "@mui/icons-material";

// Componente interno que usa el contexto para obtener los datos
const ContentWithDownload = ({ classes, tab, tabs }) => {
  const { auditorias, informes, miembrosSNF } = useSistema4Data();

  // Mapeo de datos según la pestaña activa
  const dataMap = [
    { fileName: "programas_anuales_auditorias", data: auditorias.rows },
    { fileName: "informes_publicos_fiscalizacion", data: informes.rows },
    { fileName: "miembros_snf", data: miembrosSNF.rows },
  ];

  const currentData = dataMap[tab];

  return (
    <>
      <Paper className={classes.mainContainer} elevation={0}>
        {/* Tabs */}
        <Box className={classes.tabsContainer}>
          <Tabs
            value={tab}
            onChange={(e, newValue) => tabs.handleTabChange(newValue)}
            className={classes.tabs}
            variant={window.innerWidth <= 960 ? "scrollable" : "fullWidth"}
            scrollButtons="auto"
            orientation={window.innerWidth <= 960 ? "vertical" : "horizontal"}
            centered={window.innerWidth > 960}
          >
            {tabs.list.map((t, i) => (
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
          <Box className={classes.tabPanel}>{tabs.list[tab].content}</Box>
        </ThemeProvider>
      </Paper>

      <Box mt={3} textAlign="center">
        <DescargaSistema4
          fileName={currentData.fileName}
          data={currentData.data}
        />
      </Box>
    </>
  );
};

const Index = ({ classes }) => {
  const [tab, setTab] = React.useState(0);
  const [disclaimerOpen, setDisclaimerOpen] = React.useState(true);
  const handleTabChange = (i) => setTab(i);
  const system = pdnRoutes.find((route) => route.path === "/fiscalizacion");

  const handleCloseDisclaimer = () => {
    setDisclaimerOpen(false);
  };

  const tabs = {
    list: [
      {
        icon: <DescriptionIcon />,
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
        icon: <AccountBox />,
        label:
          "Intercambio de Información entre los Miembros del Sistema Nacional de Fiscalización (Consulta)",
        aria: "consulta",
        content: <TablaConsulta />,
      },
    ],
    handleTabChange,
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
            {/* Tabla de descarga de directorios y chip de prototipo */}
            <AlertPrototipo />

            <ContentWithDownload classes={classes} tab={tab} tabs={tabs} />
          </Grid>
        </Grid>
      </div>
    </Sistema4DataProvider>
  );
};

export default withStyles(styles)(Index);
