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

class PropiedadTotal extends Component {
  constructor() {
    super();

    this.makeData = this.makeData.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.makeQuery = this.makeQuery.bind(this);

    this.state = {
      data: null
    };

    let promises = this.makeData();

    Promise.all(promises.map(d => d.promise)).then(d => {
      let data = {
        labels: promises.map(d => d.label),
        series: [d]
      };

      this.setState({ data: data });
    });
  }

  render() {
    if (!this.state.data) return null;
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
              Funcionarios por propiedad (área de terreno total)
            </Typography>
            <ChartistGraph
              data={this.state.data}
              type={"Bar"}
              options={options}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }

  getInfo(range) {
    let connObj = Object.assign({}, ConstClass.fetchObj);

    connObj.body = this.makeQuery(range);

    return fetch(ConstClass.endpoint, connObj)
      .then(response => response.json())
      .then(d => {
        return d.total;
      });
  }

  makeData() {
    let res = [],
      gl = ConstClass.propertyChartConf,
      i;

    for (i = 0; i < gl.length; i++) {
      res.push({
        promise: this.getInfo(gl[i]),
        label: this.makeLabel(gl[i])
      });
    }

    return res;
  }

  makeLabel(range) {
    let r1 = range[0] ? range[0] : 0,
      r2 = range[1] ? range[1] : "o más";

    return `${r1} - ${r2}`;
  }

  makeQuery(range) {
    let str = ConstClass.PROP_NAMES.superficieTerreno,
      search = { query: {}, limit: 2 };

    search.query[str] = {
      desde: range[0] ? range[0] : 0,
      hasta: range[1] ? range[1] : 999999999
    };

    return JSON.stringify(search);
  }
}

export default withStyles(styles)(PropiedadTotal);
