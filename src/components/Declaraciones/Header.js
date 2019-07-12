import React from "react";

import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { Link } from "react-router-dom";
import classNames from "classnames";

import PDNLogo from "../../assets/PDN.png";

import "./header.css";

//menu
import {
  Grid,
  IconButton,
  MenuItem,
  Menu,
  withStyles,
  Toolbar,
  Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

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

const menu = [
  {
    enlace: "/blog",
    nombre: "Blog"
  },
  {
    enlace: "/faq",
    nombre: "Preguntas frecuentes"
  },
  {
    enlace: "/about",
    nombre: "¿Qué es la PDN?"
  },
  {
    enlace: "/terminos",
    nombre: "Términos de uso"
  }
];

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
    const { classes, logo, titulo, copy, background } = this.props;
    let { anchorEl } = this.state;
    let open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <Grid container spacing={0} justify="center">
          <Grid
            item
            xs={12}
            className={classes.item3}
            style={{ float: "left" }}
          >
            <Link to="/" className={classes.link}>
              <img src={PDNLogo} alt="PDN" className={classes.pdnLogo} />
            </Link>
            <Toolbar style={{ float: "right" }}>
              <div>
                <IconButton
                  aria-owns={open ? "menu-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <MenuIcon style={{ fill: "#999", fontSize: "36px" }} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  {menu.map(opcion => {
                    return (
                      <MenuItem
                        key={opcion.enlace}
                        component={Link}
                        to={opcion.enlace}
                      >
                        {opcion.nombre}
                      </MenuItem>
                    );
                  })}
                </Menu>
              </div>
            </Toolbar>
          </Grid>
        </Grid>
        <Grid container spacing={0} className="breadcrumb" justify="center">
          <Grid item xs={12}>
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
            backgroundImage: `linear-gradient(gray, gray),url(${background})`,
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
              {titulo}
            </Typography>
            <Typography
              className={classes.whiteText}
              style={{ fontSize: "18px", fontWeight: 500 }}
            >
              {copy}
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withWidth()(withStyles(styles)(Header));
