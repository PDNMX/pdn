import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core"
import PropTypes from "prop-types";
import mp4 from '../../assets/videos/pdn_intro.mp4';
import './VideoBanner.css';
import VideoAppBar from "./VideoAppBar";

import VersionAlpha from '../../assets/alfa.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookSquare} from "@fortawesome/free-brands-svg-icons/faFacebookSquare";
import {faTwitter} from "@fortawesome/free-brands-svg-icons/faTwitter";
import {faYoutube} from "@fortawesome/free-brands-svg-icons/faYoutube";

import Version from '../../assets/beta-v0.2.png';

const styles = theme => ({

    video: {
        zIndex: 1,
        right: 0,
        bottom: 0,
        width: '100%',
        [theme.breakpoints.down('md')]: {
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
        color: "#ffffff"
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
    },
    redSocial: {
        marginRight: theme.spacing(5),
        color: '#ffffff'
    },
    contentsSN: {
        paddingTop: 370,
        position: 'absolute',
        zIndex: 3,
        textAlign: 'center',
        width: '100%'
    },
});

class Banner extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div className="video-bg">
                <video autoPlay loop muted className={classes.video}>
                    <source src={mp4} type="video/mp4"/>
                    Tu navegador no soporta este tag
                </video>

                <div className={classes.alpha}>
                    <img alt="alpha" src={VersionAlpha} width="142px;"/>
                </div>

                <div className={classes.appBar}>
                    <VideoAppBar/>
                </div>

                    <div className={classes.alpha}>
                        <img alt="alpha" src={Version} width="142px;"/>
                    </div>


                <div className={classes.contents}>
                    <Typography className={classes.text} variant={"h2"}>
                        Inteligencia <span className={classes.boldText}>anticorrupción</span> con datos.
                    </Typography>
                </div>
                <div className={classes.contentsSN}>
                    <a href={"https://www.facebook.com/SESNAOficial/"} className={classes.redSocial}><FontAwesomeIcon
                        icon={faFacebookSquare} size="2x"/></a>
                    <a href={"https://twitter.com/SESNAOficial"} className={classes.redSocial}><FontAwesomeIcon
                        icon={faTwitter} size="2x"/></a>
                    <a href={"https://www.youtube.com/channel/UCRUpiHth_WRkNo2sBmZIyfQ/"} className={classes.redSocial}><FontAwesomeIcon
                        icon={faYoutube} size="2x"/></a>

                </div>
            </div>
        );
    }
}

Banner.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Banner);
