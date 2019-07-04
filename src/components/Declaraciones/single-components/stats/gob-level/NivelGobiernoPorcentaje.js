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
import "../../../css/chartist.min.css";

import "../../../css/chartist-plugin-tooltip.css";
import ChartistTooltip from 'chartist-plugin-tooltips-updated';

let d3     = Object.assign({}, require("d3-format"));
let format = d3.format(",");

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // DEFINE LA CLASE PRINCIPAL
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
class NivelGobiernoPorcentaje extends Component{
	/*
	 * C O N S T R U C T O R
	 * ----------------------------------------------------------------------
	 */
	 constructor(){
	 	super();

	 	this.makeData  = this.makeData.bind(this);
	 	this.getInfo   = this.getInfo.bind(this);
	 	this.makeQuery = this.makeQuery.bind(this);

	 	this.state = {
	 		data    : null,
      options : ConstClass.StatsChartOptions.donutOptions
	 	}

	 	let promises = this.makeData();

		Promise.all(promises.map(d => d.promise)).then(d => {

      let total = d.reduce(ConstClass.reducer);
			let data = {
				labels : promises.map(d => d.label),
				series : d.map(d => (d/total) * 100 )
			}

      console.log("percent:", data);

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
    // let colors = ConstClass.ChartColors;

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
						<h2>Funcionarios por nivel de gobierno (porcentaje)</h2>
						<ChartistGraph data={ { series : st.data.series} } type={"Pie"} options={options} />
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
	getInfo(lv){
	  let connObj = Object.assign({}, ConstClass.fetchObj);

	  connObj.body = this.makeQuery(lv);

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
  makeData(){
  	let res = [],
  	    gl  = ConstClass.GobLevels,
  	    i;

  	for(i =0; i < gl.length; i++ ){
  		res.push({
  			promise : this.getInfo(gl[i].key),
  			label : gl[i].label
  		});
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
  makeQuery(lv){
  	let str     = ConstClass.PROP_NAMES.nivelGobierno,
  	    search  = {query : {}, limit : 2};

	  search.query[str] = lv;
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
export default NivelGobiernoPorcentaje;
