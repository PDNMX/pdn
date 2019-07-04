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
class ActivosCuentasPorCobrar extends Component{
  constructor(props){
    super(props);

    let elems = this.props.profile.activos.cuentas_por_cobrar.map(d => {
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
          <h2>Cuentas por cobrar ({this.items().length})</h2>
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
              { this.items().map( (cuentas, i) =>
              <Paper className="pdn_d_box" key={"cuentas-" + i} id={"cuentas-" + i}>
                {/* row starts*/}
                <Grid container spacing={3} className="row pdn_border">
                  <Grid item xs={6}>
                    <p><span className={ 'label declarante'}> Declarante</span></p>
                  </Grid>
                  <Grid item xs={6} className="right">
                    {/* <a onClick={(e) => this.toggl(cuentas, i, e)} heref="#" className={"pdn_arrow " + (cuentas.show ?  "close" : "open")}></a> */}
                  </Grid>
                </Grid>
                {/* row ends*/}

                {/* div close/open */}
                <div style={ {display : (cuentas.show ? "block" : "none")} }>
                  {/* row */}
                  <Grid container spacing={3} className="row pdn_border">
                    {/* Número de registro */}
                    <Grid item xs={12} sm={4}>
                      <p className="pdn_label">Número de registro</p>
                      <h3>{cuentas.numero_registro}</h3>
                    </Grid>
                    {/* Fecha de préstamo*/}
                    <Grid item xs={12} sm={4}>
                      <p className="pdn_label center">Fecha de préstamo</p>
                      <p className="pdn_data_p center">{cuentas.fecha_prestamo}</p>
                    </Grid>
                    {/* Fecha de vencimiento*/}
                    <Grid item xs={12} sm={4}>
                      <p className="pdn_label right">Fecha de vencimiento</p>
                      <p className="pdn_data_p right">{cuentas.fecha_vencimiento}</p>
                    </Grid>
                  </Grid>
                  {/* row ends*/}

                  {/* table */}
                  <Grid container spacing={3} className="pdn_mobile_table">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Tasa de interés</th>
                        <th>Porcentaje de copropiedad</th>
                        <th>Sector/Industria</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{cuentas.tasa_interes}</td>
                        <td>{cuentas.porcentaje_copropiedad}%
                          <div className="pdn_bar_container darken">
                            <div className="pdn_bar participacion" style={{ width: cuentas.porcentaje_copropiedad + '%' }}></div>
                          </div>
                        </td>
                        <td>{cuentas.sector_industria.valor}</td>
                      </tr>
                    </tbody>
                  </table>
                  </Grid>
                  {/* table ends */}
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <p className="pdn_label">Observaciones</p>
                      <p className="pdn_data_p">{cuentas.observaciones}</p>
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
    return this.props.profile.activos.cuentas_por_cobrar;
  }
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default ActivosCuentasPorCobrar;
