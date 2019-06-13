import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import UploadForm from './UploadForm';
//import PDNAppBar from '../PDNAppBar/PDNAppBar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from "@material-ui/core/styles";
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
                <Grid container spacing={0} justify="center" className={classes.contents}>
                    <Grid item xs={12} className={classes.gridItem} align="center">

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
