/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Grid } from "@material-ui/core";
import InfoGeneral from "./informacion-general";
import InfoPuesto from "./puesto-actual";
import InfoCurriculum from "./datos-curriculares";
import InfoExperiencia from "./experiencia-laboral";
import InfoDependientes from "./dependientes-economicos";

import { withStyles } from "@material-ui/core/styles";
import MenuInformacion from "../MenuLaterlal";
const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30
  },
  sidebar: {
    background: "#34b3eb",
    padding: 10
  }
});

let menu = [
  {
    to: "/informacion",
    label: "Información general"
  },
  {
    to: "/informacion/puesto-actual",
    label: "Puesto actual"
  },
  {
    to: "/informacion/datos-curriculares",
    label: "Datos curriculares"
  },
  {
    to: "/informacion/experiencia-laboral",
    label: "Experiencia laboral"
  },
  {
    to: "/informacion/dependientes-economicos",
    label: "Dependientes económicos"
  }
];

/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // DEFINE LA CLASE PRINCIPAL
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
class Informacion extends Component {
  /*
   * R E N D E R
   * ----------------------------------------------------------------------
   */
  render() {
    let { classes, path } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={4} md={2} className={classes.sidebar}>
            <MenuInformacion
              menu={menu}
              id={this.props.profile._id}
              path={path}
            />
          </Grid>
          <Grid
            item
            xs={8}
            md={10}
            style={{ backgroundColor: "#f2f2f2", padding: 15 }}
          >
            <Switch>
              <Route
                exact
                path="/declaraciones/perfil/:id/informacion"
                render={() => (
                  <InfoGeneral
                    profile={this.props.profile}
                    items={
                      this.props.profile.informacion_personal
                        .informacion_general
                    }
                  />
                )}
              />
              <Route
                exact
                path="/declaraciones/perfil/:id/informacion/puesto-actual"
                render={() => (
                  <InfoPuesto
                    profile={this.props.profile}
                    items={
                      this.props.profile.informacion_personal
                        .datos_encargo_actual
                    }
                  />
                )}
              />
              <Route
                exact
                path="/declaraciones/perfil/:id/informacion/datos-curriculares"
                render={() => (
                  <InfoCurriculum
                    profile={this.props.profile}
                    items={
                      this.props.profile.informacion_personal.datos_curriculares
                    }
                  />
                )}
              />
              <Route
                exact
                path="/declaraciones/perfil/:id/informacion/experiencia-laboral"
                render={() => (
                  <InfoExperiencia
                    profile={this.props.profile}
                    items={
                      this.props.profile.informacion_personal
                        .experiencia_laboral
                    }
                  />
                )}
              />
              <Route
                exact
                path="/declaraciones/perfil/:id/informacion/dependientes-economicos"
                render={() => (
                  <InfoDependientes
                    profile={this.props.profile}
                    items={
                      this.props.profile.informacion_personal
                        .datos_dependientes_economicos
                    }
                  />
                )}
              />
            </Switch>
          </Grid>
        </Grid>
      </div>
    );
  }
}

/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default withStyles(styles)(Informacion);
