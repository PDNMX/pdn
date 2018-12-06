import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Header from "../PDNAppBar/PDNAppBar";
import Footer from "../Home/Footer";

const styles = theme => ({
    root:{
        flexGrow: 1
    },
    item: {
        maxWidth:1200
    }
});

class Faq extends React.Component{
    render (){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Header/>
                    <Grid container spacing={0} justify='center'>

                        <Grid item xs={12} className={classes.item}>

                            <Typography variant="h4">
                                Preguntas frecuentes
                            </Typography>

                            <ul>
                                <li>
                                    <Typography>
                                        ¿La Plataforma Digital Nacional (PDN) va a generar información?<br/>
                                        No. El objetivo de la Plataforma es generar interoperabilidad entre los datos que ya generan actualmente los entes obligados, a través del uso de estándares comunes.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography>
                                        ¿La PDN va a operar sistemas como CompraNet o Declaranet?<br/>
                                        No. Las Plataforma será una herramienta de interoperabilidad que a través de las estandarización de la información será capaz de consultar los datos que contienen sistemas como CompraNet o Declaranet.
                                        <br/>
                                        La generación de los datos desde sistemas como CompraNet o Declaranet seguirá siendo responsabilidad de los entes que tienen la atribución actualmente.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography>
                                        ¿La PDN se van a quedar con los datos generados por las instituciones?<br/>
                                        No. Las Instituciones son las responsables de los datos que generan, y a partir de la publicación de los lineamientos de cada Sistema, deberán estandarizarlos de acuerdo a lo solicitado por la SESNA a través del Comité Coordinador del SNA.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography>
                                        ¿Se van a compartir los datos reservados o personales?<br/>
                                        No. Los estándares de datos que serán publicados por la SESNA permiten el control institucional para la consulta de datos reservados o personales.
                                        <br/>
                                        De acuerdo a lo mandatado por la Ley del SNA, el Comité Coordinador del SNA, tendrá la responsabilidad de aprobar el catálogo de perfiles de funcionarios que tendrán acceso a los datos reservados.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography>
                                        ¿Cómo se va a trabajar en la seguridad e integridad de los datos?<br/>
                                        Se utilizarán  herramientas de autentificación que contemplarán los roles y permisos, por ejemplo: SSL, Firebase, OAuth, eFirma; estas herramientas permitirán mantener la trazabilidad de las consultas de datos que se hagan dentro de las plataformas, garantizando su máxima seguridad.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography>
                                        ¿Quién va a poder acceder a la PDN?<br/>
                                        El componente público de la PDN será para consulta de cualquier ciudadano, y dará acceso a los datos que tienen carácter público, de acuerdo a la Ley General de Transparencia y Acceso a la Información.
                                        <br/>
                                        El componente privado tendrá un acceso restringido que será determinado por el Comité Coordinador del SNA, quien tendrá la responsabilidad de aprobar el catálogo de perfiles y funcionarios que tendrán acceso a los datos reservados.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography>
                                        ¿Qué es interoperabilidad?<br/>
                                        Interoperabilidad se refiere a la posibilidad que tiene un sistema de obtener o transferir información con otros sistemas. Para lograr la interoperabilidad de los datos, es necesario estandarizarlos y ponerlos en un formato común.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography>
                                        ¿Qué es un estándar de datos?
                                        <br/>
                                        Un estándar se refiere a las reglas y características con las que debe de contar un dato, como: tipo de dato, longitud, número de veces que aparece, precisión, etc.
                                    </Typography>
                                </li>
                            </ul>
                        </Grid>
                    </Grid>
                <Footer/>
            </div>
        );
    }
}

Faq.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Faq);