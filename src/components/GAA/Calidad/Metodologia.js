import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Header from "./Header/Header";
import Grid from '@material-ui/core/Grid';
import {Typography} from "@material-ui/core"
import PropTypes from 'prop-types';
import Pipeline from '../../../assets/DQ_pipeline_analy.png';
import Pasos from '../../../assets/pasos_evaluación.png';
import Footer from "../../Home/Footer";
//import CandlestickExample from "../../candlestick/candlestick-example";

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
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1)
    },
    sublist: {
        color: '#606060',
        fontSize: '0.975rem',
    },
    pipeline:{
        maxWidth: '95%'
    },
    pasos:{
        maxWidth: '90%'
    }
});

class Metodologia extends React.Component{

    render (){

        const {classes} = this.props;
        return <div className={classes.root}>
            <Header/>

            <Grid container spacing={0} className={classes.container} justify="center">

                <Grid item xs={12} className={classes.item}>

                    <Typography variant="h5" paragraph>Motivación</Typography>


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


                    <Typography variant="h5" paragraph>¿Qué es la evaluación de la calidad de los datos?</Typography>


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

                    <img src={Pasos} alt="Pasos" className={classes.pasos}/>


                    <Typography variant="h5" paragraph>Propuesta de métricas de calidad</Typography>
                    <Typography paragraph>
                        Las métricas de calidad de los datos toman en consideración:
                    </Typography>
                    <ul>
                        <li><Typography>La disponibilidad de los datos;</Typography></li>
                        <li><Typography>Sus procesos de recolección y actualización, y</Typography></li>
                        <li><Typography>Sus formatos</Typography></li>

                    </ul>

                    <Typography paragraph>
                        El proceso para la evaluación de los datos que proponemos está alineado a la forma natural del ciclo de vida de los datos: desde su origen hasta su aprovechamiento analítico. Este  proceso está compuesto por los siguientes rubros:
                    </Typography>

                    <ul className={classes.ul}>
                        <li><Typography>1. Disponibilidad;</Typography></li>
                        <li><Typography>2. Integridad;</Typography></li>
                        <li><Typography>3. Validez y confiabilidad</Typography></li>
                        <li><Typography>4. Procesabilidad, y</Typography></li>
                        <li><Typography>5. Relevancia Analítica.</Typography></li>
                    </ul>

                    <img src={Pipeline} alt="Evaluación" className={classes.pipeline}/>

                    <Typography paragraph>
                        A continuación se enlistan las características que serán evaluadas en cada rubro. Cada concepto se calificará con 1 si es satisfactorio o 0 en el caso contrario (en algunos es posible tener el valor de 0.5). Las características marcadas en azul son relevantes pero se necesita el apoyo de la entidad para poder evaluarlas.
                    </Typography>

                    <Typography paragraph>
                        Que el conjunto de datos:
                    </Typography>


                    <Typography>
                        <b>1. Disponibilidad:</b>
                    </Typography>

                    <ul>
                        <li><Typography>Pueda descargarse desde un sitio público del gobierno;</Typography></li>
                        <li><Typography>Pueda encontrarse fácilmente;</Typography></li>
                        <li><Typography>Cuenten con un respaldo en un sitio independiente;</Typography></li>
                    </ul>

                    <Typography>
                        <b>2. Integridad:</b>
                    </Typography>
                    <ul>
                        <li><Typography>Se encuentre guardado en un sitio seguro;</Typography></li>
                        <li><Typography>Que existan mecanismos de seguridad para controlar los cambios de a los datos;</Typography></li>
                    </ul>

                    <Typography>
                        <b>3. Validez y confiabilidad:</b>
                    </Typography>
                    <ul>
                        <li><Typography>Provenga de fuentes confiables;</Typography></li>
                        <li><Typography>Que no existan registros en blanco o errores en los registros;</Typography></li>
                        <li><Typography>Que las personas recolectoras están calificadas y sean supervisadas;</Typography></li>
                        <li><Typography>Que existan procedimientos para la recolección, revisión, publicación y actualización periódica de los datos y que estos sean documentados;</Typography></li>
                    </ul>

                    <Typography>
                        <b>4. Procesabilidad:</b>
                    </Typography>
                    <ul>
                        <li><Typography>Esté en formato de datos legible por computadora (.csv, .json, etc);</Typography></li>
                        <li><Typography>Se encuentre en formato no propietario;</Typography></li>
                        <li><Typography>Pueda bajarse en bulk;</Typography></li>
                    </ul>

                    <Typography>
                        <b>5. Relevancia analítica:</b>
                    </Typography>
                    <ul>
                        <li><Typography>Que haya un número considerable de observaciones;</Typography></li>
                        <li><Typography>Que el conjunto de datos contengan variables suficientes para medir lo que se supone deben medir;</Typography></li>
                        <li><Typography>Que el conjunto de datos esté actualizados;</Typography></li>
                    </ul>
                    <Typography>
                        <b>5.1 Consistencia:</b>
                    </Typography>
                    <ul>
                        <li><Typography>Que las variables estén codificadas adecuadamente;</Typography></li>
                    </ul>
                    <Typography><b>5.2 Completitud:</b></Typography>
                    <ul>
                        <li><Typography>Que los datos faltantes estén marcados, y</Typography></li>
                        <li><Typography>Calidad del diccionario de datos (0 no tiene, 5 sí tiene pero es mejorable, 10 diccionario de buena calidad)</Typography></li>
                    </ul>


                    <Typography variant="h5" paragraph> Evaluación </Typography>
                    <Typography paragraph>
                        La calidad de cada conjunto de datos fue evaluada usando los rubros anteriormente mencionados. La evaluación detallada de los conjuntos de datos de la Guía puede encontrarse aquí.
                    </Typography>

                    <Typography variant="h5" paragraph> Hallazgos y recomendaciones</Typography>

                    <Typography paragraph>
                        Estaremos publicando próximamente el análisis realizado y los siguientes pasos. Actualmente nos encontramos notificando a las instituciones el estatus de sus datos.
                    </Typography>

                    <Typography variant="h5" paragraph> Fuentes:</Typography>

                    <ul className={classes.ul}>
                        <li><Typography style={{wordBreak: "break-all"}}>1. Maydanchik, Arkady. Data quality assessment. Technics publications, 2007.</Typography></li>
                        <li><Typography style={{wordBreak: "break-all"}}>2. https://www.techopedia.com/definition/30610/data-quality-assessment-dqauot</Typography></li>
                        <li><Typography style={{wordBreak: "break-all"}}>3. http://web.mit.edu/tdqm/www/tdqmpub/PipinoLeeWangCACMApr02.pdf</Typography></li>
                        <li><Typography style={{wordBreak: "break-all"}}>4. https://ckan.org/2011/01/20/data-quality-what-is-it/</Typography></li>
                        <li><Typography style={{wordBreak: "break-all"}}>5. https://www.usaid.gov/sites/default/files/documents/1861/DQA_Training_and_Preparation_11-17-14.ppt</Typography></li>
                        <li><Typography style={{wordBreak: "break-all"}}>6. https://www.usaid.gov/sites/default/files/documents/1868/597sad.pdf</Typography></li>
                    </ul>


                </Grid>
            </Grid>
            <Footer/>
        </div>
    }

}

Metodologia.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Metodologia);
