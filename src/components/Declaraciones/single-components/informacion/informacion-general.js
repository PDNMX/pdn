/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, {Component} from "react";
import { Grid,  Paper} from '@material-ui/core';

class InfoGeneralMaterialUI extends Component{
	render(){
		return(
			<div>
	<Grid container spacing={3} direction={'row-reverse'} className="sidecontent">
		<Grid item xs={12} sm={9}>
		<h2>Información general</h2>

		<Grid container spacing={3}>
			<Grid item xs={12} sm={7}>
			  <Paper className="pdn_d_box">
					<p className="pdn_label">Nacionalidades</p>
					{ this.props.items.nacionalidades.map((d, i) =>
					  <p className="pdn_data_p" key={"nac-" + i}>{d.valor}</p>
					)}
					<p className="pdn_label">Lugar de nacimiento</p>
					<p className="pdn_data_p">{this.props.items.entidad_federativa_nacimiento.nom_ent}</p>
				</Paper>
			</Grid>
			<Grid item xs={12} sm={5}>
				<Paper className="pdn_d_box">
					<p className="pdn_label">Estado Civil</p>
					<p className="pdn_data_p">{this.props.items.estado_civil.valor}</p>
					<p className="pdn_label">Regimen matrimonial</p>
					<p className="pdn_data_p">{this.props.items.regimen_matrimonial.valor}</p>
				</Paper>
			</Grid>
		</Grid>
	  
	  </Grid>
	</Grid>
</div>
		);
	}

	items(){
    return this.props.profile.informacion_personal.informacion_general;
  }
}

export default InfoGeneralMaterialUI;
