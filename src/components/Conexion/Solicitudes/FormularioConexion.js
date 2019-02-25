import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl/FormControl";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Typography from "@material-ui/core/Typography/Typography";
import rp from "request-promise";
import Select from "@material-ui/core/Select/Select";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Button from "@material-ui/core/Button/Button";
import {ReCaptcha, loadReCaptcha} from 'react-recaptcha-google';
import Modal from "@material-ui/core/Modal/Modal";
import Mensaje from "../../Mensajes/Mensaje";
import MensajeError from "../../Mensajes/MensajeError";
import app from "../../../config/firebase";

const styles = theme => ({
    formControl: {
        width: '100%'
    },
    mensajeError: {
        color: 'red'
    },
    title: {
        color: theme.palette.primary.dark,
    },
    text: {
        color: theme.palette.textGrey.color
    },
    button: {
        margin: theme.spacing.unit,
        float: 'right'
    },

    paperCaptcha: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 50,
        },
        [theme.breakpoints.down('sm')]: {
            width: '80%',
            height: '80%',
            overflowY: 'scroll',
        },
        [theme.breakpoints.up('xl')]: {
            width: theme.spacing.unit * 70,
        },
    },
    textCenter: {
        textAlign: 'center',
        color: theme.palette.primary.dark
    },
});

const nuevo = {
    nombre: '',
    apellido1: '',
    apellido2: '',
    dependencia: '',
    cargo: '',
    correo: '',
    confirmacionCorreo: '',
    telefono_personal: '',
    telefono_oficina: '',
    extension: '',
    otra_dependencia: '',
    password: '',
    confirmacionPassword: '',
    uid_firebase: null
};

let loadDependencias = (_this) => {
    let sug = [];
    let index = 0;
    let options = {
        uri: 'https://demospdn.host/demo1/captura/api/catDependencias',
        json: true
    };
    rp(options)
        .then(data => {
            data.map(item => {
                sug.push({id: index, value: item.valor, label: item.valor});
                index += 1;
            });
            _this.setState({dependencias: sug});
        }).catch(err => {
        alert("_No se puedó obtener la información");
        console.log(err);
    });
};


const expCorreo = '^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)+(.[a-z]{2,4})$';
const expPass = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])([A-Za-z\\d$@$!%*?&]|[^ ]){8,15}$';

const mensajeSolicitudEnviada = 'Los permisos de conexión a la PDN serán otorgados\n' +
    '                                        o denegados por la SESNA posteriormente a una evaluación de aspectos técnicos de\n' +
    '                                        interconexión. En caso de que los sujetos obligados no cumplan con los\n' +
    '                                        requerimientos de interconexión a la PDN establecidos por la SESNA, se denegará\n' +
    '                                        el permiso de conexión a la PDN.';

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

class FormularioConexion extends React.Component {
    state = {
        registro: nuevo,
        mensaje: '',
        dependencias: [],
        flag_send: false,
        flag_msj: false,
        flag_error: false
    };

    constructor(props, context) {
        super(props, context);
        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
    }

    componentDidMount() {
        loadDependencias(this);
        loadReCaptcha();
        if (this.recaptcha) {
            this.recaptcha.reset();
        }
    }

    onLoadRecaptcha() {
        if (this.recaptcha) {
            this.recaptcha.reset();
        }
    }

    verifyCallback(recaptchaToken) {
        if (recaptchaToken) {
            this.recaptcha.reset();
            this.setState({
                flag_send: false
            }, () => {
                this.validaR1();
            })
        }
    }

    validaR1 = () => {
        let params = {};
        params.correo = 'eq.' + this.state.registro.correo;
        params.estatus = 'in.' + '("PENDIENTE","APROBADA")';
        params.dependencia = 'neq.' + this.state.registro.dependencia;
        let options = {
            uri: 'https://plataformadigitalnacional.org/api/solicitudes_conexion',
            qs: params,
            json: true
        };

        rp(options)
            .then(data => {
                if (data.length > 0)
                    this.setState({
                        flag_error: true,
                        mensajeError: 'El correo se encuentra registrado en la solicitud de otra dependencia'
                    });
                else this.validaR2();
            })
            .catch(err => {
                this.setState({
                    flag_error: true,
                    mensajeError: 'Error al validar el registro'
                });
            });

    };
    validaR2 = () => {
        let params = {};
        params.estatus = 'eq.APROBADA';
        params.dependencia = 'eq.' + this.state.registro.dependencia;
        let options = {
            uri: 'https://plataformadigitalnacional.org/api/solicitudes_conexion',
            qs: params,
            json: true
        };
        rp(options)
            .then(data => {
                if (data.length > 0)
                    this.setState(
                        {
                            flag_error: true,
                            mensajeError: 'La dependencia ya cuenta con una conexión aprobada'
                        }
                    );
                else this.createUserFireBase();

            })
            .catch(err => {
                this.setState({
                    flag_error: true,
                    mensajeError: 'Error al validar el registro'
                });
            });
    };

