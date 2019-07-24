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
class ActivosInversiones extends Component{
  constructor(props){
    super(props);

    let elems = this.props.profile.activos.inversiones_cuentas_valores.map(d => {
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
        <h2>Inversiones, cuentas y valores ({this.items().length})</h2>
        {/* row */ }
        <Grid container spacing={3}>
          <Grid item xs={12}>
            { this.items().map( (inversion, i) =>
            <Paper className="pdn_d_box">
              <Paper className="pdn_bar_container">
                <Paper className={ 'pdn_bar ' + inversion.titular_bien.valor.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")}></Paper>
              </Paper>
              <p className="pdn_graph_label">
              <b className={ 'pdn_graph_label_item label ' + inversion.titular_bien.valor.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")}></b> {inversion.titular_bien.valor}</p>
            </Paper>
            )}
          </Grid>
        </Grid>
        {/* row ends*/ }


        <Grid container spacing={3}>
          <Grid item xs={12}>
            { this.items().map( (inversion, i) =>
            <Paper className="pdn_d_box" key={"inversion-" + i} id={"inversion-" + i}>
              {/* row starts*/}
              <Grid container spacing={3} className="pdn_border">
                <Grid item xs={6}>
                  <p><span className={ 'label ' + inversion.titular_bien.valor.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")}> {inversion.titular_bien.valor}</span></p>
                </Grid>
                <Grid item xs={6} className="right">
                  {/* <a onClick={(e) => this.toggl(inversion, i, e)} heref="#" className={"pdn_arrow " + (inversion.show ?  "close" : "open")}></a> */}
                </Grid>
              </Grid>
              {/* row ends*/}

              {/* div close/open */}
              <div style={ {display : (inversion.show ? "block" : "none")} }>
                {/* row */}
                <Grid container spacing={3} className="pdn_border">
                  {/*Tipo de bien*/}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Tipo de bien</p>
                    <h3>{inversion.tipo_inversion.valor}</h3>
                  </Grid>
                  {/* Tipo especifico de inversión*/}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Tipo especifico de inversión</p>
                    <p className="pdn_data_p">{inversion.tipo_especifico_inversion.valor}</p>
                  </Grid>
                  {/* Nombre de la Institución */}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Nombre de la Institución</p>
                    <p className="pdn_data_p">{inversion.nombre_institucion}</p>
                  </Grid>
                </Grid>
                {/* row ends*/}

                {/* row */}
                <Grid container spacing={3} className="pdn_border">
                  {/* Inversión Nacional o Extranjera */}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Inversión Nacional o Extranjera</p>
                    <p className="pdn_data_p">{inversion.nacional_extranjero.valor}</p>
                  </Grid>

                  {/* Tipo de moneda */}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Tipo de moneda</p>
                    <p className="pdn_data_p">{inversion.tipo_moneda.moneda}</p>
                  </Grid>

                  {/* Tipo de operación */}
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Tipo de operación</p>
                    <p className="pdn_data_p">{inversion.tipo_operacion.valor}</p>
                  </Grid>
                </Grid>
                {/* row ends*/}

                {/* table */}
                <Grid container spacing={3} className="pdn_mobile_table">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Forma  de adquisición</th>
                      <th>Porcentaje  de inversión del funcionario</th>
                      <th>Sector</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{inversion.forma_adquisicion.valor}</td>
                      <td>{inversion.porcentaje_inversion}%
                        <div className="pdn_bar_container darken">
                          <div className="pdn_bar participacion" style={{ width: inversion.porcentaje_inversion + '%' }}></div>
                        </div>
                      </td>
                      <td>{inversion.sector_industria.valor}</td>
                    </tr>
                  </tbody>
                </table>
                </Grid>
                {/* table ends */}
                <p className="pdn_label">Observaciones</p>
                <p className="pdn_data_p">{inversion.observaciones}</p>
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
    return this.props.profile.activos.inversiones_cuentas_valores;
  }
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default ActivosInversiones;
