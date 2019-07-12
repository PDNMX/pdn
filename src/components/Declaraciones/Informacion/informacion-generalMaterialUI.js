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
	<Grid container spacing={24} direction={'row-reverse'} className="sidecontent">
	{/*<div className="col-sm-9 col-sm-offset-3 sidecontent">*/}
	<Grid item sm={9}>
		<h2>Información general</h2>

		{/*<div className="row">*/}
		<Grid container spacing={24}>
			{/*<div className="col-sm-7">*/}
			<Grid item sm={7}>
			  <Paper className="pdn_d_box">
				{/*<div className="pdn_d_box">*/}
					<p className="pdn_label">Nacionalidades</p>
					{ this.props.items.nacionalidades.map((d, i) =>
					  <p className="pdn_data_p" key={"nac-" + i}>{d.valor}</p>
					)}
					<p className="pdn_label">Lugar de nacimiento</p>
					<p className="pdn_data_p">{this.props.items.entidad_federativa_nacimiento.nom_agee}</p>
				{/*</div>*/}
				</Paper>
			{/*</div>*/}
			</Grid>
			{/*<div className="col-sm-5">*/}
			<Grid item sm={5}>
				{/*<div className="pdn_d_box">*/}
				<Paper className="pdn_d_box">
					<p className="pdn_label">Estado Civil</p>
					<p className="pdn_data_p">{this.props.items.estado_civil.valor}</p>
					<p className="pdn_label">Regimen matrimonial</p>
					<p className="pdn_data_p">{this.props.items.regimen_matrimonial.valor}</p>
				{/*</div>*/}
				</Paper>
			</Grid>
			{/*</div>*/}
		</Grid>
		{/*</div>*/}
	{/*</div>*/}
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
