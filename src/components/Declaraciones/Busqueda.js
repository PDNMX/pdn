/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // CARGA LAS DEPENDENCIAS
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
import React, { Fragment, Component } from 'react';
import * as ConstClass from  './ConstValues.js';
// import SearchForm from  './single-components/BusquedaForm.js';
// import SearchTable from  './single-components/BusquedaTable.js';

import BusquedaFromMaterialUI from "./single-components/BusquedaFromMaterialUI";
import BusquedaTableMaterialUI from "./single-components/BusquedaTableMaterialUI";

import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "./style";
/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // DEFINE LA CLASE PRINCIPAL
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
class App extends Component {

  /*
   * C O N S T R U C T O R
   * ----------------------------------------------------------------------
   */
  constructor(){
    super();

    this.state = {
      page : 0,
      pages : 0,
      pageSize : 10,
      response : null,
      settings : null
    }

    // hack culero para el scope
    this.getUsers   = this.getUsers.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.makeQuery  = this.makeQuery.bind(this);
    this.showTable  = this.showTable.bind(this);

    this.updatePage = this.updatePage.bind(this);
  }

  /*
   * R E N D E R
   * ----------------------------------------------------------------------
   */
  render() {
    let { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography className={classes.h1}>
              <strong>Busca un servidor público</strong>
            </Typography>
            <BusquedaFromMaterialUI getUsers={this.getUsers} />
            {this.showTable()}
          </Grid>         
        </Grid>
      </div>
    );
  }

  /*
   * M E T H O D S
   * ----------------------------------------------------------------------
   */

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  determina si debe mostrar la tabla o nel
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  showTable(){
    if(this.state.response){
      return(
        <Fragment>
        {/*
          <SearchTable results={this.state.response.results}
                       pages={this.state.pages}
                       page={this.state.page}
                       search={this.updatePage} />
          */}
          <BusquedaTableMaterialUI results={this.state.response.results}
                       pages={this.state.pages}
                       page={this.state.page}
                       total={this.state.response.total}
                       pageSize={this.state.pageSize}
                       search={this.updatePage} />
        </Fragment>
      );
    }
    return "";
  }

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  hace el llamado al api para obtener la info
  /  de un servidor público
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  getProfile(id){
    let conf = Object.assign({}, ConstClass.fetchObj);

    conf.body = JSON.stringify({id : id});

    fetch(ConstClass.endpoint, conf)
      .then(response => response.json())
      .then(d => {
        console.log("yaaaa:", d);
      });
  }

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  busca a los usuarios relacionados
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  getUsers(settings){
    this.setState({settings : settings});

    let connObj = Object.assign({}, ConstClass.fetchObj);

    connObj.body = this.makeQuery(settings);

    fetch(ConstClass.endpoint, connObj)
          .then(response => response.json())
          .then(d => {

            let pages = Math.ceil(d.total / this.state.pageSize);
            this.setState({response : d});
            this.setState({pages : pages});
          });
  }

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  cambia la página a desplegar en los resultados
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  updatePage(page){
    this.setState({page : page}, () => {
      this.getUsers(this.state.settings);
    });
  }

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  genera el cuerpo del llamado al api
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  makeQuery(settings){
    let searchObj   = {query : {}};

    searchObj.limit = this.state.pageSize;
    searchObj.skip  = this.state.page * this.state.pageSize;

    if(settings.names) searchObj.query[ConstClass.PROP_NAMES.nombres] = settings.names;
    if(settings.surname_a) searchObj.query[ConstClass.PROP_NAMES.apellido1] = settings.surname_a;
    if(settings.office) searchObj.query[ConstClass.PROP_NAMES.ente] = settings.office;
    if(settings.nivel) searchObj.query[ConstClass.PROP_NAMES.nivelGobierno] = settings.nivel;

    return JSON.stringify(searchObj);
  }
}

/*
  ////////////////////////////////////////////////////////////////////////////////
  //
  // REGRESA EL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
*/
export default withStyles(styles)(App);
