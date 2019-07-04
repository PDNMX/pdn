/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, {Component} from "react";
import { Grid,  Paper} from '@material-ui/core';

class InfoPuesto extends Component{
	render(){
		return(
		<Grid container spacing={3} direction={'row-reverse'} className="sidecontent">
			<Grid item xs={12} sm={9}>
				<h2>Puesto actual</h2>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={8}>
						<Paper className="pdn_d_box">
							<h3 className="pdn_data_p">{ this.props.profile.informacion_personal.datos_encargo_actual.empleo_cargo_comision}</h3>
							<p className="pdn_label">Área de adscripción</p>
							<p className="pdn_data_p pnd_box_note"><strong>{ this.props.profile.informacion_personal.datos_encargo_actual.area_adscripcion}</strong><br/>
							{ this.props.profile.informacion_personal.datos_encargo_actual.direccion_encargo.vialidad.tipo_vial }	{ this.props.profile.informacion_personal.datos_encargo_actual.direccion_encargo.vialidad.nom_vial }	#{ this.props.profile.informacion_personal.datos_encargo_actual.direccion_encargo.numExt }
							<span>{ this.props.profile.informacion_personal.datos_encargo_actual.direccion_encargo.numInt ? ", int. #" + this.props.profile.informacion_personal.datos_encargo_actual.direccion_encargo.numInt : "" }</span><br/>
							{ this.props.profile.informacion_personal.datos_encargo_actual.direccion_encargo.localidad.nom_loc }, { this.props.profile.informacion_personal.datos_encargo_actual.direccion_encargo.municipio.nom_mun }<br/>
							{ this.props.profile.informacion_personal.datos_encargo_actual.direccion_encargo.entidad_federativa.nom_ent }. C.P. { this.props.profile.informacion_personal.datos_encargo_actual.direccion_encargo.cp }
							</p>
							<p className="pdn_label">Dependencia</p>
							<p className="pdn_data_p"><a href="./puesto-actual">{ this.props.profile.informacion_personal.datos_encargo_actual.ente_publico}</a></p>
							<p className="pdn_label">Nivel de gobierno</p>
							<p className="pdn_data_p">{ this.props.profile.informacion_personal.datos_encargo_actual.nivel_gobierno.valor}</p>
							<p className="pdn_label">Poder</p>
							<p className="pdn_data_p">{ this.props.profile.informacion_personal.datos_encargo_actual.poder_juridico.valor}</p>
							<p className="pdn_label">Sector/Industria</p>
							<p className="pdn_data_p">{ this.props.profile.informacion_personal.datos_encargo_actual.sector_industria.valor}</p>
						</Paper>
					</Grid>

					<Grid item xs={12} sm={4}>
						<Paper className="pdn_d_box">
							<p className="pdn_data_p">
								{ !this.props.items.contratado_honorarios ? "Sin contrato por honorarios" : "Contrato por honorarios"}
							</p>
							<p className="pdn_label">Nivel de encargo</p>
							<p className="pdn_data_p"><a href="./puesto-actual">{this.props.items.nivel_encargo}</a></p>
							<p className="pdn_label">Funciones</p>

							{this.props.items.funciones_principales.map( (d,i) =>
								<p className="pdn_data_p" key={"funciones-p-" + i}>{d.valor}</p>
							)}

							<p className="pdn_label">Fecha de ingreso</p>
							<p className="pdn_data_p">{this.props.items.fecha_posesion}</p>
						</Paper>
					</Grid>
				</Grid>
			</Grid>
	</Grid>
		);
	}

	items(){
    return this.props.profile.informacion_personal.datos_encargo_actual;
  }
}

export default InfoPuesto;
