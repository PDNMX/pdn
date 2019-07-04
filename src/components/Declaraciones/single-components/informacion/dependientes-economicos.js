/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, {Fragment, Component} from "react";
import { Grid,  Paper} from '@material-ui/core';

class InfoDependientes extends Component{

	render(){
		return(
			<Grid container spacing={3} direction={'row-reverse'} className="col-sm-offset-3 sidecontent">
			<Grid item xs={12} sm={9}>
			  <h2>Dependientes económicos ({this.items().length})</h2>
			  <Grid container spacing={3}>
				  <Grid item xs={12}>
				  	<Paper className="pdn_d_box">
				  		<Paper className="pdn_bar_container">
					  		<Paper className="pdn_bar conyuge"></Paper>
					  	</Paper>
				  		<p className="pdn_graph_label"><b className="pdn_graph_label_item label conyuge"></b> Cónyugue</p>
				  	</Paper>
			  	</Grid>
		  	</Grid>


		  <Grid container spacing={3}>
			  <Grid item xs={12}>
			  { this.items().map( (dependiente, i) =>
				  <Paper className="pdn_d_box" key={"dependiente-" + i}>


					  <Grid container spacing={3} className="pdn_border">
					  	<Grid item xs={12} sm={6}>
						  	<p><span className={ 'label ' + dependiente.tipo_relacion.valor.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")}> {dependiente.tipo_relacion.valor}</span></p>
						  </Grid>
						</Grid>

					  <Grid container spacing={3} className="pdn_border">
						  <Grid item xs={12} sm={6}>
						  	<p className="pdn_label">Sector / Industria</p>
						  	<p className="pdn_data_p">{dependiente.sector_industria.valor}</p>
					  	</Grid>
					  	<Grid item xs={12} sm={6}>
						  	<p className="pdn_label">Proveedor o Contratista de Gobierno</p>
						  	<p className="pdn_data_p">{!dependiente.proveedor_contratista_gobierno ? "No" : "Sí"}</p>
						  </Grid>
				  	</Grid>

				  	<Grid container spacing={3} className="pdn_border">
						  <Grid item xs={12} sm={6}>
							  <p className="pdn_label">Intereses en el mismo Sector/Industria</p>
						  	<p className="pdn_data_p">{!dependiente.tiene_intereses_mismo_sector_declarante ? "No" : "Sí"}</p>
					  	</Grid>
						  <Grid item xs={12} sm={6}>
							  <p className="pdn_label">Desarrolla actividades de cabildeo en el mismo Sector/Industria</p>
							  <p className="pdn_data_p">{!dependiente.desarrolla_cabildeo_sector_declarante ? "No" : "Sí"}</p>
						  </Grid>
					  </Grid>

					  <Grid container spacing={3} className="pdn_border">
					    <Grid item xs={12} sm={12}>
					      <p className="pdn_label">Observaciones</p>
					      <p className="pdn_data_p">{dependiente.observaciones}</p>
					    </Grid>
					  </Grid>

					{ dependiente.beneficiario_programa_publico.map( (programa, j) =>
					<Fragment key={"programa-" + i + "-" + j}>
						<Grid container spacing={3} className="pdn_border">
						  <Grid item xs={12} sm={6}>
							  <p className="pdn_label">Beneficiaro de programa</p>
							  <p className="pdn_data_p">{programa.nombre_programa}</p>
						  </Grid>
						  <Grid item xs={12} sm={6}>
							  <p className="pdn_label">Orden de Gobierno que otorga el apoyo</p>
							  <p className="pdn_data_p">{programa.institucion_otorga_apoyo}</p>
						  </Grid>
						</Grid>

						<Grid container spacing={3}>
						  <Grid item xs={12} sm={6}>
						  	<p className="pdn_label">Tipo de apoyo</p>
						  	<p className="pdn_data_p">{programa.tipo_apoyo.valor}</p>
						  </Grid>
						  <Grid item xs={12} sm={6}>
						  	<p className="pdn_label">Valor del Apoyoo</p>
						  	<p className="pdn_data_p">${programa.valor_apoyo}</p>
					  	</Grid>
						</Grid>
					</Fragment>
				  )}

				</Paper>
			  )}
			</Grid>
		</Grid>
	  </Grid>
	</Grid>
		);
	}

	items(){
    return this.props.profile.informacion_personal.dependientes_economicos;
  }

}

export default InfoDependientes;
