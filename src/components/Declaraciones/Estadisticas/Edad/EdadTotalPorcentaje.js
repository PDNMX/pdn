import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";

import * as ConstClass from "../../ConstValues";
import ChartistGraph from "react-chartist";
import "../../css/chartist.min.css";
import "../../css/chartist-plugin-tooltip.css";
import ChartistTooltip from "chartist-plugin-tooltips-updated";

import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "../../style";

let d3 = Object.assign({}, require("d3-format"));
let format = d3.format(",.2");

class EdadTotalPorcentaje extends Component {
  constructor() {
    super();

    this.makeData = this.makeData.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.makeQuery = this.makeQuery.bind(this);

    this.state = {
      data: null,
      options: ConstClass.StatsChartOptions.donutOptions
    };

    let promises = this.makeData();

    Promise.all(promises.map(d => d.promise)).then(d => {
      let total = d.reduce(ConstClass.reducer);
      let data = {
        labels: promises.map(d => d.label),
        series: d.map(d => format((d / total) * 100))
      };

      this.setState({ data: data });
    });
  }

  render() {
    if (!this.state.data) return null;

    let st = this.state;
    let colors = ConstClass.ChartColors;

    let _options = {
      plugins: [
        ChartistTooltip({
          appendToBody: true,
          transformTooltipTextFnc: value => format(value) + "%"
        })
      ]
    };

    let options = Object.assign(st, _options);
    let { classes } = this.props;

    return (
      <Grid container spacing={3} className={classes.rootSubseccion}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography className={classes.titulo}>
              Funcionarios por rango de edad (porcentaje)
            </Typography>
            <ChartistGraph
              data={{ series: st.data.series }}
              type={"Pie"}
              options={options}
            />
            <Typography component="div">
              <ul className={classes.listaGraficas}>
                {this.state.data.labels.map((d, i) => (
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

  getInfo(_from, _to) {
    let connObj = Object.assign({}, ConstClass.fetchObj);

    connObj.body = this.makeQuery(_from, _to);

    return fetch(ConstClass.endpoint, connObj)
      .then(response => response.json())
      .then(d => {
        return d.total;
      });
  }

  makeData() {
    let res = [],
      currentYear = new Date().getFullYear(),
      _from = d => `${d}-01-01`,
      _to = d => `${d}-07-07`,
      conf = ConstClass.AgeChartsConf,
      year1 = currentYear - conf.from,
      year2 = year1 - conf.step;
    while (year1 > currentYear - conf.to) {
      res.push({
        promise: this.getInfo(_from(year2), _to(year1)),
        label: `${currentYear - year1} - ${currentYear - year2}`
      });
      year1 -= conf.step;
      year2 -= conf.step;
    }

    return res;
  }

  makeQuery(_from, _to) {
    let str = ConstClass.PROP_NAMES.nacimiento,
      search = { query: {}, limit: 2 };

    search.query[str] = { desde: _from, hasta: _to };
    return JSON.stringify(search);
  }
}

export default withStyles(styles)(EdadTotalPorcentaje);
