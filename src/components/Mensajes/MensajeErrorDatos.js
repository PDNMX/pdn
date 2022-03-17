import React from "react";
import {withStyles} from '@mui/styles';
import {Grid, Typography} from "@mui/material";
import IconProblem from "@mui/icons-material/ReportProblem";

const styles = theme => ({
    mensaje: {
        textAlign: "center",
        color: theme.palette.redColor
    },
    icon: {
        color: theme.palette.redColor,
        fontSize: "5em"
    },
    iconContainer: {
        textAlign: "center",

    }
});

function MensajeErrorDatos({classes}) {
    return (
        <Grid container>
            <Grid item xs={12} className={classes.iconContainer}>
                <IconProblem className={classes.icon}/>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" paragraph className={classes.mensaje}>
                    <b>Servicio no disponible</b>
                </Typography>
            </Grid>
        </Grid>
    )

}

export default withStyles(styles, {withTheme: true})(MensajeErrorDatos);