import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import TablaConexiones from "./TablaConexiones";
import Typography from "@material-ui/core/Typography/Typography";
import Footer from "../../Home/Footer";
import withWidth, {isWidthUp} from '@material-ui/core/withWidth';
import {Link} from "react-router-dom";
import PDNLogo from "../../../assets/PDN.png";
import IconoConexiones from '../../../assets/Cards/icono-conexion.svg';
import TablaEndpoints from './TablaEndpoints';
import TablaContactos from './TablaContactos';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    section: {
        maxWidth: '1200px'
    },
    contenedor: {
        padding: theme.spacing.unit * 5,
        overflowX: 'auto',
        maxWidth: '1200px',
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
            paddingTop: theme.spacing.unit * 5,
            marginBottom: theme.spacing.unit * 5,
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing.unit * 1,
            marginBottom: theme.spacing.unit * 1,
        },
    },
    banner: {
        height: '600px',
        zIndex: '1',
        position: 'relative',
        overflow: 'hidden',
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
        oficio: null,
        conexion : null,
    };

    constructor(props, context) {
        super(props, context);
    }
    selectConexion = (conexionSeleccionada)=>{
        this.setState({conexion : conexionSeleccionada});
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
                                <Link className={classes.link} to='/administracionPDN'>Consola de administración de la PDN</Link>
                            </li>
                            <li>
                                Conexiones
                            </li>
                        </ul>
                    </Grid>
                </Grid>
                <Grid container spacing={0} className={classes.container1} justify='center'>
                    <Grid item xs={12} md={4} align={isWidthUp('md', this.props.width) ? 'right' : 'center'}
                          className={classes.item1}>
                        <img src={IconoConexiones} alt="Solicitude de conexión" className={classes.s2}/>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.item2}
                          align={isWidthUp('md', this.props.width) ? 'left' : 'center'}>
                        <Typography variant="h4" paragraph className={classes.whiteText}>
                            Conexiones
                        </Typography>
                        <Typography className={classes.whiteText}>
                            Aquí puedes administrar las conexiones establecidas con la PDN
                        </Typography>
                    </Grid>
                </Grid>
                <div className={classes.bgContainer}>
                    <Grid container justify={'center'}>
                        <Grid item xs={12} className={classes.contenedor}>
                            <TablaConexiones selectConexion={this.selectConexion}/>
                        </Grid>
                    </Grid>
                </div>
                {
                    this.state.conexion &&
                        <div className={classes.bgContainer}>
                            <Grid container justify={'center'}>
                                <Grid item  xs ={12} className={classes.contenedor}>
                                   <TablaEndpoints conexion ={this.state.conexion}/>
                                </Grid>
                                <Grid item  xs ={12} className={classes.contenedor}>
                                    <TablaContactos conexion ={this.state.conexion}/>
                                </Grid>
                            </Grid>
                        </div>
                }
                <Footer/>
            </div>
        );
    }
}

export default withWidth()(withStyles(styles)(Conexion));