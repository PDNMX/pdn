import React from "react";
import withStyles from '@mui/styles/withStyles';
import {Typography, Grid} from "@mui/material";

const styles = theme => ({
    root:{
        backgroundColor: '#35a2d2',
        padding: 2,
        color: '#3e5968',
        paddingLeft: 30

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
            <div className={classes.root}>
                    <Typography display={'inline'}><b>Versión 1.0</b>&nbsp;&nbsp;</Typography>
                    <Typography display={'inline'} className={classes.fecha}>{`${day} ${month} ${year}`}</Typography>
            </div>
        </React.Fragment>
    );
}


export default withStyles(styles)(Version);