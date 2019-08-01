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
      menu_superior: 0,
      menu_edad: 0,
      menu_nivel: 0,
      menu_estado: 0,
      menu_educacion: 0,
      menu_bienes: 0,
      menu_ingresos: 0
    };
  }

  change_menuSuperior = valor => {
    this.setState({
      menu_superior: valor
    });
  };

  change_menuEdad = valor => {
    this.setState({
      menu_edad: valor
    });
  };

  change_menuNivel = valor => {
    this.setState({
      menu_nivel: valor
    });
  };

  change_menuEstado = valor => {
    this.setState({
      menu_estado: valor
    });
  };

  change_menuEducacion = valor => {
    this.setState({
      menu_educacion: valor
    });
  };

  change_menuBienes = valor => {
    this.setState({
      menu_bienes: valor
    });
  };

  change_menuIngresos = valor => {
    this.setState({
      menu_ingresos: valor
    });
  };

  render() {
    let { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography className={classes.h1}>Estadísticas</Typography>
          </Grid>
          <Grid item xs={12}>
            <MenuSuperior
              menu_superior={this.state.menu_superior}
              change={this.change_menuSuperior}
            />
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          {this.state.menu_superior === 0 && (
            <Age value={this.state.menu_edad} change={this.change_menuEdad} />
          )}
          {this.state.menu_superior === 1 && (
            <GobLevel
              value={this.state.menu_nivel}
              change={this.change_menuNivel}
            />
          )}
          {this.state.menu_superior === 2 && (
            <State
              value={this.state.menu_estado}
              change={this.change_menuEstado}
            />
          )}
          {this.state.menu_superior === 3 && (
            <Education
              value={this.state.menu_educacion}
              change={this.change_menuEducacion}
            />
          )}
          {this.state.menu_superior === 4 && (
            <RealEstate
              value={this.state.menu_bienes}
              change={this.change_menuBienes}
            />
          )}
          {this.state.menu_superior === 5 && (
            <Salary
              value={this.state.menu_ingresos}
              change={this.change_menuIngresos}
            />
          )}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Stats);
