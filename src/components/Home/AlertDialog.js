import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles}from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import MuiLink from '@material-ui/core/Link';
import {Typography} from "@material-ui/core";

const styles = theme => ({
    button:{
        background: '#ffe01b',
    },
    ul: {
        listStyle: 'none',
        paddingLeft: '20px',
        color: theme.palette.text.primary
    },
    li: {
        "&:before": {
            content: '"•"',
            color: '#5fb1e6',
            fontWeight: "bold",
            display: "inline-block",
            width: "1em",
            marginLeft: "-1em"
        },
        padding: theme.spacing(1)
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

                        <Typography paragraph>
                            Esta es la versión Beta 0.6 de la Plataforma Digital Nacional (PDN), lo cual significa:
                        </Typography>

                        <ul className={classes.ul}>
                            <li className={classes.li}>
                                <Typography color='textPrimary' display='inline'>
                                    <b>Beta:</b> Se encuentra en una versión preliminar, es decir, se están mejorando constantemente sus funcionalidades.
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography color='textPrimary' display='inline'>
                                    <b>0.6:</b> Contiene datos reales de los Sistemas 2, 3, y 6 y se logró la interconexión con algunos de los Sujetos Obligados (Sistemas 2 y 3).
                                </Typography>
                            </li>
                        </ul>

                        <Typography paragraph>
                            Es decir, esta versión  <b>NO debe ser vista como final</b>.
                        </Typography>

                        <Typography paragraph>
                            Te invitamos a revisar los <MuiLink component={Link} to='/terminos'>"Términos y Condiciones de Uso"</MuiLink>,
                            así como a dejar tus comentarios sobre las funcionalidades y experiencia de usuario en la sección de "Comenta".
                        </Typography>

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
