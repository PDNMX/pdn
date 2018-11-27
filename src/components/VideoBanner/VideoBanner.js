import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography/Typography";
import PropTypes from "prop-types";
import Grid from '@material-ui/core/Grid';
import mp4 from '../../assets/videos/hero2.mp4';
import ogv from '../../assets/videos/hero2.ogv';

const styles = theme => ({
    videoBg:{
        height: '600px',
        textAlign:'left',
        overFlow: 'hidden',
        zIndex: 10,
        position: 'relative'
    },
    pdn: {
        [theme.breakpoints.up('sm')]:{
            paddingTop: '75px'
        },
        [theme.breakpoints.down('sm')]:{
            paddingTop: '40px'

        },
        color: '#fff'
    },
    video: {
        //position: "absolute",
        zIndex: 1,
        right: 0,
        bottom: 0,
        minWidth: '100%',
        //maxHeight: '300px',
    },
    contents: {
        position: 'relative',
        bottom: 0,
        width: '100%',
        padding: '20px',
    }
});

class Banner extends React.Component {
    render(){
        const { classes } = this.props;
        return (
            <div className={classes.videoBg}>
                <video autoPlay loop muted className={classes.video}>
                    <source src={mp4} type="video/mp4"/>
                    <source src={ogv} type="video/ogv"/>
                    Tu navegador no soporta este tag
                </video>

                <div className={classes.contents}>
                Inteligencia anticorrupción con datos
                </div>
            </div>
        );
    }
}

Banner.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Banner);
