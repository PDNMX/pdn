import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        background: '#f5986f',
        position: 'fixed',
        bottom: '0',
        zIndex: 1,
        opacity: 0.7,
        width: '100%',
        padding: theme.spacing.unit * 2,
        textAlign: 'center'
    },
    item: {
        maxWidth: 1200
    },
    comenta:{
        background: '#ffe01b',
    }
});


class Bandita extends React.Component{

    render(){

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Typography>
                    Esta es una versión Alpha cuyo objetivo es probar las funcionalidades, interfaz y experiencia de usuario para la página de inicio, y los primeros dos sistemas de la Plataforma.
                    Esta versión NO debe ser vista como final, NI contiene los datos reales.

                <br/>

                    Por favor, ingresa al siguiente formulario para dejar tus comentarios. Estos serán utilizados como insumo para la primera versión que será lanzada en 2019.
                </Typography>
                <br/>
                <Button variant='contained' className={classes.comenta}>Comenta</Button>
            </div>
        );
    }
}

Bandita.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Bandita);