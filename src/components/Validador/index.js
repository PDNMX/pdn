import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import UploadForm from './UploadForm';
//import PDNAppBar from '../PDNAppBar/PDNAppBar';
import {Typography} from "@mui/material"
import withStyles from '@mui/styles/withStyles';
import PropTypes from 'prop-types';
import Footer from "../Home/Footer";
import Header from "./Header/Header";


const styles = theme => ({
    root: {
        flexGrow: 1
    },
    gridItem: {
        maxWidth: '1200px',
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(4),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    contents: {
        background: '#fff',
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
          return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ruta</TableCell>
                            <TableCell>Error</TableCell>
                            <TableCell>Clave</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell>{row.dataPath}</TableCell>
                                <TableCell>{row.message}</TableCell>
                                <TableCell>{row.keyword}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
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

        return (
            <div className={ classes.root }>
                {/*<PDNAppBar/>*/}
                <Header/>
                <Grid container spacing={0} justifyContent="center" className={classes.contents}>
                    <Grid item xs={12} className={classes.gridItem} align="center">
                        <Typography paragraph color='textPrimary' align="left">
                            Este validador te ayudará a verificar que la respuesta generada por tus API's cumplen las
                            especificaciones que se refieren a los campos mínimos de datos que debe contener cada sistema, así como el estándar que debe seguir cada campo para ser interoperable con la Plataforma Digital Nacional.
                            Dado que actualmente se encuentran disponibles las especificaciones para los Sistemas 1, 2 y 3, son estas las que se podrán verificar, para hacerlo sigue los siguientes pasos.
                        </Typography>
                        <Typography paragraph color='textPrimary' align="left">
                            <ul>
                                <li>Ejecuta tu API y guarda la respuesta en un archivo de texto plano con extensión .JSON</li>
                                <li>Da clic en el botón "Cargar archivo" y selecciona el archivo que generaste.</li>
                                <li>Selecciona el sistema cuya respuesta deseas validar.</li>
                                <li>Da clic en el botón "Validar".</li>
                            </ul>
                        </Typography>
                        
                        <Typography paragraph color='textPrimary' align="left">
                            En caso de que tu archivo sea validado exitosamente se desplegará un mensaje indicandolo.
                            En caso de no validarse satisfactoriamente, se desplegará una tabla mostrando el(los) campo(s) que contiene(n) errores y el detalle de los mismos.
                        </Typography>

                        <UploadForm onResults={this._handleResults}/>
                        <br/>
                        {this.state.usedForm
                            ? this._renderFirst()
                            : <br/>
                        }
                    </Grid>
                </Grid>
                <Footer/>
            </div>
        );
    }
}


Validador.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Validador);
