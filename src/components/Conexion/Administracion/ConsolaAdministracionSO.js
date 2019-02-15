import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import "../../../index.css";
import Footer from "../../Home/Footer";
import imgBanner from '../../../assets/banners/FOTO_BANNER_3.jpg';
import Header from "../../PDNAppBar/PDNAppBar";
import Endpoints from "./Endpoints";
import FormularioEndpoint from './FormularioEndpoint';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from "@material-ui/core/Button/Button";
import FormularioContacto from "./FormularioContacto";
import TablaContactos from "../Administracion/TablaContactos";

const styles = theme => ({
    section: {
        maxWidth: '1200px',
        marginBottom: theme.spacing.unit * 5,
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
    banner: {
        height: '600px',
        zIndex: '1',
        position: 'relative',
        overflow: 'hidden',
    },
    tituloPanel: {
        color: theme.palette.primary.dark,
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
});

class ConsolaAdministracionSO extends React.Component {
    state = {
        oficio: null,
        registros: []
    };

    constructor(props, context) {
        super(props, context);
    };

    handleFile = (e) => {
        let file = e.target.files[0];
        console.log("File: ", file);

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
                                    <Typography variant={"h2"} className={classes.titleLight}>Consola de
                                        administración</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h6" className={classes.titleSub}>
                                        Aquí puedes consultar las solicitudes de conexión a la PDN, visualizar y
                                        descargar los oficios de solicitud y permitir o denegar las conexiones
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
                                                    onClick={() => this.verifyCaptcha()}>
                                                Enviar
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Grid>
                        <Grid item xs={12} className={classes.section}>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography className={classes.tituloPanel} variant={"h5"}>Administrar
                                        contactos</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <FormularioContacto addRegistro={this.addRegistro}
                                                                    dependencias={this.state.dependencias}/>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TablaContactos registros={this.state.registros} remove={this.removeRegistro}/>
                                            </Grid>
                                        </Grid>

                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Grid>
                        <Grid item xs={12} className={classes.section}>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography className={classes.tituloPanel} variant={"h5"}>Administrar
                                        API's</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <FormularioEndpoint/>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Endpoints/>
                                            </Grid>
                                        </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Grid>
                    </Grid>
                </div>
                <Footer/>
            </div>
        );
    }

}

export default withStyles(styles)(ConsolaAdministracionSO);