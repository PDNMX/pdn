import AnimatedCanvas from './AnimatedCanvas'
import { withStyles } from 'tss-react/mui';
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
      <Grid
        container
        style={{ position: 'relative' }}
        sx={{
          py: 5,
          alignItems: "row",
          justifyContent: "center"
        }}>
        <Grid
          style={{ opacity: 0.5, zIndex: -1, position: 'absolute', top: -100, left: -60, width: '100vw', height: '100vh' }}
          size={12}>
          <AnimatedCanvas />
        </Grid>
          <Grid
            style={{ zIndex: 1 }}
            size={{
              md: 12,
              lg: 12,
              xs: 12
            }}
            sx={{
              p: { xs: 1, xl: 0 },
              textAlign: "center"
            }}>
         
            <div className="pdn-txt-bg">
              <ScrollAnimation>
                <Typography variant="h1" style={{ fontWeight: 600, lineHeight: 1.5 }}>
                  PLATAFORMA DIGITAL NACIONAL
                </Typography>
                <Typography variant="h2">Inteligencia Anticorrupción</Typography>
                <div style={{ marginBottom: "1rem" }}>
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
                {/* <br /> */}
                <BuscadorModal />
              </ScrollAnimation>
            </div>
          </Grid>
        </Grid>
    </>
  );
};
export default withStyles(QueEsPDN, styles);
