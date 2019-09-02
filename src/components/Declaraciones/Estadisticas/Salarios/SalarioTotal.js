import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import * as ConstClass from "../../ConstValues.js";
import BarChart from "d3plus-react/es/src/BarChart";

import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "../../style";

let d3 = Object.assign({}, require("d3-format"));
let format = d3.format("$,");

class SalarioTotal extends Component {
  state = {};

  componentDidMount() {
    fetch(ConstClass.estadisticas + "/api/v1/estadisticas/ingresos")
      .then(response => response.json())
      .then(d => {
        let data = d.map(value => {
          return {
            name: value.rango,
            value: value.total
          };
        });

        this.setState({
          methods: {
            data: data,
            x: "name",
            y: "value",
            xConfig: {
              title: "Ingresos"
            },
            yConfig: {
              title: "Número de funcionarios"
            },
            tooltipConfig: {
              title: function(d) {
                return 'Rango "' + d["name"] + '" : ' + format(d["value"]);
              }
            },
            height: 400,
            shapeConfig: {
              label: false,
              fill: (d, i) => ConstClass.colorsChart[i % 12]
            },
            legend: true,
            axes: {
              fill: "#666672"
            }
          }
        });
      });
  }

  render() {
    let { classes } = this.props;

    return (
      <Grid container spacing={0} className={classes.rootSubseccion}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography className={classes.titulo}>
              Funcionarios por ingreso bruto anual
            </Typography>
            {this.state.methods && <BarChart config={this.state.methods} />}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SalarioTotal);
