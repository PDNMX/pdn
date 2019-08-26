import React from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from "@material-ui/core/styles";
import {Link} from 'react-router-dom';
import Footer from "../../Home/Footer";
import Header from "./Header/Header";
import Typography from "@material-ui/core/Typography";
import S1 from '../../../assets/iconos_azul/1_icono.svg';
import S2 from '../../../assets/iconos_azul/2_icono.svg';
import S3 from '../../../assets/iconos_azul/3_icono.svg';
import ScrollToTopButton from "../../Navigation/ScrollToTopButton";


const styles = theme => ({
    root: {
        flexGrow: 1
    },
    item: {
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
    link: {
        textDecoration: "none"
    },
    text: {
        color: theme.palette.titleBanner.color,
        //paddingBottom: 60
    },
    specsContainer: {
        backgroundColor: '#34b3eb',
        paddingTop: 90,
        paddingBottom: 90
    }
});

class Especificaciones extends React.Component {
    render (){
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Header/>
                <Grid container spacing={0} justify="center" style={{background: '#fff'}}>
                    <Grid item xs={12} className={classes.item}>

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


                    <Grid container spacing={0} className={classes.specsContainer} justify='center'>
                        <Grid item xs={12} style={{maxWidth: 1200}}>
                            <Grid container spacing={0} justify='center'>
                                <Grid item xs={12} md={6} lg={4} xl={4} align="center">
                                    <Link to="/declaraciones/especificaciones" className={classes.link}>
                                        <img src={S1} alt="" className={classes.sistemas}/>
                                        <Typography variant="h5" className={classes.text}>Declaraciones</Typography>
                                    </Link>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4} xl={4}  align="center">
                                    <Link to="/intervienen/especificaciones" className={classes.link}>
                                        <img src={S2} alt="" className={classes.sistemas}/>
                                        <Typography variant="h5" className={classes.text}>Servidores públicos en contrataciones</Typography>
                                    </Link>
                                </Grid>
                                <Grid item xs={12} md={6} lg={4} xl={4} align="center">
                                    <Link to="/sancionados/especificaciones" className={classes.link}>
                                        <img src={S3} alt="" className={classes.sistemas}/>
                                        <Typography variant="h5" className={classes.text}>Sancionados</Typography>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Footer/>
                <ScrollToTopButton/>
            </div>
        );
    }
}

export default withStyles(styles)(Especificaciones);