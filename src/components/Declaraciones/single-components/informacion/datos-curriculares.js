/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, {Component} from "react";
import {Grid, Paper} from '@material-ui/core';
class InfoCurriculum extends Component{
	render(){
		return(
			<Grid container spacing={3} direction={'row-reverse'} className="col-sm-offset-3 sidecontent">
				<Grid item xs={12} sm={9}>
			   <h2>Datos curriculares</h2>
						<Grid container spacing={3}>
							<Grid item xs={12}>
							  {this.props.items.grados_academicos.map( (grado, i) =>
								<Paper className="pdn_d_box" key={"grado-" + i}>
									<h3 className="pdn_data_p">{grado.grado_obtenido.valor} en <strong>{grado.carrera}</strong></h3>
									<p className="pdn_label">Institución Educativa </p>
									<p className="pdn_data_p">{grado.institucion_educativa}<br/>
									<span className="pnd_box_note">{grado.lugar_institucion_educativa.entidad_federativa.nom_ent}, {grado.lugar_institucion_educativa.pais.valor}</span>
									</p>
								  <Grid container spacing={3}>
										<Grid item xs={12} sm={6}>
											<p className="pdn_label">Estatus</p>
											<p className="pdn_data_p">{grado.estatus.valor}</p>
											<p className="pdn_label">Documento obtenido</p>
											<p className="pdn_data_p">{grado.documento_obtenido.valor}</p>
										</Grid>
										<Grid item xs={12} sm={6}>
											<p className="pdn_label">Año de conclusión</p>
											<p className="pdn_data_p">{grado.ano_conclusion}</p>
											<p className="pdn_label">Cédula Profesional</p>
											<p className="pdn_data_p">{grado.cedula_profesional}</p>
										</Grid>
									</Grid>
								</Paper>
							  )}
							</Grid>
						</Grid>
				</Grid>
		</Grid>
		);
	}

	items(){
    return this.props.profile.informacion_personal.datos_curriculares;
  }

}

export default InfoCurriculum;
