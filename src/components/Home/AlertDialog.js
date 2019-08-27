import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles}from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import MuiLink from '@material-ui/core/Link';

const styles = theme => ({
    button:{
        background: '#ffe01b',
    },
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
                                Esta es una versión Beta 0.2, lo que significa que <b>NO debe ser vista como final</b>.
                            </DialogContentText>

                            <DialogContentText>
                                <b>
                                    Esta versión contiene datos reales de los Sistemas 2, 3 y 6; y tendrá un proceso de constante y permanente actualización, tanto de los datos como de sus funcionalidades.
                                </b>
                            </DialogContentText>

                            <DialogContentText>
                                Te invitamos a revisar los <MuiLink component={Link} to='/terminos'>"Términos y Condiciones de Uso"</MuiLink>, así como a dejar tus comentarios en sobre las funcionalidades, interfaz y experiencia de usuario en la sección de "Comenta".
                            </DialogContentText>

                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" component={Link} to='/terminos' className={classes.button}>
                                Términos
                            </Button>
                            <Button variant="contained" onClick={this.handleClose} className={classes.button}>
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