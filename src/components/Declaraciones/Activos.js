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

// ACTIVOS
import ActivosResume from "./single-components/activos/resume-activos";
import ActivosBienesInmuebles from "./single-components/activos/bienes-inmuebles";
import ActivosBienesMuebles from "./single-components/activos/bienes-muebles";
import ActivosBienesMueblesNoRegistrables from "./single-components/activos/bienes-muebles-no-registrables";
import ActivosInversiones from "./single-components/activos/inversiones";
import ActivosEfectivo from "./single-components/activos/efectivo-y-metales";
import ActivosFideicomisos from "./single-components/activos/fideicomisos";
import ActivosBienesIntangibles from "./single-components/activos/bienes-intangibles";
import ActivosCuentasPorCobrar from "./single-components/activos/cuentas-por-cobrar";
import ActivosBeneficiosEnEspecie from "./single-components/activos/beneficios-en-especie";

class Activos extends Component {
  render() {
    let section = this.props.section;
    return (
      <div>
        <Grid item sm={3} className="sidebar">
          <h2>
            <b className="pdn_i_ activos _title" /> Activos
          </h2>
          <ul>
            <li>
              <Link
                className={
                  !section ? "router-link-exact-active router-link-active" : ""
                }
                to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${
                  this.props.profile._id
                }/activos/`}
              >
                Resumen
              </Link>
            </li>
            <li>
              <Link
                className={
                  section === "bienes-inmuebles"
                    ? "router-link-exact-active router-link-active"
                    : ""
                }
                to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${
                  this.props.profile._id
                }/activos/bienes-inmuebles`}
              >
                Bienes inmuebles{" "}
                <span>
                  {this.props.profile.activos.bienes_inmuebles.length}
                </span>
              </Link>
            </li>

            <li>
              <Link
                className={
                  section === "bienes-muebles"
                    ? "router-link-exact-active router-link-active"
                    : ""
                }
                to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${
                  this.props.profile._id
                }/activos/bienes-muebles`}
              >
                Bienes muebles registrables{" "}
                <span>
                  {
                    this.props.profile.activos.bienes_muebles_registrables
                      .length
                  }
                </span>
              </Link>
            </li>

            <li>
              <Link
                className={
                  section === "bienes-muebles-no-registrables"
                    ? "router-link-exact-active router-link-active"
                    : ""
                }
                to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${
                  this.props.profile._id
                }/activos/bienes-muebles-no-registrables`}
              >
                Bienes muebles no registrables{" "}
                <span>
                  {
                    this.props.profile.activos.bienes_muebles_no_registrables
                      .length
                  }
                </span>
              </Link>
            </li>

            <li>
              <Link
                className={
                  section === "inversiones"
                    ? "router-link-exact-active router-link-active"
                    : ""
                }
                to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${
                  this.props.profile._id
                }/activos/inversiones`}
              >
                Inversiones{" "}
                <span>
                  {
                    this.props.profile.activos.inversiones_cuentas_valores
                      .length
                  }
                </span>
              </Link>
            </li>

            <li>
              <Link
                className={
                  section === "efectivo-y-metales"
                    ? "router-link-exact-active router-link-active"
                    : ""
                }
                to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${
                  this.props.profile._id
                }/activos/efectivo-y-metales`}
              >
                Efectivo y metales{" "}
                <span>
                  {this.props.profile.activos.efectivo_metales.length}
                </span>
              </Link>
            </li>

            <li>
              <Link
                className={
                  section === "fideicomisos"
                    ? "router-link-exact-active router-link-active"
                    : ""
                }
                to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${
                  this.props.profile._id
                }/activos/fideicomisos`}
              >
                Fideicomisos{" "}
                <span>{this.props.profile.activos.fideicomisos.length}</span>
              </Link>
            </li>

            <li>
              <Link
                className={
                  section === "bienes-intangibles"
                    ? "router-link-exact-active router-link-active"
                    : ""
                }
                to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${
                  this.props.profile._id
                }/activos/bienes-intangibles`}
              >
                Bienes intangibles{" "}
                <span>
                  {this.props.profile.activos.bienes_intangibles.length}
                </span>
              </Link>
            </li>

            <li>
              <Link
                className={
                  section === "cuentas-por-cobrar"
                    ? "router-link-exact-active router-link-active"
                    : ""
                }
                to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${
                  this.props.profile._id
                }/activos/cuentas-por-cobrar`}
              >
                Cuentas por cobrar{" "}
                <span>
                  {this.props.profile.activos.cuentas_por_cobrar.length}
                </span>
              </Link>
            </li>

            <li>
              <Link
                className={
                  section === "beneficios-en-especie"
                    ? "router-link-exact-active router-link-active"
                    : ""
                }
                to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${
                  this.props.profile._id
                }/activos/beneficios-en-especie`}
              >
                Uso o Beneficios en Especie Propiedad de un Tercero{" "}
                <span>
                  {
                    this.props.profile.activos.uso_especie_propiedad_tercero
                      .length
                  }
                </span>
              </Link>
            </li>
          </ul>
        </Grid>
        <Switch>
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/declaraciones/perfil/:id/activos`}
            render={() => <ActivosResume profile={this.props.profile} />}
          />
          <Route
            exact
            path={`${
              process.env.PUBLIC_URL
            }/declaraciones/perfil/:id/activos/bienes-inmuebles`}
            render={() => (
              <ActivosBienesInmuebles profile={this.props.profile} />
            )}
          />
          <Route
            exact
            path={`${
              process.env.PUBLIC_URL
            }/declaraciones/perfil/:id/activos/bienes-muebles`}
            render={() => <ActivosBienesMuebles profile={this.props.profile} />}
          />
          <Route
            exact
            path={`${
              process.env.PUBLIC_URL
            }/declaraciones/perfil/:id/activos/bienes-muebles-no-registrables`}
            render={() => (
              <ActivosBienesMueblesNoRegistrables
                profile={this.props.profile}
              />
            )}
          />
          <Route
            exact
            path={`${
              process.env.PUBLIC_URL
            }/declaraciones/perfil/:id/activos/inversiones`}
            render={() => <ActivosInversiones profile={this.props.profile} />}
          />
          <Route
            exact
            path={`${
              process.env.PUBLIC_URL
            }/declaraciones/perfil/:id/activos/efectivo-y-metales`}
            render={() => <ActivosEfectivo profile={this.props.profile} />}
          />
          <Route
            exact
            path={`${
              process.env.PUBLIC_URL
            }/declaraciones/perfil/:id/activos/fideicomisos`}
            render={() => <ActivosFideicomisos profile={this.props.profile} />}
          />
          <Route
            exact
            path={`${
              process.env.PUBLIC_URL
            }/declaraciones/perfil/:id/activos/bienes-intangibles`}
            render={() => (
              <ActivosBienesIntangibles profile={this.props.profile} />
            )}
          />
          <Route
            exact
            path={`${
              process.env.PUBLIC_URL
            }/declaraciones/perfil/:id/activos/cuentas-por-cobrar`}
            render={() => (
              <ActivosCuentasPorCobrar profile={this.props.profile} />
            )}
          />
          <Route
            exact
            path={`${
              process.env.PUBLIC_URL
            }/declaraciones/perfil/:id/activos/beneficios-en-especie`}
            render={() => (
              <ActivosBeneficiosEnEspecie profile={this.props.profile} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default Activos;
