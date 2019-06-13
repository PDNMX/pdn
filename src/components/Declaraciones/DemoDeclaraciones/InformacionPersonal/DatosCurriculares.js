import React from 'react';
import {withStyles} from '@material-ui/core/styles/index'
import Typography from '@material-ui/core/Typography/index';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";

const styles = theme => ({
    table: {
        minWidth: 700,
    },
    tableContainer: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    }
});

class DatosCurriculares extends React.Component {
    state = {
        rol: '',
        nombre: '',
        apellidoUno: '',
        apellidoDos: ''
    };

    render() {
        const {classes, datos_curriculares} = this.props;
        return (
            <div className={classes.tableContainer}>
                <TextField disabled
                           id="gradoMaximoEscolaridad"
                           label="Grado máximo escolaridad: "
                           className={classes.textField}
                           value={datos_curriculares.grado_maximo_escolaridad}
                           margin="normal" fullWidth
                />
                <Typography variant={'subheading'}
                            className={classes.title}>{'Grados académicos'}</Typography>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Grado</TableCell>
                            <TableCell>Carrera</TableCell>
                            <TableCell>Institución educativa</TableCell>
                            <TableCell>Estatus</TableCell>
                            <TableCell>Año conclusión</TableCell>
                            <TableCell>Documento obtenido</TableCell>
                            <TableCell>Cédula profesional</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datos_curriculares.grados_academicos.map((row, index = 0) => {
                            return (
                                <TableRow key={index++}>
                                    <TableCell>{row.grado_obtenido}</TableCell>
                                    <TableCell>{row.carrera}</TableCell>
                                    <TableCell>{row.institucion_educativa}</TableCell>
                                    <TableCell>{row.estatus.valor}</TableCell>
                                    <TableCell>{row.ano_conclusion}</TableCell>
                                    <TableCell>{row.documento_obtenido.valor}</TableCell>
                                    <TableCell>{row.cedula_profesional}</TableCell>

                                </TableRow>
                            )
                        })
                        }
                    </TableBody>
                </Table>
            </div>
        );
    }

}

DatosCurriculares.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DatosCurriculares);