import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper
} from "@material-ui/core";

import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

let uniqid = require("uniqid");

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 15,
    overflowX: "auto"
  },
  paper: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  }
});

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "grey",
    color: theme.palette.common.white,
    textTransform: "uppercase"
  },
  body: {
    fontSize: 12
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

class BusquedaTableMaterialUI extends Component {
  constructor() {
    super();

    this.changePage = this.changePage.bind(this);
  }

  render() {
    let { classes } = this.props;
    return (
      <div className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>nombre</StyledTableCell>
              <StyledTableCell>insitución</StyledTableCell>
              <StyledTableCell>cargo</StyledTableCell>
              <StyledTableCell>estado</StyledTableCell>
              <StyledTableCell>municipio</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.results.map(compa => (
              <StyledTableRow key={uniqid()}>
                <StyledTableCell>
                  <Link
                    className={classes.link}
                    to={`declaraciones/perfil/${compa._id}`}
                  >
                    {compa.informacion_personal.informacion_general.nombres}{" "}
                    {
                      compa.informacion_personal.informacion_general
                        .primer_apellido
                    }{" "}
                    {
                      compa.informacion_personal.informacion_general
                        .segundo_apellido
                    }
                  </Link>
                </StyledTableCell>
                <StyledTableCell>
                  <Link
                    className={classes.link}
                    to={`declaraciones/perfil/${compa._id}`}
                  >
                    {
                      compa.informacion_personal.datos_encargo_actual
                        .ente_publico
                    }
                  </Link>
                </StyledTableCell>
                <StyledTableCell>
                  <Link
                    className={classes.link}
                    to={`declaraciones/perfil/${compa._id}`}
                  >
                    {
                      compa.informacion_personal.datos_encargo_actual
                        .empleo_cargo_comision
                    }
                  </Link>
                </StyledTableCell>
                <StyledTableCell>
                  <Link
                    className={classes.link}
                    to={`declaraciones/perfil/${compa._id}`}
                  >
                    {
                      compa.informacion_personal.datos_encargo_actual
                        .direccion_encargo.entidad_federativa.nom_agee
                    }
                  </Link>
                </StyledTableCell>
                <StyledTableCell>
                  <Link
                    className={classes.link}
                    to={`declaraciones/perfil/${compa._id}`}
                  >
                    {
                      compa.informacion_personal.datos_encargo_actual
                        .direccion_encargo.municipio.nom_agem
                    }
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={5}
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

  changePage(e, page) {
    this.props.search(page);
  }
}

export default withStyles(styles)(BusquedaTableMaterialUI);
