/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, { Component } from "react";
import { Grid } from "@material-ui/core";

import { Switch, Route, Link } from "react-router-dom";

// PASIVOS
import PasivosResume from "./single-components/pasivos/resume-pasivos";
import PasivosDeudas from "./single-components/pasivos/deudas";
import PasivosObligaciones from "./single-components/pasivos/otras-obligaciones";

/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // DEFINE LA CLASE PRINCIPAL
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
class Pasivos extends Component {
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
            <b className="pdn_i_ pasivos _title" /> Pasivos
          </h2>
          <ul>
            <li>
              <Link
                className={
                  !section ? "router-link-exact-active router-link-active" : ""
                }
                to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${
                  this.props.profile._id
                }/pasivos/`}
              >
                Resumen
              </Link>
            </li>
            <li>
              <Link
                className={
                  section === "deudas"
                    ? "router-link-exact-active router-link-active"
                    : ""
                }
                to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${
                  this.props.profile._id
                }/pasivos/deudas`}
              >
                Deudas <span>{this.props.profile.pasivos.deudas.length}</span>
              </Link>
            </li>
            <li>
              <Link
                className={
                  section === "otras-obligaciones"
                    ? "router-link-exact-active router-link-active"
                    : ""
                }
                to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${
                  this.props.profile._id
                }/pasivos/otras-obligaciones`}
              >
                Otras obligaciones{" "}
                <span>
                  {this.props.profile.pasivos.otras_obligaciones.length}
                </span>
              </Link>
            </li>
          </ul>
        </Grid>
        <Switch>
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/declaraciones/perfil/:id/pasivos`}
            render={() => <PasivosResume profile={this.props.profile} />}
          />
          <Route
            exact
            path={`${
              process.env.PUBLIC_URL
            }/declaraciones/perfil/:id/pasivos/deudas`}
            render={() => <PasivosDeudas profile={this.props.profile} />}
          />
          <Route
            exact
            path={`${
              process.env.PUBLIC_URL
            }/declaraciones/perfil/:id/pasivos/otras-obligaciones`}
            render={() => <PasivosObligaciones profile={this.props.profile} />}
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
export default Pasivos;
