import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";

import BaseGraph from "../single-components/BaseGraph";

import { withStyles } from "@material-ui/core/styles";
import styles from "../style";
import { throwServerError } from "apollo-link-http-common";

let d3 = Object.assign({}, require("d3-format"));

class Deudas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  monto = d => {
    let total = 0;
    d.map(o => {
      total += o.monto_original;
    });
    return total;
  };

  componentDidMount() {
    let { deudas, otras_obligaciones } = this.props.profile.pasivos;
    let data = [
      {
        name: "Deudas",
        amount: [this.monto(deudas)]
      },
      {
        name: "Otras obligaciones",
        amount: [this.monto(otras_obligaciones)]
      }
    ];
    // console.log("deudas", this.props.profile.pasivos);
    // console.log("data", data);
    this.setState({ data: data });
  }

  render() {
    let info = {
      title: "Pasivos",
      xConfig: "Tipo de pasivo",
      yConfig: "Valor del pasivo"
    };

    let { classes } = this.props;

    return (
      <Grid container spacing={3} className={classes.rootSubseccion}>
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
export default withStyles(styles)(Deudas);
