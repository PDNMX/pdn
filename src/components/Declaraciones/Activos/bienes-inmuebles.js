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
class ActivosBienesInmuebles extends Component{
  constructor(props){
    super(props);

    let elems = this.props.profile.activos.bienes_inmuebles.map(d => {
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
        <h2>Bienes inmuebles ({this.items().length})</h2>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className="pdn_d_box">
              <Paper className="pdn_bar_container">
                <Paper className="pdn_bar declarante"></Paper>
              </Paper>
              <p className="pdn_graph_label"><b className="pdn_graph_label_item label declarante"></b> Declarantes</p>
            </Paper>
          </Grid>
        </Grid>
        {/* row ends*/ }

        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* box starts*/}
            { this.items().map( (inmueble, i) =>
            <Paper className="pdn_d_box" key={"inmueble-" + i} id={"inmueble-" + i}>
              {/* row starts*/}
              <Grid container spacing={3} className="row pdn_border">
                <Grid item xs={6}>
                  <p><span className="label declarante"> Declarante</span></p>
                </Grid>
                <Grid item xs={6} className="right">
                  {/* <a onClick={(e) => this.toggl(inmueble, i, e)} heref="#" className={"pdn_arrow " + (inmueble.show ?  "close" : "open")}></a> */}
                </Grid>
              </Grid>
              {/* row ends*/}
              {/* div close/open */}
              <div style={ {display : (inmueble.show ? "block" : "none")} }>
                <Grid container spacing={3} className="pdn_border">
                  {/* Tipo de bien*/}
                  <Grid item xs={12} sm={7}>
                    <p className="pdn_label">Tipo de bien</p>
                    <h3>{inmueble.tipo_bien.valor}</h3>
                  </Grid>
                  {/* Precio de adquisición*/}
                  <Grid item xs={12} sm={5}>
                    <p className="pdn_label right">Precio de adquisición</p>
                    <h3 className="pdn_amount right">${inmueble.precio_adquisicion.valor} {inmueble.precio_adquisicion.moneda.codigo} <span>({inmueble.precio_adquisicion.moneda.moneda})</span> </h3>
                  </Grid>
                </Grid>
                {/* row ends*/}

                <Grid container spacing={3} className="pdn_border">
                  {/* Superficie del terreno*/}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Superficie del terreno</p>
                    <p className="pdn_data_p">{inmueble.superficie_terreno}</p>
                  </Grid>
                  {/* Superficie de construcción */}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Superficie de construcción</p>
                    <p className="pdn_data_p">{inmueble.superficie_construccion}</p>
                  </Grid>
                  {/* Valor Catastral*/}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Valor Catastral</p>
                    <p className="pdn_data_p">${inmueble.valor_catastral}</p>
                  </Grid>
                </Grid>
                {/* row ends*/}

                <Grid container spacing={3} className="pdn_border">
                  {/* Fecha de adquisición */}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Fecha de adquisición</p>
                    <p className="pdn_data_p">{inmueble.fecha_adquisicion}</p>
                  </Grid>
                  {/* Forma  de adquisición */}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Forma  de adquisición</p>
                    <p className="pdn_data_p">{inmueble.forma_adquisicion.valor}</p>
                  </Grid>
                  {/* Tipo de operación*/}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Tipo de operación</p>
                    <p className="pdn_data_p">{inmueble.tipo_operacion.valor}</p>
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
                      <th>Sector o industria</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{inmueble.relacion_persona_adquirio.valor}</td>
                      <td>{inmueble.porcentaje_propiedad}%
                        <div className="pdn_bar_container darken">
                          <div className="pdn_bar participacion" style={{ width: inmueble.porcentaje_propiedad + '%' }}></div>
                        </div>
                      </td>
                      <td>{inmueble.sector_industria.valor}</td>
                    </tr>
                  </tbody>
                </table>
                </Grid>
                {/* table ends */}

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <p className="pdn_label">Observaciones</p>
                    <p className="pdn_data_p">{inmueble.observaciones}</p>
                  </Grid>
                </Grid>
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
    return this.props.profile.activos.bienes_inmuebles;
  }
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default ActivosBienesInmuebles;
