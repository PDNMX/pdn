import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import FormularioConexion from './FormularioConexion';
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import "../../../index.css";
import Footer from "../../Home/Footer";
import imgBanner from '../../../assets/banners/FOTO_BANNER_3.jpg';
import Header from "../../PDNAppBar/PDNAppBar";

const styles = theme => ({
    section: {
        maxWidth: '1200px'
    },
    contenedor: {
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing.unit * 5,
        },
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing.unit * 1,
        },
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
        [theme.breakpoints.up('sm')]: {
            paddingTop: '102px',
            marginBottom: '266px'
        },
        [theme.breakpoints.down('sm')]: {
            margin : theme.spacing.unit *2,
        },
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
    banner: {
        [theme.breakpoints.up('sm')]: {
            height: '600px',
        },
        zIndex: '1',
        position: 'relative',
        overflow: 'hidden',
    },
    containerTextBanner:{
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing.unit * 25,
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing.unit * 2,
        },
        maxWidth: '1200px'
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
    }



    render() {
        const {classes} = this.props;
        return (
            <div>
                <Header/>
                <div className={classes.banner}>
                    <img className={classes.bgImg} src={imgBanner}/>
                    <Grid container justify={"center"} >
                        <Grid item xs={12} className={classes.containerTextBanner}>
                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant={"h2"} className={classes.titleLight}>Solicitud de
                                        conexión</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant={"h6"} className={classes.titleSub}>Envía una solicitud para conectarte a la PDN</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>

                <div className={classes.bgContainer}>
                    <Grid container justify={'center'}>
                        <Grid item xs={12} className={classes.section}>
                            <Typography variant="h6" className={classes.titleSub}>
                                Los sujetos obligados deberán solicitar la conexión con la PDN, adjuntando un
                                oficio en formato digital
                                (PDF), especificando nombres, cargos y datos de contacto de él o los servidores
                                públicos encargados de
                                mantener la conexión con la PDN, que tendrán nivel mínimo de Director general u
                                homólogo.<br/><br/>
                                Los permisos de conexión a la PDN serán otorgados o denegados por la SESNA
                                posteriormente a una evaluación de aspectos técnicos de interconexión. En caso
                                de
                                que los sujetos obligados no cumplan con los requerimientos de interconexión a
                                la
                                PDN establecidos por la SESNA, se denegará el permiso de conexión a la PDN.
                            </Typography>
                            <br/><br/>
                        </Grid>
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