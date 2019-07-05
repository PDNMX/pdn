import React from 'react';
import {withStyles} from '@material-ui/styles';
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
        paddingTop: 100,
        paddingBottom: 90,
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
    },
    text:{
        fontSize: '18px',
        fontWeight: 500,
        color: theme.palette.titleBanner.color,
        paddingBottom: theme.spacing(3)
    },
});

class Explora extends React.Component{

    render(){
        const {classes}  = this.props;

        return (
                <div className={classes.root}>
                    <Grid container spacing={0} justify='center' className={classes.container}>
                        <Grid item xs={12} align="center">
                            <Typography className={classes.headingText} paragraph>
                                Plataforma Digital Nacional
                            </Typography>

                            <Typography className={classes.text} paragraph>
                                Una fuente de inteligencia para construir integridad y combatir la corrupción
                            </Typography>

                            <iframe maxWidth="560" height="315" src="https://www.youtube.com/embed/e9zZE5i8Vt4" frameBorder="0" title={'Video'}
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen/>


                            <div>
                                <Button variant="contained" className={classes.button} component={Link} to="/about">Conoce más</Button>
                            </div>
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