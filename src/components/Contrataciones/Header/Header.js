import React from 'react';
import withStyles from '@mui/styles/withStyles';
import Grid from '@mui/material/Grid';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@mui/material/Link';
import Typography from "@mui/material/Typography";
import BarraLogoMenu from "../../Compartidos/BarraLogoMenu";
import IconS6 from "../../../assets/rediseno/ico_sistemas/ico_s6_light.svg";

import Particles from 'react-particles-js';
import {getParams} from './ParticleParams';
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
            background: "linear-gradient(0deg, #42A5CC 0%, #42A5CC 100%)",
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
    const isMdUp = useIsWidthUp("md");

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
                <Grid item xs={12} md={4} align={isMdUp ? 'right':'center'} className={classes.item1}>
                    <img src={IconS6} alt="Especificaciones" className={classes.logo}/>
                </Grid>

                <Grid item xs={12} md={6} className={classes.item2} align={isMdUp ? 'left':'center'}>

                    <Typography variant="h4" paragraph className={classes.whiteText} style={{  fontWeight: 600}}>
                        Contrataciones públicas
                    </Typography>

                    <Typography variant="h4" paragraph className={classes.whiteText} style={{fontWeight: 400}}>
                        Sistema de Información Pública de Contrataciones
                    </Typography>

                </Grid>
            </Grid>
        </div>
    )
}

export default withWidth()(withStyles(style) (Header));
