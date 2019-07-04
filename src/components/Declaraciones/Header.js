import React from "react";

//menu
import {
  Grid,
  IconButton,
  Button,
  MenuItem,
  Menu,
  withStyles,
  Toolbar,
  Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

let styles = theme => ({
  grow: {
    flexGrow: 1
  },
  item: {
    maxWidth: 1200
  },
  menuBtn: {
    textTransform: "none"
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
    const { classes, logo, titulo, copy } = this.props;
    let { anchorEl } = this.state;
    let open = Boolean(anchorEl);

    return (
      <div className={classes.grow}>
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} className={classes.item}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Menu"
                component={Button}
                href={`${process.env.PUBLIC_URL + "/"}`}
                style={{ paddingTop: "45px", paddingBottom: "40px" }}
              >
                <span className="pdn_l" style={{ width: "110px" }} />
              </IconButton>
              <Typography
                variant="h6"
                color="inherit"
                className={classes.grow}
              />
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
                      onClick={this.handleClose}
                      component={Button}
                      href={`${process.env.PUBLIC_URL + opcion.enlace}`}
                      className={classes.menuBtn}
                    >
                      {opcion.nombre}
                    </MenuItem>
                  );
                })}
              </Menu>
            </Toolbar>
          </Grid>
        </Grid>
        <div className="breadcrumb">
          <div className="container">
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <ul>
                  <li>
                    <a href={`${process.env.PUBLIC_URL + "/"}`}>
                      Plataforma Digital Nacional
                    </a>
                  </li>
                  <li v-if="isProfile">
                    <a href={process.env.PUBLIC_URL + "/declaraciones"}>
                      Declaraciones
                    </a>
                  </li>
                </ul>
              </Grid>
            </Grid>
          </div>
        </div>
        <div style={{ display: "block" }}>
          <div className="pdn_b_title">
            <div className="container">
              <Grid container justify="center" spacing={3}>
                <Grid item xs={11} sm={2} style={{ zIndex: 1 }}>
                  <img alt="logo" src={logo} width="150px" />
                </Grid>
                <Grid item xs={11} sm={6} style={{ zIndex: 1 }}>
                  <h1>
                    <strong>{titulo}</strong>
                  </h1>
                  <p>{copy}</p>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>        
      </div>
    );
  }
}

export default withStyles(styles)(Header);
