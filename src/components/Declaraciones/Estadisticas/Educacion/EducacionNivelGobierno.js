import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import * as ConstClass from "../../ConstValues.js";
import ChartistGraph from "react-chartist";
import "../../css/chartist.min.css";

import "../../css/chartist-plugin-tooltip.css";
import ChartistTooltip from "chartist-plugin-tooltips-updated";

import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "../../style";

let d3 = Object.assign({}, require("d3-format"));
let format = d3.format(",");

class EducacionNivelGobierno extends Component {
  constructor() {
    super();

    this.makeData = this.makeData.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.makeQuery = this.makeQuery.bind(this);
    this.buildMatrix = this.buildMatrix.bind();

    this.state = {
      data: null
    };

    let promises = this.makeData();

    Promise.all(promises.map(d => d.promise)).then(d => {
      let data = {
        labels: [...new Set(promises.map(d => d.label))],
        series: this.buildMatrix(d)
      };

      this.setState({ data: data });
    });
  }

  render() {
    if (!this.state.data) return null;
    let colors = ConstClass.ChartColors;

    let options = {
      plugins: [
        ChartistTooltip({
          appendToBody: true,
          transformTooltipTextFnc: value => format(value)
        })
      ]
    };
    let { classes } = this.props;

    return (
      <Grid container spacing={3} className={classes.rootSubseccion}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography className={classes.titulo}>
              Funcionarios por nivel educativo y nivel de gobierno (total)
            </Typography>
            <ChartistGraph
              data={this.state.data}
              type={"Bar"}
              options={options}
            />
            <Typography component="div">
              <ul className={classes.listaGraficas}>
                {ConstClass.GobLevels.map((d, i) => (
                  <li
                    key={"ngel-" + i}
                    style={{ display: "inline-block", margin: "0px 10px" }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "1em",
                        height: "1em",
                        background: colors[i]
                      }}
                    />{" "}
                    {d.label}
                  </li>
                ))}
              </ul>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  getInfo(gl, ne) {
    let connObj = Object.assign({}, ConstClass.fetchObj);

    connObj.body = this.makeQuery(gl, ne);

    return fetch(ConstClass.endpoint, connObj)
      .then(response => response.json())
      .then(d => {
        return d.total;
      });
  }

  buildMatrix(data) {
    let b = [...data],
      gl = ConstClass.GobLevels,
      ne = ConstClass.NivelEducacion,
      i,
      res = [];
    for (i = 0; i < gl.length; i++) {
      res.push(b.splice(0, ne.length));
    }

    return res;
  }

  makeData() {
    let res = [],
      gl = ConstClass.GobLevels,
      ne = ConstClass.NivelEducacion,
      i,
      j;

    for (i = 0; i < gl.length; i++) {
      for (j = 0; j < ne.length; j++) {
        res.push({
          promise: this.getInfo(gl[j].key, ne[i]),
          label: ne[j]
        });
      }
    }

    return res;
  }

  makeQuery(gl, ne) {
    let str1 = ConstClass.PROP_NAMES.nivelGobierno,
      str2 = ConstClass.PROP_NAMES.escolaridad,
      search = { query: {}, limit: 2 };

    search.query[str1] = gl;
    search.query[str2] = ne;

    return JSON.stringify(search);
  }
}

export default withStyles(styles)(EducacionNivelGobierno);
