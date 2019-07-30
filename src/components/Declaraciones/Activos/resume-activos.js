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
class ActivosBienesInmuebles extends Component {
  constructor(props) {
    super(props);

    let elems = this.props.profile.activos.bienes_inmuebles.map(d => {
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
        name: "Bienes inmuebles",
        amount: [5000000, 0, 0, 0, 0, 0]
      },

      {
        name: "Bienes muebles",
        amount: [1000000, 200000, 500000, 520000, 0, 0]
      },

      {
        name: "Bienes no registrables",
        amount: [150000, 0, 0, 0, 0, 0]
      },

      {
        name: "Inversiones",
        amount: [250000, 500000, 600000, 0, 0, 0]
      },

      {
        name: "Efectivo y metales",
        amount: [300000, 0, 0, 0, 0, 0]
      },

      {
        name: "Fideicomisos",
        amount: [330000, 0, 200000, 0, 1200000, 0]
      },

      {
        name: "Bienes intangibles",
        amount: [43000, 20000, 0, 0, 0, 0]
      },

      {
        name: "Cuentas por cobrar",
        amount: [130000, 0, 0, 0, 0, 0]
      },

      {
        name: "Beneficios",
        amount: [3000, 0, 90000, 0, 0, 0]
      }
    ];

    let { classes } = this.props;

    return (
      <Grid container spacing={3} className={classes.rootSubseccion}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <BaseGraph data={fakeData} format={d3.format(",")} />
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
    return this.props.profile.activos.bienes_inmuebles;
  }
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default withStyles(styles)(ActivosBienesInmuebles);