    saveRegistros = () => {
        let registro = {
            nombre: this.state.registro.nombre,
            apellido1: this.state.registro.apellido1,
            apellido2: this.state.registro.apellido2,
            dependencia: this.state.registro.dependencia ? this.state.registro.dependencia : this.state.registro.otra_dependencia,
            cargo: this.state.registro.cargo,
            correo: this.state.registro.correo,
            telefono_personal: this.state.registro.telefono_personal,
            telefono_oficina: this.state.registro.telefono_oficina,
            extension: this.state.registro.extension,
            uid_firebase: this.state.uidUsuario
        };
        registro.fecha_solicitud = new Date();
        registro.estatus = 'PENDIENTE';

        let options = {
            method: 'POST',
            uri: 'https://plataformadigitalnacional.org/api/solicitudes_conexion',
            headers: {
                'Prefer': 'return = representation',
                'Content-Type': 'application/json'
            },
            body: registro,
            json: true
        };

        rp(options)
            .then(parseBody => {
                this.setState({
                    flag_msj: true,
                    registro: nuevo,
                    flag_send: false,
                    oficio: null,
                    idDocument: null
                });
            })
            .catch(err => {
                let mensaje = '';
                switch (err.error.code) {
                    case '23505':
                        mensaje = 'Correo electrónico ya registrado en la dependencia';
                        break;
                    default :
                        mensaje = 'Error al insertar registro';
                        break;
                }
                this.setState({
                    flag_error: true,
                    mensajeError: mensaje
                })
            })
    };

