/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, {Component} from "react";
import { Link } from 'react-router-dom';
import {Grid} from '@material-ui/core';
// import * as ConstClass from  '../../ConstValues.js';
// import ChartistGraph from 'react-chartist';
import "../../css/chartist.min.css"


import EducacionTotal from './education/EducacionTotal';
import EducacionPorcentaje from './education/EducacionPorcentaje';

import EducacionEdad from './education/EducacionEdad';
import EducacionEdadPorcentaje from './education/EducacionEdadPorcentaje';

import EducacionNivelGobierno from './education/EducacionNivelGobierno';
import EducacionNivelGobiernoPorcentaje from './education/EducacionNivelGobiernoPorcentaje';
/*
import EducacionEdad from './education/EducacionEdad';
import EducacionEdadPorcentaje from './education/EducacionEdadPorcentaje';
import EducacionNivelGobierno from './education/EducacionNivelGobierno';
import EducacionNivelGobiernoPorcentaje from './education/EducacionNivelGobiernoPorcentaje';
import EducacionPorcentaje from './education/EducacionPorcentaje';
import EducacionTotal from './education/EducacionTotal';
*/

class Education extends Component{

	/*
	 * R E N D E R
	 * ----------------------------------------------------------------------
	 */

	render(){
		let cat = this.props.match.params.categoria;
		// let st = this.state;
		return(

			<div>
				<Grid item sm={3} className="col-sm-3 sidebar">
					<h2>Nivel Educativo</h2>
					<ul>
				  	<li>
				  	  <Link to={`${process.env.PUBLIC_URL}/declaraciones/estadistica/educacion`} className={ !cat ? "router-link-exact-active router-link-active" : "" }>Funcionarios por nivel educativo</Link>
				  	</li>
				  	<li>
				  	  <Link to={`${process.env.PUBLIC_URL}/declaraciones/estadistica/educacion/estudios-y-edad`} className={ cat === "estudios-y-edad" ? "router-link-exact-active router-link-active" : "" }>Funcionarios por nivel educativo y edad</Link>
				  	</li>
				  	<li>
				  	  <Link to={`${process.env.PUBLIC_URL}/declaraciones/estadistica/educacion/estudios-y-gobierno`} className={ cat === "estudios-y-gobierno" ? "router-link-exact-active router-link-active" : "" }>Funcionarios por nivel educativo y nivel de gobierno</Link>
				  	</li>
				  </ul>
				</Grid>
				<Grid container spacing={3} direction={'row-reverse'} className="col-sm-offset-3 sidecontent">
					<Grid item sm={9}>
					{ this.educacionNav() }
					</Grid>
				</Grid>
			</div>
		);
	}
		/*
		 * T E M P L A T E S
		 * ----------------------------------------------------------------------
		 */

		/*
	  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
	  /
	  /
	  /
	  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
	  */
		educacionNav(){
			let cat = this.props.match.params.categoria;
			if(!cat){
				return(
				  <div>
				    <EducacionTotal />
				    <EducacionPorcentaje />
				  </div>
				);
		  }
		  else if(cat === "estudios-y-edad"){
		  	return(
		  		<div>
		  		  <EducacionEdad />
		  		  <EducacionEdadPorcentaje />
		  		</div>
		  	);
		  }
		  else if(cat === "estudios-y-gobierno"){
		  	return(
		  		<div>
		  		  <EducacionNivelGobierno />
		  		  <EducacionNivelGobiernoPorcentaje />
		  		</div>
		  	);
		  }
		  else{
		  	return null;
		  }
		}
}

export default Education;
