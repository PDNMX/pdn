import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import FormularioConexion from './FormularioConexion';
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import "../../../index.css";
import Footer from "../../Home/Footer";
import {Link} from "react-router-dom";
import PDNLogo from "../../../assets/PDN.png";
import Logo from "../../../assets/plan.svg";
import withWidth, {isWidthUp} from '@material-ui/core/withWidth';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
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
            margin: theme.spacing.unit * 2,
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
                                Solicitud de conexión
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
                            Solicitud de conexón
                        </Typography>
                        <Typography className={classes.whiteText}>
                            Envía una solicitud
                        </Typography>
                        <Typography className={classes.whiteText}>
                            para conectarte a la PDN
                        </Typography>
                    </Grid>
                </Grid>
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

export default withWidth()(withStyles(styles)(Conexion));