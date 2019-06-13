import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles}from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    boton:{
        background: '#ffe01b',
    }
});

class AlertDialog extends React.Component {
    state = {
        open: true,
    };

    /*
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    */

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const {classes} = this.props;
        return (

                <div>
                    {/*<Button onClick={this.handleClickOpen}>Open alert dialog</Button>*/}
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Plataforma Digital Nacional"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Esta es una versión Alpha cuyo objetivo es probar las funcionalidades, interfaz y experiencia de usuario para la página de inicio, y los primeros dos sistemas de la Plataforma.
                            </DialogContentText>

                            <DialogContentText>
                                <b>
                                    Esta versión NO debe ser vista como final, NI contiene los datos reales.
                                </b>
                            </DialogContentText>

                            <DialogContentText>
                                Te invitamos a dejar tus comentarios de esta versión accediendo al botón "COMENTA"
                            </DialogContentText>

                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={this.handleClose} className={classes.boton}>
                                Aceptar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>

        );
    }
}


AlertDialog.propTypes = {
  classes : PropTypes.object.isRequired
};

export default withStyles(styles)(AlertDialog);