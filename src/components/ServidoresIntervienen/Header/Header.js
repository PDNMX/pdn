import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
/* import BG from '../../../assets/img/cintillo_servidores.jpg'; */
import S2 from '../../../assets/iconos_azul/2_icono.svg'
import {Typography} from "@material-ui/core"
import withWidth, {isWidthUp} from '@material-ui/core/withWidth';
import '../../Utils/Header.css';
import classNames from 'classnames';
//import Button from "@material-ui/core/Button";
//import AlertDialog from "../../Sancionados/AlertDialolg";
import BarraLogoMenu from "../../Compartidos/BarraLogoMenu";

import Particles from 'react-particles-js';

const style = theme => ({
        root: {
            flexGrow:1,
        },
        container1: {
            paddingTop: '75px',
            paddingBottom: '75px',
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
            height: '100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'relative',
            /* backgroundImage: `url(${BG})` */
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
        button:{
            background: '#ffe01b',
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(2)
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
    constructor(props) {
        super(props);
        this.btnVideo = React.createRef();
    }
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
                                Servidores públicos en contrataciones
                            </li>
                        </ul>
                    </Grid>
                </Grid>

                <Grid container spacing={0} className={classNames(classes.container1)} justify='center'>
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
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/servidores/1.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/servidores/2.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/servidores/3.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/servidores/4.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/servidores/5.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/servidores/6.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/servidores/7.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/servidores/8.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/servidores/9.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/servidores/10.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/servidores/11.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/servidores/12.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/servidores/13.svg",
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

                    <Grid item xs={12} md={4} align={isWidthUp('md', this.props.width)? 'right':'center'} className={classes.item1}>
                        <img src={S2} alt="Sistema 2" className={classes.s2}/>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.item2} align={isWidthUp('md', this.props.width)? 'left':'center'} >
                        <Typography variant="h4" paragraph className={classes.whiteText} style={{  fontWeight: 600}}>
                            Servidores públicos en contrataciones
                        </Typography>
                        <Typography variant="h4" paragraph className={classes.whiteText} style={{fontWeight: 300}}>
                            Sistema de los Servidores públicos que intervengan en procedimientos de contrataciones públicas
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withWidth()(withStyles(style) (Header));
