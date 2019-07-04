/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, {Component} from "react";
import { Grid, Paper} from '@material-ui/core';

import * as ConstClass from  '../../../ConstValues.js';
import ChartistGraph from 'react-chartist';
import "../../../css/chartist.min.css";
import "../../../css/chartist-plugin-tooltip.css";
import ChartistTooltip from 'chartist-plugin-tooltips-updated';

let d3     = Object.assign({}, require("d3-format"));
let format = d3.format(",.2");

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // DEFINE LA CLASE PRINCIPAL
  //
  ////////////////////////////////////////////////////////////////////////////////
*/

class EdadTotalPorcentaje extends Component{
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
				series : d.map(d => format((d/total) * 100) )
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
						<h2>Funcionarios por rango de edad (porcentaje)</h2>
						<ChartistGraph data={ { series : st.data.series} } type={"Pie"} options={ options } />
						<div className="pdn_divider"></div>
						<ul className="list_inline">
		        {this.state.data.labels.map( (d, i) =>
		          <li key={"ngel-" + i}>
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
  /
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
        ;

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
  /
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
export default EdadTotalPorcentaje;
