/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, { Component } from "react";
import { Paper, Grid } from "@material-ui/core";

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
class IngresosSueldosPublicos extends Component {
  constructor(props) {
    super(props);

    let elems = this.props.profile.ingresos.sueldos_salarios_publicos.map(d => {
      // let item = d;
      d.show = true;

      return d;
    });

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
        name: "Sueldos",
        amount: [50000, 0, 0, 0, 0, 0]
      },

      {
        name: "Otros sueldos",
        amount: [100000, 20000, 20000, 20000, 0, 0]
      },

      {
        name: "Actividad profesional",
        amount: [150000, 0, 0, 0, 0, 0]
      },

      {
        name: "Actividad empresarial",
        amount: [250000, 0, 0, 0, 0, 0]
      },

      {
        name: "Actividad económica",
        amount: [30000, 0, 0, 0, 0, 0]
      },

      {
        name: "Arrendamiento",
        amount: [33000, 0, 0, 0, 0, 0]
      },

      {
        name: "Intereses",
        amount: [43000, 20000, 0, 0, 0, 0]
      },

      {
        name: "Premios",
        amount: [13000, 0, 0, 0, 0, 0]
      },

      {
        name: "Otros ingresos",
        amount: [3000, 0, 20000, 0, 0, 0]
      },

      {
        name: "Enajenación de bienes",
        amount: [13000, 0, 0, 0, 0, 20000]
      }
    ];

    let { classes } = this.props;

    return (
      <Grid container spacing={3} className={classes.rootSubseccion}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <BaseGraph data={fakeData} format={d3.format("$,")} />
            <span style={{ fontSize: 12 }}>
              <span className={classes.declarante} />
              Declarante
              <span className={classes.conyuge} />
              Conyugé
              <span className={classes.hijos} />
              Hijo/Hija
              <span className={classes.padres} />
              Padre/Madre
              <span className={classes.suegros} />
              Suegro/Suegra
              <span className={classes.otro} />
              Otro
            </span>
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
    return this.props.profile.ingresos.sueldos_salarios_publicos;
  }
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default withStyles(styles)(IngresosSueldosPublicos);
