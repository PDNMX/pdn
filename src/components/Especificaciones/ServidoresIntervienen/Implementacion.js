import React from 'react';
import {withStyles} from '@mui/styles';
import {Typography, Link} from "@mui/material"
import Diagrama from "../../../assets/Diagrama_de_comunicacion_API.svg";
import Grid from '@mui/material/Grid';

const styles = theme =>({
    root: {
        flexGrow: 1
    },
    diagrama: {
        maxWidth: 900
    },
    ul: {
        listStyle: 'none',
        paddingLeft: '20px',
        color: theme.palette.text.primary
    },
    li: {
        "&:before":{
            content: '"•"',
            color: '#5fb1e6',
            fontWeight: "bold",
            display: "inline-block",
            width: "1em",
            marginLeft: "-1em"
        },
        paddingBottom: theme.spacing(1)
    },
});

const Implementacion = props => {
    const {classes} = props;
    return (
        <div className={classes.root}>

            <Grid container spacing={0}>

                <Grid item xs={12}>
                    <Typography variant="h4" paragraph color='textPrimary'>Implementación del estándar</Typography>
                    <Typography paragraph color='textPrimary'>
                        La implementación del estándar de Datos de Servidores
                        Públicos que Intervienen en Contrataciones representará esfuerzos de diferente magnitud
                        dependiendo del nivel de adopción tecnológica de cada Institución. Suponiendo que una cierta
                        Institución ya cuenta con un sistema de captura de Servidores
                        Públicos que Intervienen en Contrataciones, el proceso de implementación
                        del API de  de Servidores Públicos que Intervienen en Contrataciones puede ser dividido en los siguientes pasos:
                    </Typography>

                    <ul className={classes.ul}>
                        <li className={classes.li}>
                            <Typography paragraph display='inline'>
                                <b>Diagnóstico:</b> Revisar y comparar los datos contenidos en su base de datos con
                                los especificados en <Link target={'_blank'} href={'https://docs.google.com/spreadsheets/d/1fRhDfHtrBPYyR36zxpenXWind9FP1pLAQJOVS69QwUM/edit?usp=sharing'} rel="noopener noreferrer"> Diccionario de Datos del Formato de Datos de Servidores Públicos que Intervienen en Contrataciones </Link>, es importante contar con todos los datos solicitados
                                en el nuevo formato, sin embargo, esto no imposibilita a las Instituciones para realizar pruebas de adopción del estándar usando los datos con los que se cuenta.
                            </Typography>
                        </li>
                        <li className={classes.li}>
                            <Typography paragraph display='inline'>
                                <b>Diseño de arquitectura:</b> Se deberá evaluar las capacidades del sistema de información o base de datos de Servidores
                                Públicos que Intervienen en Contrataciones, a fin de diagnosticar su capacidad para soportar la carga de trabajo actual y al mismo tiempo la tarea de resolver las consultas que serán realizadas por la PDN a través del API.
                                <br/>
                                En el caso de contar con gran cantidad de usuarios y como medida de seguridad, se recomienda implementar alguna solución de replicación de la información en el sistema de base de datos; de tal manera que se divida la carga de trabajo en dos o más bases de datos.
                            </Typography>
                        </li>
                        <li className={classes.li}>
                            <Typography paragraph display='inline'>
                                <b>Desarrollo:</b> El desarrollo del API de Servidores Públicos que Intervienen en Contrataciones podrá realizarse en el lenguaje de programación que se considere más apropiado con apego a las especificaciones que se proporcionan en las siguientes secciones de la presente guía. Dichas especificaciones son agnósticas a la tecnología, es decir, el resultado de la comunicación deberá ser el mismo, siempre que se respeten las reglas, formatos de datos y la sintaxis de los mensajes.
                            </Typography>
                        </li>
                    </ul>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h5" paragraph color='textPrimary'>
                        Modelo de comunicación
                    </Typography>

                    <Typography paragraph color='textPrimary'>
                        A través de la de la PDN, los usuarios serán capaces de realizar consultas a las APIs de las Instituciones, dichas consultas se configurarán usando parámetros (Ver la sección Parámetros de consulta). La Figura 1 muestra un diagrama en el cual se ejemplifica la comunicación entre el API de Servidores
                        Públicos que Intervienen en Contrataciones de una Institución y la PDN. El API tendrá la tarea de recibir la consulta y aplicar la lógica de negocio al interior de la institución para generar la respuesta correspondiente. Dicha respuesta deberá estar apegada al estándar de Datos de Servidores
                        Públicos que Intervienen en Contrataciones que se proporciona en la siguiente sección.
                    </Typography>

                    <img src={Diagrama} alt="Comunicación" className={classes.diagrama}/>
                    <Typography paragraph color='textPrimary'>
                        <b>Figura 1. </b>  Esquema conceptual del flujo de comunicación entre Instituciones y la Plataforma Digital Nacional. De derecha a izquierda se observan usuarios con diferentes perfiles accediendo a la PDN y solicitando información de acuerdo a sus atribuciones.
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
}

export default withStyles(styles)(Implementacion);