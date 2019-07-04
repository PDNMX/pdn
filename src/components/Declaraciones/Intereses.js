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

// INTERESES
import InteresesResume from "./single-components/intereses/resume_intereses";
import InteresesEmpresas from "./single-components/intereses/empresas";
import InteresesMembresias from "./single-components/intereses/membresias";
import InteresesApoyos from "./single-components/intereses/apoyos";
import InteresesRepActiva from "./single-components/intereses/representacion-activa";
import InteresesRepPasiva from "./single-components/intereses/representacion-pasiva";
import InteresesSocios from "./single-components/intereses/socios";
import InteresesClientes from "./single-components/intereses/clientes";
import InteresesOtras from "./single-components/intereses/otras";
import InteresesBeneficios from "./single-components/intereses/beneficios";

class Intereses extends Component {
  render() {
    let section = this.props.section;
    return (
      <div>
        <Grid item sm={3} className="sidebar">
          <h2>
            <b className="pdn_i_ intereses _title" /> Intereses
          </h2>
          <ul>
            <li>
              <Link
                className={
                  !section ? "router-link-exact-active router-link-active" : ""
                }
                to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${
                  this.props.profile._id
                }/intereses/`}
              >
                Resumen
              </Link>
            </li>
            <li>
              <Link
                className={
                  section === "empresas"
                    ? "router-link-exact-active router-link-active"
                    : ""
                }
                to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${
                  this.props.profile._id
                }/intereses/empresas`}
              >
                Empresas o asociaciones{" "}
                <span>
                  {
                    this.props.profile.intereses
                      .empresas_sociedades_asociaciones.length
                  }
                </span>
              </Link>
            </li>

            <li>
              <Link
                className={
                  section === "membresias"
                    ? "router-link-exact-active router-link-active"
                    : ""
                }
                to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${
                  this.props.profile._id
                }/intereses/membresias`}
              >
                Membresías{" "}
                <span>{this.props.profile.intereses.membresias.length}</span>
              </Link>
            </li>

            <li>
              <Link
                className={
                  section === "apoyos"
                    ? "router-link-exact-active router-link-active"
                    : ""
                }
                to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${
                  this.props.profile._id
                }/intereses/apoyos`}
              >
                Apoyos{" "}
                <span>
                  {
                    this.props.profile.intereses.apoyos_beneficios_publicos
                      .length
                  }
                </span>
              </Link>
            </li>

            <li>
              <Link
                className={
                  section === "representacion-activa"
                    ? "router-link-exact-active router-link-active"
                    : ""
                }
                to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${
                  this.props.profile._id
                }/intereses/representacion-activa`}
              >
                Representación activa{" "}
                <span>
                  {this.props.profile.intereses.representacion_activa.length}
                </span>
              </Link>
            </li>

            <li>
              <Link
                className={
                  section === "representacion-pasiva"
                    ? "router-link-exact-active router-link-active"
                    : ""
                }
                to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${
                  this.props.profile._id
                }/intereses/representacion-pasiva`}
              >
                Representación pasiva{" "}
                <span>
                  {this.props.profile.intereses.representacion_pasiva.length}
                </span>
              </Link>
            </li>

            <li>
              <Link
                className={
                  section === "socios"
                    ? "router-link-exact-active router-link-active"
                    : ""
                }
                to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${
                  this.props.profile._id
                }/intereses/socios`}
              >
                Socios comerciales{" "}
                <span>
                  {this.props.profile.intereses.socios_comerciales.length}
                </span>
              </Link>
            </li>

            <li>
              <Link
                className={
                  section === "clientes"
                    ? "router-link-exact-active router-link-active"
                    : ""
                }
                to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${
                  this.props.profile._id
                }/intereses/clientes`}
              >
                Clientes principales{" "}
                <span>
                  {this.props.profile.intereses.clientes_principales.length}
                </span>
              </Link>
            </li>

            <li>
              <Link
                className={
                  section === "otras"
                    ? "router-link-exact-active router-link-active"
                    : ""
                }
                to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${
                  this.props.profile._id
                }/intereses/otras`}
              >
                Otras partes relacionadas{" "}
                <span>{this.props.profile.intereses.otras_partes.length}</span>
              </Link>
            </li>

            <li>
              <Link
                className={
                  section === "beneficios"
                    ? "router-link-exact-active router-link-active"
                    : ""
                }
                to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${
                  this.props.profile._id
                }/intereses/beneficios`}
              >
                Beneficios gratuitos{" "}
                <span>
                  {this.props.profile.intereses.beneficios_gratuitos.length}
                </span>
              </Link>
            </li>
          </ul>
        </Grid>
        <Switch>
          <Route
            exact
            path={`${
              process.env.PUBLIC_URL
            }/declaraciones/perfil/:id/intereses`}
            render={() => <InteresesResume profile={this.props.profile} />}
          />
          <Route
            exact
            path={`${
              process.env.PUBLIC_URL
            }/declaraciones/perfil/:id/intereses/empresas`}
            render={() => <InteresesEmpresas profile={this.props.profile} />}
          />
          <Route
            exact
            path={`${
              process.env.PUBLIC_URL
            }/declaraciones/perfil/:id/intereses/membresias`}
            render={() => <InteresesMembresias profile={this.props.profile} />}
          />
          <Route
            exact
            path={`${
              process.env.PUBLIC_URL
            }/declaraciones/perfil/:id/intereses/apoyos`}
            render={() => <InteresesApoyos profile={this.props.profile} />}
          />
          <Route
            exact
            path={`${
              process.env.PUBLIC_URL
            }/declaraciones/perfil/:id/intereses/representacion-activa`}
            render={() => <InteresesRepActiva profile={this.props.profile} />}
          />
          <Route
            exact
            path={`${
              process.env.PUBLIC_URL
            }/declaraciones/perfil/:id/intereses/representacion-pasiva`}
            render={() => <InteresesRepPasiva profile={this.props.profile} />}
          />
          <Route
            exact
            path={`${
              process.env.PUBLIC_URL
            }/declaraciones/perfil/:id/intereses/socios`}
            render={() => <InteresesSocios profile={this.props.profile} />}
          />
          <Route
            exact
            path={`${
              process.env.PUBLIC_URL
            }/declaraciones/perfil/:id/intereses/clientes`}
            render={() => <InteresesClientes profile={this.props.profile} />}
          />
          <Route
            exact
            path={`${
              process.env.PUBLIC_URL
            }/declaraciones/perfil/:id/intereses/otras`}
            render={() => <InteresesOtras profile={this.props.profile} />}
          />
          <Route
            exact
            path={`${
              process.env.PUBLIC_URL
            }/declaraciones/perfil/:id/intereses/beneficios`}
            render={() => <InteresesBeneficios profile={this.props.profile} />}
          />
        </Switch>
      </div>
    );
  }
}

export default Intereses;
