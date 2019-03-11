import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import "../../../index.css";
import Footer from "../../Home/Footer";
import Endpoints from "./Endpoints";
import FormularioEndpoint from './FormularioEndpoint';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from "@material-ui/core/Button/Button";
import FormularioContacto from "./FormularioContacto";
import TablaContactos from "../Administracion/TablaContactos";
import rp from "request-promise";
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import Logo from "../../../assets/icono-administracion.svg";
import withWidth, {isWidthUp} from '@material-ui/core/withWidth';
import {Link} from "react-router-dom";
import PDNLogo from "../../../assets/PDN.png";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    section: {
        maxWidth: '1200px',
        marginBottom: theme.spacing.unit * 5,
    },
    titleSub: {
        color: theme.palette.titleBanner.color,
        paddingTop: '10px',
    },
    tituloPanel: {
        color: theme.palette.primary.dark,
    },
    aviso: {
        color: theme.palette.primary.dark,
        textAlign: 'center',
    },
    text: {
        color: theme.palette.textGrey.color,
        marginBottom: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 2,
    },
    button: {
        margin: theme.spacing.unit,
        float: 'right'
    },
    textAviso: {
        color: theme.palette.textGrey.color,
        paddingTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 5,
        textAlign: 'center',
    },
    item3: {
        maxWidth: 1200
    },
    s2: {
        maxWidth: '150px'
    },
    whiteText: {
        color: '#fff'
    },
    pdnLogo: {
        maxWidth: 110,
        paddingLeft: "40px",
        paddingTop: "40px",
        paddingBottom: "40px"
    },
    container1: {
        background: 'grey',
        paddingTop: '75px',
        paddingBottom: '75px',
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        //zIndex: 5
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    item1: {
        paddingRight: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
    },
    item2: {
        paddingRight: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2
    },
    containerTable: {
        overflowX: 'auto',
        marginBottom: theme.spacing.unit * 5,
        maxWidth: '1200px'
    }
});

class ConsolaAdministracionSO extends React.Component {
    state = {
        oficio: null,
        registros: [],
        estatus: null,
        updateTable: false,
    };

    updateView = () => {
        this.setState({
            updateTable: !this.state.updateTable,
        });
    };

    componentDidMount() {
        //Validar si la conexión esta APROBADA, SI ESTA PENDIENTE SÓLO PODRÁ SUBIR EL OFICIO
        let aux = JSON.parse(localStorage.getItem("sesion"));
        this.setState({
            uid: aux.currentUser.uid,
        }, () => {
            this.getEstatusSolicitud(aux.currentUser.uid);
        });
    };

    getEstatusSolicitud = (uid) => {
        let params = {};
        params.uid_firebase = 'eq.' + uid;

        let options = {
            uri: 'https://plataformadigitalnacional.org/api/solicitudes_conexion',
            json: true,
            qs: params
        };
        rp(options)
            .then(data => {
                this.setState({estatus: data[0].estatus});
                return true;
            })
            .catch(err => {
                this.setState({loading: false});
                alert("_No se pudó obtener la información");
                console.log(err);
            });
    };
    handleFile = (e) => {
        let file = e.target.files[0];
        this.setState({
            oficio: file
        });
    };

