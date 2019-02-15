import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import UploadForm from './UploadForm';
import PDNAppBar from '../PDNAppBar/PDNAppBar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    gridItem: {
        maxWidth: '1200px',
        paddingTop: theme.spacing.unit * 4,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    },

});


class Validador extends Component {
    state = {
        usedForm: false,
        results: true
    };

    _handleResults = (results) => {
        this.setState({ results, usedForm: true })
        // console.log(results)
    };

    _renderListErrors () {
        const { results } = this.state;
        // return results.map((swaggerError, i) => {
        //   return <p key={i}>{swaggerError.message}</p>
        // })
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
                                <TableCell className='txtError'>{row.message}</TableCell>
                                <TableCell>{row.keyword}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
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
                <PDNAppBar/>
                <Grid container spacing={0} justify="center">
                    <Grid item xs={12} className={classes.gridItem}>

                        <Typography variant="h5">Validador de estándares de datos</Typography>
                        <Typography paragraph>
                            En está página puedes validar archivos en formato JSON contra los estándares de datos de la Plataforma Digital Nacional.
                        </Typography>
                        <UploadForm onResults={this._handleResults}/>
                        <br/>
                        {this.state.usedForm
                            ? this._renderFirst()
                            : <br/>
                        }
                    </Grid>
                </Grid>
                <br/>
            </div>
        );
    }
}


Validador.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Validador);
