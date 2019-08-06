/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";

import BaseGraph from "../single-components/BaseGraph";

import { withStyles } from "@material-ui/core/styles";
import styles from "../style";

let d3 = Object.assign({}, require("d3-format"));

/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // DEFINE LA CLASE PRINCIPAL
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
class InteresesResume extends Component {
  constructor(props) {
    super(props);

    let elems = this.props.profile.intereses.empresas_sociedades_asociaciones.map(
      d => {
        // let item = d;
        d.show = true;

        return d;
      }
    );

    this.state = {
      items: elems
    };

    this.toggl = this.toggl.bind(this);
  }

  /*
   * R E N D E R
   * ----------------------------------------------------------------------
   */
  render() {
    let fakeData = [
      {
        name: "Empresas",
        amount: [5, 0, 0, 0, 0, 0]
      },

      {
        name: "Membresías",
        amount: [1, 2, 1, 1, 0, 0]
      },

      {
        name: "Apoyos",
        amount: [1, 0, 0, 0, 2, 0]
      },

      {
        name: "Representación Activa",
        amount: [1, 0, 0, 0, 0, 0]
      },

      {
        name: "Representación Pasiva",
        amount: [0, 2, 0, 0, 0, 0]
      },

      {
        name: "Socios",
        amount: [1, 0, 2, 0, 0, 0]
      },

      {
        name: "Clientes",
        amount: [1, 1, 0, 0, 0, 0]
      },

      {
        name: "Otras partes",
        amount: [1, 0, 0, 0, 0, 0]
      },

      {
        name: "Beneficios",
        amount: [1, 0, 2, 0, 0, 0]
      }
    ];

    let info = {
      title: "Intereses",
      xConfig: "Tipo de interés",
      yConfig: "Número de registros"
    };

    let { classes } = this.props;

    return (
      <Grid container spacing={3} className={classes.rootSubseccion}>
        <Grid item xs={12} md={12}>
          <Paper className={classes.paper}>
            <BaseGraph data={fakeData} info={info} format={d3.format(",")} />
          </Paper>
        </Grid>
      </Grid>
    );
  }

  /*
   * M E T H O D S
   * ----------------------------------------------------------------------
   */
  toggl(item, index, e) {
    console.log(item, index, e);

    let items = this.state.items,
      newItems = items.map(d => {
        if (item === d) {
          d.show = !item.show;
        }

        return d;
      });

    this.setState({ items: newItems });
  }

  items() {
    return this.props.profile.intereses.empresas_sociedades_asociaciones;
  }
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default withStyles(styles)(InteresesResume);
