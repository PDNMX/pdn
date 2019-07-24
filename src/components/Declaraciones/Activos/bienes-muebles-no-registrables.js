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
class ActivosBienesMueblesNoRegistrables extends Component{
  constructor(props){
    super(props);

    let elems = this.props.profile.activos.bienes_muebles_no_registrables.map(d => {
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
        <h2>Bienes muebles no registrables ({this.items().length})</h2>
        {/* row bars */ }
        <Grid container spacing={3}>
          <Grid item xs={12}>
            { this.items().map( (mueble, i) =>
            <Paper className="pdn_d_box">
              <Paper className="pdn_bar_container">
                <Paper className={ 'pdn_bar ' + mueble.titular_bien.valor.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")}></Paper>
              </Paper>
              <p className="pdn_graph_label">
              <b className={ 'pdn_graph_label_item label ' + mueble.titular_bien.valor.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")}></b> {mueble.titular_bien.valor}</p>
            </Paper>
            )}
          </Grid>
        </Grid>
        {/* row bars ends*/ }

        {/* row */ }
        <Grid container spacing={3}>
          <Grid item xs={12}>
            { this.items().map( (mueble, i) =>
            <Paper className="pdn_d_box" key={"mueble-" + i} id={"mueble-" + i}>
              {/* row starts*/}
              <Grid container spacing={3} className="row pdn_border">
                <Grid item xs={6}>
                  <p><span className={ 'label ' + mueble.titular_bien.valor.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")}> {mueble.titular_bien.valor}</span></p>
                </Grid>
                <Grid item xs={6} className="right">
                  {/* <a onClick={(e) => this.toggl(mueble, i, e)} heref="#" className={"pdn_arrow " + (mueble.show ?  "close" : "open")}></a> */}
                </Grid>
              </Grid>
              {/* row ends*/}

              {/* div close/open */}
              <div style={ {display : (mueble.show ? "block" : "none")} }>
                {/* row */}
                <Grid container spacing={3} className="row pdn_border">
                  {/* Tipo de bien*/}
                  <Grid item xs={12} sm={7}>
                    <p className="pdn_label">Tipo de bien</p>
                    <h3>{mueble.tipo_bien.valor}</h3>
                  </Grid>
                  {/* Precio de adquisición*/}
                  <Grid item xs={12} sm={5}>
                    <p className="pdn_label right">Precio de adquisición</p>
                    <h3 className="pdn_amount right">${mueble.precio_adquisicion.valor} {mueble.precio_adquisicion.moneda.codigo} <span>({mueble.precio_adquisicion.moneda.moneda})</span> </h3>
                  </Grid>
                </Grid>
                {/* row ends*/}

                <Grid container spacing={3} className="row pdn_border">
                  {/* Descripción*/}
                  <Grid item  xs={12}>
                    <p className="pdn_label">Descripción</p>
                    <p className="pdn_data_p">{mueble.descripcion}</p>
                  </Grid>
                </Grid>
                {/* row ends*/}

                <Grid container spacing={3} className="row pdn_border">
                  {/* Fecha de adquisición */}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Fecha de adquisición</p>
                    <p className="pdn_data_p">{mueble.fecha_adquisicion}</p>
                  </Grid>
                  {/* Forma  de adquisición */}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Forma  de adquisición</p>
                    <p className="pdn_data_p">{mueble.forma_adquisicion.valor}</p>
                  </Grid>
                  {/* Tipo de operación*/}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Tipo de operación</p>
                    <p className="pdn_data_p">{mueble.tipo_operacion.valor}</p>
                  </Grid>
                </Grid>
                {/* row ends*/}

                {/* table */}
                <Grid container spacing={3} className="pdn_mobile_table">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Relación con la persona que lo adquirio </th>
                      <th>Porcentaje de la propiedad</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{mueble.relacion_quien_adquirio.valor}</td>
                      <td>{mueble.porcentaje_propiedad}%
                        <div className="pdn_bar_container darken">
                          <div className="pdn_bar participacion" style={{ width: mueble.porcentaje_propiedad + '%' }}></div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                </Grid>
                {/* table ends */}

                <p className="pdn_label">Observaciones</p>
                <p className="pdn_data_p">{mueble.observaciones}</p>

              </div>
              {/* div close/open  ends*/}

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
    return this.props.profile.activos.bienes_muebles_no_registrables;
  }
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default ActivosBienesMueblesNoRegistrables;
