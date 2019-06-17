import React from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from "@material-ui/core/styles";
import Blog from '../../assets/iconos_barra/Blog.svg';
import Calidad from '../../assets/iconos_barra/Calidad_de_datos.svg';
import Espe from '../../assets/iconos_barra/Especificaciones.svg';
import Mesa from '../../assets/iconos_barra/Mesa_de_ayuda.svg';
import Plat from '../../assets/iconos_barra/Plataformas_y_sistemas.svg';
import {Link} from 'react-router-dom';
import Typography from "@material-ui/core/Typography";


const styles = theme => ({
    root: {
        flexGrow:1,
        backgroundColor: '#f6f6f6',
        textAlign: 'center'
    },
    icon :{
        maxWidth: 60,
        paddingTop: 20,
        paddingBottom: 0,
        paddingRight: 50,
        paddingLeft: 50,

    },
    innerContainer: {
        maxWidth: 1200
    },
    link: {
        textDecoration: "none",
        color: "#666666",

    },
    item :{
        '&:hover': {
            backgroundColor: '#c5c5c5'
        },
        paddingBottom: 20
    }

});

class BarraFea extends React.Component{

    render(){
        const {classes} = this.props;
        return (<div className={classes.root}>

            <Grid container spacing={0} justify="center" className={classes.container}>
                <Grid container spacing={0} justify="center" className={classes.innerContainer}>
                    <Grid item xs={4} md={2} className={classes.item}>
                        <Link to="/mesa-de-ayuda" className={classes.link}>
                            <img src={Mesa} className={classes.icon} alt="Mesa de ayuda"/>
                            <Typography>Mesa de ayuda</Typography>
                        </Link>

                    </Grid>
                    <Grid item xs={4} md={2} className={classes.item}>
                        <a href="https://www.plataformadigitalnacional.org/blog" className={classes.link}>
                            <img src={Blog} className={classes.icon} alt="Blog"/>
                            <Typography>Blog</Typography>
                        </a>
                    </Grid>

                    <Grid item xs={4} md={2} className={classes.item}>
                        <Link to="/gaa/calidad" className={classes.link}>
                            <img src={Calidad} className={classes.icon} alt="Calidad de datos"/>
                            <Typography>Calidad de datos</Typography>
                        </Link>

                    </Grid>
                    <Grid item xs={4} md={2} className={classes.item}>
                        <Link to="/especificaciones" className={classes.link}>
                            <img src={Espe} className={classes.icon} alt="Especificaciones técnicas"/>
                            <Typography>Especificaciones</Typography>
                        </Link>
                    </Grid>

                    <Grid item xs={4} md={2} className={classes.item}>
                        <a href="#" className={classes.link}>
                            <img src={Plat} className={classes.icon} alt="Plataformas y sistemas"/>
                            <Typography>Plataformas y sistemas</Typography>
                        </a>
                    </Grid>

                </Grid>
            </Grid>


        </div>);

    }
}

export default withStyles(styles)(BarraFea);