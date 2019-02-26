import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Fab from "@material-ui/core/Fab/Fab";
import Save from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import Typography from "@material-ui/core/Typography/Typography";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import rp from "request-promise";
import Mensaje from "../../Mensajes/Mensaje";
import MensajeError from "../../Mensajes/MensajeError";

const styles = theme => ({
    fab: {
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit *5,
            height: theme.spacing.unit *5,
        },
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing.unit *4,
            height: theme.spacing.unit *4,
        },

    },
    formControl: {
        width: '100%'
    },
    mensajeError: {
        color: 'red',
        display : 'inline',
        marginRight : theme.spacing.unit * 2,

    },
    title: {
        color: theme.palette.secondary.dark,
    },
    text: {
        color: theme.palette.textGrey.color
    },
    container:{
        [theme.breakpoints.down('sm')]: {
            marginBottom : theme.spacing.unit *2,
        },
    }
});


const expCorreo = '^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)+(.[a-z]{2,4})$';
let nuevo = {
    nombre: '',
    apellido1: '',
    apellido2: '',
    dependencia: '',
    cargo: '',
    correo: '',
    telefono_personal: '',
    telefono_oficina: '',
    extension: ''
};

class FormularioContacto extends React.Component {
    state = {
        registro: nuevo,
        mensaje: '',
        tituloMensaje: '',
        mensaje_modal: '',
        flag_msj: false,
        flag_msj_error: false,
    };

    componentDidMount() {
        if (!this.props.contacto) {
            let aux = JSON.parse(localStorage.getItem("sesion"));
            this.setState({
                currentUser: aux.currentUser,
            }, () => {
                nuevo.dependencia = this.state.currentUser.dependencia
            });
        }
        else {
            this.setState({
                registro: this.props.contacto,
                correoOriginal: this.props.contacto.correo,
            })
        }
    }

    handleChange = name => event => {
        this.setState({
            registro: {
                ...this.state.registro,
                [name]: event ? (event.target ? event.target.value : event.value) : ''
            }
        })
    };

    handleClick = () => {
        let item = this.state.registro;
        if (item.cargo && item.nombre && item.apellido1 && item.correo &&
            item.correo.match(expCorreo) !== null) {
            return this.saveRegistro();
        } else {
            this.setState({
                mensaje: '*Llena los campos requeridos'
            });
        }
    };
    saveRegistro = () => {
        this.state.registro.fecha_alta = new Date();
        this.state.registro.estatus = 'ACTIVO';

        let options = {
            method: 'POST',
            uri: 'https://plataformadigitalnacional.org/api/contactos_conexion',
            headers: {
                'Prefer': 'return = representation',
                'Content-Type': 'application/json'
            },
            body: this.state.registro,
            json: true
        };

        rp(options)
            .then(parseBody => {
                this.setState({
                    registro: nuevo,
                    flag_msj: true,
                    tituloMensaje: 'Aviso',
                    mensaje_modal: 'El contacto se ha registrado correctamente',
                    flag_send: false,
                }, () => {
                    if (this.props.updateView) this.props.updateView();
                });
                return true;
            })
            .catch(err => {
                let mensaje = '';
                switch (err.error.code) {
                    case '23505':
                        mensaje = 'Correo electrónico ya registrado en la institución';
                        break;
                    default :
                        mensaje = 'Error al insertar registro';
                        break;
                }
                this.setState({
                    flag_msj_error: true,
                    mensaje_error_modal: mensaje
                })
            });
        return null;
    };

    saveChanges = () => {
        let params = {};
        let registro = this.state.registro;
        params.correo = 'eq.' + this.state.correoOriginal;

        let options = {
            method: 'PATCH',
            uri: 'https://plataformadigitalnacional.org/api/contactos_conexion',
            qs: params,
            headers: {
                'Prefer': 'return = representation',
                'Content-Type': 'application/json'
            },
            body: {
                'nombre': registro.nombre,
                'apellido1': registro.apellido1,
                'apellido2': registro.apellido2,
                'cargo': registro.cargo,
                'correo': registro.correo,
                'telefono_personal': registro.telefono_personal,
                'telefono_oficina': registro.telefono_oficina,
                'extension': registro.extension
            },
            json: true
        };
        rp(options)
            .then(data => {
                this.setState({
                    tituloMensaje: 'Aviso',
                    mensaje_modal: 'Los cambios se han realizado correctamente',
                    flag_msj: true
                });
                return true;
            })
            .catch(err => {
                console.log("Error:", err);
                let mensaje = '';
                switch (err.error.code) {
                    case '23505':
                        mensaje = 'Correo electrónico ya registrado en la institución';
                        break;
                    default :
                        mensaje = 'Error al actualizar registro';
                        break;
                }
                this.setState({
                    flag_msj_error: true,
                    mensaje_error_modal: mensaje
                });
                return true;
            });
    };

