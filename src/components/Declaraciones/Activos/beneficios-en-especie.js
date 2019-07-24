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
class ActivosBeneficiosEnEspecie extends Component{
  constructor(props){
    super(props);

    let elems = this.props.profile.activos.uso_especie_propiedad_tercero.map(d => {
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
        <h2>Uso o Beneficios en Especie Propiedad de un Tercero ({this.items().length})</h2>

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
            { this.items().map( (beneficio, i) =>
            <Paper className="pdn_d_box" key={"beneficio-" + i} id={"beneficio-" + i}>
              {/* row starts*/}
              <Grid container spacing={3}  className="pdn_border">
                  <Grid item xs={6}>
                    <p><span className={ 'label declarante'}> Declarante</span></p>
                  </Grid>
                <Grid item xs={6} className="right">
                  {/* <a onClick={(e) => this.toggl(beneficio, i, e)} heref="#" className={"pdn_arrow " + (beneficio.show ?  "close" : "open")}></a> */}
                </Grid>
              </Grid>
              {/* row ends*/}

              {/* div close/open */}
              <div style={ {display : (beneficio.show ? "block" : "none")} }>
                {/* row */}
                <Grid container spacing={3} className="pdn_border">
                  {/* Tipo de bien*/}
                  <Grid item xs={12}sm={7}>
                    <p className="pdn_label">Tipo de bien</p>
                    <h3>{beneficio.tipo_bien}</h3>
                  </Grid>
                  {/* Ingreso monetario obtenido*/}
                  <Grid item xs={12} sm={5}>
                    <p className="pdn_label right">Valor del mercado</p>
                    <h3 className="pdn_amount right">${beneficio.valor_mercado.valor} {beneficio.valor_mercado.moneda.codigo} <span>({beneficio.valor_mercado.moneda.moneda})</span></h3>
                  </Grid>
                </Grid>
                {/* row ends*/}

                {/* table */}
                <Grid className="pdn_mobile_table">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Relación con Propietario del Bien</th>
                      <th>Fecha de inicio</th>
                      <th>Sector/Industria</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span className={ 'label ' + beneficio.relacion_persona.valor.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")}> {beneficio.relacion_persona.valor}</span></td>
                      <td>{beneficio.fecha_inicio}</td>
                      <td>{beneficio.sector_industria.valor}</td>
                    </tr>
                  </tbody>
                </table>
                </Grid>
                {/* table ends */}

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <p className="pdn_label">Observaciones</p>
                    <p className="pdn_data_p">{beneficio.observaciones}</p>
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
    return this.props.profile.activos.uso_especie_propiedad_tercero;
  }
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default ActivosBeneficiosEnEspecie;
