import React from 'react';
import {withStyles} from '@mui/styles';
import Grid from "@mui/material/Grid/Grid";
import {Typography} from "@mui/material"
import "../../../index.css";
import Footer from "../../Home/Footer";
import Endpoints from "./Endpoints";
import FormularioEndpoint from './FormularioEndpoint';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from "@mui/material/Button/Button";
import FormularioContacto from "./FormularioContacto";
import TablaContactos from "../Administracion/TablaContactos";
import rp from "request-promise";
import Paper from '@mui/material/Paper';
import axios from "axios";
import Logo from "../../../assets/icono-administracion.svg";
import {Link} from "react-router-dom";
import PDNLogo from "../../../assets/PDN.png";
import {getCurrentUser} from '../../Seguridad/seguridad';
import {useTheme} from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs" />;

function useIsWidthUp(breakpoint) {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.up(breakpoint));
}

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    section: {
        maxWidth: '1200px',
        marginBottom: theme.spacing(5),
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
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
        float: 'right'
    },
    textAviso: {
        color: theme.palette.textGrey.color,
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
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
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        //zIndex: 5
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    item1: {
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
    },
    item2: {
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2)
    },
    containerTable: {
        overflowX: 'auto',
        marginBottom: theme.spacing(5),
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
        let _this = this;
        getCurrentUser().then((user)=>{
            _this.setState({
                uid : user.uid,
            },()=>{
                this.getEstatusSolicitud(user.uid);
            });
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
        const isMdUp = useIsWidthUp("md");

        return (
            <div className={classes.root}>
                <Grid container spacing={0} justifyContent="center">
                    <Grid item xs={12} className={classes.item3}>
                        <Link to="/" className={classes.link}>
                            <img src={PDNLogo} alt="PDN" className={classes.pdnLogo}/>
                        </Link>
                    </Grid>
                </Grid>
                <Grid container spacing={0} className="breadcrumb" justifyContent='center'>
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
                <Grid container spacing={0} className={classes.container1} justifyContent='center'>
                    <Grid item xs={12} md={4} align = {isMdUp  ? 'right' : 'center'}
                          className={classes.item1}>
                        <img src={Logo} alt="Sistema 2" className={classes.s2}/>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.item2}
                          align = {isMdUp  ? 'left' : 'center'}>
                        <Typography variant="h4" paragraph className={classes.whiteText}>
                            Consola de administración
                        </Typography>
                        <Typography className={classes.whiteText}>
                            Administra contactos y conexiones
                        </Typography>
                    </Grid>
                </Grid>
                <div className={classes.bgContainer}>
                    <Grid container justifyContent={'center'} spacing={0}>
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
                            <Accordion defaultExpanded={true}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography className={classes.tituloPanel} variant={"h5"}>Oficio</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
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
                                </AccordionDetails>
                            </Accordion>
                            }

                        </Grid>
                        <Grid item xs={12} className={classes.containerTable}>
                            {this.state.estatus === 'APROBADA' &&
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                        <Typography className={classes.tituloPanel} variant={"h5"}>Administrar
                                            contactos</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <FormularioContacto updateView={this.updateView}/>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TablaContactos update={this.state.updateTable}
                                                                updateView={this.updateView}/>
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            }
                        </Grid>
                        <Grid item xs={12} className={classes.containerTable}>
                            {this.state.estatus === 'APROBADA' &&
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography className={classes.tituloPanel} variant={"h5"}>Administrar
                                        API's</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <FormularioEndpoint updateView={this.updateView}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Endpoints update={this.state.updateTable}
                                                       updateView={this.updateView}/>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
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