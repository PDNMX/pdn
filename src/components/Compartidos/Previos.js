import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Grid from "@mui/material/Grid";
import {Typography} from "@mui/material";
import TableHead from "@mui/material/TableHead";
import IconSubdirectory from "@mui/icons-material/SubdirectoryArrowRight";
import Tooltip from "@mui/material/Tooltip";
import IconSunny from "@mui/icons-material/WbSunny";
import TablePagination from '@mui/material/TablePagination';
import TableFooter from "@mui/material/TableFooter";

const styles = theme => ({
    table: {
        tableLayout: 'fixed',
    },
    gridTable: {
        marginBottom: theme.spacing(3),
        color: theme.palette.primario.contrastText
    },
    container: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        overflowX: 'auto',
    },
    iconoVer: {
        color: theme.palette.secundario.dark,
        cursor: 'pointer'
    },
    tableHead: {
        color: theme.palette.text.main
    },
    tablePagination: {
        color: theme.palette.greyColor,
        backgroundColor: theme.palette.background.tableBody
    }
});

function Previos({data, classes, handleChangeSujetoObligado}) {

    let [page, setPage] = React.useState(0);
    let [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <Grid container justifyContent='center' spacing={0} className={classes.gridTable}>
                <Grid item xs={12}>
                    {data && data.length > 0 &&
                    <Typography variant="body1">La siguiente tabla muestra el resultado devuelto por cada Proveedor de
                        información a través de su API. Pulsa en <IconSubdirectory className={classes.iconoVer}/> para
                        ver el detalle<br/></Typography>
                    }
                </Grid>
                <Grid item xs={12}>
                    {data && data.length > 0 &&
                    <div className={classes.container}>
                        <Table className={classes.table}>
                            <TableHead style={{backgroundColor: '#0d3b49'}}>
                                <TableRow>
                                    <TableCell align="left" variant={"head"} className={classes.tableHead}><Typography
                                        variant={"body1"}>Nivel</Typography></TableCell>
                                    <TableCell align="left" variant={"head"} className={classes.tableHead}><Typography
                                        variant={"body1"}> Proveedor de información</Typography></TableCell>
                                    <TableCell align="center" variant={"head"} className={classes.tableHead}><Typography
                                        variant={"body1"}>Estatus</Typography></TableCell>
                                    <TableCell align="center" variant={"head"} className={classes.tableHead}><Typography
                                        variant={"body1"}>Número de registros</Typography></TableCell>
                                    <TableCell align="center" variant={"head"} className={classes.tableHead}><Typography
                                        variant={"body1"}>Acciones</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{backgroundColor: '#f2f2f2'}}>
                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(row => (
                                        <TableRow key={row.supplier_id}>
                                            <TableCell align="left">{row.levels ? row.levels.join(',') : ''}</TableCell>
                                            <TableCell align="left">{row.supplier_name}</TableCell>
                                            <TableCell align="center">
                                                <Tooltip title={!row.error ? "Disponible" : "No disponible"}>
                                                    <IconSunny color={!row.error ? "primario" : "disabled"}/>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell align="center">
                                                {("undefined" === typeof (row["totalRows"])) &&
                                                "No disponible"
                                                }
                                                {row.totalRows}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.totalRows > 0 &&
                                                <Tooltip title={"Ver"}>
                                                    <IconSubdirectory className={classes.iconoVer} onClick={() => {
                                                        handleChangeSujetoObligado(row.supplier_id);
                                                    }}/>
                                                </Tooltip>
                                                }
                                                {("undefined" === typeof (row["totalRows"])) &&
                                                "No disponible"
                                                }
                                                {(row.totalRows === 0) &&
                                                "-"
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        className={classes.tablePagination}
                                        colSpan={5}
                                        rowsPerPageOptions={[5, 10, 15]}
                                        count={data.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        labelRowsPerPage='Registros por página'
                                        labelDisplayedRows={({from, to, count}) => {
                                            return `${from}-${to} de ${count}`;
                                        }}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                    }
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
