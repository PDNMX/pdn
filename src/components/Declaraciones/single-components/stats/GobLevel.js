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
import NivelGobiernoTotal from './gob-level/NivelGobiernoTotal';
import NivelGobiernoPorcentaje from './gob-level/NivelGobiernoPorcentaje';

import NivelGobiernoEducacion from './gob-level/NivelGobiernoEducacion';
import NivelGobiernoEducacionPorcentaje from './gob-level/NivelGobiernoEducacionPorcentaje';

import NivelGobiernoEdad from './gob-level/NivelGobiernoEdad';
import NivelGobiernoEdadPorcentaje from './gob-level/NivelGobiernoEdadPorcentaje';

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // DEFINE LA CLASE PRINCIPAL
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
class GobLevel extends Component{

	/*
	 * R E N D E R
	 * ----------------------------------------------------------------------
	 */
	render(){
		let cat = this.props.match.params.categoria;
		return(
			<div>
				<Grid item sm={3} className="col-sm-3 sidebar">
					<h2>Nivel de Gobierno</h2>
				  <ul>
				  	<li>
				  	  <Link to={`${process.env.PUBLIC_URL}/declaraciones/estadistica/nivel-de-gobierno`} className={ !cat ? "router-link-exact-active router-link-active" : "" }>Nivel de gobierno</Link>
				  	</li>
				  	<li>
				  	  <Link to={`${process.env.PUBLIC_URL}/declaraciones/estadistica/nivel-de-gobierno/gobierno-y-edad`} className={ cat === "gobierno-y-edad" ? "router-link-exact-active router-link-active" : "" }>Nivel de gobierno y edad</Link>
				  	</li>
				  	<li>
				  	  <Link to={`${process.env.PUBLIC_URL}/declaraciones/estadistica/nivel-de-gobierno/gobierno-y-educacion`} className={ cat === "gobierno-y-educacion" ? "router-link-exact-active router-link-active" : "" }>Nivel de gobierno y educación</Link>
				  	</li>
				  </ul>
				</Grid>
					<Grid container spacing={3} direction={'row-reverse'} className="col-sm-offset-3 sidecontent">
						<Grid item sm={9}>
						{ this.nivelGobierno() }
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
	nivelGobierno(){
		let cat = this.props.match.params.categoria;
		if(!cat){
			return(
			  <div>
			    <NivelGobiernoTotal />
			    <NivelGobiernoPorcentaje />
			  </div>
			);
	  }
	  else if(cat === "gobierno-y-edad"){
	  	return(
	  		<div>
	  		  <NivelGobiernoEdad />
	  		  <NivelGobiernoEdadPorcentaje />
	  		</div>
	  	);
	  }
	  else if(cat === "gobierno-y-educacion"){
	  	return(
	  		<div>
	  		  <NivelGobiernoEducacion />
	  		  <NivelGobiernoEducacionPorcentaje />
	  		</div>
	  	);
	  }
	  else{
	  	return null;
	  }
	}
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default GobLevel;
