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

import Age from "./single-components/stats/Age.js";
import GobLevel from "./single-components/stats/GobLevel.js";
import State from "./single-components/stats/State.js";
import Education from "./single-components/stats/Education.js";
import RealEstate from "./single-components/stats/RealEstate.js";
import Salary from "./single-components/stats/Salary.js";

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // DEFINE LA CLASE PRINCIPAL
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
class Stats extends Component {
  // constructor(){
  // 	super();
  // }

  render() {
    let section = this.props.match.params.section;
    return (
      <div>
        {/* título */}
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <h1>Estadísticas</h1>
          </Grid>
        </Grid>

        {/* navegación */}
        <Grid container justify="space-evenly" spacing={3}>
          <Grid item xs={12}>
            <nav className="pdn_main_nav">
              <ul>
                <li>
                  <Link
                    to={`${
                      process.env.PUBLIC_URL
                    }/declaraciones/estadistica/edad`}
                    className={section === "edad" ? "router-link-active" : ""}
                  >
                    <b className="pdn_i_ age" />
                    Edad
                  </Link>
                </li>
                <li>
                  <Link
                    to={`${
                      process.env.PUBLIC_URL
                    }/declaraciones/estadistica/nivel-de-gobierno`}
                    className={
                      section === "nivel-de-gobierno"
                        ? "router-link-active"
                        : ""
                    }
                  >
                    <b className="pdn_i_ gov" />
                    Nivel de gobierno
                  </Link>
                </li>

                <li>
                  <Link
                    to={`${
                      process.env.PUBLIC_URL
                    }/declaraciones/estadistica/entidad-federativa`}
                    className={
                      section === "entidad-federativa"
                        ? "router-link-active"
                        : ""
                    }
                  >
                    <b className="pdn_i_ state" />
                    Estado
                  </Link>
                </li>

                <li>
                  <Link
                    to={`${
                      process.env.PUBLIC_URL
                    }/declaraciones/estadistica/educacion`}
                    className={
                      section === "educacion" ? "router-link-active" : ""
                    }
                  >
                    <b className="pdn_i_ education" />
                    Educación
                  </Link>
                </li>

                <li>
                  <Link
                    to={`${
                      process.env.PUBLIC_URL
                    }/declaraciones/estadistica/bienes-inmuebles`}
                    className={
                      section === "bienes-inmuebles" ? "router-link-active" : ""
                    }
                  >
                    <b className="pdn_i_ property" />
                    Bienes inmuebles
                  </Link>
                </li>

                <li>
                  <Link
                    to={`${
                      process.env.PUBLIC_URL
                    }/declaraciones/estadistica/ingresos`}
                    className={
                      section === "ingresos" ? "router-link-active" : ""
                    }
                  >
                    <b className="pdn_i_ salary" />
                    Ingresos
                  </Link>
                </li>
              </ul>
            </nav>
          </Grid>
        </Grid>

        <div className="row pnd_box">
          <Switch>
            <Route
              path={`${
                process.env.PUBLIC_URL
              }/declaraciones/estadistica/edad/:categoria?`}
              component={Age}
            />
            <Route
              path={`${
                process.env.PUBLIC_URL
              }/declaraciones/estadistica/nivel-de-gobierno/:categoria?`}
              component={GobLevel}
            />
            <Route
              path={`${
                process.env.PUBLIC_URL
              }/declaraciones/estadistica/entidad-federativa/:categoria?`}
              component={State}
            />
            <Route
              path={`${
                process.env.PUBLIC_URL
              }/declaraciones/estadistica/educacion/:categoria?`}
              component={Education}
            />
            <Route
              path={`${
                process.env.PUBLIC_URL
              }/declaraciones/estadistica/bienes-inmuebles/:categoria?`}
              component={RealEstate}
            />
            <Route
              path={`${
                process.env.PUBLIC_URL
              }/declaraciones/estadistica/ingresos/:categoria?`}
              component={Salary}
            />
          </Switch>
        </div>
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
export default Stats;
