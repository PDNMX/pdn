import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

import { Link } from "react-router-dom";

import PDNLogo from "../../assets/PDN.png";
import Menu from "./PDNAppBar";

import { Typography } from "@material-ui/core";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import "./Header.css";
import classNames from "classnames";

const style = theme => ({
  root: {
    flexGrow: 1
  },
  pdnLogo: {
    maxWidth: 110,
    paddingLeft: "40px",
    paddingTop: "40px",
    paddingBottom: "40px"
  }
});

class Header extends React.Component {
  render() {
    const { classes, logo, titulo, copy, background } = this.props;

    return (
      <div className={classes.root}>
        <Menu />

        {/* <Grid container spacing={3}>
            <Grid item xs={12}>
            </Grid>
          <Grid item xs={6}>
            <Link to="/" className={classes.link}>
              <img src={PDNLogo} alt="PDN" className={classes.pdnLogo} />
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Menu/>
          </Grid>
        </Grid>
 */}
        {/* <img src={background} alt="fondo" className="fenito" /> */}

        {/* <Grid
          container
          spacing={0}
          justify="center"
          style={{ background: "#fff" }}
        >
          <Grid item xs={12} className={classes.item3}>
            <Link to="/" className={classes.link}>
              <img src={PDNLogo} alt="PDN" className={classes.pdnLogo} />
            </Link>
          </Grid>
        </Grid>

        <Grid container spacing={0} className="breadcrumb" justify="center">
          <Grid item xs={12} className={classes.item3}>
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
        >
          <Grid
            item
            xs={12}
            md={4}
            align={isWidthUp("md", this.props.width) ? "right" : "center"}
            className={classes.item1}
          >
            <img src={logo} alt="Sistema 2" className={classes.s2} />
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            className={classes.item2}
            align={isWidthUp("md", this.props.width) ? "left" : "center"}
          > */}
        {/* <Typography
              variant="h4"
              paragraph
              className={classes.whiteText}
              style={{ fontWeight: 300 }}
            >
              {titulo}
            </Typography> */}
        {/* <Typography
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
        </Grid> */}
      </div>
    );
  }
}

export default withWidth()(withStyles(style)(Header));
