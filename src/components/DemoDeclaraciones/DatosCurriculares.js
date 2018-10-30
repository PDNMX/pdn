import React from 'react';
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";

const styles = theme => ({
    title: {
        color: theme.palette.textPrincipal.color,
        textAlign: 'center',
        marginTop: theme.spacing.unit * 2,
    },
    bgPanelLight: {
        backgroundColor: theme.palette.white.color,
    },
    section: {
        maxWidth: '1024px'
    },
    center: {
        textAlign: 'center'
    },
    container: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: '100px',
            marginRight: '100px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit
        }
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    table: {
        minWidth: 700,
    },
    tableContainer :{
        width: '100%',
        marginTop: theme.spacing.unit * 3,
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

    handleChange = name => event => {
        console.log("EVent: ", event)
        this.setState({
            [name]: event.target.value,
        });
    };


    render() {
        const {classes, datos_curriculares} = this.props;
        return (
            <div>
                <div className={classes.bgPanelLight}>
                    <Grid container justify={'center'} spacing={0}>
                        <Grid item xs={12} className={classes.section}>
                            <Grid container spacing={24}>
                                <Grid item xs={12}>
                                    <Typography variant={'title'}
                                                className={classes.title}>{'Datos curriculares'}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField disabled
                                        id="gradoMaximoEscolaridad"
                                        label="Grado máximo escolaridad: "
                                        className={classes.textField}
                                        value={datos_curriculares.grado_maximo_escolaridad}
                                        margin="normal" fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant={'title'}
                                                className={classes.title}>{'Grados académicos'}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className={classes.tableContainer}>
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
                                                { datos_curriculares.grados_academicos.map((row,index=0 )=> {
                                                    return(
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

                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>

                </div>

            </div>
        );
    }

}

DatosCurriculares.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DatosCurriculares);