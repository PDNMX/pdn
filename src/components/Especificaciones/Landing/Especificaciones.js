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


const styles = theme => ({
    root: {
        flexGrow: 1
    },
    item: {
        maxWidth: 1200,
        paddingTop: "50px",
        paddingBottom: "50px",
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
        maxWidth: 200
    },
    link: {
        textDecoration: "none"
    },
    text: {
        color: theme.palette.titleBanner.color,
        paddingBottom: 60
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

                        <Typography paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Typography>


                        <Grid container spacing={0} justify="center">
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
                <Footer/>
            </div>
        );
    }
}

export default withStyles(styles)(Especificaciones);