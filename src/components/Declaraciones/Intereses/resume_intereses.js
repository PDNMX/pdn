import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";

import BaseGraph from "../single-components/BaseGraph";

import { withStyles } from "@material-ui/core/styles";
import styles from "../style";

let d3 = Object.assign({}, require("d3-format"));

class InteresesResume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    let {
      empresas_sociedades_asociaciones,
      membresias,
      apoyos_beneficios_publicos,
      representacion_activa,
      representacion_pasiva,
      socios_comerciales,
      clientes_principales,
      otras_partes,
      beneficios_gratuitos
    } = this.props.profile.intereses;

    let data = [
      {
        name: "Empresas",
        amount: [empresas_sociedades_asociaciones.length]
      },
      {
        name: "Membresías",
        amount: [membresias.length]
      },
      {
        name: "Apoyos",
        amount: [apoyos_beneficios_publicos.length]
      },
      {
        name: "Representación activa",
        amount: [representacion_activa.length]
      },
      {
        name: "Representación Pasiva",
        amount: [representacion_pasiva.length]
      },
      {
        name: "Socios",
        amount: [socios_comerciales.length]
      },
      {
        name: "Clientes",
        amount: [clientes_principales.length]
      },
      {
        name: "Otras partes",
        amount: [otras_partes.length]
      },
      {
        name: "Beneficios",
        amount: [beneficios_gratuitos.length]
      }
    ];

    this.setState({
      data: data
    });

    // console.log("data", data);
  }

  render() {
    let info = {
      title: "Intereses",
      xConfig: "Tipo de interés",
      yConfig: "Número de registros"
    };

    let { classes } = this.props;

    return (
      <Grid container spacing={0} className={classes.rootSubseccion}>
        <Grid item xs={12} md={12}>
          <Paper className={classes.paper}>
            {this.state.data && (
              <BaseGraph
                data={this.state.data}
                info={info}
                format={d3.format(",")}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(styles)(InteresesResume);
