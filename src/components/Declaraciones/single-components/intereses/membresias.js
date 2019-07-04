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
class InteresesMembresias extends Component{
  constructor(props){
    super(props);

    let elems = this.props.profile.intereses.membresias.map(d => {
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
          <h2>Membresías ({this.items().length})</h2>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className="pdn_d_box">
                <Paper className="pdn_bar_container">
                  <Paper className="pdn_bar declarante"></Paper>
                </Paper>
                <p className="pdn_graph_label"> <b className={ 'pdn_graph_label_item label declarante' }></b> Declarante</p>
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              {/* box starts*/}
              { this.items().map( (interes, i) =>
              <Paper className="pdn_d_box" key={"interes-" + i}>
                <Grid container spacing={3} className="row pdn_border">
                  <Grid item xs={6}>
                    <p><span className="label declarante"> Declarante</span></p>
                  </Grid>
                  <Grid item xs={6} className="right">
                    {/* <a onClick={(e) => this.toggl(interes, i, e)} heref="#" className={"pdn_arrow " + (interes.show ?  "close" : "open")}></a> */}
                  </Grid>
                </Grid>
                {/* row ends*/}
                {/* div close/open */}
                <div style={ {display : (interes.show ? "block" : "none")} }>
                  <Grid container spacing={3} className="pdn_border">
                    {/* Nombre de institución */}
                    <Grid item xs={12} sm={9}>
                      <p className="pdn_label">Nombre de institución</p>
                      <h3>{interes.nombre_institucion} </h3>
                      <p className="pdn_data_p pnd_box_note pdn_gray">{interes.domicilio.vialidad.tipo_vial+' '+interes.domicilio.vialidad.nom_vial+' No.' +interes.domicilio.numExt+ ' No. Int.'+interes.domicilio.numInt }
                      <br/>  { interes.domicilio.localidad.nom_loc+', '+interes.domicilio.municipio.nom_mun+', '+interes.domicilio.entidad_federativa.nom_ent+', '+interes.domicilio.pais.valor+' C.P. '+interes.domicilio.cp } </p>
                    </Grid>
                    {/* inicio */}
                    <Grid item xs={12} sm={3}>
                      <p className="pdn_label">Fecha de inicio</p>
                      <p className="pdn_data_p">{interes.fecha_inicio} </p>
                    </Grid>
                  </Grid>
                  {/* row ends*/}

                  <Grid container spacing={3} className="pdn_border">
                    {/* Tipo de institución*/}
                    <Grid item xs={12} sm={6}>
                      <p className="pdn_label">Tipo de institución</p>
                      <p className="pdn_data_p">{interes.tipo_institucion.valor} </p>
                    </Grid>
                    {/* Naturaleza de membresía*/}
                    <Grid item xs={12} sm={6}>
                      <p className="pdn_label">Naturaleza de membresía</p>
                      <p className="pdn_data_p">{interes.naturaleza_membresia.valor} </p>
                    </Grid>
                  </Grid>
                  {/* row ends*/}

                  {/* table */}
                  <Grid container spacing={3} className="pdn_mobile_table">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Puesto o rol</th>
                          <th>Pagado</th>
                          <th>Sector o industria</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{interes.puesto_rol}</td>
                          <td><b className= { 'pdn_' + interes.pagado}></b> {interes.pagado ? "Sí": "No"}</td>
                          <td>{interes.sector_industria.valor}</td>
                        </tr>
                      </tbody>
                    </table>
                  </Grid>
                  {/* table ends */}
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <p className="pdn_label">Observaciones</p>
                      <p className="pdn_data_p">{interes.observaciones} </p>
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
    return this.props.profile.intereses.membresias;
  }
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default InteresesMembresias;
