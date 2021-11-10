import React from "react";
import withStyles from '@mui/styles/withStyles';
import {Typography} from "@mui/material"
import mp4 from '../../assets/videos/pdn_intro.mp4';
import './VideoBanner.css';
import VideoAppBar from "./VideoAppBar";
//import VersionAlpha from '../../assets/alfa.png';
import Version from '../../assets/version.png';

const styles = theme => ({
    video: {
        zIndex: 1,
        right: 0,
        bottom: 0,
        width: '100%',
        [theme.breakpoints.down('lg')]: {
            width: 1280
        },
        //minWidth: '100%',
        position: 'absolute'
    },
    contents: {
        paddingTop: 260,
        position: 'absolute',
        zIndex: 3,
        textAlign: 'center',
        width: '100%'
    },
    text: {
        color: "#ffffff",
        [theme.breakpoints.down('md')]:{
            fontSize: '40px',
        },
    },
    boldText: {
        fontWeight: 500
    },
    appBar: {
        position: 'absolute',
        zIndex: 5,
        width: '100%'
    },
    alpha: {
        position: 'absolute',
        zIndex: 4
    }
});

const Banner = props => {
    const {classes} = props;
    return (
        <div className="video-bg">
            <video autoPlay loop muted className={classes.video}>
                <source src={mp4} type="video/mp4"/>
                Tu navegador no soporta este tag
            </video>

            <div className={classes.alpha}>
                <img alt="Version" src={Version} width="142px;"/>
            </div>

            <div className={classes.appBar}>
                <VideoAppBar/>
            </div>

            <div className={classes.contents}>
                <Typography className={classes.text} variant="h2">
                    Inteligencia <span className={classes.boldText}>anticorrupción</span> con datos.
                </Typography>
            </div>

        </div>
    );
};

export default withStyles(styles)(Banner);
