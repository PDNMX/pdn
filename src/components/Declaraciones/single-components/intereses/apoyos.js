/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, {Component} from "react";
import { Grid,  Paper} from '@material-ui/core';

/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // DEFINE LA CLASE PRINCIPAL
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
class InteresesApoyos extends Component{
  constructor(props){
    super(props);

    let elems = this.props.profile.intereses.apoyos_beneficios_publicos.map(d => {
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
        <h2>Apoyos ({this.items().length})</h2>
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
                  {/*programa*/}
                  <Grid item xs={12} sm={9}>
                    <p className="pdn_label">Programa</p>
                    <h3>{interes.programa}</h3>
                  </Grid>
                  {/* valor anual*/}
                  <Grid item xs={12} sm={3}>
                    <p className="pdn_label">Valor anual del apoyo</p>
                    <h3 className="pdn_amount right">${interes.valor_anual_apoyo} </h3>
                  </Grid>
                </Grid>
                {/* row ends*/}

                <Grid container spacing={3} className="pdn_border">
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Institución otorgante</p>
                    <p className="pdn_data_p" >{interes.institucion_otorgante}</p>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Nivel de Gobierno</p>
                    <p className="pdn_data_p" >{interes.nivel_orden_gobierno.valor}</p>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <p className="pdn_label">Tipo de Apoyo</p>
                    <p className="pdn_data_p" >{interes.tipo_apoyo.valor}</p>
                  </Grid>
                </Grid>
                {/* row ends*/}

                <Grid container spacing={3}>
                  <Grid item xs={12} m={3}>
                    <p className="pdn_label">Es beneficiario</p>
                    <p className="pdn_data_p"><b className= { 'pdn_' + interes.es_beneficiario}></b> {interes.es_beneficiario ? "Sí" : "No"}</p>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <p className="pdn_label">Explicación</p>
                    <p className="pdn_data_p">{interes.observaciones}</p>
                  </Grid>
                </Grid>
                {/* row ends*/}

              </div>
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
    return this.props.profile.intereses.apoyos_beneficios_publicos;
  }
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default InteresesApoyos;
