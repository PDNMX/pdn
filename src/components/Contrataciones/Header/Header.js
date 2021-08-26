import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import C from '../../../assets/iconos_azul/6_icono.svg'
import Typography from "@material-ui/core/Typography";
import withWidth, {isWidthUp} from '@material-ui/core/withWidth';
import BarraLogoMenu from "../../Compartidos/BarraLogoMenu";

import Particles from 'react-particles-js';
import {getParams} from './ParticleParams';

const style = theme => ({
        root: {
            flexGrow:1
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

const Header = props => {
    const {classes} = props;

    return (
        <div className={classes.root}>

            <BarraLogoMenu/>

            <Grid container spacing={0} className="breadcrumb" justifyContent='center'>
                <Grid item xs={12} className={classes.item3}>
                    <ul>
                        <li>
                            <Link component={RouterLink} className={classes.link} to='/'>
                                Plataforma Digital Nacional
                            </Link>
                        </li>
                        <li>
                            Contrataciones
                        </li>
                    </ul>
                </Grid>
            </Grid>

            <Grid container spacing={0} className={classes.container1} justifyContent='center'>
                <Particles 
                    className={classes.particulas}
                    params={getParams()}
                />
                <Grid item xs={12} md={4} align={isWidthUp('md', props.width)? 'right':'center'} className={classes.item1}>
                    <img src={C} alt="Especificaciones" className={classes.logo}/>
                </Grid>

                <Grid item xs={12} md={6} className={classes.item2} align={isWidthUp('md', props.width)? 'left':'center'}>

                    <Typography variant="h4" paragraph className={classes.whiteText} style={{  fontWeight: 600}}>
                        Contrataciones públicas
                    </Typography>

                    <Typography variant="h4" paragraph className={classes.whiteText} style={{fontWeight: 300}}>
                        Sistema de Información Pública de Contrataciones
                    </Typography>

                </Grid>
            </Grid>
        </div>
    )
}

export default withWidth()(withStyles(style) (Header));
