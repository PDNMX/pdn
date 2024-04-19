import AnimatedCanvas from './AnimatedCanvas'
import withStyles from "@mui/styles/withStyles";
import { Typography, Grid } from "@mui/material";
// import { Link } from "react-router-dom";
import BuscadorModal from "./Asistente/BotonPrincipal";

/* import bgPDN from "../../assets/rediseno2023/imgs/fondos/fondo-mapa.svg"; */
import lgoSNA from "../../assets/rediseno2023/imgs/iconos/logotipos/logo-sna.svg";
import lgoSESNA from "../../assets/rediseno2023/imgs/iconos/logotipos/logo-sesna.svg";

import ScrollAnimation from "./ScrollAnimation";

const styles = () => ({
  container: {
    /* background: `url(${bgPDN}) 10% -10px no-repeat rgb(255, 255, 255)`, */
    maxWidth: 1500,
    margin: "auto",
    /* background: "#f2f0f2", */
    paddingTop: "4rem",
    paddingBottom: "4rem",
  },
});

const QueEsPDN = () => {
  /* const { classes } = props; */
  return (
    <>
      <Grid py={5} container alignItems="row" justifyContent="center" style={{ position: 'relative' }}>
        <Grid item xs={12} style={{ zIndex: -1, position: 'absolute', top: 0, left: 0, width: '100%', height: 'auto' }}>
          <AnimatedCanvas />
        </Grid>
          <Grid
            item
            md={12}
            lg={12}
            xs={12}
            p={{ xs: 1, xl: 0 }}
            sx={{ textAlign: "center" }}
            style={{ zIndex: 1 }}
          >
         
            <div className="pdn-txt-bg">
              <ScrollAnimation>
                <Typography variant="h1">
                  PLATAFORMA DIGITAL NACIONAL
                </Typography>
                <Typography variant="h2">Inteligencia Anticorrupción</Typography>
                <div>
                  <img
                    style={{ margin: "1rem" }}
                    src={lgoSNA}
                    alt="Sistema Nacional Anticorrupción"
                  />
                  <img
                    style={{ margin: "1rem" }}
                    src={lgoSESNA}
                    alt="Secretaría Ejecutiva del Sistema Nacional Anticorrupción"
                  />
                </div>
                <br />
                <BuscadorModal />
              </ScrollAnimation>
            </div>
          </Grid>
        </Grid>
    </>
  );
};
export default withStyles(styles)(QueEsPDN);
