/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, {Component} from "react";
import * as ConstClass from  '../../../ConstValues.js';
import {Grid, Paper} from '@material-ui/core';
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

class EdadTotal extends Component{

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
	 		data : null
	 	}

	 	let promises = this.makeData();

		Promise.all(promises.map(d => d.promise)).then(d => {

			let data = {
				labels : promises.map(d => d.label),
				series : [d]
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
    let options = {
      plugins:[ChartistTooltip({
        appendToBody: true,
        transformTooltipTextFnc : value => format(value)
      })]
    };

		return(
			<Grid container spacing={3}>
				<Grid item sm={12}>
					<Paper className="pdn_d_box">
						<h2>Funcionarios por rango de edad (total)</h2>
						<ChartistGraph data={this.state.data} type={"Bar"} options={options} />
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
  /  hace la llamada al api para obtener un resultado
  /  en particular y regresa una promesa
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  getInfo(_from, _to){
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
  /  prepara la información para hacer las llamadas
  /  al API necesarias, utilizando la función getInfo.
  /  regresa un array de promesas y etiquetas
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  makeData(){
    let res = [],
        currentYear = (new Date()).getFullYear(),
        _from = d => `${d}-01-01`,
        _to   = d => `${d}-07-07`,
        conf = ConstClass.AgeChartsConf,
        year1 = currentYear - conf.from,
        year2 = year1 - conf.step
        // i;

    while(year1 > currentYear - conf.to){
        res.push({
          promise : this.getInfo(_from(year2), _to(year1) ),
          label : `${currentYear - year1} - ${currentYear - year2}`
        });
      year1-= conf.step;
      year2-= conf.step;
    }

    return res;
  }

	/*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  escribe el query de la petición al api (no la
  /  petición completa, solo el filtro)
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  makeQuery(_from, _to){
  	let str     = ConstClass.PROP_NAMES.nacimiento,
  	    search  = {query : {}, limit : 2};

	  search.query[str] = {"desde" : _from, "hasta" : _to};
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
export default EdadTotal;
