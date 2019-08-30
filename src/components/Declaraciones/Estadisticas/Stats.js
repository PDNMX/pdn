import React, { Component } from "react";
import { Grid } from "@material-ui/core";

import Age from "./Age";
import GobLevel from "./GobLevel";
import State from "./State";
import Education from "./Education";
import RealEstate from "./RealEstate";
import Salary from "./Salary";

import MenuSuperior from "./MenuSuperior";

import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import styles from "../style";

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu_superior: 0
    };
  }

  change_menuSuperior = valor => {
    this.setState({
      menu_superior: valor
    });
  };

  render() {
    let { classes } = this.props;
    return (
      <div
        className={classes.root}
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography>
              <b>Estadísticas</b>
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ maxWidth: 1200, marginTop: 10 }}>
            <MenuSuperior
              menu_superior={this.state.menu_superior}
              change={this.change_menuSuperior}
            />
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          {this.state.menu_superior === 0 && <Age />}
          {this.state.menu_superior === 1 && <GobLevel />}
          {this.state.menu_superior === 2 && <State />}
          {this.state.menu_superior === 3 && <Education />}
          {this.state.menu_superior === 4 && <RealEstate />}
          {this.state.menu_superior === 5 && <Salary />}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Stats);
