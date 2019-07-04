/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, {Component} from "react";
import { Switch, Route, Link } from 'react-router-dom';
import {Grid} from '@material-ui/core';

import Informacion from "./Informacion";
import Pasivos from "./Pasivos";
import Intereses from "./Intereses";
import Activos from "./Activos";
import Ingresos from "./Ingresos";

import JSONButton from './single-components/json-button';

/*
import Ingresos from "./Ingresos";
*/

import * as ConstClass from  './ConstValues.js';

const reducer = (accumulator, currentValue) => accumulator + currentValue;

/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // DEFINE LA CLASE PRINCIPAL
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
class PerfilMaterialUI extends Component{
	/*
	 * C O N S T R U C T O R
	 * ----------------------------------------------------------------------
	 */
	constructor(props){
		super(props);
		this.state = {
			profile : null
		}

		this.getProfile = this.getProfile.bind(this);
		this.ingresosAnualesNetos = this.ingresosAnualesNetos.bind(this);

		this.getProfile(this.props.match.params.id);

		// console.log(this.props);
	}

	/*
	 * R E N D E R
	 * ----------------------------------------------------------------------
	 */
	render(){
		if(!this.state.profile){
			// console.log("nel");
			return null;
	  }

	  // shortcut para el valor de la sección
	  let section = this.props.match.params.section;
		return(
			<div>
			  <div>

	{/*<div className="row pdn_card_m_info"> */}
	<Grid className="row pdn_card_m_info" container spacing={3}>
		{/*<div className="col-sm-6"> */}
		<Grid item sm={6}>
			{/*<div className="row">*/}
			<Grid container spacing={3}>
				{/*<div className="col-sm-4"> */}
				<Grid item sm={4}>
					<img alt="avatar2" src={`${process.env.PUBLIC_URL}/img/avatar.svg`} />
				{/*</div> */}
				</Grid>
				<Grid item sm={8}>
				{/*<div className="col-sm-8">*/}
					<h1>
					{this.state.profile.informacion_personal.informacion_general.nombres} {this.state.profile.informacion_personal.informacion_general.primer_apellido} {this.state.profile.informacion_personal.informacion_general.segundo_apellido}
					</h1>
					<p className="pdn_mail">{this.state.profile.informacion_personal.informacion_general.correo_electronico.laboral}</p>
					<p className="pdn_label">ENCARGO ACTUAL</p>
					<p>{this.state.profile.informacion_personal.datos_encargo_actual.empleo_cargo_comision}</p>
				</Grid>
				{/*</div>*/}

			{/*</div>*/}
			</Grid>
		</Grid>
		{/*</div>*/}

		{/*<div className="col-sm-3">*/}
		<Grid item sm={3}>
			<p className="pdn_label">ÁREA DE ADSCRIPCIÓN</p>
			<p>{this.state.profile.informacion_personal.datos_encargo_actual.area_adscripcion}</p>
			<p className="pdn_label">DEPENDENCIA</p>
			<p><strong>{this.state.profile.informacion_personal.datos_encargo_actual.ente_publico}</strong></p>
		{/*</div>*/}
		</Grid>

		<Grid item sm={3} className="right">
		{/*<div className="col-sm-3 right">*/}
				<p className="pdn_label">INGRESOS ANUALES NETOS</p>
				<h3><span className="pdn_score">${this.ingresosAnualesNetos()}</span></h3>
				<p><small>Actualización: {this.state.profile.informacion_personal.informacion_general.fecha_declaracion} </small></p>
		{/*</div>*/}
		</Grid>
	</Grid>
	{/*</div>*/}

	{/*<div className="row">*/}
	<Grid className="row pdn_card_m_info" container spacing={3}>
		{/*<div className="col-sm-12">*/}
		<Grid item sm={12}>
			<nav className="pdn_main_nav">
				<ul>
					<li>
						<Link className={ section === "informacion" ?"router-link-active" : ""} to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${this.props.match.params.id}/informacion`}>
						  <b className="pdn_i_ info"></b>Información
						</Link>
					</li>

					<li>
						<Link className={ section === "intereses" ?"router-link-active" : ""} to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${this.props.match.params.id}/intereses`}><b className="pdn_i_ intereses"></b>Intereses</Link>
					</li>

					<li>
						<Link className={ section === "ingresos" ?"router-link-active" : ""} to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${this.props.match.params.id}/ingresos`}><b className="pdn_i_ ingresos"></b>Ingresos</Link>
					</li>

					<li>
						<Link className={ section === "activos" ?"router-link-active" : ""} to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${this.props.match.params.id}/activos`}><b className="pdn_i_ activos"></b>Activos</Link>
					</li>

					<li>
						<Link className={ section === "pasivos" ?"router-link-active" : ""} to={`${process.env.PUBLIC_URL}/declaraciones/perfil/${this.props.match.params.id}/pasivos`}><b className="pdn_i_ pasivos"></b>Pasivos</Link>
					</li>
				</ul>
			</nav>
	  	{/*</div>*/}
	  	</Grid>
	{/*</div>*/}
	</Grid>


	<div className="row pnd_box">
		<Switch>
	    <Route path={`${process.env.PUBLIC_URL}/declaraciones/perfil/:id/informacion`} render={() => <Informacion section={this.props.match.params.subsection} profile={this.state.profile} /> }/>
	    <Route path={`${process.env.PUBLIC_URL}/declaraciones/perfil/:id/pasivos`} render={() => <Pasivos section={this.props.match.params.subsection} profile={this.state.profile} /> }/>
	    <Route path={`${process.env.PUBLIC_URL}/declaraciones/perfil/:id/intereses`} render={() => <Intereses section={this.props.match.params.subsection} profile={this.state.profile} /> }/>
	    <Route path={`${process.env.PUBLIC_URL}/declaraciones/perfil/:id/activos`} render={() => <Activos section={this.props.match.params.subsection} profile={this.state.profile} /> }/>
	    <Route path={`${process.env.PUBLIC_URL}/declaraciones/perfil/:id/ingresos`} render={() => <Ingresos section={this.props.match.params.subsection} profile={this.state.profile} /> }/>
	  </Switch>
	</div>
			<Grid  container spacing={3}>
				<Grid item sm={12} align="right">
					<JSONButton text={"descargar perfil"} profile={this.state.profile} />
				</Grid>
			</Grid>
	      </div>
      </div>
		);
	}

	/*
	 * M E T H O D S
	 * ----------------------------------------------------------------------
	 */

	/*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  hace el llamado al api para obtener la info
  /  de un servidor público
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  getProfile(id){
    let conf = Object.assign({}, ConstClass.fetchObj);

    conf.body = JSON.stringify({id : id});

    fetch(ConstClass.endpoint, conf)
      .then(response => response.json())
      .then(d => {
        // console.log("yaaaa:", d);
        this.setState({profile : d});
      });
  }

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  ingresosAnualesNetos(){
		  	let i, all = [];
		  	for(i = 0; i < ConstClass.Incomefields.length; i++){
		  		if(this.state.profile.ingresos[ConstClass.Incomefields[i]].length ){
		  			all = all.concat(this.state.profile.ingresos[ConstClass.Incomefields[i]].map(d => d.ingreso_bruto_anual));
		  		}
		  	}

		  	all = all.filter(d => d.moneda.codigo === "MXN").map(d => d.valor);

		  	return all.reduce(reducer).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
	}
}

/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default PerfilMaterialUI;
