import React from "react";
import withStyles from '@mui/styles/withStyles';
import {Typography, Grid} from "@mui/material";

const styles = theme => ({
    root:{
        backgroundColor: '#35a2d2',
        padding: '2px',
        color: '#3e5968',

    },
    version:{
        maxWidth: 1200
    },
    fecha:{
        color: '#fff'
    }
});

function Version(props){
    const { classes } = props;
    let date = new Date()
    let day = date.getDate()
    let month = new Intl.DateTimeFormat('es-ES', { month: 'long'}).format(new Date());
    let year = date.getFullYear()


    return(
        <React.Fragment>
            <Grid container spacing={0} justifyContent="center" className={classes.root}>
                <Grid item xs={12} className={classes.version}>
                    <Typography display={'inline'}><b>Versión 1.0</b>&nbsp;&nbsp;</Typography>
                    <Typography display={'inline'} className={classes.fecha}>{`${day} ${month} ${year}`}</Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}


export default withStyles(styles)(Version);