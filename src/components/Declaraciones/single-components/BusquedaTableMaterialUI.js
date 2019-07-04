/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, {Component}  from "react";
// import {Typography} from '@material-ui/core';
import { withStyles, Table, TableBody, TableCell, TableHead, TableRow, TableFooter, TablePagination } from '@material-ui/core';

let uniqid = require('uniqid');


const styles = {
  th : {
    background : "grey",
    color : "white",
    fontSize : "1em",
    textTransform: "uppercase"
  }
};

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // DEFINE LA CLASE PRINCIPAL
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
class BusquedaTableMaterialUI extends Component{

  constructor(){
    super();

    this.changePage = this.changePage.bind(this);
  }

	render(){
		return(
			<div>
				<Table>
          <TableHead>
            <TableRow>
              <TableCell className={this.props.classes.th}> nombre</TableCell>
              <TableCell className={this.props.classes.th}>oficina</TableCell>
              <TableCell className={this.props.classes.th}>cargo</TableCell>
              <TableCell className={this.props.classes.th}>estado</TableCell>
              <TableCell className={this.props.classes.th}>municipio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.results.map( compa => 
              <TableRow key={uniqid()}>
                <TableCell>
                  <a href={`${process.env.PUBLIC_URL}/declaraciones/perfil/${compa._id}/informacion`}>
                    {compa.informacion_personal.informacion_general.nombres} {compa.informacion_personal.informacion_general.primer_apellido}  {compa.informacion_personal.informacion_general.segundo_apellido}
                  </a>
                </TableCell>

                <TableCell>
                  {compa.informacion_personal.datos_encargo_actual.ente_publico}
                </TableCell>

                <TableCell>
                  {compa.informacion_personal.datos_encargo_actual.empleo_cargo_comision}
                </TableCell>

                <TableCell>
                  {compa.informacion_personal.datos_encargo_actual.direccion_encargo.entidad_federativa.nom_ent}
                </TableCell>

                <TableCell>
                  {compa.informacion_personal.datos_encargo_actual.direccion_encargo.municipio.nom_mun}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={3}
                count={this.props.total}
                rowsPerPage={this.props.pageSize}
                page={this.props.page}
                rowsPerPageOptions={[]}
                onChangePage={this.changePage}
               />
            </TableRow>
          </TableFooter>
				</Table>
			</div>
		);
	}

  changePage(e, page){
    this.props.search(page);
  }
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default withStyles(styles)(BusquedaTableMaterialUI);