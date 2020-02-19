import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import {Typography} from "@material-ui/core"
import withWidth, {isWidthUp} from '@material-ui/core/withWidth';
import BarraLogoMenu from "../../../Compartidos/BarraLogoMenu";
import Logo from '../../../../assets/img/logocalidad_datos.svg';
import Particles from 'react-particles-js';
const style = theme => ({
        root: {
            flexGrow: 1,
        },
        container :{
            paddingTop: '75px',
            paddingBottom: '75px',
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
            position: 'relative',
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
        whiteText: {
            color: '#fff'
        },
        logo: {
            maxWidth: 150,
        },
        caption: {
            marginTop: '50px',
            color: "#fff",
            fontSize: '36px',
            fontWeight: 300
        },
        particulas: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
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
                                Calidad de datos
                            </li>
                        </ul>
                    </Grid>
                </Grid>

                <Grid container spacing={0} /* style={{ padding: "82px 0"}} */ justify='center' className={classes.container}>
                    <Particles 
                        className={classes.particulas}
                        params={{
                            "particles": {
                                "number": {
                                    "value": 24,
                                    "density": {
                                        "enable": true,
                                        "value_area": 800
                                    }
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
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/calidad_de_datos/1.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/calidad_de_datos/2.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/calidad_de_datos/3.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/calidad_de_datos/4.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/calidad_de_datos/5.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/calidad_de_datos/6.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/calidad_de_datos/7.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/calidad_de_datos/8.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/calidad_de_datos/9.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/calidad_de_datos/10.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/calidad_de_datos/11.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/calidad_de_datos/12.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/calidad_de_datos/13.svg",
                                            "height": 30,
                                            "width": 30
                                        },{
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/calidad_de_datos/14.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/calidad_de_datos/15.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/calidad_de_datos/16.svg",
                                            "height": 30,
                                            "width": 30
                                        },{
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/calidad_de_datos/17.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/calidad_de_datos/18.svg",
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
                            "retina_detect": true
                        }}
                    />
                    <Grid item xs={12} md={4} className={classes.item1} align={isWidthUp('md', this.props.width)? 'right':'center'}>

                        <img src={Logo} alt="Calidad" className={classes.logo}/>

                    </Grid>

                    <Grid item xs={12} md={6} className={classes.item2} align={isWidthUp('md', this.props.width)? 'left':'center'} >
                        <Typography variant="h1" paragraph className={classes.caption}>
                            Evaluación de la calidad de los datos
                        </Typography>
                    </Grid>
                </Grid>

            </div>
        )
    }
}

export default withWidth()(withStyles(style) (Header));
