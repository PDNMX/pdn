import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Grid from "@mui/material/Grid";
import { Typography} from "@mui/material";
import TableHead from "@mui/material/TableHead";
//import IconSubdirectory from "@mui/icons-material/SubdirectoryArrowRight";

const styles = theme => ({
    table: {
        tableLayout: 'fixed',
    },
    gridTable: {
        marginBottom: theme.spacing(3),
        color: theme.palette.primario.contrastText
    },
    container: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
        overflowX: 'auto',
    },
    tableCell: {
        color: theme.palette.text.main
    },
    tablePagination: {
        color: theme.palette.greyColor,
        backgroundColor: theme.palette.background.tableBody
    },
    row:{
        cursor: 'pointer'
    },
    tableBody: {backgroundColor: '#f2f2f2'},
    tableHead: {backgroundColor: '#0d3b49'}
});


function Previos({data, classes, handleChangeSujetoObligado}) {
    let sumador = null;
    sumador = data.reduce((a, b) => a + (b.totalRows || 0), 0); 

    function Renglon(props) {
      //let resultados = props;
      //console.log(props.data);
      let row = props.data;
      if (!row.error && row.totalRows > 0) {
        return (
            
            <TableRow
              key={row.supplier_id}
              hover
              className={classes.row}
              onClick={() => {
                if (!row.error && row.totalRows > 0) {
                  handleChangeSujetoObligado(row.supplier_id);
                }
              }}
            >
              <TableCell align="left">{row.supplier_name}</TableCell>
              <TableCell align="center">
                {row.levels ? row.levels.join(",") : ""}
              </TableCell>
              <TableCell align="center">
                {row.totalRows}
              </TableCell>
            </TableRow>
        
        );
      } 
      return null;
    }
    return (
      <div>
        <Grid
          container
          justifyContent="center"
        >
          <Grid item xs={12}>
            {sumador > 0 ? (
              <>
                <div className={classes.container}>
                  <Table className={classes.table}>
                    <TableHead className={classes.tableHead}>
                      <TableRow>
                        <TableCell
                          align="left"
                          variant={"head"}
                          className={classes.tableCell}
                        >
                          <Typography variant={"body1"}>
                            Proveedor de información
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="center"
                          variant={"head"}
                          className={classes.tableCell}
                        >
                          <Typography variant={"body1"}>Ambito</Typography>
                        </TableCell>
                        
                        <TableCell
                          align="center"
                          variant={"head"}
                          className={classes.tableCell}
                        >
                          <Typography variant={"body1"}>Registros</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                      {data
                        /* .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        ) */
                        .map((row, index) => (
                          <Renglon data={row} key={index}/>
                        ))}
                    </TableBody>
                    
                  </Table>
                </div>
              </>
            ) : (
              <><h2 style={{color: "#efd643"}}>No se encontraron resultados para los filtros de búsqueda definidos</h2></>
            )}
          </Grid>
        </Grid>
      </div>
    );
}

Previos.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    handleChangeSujetoObligado: PropTypes.func.isRequired
};

export default withStyles(styles)(Previos);
