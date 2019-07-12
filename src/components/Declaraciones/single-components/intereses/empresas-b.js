/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, {Component} from "react";
import {Table, TableCell, TableBody, TableHead, TableRow, Grid, Paper} from '@material-ui/core';


/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // DEFINE LA CLASE PRINCIPAL
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
class InteresesEmpresas extends Component{
  constructor(props){
    super(props);

    let elems = this.props.profile.intereses.empresas_sociedades_asociaciones.map(d => {
                  let item = d;
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
        <Grid item sm={9}>
          <h2>Empresas, sociedades o asociaciones ({this.items().length})</h2>
          <Grid container spacing={24}>
            <Grid item sm={12}>
              <Paper className="pdn_d_box">
                <Paper className="pdn_bar_container">
                  <Paper className="pdn_bar declarante"></Paper>
                </Paper>
                <p className="pdn_graph_label"> <b className={ 'pdn_graph_label_item label declarante' }></b> Declarante</p>
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item sm={12}>
              {/* box starts*/}
              { this.items().map( (interes, i) =>
              <Paper className="pdn_d_box" key={"interes-" + i}>
                <Grid container spacing={3} className="row pdn_border">
                  <Grid item sm={6}>
                    <p><span className="label declarante"> Declarante</span></p>
                  </Grid>
                  <Grid item sm={6} className="right">
                    {/* <a onClick={(e) => this.toggl(interes, i, e)} heref="#" className={"pdn_arrow " + (interes.show ?  "close" : "open")}></a> */}
                  </Grid>
                </Grid>
                {/* row ends*/}
                {/* div close/open */}
                <div style={ {display : (interes.show ? "block" : "none")} }>
                  <Grid container spacing={3} className="pdn_border">
                    {/* empresa, sociedad o asociación */}
                    <Grid item sm={9}>
                      <p className="pdn_label">Nombre de la empresa, sociedad o asociación</p>
                      <h3> { interes.nombre_empresa_sociedad_asociacion } </h3>
                      <p className="pdn_data_p pnd_box_note pdn_gray">{interes.domicilio.vialidad.tipo_vial+' '+interes.domicilio.vialidad.nom_vial+' No.' +interes.domicilio.numExt+ ' No. Int.'+interes.domicilio.numInt}
                       <br/> { interes.domicilio.localidad.nom_loc+', '+interes.domicilio.municipio.nom_mun+', '+interes.domicilio.entidad_federativa.nom_agee+', '+interes.domicilio.pais.valor+' C.P. '+interes.domicilio.cp } </p>
                    </Grid>
                    {/* constitución */}
                    <Grid item sm={3}>
                      <p className="pdn_label">Fecha de constitución</p>
                      <p className="pdn_data_p">{interes.fecha_constitucion} </p>
                    </Grid>
                  </Grid>
                  {/* row ends*/}

                  <Grid container spacing={3} className="pdn_border">
                    {/* país*/}
                    <Grid item sm={4}>
                      <p className="pdn_label">País</p>
                      <p className="pdn_data_p">{interes.pais_registro.valor} </p>
                    </Grid>
                    {/* RFC*/}
                    <Grid item sm={4}>
                      <p className="pdn_label">R.F.C</p>
                      <p className="pdn_data_p">{interes.rfc} </p>
                    </Grid>
                    {/* # registro */}
                    <Grid item sm={4}>
                      <p className="pdn_label">Número de registro</p>
                      <p className="pdn_data_p">{interes.numero_registro} </p>
                    </Grid>
                  </Grid>
                  {/* row ends*/}

                  {/* table */}
                  <Grid container spacing={3} className="pdn_border">
                    <Grid item xs={12} className="pdn_mobile_table">
                    <Table className="table" style={ {overflowX : "auto", display : "block", whiteSpace: "nowrap"} }>
                      <TableHead>
                        <TableRow>
                          <TableCell>Rol</TableCell>
                          <TableCell>Actividad económica</TableCell>
                          <TableCell>Porcentaje de participación</TableCell>
                          <TableCell>otra cosa</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                          <TableRow>
                            <TableCell>
                              <strong>{interes.rol}</strong>
                            </TableCell>
                            <TableCell align="right"><b className= { 'pdn_' + interes.actividad_economica}></b> {interes.actividad_economica ? "Sí" : "No"}</TableCell>
                            <TableCell align="right">{interes.porcentaje_participacion}%
                              <div className="pdn_bar_container darken">
                                <div className="pdn_bar participacion" style={{ width: interes.porcentaje_participacion + '%' }}></div>
                              </div></TableCell>
                            <TableCell align="right">{interes.sector_industria.valor}</TableCell>
                          </TableRow>
                      </TableBody>
                    </Table>
                    </Grid>
                  </Grid>
                  {/* table ends */}
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
          if(item == d){
            d.show = !item.show;
          }

          return d;
        });

    this.setState({items : newItems});
  }

  items(){
    return this.props.profile.intereses.empresas_sociedades_asociaciones;
  }
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default InteresesEmpresas;
