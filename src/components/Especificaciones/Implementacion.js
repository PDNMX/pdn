import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import Diagrama from "../../assets/Diagrama_de_comunicacion_API.svg";

const styles = theme =>({
    root: {
        flexGrow: 1
    },
    diagrama: {
        maxWidth: 900
    },
});

class Implementacion extends React.Component{

    render() {

        const {classes} = this.props;
        return (
            <div className={classes.root}>

                <Typography variant="h4" paragraph>Implementación del estándar</Typography>
                <Typography paragraph>
                    La implementación del estándar de declaraciones representará esfuerzos de diferente magnitud dependiendo del nivel de adopción tecnológica de cada Institución. Suponiendo que una cierta Institución ya cuenta con un sistema de captura de declaraciones, el proceso de implementación del API de declaraciones puede ser dividido en los siguientes pasos:
                </Typography>

                <ul>
                    <li>
                        <Typography paragraph>
                            <b>Diagnóstico:</b> Revisar y comparar los datos contenidos en su base de datos con los especificados en la publicación del Formato de declaraciones en el Diario Oficial de la Federación, es importante contar con todos los datos solicitados en el nuevo formato, sin embargo, esto no imposibilita a las Instituciones para realizar pruebas de adopción del estándar usando los datos con los que se cuenta.
                        </Typography>
                    </li>
                    <li>
                        <Typography paragraph>
                            <b>Diseño de arquitectura:</b> Se deberá evaluar las capacidades del sistema de información o base de datos de declaraciones, a fin de diagnosticar su capacidad para soportar la carga de trabajo actual y al mismo tiempo la tarea de resolver las consultas que serán realizadas por la PDN a través del API.
                            <br/>
                            En el caso de contar con gran cantidad de usuarios y como medida de seguridad, se recomienda implementar alguna solución de replicación de la información en el sistema de base de datos; de tal manera que se divida la carga de trabajo en dos o más bases de datos.
                        </Typography>
                    </li>
                    <li><Typography paragraph>
                        <b>Desarrollo:</b> El desarrollo del API de declaraciones podrá realizarse en el lenguaje de programación que se considere más apropiado con apego a las especificaciones que se proporcionan en las siguientes secciones de la presente guía. Dichas especificaciones son agnósticas a la tecnología, es decir, el resultado de la comunicación deberá ser el mismo, siempre que se respeten las reglas, formatos de datos y la sintaxis de los mensajes.
                    </Typography>
                    </li>
                </ul>

                <Typography variant="h5" paragraph>
                    Modelo de comunicación
                </Typography>
                <Typography paragraph>
                    A través de la de la PDN, los usuarios serán capaces de realizar consultas a las APIs de las Instituciones, dichas consultas se configurarán usando parámetros (Ver la sección Parámetros de consulta). La Figura 1 muestra un diagrama en el cual se ejemplifica la comunicación entre el API de declaraciones de una Institución y la PDN. El API tendrá la tarea de recibir la consulta y aplicar la lógica de negocio al interior de la institución para generar la respuesta correspondiente. Dicha respuesta deberá estar apegada al estándar de declaraciones proporcionado que se proporciona en la siguiente sección.
                </Typography>
                <img src={Diagrama} alt="Comunicación" className={classes.diagrama}/>
                <Typography paragraph>
                    <b>Figura 1. </b>  Esquema conceptual del flujo de comunicación entre Instituciones y la Plataforma Digital Nacional. De derecha a izquierda se observan usuarios con diferentes perfiles accediendo a la PDN y solicitando información de acuerdo a sus atribuciones.
                </Typography>
            </div>
        );
    }
}


Implementacion.propTypes = {
  classes : PropTypes.object.isRequired
};


export default withStyles(styles)(Implementacion);