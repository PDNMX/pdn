/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, {Component} from "react";
import { Grid, Paper} from '@material-ui/core';

class InfoExperiencia extends Component{
	render(){
		return(
			<Grid container spacing={3} direction={'row-reverse'} className="sidecontent">
				<Grid item xs={12} sm={9}>
					<h2>Experiencia laboral</h2>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Paper className="pdn_d_box">
								<p className="pdn_graph_label"><b className="pdn_graph_label_item label publico"></b> Ámbito público</p>
							</Paper>
						</Grid>
					</Grid>

					<Grid container spacing={3}>
						<Grid item xs={12}>
							{ this.props.items.map( (job, i) =>
							<Paper className="pdn_d_box">

								<Grid container spacing={3}>
									<Grid item xs={6}>
										<p className="pnd_box_note pdn_gray" key={"job-" + i}>Del {job.fecha_ingreso} al {job.fecha_salida}</p>
									</Grid>
									<Grid item xs={6}>
										<p className="right"><span className={ 'label ' + job.ambito.valor.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")}>Ámbito {job.ambito.valor}</span></p>
									</Grid>
								</Grid>

								<Grid container spacing={3} className="pdn_border">
									<Grid item xs={12}>
										 <h3 className="pdn_data_p">{job.cargo_puesto}</h3>
									</Grid>
								</Grid>

								<Grid container spacing={3} className="pdn_border">
									<Grid item xs={12} sm={6}>
										<p className="pdn_label">Institución</p>
										<p className="pdn_data_p">{job.nombre_institucion}<br/>
												<span className="pnd_box_note">{ job.direccion.vialidad.tipo_vial }	{ job.direccion.vialidad.nom_vial }	#{ job.direccion.numExt }
												<span>{ job.direccion.numInt ? ", int. #" + job.direccion.numInt : "" }</span><br/>
												{ job.direccion.localidad.nom_loc }, { job.direccion.municipio.nom_mun }<br/>
												{ job.direccion.entidad_federativa.nom_ent }. C.P. { job.direccion.cp }
												</span>
												</p>
									</Grid>
									<Grid item xs={12} sm={6}>
											<p className="pdn_label">Unidad Administrativa / Área</p>
											<p className="pdn_data_p">{job.unidad_administrativa}</p>
									</Grid>
								</Grid>

								<Grid container spacing={3} className="pdn_border">
									<Grid item xs={12} sm={6}>
										<p className="pdn_label">Nivel de gobierno</p>
										<p className="pdn_data_p">{job.nivel_gobierno.valor}</p>
									</Grid>
									<Grid item xs={12} sm={6}>
										<p className="pdn_label">Poder</p>
										<p className="pdn_data_p">{job.poder_ente.valor}</p>
									</Grid>
								</Grid>

								<Grid container spacing={3} className="pdn_border">
									<Grid item xs={12} sm={6}>
										<p className="pdn_label">Sector/Industria</p>
										<p className="pdn_data_p">{job.sector_industria.valor}</p>
									</Grid>
									<Grid item xs={12} sm={6}>
										<p className="pdn_label">Nivel del encargo</p>
										<p className="pdn_data_p">{job.nivel_encargo}</p>
									</Grid>
								</Grid>
								<Grid container spacing={3}>
									<Grid item xs={12} sm={12}>
										<p className="pdn_label">Funciones principales</p>
										{ job.funciones_principales.map( (d, j) =>
										<p className="pdn_data_p" key={"fun-prin-" + j}>{d.valor}</p>
									  )}
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
    return this.props.profile.informacion_personal.experiencia_laboral;
  }

}

export default InfoExperiencia;
