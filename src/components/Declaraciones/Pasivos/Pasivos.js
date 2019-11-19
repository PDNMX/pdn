import React, { Component } from "react";
import { Grid } from "@material-ui/core";

// PASIVOS
import PasivosResume from "./resume-pasivos";
import PasivosDeudas from "./deudas";
import PasivosObligaciones from "./otras-obligaciones";

import { withStyles } from "@material-ui/core/styles";
import MenuInformacion from "../MenuLaterlal";

import styles from "../style";

class Pasivos extends Component {
  render() {
    let { classes, path, value, change } = this.props;
    let { deudas, otras_obligaciones } = this.props.profile.pasivos;

    let menu = [
      { name: "Resumen" },
      { name: "Deudas", value: deudas.length },
      { name: "Otras obligaciones", value: otras_obligaciones.length }
    ];

    return (
      <div className={classes.rootSeccion}>
        <Grid container spacing={0}>
          <Grid item xs={4} md={3} className={classes.sidebar}>
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
            md={9}
            style={{ backgroundColor: "#f2f2f2", padding: 15 }}
          >
            {value === 0 && <PasivosResume profile={this.props.profile} />}
            {value === 1 && <PasivosDeudas profile={this.props.profile} />}
            {value === 2 && (
              <PasivosObligaciones profile={this.props.profile} />
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Pasivos);
