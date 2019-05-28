import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Header from "./Header/Header";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const styles = theme => ({
    root :{
        flexGrow: 1
    },
    item: {
        maxWidth:1000,
        paddingTop: 100,
        paddingBottom: 100
    },
    bullet: {
        backgroundColor: '#5fb1e6',
        height: '8px',
        width: '8px',
        borderRadius: '50%',
        display: 'inline-block',
        marginLeft: '-20px',
        //marginTop: '-10px'
    },
    ul: {
        listStyle: 'none',
        paddingLeft: '20px'
    },
    li: {
        color: '#606060',
        paddingTop: 10,
        marginBottom: 20
    },
    container: {
        paddingRight: theme.spacing.unit,
        paddingLeft: theme.spacing.unit
    },
    sublist: {
        color: '#606060',
        fontSize: '0.975rem',
    }
});

class Metodologia extends React.Component{

    render (){

        const {classes} = this.props;
        return <div className={classes.root}>
            <Header/>

            <Grid container spacing={0} className={classes.container} justify="center">

                <Grid item xs={12} className={classes.item}>

                    <Typography variant="h5">Motivación</Typography>


                    <Typography paragraph>
                        Uno de los retos más grandes para quienes usan datos del gobierno es la diversidad formatos, tipos y tamaño. Por un lado, la búsqueda de conjuntos de datos resulta compleja. Por otro, los formatos predeterminados dificultan el procesamiento. Asimismo, existe la posibilidad de que los conjuntos de datos no hayan sido actualizados y periodos de información se hayan extraviado.
                    </Typography>


                    <Typography paragraph>
                        En el gobierno se han  dado importantes logros en tecnología y datos. Gracias a https://datos.gob.mx/, podemos encontrar una gran cantidad de datos del gobierno en formato procesables. Esto ya es un gran paso. Sin embargo, no todos los conjuntos de datos cuentan con las variables ni el tamaño necesarios para realizar análisis interesantes. Asimismo, a veces la periodicidad de los datos o la actualización no es la más adecuada. Entonces, el panorama actual es que hemos puesto a disposición de la ciudadanía muchos datos; sin embargo, estos son inútiles para los y las analistas y científicas de datos.
                    </Typography>

                    <Typography paragraph>
                        Este escenario se debe en parte a que los datos de https://datos.gob.mx/ son alimentados por diferentes proveedores de datos, tales como la Secretaría de Hacienda y Crédito Público, Secretaría de Economía, Servicio de Administración Tributaria, entre otras. Cada uno tiene sus procesos de recolección, guardado, publicación y actualización. Los datos están moviéndose y cambiando constantemente.
                    </Typography>

                    <Typography paragraph>
                        Recordando que uno de los objetivos más importantes en la Plataforma Digital Nacional (PDN) es lograr estandarizar y volver interoperables los datos del gobierno, evaluar las calidad de los datos se vuelve crucial construir una política pública basada en datos.
                    </Typography>


                    <Typography variant="h5">¿Qué es la evaluación de la calidad de los datos ?</Typography>


                    <Typography paragraph>
                        La evaluación de la calidad de los datos (DQA, por sus siglas en inglés) es el evaluar metódica y estadísticamente los datos para determinar si cumplen con la calidad requerida por la aplicación de negocio. Esto implica, entre otras cosas, ver si los datos son del tipo y la cantidad adecuada para que puedan servir a un fin.
                    </Typography>
                    <Typography paragraph>
                        Evaluar la calidad de los conjuntos de datos nos servirá tanto a usuarios como al gobierno a:
                    </Typography>

                    <div style={{background: '#f2f2f2', padding: '10px', marginBottom: '25px'}}>
                        <ul className={classes.ul}>
                            <li className={classes.li}>
                                <Typography className={classes.sublist}>
                                    <span className={classes.bullet}/>  <b>Identificar</b> las áreas de oportunidad en la calidad de los datos;
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography className={classes.sublist}>
                                    <span className={classes.bullet}/>  Que las entidades generadoras de datos <b>entiendan cómo mejorar</b> la calidad calidad de los datos que generan;
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography className={classes.sublist}>
                                    <span className={classes.bullet}/>  <b>Mejorar</b> la calidad de los datos;
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography className={classes.sublist}>
                                    <span className={classes.bullet}/>  <b>Mejorar las prácticas</b> en general de generación de los datos de gobierno;
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography className={classes.sublist}>
                                    <span className={classes.bullet}/>  Que los usuarios de los datos <b>identifiquen</b> fácilmente los datos que tienen mayor calidad, e
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography className={classes.sublist}>
                                    <span className={classes.bullet}/>  <b>Incrementar la confianza</b> para construir productos de datos con los datos del gobierno.
                                </Typography>
                            </li>
                        </ul>
                    </div>


                    <Typography paragraph>
                        <b>Pasos para la evaluación de calidad de los datos Guía de Apertura Anticorrupción</b>
                    </Typography>



                </Grid>
            </Grid>
        </div>
    }

}

Metodologia.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Metodologia);
