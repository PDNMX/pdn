import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Modal from "@material-ui/core/Modal/Modal";
import Participa from "../Participa/Participa";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";

const styles = theme => ({
    root: {
        //background: '#f5986f',
        position: 'fixed',
        bottom: '0',
        zIndex: 1,
        //opacity: 0.7,
        width: '95%',
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2.5,
        paddingRight: theme.spacing.unit * 2,
        textAlign: 'right'
    },
    item: {
        maxWidth: 1200
    },
    comenta:{
        background: '#ffe01b',
    }
});


class Bandita extends React.Component{
    state = {
        open: false,
       
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render(){

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                {/* <Typography>
                    Esta es una versión Alpha cuyo objetivo es probar las funcionalidades, interfaz y experiencia de usuario para la página de inicio, y los primeros dos sistemas de la Plataforma.
                    Esta versión NO debe ser vista como final, NI contiene los datos reales.

                <br/>

                    Por favor, ingresa al siguiente formulario para dejar tus comentarios. Estos serán utilizados como insumo para la primera versión que será lanzada en 2019.

                </Typography>

                <br/>
                */}

                <Button variant='contained' className={classes.comenta} onClick={this.handleClickOpen} >Comenta</Button>
                <Modal className={classes.modalParticipa}
                       aria-labelledby="simple-modal-title"
                       aria-describedby="simple-modal-description"
                       open={this.state.open}
                       onClose={this.handleClose}
                >
                    <Participa onClose={this.handleClose}/>
                </Modal>
            </div>
        );
    }
}

Bandita.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Bandita);