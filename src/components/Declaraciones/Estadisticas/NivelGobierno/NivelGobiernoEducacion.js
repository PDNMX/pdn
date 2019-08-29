import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";

import * as ConstClass from "../../ConstValues.js";
import BarChart from "d3plus-react/es/src/BarChart";

import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "../../style";

let d3 = Object.assign({}, require("d3-format"));
let format = d3.format(",");

class NivelGobiernoEducacion extends Component {
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
      Preescolar: ConstClass.colorsChart[1],
      Primaria: ConstClass.colorsChart[5],
      Secundaria: ConstClass.colorsChart[2],
      Bachillerato: ConstClass.colorsChart[6],
      Licenciatura: ConstClass.colorsChart[3],
      Maestría: ConstClass.colorsChart[8],
      Doctorado: ConstClass.colorsChart[4]
    };

    Promise.all(promises.map(d => d.promise)).then(d => {
      this.setState({
        methods: {
          data: d,
          x: "label",
          y: "total",
          groupBy: "nivel",
          stacked: true,
          xConfig: {
            title: "Nivel"
          },
          yConfig: {
            title: "Número de funcionarios"
          },
          tooltipConfig: {
            title: function(d) {
              return (
                'Nivel educativo"' + d["nivel"] + '" : ' + format(d["total"])
              );
            }
          },
          height: 400,
          shapeConfig: {
            label: false,
            fill: (d, i) => Color[d.nivel]
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
              Funcionarios por nivel de gobierno y nivel educativo (total)
            </Typography>
            {this.state.methods && <BarChart config={this.state.methods} />}
          </Paper>
        </Grid>
      </Grid>
    );
  }

  getInfo(ne, gl, label) {
    let connObj = Object.assign({}, ConstClass.fetchObj);

    connObj.body = this.makeQuery(ne, gl);

    return fetch(ConstClass.endpoint, connObj)
      .then(response => response.json())
      .then(d => {
        return { total: d.total, nivel: ne.valor, label: label };
      });
  }

  buildMatrix(data) {
    let b = [...data],
      gl = ConstClass.GobLevels,
      ne = ConstClass.NivelEducacion,
      i,
      res = [];
    for (i = 0; i < ne.length; i++) {
      res.push(b.splice(0, gl.length));
    }

    return res;
  }

  makeData() {
    let res = [],
      gl = ConstClass.GobLevels,
      ne = ConstClass.NivelEducacion,
      i,
      j;

    for (i = 0; i < ne.length; i++) {
      for (j = 0; j < gl.length; j++) {
        res.push({
          promise: this.getInfo(ne[i], gl[j].key, gl[j].label),
          label: gl[j].label
        });
      }
    }

    return res;
  }

  makeQuery(ne, gl) {
    let str1 = ConstClass.PROP_NAMES.nivelGobierno,
      str2 = ConstClass.PROP_NAMES.escolaridad,
      search = { query: {}, limit: 2 };

    search.query[str1] = gl;
    search.query[str2] = ne.codigo;

    return JSON.stringify(search);
  }
}

export default withStyles(styles)(NivelGobiernoEducacion);
