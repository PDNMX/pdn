import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import {Typography} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';
import IconNotificacion from "@material-ui/icons/NotificationImportant";


const styles = theme => ({
    mensaje: {
        textAlign: "center",
        color: theme.palette.primary.dark
    },
    icon: {
        color: theme.palette.primary.dark,
        fontSize: "5em"
    },
    iconContainer: {
        textAlign: "center",

    }
});

function MensajeNoRegistros({classes}) {
    return (
        <Grid container>
            <Grid item xs={12} className={classes.iconContainer}>
                <IconNotificacion className={classes.icon}/>
            </Grid>
            <Grid item xs={12}>
                <Grid item xs={12}>
                    <Typography variant="h6" paragraph className={classes.mensaje}>
                        <b>La búsqueda no obtuvo resultados</b>
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles, {withTheme: true})(MensajeNoRegistros);