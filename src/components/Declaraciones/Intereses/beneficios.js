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
class InteresesBeneficios extends Component{
  constructor(props){
    super(props);

    let elems = this.props.profile.intereses.beneficios_gratuitos.map(d => {
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
        <h2>Beneficios gratuitos ({this.items().length})</h2>

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
            { this.items().map( (interes, i) =>
            <Paper className="pdn_d_box" key={"interes-" + i} id={"interes-" + i}>
              {/* row starts*/}
              <Grid container spacing={3} className="row pdn_border">
                <Grid item xs={6}>
                  <p><span className={ 'label declarante' }> Declarante</span></p>
                </Grid>
                <Grid item xs={6} className="right">
                  {/* <a onClick={(e) => this.toggl(interes, i, e)} heref="#" className={"pdn_arrow " + (interes.show ?  "close" : "open")}></a> */}
                </Grid>
              </Grid>
              {/* row ends*/}

              {/* div close/open */}
              <div style={ {display : (interes.show ? "block" : "none")} }>
                {/* row */}
                <Grid container spacing={3} className="pdn_border">
                  {/* Tipo de beneficio */}
                   <Grid item xs={12} sm={9}>
                    <p className="pdn_label">Tipo de beneficio</p>
                    <h3>{interes.tipo_beneficio}</h3>
                  </Grid>
                  {/*Valor de beneficio */}
                   <Grid item  xs={12} sm={3}>
                    <p className="pdn_label right">Valor de beneficio</p>
                    <h3 className="pdn_amount right">${interes.valor_beneficio}  </h3>
                  </Grid>
                </Grid>
                {/* row ends*/}
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                  <p className="pdn_label">Sector o industria</p>
                  <p className="pdn_data_p">{interes.sector_industria.valor}</p>
                  <p className="pdn_label">Observaciones</p>
                  <p className="pdn_data_p">{interes.observaciones}</p>
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
    return this.props.profile.intereses.beneficios_gratuitos;
  }
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default InteresesBeneficios;
