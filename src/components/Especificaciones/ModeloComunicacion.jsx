import React from 'react';
import Diagrama from "../../assets/diagrama_comunicacion_v1.1.svg";
import {Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import {withStyles} from "@mui/styles";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    diagrama: {
        maxWidth: 900
    },
    ul: {
        listStyle: 'none',
        paddingLeft: '20px',
    },
    li: {
        "&:before": {
            content: '"•"',
            color: '#7A3D71',
            fontWeight: "bold",
            display: "inline-block",
            width: "1em",
            marginLeft: "-1em"
        },
        paddingBottom: theme.spacing(1)
    },
    text: {
        color: theme.palette.text.primary,
        
    },
    title: {
        color: theme.palette.primary.main
    },
});

const ModeloComunicacion = props => {
    const {classes} = props;
    return (
            <Grid item xs={12}>
                <Typography variant="h5" className={classes.title}  paragraph>
                    Modelo de comunicación
                </Typography>

                <Typography paragraph className={classes.text} >
                    A través de la de la PDN, los usuarios serán capaces de realizar consultas a las APIs de las
                    Instituciones,
                    dichas consultas se configurarán usando parámetros (Ver la sección Parámetros de consulta). La
                    Figura 1 muestra un diagrama en el cual se ejemplifica la comunicación entre el API de
                    Servidores Públicos y Particulares Sancionados y la PDN. El API tendrá la tarea de recibir la
                    consulta y aplicar la lógica de negocio al interior de la institución para generar la respuesta
                    correspondiente. Dicha respuesta deberá estar apegada al estándar de Servidores Públicos y
                    Particulares Sancionados que se proporciona en la siguiente sección.
                </Typography>

                <img src={Diagrama} alt="Comunicación" className={classes.diagrama}/>

                <Typography paragraph className={classes.text} >
                    <b>Figura 1. </b> Esquema conceptual del flujo de comunicación entre Instituciones y la
                    Plataforma Digital Nacional. De derecha a izquierda se observan usuarios con diferentes perfiles
                    accediendo a la PDN y solicitando información de acuerdo a sus atribuciones.
                </Typography>
            </Grid>

    );
}

export default withStyles(styles)(ModeloComunicacion);