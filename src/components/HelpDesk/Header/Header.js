import React from 'react';
import withStyles from '@mui/styles/withStyles';
import {Link} from 'react-router-dom';
import {Typography, Grid} from "@mui/material"
import Logo from '../../../assets/img/logomesa_ayuda.svg';
import BarraLogoMenu from "../../Compartidos/BarraLogoMenu";

import Particles from 'react-particles-js';
import {useTheme} from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs" />;

function useIsWidthUp(breakpoint) {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.up(breakpoint));
}

const style = theme => ({
        root: {
            flexGrow:1,
        },
        link: {
            textDecoration: 'none',
            color: 'inherit'
        },
        item1: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1)
        },
        item2: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1)
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
        container: {
            paddingTop: "75px",
            paddingBottom: "75px",
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
            position: 'relative',
            background: "linear-gradient(0deg, rgba(6,13,21,1) 0%, rgba(64,114,129,1) 100%)",
        },
        mesa: {
            marginTop: '50px',
            fontSize: '36px',
            fontWeight: 300,
            color: '#fff'
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

const Header = props => {
        const {classes} = props;
        const isMdUp = useIsWidthUp("md");
        return (
            <div className={classes.root}>
                <BarraLogoMenu/>
                <Grid container spacing={0} className="breadcrumb" justifyContent='center'>
                    <Grid item xs={12} className={classes.item3}>
                        <ul>
                            <li>
                                <Link className={classes.link} to='/'>Plataforma Digital Nacional</Link>
                            </li>
                            <li>
                                Mesa de ayuda
                            </li>
                        </ul>
                    </Grid>
                </Grid>

                <Grid container spacing={0} justifyContent='center' className={classes.container}>
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
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/mesa_ayuda/1.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/mesa_ayuda/2.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/mesa_ayuda/3.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/mesa_ayuda/4.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/mesa_ayuda/5.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/mesa_ayuda/6.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/mesa_ayuda/7.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/mesa_ayuda/8.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/mesa_ayuda/9.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/mesa_ayuda/10.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/mesa_ayuda/11.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/mesa_ayuda/12.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/mesa_ayuda/13.svg",
                                            "height": 30,
                                            "width": 30
                                        },
                                        {
                                            "src": process.env.PUBLIC_URL + "/img/flotantes/mesa_ayuda/14.svg",
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
                    <Grid item xs={12} md={4} align = {isMdUp ? 'right':'center'} className={classes.item1}>
                        <img src={Logo} alt="Mesa de ayuda" className={classes.logo} />
                    </Grid>

                    <Grid item xs={12} md={6} align = {isMdUp ? 'left':'center'} className={classes.item2}>
                        <Typography variant="h1" paragraph className={classes.mesa}>
                            Mesa de ayuda
                        </Typography>
                    </Grid>

                </Grid>
            </div>
        );

    }

export default withWidth()(withStyles(style) (Header));
