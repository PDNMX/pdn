import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "../../style";

import * as ConstClass from "../../ConstValues";
import BarChart from "d3plus-react/es/src/BarChart";

let d3 = Object.assign({}, require("d3-format"));
let format = d3.format(",");

class FuncionariosPorEntidadTotal extends Component {
  state = {};

  componentDidMount() {
    fetch("https://demospdn.host/demo1/api/v1/estadisticas/estatal")
      .then(response => response.json())
      .then(d => {
        let data = d.map(ent => {
          return {
            total: ent.total,
            entidad: ent.propiedades.entidadFederativa
          };
        });

        this.setState({
          methods: {
            data: data,
            x: "entidad",
            y: "total",
            xConfig: {
              title: "Entidad federativa"
            },
            yConfig: {
              title: "Número de funcionarios"
            },
            tooltipConfig: {
              title: function(d) {
                return d["entidad"] + " : " + format(d["total"]);
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
              Funcionarios por entidad federativa (total)
            </Typography>
            {this.state.methods && <BarChart config={this.state.methods} />}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(FuncionariosPorEntidadTotal);
