import React from 'react';
import {withStyles} from '@material-ui/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import VideoDialog from './VideoDialog';
import {Typography} from "@material-ui/core";
const styles = theme => ({
    root: {
        flexGrow: 1
    },
    container: {
        paddingTop: 100,
        paddingBottom: 90,
        //paddingRight
    },
    button:{
        background: '#ffe01b'
    },
    headingText: {
        ...theme.typography.body1,
        color: theme.palette.titleBanner.color,
        fontWeight: "700",
        fontSize: '48px',
    },
    text: {
        ...theme.typography.body1,
        color: theme.palette.titleBanner.color,
        fontWeight: 500,
        fontSize: '48px'
    }

});

class Explora extends React.Component{

    render(){
        const {classes}  = this.props;

        return (
                <div className={classes.root}>
                    <Grid container spacing={0} justify='center' className={classes.container}>
                        <Grid item xs={12} align="center">
                            <Typography className={classes.headingText} >
                                Plataforma Digital Nacional
                            </Typography>


                            <p className={classes.text}>
                                explora los 6 sistemas
                            </p>

                            <VideoDialog/>
                        </Grid>
                    </Grid>
                </div>


        )
    }
}

Explora.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Explora);