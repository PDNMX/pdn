import React from 'react';
import withStyles from '@mui/styles/withStyles';
import {Link as RouterLink} from 'react-router-dom';
import {Typography, Grid, Breadcrumbs, Link, useMediaQuery} from "@mui/material"
import classNames from 'classnames';
import Banner from "../../HomeV2/Banner";
import {useTheme} from "@emotion/react";
import IconS2 from "../../../assets/rediseno/ico_sistemas/ico_s2_color.svg";
import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs" />;

function useIsWidthUp(breakpoint) {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.up(breakpoint));
}
const style = theme => ({
        root: {
            flexGrow:1,
            backgroundColor: theme.palette.background.opaque+'80', // 80 hex => 128 dec => 50%
        },
        container1: {
            paddingTop: '75px',
            paddingBottom: '75px',
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1)
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
            color: theme.palette.S2.color,
            fontWeight: '100'
        },
        button:{
            background: '#ffe01b',
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(2)
        },
        currentSection:{
            color: theme.palette.S2.color
        }
    }
);

const Header = props => {
    const {classes} = props;
    const isMdUp = useIsWidthUp("md");

    return(
        <div className={classes.root}>
            <Banner/>

            <Grid container spacing={0} justifyContent='center'>
                <Grid item xs={12} className={classes.item3}>
                    <Breadcrumbs aria-label="breadcrumb" sx={{color:'#ffffff', paddingTop: '10px'}}>
                        <Link component={RouterLink}
                              underline="hover"
                              sx={{ display: 'flex', alignItems: 'center' }}
                              color='inherit' to="/">
                            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            Plataforma Digital Nacional
                        </Link>

                        <Typography className={classes.currentSection}
                                    sx={{ display: 'flex', alignItems: 'center' }}>
                            <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            Servidores públicos en contrataciones
                        </Typography>
                    </Breadcrumbs>
                </Grid>
            </Grid>

            <Grid container spacing={0} className={classNames(classes.container1)} justifyContent='center'>

                <Grid item xs={12} md={4} align = {isMdUp ? 'right' : ' center'}  className={classes.item1}>
                    <img src={IconS2} alt="Sistema 2" className={classes.logo}/>
                </Grid>
                <Grid item xs={12} md={6} className={classes.item2} align = {isMdUp ? 'left' : ' center'}>
                    <Typography variant="h4" paragraph className={classes.whiteText} >
                        Servidores públicos en contrataciones
                    </Typography>
                    <Typography variant="h4" paragraph className={classes.whiteText} >
                        Sistema de los Servidores públicos que intervengan en procedimientos de contrataciones públicas
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
}

export default withWidth()(withStyles(style)(Header));
