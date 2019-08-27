import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "../../style";

import * as ConstClass from "../../ConstValues";
import BarChart from "d3plus-react/es/src/BarChart";

let d3 = Object.assign({}, require("d3-format"));
let format = d3.format(",");

class EdadTotal extends Component {
  state = {};

  constructor() {
    super();

    this.makeData = this.makeData.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.makeQuery = this.makeQuery.bind(this);
  }

  componentDidMount() {
    let promises = this.makeData();

    Promise.all(promises.map(d => d.promise)).then(d => {
      let data = d.map((value, index) => {
        return {
          name: promises[index].label,
          value: value
        };
      });

      this.setState({
        methods: {
          data: data,
          x: "name",
          y: "value",
          xConfig: {
            title: "Rango de edad"
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
            fill: (d, i) => ConstClass.colorsChart[i]
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
              Funcionarios por rango de edad (total)
            </Typography>
            {this.state.methods && <BarChart config={this.state.methods} />}
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
    // i;

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

export default withStyles(styles)(EdadTotal);
