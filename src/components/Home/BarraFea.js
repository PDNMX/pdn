import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Blog from "../../assets/iconos_barra/ico-blog.svg";
//import Calidad from "../../assets/iconos_barra/ico-calidad_datos.svg";
import Espe from "../../assets/iconos_barra/ico-especificaciones.svg";
import Mesa from "../../assets/iconos_barra/ico-mesa_ayuda.svg";
import MDA from "../../assets/iconos_barra/mda.png";
import { Link as RouterLink } from "react-router-dom";
import {Typography, Link, Box} from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#f6f6f6",
    textAlign: "center"
  },
  icon: {
    width: 60,
    paddingTop: 20,
    paddingBottom: 0,
    paddingRight: 50,
    paddingLeft: 50
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary
  },
  item: {
    "&:hover": {
      backgroundColor: "#c5c5c5"
    },
    paddingBottom: 20
  }
});

const BarraFea = props => {
  const { classes } = props;
  return (
      <div className={classes.root}>
        <Box display="flex" flexWrap="wrap" justifyContent="center">

          <Box className={classes.item} flexGrow={1}>
            <RouterLink to="/mesa-de-ayuda" className={classes.link}>
              <img src={Mesa} className={classes.icon} alt="Mesa de ayuda" />
              <Typography>Mesa de ayuda</Typography>
            </RouterLink>
          </Box>

          <Box className={classes.item} flexGrow={1}>
            <Link
                href="https://www.plataformadigitalnacional.org/blog"
                className={classes.link}
                underline="none"
            >
              <img src={Blog} className={classes.icon} alt="Blog" />
              <Typography>Blog</Typography>
            </Link>
          </Box>
          {/*
          <Box className={classes.item} flexGrow={1}>
            <RouterLink to="/gaa/calidad" className={classes.link}>
              <img
                  src={Calidad}
                  className={classes.icon}
                  alt="Calidad de datos"
              />
              <Typography>Calidad de datos</Typography>
            </RouterLink>
          </Box>*/}

          <Box className={classes.item} flexGrow={1}>
            <RouterLink to="/especificaciones" className={classes.link}>
              <img
                  src={Espe}
                  className={classes.icon}
                  alt="Especificaciones técnicas"
              />
              <Typography>Especificaciones</Typography>
            </RouterLink>
          </Box>

          <Box className={classes.item} flexGrow={1}>
            <Link href="https://mda.plataformadigitalnacional.org/"
                  underline="none"
                  className={classes.link}>
              <img
                  src={MDA}
                  className={classes.icon}
                  alt="Mercado Digital Anticorrupción"
              />
              <Typography>MDA</Typography>
            </Link>
          </Box>
        </Box>
      </div>
  );
}

export default withStyles(styles)(BarraFea);
