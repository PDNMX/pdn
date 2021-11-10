import React from 'react';
import {withStyles} from '@mui/styles';
import {Grid} from "@mui/material";
import TablaSolicitudes from "./TablaSolicitudes";
import {Typography} from "@mui/material"
import Footer from "../../Home/Footer";
import {Link} from "react-router-dom";
import PDNLogo from "../../../assets/PDN.png";
import IconoConexiones from '../../../assets/Cards/icono-conexion.svg';
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
        maxWidth: '1200px'
    },
    contenedor: {
        padding: theme.spacing(5),
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
            paddingTop: theme.spacing(5),
            marginBottom: theme.spacing(5),
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
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
});

class Conexion extends React.Component {
    state = {
        oficio: null
    };

    render() {
        const {classes} = this.props;
        const isMdUp = useIsWidthUp("md");
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
                                Solicitudes de conexión
                            </li>
                        </ul>
                    </Grid>
                </Grid>
                <Grid container spacing={0} className={classes.container1} justify='center'>
                    <Grid item xs={12} md={4} align = {isMdUp  ? 'right' : 'center'}
                          className={classes.item1}>
                        <img src={IconoConexiones} alt="Solicitude de conexión" className={classes.s2}/>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.item2}
                          align = {isMdUp  ? 'left' : 'center'}>
                        <Typography variant="h4" paragraph className={classes.whiteText}>
                            Solicitudes de conexión
                        </Typography>
                        <Typography className={classes.whiteText}>
                            Aquí puedes consultar las solicitudes de conexión a la PDN, visualizar y
                        </Typography>
                        <Typography className={classes.whiteText}>
                            descargar los oficios de solicitud y permitir o denegar las conexiones
                        </Typography>
                    </Grid>
                </Grid>
                <div className={classes.bgContainer}>
                    <Grid container justify={'center'}>
                        <Grid item xs={12} className={classes.contenedor}>
                            <TablaSolicitudes/>
                        </Grid>
                    </Grid>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default withWidth()(withStyles(styles)(Conexion));