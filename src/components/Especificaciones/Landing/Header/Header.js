import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import BG from '../../../../assets/img/especificaciones.jpg';
import C from '../../../../assets/img/logoespecificaciones.svg';
import {Typography} from "@material-ui/core"
import withWidth, {isWidthUp} from '@material-ui/core/withWidth';
import BarraLogoMenu from "../../../Compartidos/BarraLogoMenu";
import Particles from 'react-particles-js';

const style = theme => ({
        root: {
            flexGrow:1,
        },
        container1: {
            //background: 'grey',
            paddingTop: '75px',
            paddingBottom: '75px',
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
            height: '100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'relative',
            //backgroundImage: `url(${BG})`
            background: "rgb(6,13,21)",
            background: "linear-gradient(0deg, rgba(6,13,21,1) 0%, rgba(64,114,129,1) 100%)",
        },
        link: {
            textDecoration: 'none',
            color: 'inherit'
        },
        item1:{
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
        },
        item2:{
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2)
        },
        item3:{
            maxWidth: 1200,
        },
        logo: {
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
        particulas: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
        },

    }
);

class Header extends React.Component{

    render(){
        const {classes} = this.props;

        return(
            <div className={classes.root}>
                <BarraLogoMenu/>


                <Grid container spacing={0} className="breadcrumb" justify='center'>
                    <Grid item xs={12} className={classes.item3}>
                        <ul>
                            <li>
                                <Link className={classes.link} to='/'>Plataforma Digital Nacional</Link>
                            </li>
                            <li>
                                Especificaciones
                            </li>
                        </ul>
                    </Grid>
                </Grid>

                <Grid container spacing={0} className={classes.container1} justify='center'>
                    <Particles 
                        className={classes.particulas}
                        params={{
                            "particles": {
                                "number": {
                                    "value": 20,
                                    
                                },
                                "line_linked": {
                                    "enable": false
                                },
                                "move": {
                                    "speed": 1,
                                    "out_mode": "out"
                                },
                                "shape": {
                                    "type": [
                                        "images"
                                    ],
                                    "images": [
                                        {
                                            "src": "/img/flotantes/especificaciones/1.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": "/img/flotantes/especificaciones/2.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": "/img/flotantes/especificaciones/3.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": "/img/flotantes/especificaciones/4.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": "/img/flotantes/especificaciones/5.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": "/img/flotantes/especificaciones/6.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": "/img/flotantes/especificaciones/7.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                    ]
                                },
                                "size": {
                                    "value": 30,
                                    "random": false,
                                    "anim": {
                                        "enable": true,
                                        "speed": 4,
                                        "size_min": 10,
                                        "sync": false
                                    }
                                }
                            },
                            "retina_detect": false
                        }}
                    />
                    <Grid item xs={12} md={4} align={isWidthUp('md', this.props.width)? 'right':'center'} className={classes.item1}>
                        <img src={C} alt="Especificaciones" className={classes.logo}/>
                    </Grid>

                    <Grid item xs={12} md={6} className={classes.item2} align={isWidthUp('md', this.props.width)? 'left':'center'} >

                        <Typography variant="h4" paragraph className={classes.whiteText} style={{  fontWeight: 600}}>
                            Especificaciones técnicas
                        </Typography>

                        <Typography variant="h4" paragraph className={classes.whiteText} style={{fontWeight: 300}}>
                            Encontrarás las reglas y características con las que deben contar los datos para la interoperabilidad.
                        </Typography>

                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withWidth()(withStyles(style) (Header));
