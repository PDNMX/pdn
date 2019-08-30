import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import LogoPDN from "../../assets/PDN.png";
import LibreUso from "../../assets/libre-uso.png";
import OK from "../../assets/ok_80x15_blue.png";
import LogoSesna from "../../assets/Logo-SESNA.png";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  parteGris: {
    background: "#666666",
    minHeight: 150,

    paddingTop: "94px",
    paddingBottom: "64px",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  logo: {
    width: 115,
    paddingTop: 50,
    paddingBottom: 45
  },
  libreUso: {
    maxWidth: 140,
    paddingTop: 40,
    paddingBottom: 20
  },
  item: {
    maxWidth: "1100px"
  },
  grayText: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: 14
  },
  blueText: {
    color: "#34b3eb",
    fontSize: 14
  },
  logoSESNA: {
    paddingTop: 15,
    maxWidth: 150
  },
  logoPDN: {
    paddingTop: 15,
    maxWidth: 85
  },
  link: {
    textDecoration: "none"
  }
});

class Footer extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      (
        <div>
          <footer>
            <div className="container">
              <div className="row">
                <div className="col-sm-7">
                  <p className="pdn_footer">PDN</p>
                  <h2>Plataforma Digital Nacional</h2>
                  <p>Inteligencia de Datos Anticorrupción</p>
                  <p className="libreuso">Libre uso</p>
                  <p className="openk">Open knoeledge</p>
                </div>
                <div className="col-sm-3">
                  <ul>
                    <li>Sistemas</li>
                    <li>
                      <a href={`${process.env.PUBLIC_URL + "/declaraciones"}`}>
                        Declaraciones
                      </a>
                    </li>
                    <li>
                      <a href={`${process.env.PUBLIC_URL + "/servidores"}`}>
                        Servidores en contrataciones
                      </a>
                    </li>
                    <li>
                      <a href={`${process.env.PUBLIC_URL + "/sancionados"}`}>
                        Sancionados
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-2">
                  <ul>
                    <li>PDN</li>
                    <li>
                      <a href={`${process.env.PUBLIC_URL + "/about"}`}>
                        ¿Qué es la PDN
                      </a>
                    </li>
                    <li>
                      <a href={`${process.env.PUBLIC_URL + "/faq"}`}>
                        Preguntas frecuentes
                      </a>
                    </li>
                    <li>
                      <a href={`${process.env.PUBLIC_URL + "/blog"}`}>Blog</a>
                    </li>
                    <li>
                      <a href={`${process.env.PUBLIC_URL + "/terminos"}`}>
                        Términos de uso
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
          <div className="pdn_b_sesna">
            <div className="container">
              <div className="col-sm-12">
                <h2
                  className="logo_sesna"
                  style={{ margin: "15px auto", float: "none" }}
                >
                  Secretaría Ejecutiva SNA
                </h2>
              </div>
            </div>
          </div>
        </div>
      ),
      (
        <div className={classes.root}>
          <Grid
            container
            spacing={0}
            className={classes.parteGris}
            justify="center"
          >
            <Grid item xs={12} className={classes.item}>
              <Grid container spacing={0}>
                <Grid item xs={12} md={6}>
                  {/*<a href="https://www.gob.mx/sesna">
                                    <img alt="SESNA" src={LogoSesna} className={classes.logoSESNA}/>
                                </a>*/}

                  <img alt="PDN" src={LogoPDN} className={classes.logoPDN} />

                  <Typography className={classes.grayText} paragraph>
                    <b>Plataforma Digital Nacional</b>
                  </Typography>
                  <br />
                  <br />
                  <Typography
                    className={classes.grayText}
                    style={{
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontFamily: "Noto Sans SC"
                    }}
                    paragraph
                  >
                    Inteligencia de Datos Anticorrupción
                  </Typography>
                  <br />
                  <img
                    alt="Libre Uso MX "
                    src={LibreUso}
                    className={classes.libreUso}
                  />
                  <br />
                  <img alt="Open Knowledge" src={OK} />
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography className={classes.blueText} paragraph>
                    <b>Sistemas</b>
                  </Typography>
                  <Link to="/declaraciones" className={classes.link}>
                    <Typography className={classes.grayText} paragraph>
                      Declaraciones
                    </Typography>
                  </Link>
                  <Link to="/servidores" className={classes.link}>
                    <Typography className={classes.grayText} paragraph>
                      Servidores en contrataciones
                    </Typography>
                  </Link>
                  <Link to="/sancionados" className={classes.link}>
                    <Typography className={classes.grayText} paragraph>
                      Sancionados
                    </Typography>
                  </Link>
                  {/*                              <Typography className={classes.grayText}>Fiscalización</Typography>
                                <Typography className={classes.grayText}>Denuncias</Typography>*/}
                  <Link to="/contrataciones" className={classes.link}>
                    <Typography className={classes.grayText}>
                      Contrataciones
                    </Typography>
                  </Link>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography className={classes.blueText} paragraph>
                    <b>PDN</b>
                  </Typography>
                  <Typography paragraph>
                    <a
                      href="https://www.plataformadigitalnacional.org/blog"
                      className={classes.grayText}
                    >
                      Blog
                    </a>
                  </Typography>

                  <Link to="/faq" className={classes.link}>
                    <Typography className={classes.grayText} paragraph>
                      Preguntas frecuentes
                    </Typography>
                  </Link>

                  <Link to="/about" className={classes.link}>
                    <Typography className={classes.grayText} paragraph>
                      ¿Qué es la PDN?
                    </Typography>
                  </Link>

                  <Link to="/terminos" className={classes.link}>
                    <Typography className={classes.grayText} paragraph>
                      Términos de uso
                    </Typography>
                  </Link>
                  {/*<Typography className={classes.grayText}>Contacto</Typography>*/}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={0} justify="center">
            <Grid item xs={12} align="center">
              <img alt="SESNA" src={LogoSesna} className={classes.logo} />
            </Grid>
          </Grid>
        </div>
      )
    );
  }
}

export default withStyles(styles)(Footer);
