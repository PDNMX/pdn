import React from "react";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { Link } from "react-router-dom";
import classNames from "classnames";
import "./header.css";

//menu
import { Grid, withStyles, Typography } from "@material-ui/core";
import BarraLogoMenu from "../Compartidos/BarraLogoMenu";

import BG from "../../assets/declaraciones/sistema1_declaraciones.jpg";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  buttons: {
    color: "#666666"
  },
  item: {
    maxWidth: 1200
  },
  href: {
    textDecoration: "none",
    color: "inherit"
  },
  blog: {
    textTransform: "none"
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  container1: {
    //background: 'grey',
    paddingTop: "75px",
    paddingBottom: "75px",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    position: "relative"
  },
  container2: {
    paddingTop: "75px",
    paddingBottom: "75px",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    position: "relative"
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  },
  item1: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2)
  },
  item2: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2)
  },
  item3: {
    // maxWidth: 1200,
    padding: "30px"
  },
  s2: {
    maxWidth: "150px"
  },
  whiteText: {
    color: "#fff"
  },
  pdnLogo: {
    maxWidth: 110
    // paddingLeft: "40px",
    // paddingTop: "40px",
    // paddingBottom: "40px"
  }
});

class Header extends React.Component {
  state = {
    achorEl: null
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, logo, titulo, subtitulo } = this.props;

    return (
      <div className={classes.root}>
        <BarraLogoMenu />
        <Grid container spacing={0} className="breadcrumb" justify="center">
          <Grid item xs={12} style={{ maxWidth: 1200, margin: "0 auto" }}>
            <ul>
              <li>
                <Link className={classes.link} to="/">
                  Plataforma Digital Nacional
                </Link>
              </li>
              <li>{titulo}</li>
            </ul>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={0}
          className={classNames(classes.container1, "servidores")}
          justify="center"
          style={{
            backgroundImage: `url(${BG})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}
        >
          <Grid
            item
            xs={12}
            md={4}
            align={isWidthUp("md", this.props.width) ? "right" : "center"}
            className={classes.item1}
          >
            <img src={logo} alt="Sistema 1" className={classes.s2} />
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            className={classes.item2}
            align={isWidthUp("md", this.props.width) ? "left" : "center"}
          >
            <Typography
              variant="h4"
              paragraph
              className={classes.whiteText}
              style={{ fontWeight: 600 }}
            >
              {subtitulo}
            </Typography>
            <Typography
              variant="h4"
              paragraph
              className={classes.whiteText}
              style={{ fontWeight: 300 }}
            >
              {titulo}
            </Typography>
            {/* <Typography
              className={classes.whiteText}
              style={{ fontSize: "18px", fontWeight: 500, maxWidth: 600 }}
            >
              Consulta y visualiza los datos <strong>públicos</strong> de
              las declaraciones patrimoniales, y de intereses, así como la
              constancia de declaración anual de impuestos de las y los
              servidores públicos.
            </Typography> */}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withWidth()(withStyles(styles)(Header));