    createUserFireBase = () => {
        let _this = this;
        app.auth().createUserWithEmailAndPassword(this.state.registro.correo, this.state.registro.password)
            .then(function (result) {
                _this.setState({
                    uidUsuario: result.user.uid,
                }, () => {
                    _this.createUserFirestore();
                });

                //result.user.uid
            })
            .catch(function (err) {
                _this.setState({
                    flag_error: true,
                    mensajeError: 'Error al crear la cuenta de usuario'
                })
            })
    };
    createUserFirestore = () => {
        let db = app.firestore();
        let _this = this;
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);
        db.collection('users_pdn').doc().set(
            {
                uid: _this.state.uidUsuario,
                nombre: _this.state.registro.nombre,
                apellido1: _this.state.registro.apellido1,
                apellido2: _this.state.registro.apellido2,
                cargo: _this.state.registro.cargo,
                correo: _this.state.registro.correo,
                dependencia: _this.state.registro.dependencia,
                extension: _this.state.registro.extension,
                fecha_solicitud: new Date(),
                rol: 'SUJETO_OBLIGADO',
                telefono_oficina: this.state.registro.telefono_oficina,
                telefono_personal: _this.state.registro.telefono_personal,
            }).then(function () {
            _this.saveRegistros();
        }).catch(function (err) {
            console.log("Error: ",err);
        })
    };

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
        let okDependencia = item.dependencia && item.dependencia !== 'OTRA' ? true : (item.dependencia === 'OTRA' && item.otra_dependencia) ? true : false;
        let okCorrreo = item.correo.trim() === item.confirmacionCorreo.trim() && item.correo.match(expCorreo) !== null;
        let okPass = item.password.trim() === item.confirmacionPassword.trim() && item.password.match(expPass);
        if (item.cargo && okDependencia && item.nombre && item.apellido1 && okCorrreo && okPass) {
            this.setState({
                mensaje: ''
            }, () => {
                this.verifyCaptcha();
            })

        } else {
            this.setState({
                mensaje: '*Llena los campos requeridos. ' + (!okCorrreo ? 'Valida el correo electrónico. ' : '') + (!okPass ? 'Valida la contraseña.' : '')
            })
        }
    };
    verifyCaptcha = () => {
        this.setState({
            flag_send: true
        });
    };
    handleClose = () => {
        this.setState({flag_send: false});
    };
    handleCloseMsj = () => {
        this.setState({flag_msj: false});
    };
    handleCloseError = () => {
        this.setState({flag_error: false});
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container spacing={32}>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} className={classes.title}>
                            Datos del encargado de la conexión
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.text} variant={"subtitle2"}>
                            Para registrar el encargado de la conexión con la PDN de su dependencia, capture los
                            campos
                            requeridos y pulse el botón "Enviar".<br/>
                            En breve será enviada una confirmación al correo electrónico registrado.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-simple">Dependencia</InputLabel>
                            <Select
                                value={this.state.registro.dependencia}
                                onChange={this.handleChange('dependencia')}
                                inputProps={{
                                    name: 'dependencia',
                                    id: 'dependencia-simple',
                                    required: true
                                }}

                            >
                                <MenuItem value='OTRA' key={-1}>
                                    <em>OTRA</em>
                                </MenuItem>
                                {
                                    this.state.dependencias.map(item => {
                                        return (<MenuItem value={item.value} key={item.id}>{item.label}</MenuItem>)
                                    })
                                }

                            </Select>
                        </FormControl>
                    </Grid>
                    {
                        this.state.registro.dependencia === 'OTRA' &&
                        <Grid item xs={12} md={6}>
                            <TextField className={classes.formControl}
                                       id={'dependencia'}
                                       label={'Dependencia'} value={this.state.registro.otra_dependencia}
                                       onChange={this.handleChange('otra_dependencia')}
                            />
                        </Grid>
                    }
                    {
                        this.state.registro.dependencia !== 'OTRA' &&
                        <Grid item xs={12} md={6}/>

                    }
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

                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField className={classes.formControl} required={true}
                                   id={'cargo'}
                                   label={'Cargo'} value={this.state.registro.cargo}
                                   onChange={this.handleChange('cargo')}
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


                    <Grid item xs={12} md={3}>
                        <TextField className={classes.formControl} required={true} type={'email'}
                                   error={this.state.registro.correo && this.state.registro.correo.match(expCorreo) === null}
                                   id={'correo'}
                                   label={'Correo electrónico'} value={this.state.registro.correo}
                                   onChange={this.handleChange('correo')}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField className={classes.formControl} required={true} type={'email'}
                                   error={this.state.registro.correo !== this.state.registro.confirmacionCorreo}
                                   id={'confirmacionCorreo'}
                                   label={'Confirmación correo electrónico'}
                                   value={this.state.registro.confirmacionCorreo}
                                   onChange={this.handleChange('confirmacionCorreo')}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField className={classes.formControl} required={true} type={'password'}
                                   error={this.state.registro.password && this.state.registro.password.match(expPass) === null}
                                   id={'password'}
                                   label={'Contraseña'} value={this.state.registro.password}
                                   onChange={this.handleChange('password')}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField className={classes.formControl} required={true} type={'password'}
                                   error={this.state.registro.password !== this.state.registro.confirmacionPassword}
                                   id={'confirmacionPassword'}
                                   label={'Confirmación contraseña'}
                                   value={this.state.registro.confirmacionPassword}
                                   onChange={this.handleChange('confirmacionPassword')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"body1"}
                                    className={classes.mensajeError}>{this.state.mensaje}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography color={"textSecondary"}>
                            La contraseña deberá seguir las siguientes políticas:<br/>
                            *Mínimo 8 caracteres<br/>
                            *Máximo 15 caracteres<br/>
                            *Al menos una letra mayúscula<br/>
                            *Al menos una letra minúscula<br/>
                            *Al menos un dígito <br/>
                            *No espacios en blanco <br/>
                            *Al menos un caracter especial ($@$!%*?&)<br/>
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Button variant="contained" color="primary" className={classes.button}
                                onClick={() => this.handleClick()}>
                            Enviar
                        </Button>
                    </Grid>


                </Grid>
                <div>
                    <Modal
                        open={this.state.flag_send}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        onClose={this.handleClose}
                    >
                        <div style={getModalStyle()} className={classes.paperCaptcha}>
                            <Grid container justify={"center"}>
                                <Grid item xs={12}>
                                    <Typography variant={"h6"} className={classes.textCenter}>Verificación de
                                        seguridad</Typography>
                                </Grid>
                                <Grid item xs={12} style={{textAlign: 'center'}}>
                                    <ReCaptcha
                                        ref={(el) => {
                                            this.recaptcha = el
                                        }}
                                        size="normal"
                                        sitekey="6Lfs8YcUAAAAAGVQL-BpW_w__FSJeWq-xAUoPbf9"
                                        verifyCallback={this.verifyCallback}
                                        onloadCallback={this.onLoadRecaptcha}
                                        style={{display: 'inline-block'}}
                                        badge={"inline"}
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.textCenter}>
                                    <Typography variant={"h6"}>{this.state.mensajeRegistro}</Typography>
                                </Grid>
                            </Grid>
                        </div>
                    </Modal>
                    <Mensaje titulo={'Solicitud enviada'} mensaje={mensajeSolicitudEnviada}
                             open={this.state.flag_msj} handleClose={this.handleCloseMsj}
                    />
                    <MensajeError mensaje={this.state.mensajeError}
                                  open={this.state.flag_error} handleClose={this.handleCloseError}
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)

(
    FormularioConexion
)
;