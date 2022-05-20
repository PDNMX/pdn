import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import HeaderV2 from "../HomeV2/HeaderV2";
import pdnRoutes from "../../routes";

import {Typography, Grid, Paper, Box} from "@mui/material";
import UploadForm from './UploadForm';

import withStyles from '@mui/styles/withStyles';
import PropTypes from 'prop-types';
import bgimg from "../../assets/rediseno/fondo_cruces_dark.png";


const styles = theme => ({
    root: {
        flexGrow :1,
        backgroundImage: `url(${bgimg})`,
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
    },
    rootItem: {
        maxWidth: "1200px",
        padding: theme.spacing(1),
        paddingTop: 90,
        paddingBottom: 90,
    },
    paper: {
        backgroundColor: theme.palette.background.opaque,
        padding: theme.spacing(2),
        color: theme.palette.primario.contrastText,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.secundario.main,
        borderRadius: '10px',
        display: 'flex',
        justifyContent: "center",
    },
    box: {
        maxWidth: '900px', paddingTop: '50px', paddingBottom: '50px',
    },
    tableCell: {
        color: theme.palette.text.main,
        borderBottomColor: theme.palette.secundario.main
    }
  });

class Validador extends Component {
    
    state = {
        usedForm: false,
        results: true
    };

    _handleResults = (results, errorParse) => {
        this.setState({ results, usedForm: true })
        // console.log(results)
    };

    _renderListErrors () {
        const { results } = this.state;
        if (results instanceof SyntaxError && !Array.isArray(results)) {
          return (<p>Error: {results.message}</p>);
        } else {
            const {classes} = this.props;
            return (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableCell}>Ruta</TableCell>
                            <TableCell className={classes.tableCell}>Error</TableCell>
                            <TableCell className={classes.tableCell}>Clave</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell className={classes.tableCell}>{row.instancePath}</TableCell>
                                <TableCell className={classes.tableCell}>{row.message}</TableCell>
                                <TableCell className={classes.tableCell}>{row.keyword}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            );
        }
    }

    _renderFirst= () => {
        return this.state.results === true
            ? <Typography paragraph> El archivo ha sido comprobado con éxito </Typography>
            : this._renderListErrors()
    };

    render() {

        const {classes} = this.props;
        const section = pdnRoutes.find(route => route.path === '/validador');

        return (
            <div className={ classes.root }>
                <HeaderV2 section={section}/>
                <Grid container justifyContent="center" spacing={0}>
                <Grid item xs={12} className={classes.rootItem}>
                    <Paper className={classes.paper} elevation={15} >
                        <Box className={classes.box}>
                            <Typography paragraph align="left">
                                Este validador te ayudará a verificar que la respuesta generada por tus API's cumplen las
                                especificaciones que se refieren a los campos mínimos de datos que debe contener cada sistema, así como el estándar que debe seguir cada campo para ser interoperable con la Plataforma Digital Nacional.
                                Dado que actualmente se encuentran disponibles las especificaciones para los Sistemas 1, 2 y 3, son estas las que se podrán verificar, para hacerlo sigue los siguientes pasos.
                            </Typography>
                            <Typography paragraph align="left">
                                <ul>
                                    <li>Ejecuta tu API y guarda la respuesta en un archivo de texto con extensión</li>
                                    <li>Da clic en el botón "Cargar archivo" y selecciona el archivo que generaste.</li>
                                    <li>Selecciona el sistema cuya respuesta deseas validar.</li>
                                    <li>Da clic en el botón "Validar".</li>
                                </ul>
                            </Typography>
                            
                            <Typography paragraph align="left">
                                En caso de que tu archivo sea validado exitosamente se desplegará un mensaje indicandolo.
                                En caso de no validarse satisfactoriamente, se desplegará una tabla mostrando el(los) campo(s) que contiene(n) errores y el detalle de los mismos.
                            </Typography>

                            <UploadForm onResults={this._handleResults}/>
                            <br/>
                            {this.state.usedForm
                                ? this._renderFirst()
                                : <br/>
                            }
                        </Box>
                    </Paper>
                </Grid>
                </Grid>
                
            </div>
        );
    }
}


Validador.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Validador);
