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
class ActivosBienesIntangibles extends Component{
  constructor(props){
    super(props);

    let elems = this.props.profile.activos.bienes_intangibles.map(d => {
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
      <Grid container spacing={3} direction={'row-reverse'} className="sidecontent">
        <Grid item xs={12} sm={9}>
        <h2>Bienes intangibles ({this.items().length})</h2>
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
            { this.items().map( (bienes, i) =>
            <Paper className="pdn_d_box" key={"bienes-" + i} id={"bienes-" + i}>
              {/* row starts*/}
              <Grid container spacing={3} className="row pdn_border">
                <Grid item xs={6}>
                  <p><span className={ 'label declarante'}> Declarante</span></p>
                </Grid>
                <Grid item xs={6} className="right">
                  {/* <a onClick={(e) => this.toggl(bienes, i, e)} heref="#" className={"pdn_arrow " + (bienes.show ?  "close" : "open")}></a> */}
                </Grid>
              </Grid>
              {/* row ends*/}

              {/* div close/open */}
              <div style={ {display : (bienes.show ? "block" : "none")} }>
                {/* row */}
                <Grid container spacing={3} className="pdn_border">
                  {/* ente_publico_encargado*/}
                  <Grid item xs={12} sm={5}>
                    <p className="pdn_label">Ente público encargado</p>
                    <h3>{bienes.ente_publico_encargado}</h3>
                  </Grid>
                  {/* Número de registro */}
                  <Grid item xs={12} sm={3}>
                    <p className="pdn_label">Número de registro</p>
                      <p className="pdn_data_p">{bienes.numero_registro}</p>
                  </Grid>
                  {/* Ingreso monetario obtenido*/}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label right">Precio de adquisición</p>
                    <h3 className="pdn_amount right">${bienes.precio_adquisicion.valor} {bienes.precio_adquisicion.moneda.codigo} <span>({bienes.precio_adquisicion.moneda.moneda})</span></h3>
                  </Grid>
                </Grid>
                {/* row ends*/}

                <Grid container spacing={3} className="pdn_border">
                  {/* Propietario registrado */}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Propietario registrado</p>
                    <p className="pdn_data_p">{bienes.propietario_registrado}</p>
                  </Grid>

                  {/* Fecha de registro*/}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Fecha de registro</p>
                    <p className="pdn_data_p">{bienes.fecha_registro}</p>
                  </Grid>

                  {/* Fecha de vencimiento*/}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Fecha de vencimiento</p>
                    <p className="pdn_data_p">{bienes.fecha_vencimiento}</p>
                  </Grid>
                </Grid>
                {/* row ends*/}

                {/* row */}
                <Grid container spacing={3} className="pdn_border">
                  {/* Descripción*/}
                  <Grid item xs={12} sm={12}>
                    <p className="pdn_label">Descripción</p>
                    <p className="pdn_data_p">{bienes.descripcion}</p>
                  </Grid>
                </Grid>
                {/* row ends*/}

                <Grid container spacing={3} className="pdn_border">
                  {/* Sector/Industria */}
                  <Grid item xs={12} sm={6}>
                    <p className="pdn_label">Sector/Industria</p>
                    <p className="pdn_data_p">{bienes.sector_industria.valor}</p>
                  </Grid>

                  {/* Tipo de operación*/}
                  <Grid item xs={12} sm={6}>
                    <p className="pdn_label">Tipo de operación</p>
                    <p className="pdn_data_p">{bienes.tipo_operacion.valor}</p>
                  </Grid>
                </Grid>
                {/* row ends*/}

                {/* table */}
                <Grid container spacing={3} className="pdn_mobile_table">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Forma  de adquisición</th>
                      <th>Porcentaje de Propiedad en Caso de Copropiedad</th>
                      <th>Precio total de adquisición si es copropiedad</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{bienes.forma_adquisicion.valor}</td>
                      <td>{bienes.porcentaje_copropiedad}%
                        <div className="pdn_bar_container darken">
                          <div className="pdn_bar participacion" style={{ width: bienes.porcentaje_copropiedad + '%' }}></div>
                        </div>
                      </td>
                      <td>${bienes.precio_total_copropiedad.valor} {bienes.precio_total_copropiedad.moneda.codigo} <span>({bienes.precio_total_copropiedad.moneda.moneda})</span></td>
                    </tr>
                  </tbody>
                </table>
                </Grid>
                {/* table ends */}

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <p className="pdn_label">Observaciones</p>
                    <p className="pdn_data_p">{bienes.observaciones}</p>
                  </Grid>
                </Grid>
              </div>
              {/* div close/open closes*/}
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
    return this.props.profile.activos.bienes_intangibles;
  }
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default ActivosBienesIntangibles;
