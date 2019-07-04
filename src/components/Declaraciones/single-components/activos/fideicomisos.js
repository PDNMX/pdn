/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, {Component} from "react";
import {Grid, Paper} from '@material-ui/core';
/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // DEFINE LA CLASE PRINCIPAL
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
class ActivosFideicomisos extends Component{
  constructor(props){
    super(props);

    let elems = this.props.profile.activos.fideicomisos.map(d => {
                  // let item = d;
                  d.show = true;

                  return d;
                });

    this.state = {
      items : elems
    }

    this.toggl = this.toggl.bind(this);
  }
  /*
   * R E N D E R
   * ----------------------------------------------------------------------
   */
  render(){
    return(
      <Grid container spacing={3} direction={'row-reverse'} className="col-sm-offset-3 sidecontent">
        <Grid item xs={12} sm={9}>
        <h2>Fideicomisos ({this.items().length})</h2>

        {/* row */ }
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className="pdn_d_box">
              <Paper className="pdn_bar_container">
                <Paper className={ 'pdn_bar declarante'}></Paper>
              </Paper>
              <p className="pdn_graph_label">
              <b className={ 'pdn_graph_label_item label declarante'}></b> Declarante</p>
            </Paper>
          </Grid>
        </Grid>
        {/* row ends*/ }

        {/* row */ }
        <Grid container spacing={3}>
          <Grid item xs={12}>
            { this.items().map( (fideicomiso, i) =>
            <Paper className="pdn_d_box" key={"fideicomiso-" + i} id={"fideicomiso-" + i}>
              {/* row starts*/}
              <Grid container spacing={3} className="pdn_border">
                <Grid item xs={6}>
                  <p><span className={ 'label declarante'}> Declarante</span></p>
                </Grid>
                <Grid item xs={6} className="right">
                  {/* <a onClick={(e) => this.toggl(fideicomiso, i, e)} heref="#" className={"pdn_arrow " + (fideicomiso.show ?  "close" : "open")}></a> */}
                </Grid>
              </Grid>
              {/* row ends*/}

              {/* div close/open */}
              <div style={ {display : (fideicomiso.show ? "block" : "none")} }>
                {/* row */}
                <Grid container spacing={3} className="pdn_border">
                  {/* Tipo de fideicomiso*/}
                  <Grid item xs={12} sm={7}>
                    <p className="pdn_label">Tipo de fideicomiso</p>
                    <h3>{fideicomiso.tipo_fideicomiso.valor}</h3>
                  </Grid>
                  {/* Ingreso monetario obtenido*/}
                  <Grid item xs={12} sm={5}>
                    <p className="pdn_label right">Ingreso monetario obtenido</p>
                    <h3 className="pdn_amount right">${fideicomiso.ingreso_monetario_obtenido} {fideicomiso.moneda.moneda}</h3>
                  </Grid>
                </Grid>
                {/* row ends*/}

                <Grid container spacing={3} className="pdn_border">
                  {/* Identificador del fideicomiso */}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Identificador del fideicomiso</p>
                    <p className="pdn_data_p">{fideicomiso.identificador_fideicomiso}</p>
                  </Grid>
                  {/* Fecha de creación */}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Fecha de creación</p>
                      <p className="pdn_data_p">{fideicomiso.fecha_creacion}</p>
                  </Grid>
                  {/* Vigencia*/}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Vigencia</p>
                    <p className="pdn_data_p">{fideicomiso.vigencia}</p>
                  </Grid>
                </Grid>
                {/* row ends*/}

                <Grid container spacing={3} className="pdn_border">
                  {/* Objetivo del fideicomiso */}
                  <Grid item xs={12} sm={8}>
                    <p className="pdn_label">Objetivo del fideicomiso</p>
                    <p className="pdn_data_p">{fideicomiso.objetivo}</p>
                  </Grid>
                  {/* Tipo de operación*/}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Tipo de operación</p>
                    <p className="pdn_data_p">{fideicomiso.tipo_operacion.valor}</p>
                  </Grid>
                </Grid>
                {/* row ends*/}


                {/* table */}
                <Grid container spacing={3} className="pdn_mobile_table">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Residencia (México/Extranjero)</th>
                      <th>Porcentaje de la propiedad</th>
                      <th>Institución Fiduciaria</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{fideicomiso.residencia.valor}</td>
                      <td>{fideicomiso.porcentaje_propiedad_derechos_fiduciarios}%
                        <div className="pdn_bar_container darken">
                          <div className="pdn_bar participacion" style={{ width: fideicomiso.porcentaje_propiedad_derechos_fiduciarios + '%' }}></div>
                        </div>
                      </td>
                      <td>{fideicomiso.institucion_fiduciaria}</td>
                    </tr>
                  </tbody>
                </table>
                </Grid>
                {/* table ends */}

                {/* fideicomisario */}
                <Grid container spacing={3} className="pdn_border">
                  {/* fideicomisario nombre */}
                  <Grid item xs={12} sm={3}>
                    <p className="pdn_label">Fideicomisario</p>
                    <p className="pdn_data_p">{fideicomiso.fideicomisario.nombre}<br/>
                    <span className="pnd_box_note">{ fideicomiso.fideicomisario.domicilio.vialidad.tipo_vial }	{ fideicomiso.fideicomisario.domicilio.vialidad.nom_vial }	#{ fideicomiso.fideicomisario.domicilio.numExt }
      							<span>{ fideicomiso.fideicomisario.domicilio.numInt ? ", int. #" + fideicomiso.fideicomisario.domicilio.numInt : "" }</span><br/>
      							{ fideicomiso.fideicomisario.domicilio.localidad.nom_loc }, { fideicomiso.fideicomisario.domicilio.municipio.nom_mun }<br/>
      							{ fideicomiso.fideicomisario.domicilio.entidad_federativa.nom_ent }. C.P. { fideicomiso.fideicomisario.domicilio.cp }
      							</span>
                    </p>
                  </Grid>
                  {/* Fideicomisario RFC */}
                  <Grid item xs={12} sm={3}>
                    <p className="pdn_label">RFC</p>
                      <p className="pdn_data_p">{fideicomiso.fideicomisario.rfc}</p>
                  </Grid>
                  {/* CURP*/}
                  <Grid item xs={12} sm={3}>
                    <p className="pdn_label">CURP</p>
                    <p className="pdn_data_p">{fideicomiso.fideicomisario.curp}</p>
                  </Grid>
                  {/* Contitución */}
                  <Grid item xs={12} sm={3}>
                    <p className="pdn_label">Constitución</p>
                    <p className="pdn_data_p">{fideicomiso.fideicomisario.fecha_constitucion}</p>
                  </Grid>
                </Grid>
                {/* row ends*/}

                {/* fideicomitente */}
                <Grid container spacing={3} className="pdn_border">
                  {/* fideicomitente nombre */}
                  <Grid item xs={12} sm={3}>
                    <p className="pdn_label">Fideicomitente</p>
                    <p className="pdn_data_p">{fideicomiso.fideicomitente.nombre}<br/>
                    <span className="pnd_box_note">{ fideicomiso.fideicomitente.domicilio.vialidad.tipo_vial }	{ fideicomiso.fideicomitente.domicilio.vialidad.nom_vial }	#{ fideicomiso.fideicomitente.domicilio.numExt }
      							<span>{ fideicomiso.fideicomitente.domicilio.numInt ? ", int. #" + fideicomiso.fideicomitente.domicilio.numInt : "" }</span><br/>
      							{ fideicomiso.fideicomitente.domicilio.localidad.nom_loc }, { fideicomiso.fideicomitente.domicilio.municipio.nom_mun }<br/>
      							{ fideicomiso.fideicomitente.domicilio.entidad_federativa.nom_ent }. C.P. { fideicomiso.fideicomitente.domicilio.cp }
      							</span>
                    </p>
                  </Grid>
                  {/* Fideicomisario RFC */}
                  <Grid item xs={12} sm={3}>
                    <p className="pdn_label">RFC</p>
                      <p className="pdn_data_p">{fideicomiso.fideicomitente.rfc}</p>
                  </Grid>
                  {/* CURP*/}
                  <Grid item xs={12} sm={3}>
                    <p className="pdn_label">CURP</p>
                    <p className="pdn_data_p">{fideicomiso.fideicomitente.curp}</p>
                  </Grid>
                  {/* Contitución */}
                  <Grid item xs={12} sm={3}>
                    <p className="pdn_label">Constitución</p>
                    <p className="pdn_data_p">{fideicomiso.fideicomitente.fecha_constitucion}</p>
                  </Grid>
                </Grid>
                {/* row ends*/}

                {/* fiduciario */}
                <Grid container spacing={3} className="pdn_border">
                  {/* fiduciario nombre */}
                  <Grid item xs={12} sm={3}>
                    <p className="pdn_label">Fiduciario</p>
                    <p className="pdn_data_p">{fideicomiso.fiduciario.nombre}<br/>
                    <span className="pnd_box_note">{ fideicomiso.fiduciario.domicilio.vialidad.tipo_vial }	{ fideicomiso.fiduciario.domicilio.vialidad.nom_vial }	#{ fideicomiso.fiduciario.domicilio.numExt }
      							<span>{ fideicomiso.fiduciario.domicilio.numInt ? ", int. #" + fideicomiso.fiduciario.domicilio.numInt : "" }</span><br/>
      							{ fideicomiso.fiduciario.domicilio.localidad.nom_loc }, { fideicomiso.fiduciario.domicilio.municipio.nom_mun }<br/>
      							{ fideicomiso.fiduciario.domicilio.entidad_federativa.nom_ent }. C.P. { fideicomiso.fiduciario.domicilio.cp }
      							</span>
                    </p>
                  </Grid>
                  {/* Fideicomisario RFC */}
                  <Grid item xs={12} sm={3}>
                    <p className="pdn_label">RFC</p>
                      <p className="pdn_data_p">{fideicomiso.fiduciario.rfc}</p>
                  </Grid>
                  {/* CURP*/}
                  <Grid item xs={12} sm={3}>
                    <p className="pdn_label">CURP</p>
                    <p className="pdn_data_p">{fideicomiso.fiduciario.curp}</p>
                  </Grid>
                  {/* Contitución */}
                  <Grid item xs={12} sm={3}>
                    <p className="pdn_label">Constitución</p>
                    <p className="pdn_data_p">{fideicomiso.fiduciario.fecha_constitucion}</p>
                  </Grid>
                </Grid>
                {/* row ends*/}
                <Grid container spacing={3} className="pdn_border">
                  <Grid item xs={12}>
                    <p className="pdn_label">Observaciones</p>
                    <p className="pdn_data_p">{fideicomiso.observaciones}</p>
                  </Grid>
                </Grid>
              </div>
              {/* div close/open ends */}
            </Paper>
            )}
          </Grid>
        </Grid>
        </Grid>
      </Grid>
    );
  }

  /*
   * M E T H O D S
   * ----------------------------------------------------------------------
   */
   toggl(item, index, e){
     console.log(item, index, e);

     let items    = this.state.items,
         newItems = items.map( d => {
           if(item === d){
             d.show = !item.show;
           }

           return d;
         });

     this.setState({items : newItems});
   }
  items(){
    return this.props.profile.activos.fideicomisos;
  }
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default ActivosFideicomisos;
