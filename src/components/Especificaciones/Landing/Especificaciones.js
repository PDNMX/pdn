import React from 'react';
import Grid from '@mui/material/Grid';
import withStyles from '@mui/styles/withStyles';
import {Link} from 'react-router-dom';
import Footer from "../../Home/Footer";
import Header from "./Header/Header";
import Typography from "@mui/material/Typography";
import S1 from '../../../assets/iconos_azul/1_icono.svg';
import S2 from '../../../assets/iconos_azul/2_icono.svg';
import S3 from '../../../assets/iconos_azul/3_icono.svg';
import S6 from '../../../assets/iconos_azul/6_icono.svg';
//import Tooltip from "@mui/material/Tooltip";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    rootItem: {
        maxWidth: 1200,
        paddingTop: 90,
        paddingBottom: 90,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)

    },
    button: {
        margin: theme.spacing(1),
        background: '#ffe01b'
    },
    ul: {
        listStyle: 'none'
    },
    sistemas: {
        maxWidth: 200,
        "&:hover": {
            opacity: .5
        }
    },
    disabled: {
        maxWidth: 200,
        opacity: .5
    },
    link: {
        textDecoration: "none"
    },
    text: {
        color: theme.palette.greyColor,
        //paddingBottom: 60
    },
    specsContainer: {
        backgroundColor: '#34b3eb',
        //paddingTop: 50,
        //paddingBottom: 50
    },
    item: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    }
});

const Especificaciones = props => {

    const {classes} = props;

    return (
        <div className={classes.root}>
            <Header/>
            <Grid container spacing={0} justifyContent="center" style={{background: '#fff'}}>
                <Grid item xs={12} className={classes.rootItem}>

                    <Typography paragraph color="textPrimary">
                        Estas especificaciones se refieren a los campos mínimos de datos que debe de contener cada sistema, así como los estándares que debe de seguir cada campo para ser interoperable con la Plataforma Digital Nacional. Esto es lo que permite que los sistemas de aquellos responsables de generar los datos estén ordenados y puedan ser consultados en la PDN.
                    </Typography>
                    <Typography paragraph color="textPrimary">
                        Además, en esta sección podrás consultar información acerca del Open API Specification (OAS), el cual es un formato de especificación que permite describir de manera precisa las características con las que deberán contar las APIs que integrarán a la PDN.
                    </Typography>
                    <Typography paragraph color="textPrimary">
                        Actualmente están disponibles las especificaciones para los Sistemas 1, 2 y 3

                    </Typography>
                </Grid>


                <Grid container spacing={0} className={classes.specsContainer} justifyContent='center'>
                    <Grid item xs={12} className={classes.rootItem}>
                        <Grid container spacing={0} justifyContent='center'>
                            <Grid item xs={12} md={6} lg={3} xl={3} align="center" className={classes.item}>
                                <Link to="/especificaciones/s1" className={classes.link}>
                                    <img src={S1} alt="" className={classes.sistemas}/>
                                    <Typography variant="h5" className={classes.text}>Declaraciones</Typography>
                                </Link>
                            </Grid>
                            <Grid item xs={12} md={6} lg={3} xl={3}  align="center" className={classes.item}>
                                <Link to="/especificaciones/s2" className={classes.link}>
                                    <img src={S2} alt="" className={classes.sistemas}/>
                                    <Typography variant="h5" className={classes.text}>Servidores públicos en contrataciones</Typography>
                                </Link>
                            </Grid>
                            <Grid item xs={12} md={6} lg={3} xl={3} align="center" className={classes.item}>
                                <Link to="/especificaciones/s3" className={classes.link}>
                                    <img src={S3} alt="" className={classes.sistemas}/>
                                    <Typography variant="h5" className={classes.text}>Sancionados</Typography>
                                </Link>
                            </Grid>

                            <Grid item xs={12} md={6} lg={3} xl={3} align="center" className={classes.item}>
                                <Link to="/especificaciones/s6" className={classes.link}>
                                    <img src={S6} alt="" className={classes.sistemas}/>
                                    <Typography variant="h5" className={classes.text}>Contrataciones</Typography>
                                </Link>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Footer/>
        </div>
    );
}

export default withStyles(styles)(Especificaciones);
