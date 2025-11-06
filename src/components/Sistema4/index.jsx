import React from "react";
import withStyles from "@mui/styles/withStyles";
import { Grid, Typography, Box } from "@mui/material";
import HeaderV2 from "../HomeV2/HeaderV2";
import pdnRoutes from "../../routes/index";
import TablaFiscalizacion from "./TablaFiscalizacion";
import TablaAuditorias from "./TablaAuditorias/TablaAuditorias.jsx";
import TablaInformes from "./TablaInformes/TablaInformes.jsx";
import img1 from "../../assets/rediseno/svg_iconos_azul/SVG/s6_01.svg";
import img3 from "../../assets/rediseno/svg_iconos_azul/SVG/s6_02.svg";
import { ThemeProvider } from "@mui/material/styles";
import ThemeV2 from "../../ThemeV2";
import styles from "../style";
import { Sistema4DataProvider } from "./shared/Sistema4DataContext";

const styles2 = (theme) => ({
  container: {
    paddingTop: 90,
  },
  tabText: {},
  section: {
    maxWidth: "1200px",
    marginTop: theme.spacing(8),
  },
  contentsSection: {
    color: theme.palette.secondary.contrastText,
    maxWidth: "1200px",
    marginTop: 0,
  },
  image: {
    width: "60px",
    display: "flex",
  },
  tabsContainer: {
    display: "flex",
    gap: 0,
    marginBottom: 0,
  },
  card: {
    backgroundColor: theme.palette.background.noSelect,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    margin: 0,
    "&:hover": {
      cursor: "pointer",
      borderColor: theme.palette.background.border,
      transition: "background 0.3s ease",
      opacity: 0.7,
    },
    display: "flex",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: theme.palette.background.border,
    borderBottomStyle: "solid",
    borderRadius: "10px 10px 0px 0px",
    marginRight: 5,
    minHeight: "60px",
  },
  cardSeleccionada: {
    backgroundColor: theme.palette.background.select,
    borderColor: theme.palette.background.border,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    margin: 0,
    borderStyle: "solid",
    borderWidth: "1px 1px 0px 1px",
    borderColor: theme.palette.background.border,
    borderRadius: "10px 10px 0px 0px",
    display: "flex",
    alignItems: "center",
    marginRight: 5,
    position: "relative",
    zIndex: 1,
    minHeight: "60px",
    marginBottom: "-1px",
  },
  labelCard: {
    color: "#000000",
    marginLeft: theme.spacing(1),
  },
  logo: {
    width: "40px",
    height: "40px",
  },
});

const TabContents = (props) => {
  const { index } = props;
  switch (index) {
    case 1:
      return <TablaAuditorias />;
    case 2:
      return <TablaInformes />;
    case 3:
      return <TablaFiscalizacion tipo="intercambio" />;
    default:
      return <TablaAuditorias />;
  }
};

const Index = (props) => {
  const { classes } = props;
  const [contentId, setContentId] = React.useState(1);
  const handleContentId = (t) => setContentId(t);
  const isContentId = (t) => t === contentId;
  const system = pdnRoutes.find((route) => route.path === "/fiscalizacion");

  return (
    <Sistema4DataProvider>
      <div className={classes.root}>
        <HeaderV2 section={system} />

        {/* TABS */}
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} className={classes.section}>
            {/* Leyenda de prototipo */}
            <Box sx={{ mb: 2, textAlign: "left" }}>
              <Typography
                variant="body2"
                sx={{ color: "#713972", fontWeight: "bold", fontStyle: "italic" }}
              >
                Prototipo versión 0.2
              </Typography>
            </Box>

            <Box className={classes.tabsContainer}>
              <Box
                onClick={() => handleContentId(1)}
                className={
                  isContentId(1) ? classes.cardSeleccionada : classes.card
                }
              >
                <img
                  src={img1}
                  alt="Programa anual de actividades"
                  className={classes.logo}
                />
                <Typography variant="subtitle1" className={classes.labelCard}>
                  Programas Anuales de Auditorias (Fiscalización)
                </Typography>
              </Box>

              <Box
                onClick={() => handleContentId(2)}
                className={
                  isContentId(2) ? classes.cardSeleccionada : classes.card
                }
              >
                <img
                  src={img1}
                  alt="Informes públicos de fiscalización"
                  className={classes.logo}
                />
                <Typography variant="subtitle1" className={classes.labelCard}>
                  Informes Públicos de Fiscalización
                </Typography>
              </Box>

              <Box
                onClick={() => handleContentId(3)}
                className={
                  isContentId(3) ? classes.cardSeleccionada : classes.card
                }
              >
                <img
                  src={img1}
                  alt="Intercambio de información"
                  className={classes.logo}
                />
                <Typography variant="subtitle1" className={classes.labelCard}>
                  Intercambio de Información entre los Miembros del Sistema
                  Nacional de Fiscalización (Consulta)
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Grid container justifyContent="center">
          <Grid item xs={12} className={classes.contentsSection}>
            <ThemeProvider theme={ThemeV2}>
              <TabContents index={contentId} />
            </ThemeProvider>
          </Grid>
        </Grid>
        <br />
      </div>
    </Sistema4DataProvider>
  );
};

export default withStyles((theme) => ({
  ...styles(theme),
  ...styles2(theme),
}))(Index);
