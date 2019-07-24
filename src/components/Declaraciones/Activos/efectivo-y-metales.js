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
class ActivosEfectivo extends Component{
  constructor(props){
    super(props);

    let elems = this.props.profile.activos.efectivo_metales.map(d => {
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
        <h2>Efectivo y metales ({this.items().length})</h2>
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
        <Grid container spacing={3}>
          <Grid item xs={12}>
            { this.items().map( (efectivo, i) =>
            <Paper className="pdn_d_box" key={"efectivo-" + i} id={"efectivo-" + i}>
              {/* row starts*/}
              <Grid container spacing={3} className="row pdn_border">
                <Grid item xs={6}>
                  <p><span className={ 'label declarante'}> Declarante</span></p>
                </Grid>
                <Grid item xs={6} className="right">
                  {/* <a onClick={(e) => this.toggl(efectivo, i, e)} heref="#" className={"pdn_arrow " + (efectivo.show ?  "close" : "open")}></a> */}
                </Grid>
              </Grid>
              {/* row ends*/}

              {/* div close/open */}
              <div style={ {display : (efectivo.show ? "block" : "none")} }>
                {/* row */}
                <Grid container spacing={3} className="row pdn_border">
                  {/*Tipo de metal*/}
                  <Grid item xs={12} sm={8}>
                    <p className="pdn_label">Tipo de metal</p>
                    <h3>{efectivo.tipo_metal.valor}</h3>
                  </Grid>
                  {/* Unidades*/}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label right">Unidades</p>
                    <h3 className="pdn_amount right">{efectivo.unidades}</h3>
                  </Grid>
                </Grid>
                {/* row ends*/}

                {/* row */}
                <Grid container spacing={3} className="row pdn_border">
                  {/*Tipo de moneda*/}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Tipo de moneda</p>
                    <p className="pdn_data_p">{efectivo.tipo_moneda.moneda}</p>
                  </Grid>
                  {/* Forma  de adquisición*/}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Forma  de adquisición</p>
                    <p className="pdn_data_p">{efectivo.forma_adquisicion.valor}</p>
                  </Grid>
                  {/* Tipo de operación*/}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Tipo de operación</p>
                    <p className="pdn_data_p">{efectivo.tipo_operacion.valor}</p>
                  </Grid>
                </Grid>
                {/* row ends*/}
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <p className="pdn_label">Observaciones</p>
                    <p className="pdn_data_p">{efectivo.observaciones_comentarios}</p>
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
    return this.props.profile.activos.efectivo_metales;
  }
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default ActivosEfectivo;
