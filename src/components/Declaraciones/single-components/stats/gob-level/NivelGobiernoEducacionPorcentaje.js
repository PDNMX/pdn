/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, {Component} from "react";
import {Grid, Paper} from '@material-ui/core';

import * as ConstClass from  '../../../ConstValues.js';
import ChartistGraph from 'react-chartist';
import "../../../css/chartist.min.css"

import "../../../css/chartist-plugin-tooltip.css";
import ChartistTooltip from 'chartist-plugin-tooltips-updated';

let d3     = Object.assign({}, require("d3-format"));
let format = d3.format(".4n");

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // DEFINE LA CLASE PRINCIPAL
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
class NivelGobiernoEducacionPorcentaje extends Component{

  /*
   * C O N S T R U C T O R
   * ----------------------------------------------------------------------
   */
   constructor(){
    super();

    this.makeData    = this.makeData.bind(this);
    this.getInfo     = this.getInfo.bind(this);
    this.makeQuery   = this.makeQuery.bind(this);
    this.buildMatrix = this.buildMatrix.bind();

    this.state = {
      data    : null,
      options : ConstClass.StatsChartOptions.donutOptions
    }

    let promises = this.makeData();

    Promise.all(promises.map(d => d.promise)).then(d => {

      let data = {
        labels : [...new Set(promises.map(d => d.label))],
        series : this.buildMatrix(d)
      }

      this.setState({data : data});
    });
   }

  /*
   * R E N D E R
   * ----------------------------------------------------------------------
   */
	render(){
		if(!this.state.data) return null;
    let st = this.state;
    let colors = ConstClass.ChartColors;

    let _options = {
      plugins:[ChartistTooltip({
        appendToBody: true,
        transformTooltipTextFnc : value => format(value) + "%"
      })]
    };

    let options = Object.assign(st, _options);
    return(
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <Paper className="pdn_d_box">
            <h2>Funcionarios por nivel de gobierno y nivel educativo (porcentaje)</h2>
            <nav className="pdn_viz">
              <ul>
              { this.state.data.series.map( (d,i) =>
                <li key={"ngepg-" + i}>
                  <ChartistGraph data={ {series : d} } type={"Pie"} options={options} />
                  <p>{this.state.data.labels[i]}</p>
                </li>
              )}
              </ul>
            </nav>
            <ul className="list_inline">
            {ConstClass.NivelEducacion.map( (d, i) =>
              <li key={"ngepl-" + i}>
                <span style={ {display: "inline-block", width: "1em", height: "1em", background: colors[i]} }>
                </span> {d}
              </li>
            )}
            </ul>
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
  getInfo(ne, gl){
    let connObj = Object.assign({}, ConstClass.fetchObj);

    connObj.body = this.makeQuery(ne, gl);

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
  buildMatrix(data){
    let b   = [...data],
        gl  = ConstClass.GobLevels,
        ne  = ConstClass.NivelEducacion,
        i, res = [];
    for(i =0; i < gl.length; i++ ){
      let _el   = b.splice(0, ne.length),
          total = _el.reduce(ConstClass.reducer),
          el    = _el.map(d => format((d/total) * 100) );
      res.push(el)
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
  makeData(){
    let res = [],
        gl  = ConstClass.GobLevels,
        ne  = ConstClass.NivelEducacion,
        i, j;

    for(i =0; i < gl.length; i++ ){
      for(j =0; j < ne.length; j++){
        res.push({
          promise : this.getInfo(ne[j], gl[i].key ),
          label   : gl[i].label
        });
      }
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
  makeQuery(ne, gl){
    let str1   = ConstClass.PROP_NAMES.nivelGobierno,
        str2   = ConstClass.PROP_NAMES.escolaridad,
        search = {query : {}, limit : 2};

    search.query[str1] = gl;
    search.query[str2] = ne;


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
export default NivelGobiernoEducacionPorcentaje;
