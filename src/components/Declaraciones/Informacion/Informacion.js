import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import InfoGeneral from "./informacion-general";
import InfoPuesto from "./puesto-actual";
import InfoCurriculum from "./datos-curriculares";
import InfoExperiencia from "./experiencia-laboral";
import InfoDependientes from "./dependientes-economicos";

import { withStyles } from "@material-ui/core/styles";
import MenuInformacion from "../MenuLaterlal";

import styles from "../style";

let menu = [
  "Información general",
  "Puesto actual",
  "Datos curriculares",
  "Experiencia laboral",
  "Dependientes económicos"
];

class Informacion extends Component {
  render() {
    let { classes, value, change } = this.props;

    return (
      <div className={classes.rootSeccion}>
        <Grid container spacing={0}>
          <Grid item xs={4} md={2} className={classes.sidebar}>
            <MenuInformacion menu={menu} value={value} change={change} />
          </Grid>
          <Grid
            item
            xs={8}
            md={10}
            style={{ backgroundColor: "#f2f2f2", padding: 15 }}
          >
            {value === 0 && (
              <InfoGeneral
                profile={this.props.profile}
                items={
                  this.props.profile.informacion_personal.informacion_general
                }
              />
            )}

            {value === 1 && (
              <InfoPuesto
                profile={this.props.profile}
                items={
                  this.props.profile.informacion_personal.datos_encargo_actual
                }
              />
            )}
            {value === 2 && (
              <InfoCurriculum
                profile={this.props.profile}
                items={
                  this.props.profile.informacion_personal.datos_curriculares
                }
              />
            )}
            {value === 3 && (
              <InfoExperiencia
                profile={this.props.profile}
                items={
                  this.props.profile.informacion_personal.experiencia_laboral
                }
              />
            )}
            {value === 4 && (
              <InfoDependientes
                profile={this.props.profile}
                items={
                  this.props.profile.informacion_personal
                    .datos_dependientes_economicos
                }
              />
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Informacion);
