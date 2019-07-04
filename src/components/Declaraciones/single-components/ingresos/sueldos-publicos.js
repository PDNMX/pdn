/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, {Component} from "react";
import {Grid, Paper} from '@material-ui/core';

// import BaseGraph from "../BaseGraph";

/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // DEFINE LA CLASE PRINCIPAL
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
class IngresosSueldosPublicos extends Component{
  constructor(props){
    super(props);

    let elems = this.props.profile.ingresos.sueldos_salarios_publicos.map(d => {
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
	  	 <h2>Sueldos y Salarios por el Encargo Público ({this.items().length})</h2>

        {/* row */ }
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className="pdn_d_box">
              <Paper className="pdn_bar_container">
                <Paper className="pdn_bar declarante"></Paper>
              </Paper>
              <p className="pdn_graph_label">
              <b className={ 'pdn_graph_label_item label declarante' }></b> Declarante</p>
            </Paper>
          </Grid>
        </Grid>
        {/* row ends*/ }

        <Grid container spacing={3}>
          <Grid item xs={12}>
            {this.items().map( (sueldo, i) =>
            <Paper className="pdn_d_box" key={"sueldo-" + i} id={"sueldo-" + i}>
              {/* row starts*/}
              <Grid container spacing={3} className="row pdn_border">
                <Grid item xs={6}>
                  <p><span className={ 'label declarante' }> Declarante</span></p>
                </Grid>
                <Grid item xs={6} className="right">
                  {/* <a onClick={(e) => this.toggl(sueldo, i, e)} href="#" className={"pdn_arrow " + (sueldo.show ?  "close" : "open")}></a> */}
                </Grid>
              </Grid>
              {/* row ends*/}

              {/* div close/open */}
              <div style={ {display : (sueldo.show ? "block" : "none")} }>
                {/* row */}
                <Grid container spacing={3} className="pdn_border">
                  {/* Ente público */}
                  <Grid item xs={12} sm={7}>
                    <p className="pdn_label">Ente público</p>
                    <h3>{sueldo.ente_publico.valor}</h3>
                  </Grid>
                  {/* Ingreso bruto anual*/}
                  <Grid item xs={12} sm={5}>
                    <p className="pdn_label right">Ingreso bruto anual</p>
                    <h3 className="pdn_amount right">${sueldo.ingreso_bruto_anual.valor} {sueldo.ingreso_bruto_anual.moneda.codigo} <span>({sueldo.ingreso_bruto_anual.moneda.moneda})</span> </h3>
                  </Grid>
                </Grid>
                {/* row ends*/}

                <Grid container spacing={3} className="pdn_border">
                  {/* R.F.C*/}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">R.F.C</p>
                    <p className="pdn_data_p">{sueldo.rfc}</p>
                  </Grid>
                  {/* Duración frecuencia */}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Duración / frecuencia</p>
                    <p className="pdn_data_p">{sueldo.ingreso_bruto_anual.duracion_frecuencia} {sueldo.ingreso_bruto_anual.unidad_temporal.valor}</p>
                  </Grid>
                  {/* Fecha de transacción */}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Fecha de transacción</p>
                    <p className="pdn_data_p">{sueldo.ingreso_bruto_anual.fecha_transaccion}</p>
                  </Grid>
                </Grid>
                {/* row ends*/}

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <p className="pdn_label">Observaciones</p>
                    <p className="pdn_data_p">{sueldo.observaciones}</p>
                  </Grid>
                </Grid>
              </div>
              {/* div close/open  ends*/}
            </Paper>
            )}
          </Grid>
          {/* pdn_d_box ends*/}
        </Grid>
        {/* row ends*/}
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
    return this.props.profile.ingresos.sueldos_salarios_publicos;
  }
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default IngresosSueldosPublicos;
