import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import TableBody from "@material-ui/core/TableBody/index";
import TableRow from "@material-ui/core/TableRow/index";
import Table from "@material-ui/core/Table/index";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableHead from "@material-ui/core/TableHead/TableHead";
import Button from "@material-ui/core/Button/Button";
import TablePagination from "@material-ui/core/TablePagination/TablePagination";

const styles = theme => ({
    table: {
        minWidth: 700,
    },
    tableContainer: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        tableLayout: 'fixed',
    },
    button: {
        margin: theme.spacing.unit,
    },
    tablePagination:{
        fontSize : '0.75rem'
    }
});

class TablaPre extends React.Component {
    render() {
        const {registros, classes, getRegistro,totalRows,rowsPerPage,page,handleChangePage,handleChangeRowsPerPage} = this.props;
        return (
            <div className={classes.tableContainer}>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre completo</TableCell>
                           <TableCell>Consultar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            registros.map(item => {
                                let row = item.informacion_personal.informacion_general;
                                return (
                                    <TableRow key={item._id}>
                                        <TableCell>{row.nombres + ' ' + row.primer_apellido + ' ' + row.segundo_apellido + ' '}</TableCell>
                                        <TableCell>
                                            <Button color="primary" className={classes.button} onClick={()=>getRegistro(item._id)}>
                                                {'Consultar'}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
                <TablePagination
                        className={classes.tablePagination}
                        component="div"
                        count={totalRows}
                        rowsPerPage={rowsPerPage}
                        page={page}

                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        labelRowsPerPage='Registros por página'
                        labelDisplayedRows={({from, to, count}) => {
                            return `${from}-${to} de ${count}`;
                        }}

                    />


            </div>
        );
    }
}

export default withStyles(styles)(TablaPre);