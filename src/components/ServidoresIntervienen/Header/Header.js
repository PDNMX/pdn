import React from 'react';
import withStyles from '@mui/styles/withStyles';
import {Link} from 'react-router-dom';
import {Typography, Grid} from "@mui/material"
import '../../Utils/Header.css';
import classNames from 'classnames';
import BarraLogoMenu from "../../Compartidos/BarraLogoMenu";
import Particles from 'react-particles-js';
import {getParams} from './ParticleParams';
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@emotion/react";
import IconS2 from "../../../assets/rediseno/ico_sistemas/ico_s2_light.svg";

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
        container1: {
            paddingTop: '75px',
            paddingBottom: '75px',
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
            position: 'relative',
            background: "linear-gradient(0deg, #281426 0%, #B25FAC 100%)",
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

    return(
        <div className={classes.root}>
            <BarraLogoMenu/>

            <Grid container spacing={0} className="breadcrumb" justifyContent='center'>
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

            <Grid container spacing={0} className={classNames(classes.container1)} justifyContent='center'>
                <Particles
                    className={classes.particulas}
                    params={getParams()}
                />

                <Grid item xs={12} md={4} align = {isMdUp ? 'right' : ' center'}  className={classes.item1}>
                    <img src={IconS2} alt="Sistema 2" className={classes.s2}/>
                </Grid>
                <Grid item xs={12} md={6} className={classes.item2} align = {isMdUp ? 'left' : ' center'}>
                    <Typography variant="h4" paragraph className={classes.whiteText} style={{  fontWeight: 600}}>
                        Servidores públicos en contrataciones
                    </Typography>
                    <Typography variant="h4" paragraph className={classes.whiteText} style={{fontWeight: 300}}>
                        Sistema de los Servidores públicos que intervengan en procedimientos de contrataciones públicas
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
}

export default withWidth()(withStyles(style)(Header));
