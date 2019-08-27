import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "../../style";

import * as ConstClass from "../../ConstValues";
import BarChart from "d3plus-react/es/src/BarChart";

let d3 = Object.assign({}, require("d3-format"));
let format = d3.format(",");

class EdadTotalEducacion extends Component {
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
      Maestría: ConstClass.colorsChart[7],
      Doctorado: ConstClass.colorsChart[4]
     
    };

    Promise.all(promises.map(d => d.promise)).then(d => {
      console.log("d", d);
      this.setState({
        methods: {
          data: d,
          x: "label",
          y: "total",
          groupBy: "nivel",
          stacked: true,
          xConfig: {
            title: "Rango de edad"
          },
          yConfig: {
            title: "Número de funcionarios"
          },
          tooltipConfig: {
            title: function(d) {
              return 'Nivel educativo"' + d["nivel"] + '" : ' + format(d["total"]);
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
              Funcionarios por rango de edad y nivel educativo (total)
            </Typography>
            {this.state.methods && <BarChart config={this.state.methods} />}
          </Paper>
        </Grid>
      </Grid>
    );
  }

  getInfo(_from, _to, ne, label) {
    let connObj = Object.assign({}, ConstClass.fetchObj);
    connObj.body = this.makeQuery(_from, _to, ne.codigo);

    return fetch(ConstClass.endpoint, connObj)
      .then(response => response.json())
      .then(d => {
        return {
          total: d.total,
          nivel: ne.valor,
          label: label
        };
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
      ne = [
        {
          codigo: "PREE",
          valor: "Preescolar"
        },
        {
          codigo: "PRIM",
          valor: "Primaria"
        },
        {
          codigo: "SECU",
          valor: "Secundaria"
        },
        {
          codigo: "BACH",
          valor: "Bachillerato"
        },
        {
          codigo: "LICE",
          valor: "Licenciatura"
        },
        {
          codigo: "MAES",
          valor: "Maestría"
        },
        {
          codigo: "DOCT",
          valor: "Doctorado"
        }
      ],
      i;

    for (i = 0; i < ne.length; i++) {
      while (year1 > currentYear - conf.to) {
        res.push({
          promise: this.getInfo(
            _from(year2),
            _to(year1),
            ne[i],
            `${currentYear - year1} - ${currentYear - year2}`
          ),
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
