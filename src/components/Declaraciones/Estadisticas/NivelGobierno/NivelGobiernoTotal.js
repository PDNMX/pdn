import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";

import * as ConstClass from "../../ConstValues.js";
import BarChart from "d3plus-react/es/src/BarChart";

import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "../../style";

let d3 = Object.assign({}, require("d3-format"));
let format = d3.format(",");

class NivelGobiernoTotal extends Component {
  state = {};
  constructor() {
    super();

    this.makeData = this.makeData.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.makeQuery = this.makeQuery.bind(this);
  }

  componentDidMount() {
    let promises = this.makeData();
    // let Color = {
    //   Estatal: ConstClass.colorsChart[1],
    //   Municipal: ConstClass.colorsChart[5],
    //   Federal: ConstClass.colorsChart[9]
    // };

    Promise.all(promises.map(d => d.promise)).then(d => {
      this.setState({
        methods: {
          data: d,
          x: "label",
          y: "total",
          xConfig: {
            title: "Nivel"
          },
          yConfig: {
            title: "Número de funcionarios"
          },
          tooltipConfig: {
            title: function(d) {
              return 'Nivel "' + d["label"] + '" : ' + format(d["total"]);
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
              Funcionarios por nivel de gobierno (total)
            </Typography>
            {this.state.methods && <BarChart config={this.state.methods} />}
          </Paper>
        </Grid>
      </Grid>
    );
  }

  getInfo(lv, label) {
    let connObj = Object.assign({}, ConstClass.fetchObj);

    connObj.body = this.makeQuery(lv);

    return fetch(ConstClass.endpoint, connObj)
      .then(response => response.json())
      .then(d => {
        return { total: d.total, label: label };
      });
  }

  makeData() {
    let res = [],
      gl = ConstClass.GobLevels,
      i;

    for (i = 0; i < gl.length; i++) {
      res.push({
        promise: this.getInfo(gl[i].key, gl[i].label),
        label: gl[i].label
      });
    }

    return res;
  }

  makeQuery(lv) {
    let str = ConstClass.PROP_NAMES.nivelGobierno,
      search = { query: {}, limit: 2 };

    search.query[str] = lv;
    return JSON.stringify(search);
  }
}

export default withStyles(styles)(NivelGobiernoTotal);
