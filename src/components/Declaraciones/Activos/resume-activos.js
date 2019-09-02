import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";

import BaseGraph from "../single-components/BaseGraph";

import { withStyles } from "@material-ui/core/styles";
import styles from "../style";

let d3 = Object.assign({}, require("d3-format"));

class ActivosBienesInmuebles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  adquision = d => {
    let total = 0;
    d.map(o => {
      total += o.precio_adquisicion.valor;
      return "";
    });
    return total;
  };

  moneda = d => {
    let total = 0;
    d.map(o => {
      total += o.monto_moneda;
      return "";
    });
    return total;
  };

  fide = d => {
    let total = 0;
    d.map(o => {
      total += o.ingreso_monetario_obtenido;
      return "";
    });
    return total;
  };

  tercero = d => {
    let total = 0;
    d.map(o => {
      total += o.valor_mercado.valor;
      return "";
    });
    return total;
  };

  componentDidMount() {
    let {
      // bienes_inmuebles,
      bienes_muebles_registrables,
      bienes_muebles_no_registrables,
      // inversiones_cuentas_valores,
      efectivo_metales,
      fideicomisos,
      bienes_intangibles,
      // cuentas_por_cobrar,  
      uso_especie_propiedad_tercero
    } = this.props.profile.activos;

    let data = [
      {
        name: "Bienes inmuebles",
        // amount: [this.adquision(bienes_inmuebles)]
        amount: [0]
      },
      {
        name: "Bienes muebles",
        amount: [this.adquision(bienes_muebles_registrables)]
      },
      {
        name: "Bienes no registrables",
        amount: [this.adquision(bienes_muebles_no_registrables)]
      },
      {
        name: "Inversiones",
        amount: [this.adquision([])]
      },
      {
        name: "Efectivo y metales",
        amount: [this.moneda(efectivo_metales)]
      },
      {
        name: "Fideicomisos",
        amount: [this.fide(fideicomisos)]
      },
      {
        name: "Bienes intangibles",
        amount: [this.adquision(bienes_intangibles)]
      },
      {
        name: "Cuentas por cobrar",
        amount: [this.adquision([])]
      },
      {
        name: "Beneficios",
        amount: [this.tercero(uso_especie_propiedad_tercero)]
      }
    ];

    // console.log("activos", this.props.profile.activos);
    // console.log("data", data);

    this.setState({
      data: data
    });
  }

  render() {
    let info = {
      title: "Activos",
      xConfig: "Tipo de activo",
      yConfig: "Valor del activo"
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
export default withStyles(styles)(ActivosBienesInmuebles);
