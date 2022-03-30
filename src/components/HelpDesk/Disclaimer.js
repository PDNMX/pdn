import React from 'react';
import Typography from "@mui/material/Typography";
import {withStyles} from "@mui/styles";

const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingBottom: 0,
        paddingTop: 0
    },
});

const Disclaimer = props => {
    const {classes} = props;

    return (<div className={classes.root}>
            <Typography paragraph>
                Consulta las dudas más frecuentes sobre el desarrollo y construcción de la PDN, además encontrarás preguntas y respuestas sobre los datos que la conforman, así como un correo electrónico de apoyo en caso de no haber solucionado tus dudas.
            </Typography>
        </div>);
}

export default withStyles(styles)(Disclaimer);