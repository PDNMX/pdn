import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    container: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10),
        //paddingRight
    },
    button:{
        background: '#ffe01b',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2)
    },
    headingText: {
        color: theme.palette.titleBanner.color,
        fontWeight: "700",
        fontSize: '48px',
        [theme.breakpoints.down('sm')]:{
            fontSize: '40px',
        },
    },
    text:{
        fontSize: '18px',
        fontWeight: 500,
        color: theme.palette.titleBanner.color,
        paddingBottom: theme.spacing(3)
    },
    videoDiv:{
        maxWidth: 800,
        margin: theme.spacing(1)
    }
});

class MercadoDigital extends React.Component{

    render(){
        const {classes}  = this.props;

        return (
                <div className={classes.root}>
                    <Grid container spacing={0} justify='center' className={classes.container}>
                        <Grid item xs={12} align="center">
                            <Typography className={classes.headingText} paragraph>
                                Mercado Digital Anticorrupción
                            </Typography>

                            <Typography className={classes.text} paragraph>
                                Conoce más acerca de este nuevo espacio que estará disponible en la PDN, en donde habrá herramientas que facilitarán la interconexión con los Sistemas 1, 2 y 3.
                            </Typography>

                            <div className={classes.videoDiv}>
                                <iframe width="100%" height="450" src="https://www.youtube.com/embed/JQNPwOOG4yw" frameBorder="0" title={'Video'}
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen/>

                            </div>

                            <div>
                                <Button variant="contained" className={classes.button} component={Link} to="/about">Conoce más</Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>


        )
    }
}

MercadoDigital.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MercadoDigital);