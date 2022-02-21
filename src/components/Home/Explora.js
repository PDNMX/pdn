import React from 'react';
import withStyles from '@mui/styles/withStyles';
import Grid from '@mui/material/Grid';
import {Typography} from "@mui/material";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";

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
        color: theme.palette.text.greyColor,
        fontWeight: "700",
        fontSize: '48px',
        [theme.breakpoints.down('md')]:{
            fontSize: '40px',
        },
    },
    text:{
        fontSize: '18px',
        fontWeight: 500,
        color: theme.palette.text.greyColor,
        paddingBottom: theme.spacing(3)
    },
    videoDiv:{
        maxWidth: 800,
        margin: theme.spacing(1)
    }
});

const Explora = props => {
    const {classes}  = props;

    return (
        <div className={classes.root}>
            <Grid container spacing={0} justifyContent='center' className={classes.container}>
                <Grid item xs={12} align="center">
                    <Typography className={classes.headingText} paragraph>
                        Plataforma Digital Nacional
                    </Typography>

                    <Typography className={classes.text} paragraph>
                        Una fuente de inteligencia para construir integridad y combatir la corrupción, que crea valor para el gobierno y la sociedad, a partir de grandes cantidades de datos.
                    </Typography>

                    <div className={classes.videoDiv}>
                        <iframe width="100%" height="450" src="https://www.youtube.com/embed/e9zZE5i8Vt4?rel=0" frameBorder="0" title={'Video'}
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen/>
                    </div>

                    <div>
                        <Button variant="contained" className={classes.button} component={Link} to="/about">Conoce más</Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default withStyles(styles)(Explora);