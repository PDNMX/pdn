/*
	////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, {Component} from "react";
import {Paper, Grid} from '@material-ui/core';

import BaseGraph from "../single-components/BaseGraph";

let d3 = Object.assign({}, require("d3-format"));

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

    let fakeData = [
      {
        name : "Sueldos",
        amount : [50000, 0, 0, 0, 0, 0]
      },

      {
        name : "Otros sueldos",
        amount : [100000, 20000, 20000, 20000, 0, 0]
      },

      {
        name : "Actividad profesional",
        amount : [150000, 0, 0, 0, 0, 0]
      },

      {
        name : "Actividad empresarial",
        amount : [250000,0, 0, 0, 0, 0]
      },

      {
        name : "Actividad económica",
        amount : [30000, 0, 0, 0, 0, 0]
      },

      {
        name : "Arrendamiento",
        amount : [33000, 0, 0, 0, 0, 0]
      },

      {
        name : "Intereses",
        amount : [43000, 20000, 0, 0, 0, 0]
      },

      {
        name : "Premios",
        amount : [13000, 0, 0, 0, 0, 0]
      },

      {
        name : "Otros ingresos",
        amount : [3000, 0, 20000, 0, 0, 0]
      },

      {
        name : "Enajenación de bienes",
        amount : [13000, 0, 0, 0, 0, 20000]
      }
    ];

    return(
        <Grid container spacing={3} direction={'row-reverse'} className="sidecontent">
          <Grid item xs={12} sm={9}>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <Paper className="pdn_d_box">
                <BaseGraph data={fakeData} format={d3.format("$,")} />
                <p className="pdn_graph_label right">
                <b className='pdn_graph_label_item label declarante'></b> Declarante
                <b className='pdn_graph_label_item label conyuge'></b> Conyugé
                <b className='pdn_graph_label_item label hijos'></b> Hijo/Hija
                <b className='pdn_graph_label_item label padres'></b> Padre/Madre
                <b className='pdn_graph_label_item label suegros'></b> Suegro/Suegra
                <b className='pdn_graph_label_item label otro'></b> Otro
                </p>
                </Paper>
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
