import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

let id = 0;
function createData(name, calories, fat, carbs) {
    id += 1;
    return { id, name, calories, fat, carbs };
}

const rows = [
    createData('api_key', "Token que devuelve la institución al autenticar a la PDN para permitir el uso de la api de Servidores Públicos que Intervienen en Contrataciones",
        "N/A",
        "N/A"),
    createData('sort',"Ordena por la fecha de actualización de forma ascendente ó descendente.",
        "asc - ascendente\n" +
        "desc - descendente",
        "asc"),
    createData('page', "Indica el número de la página que debe ser devuelta de la consulta resultante.",
        "1-N Donde N es el número máximo de páginas que tiene la respuesta de la consulta solicitada",
        "1"),
    createData('page_size', "Número de registros a mostrar por página.",
        "1-200",
        "10"),
    createData('nombres', "Nombre o nombres del servidor, la respuesta debe arrojar todos los registros que coincidan en forma total o parcial a la cadena enviada.",
        "N/A",
        "N/A"),
    createData('apellido1', "Primer apellido del servidor, la respuesta debe arrojar todos los registros que coincidan en forma total o parcial a la cadena enviada.",
        "N/A",
        "N/A"),
    createData('apellido2', "Segundo apellido del servidor, la respuesta debe arrojar todos los registros que coincidan en forma total o parcial a la cadena enviada.",
        "N/A",
        "N/A"),
    createData('curp', "CURP del servidor, devuelve todos los registros que coincidan completamente con el valor enviado.",
        "N/A",
        "N/A"),
    createData('rfc', "RFC del servidor, devuelve todos los registros que coincidan completamente con el valor enviado.",
        "N/A",
        "N/A"),
    createData('id', "Id del registro devuelto, de libre elección para las instituciones, no puede existir repetidos.",
        "N/A",
        "N/A"),
    createData('actualizacion', "Fecha de actualización de la declaración, devuelve los registros que cumplen a partir de la fecha enviada.",
        "YYYY-MM-DD \nEjemplo: 2017-07-21",
        "N/A"),
    createData('rfc_solicitante', "RFC de la persona que solicita la búsqueda, si se omite solo deberá devolver los campos de la declaración que son públicos.",
        "N/A",
        "N/A"),
];

function TablaParametros(props) {
    const { classes } = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Parámetro</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell>Valores permitidos</TableCell>
                        <TableCell>Valor por defecto</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell>{row.calories}</TableCell>
                            <TableCell>{row.fat}</TableCell>
                            <TableCell>{row.carbs}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

TablaParametros.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TablaParametros);
