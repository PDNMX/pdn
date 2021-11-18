import React from 'react';
import {Typography} from "@mui/material"
import withStyles from '@mui/styles/withStyles';
import PropTypes from 'prop-types';
import Tarjeta from './Tarjeta';
import Grid from '@mui/material/Grid';
import C1 from '../../assets/about/banner4.png';
import C2 from '../../assets/about/banner2.png';
import C3 from '../../assets/about/banner3.png';

const styles = theme => ({
    root: {
        flexGrow:1,
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    items: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    }
});
class Carrusel extends React.Component{


    handleClick = (e) => {
        //e.preventDefault();
        console.log('The link was clicked.');
    };

    render(){

        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Typography color="textPrimary" paragraph><b>Conoce</b> más</Typography>

                <Grid container spacing={0}>
                    <Grid item xs={12} md={4} className={classes.items}>
                        <Tarjeta img={C1} title="Proximamente" text="Datatón Anticorrupción" url='https://www.plataformadigitalnacional.org/blog/por-una-plataforma-digital-nacional-incluyente/'/>
                    </Grid>
                    <Grid item xs={12} md={4} className={classes.items}>
                        <Tarjeta img={C2} title="Conoce" text="Guía de Apertura de Datos Anticorrupción" url="https://www.plataformadigitalnacional.org/blog/que-es-la-guia-de-apertura-anticorrupcion/"/>
                    </Grid>
                    <Grid item xs={12} md={4} className={classes.items}>
                        <Tarjeta img={C3} title="Conoce" text="Trabajo del Grupo Asesor de la PDN" url="https://www.plataformadigitalnacional.org/blog/primera-sesion-del-grupo-asesor-de-la-plataforma-digital-nacional/"/>
                    </Grid>
                </Grid>
            </div>
        )
    }

}

Carrusel.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(Carrusel);
