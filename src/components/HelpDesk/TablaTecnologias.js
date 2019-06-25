import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
        marginBottom: theme.spacing(2)
    },
    table: {
        minWidth: 650,
    },
}));

function createData(componente, uso, tecnologia) {
    return { componente, uso, tecnologia };
}

const rows = [
    createData('Contenedores', "Puesta en marcha y distribución de actualizaciones", "Docker, Kubernetes"),
    createData('Analíticos', "Inteligencia de datos", "Python"),
    createData('Backend', "Lógica de negocio de la PDN", "Python, Node.js, express.js  y Graphql"),
    createData('Base de Datos', "Tecnología de almacenamiento", "PostgreSQL y MongoDB"),
    createData('FrontEnd', "Desarrollo de interfaz de usuario", "React.js Material UI"),
    createData('Seguridad', "Autorización", "OAuth 2.0"),
    createData('Testing', "Pruebas", "Jestjs"),
    createData('Continous integration', "Integración continua", "TravisCI"),
    createData('Servicios web', "Comunicación con instituciones", "Web APIs (REST y GrapQL)"),
    createData('Estándares de datos', "Estandarización de información", "Open API Specification y GraphQL"),
    createData('Control de versiones', "Repositorios de código y control de versiones", "Git"),
];

export default function SimpleTable() {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Componente</TableCell>
                        <TableCell>Uso/Objetivos</TableCell>
                        <TableCell>Tecnología</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.componente}>
                            <TableCell component="th" scope="row">
                                {row.componente}
                            </TableCell>
                            <TableCell>{row.uso}</TableCell>
                            <TableCell>{row.tecnologia}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}
