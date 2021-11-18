import React from 'react';
import withStyles from '@mui/styles/withStyles';
import {Link} from 'react-router-dom';
import PDNLogo from '../../../../assets/PDN.png';
import S3 from '../../../../assets/iconos_azul/3_icono.svg'
import {Typography, Grid} from "@mui/material"
import Particles from 'react-particles-js';
import {useTheme} from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs"/>;

function useIsWidthUp(breakpoint) {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.up(breakpoint));
}

const style = theme => ({
        root: {
            flexGrow: 1
        },
        container1: {
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
        item1: {
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
        },
        item2: {
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2)
        },
        item3: {
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
        particulas: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
        },
    }
);

const Header = props => {
    const {classes} = props;
    const isMdUp = useIsWidthUp("md");

    return (
        <div className={classes.root}>
            {/*<PDNAppBar/>*/}

            <Grid container spacing={0} justifyContent="center" style={{background: '#fff'}}>
                <Grid item xs={12} className={classes.item3}>
                    <Link to="/" className={classes.link}>
                        <img src={PDNLogo} alt="PDN" className={classes.pdnLogo}/>
                    </Link>
                </Grid>
            </Grid>

            <Grid container spacing={0} className="breadcrumb" justifyContent='center'>
                <Grid item xs={12} className={classes.item3}>
                    <ul>
                        <li>
                            <Link className={classes.link} to='/'>Plataforma Digital Nacional</Link>
                        </li>
                        <li>
                            <Link className={classes.link} to='/especificaciones'>Especificaciones</Link>
                        </li>
                        <li>
                            Sistema 3
                        </li>
                    </ul>
                </Grid>
            </Grid>

            <Grid container spacing={0} className={classes.container1} justifyContent='center'>
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
                                        "src": process.env.PUBLIC_URL + "/img/flotantes/especificaciones/1.svg",
                                        "height": 30,
                                        "width": 30
                                    },
                                    {
                                        "src": process.env.PUBLIC_URL + "/img/flotantes/especificaciones/2.svg",
                                        "height": 30,
                                        "width": 30
                                    },
                                    {
                                        "src": process.env.PUBLIC_URL + "/img/flotantes/especificaciones/3.svg",
                                        "height": 30,
                                        "width": 30
                                    },
                                    {
                                        "src": process.env.PUBLIC_URL + "/img/flotantes/especificaciones/4.svg",
                                        "height": 30,
                                        "width": 30
                                    },
                                    {
                                        "src": process.env.PUBLIC_URL + "/img/flotantes/especificaciones/5.svg",
                                        "height": 30,
                                        "width": 30
                                    },
                                    {
                                        "src": process.env.PUBLIC_URL + "/img/flotantes/especificaciones/6.svg",
                                        "height": 30,
                                        "width": 30
                                    },
                                    {
                                        "src": process.env.PUBLIC_URL + "/img/flotantes/especificaciones/7.svg",
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
                <Grid item xs={12} md={4} align={isMdUp ? 'right' : 'center'} className={classes.item1}>
                    <img src={S3} alt="Sistema 2" className={classes.s2}/>
                </Grid>

                <Grid item xs={12} md={6} className={classes.item2} align={isMdUp ? 'left' : 'center'}>
                    <Typography variant="h4" paragraph className={classes.whiteText} style={{fontWeight: 300}}>
                        Servidores públicos y
                    </Typography>
                    <Typography variant="h4" paragraph className={classes.whiteText} style={{fontWeight: 600}}>
                        particulares sancionados
                    </Typography>
                    <Typography className={classes.whiteText} style={{fontSize: '18px', fontWeight: 500}}>
                        Especificaciones técnicas
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );

}

export default withWidth()(withStyles(style)(Header));
