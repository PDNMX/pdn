import React from 'react';
//import Typography from '@material-ui/core/Typography';
//import Grid from '@material-ui/core/grid';
import {withStyles} from "@material-ui/core/styles";
import Blog from '../../assets/iconos_barra/Blog.svg';
import Calidad from '../../assets/iconos_barra/Calidad_de_datos.svg';
import Espe from '../../assets/iconos_barra/Especificaciones.svg';
import Mesa from '../../assets/iconos_barra/Mesa_de_ayuda.svg';
import Plat from '../../assets/iconos_barra/Plataformas_y_sistemas.svg';
import {Link} from 'react-router-dom';


const styles = theme => ({
    root: {
        flexGrow:1,
        backgroundColor: '#f6f6f6',
        textAlign: 'center',
    },
    icon :{
        maxWidth: 60,
        paddingTop: 30,
        paddingBottom: 30,
        paddingRight: 40,
        paddingLeft: 40,
        '&:hover': {
            backgroundColor: '#c5c5c5'
        }
    }

});

class BarraFea extends React.Component{

    render(){
        const {classes} = this.props;
        return (<div className={classes.root}>
            <Link to="/mesa-de-ayuda">
                <img src={Mesa} className={classes.icon} alt="Mesa de ayuda"/>
            </Link>
            <a href="https://www.plataformadigitalnacional.org/blog">
                <img src={Blog} className={classes.icon} alt="Blog"/>
            </a>
            <Link to="/gaa/calidad">
                <img src={Calidad} className={classes.icon} alt="Calidad de datos"/>
            </Link>
            <Link to="/especificaciones">
                <img src={Espe} className={classes.icon} alt="Especificaciones técnicas"/>
            </Link>
            <img src={Plat} className={classes.icon} alt="Plataformas y sistemas"/>

        </div>);

    }
}

export default withStyles(styles)(BarraFea);