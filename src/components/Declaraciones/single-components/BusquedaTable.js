/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, { Component } from 'react';
//import * as ConstClass from  '../ConstValues.js';

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // DEFINE LA CLASE PRINCIPAL
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
class BusquedaTable extends Component{
	
  constructor(){
		super();

		this.PaginationUL = this.PaginationUL.bind(this);
		this.PrevLI       = this.PrevLI.bind(this);
		this.NextLI       = this.NextLI.bind(this);

    this.selectPage = this.selectPage.bind(this);
    this.nextPage   = this.nextPage.bind(this);
    this.prevPage   = this.prevPage.bind(this);

    this._validateNewPage = this._validateNewPage.bind(this);

		this.state = {
			newPage : 0
		}
	}

	/*
   * R E N D E R
   * ----------------------------------------------------------------------
   */
	render(){
		return(
			<div>
			<table className="table">
			<thead>
				<tr>
					<th>nombre</th>
					<th>oficina</th>
					<th>cargo</th>
					<th>estado</th>
					<th>municipio</th>
				</tr>
			</thead>
			<tbody>
			{this.props.results.map( (compa, i) => this.ItemTR(compa, i) )}
			</tbody>
		</table>
		{this.PaginationUL()}
		</div>
		);
	}

  /*
   * T E M P L A T E S
   * ----------------------------------------------------------------------
   */

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  regresa un registro dentro de un <tr>
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */

  ItemTR(el, i){
    let data    = el.informacion_personal,
        general = data.informacion_general,
        encargo = data.datos_encargo_actual;
    return(
      <tr key={'result-tr-' + i}>
          <td>
            <a href={`${process.env.PUBLIC_URL}/perfil/${el._id}/informacion`}>
              {general.nombres} {general.primer_apellido} {general.segundo_apellido}
            </a>
          </td>
          <td>
            {encargo.ente_publico}
          </td>
          <td>
            {encargo.empleo_cargo_comision}
          </td>
          <td>
          {encargo.direccion_encargo.entidad_federativa.nom_ent}</td>
          <td>
          {encargo.direccion_encargo.municipio.nom_mun}</td>
        </tr>
    );
  }

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  regresa un <ul> con las herramientas
  /  de paginación
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  PaginationUL(){
    if(this.props.pages > 1){
      return(
        <ul>
        {this.PrevLI()}
        <li>
          <form onSubmit={this.selectPage}>
            <p>
              <input id="page-select" 
                     type="number" 
                     min="1" 
                     defaultValue={this.props.page + 1} />
               / {this.props.pages}
            </p>
          </form>
        </li>
        {this.NextLI()}
        </ul>
      );
    }

    return "";
  }

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  regresa un <li> con el botón de 
  /  página anterior
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  PrevLI(){
    if(this.props.page > 0 ){
      return(
        <li>
          <a href="#" onClick={this.prevPage}>anterior</a>
        </li>
      );
    }

    return null;
  }

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  regresa un <li> con el botón de 
  /  página siguiente
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  NextLI(){
    if(this.props.page < this.props.pages-1){
      return(
        <li>
          <a href="#" onClick={this.nextPage}>siguiente</a>
        </li>
      );
    }
    return null;
  }

	/*
   * M E T H O D S
   * ----------------------------------------------------------------------
   */

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  selecciona una nueva página en el rango disponible
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  selectPage(e){
    e.preventDefault();

    let item   = document.getElementById("page-select"),
        val    = item.value,
        newVal = this._validateNewPage(val);

    this.setState({newPage : newVal});
    this.props.search(newVal);
  }

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  cambia a la página siguiente
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  nextPage(e){
    e.preventDefault();
    let newPage = this.state.newPage + 1,
        item   = document.getElementById("page-select");
    this.setState({newPage : newPage});
    this.props.search(newPage);

    item.value = newPage + 1;
  }

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  cambia a la página anterior
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  prevPage(e){
     e.preventDefault();
    let newPage = this.state.newPage - 1,
        item   = document.getElementById("page-select");
    this.setState({newPage : newPage});
    this.props.search(newPage);

    item.value = newPage + 1;
  }

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  al seleccionar la página, valida que se 
  /  encuentre en el rango disponible
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  _validateNewPage(page){
    let p  = Math.ceil( Number(page) ) - 1,
        res;
    if(p >= 0 && p < this.props.pages ){
      res = p;
    }
    else{
      res = this.state.newPage;
    }
    return res;
  }
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default BusquedaTable;