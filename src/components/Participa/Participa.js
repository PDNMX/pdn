import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import {withStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button/Button";
import rp from 'request-promise';

const styles = theme => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        position: 'fixed',
        maxWidth: '1200px',
        height: 'auto',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
       // padding: theme.spacing(2),
    },
    title: {
        color: theme.palette.primary.dark
    },
    contenedor:{
        height: '634px',
        //overflowY : 'scroll'
    },
    close:{

    }
});

class Participa extends React.Component {
    state = {
        nombre: '',
        comentario: '',
        telefono: '',
        correoAlternativo: '',
        mensaje: ''
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    enviar = () => {
        if (!this.state.comentario) return;
        let comentario = {
            nombre: this.state.nombre,
            correo:  'test',//this.props.sesion.currentUser.email,
            fecha: new Date(),
            telefono: this.state.telefono,
            comentario: this.state.comentario,
            correo_alternativo: this.state.correoAlternativo,
        };
        let options = {
            method: 'POST',
            uri: 'https://plataformadigitalnacional.org/api/comentarios_pdn',
            headers: {
                'Prefer': 'return = representation',
                'Content-Type': 'application/json'
            },
            body: comentario,
            json: true
        };

        rp(options)
            .then(parseBody => {
                this.setState({mensaje: 'Registro completo. Gracias por participar'});
            }).catch(err => {
            this.setState({mensaje: 'No se pudo completar la operación'});
            console.log(err);
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.paper}>

            < Grid container justify={"center"}>
                    <Grid item xs={12} style={{"textAlign":"right"}} >
                        <Button variant="text" color="primary" className={classes.close}
                                onClick={() => this.props.onClose()}>
                            X
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={4} className={classes.contenedor}>
                    <Grid item xs={12}>
                        <iframe title={'Participa'}
                            src={process.env.REACT_APP_LINK_GOOGLEFORM}
                            width="auto" height="100%" frameBorder="0" marginHeight="0" marginWidth="0">Loading…
                        </iframe>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


export default withStyles(styles)(Participa)

