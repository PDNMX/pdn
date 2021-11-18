import React from "react";
import {withStyles} from '@mui/styles';
import {Grid, Typography, Modal} from "@mui/material";
import IconNotificacion from "@mui/icons-material/NotificationImportant";


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