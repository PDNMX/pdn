import React, { Component } from "react";
import { Paper, Grid } from "@material-ui/core";

import BaseGraph from "../single-components/BaseGraph";

import { withStyles } from "@material-ui/core/styles";
import styles from "../style";

let d3 = Object.assign({}, require("d3-format"));

class IngresosSueldosPublicos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  suma = d => {
    let total = 0;
    d.map(o => {
      total += o.ingreso_bruto_anual.valor;
      return "";
      // console.log("o", o);
    });
    return total;
  };

  componentDidMount() {
    let {
      sueldos_salarios_publicos,
      sueldos_salarios_otros_empleos,
      actividad_profesional,
      actividad_empresarial,
      actividad_economica_menor,
      arrendamiento,
      intereses,
      premios,
      otros_ingresos,
      enajenacion_bienes
    } = this.props.profile.ingresos;

    let data = [
      {
        name: "Sueldos",
        amount: [this.suma(sueldos_salarios_publicos)]
      },

      {
        name: "Otros sueldos",
        amount: [this.suma(sueldos_salarios_otros_empleos)]
      },

      {
        name: "Actividad profesional",
        amount: [this.suma(actividad_profesional)]
      },

      {
        name: "Actividad empresarial",
        amount: [this.suma(actividad_empresarial)]
      },

      {
        name: "Actividad económica",
        amount: [this.suma(actividad_economica_menor)]
      },

      {
        name: "Arrendamiento",
        amount: [this.suma(arrendamiento)]
      },

      {
        name: "Intereses",
        amount: [this.suma(intereses)]
      },

      {
        name: "Premios",
        amount: [this.suma(premios)]
      },

      {
        name: "Otros ingresos",
        amount: [this.suma(otros_ingresos)]
      },

      {
        name: "Enajenación de bienes",
        amount: [this.suma(enajenacion_bienes)]
      }
    ];

    // console.log("intereses", this.props.profile.ingresos);
    // console.log("data", data);

    this.setState({
      data: data
    });
  }

  render() {
    let info = {
      title: "Ingresos",
      xConfig: "Tipo de ingreso",
      yConfig: "Valor del ingreso"
    };

    let { classes } = this.props;

    return (
      <Grid container spacing={0} className={classes.rootSubseccion}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {this.state.data && (
              <BaseGraph
                data={this.state.data}
                info={info}
                format={d3.format("$,")}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(styles)(IngresosSueldosPublicos);
