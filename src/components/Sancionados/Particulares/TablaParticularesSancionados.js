import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TablePagination, TableRow, TableFooter, TableHead} from '@material-ui/core';
import Grid from "@material-ui/core/Grid/Grid";
import {Typography} from "@material-ui/core";


const columnData = [
    {id: 'proveedor', label: 'Proveedor o contratista'},
    {id: 'institucion', label: 'Institución'},
    {id: 'expediente', label: 'Número de expediente'},
    {id: 'sentidoResolucion', label: 'Sentido de la resolución'}
];

const styles = theme => ({
    tablePagination: {
        overflowX: 'auto',
        fontSize: '0.75rem'
    },
    gridTable: {
        marginBottom: '27px',
        padding: theme.spacing(1),
        maxWidth: '1200px',
    },
    desc: {
        color: theme.palette.primary.dark,
    },
    container1: {
        display: 'table',
        tableLayout: 'fixed',
        width: '100%',
        maxWidth: '1200px',
        overflowX: 'auto',
        padding: theme.spacing(1)
    },
    container2: {
        display: 'tableCell',
        overflowX: 'auto',
        width: '100%'
    }
});

function TablaParticularesSancionados({
                                          classes,
                                          data,
                                          rowsPerPage,
                                          page,
                                          totalRows,
                                          nivel,
                                          verDetalle,
                                          handleChangeRowsPerPage,
                                          handleChangePage
                                      }) {
    return (
        <div>
            <Grid container justifyContent='center' spacing={0} className={classes.gridTable}>
                <Grid item xs={12} className={classes.section}>
                    {data && data.length > 0 &&
                    <Typography variant="h6" className={classes.desc}>Pulsa sobre el registro para ver su
                        detalle<br/></Typography>
                    }
                </Grid>
                <Grid item xs={12} className={classes.container1}>
                    <div className={classes.container2}>
                        {data && data.length > 0 &&
                        <Table>
                            <TableHead style={{backgroundColor: '#f5f5f5'}}>
                                <TableRow>
                                    {
                                        columnData.map(column => {
                                            return (
                                                <TableCell key={column.id}>
                                                    <Typography className={classes.tableHead}
                                                                variant={"body1"}>
                                                        {column.label}
                                                    </Typography>
                                                </TableCell>
                                            );
                                        })
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody id="tableParticulares">
                                {data
                                    .map(n => {
                                        return (
                                            <TableRow
                                                hover
                                                onClick={event => verDetalle(event, n)}
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={n.id}
                                            >
                                                <TableCell component="th" scope="row" style={{width: '25%'}}
                                                           padding="normal">{n.particularSancionado.nombreRazonSocial}</TableCell>
                                                <TableCell>{n.institucionDependencia.nombre}</TableCell>
                                                <TableCell>{n.expediente}</TableCell>
                                                <TableCell>{n.resolucion.sentido}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        className={classes.tablePagination}
                                        colSpan={4}
                                        count={totalRows}
                                        rowsPerPage={rowsPerPage}
                                        page={page - 1}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        labelRowsPerPage='Registros por página'
                                        labelDisplayedRows={({from, to, count}) => {
                                            return `${from}-${to} de ${count}`;
                                        }}
                                        rowsPerPageOptions={[10, 25, 50]}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                        }
                    </div>

                </Grid>


                <Grid item xs={12} className={classes.section}>
                    {
                        nivel !== 'estatal' &&
                        <Typography variant={"caption"} style={{fontStyle: 'italic'}}>Nota:
                            Este buscador mostrará en su primera etapa, solamente datos de carácter público,
                            proporcionados por la Secretaría de la Función Pública, relativos a
                            sanciones impuestas a personas físicas o morales, por infracciones a la Ley de
                            Adquisiciones, Arrendamientos y Servicios del Sector Público, Ley de
                            Obras Públicas y Servicios Relacionados con las Mismas, y Ley de Asociaciones Público
                            Privadas.
                        </Typography>
                    }
                </Grid>
            </Grid>
        </div>
    );

}

TablaParticularesSancionados.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    totalRows: PropTypes.number.isRequired,
    nivel: PropTypes.string.isRequired
};

export default withStyles(styles)(TablaParticularesSancionados);
