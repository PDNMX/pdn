import React from 'react';
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/styles";

const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingBottom: 0,
        paddingTop: 0
    },
});

class Disclaimer extends React.Component{

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Typography paragraph color='textPrimary'>
                    Consulta las dudas más frecuentes sobre el desarrollo y construcción de la PDN, además encontrarás preguntas y respuestas sobre los datos que conforman la PDN así como un correo electrónico de apoyo en caso de no haber solucionado tus dudas.
                </Typography>

            </div>
        );
    }
}

export default withStyles(styles)(Disclaimer);