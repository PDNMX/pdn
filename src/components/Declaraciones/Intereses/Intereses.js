/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, { Component } from "react";
import { Grid } from "@material-ui/core";

// INTERESES
import InteresesResume from "./resume_intereses";
import InteresesEmpresas from "./empresas";
import InteresesMembresias from "./membresias";
import InteresesApoyos from "./apoyos";
import InteresesRepActiva from "./representacion-activa";
import InteresesRepPasiva from "./representacion-pasiva";
import InteresesSocios from "./socios";
import InteresesClientes from "./clientes";
import InteresesOtras from "./otras";
import InteresesBeneficios from "./beneficios";

import { withStyles } from "@material-ui/core/styles";
import MenuInformacion from "../MenuLaterlal";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30
  },
  sidebar: {
    background: "#34b3eb"
  }
});

let menu = [
  "Resumen",
  "Empresas o asociaciones",
  "Membresías",
  "Apoyos",
  "Representación activa",
  "Representación pasiva",
  "Socios comerciales",
  "Clientes principales",
  "Otras partes relacionadas",
  "Beneficios gratuitos"
];

class Intereses extends Component {
  render() {
    let { classes, path, value, change } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={4} md={2} className={classes.sidebar}>
            <MenuInformacion
              menu={menu}
              id={this.props.profile._id}
              path={path}
              value={value}
              change={change}
            />
          </Grid>
          <Grid
            item
            xs={8}
            md={10}
            style={{ backgroundColor: "#f2f2f2", padding: 15 }}
          >
            {value === 0 && <InteresesResume profile={this.props.profile} />}

            {value === 1 && <InteresesEmpresas profile={this.props.profile} />}
            {value === 2 && (
              <InteresesMembresias profile={this.props.profile} />
            )}
            {value === 3 && <InteresesApoyos profile={this.props.profile} />}
            {value === 4 && <InteresesRepActiva profile={this.props.profile} />}
            {value === 5 && <InteresesRepPasiva profile={this.props.profile} />}
            {value === 6 && <InteresesSocios profile={this.props.profile} />}
            {value === 7 && <InteresesClientes profile={this.props.profile} />}
            {value === 8 && <InteresesOtras profile={this.props.profile} />}
            {value === 9 && (
              <InteresesBeneficios profile={this.props.profile} />
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Intereses);