    saveOficio = () => {
        if (this.state.oficio) {
            let fd = new FormData();
            fd.append('file', this.state.oficio, this.state.oficio.name);
            axios
                .post('https://demospdn.host/pdn/uploadOficio', fd)
                .then(res => {
                    if (res && res.status === 200) {
                        this.setState({
                            idDocument: res.data.idDocument
                        }, () => {
                            this.updateSolicitud();
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
    updateSolicitud = () => {
        let params = {
            uid_firebase: 'eq.' + this.state.uid,
        };
        let options = {
            method: 'PATCH',
            uri: 'https://plataformadigitalnacional.org/api/solicitudes_conexion',
            qs: params,
            headers: {
                'Prefer': 'return = representation',
                'Content-Type': 'application/json'
            },
            body: {'estatus': 'ENVIADA', 'id_oficio': this.state.idDocument},
            json: true
        };
        rp(options)
            .then(data => {
                this.setState({
                    estatus: 'ENVIADA'
                })
            })
            .catch(err => {
                console.log("Error: ", err);
                this.deleteOficio();
            })
    };


    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={0} justify="center">
                    <Grid item xs={12} className={classes.item3}>
                        <Link to="/" className={classes.link}>
                            <img src={PDNLogo} alt="PDN" className={classes.pdnLogo}/>
                        </Link>
                    </Grid>
                </Grid>
                <Grid container spacing={0} className="breadcrumb" justify='center'>
                    <Grid item xs={12} className={classes.item3}>
                        <ul>
                            <li>
                                <Link className={classes.link} to='/'>Plataforma Digital Nacional</Link>
                            </li>
                            <li>
                                Consola de administración
                            </li>
                        </ul>
                    </Grid>
                </Grid>
                <Grid container spacing={0} className={classes.container1} justify='center'>
                    <Grid item xs={12} md={4} align={isWidthUp('md', this.props.width) ? 'right' : 'center'}
                          className={classes.item1}>
                        <img src={Logo} alt="Sistema 2" className={classes.s2}/>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.item2}
                          align={isWidthUp('md', this.props.width) ? 'left' : 'center'}>
                        <Typography variant="h4" paragraph className={classes.whiteText}>
                            Consola de administración
                        </Typography>
                        <Typography className={classes.whiteText}>
                            Administra contactos y conexiones
                        </Typography>
                    </Grid>
                </Grid>
                <div className={classes.bgContainer}>
                    <Grid container justify={'center'} spacing={0}>
                        <Grid item xs={12} className={classes.section}>
                            <Typography variant={"title"} className={classes.text}>Bienvenido</Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.section}>
                            <Typography variant="h6" className={classes.titleSub}>
                                Como Sujeto Obligado, aquí podrás administrar a los contactos, servidores públicos que
                                serán de
                                ayuda y soporte técnico para mantener la conexión con la PDN <br/>
                                De igual manera podrás administrar las URL's de las API's mediante las cuales tu
                                institución se
                                conectará a la PDN.
                            </Typography>
                            <br/>
                        </Grid>
                        <Grid item xs={12} className={classes.section}>
                            {(this.state.estatus !== 'APROBADA' && this.state.estatus !== 'PENDIENTE') &&
                            <Paper>
                                <Typography variant={"h5"} className={classes.aviso}>AVISO</Typography>
                                <Typography variant={"h6"} className={classes.textAviso}>
                                    {this.state.estatus === 'ENVIADA' && 'Tu solicitud esta en proceso de validación'}
                                    {this.state.estatus === 'RECHAZADA' && 'Tu solicitud ha sido rechazada, puedes subir un nuevo oficio con lo que se enviará a validación'}
                                    {this.state.estatus === 'REVOCADA' && 'Tu conexión ha sido revocada, puedes subir un nuevo oficio con lo que se enviará a validación'}
                                </Typography>
                            </Paper>
                            }
                        </Grid>
                        <Grid item xs={12} className={classes.section}>
                            {(this.state.estatus !== 'APROBADA' && this.state.estatus !== 'ENVIADA') &&
                            <ExpansionPanel defaultExpanded={true}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography className={classes.tituloPanel} variant={"h5"}>Oficio</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography variant={"subtitle2"} className={classes.text}>
                                                Para completar tu registro, selecciona el oficio de solicitud de
                                                conexión en formato
                                                PDF(.pdf) y da clic en enviar.
                                            </Typography>
                                            <input type="file" onChange={this.handleFile} name={'nombreOficio'}
                                                   ref={ref => this.fileInput = ref} accept={'.pdf'}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button variant="contained" color="primary" className={classes.button}
                                                    disabled={!this.state.oficio || this.state.oficio.type !== "application/pdf"}
                                                    onClick={() => this.saveOficio()}>
                                                Enviar
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            }

                        </Grid>
                        <Grid item xs={12} className={classes.containerTable}>
                            {this.state.estatus === 'APROBADA' &&
                                <ExpansionPanel>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                        <Typography className={classes.tituloPanel} variant={"h5"}>Administrar
                                            contactos</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <FormularioContacto updateView={this.updateView}/>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TablaContactos update={this.state.updateTable}
                                                                updateView={this.updateView}/>
                                            </Grid>
                                        </Grid>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            }
                        </Grid>
                        <Grid item xs={12} className={classes.containerTable}>
                            {this.state.estatus === 'APROBADA' &&
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography className={classes.tituloPanel} variant={"h5"}>Administrar
                                        API's</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <FormularioEndpoint updateView={this.updateView}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Endpoints update={this.state.updateTable}
                                                       updateView={this.updateView}/>
                                        </Grid>
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            }

                        </Grid>
                    </Grid>
                </div>
                <Footer/>
            </div>
        );
    }

}

export default withWidth()(withStyles(styles)(ConsolaAdministracionSO));