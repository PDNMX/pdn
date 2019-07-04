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
import FuncionariosPorEntidadTotal from './state/FuncionariosPorEntidadTotal';
import FuncionariosPorEntidadPorcentaje from './state/FuncionariosPorEntidadPorcentaje';

import FuncionariosPorEntidadEdad from './state/FuncionariosPorEntidadEdad';
import FuncionariosPorEntidadEdadPorcentaje from './state/FuncionariosPorEntidadEdadPorcentaje';

import FuncionariosPorEntidadEducacion from './state/FuncionariosPorEntidadEducacion';
import FuncionariosPorEntidadEducacionPorcentaje from './state/FuncionariosPorEntidadEducacionPorcentaje';

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // DEFINE LA CLASE PRINCIPAL
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
class State extends Component{

	/*
	 * R E N D E R
	 * ----------------------------------------------------------------------
	 */

	render(){
		let cat = this.props.match.params.categoria;
		return(
			<div>
				<Grid item sm={3} className="col-sm-3 sidebar">
					<h2>Por entidad</h2>
					<ul>
				  	<li>
				  	  <Link to={`${process.env.PUBLIC_URL}/declaraciones/estadistica/entidad-federativa`} className={ !cat ? "router-link-exact-active router-link-active" : "" }>Funcionarios por entidad</Link>
				  	</li>
				  	<li>
				  	  <Link to={`${process.env.PUBLIC_URL}/declaraciones/estadistica/entidad-federativa/gobierno-y-edad`} className={ cat === "gobierno-y-edad" ? "router-link-exact-active router-link-active" : "" }>Funcionarios por entidad y edad</Link>
				  	</li>
				  	<li>
				  	  <Link to={`${process.env.PUBLIC_URL}/declaraciones/estadistica/entidad-federativa/gobierno-y-educacion`} className={ cat === "gobierno-y-educacion" ? "router-link-exact-active router-link-active" : "" }>Funcionarios por entidad y educación</Link>
				  	</li>
				  </ul>
				</Grid>

				<Grid container spacing={3} direction={'row-reverse'} className="col-sm-offset-3 sidecontent">
					<Grid item sm={9}>
					{ this.porEntidad() }
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
	porEntidad(){
		let cat = this.props.match.params.categoria;
		if(!cat){
			return(
			  <div>
			    <FuncionariosPorEntidadTotal />
			    <FuncionariosPorEntidadPorcentaje />
			  </div>
			);
	  }
	  else if(cat === "gobierno-y-edad"){
	  	return(
	  		<div>
					<FuncionariosPorEntidadEdad />
					<FuncionariosPorEntidadEdadPorcentaje />
	  		</div>
	  	);
	  }
	  else if(cat === "gobierno-y-educacion"){
	  	return(
				<div>
					<FuncionariosPorEntidadEducacion />
					<FuncionariosPorEntidadEducacionPorcentaje />
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
export default State;
