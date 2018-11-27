import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography";
import {withStyles} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import rp from 'request-promise';
import connect from "react-redux/es/connect/connect";

const styles = theme => ({
    paper: {

        backgroundColor: theme.palette.background.paper,
        position: 'fixed',
        width: '650px',
        height: 'auto',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        padding: theme.spacing.unit * 2,
    },
    title: {
        color: theme.palette.primary.dark
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
            correo: this.props.sesion.currentUser.email,
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
                <Grid container spacing={32}>
                    <Grid item xs={12}>
                        <Typography variant={"title"} align={"center"} className={classes.title}>
                            ENCUESTA
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"subheading"} align={"justify"}>
                            Déjanos tu comentario, los campos necesarios están marcados con *.
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="standard-name"
                            label="Nombre"
                            className={classes.textField}
                            value={this.state.nombre}
                            onChange={this.handleChange('nombre')}
                            margin="normal" fullWidth
                            inputProps={{
                                maxLength: "50"
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="standard-name"
                            label="Teléfono"
                            className={classes.textField}
                            value={this.state.telefono}
                            onChange={this.handleChange('telefono')}
                            margin="normal" fullWidth
                            inputProps={{
                                maxLength: "20"
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="standard-name"
                            label="Correo alternativo"
                            className={classes.textField}
                            value={this.state.correoAlternativo}
                            onChange={this.handleChange('correoAlternativo')}
                            margin="normal" fullWidth
                            inputProps={{
                                maxLength: "50"
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="standard-name"
                            label="Comentario"
                            className={classes.textField}
                            value={this.state.comentario}
                            onChange={this.handleChange('comentario')}
                            margin="normal"
                            fullWidth required={true}
                            multiline={true} rows={3} rowsMax={3}
                            inputProps={{
                                maxLength: "140"
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"subheading"} align={"justify"}>
                            {this.state.mensaje}
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" color="primary" className={classes.button}
                                onClick={() => this.props.onClose()}>
                            Cerrar
                        </Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" color="primary" className={classes.button}
                                onClick={() => this.enviar()}>
                            Enviar
                        </Button>
                    </Grid>

                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let sessionR = {
        sesion: state.sesionReducer.sesion
    };
    return sessionR;
};
const mapDispatchToProps = (dispatch, ownProps) => ({
    newSesion: (sesion) => dispatch({type: 'SET_SESION', sesion}),
});

let previo = withStyles(styles)(Participa);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(previo)