    handleCloseMsj = () => {
        this.setState({flag_msj: false}, () => {
            if(this.props.closeContainer) this.props.closeContainer();
        });
    };
    handleCloseMsjError = () => {
        this.setState({flag_msj_error: false});
    };

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Grid container spacing={32} className={classes.container}>
                    <Grid item xs={12}>
                        <Mensaje mensaje={this.state.mensaje_modal} titulo={this.state.tituloMensaje}
                                 open={this.state.flag_msj} handleClose={this.handleCloseMsj}/>
                        <MensajeError mensaje={this.state.mensaje_error_modal} titulo={'Error'}
                                      open={this.state.flag_msj_error} handleClose={this.handleCloseMsjError}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} className={classes.title}>
                            Datos del contacto de soporte
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.text} variant={"subtitle2"}>
                            Los contactos proporcionados serán de ayuda y soporte técnico para mantener la conexión con
                            la PDN.<br/>
                            Para registrar un nuevo contacto llena los campos solicitados y da clic en el botón
                            "Agregar"
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField className={classes.formControl} required={true}
                                   id={'cargo'}
                                   label={'Cargo'} value={this.state.registro.cargo}
                                   onChange={this.handleChange('cargo')}
                        />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <TextField className={classes.formControl} required={true}
                                   id={'dependencia'}
                                   label={'Institución'} value={this.state.registro.dependencia}
                                   disabled={true}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField className={classes.formControl} required={true}
                                   id={'nombre'}
                                   label={'Nombre'} value={this.state.registro.nombre}
                                   onChange={this.handleChange('nombre')}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField className={classes.formControl} required={true}
                                   id={'apellido1'}
                                   label={'Apellido Uno'} value={this.state.registro.apellido1}
                                   onChange={this.handleChange('apellido1')}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField className={classes.formControl}
                                   id={'apellido2'}
                                   label={'Apellido Dos'} value={this.state.registro.apellido2}
                                   onChange={this.handleChange('apellido2')}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField className={classes.formControl} required={true} type={'email'}
                                   error={this.state.registro.correo !== '' && this.state.registro.correo.match(expCorreo) === null}
                                   id={'correo'}
                                   label={'Correo electrónico'} value={this.state.registro.correo}
                                   onChange={this.handleChange('correo')}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField className={classes.formControl}
                                   id={'telefonoPersonal'}
                                   label={'Telefono Personal'} value={this.state.registro.telefono_personal}
                                   onChange={this.handleChange('telefono_personal')}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField className={classes.formControl}
                                   id={'telefonoOficina'}
                                   label={'Telefono Oficina'} value={this.state.registro.telefono_oficina}
                                   onChange={this.handleChange('telefono_oficina')}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField className={classes.formControl}
                                   id={'extension'}
                                   label={'Extensión'} value={this.state.registro.extension}
                                   onChange={this.handleChange('extension')}
                        />
                    </Grid>
                    <Grid item xs={12} style={{textAlign:'right'}} >
                        <Typography variant={"body1"} className={classes.mensajeError}>{this.state.mensaje}</Typography>
                        {!this.props.contacto &&
                        <Tooltip title={'Agregar'}>
                            <Fab color="primary" aria-label="Add" className={classes.fab}
                                 onClick={() => this.handleClick()}>
                                <AddIcon/>
                            </Fab>
                        </Tooltip>
                        }
                        {this.props.contacto &&
                        <Tooltip title={'Guardar cambios'}>
                            <Fab color="primary" aria-label="Add" className={classes.fab}
                                 onClick={() => this.saveChanges()}>
                                <Save/>
                            </Fab>
                        </Tooltip>
                        }
                    </Grid>
                </Grid>

            </div>
        );
    }
}

export default withStyles(styles)(FormularioContacto);