

import React from "react";
import withStyles from '@mui/styles/withStyles';
import {Paper, Typography, Grid} from "@mui/material";

import bgNumeralia from '../../assets/numeralia/bg.jpg';

const styles = theme => ({
    container: {
        opacity: 0.95,
        padding: "5% 3%",
        backgroundColor: '#35a2d2',
    },
    bg: {
        backgroundImage: `url(${bgNumeralia})`,
        backgroundSize: "cover",
        backgroundPosition: 'center'
    },
    Foot: {
        backgroundColor: '#3E5866',
        
    },
    containerFoot: {
        backgroundColor: '#0d3b49',
    },
    headingText: {
        color: "#efd643",
        fontWeight: 500,
        fontSize: '45px',
        opacity: 1
    },
    text:{
        fontSize: '18px',
        fontWeight: 400,
        color: "#efd643",
        opacity: 1
    },
    textFoot:{
        fontSize: '15px',
        color: "#ced8db",
        margin: "5px"
    },
    
});

const Numeralia = props => {
    const {classes} = props;
 
    return (
        <React.Fragment>
            <Paper className={classes.bg}>
            <Grid container direction="row"  alignItems="flex-start" justifyContent='center' className={classes.container}>
                <Grid item md={2} sm={6} xs={12} align="center">
                    <Typography className={classes.headingText} paragraph>
                        39+
                    </Typography>
                    <Typography className={classes.text} paragraph>
                        Millones de personas conectadas
                    </Typography>
                </Grid>
                <Grid item md={2} sm={6} xs={12} align="center">
                    <Typography className={classes.headingText} paragraph>
                        6°
                    </Typography>
                    <Typography className={classes.text} paragraph>
                        Lugar en el top 10
                    </Typography>
                </Grid>
                <Grid item md={2} sm={6} xs={12} align="center">
                    <Typography className={classes.headingText} paragraph>
                        12+
                    </Typography>
                    <Typography className={classes.text} paragraph>
                        Millones de visitas anuales
                    </Typography>
                </Grid>
                <Grid item md={2} sm={6} xs={12} align="center">
                    <Typography className={classes.headingText} paragraph>
                        19+
                    </Typography>
                    <Typography className={classes.text} paragraph>
                        Estados interconectados
                    </Typography>
                </Grid>
                <Grid item md={2} sm={6} xs={12} align="center">
                    <Typography className={classes.headingText} paragraph>
                        6°
                    </Typography>
                    <Typography className={classes.text} paragraph>
                        Lugar en el top 10
                    </Typography>
                </Grid>
            </Grid>
            </Paper>
            <Grid container direction="row"  alignItems="flex-end" justifyContent='flex-end' className={classes.containerFoot}>
            <Grid item md={10} sm={10} xs={12} align="right" className={classes.Foot}>
                    <Typography className={classes.textFoot} paragraph>
                        Estadística actualizada al 10 de octubre de 2021
                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
export default withStyles(styles)(Numeralia);
