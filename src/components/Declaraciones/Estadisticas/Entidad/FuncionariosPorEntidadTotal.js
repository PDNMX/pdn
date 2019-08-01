/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";

import * as ConstClass from "../../ConstValues.js";
import ChartistGraph from "react-chartist";
import "../../css/chartist.min.css";

import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "../../style";

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // DEFINE LA CLASE PRINCIPAL
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
class FuncionariosPorEntidadTotal extends Component {
  /*
   * C O N S T R U C T O R
   * ----------------------------------------------------------------------
   */
  constructor() {
    super();

    this.state = {
      ageFrom: 18,
      ageTo: 98,
      step: 10,
      data: null,
      fake: {
        labels: [
          "Puebla",
          "Ciudad de México",
          "Guanajuato",
          "Nuevo León",
          "Zacatecas",
          "Queretaro",
          "Tlaxcala"
        ],
        series: [[200, 100, 400, 123, 500, 200, 300]]
      },
      fake5: {
        labels: [
          "Puebla",
          "Ciudad de México",
          "Guanajuato",
          "Nuevo León",
          "Zacatecas",
          "Queretaro",
          "Tlaxcala"
        ],
        series: [
          [10000, 20000, 20000, 15000, 15000, 15000, 5000],
          [8000, 15000, 12000, 11000, 10000, 7000, 7000],
          [12000, 22000, 18000, 12000, 11000, 10000, 4000],
          [2000, 32000, 10000, 11000, 10000, 1000, 23000],
          [10000, 20000, 10000, 11000, 1000, 14000, 12000],
          [9000, 11000, 2000, 10000, 6000, 5000, 9000],
          [2000, 20000, 11000, 5000, 17000, 12000, 14000]
        ]
      },
      fake6: {
        series: [12, 15, 13, 20, 10, 20, 10]
      },
      labels: {
        _labels: [
          "20-30",
          "30-40",
          "40-50",
          "50-60",
          "60-70",
          "70-80",
          "80-90"
        ],
        __labels: [
          "Primaria",
          "Secundaria",
          "Preparatoria",
          "Licenciatura",
          "Maestría",
          "Doctorado",
          "post-doc"
        ],
        ___labels: [
          "Puebla",
          "Ciudad de México",
          "Guanajuato",
          "Nuevo León",
          "Zacatecas",
          "Queretaro",
          "Tlaxcala"
        ],
        labels: ["Federal", "Estatal", "Municipal"]
      },

      donutOptions: { donut: true, donutWidth: 30 }
    };

    this.getInfo = this.getInfo.bind(this);
    this.makeData = this.makeData.bind(this);

    let promises = this.makeData();

    Promise.all(promises.map(d => d.promise)).then(d => {
      console.log("res:", d);
    });
  }

  /*
   * R E N D E R
   * ----------------------------------------------------------------------
   */
  render() {
    let st = this.state;
    let { classes } = this.props;

    return (
      <Grid container spacing={3} className={classes.rootSubseccion}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography className={classes.titulo}>
              Funcionarios por entidad federativa (total)
            </Typography>
            <ChartistGraph data={st.fake} type={"Bar"} />
          </Paper>
        </Grid>        
      </Grid>
    );
  }

  /*
   * M E T H O D S
   * ----------------------------------------------------------------------
   */

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  getInfo(_from, _to) {
    let connObj = Object.assign({}, ConstClass.fetchObj);

    connObj.body = this.makeQuery(_from, _to);

    return fetch(ConstClass.endpoint, connObj)
      .then(response => response.json())
      .then(d => {
        return d.total;
      });
  }

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  makeData() {
    let currentYear = new Date().getFullYear(),
      _from = d => `${d}-01-01`,
      _to = d => `${d}-12-31`,
      st = this.state,
      i = currentYear - st.ageFrom,
      res = [];
    while (i > currentYear - st.ageTo) {
      res.push({
        label: currentYear - i + " - " + (currentYear - i + st.step),
        promise: this.getInfo(_from(i - 10), _to(i)).catch(error => {
          return error;
        }),
        from: _from(i - 10),
        to: _to(i)
      });
      i -= st.step;
    }

    return res;
  }

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  makeQuery(_from, _to) {
    let str = ConstClass.PROP_NAMES.nacimiento,
      search = { query: {}, limit: 2 };

    search.query[str] = { desde: _from, hasta: _to };
    return JSON.stringify(search);
  }
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default withStyles(styles)(FuncionariosPorEntidadTotal);
