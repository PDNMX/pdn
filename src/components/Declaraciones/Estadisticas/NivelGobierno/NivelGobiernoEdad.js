import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import * as ConstClass from "../../ConstValues.js";
import BarChart from "d3plus-react/es/src/BarChart";

import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "../../style";

let d3 = Object.assign({}, require("d3-format"));
let format = d3.format(",");

class NivelGobiernoEdad extends Component {
  state = {};
  constructor() {
    super();

    this.makeData = this.makeData.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.makeQuery = this.makeQuery.bind(this);
    this.buildMatrix = this.buildMatrix.bind();
  }

  componentDidMount() {
    let promises = this.makeData();
    let Color = {
      "18-28": 0,
      "28-38": 3,
      "38-48": 4,
      "48-58": 6,
      "58-68": 8
    };

    Promise.all(promises.map(d => d.promise)).then(d => {
      this.setState({
        methods: {
          data: d,
          x: "nivel",
          y: "total",
          groupBy: "label",
          stacked: true,
          xConfig: {
            title: "Nivel"
          },
          yConfig: {
            title: "Número de funcionarios"
          },
          tooltipConfig: {
            title: function(d) {
              return 'Rango "' + d["label"] + '" : ' + format(d["total"]);
            }
          },
          height: 400,
          shapeConfig: {
            label: false,
            fill: (d, i) =>
              ConstClass.colorsChart[Color[d.label.replace(/\s/g, "")]]
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
              Funcionarios por nivel de gobierno y rango de edad (total)
            </Typography>
            {this.state.methods && <BarChart config={this.state.methods} />}
          </Paper>
        </Grid>
      </Grid>
    );
  }

  getInfo(_from, _to, gl, label) {
    let connObj = Object.assign({}, ConstClass.fetchObj);
    connObj.body = this.makeQuery(_from, _to, gl.key);

    return fetch(ConstClass.endpoint, connObj)
      .then(response => response.json())
      .then(d => {
        return { total: d.total, nivel: gl.label, label: label };
        //return d;
      });
  }

  buildMatrix(data, response) {
    let b = [...data],
      gl = ConstClass.GobLevels,
      ra = [...new Set(response.map(d => d._label))],
      i,
      res = [];
    for (i = 0; i < ra.length; i++) {
      res.push(b.splice(0, gl.length));
    }

    return res;
  }

  makeData() {
    let res = [],
      gl = ConstClass.GobLevels,
      currentYear = new Date().getFullYear(),
      _from = d => `${d}-01-01`,
      _to = d => `${d}-07-07`,
      conf = ConstClass.AgeChartsConf,
      year1 = currentYear - conf.from,
      year2 = year1 - conf.step,
      i;

    while (year1 > currentYear - conf.to) {
      for (i = 0; i < gl.length; i++) {
        res.push({
          promise: this.getInfo(
            _from(year2),
            _to(year1),
            gl[i],
            `${currentYear - year1} - ${currentYear - year2}`
          ),
          label: gl[i].label,
          _label: `${currentYear - year1} - ${currentYear - year2}`
        });
      }
      year1 -= conf.step;
      year2 -= conf.step;
    }

    return res;
  }

  makeQuery(_from, _to, gl) {
    let str1 = ConstClass.PROP_NAMES.nacimiento,
      str2 = ConstClass.PROP_NAMES.nivelGobierno,
      search = { query: {}, limit: 2 };

    search.query[str1] = { desde: _from, hasta: _to };
    search.query[str2] = gl;

    return JSON.stringify(search);
  }
}

export default withStyles(styles)(NivelGobiernoEdad);
