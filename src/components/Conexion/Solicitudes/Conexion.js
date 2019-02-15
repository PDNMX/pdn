import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import FormularioConexion from './FormularioConexion';
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import TablaRegistros from "./TablaRegistros";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import rp from 'request-promise';
import {ReCaptcha, loadReCaptcha} from 'react-recaptcha-google';
import Modal from "@material-ui/core/Modal/Modal";
import "../../../index.css";
import axios from 'axios';
import Mensaje from '../../Mensajes/Mensaje';
import MensajeError from '../../Mensajes/MensajeError';
import Footer from "../../Home/Footer";
import imgBanner from '../../../assets/banners/FOTO_BANNER_3.jpg';
import Header from "../../PDNAppBar/PDNAppBar";

const expCorreo = '^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)+(.[a-z]{2,4})$';

const styles = theme => ({
    section: {
        maxWidth: '1200px'
    },
    contenedor: {
        padding: theme.spacing.unit * 5,
    },
    bgImg: {
        width: '100%',
        position: 'absolute',
        zIndex: 2,
        opacity: 0.2,
    },
    titleLight: {
        color: theme.palette.titleBanner.color,
    },
    titleSub: {
        color: theme.palette.titleBanner.color,
        paddingTop: '10px',
    },
    bgContainer: {
        paddingTop: '102px',
        marginBottom: '266px'
    },
    button: {
        margin: theme.spacing.unit,
        float: 'right'
    },
    text: {
        color: theme.palette.primary.dark,
    },
    textCenter: {
        textAlign: 'center',
        color: theme.palette.primary.dark
    },
    gRecaptcha: {
        margin: 'auto',
        width: '300px',
        display: 'inline-block !important'
    },
    banner: {
        height: '600px',
        zIndex: '1',
        position: 'relative',
        overflow: 'hidden',
    }
});


class Conexion extends React.Component {
    state = {
        registros: [],
        flag_send: false,
        flag_msj: false,
        flag_error: false,
        oficio: null
    };


    constructor(props, context) {
        super(props, context);
        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
    }

    componentDidMount() {
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
                this.saveOficio();
            })
        }
    }

    handleClick = () => {
        let item = this.state.registro;
        let okDependencia = item.dependencia && item.dependencia !== 'OTRA' ? true : (item.dependencia === 'OTRA' && item.otra_dependencia) ? true : false;
        if (item.cargo && okDependencia && item.nombre && item.apellido1 && item.correo &&
            item.correo.match(expCorreo) !== null) {
            this.verifyCaptcha();
        } else {
            this.setState({
                mensaje: '*Llena los campos requeridos'
            })
        }
    };
    verifyCaptcha = () => {
        this.setState({
            flag_send: true
        });
    };
    addRegistro = (item) => {
        this.setState({
            registros: [
                ...this.state.registros,
                {
                    nombre: item.nombre,
                    apellido1: item.apellido1,
                    apellido2: item.apellido2,
                    dependencia: item.dependencia !== 'OTRA' ? item.dependencia : item.otra_dependencia,
                    cargo: item.cargo,
                    correo: item.correo,
                    telefono_personal: item.telefono_personal,
                    telefono_oficina: item.telefono_oficina,
                    extension: item.extension
                }
            ],
            mensaje: ''
        })
    };


    removeRegistro = (elemento) => {
        let index = this.state.registros.indexOf(elemento);
        let aux = this.state.registros;
        aux.splice(index, 1);
        this.setState({
            registros: aux
        });
    };

    saveOficio = () => {
        if (this.state.registros.length > 0 && this.state.oficio) {
            let fd = new FormData();
            fd.append('file', this.state.oficio, this.state.oficio.name);
            axios
                .post('https://demospdn.host/pdn/uploadOficio', fd)
                .then(res => {
                    if (res && res.status === 200) {
                        this.setState({
                            idDocument: res.data.idDocument
                        }, () => {
                            this.saveRegistros();
                        })
                    }
                })
                .catch(err => {
                    console.log("err");
                    this.setState({
                        flag_error: true,
                        mensajeError: 'Error'
                    })
                })
        }
    };

    deleteOficio = () => {
        let fd = new FormData();
        fd.append('idDocument', this.state.idDocument + '.pdf');
        axios
            .post('https://demospdn.host/pdn/deleteOficio', fd)
            .then(res => {
                return true;
            })
            .catch(err => {
                return false;
            })
    };

    saveRegistros = () => {
        let registros = this.state.registros;
        for (let i = 0; i < registros.length; i++) {
            registros[i].fecha_solicitud = new Date();
            registros[i].estatus = 'PENDIENTE';
            registros[i].id_oficio = this.state.idDocument;
        }
        if (registros.length > 0) {
            let options = {
                method: 'POST',
                uri: 'https://plataformadigitalnacional.org/api/solicitudes',
                headers: {
                    'Prefer': 'return = representation',
                    'Content-Type': 'application/json'
                },
                body: registros,
                json: true
            };

            rp(options)
                .then(parseBody => {
                    this.setState({
                        flag_msj: true,
                        registros: [],
                        flag_send: false,
                        oficio: null,
                        idDocument: null
                    });
                    this.fileInput.value = "";
                })
                .catch(err => {
                    let mensaje = '';
                    switch (err.error.code) {
                        case '23505':
                            mensaje = 'Correo electrónico ya registrado: ' + err.error.details;
                            break;
                        default :
                            mensaje = 'Error al insertar registro';
                            break;
                    }
                    this.deleteOficio();
                    this.setState({
                        flag_error: true,
                        mensajeError: mensaje
                    })
                })
        }
    };

    handleFile = (e) => {
        let file = e.target.files[0];
        this.setState({
            oficio: file
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Header/>
                <div className={classes.banner}>
                    <img className={classes.bgImg} src={imgBanner}/>
                    <Grid container justify={"center"} spacing={0}>
                        <Grid item xs={12} className={classes.section} style={{paddingTop: 150}}>
                            <Grid container spacing={24}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant={"h2"} className={classes.titleLight}>Solicitud de
                                        conexión</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h6" className={classes.titleSub}>
                                        Los sujetos obligados deberán solicitar la conexión con la PDN, adjuntando un
                                        oficio en formato digital
                                        (PDF), especificando nombres, cargos y datos de contacto de él o los servidores
                                        públicos encargados de
                                        mantener la conexión con la PDN, que tendrán nivel mínimo de Director general u
                                        homólogo.<br/>
                                        Los permisos de conexión a la PDN serán otorgados o denegados por la SESNA
                                        posteriormente a una evaluación de aspectos técnicos de interconexión. En caso
                                        de
                                        que los sujetos obligados no cumplan con los requerimientos de interconexión a
                                        la
                                        PDN establecidos por la SESNA, se denegará el permiso de conexión a la PDN.
                                    </Typography>
                                    <br/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>


                <div className={classes.bgContainer}>
                    <Grid container justify={'center'} spacing={0}>
                        <Grid item xs={12} className={classes.section}>
                            <Paper className={classes.contenedor}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <FormularioConexion/>
                                    </Grid>

                                    {
                                        /*
                                        6Led7YcUAAAAANnOSK80RNv4h_o45NAWXFC9Jn8o key pdn serv
                                        6Lfs8YcUAAAAAGVQL-BpW_w__FSJeWq-xAUoPbf9 localhost
                                        */
                                    }
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
                < Footer/>
            </div>
        );
    }

}

export default withStyles(styles)(Conexion);