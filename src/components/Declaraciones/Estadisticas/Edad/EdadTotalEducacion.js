import React, { Component } from "react";
import * as ConstClass from "../../ConstValues";
import ChartistGraph from "react-chartist";
import "../../css/chartist.min.css";
import { Grid, Paper } from "@material-ui/core";

import "../../css/chartist-plugin-tooltip.css";
import ChartistTooltip from "chartist-plugin-tooltips-updated";

import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "../../style";

let d3 = Object.assign({}, require("d3-format"));
let format = d3.format(",");

class EdadTotalEducacion extends Component {
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
      let labels = [...new Set(promises.map(d => d.label))],
        data = {
          labels,
          series: this.buildMatrix(d, labels.length)
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
      <Grid container spacing={0} className={classes.rootSubseccion}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography className={classes.titulo}>
              Funcionarios por rango de edad y nivel educativo (total)
            </Typography>
            <ChartistGraph
              data={this.state.data}
              type={"Bar"}
              options={options}
            />
            <Typography component="div">
              <ul className={classes.listaGraficas}>
                {ConstClass.NivelEducacion.map((d, i) => (
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
                    {d}
                  </li>
                ))}
              </ul>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  getInfo(_from, _to, ne) {
    let connObj = Object.assign({}, ConstClass.fetchObj);

    connObj.body = this.makeQuery(_from, _to, ne);

    return fetch(ConstClass.endpoint, connObj)
      .then(response => response.json())
      .then(d => {
        return d.total;
      });
  }

  buildMatrix(data, length) {
    let b = [...data],
      ne = ConstClass.NivelEducacion,
      i,
      res = [];
    for (i = 0; i < ne.length; i++) {
      res.push(b.splice(0, length));
    }

    return res;
  }

  makeData() {
    let res = [],
      currentYear = new Date().getFullYear(),
      _from = d => `${d}-01-01`,
      _to = d => `${d}-07-07`,
      conf = ConstClass.AgeChartsConf,
      year1 = currentYear - conf.from,
      year2 = year1 - conf.step,
      ne = ConstClass.NivelEducacion,
      i;

    for (i = 0; i < ne.length; i++) {
      while (year1 > currentYear - conf.to) {
        res.push({
          promise: this.getInfo(_from(year2), _to(year1), ne[i]),
          label: `${currentYear - year1} - ${currentYear - year2}`
        });

        year1 -= conf.step;
        year2 -= conf.step;
      }

      year1 = currentYear - conf.from;
      year2 = year1 - conf.step;
    }

    return res;
  }

  makeQuery(_from, _to, ne) {
    let str1 = ConstClass.PROP_NAMES.nacimiento,
      str2 = ConstClass.PROP_NAMES.escolaridad,
      search = { query: {}, limit: 2 };

    search.query[str1] = { desde: _from, hasta: _to };
    search.query[str2] = ne;

    return JSON.stringify(search);
  }
}

export default withStyles(styles)(EdadTotalEducacion);