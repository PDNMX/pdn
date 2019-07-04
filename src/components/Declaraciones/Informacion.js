/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import InfoGeneral from "./single-components/informacion/informacion-general";
import InfoPuesto from "./single-components/informacion/puesto-actual";
import InfoCurriculum from "./single-components/informacion/datos-curriculares";
import InfoExperiencia from "./single-components/informacion/experiencia-laboral";
import InfoDependientes from "./single-components/informacion/dependientes-economicos";
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
    let section = this.props.section;
    return (
      <div>
        <Grid item sm={3} className="sidebar">
          <h2>
            <b className="pdn_i_ info _title" /> Información personal
          </h2>
          <ul>
            <li>
              <Link
                className={
                  !section ? "router-link-exact-active router-link-active" : ""
                }
                to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${
                  this.props.profile._id
                }/informacion`}
              >
                Información general
              </Link>
            </li>
            <li>
              <Link
                className={
                  section === "puesto-actual"
                    ? "router-link-exact-active router-link-active"
                    : ""
                }
                to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${
                  this.props.profile._id
                }/informacion/puesto-actual`}
              >
                Puesto actual
              </Link>
            </li>
            <li>
              <Link
                className={
                  section === "datos-curriculares"
                    ? "router-link-exact-active router-link-active"
                    : ""
                }
                to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${
                  this.props.profile._id
                }/informacion/datos-curriculares`}
              >
                Datos curriculares
              </Link>
            </li>
            <li>
              <Link
                className={
                  section === "experiencia-laboral"
                    ? "router-link-exact-active router-link-active"
                    : ""
                }
                to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${
                  this.props.profile._id
                }/informacion/experiencia-laboral`}
              >
                Experiencia laboral
              </Link>
            </li>

            <li>
              <Link
                className={
                  section === "dependientes-economicos"
                    ? "router-link-exact-active router-link-active"
                    : ""
                }
                to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${
                  this.props.profile._id
                }/informacion/dependientes-economicos`}
              >
                Dependientes económicos
              </Link>
            </li>
          </ul>
        </Grid>
        <Switch>
          <Route
            exact
            path={`${
              process.env.PUBLIC_URL
            }/declaraciones/perfil/:id/informacion`}
            render={() => (
              <InfoGeneral
                profile={this.props.profile}
                items={
                  this.props.profile.informacion_personal.informacion_general
                }
              />
            )}
          />
          <Route
            exact
            path={`${
              process.env.PUBLIC_URL
            }/declaraciones/perfil/:id/informacion/puesto-actual`}
            render={() => (
              <InfoPuesto
                profile={this.props.profile}
                items={
                  this.props.profile.informacion_personal.datos_encargo_actual
                }
              />
            )}
          />
          <Route
            exact
            path={`${
              process.env.PUBLIC_URL
            }/declaraciones/perfil/:id/informacion/datos-curriculares`}
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
            path={`${
              process.env.PUBLIC_URL
            }/declaraciones/perfil/:id/informacion/experiencia-laboral`}
            render={() => (
              <InfoExperiencia
                profile={this.props.profile}
                items={
                  this.props.profile.informacion_personal.experiencia_laboral
                }
              />
            )}
          />
          <Route
            exact
            path={`${
              process.env.PUBLIC_URL
            }/declaraciones/perfil/:id/informacion/dependientes-economicos`}
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
export default Informacion;
