import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
//import Grid from "@material-ui/core/Grid";
import MuiLink from "@material-ui/core/Link";
//import {Link} from "react-router-dom";
//import Icon from '@material-ui/core/Icon';
import Pasos from "../../../assets/pasos_evaluación.png";
import Pipeline from "../../../assets/DQ_pipeline_analy.png";
import DataImpact from "../../../assets/data_impact.png";

const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiExpansionPanelDetails);



const useStyles = makeStyles( theme => ({
    link: {
        textDecoration: "none",
        color: theme.palette.primary.dark,
        wordBreak: "break-all"
    },
    pipeline:{
        maxWidth: '95%'
    },
    pasos:{
        maxWidth: '90%'
    },
    impacto:{
        maxWidth: '90%'
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
        //paddingLeft: '20px'
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
        //paddingBottom: theme.spacing(2)
    },
    sublist: {
        display: 'inline',
        color: '#606060',
        fontSize: '0.975rem',
    },
}));


export default function CustomizedExpansionPanels() {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = panel => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const classes = useStyles();

    return (
        <div>
            <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>Motivación</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>


                        <Typography paragraph>
                            Uno de los retos más grandes para quienes usan datos del gobierno es la diversidad formatos, tipos y tamaño. Por un lado, la búsqueda de conjuntos de datos resulta compleja. Por otro, los formatos predeterminados dificultan el procesamiento. Asimismo, existe la posibilidad de que los conjuntos de datos no hayan sido actualizados y periodos de información se hayan extraviado.
                        </Typography>

                        <Typography paragraph>
                            En el gobierno se han  dado importantes logros en tecnología y datos. Gracias a <MuiLink component="a" href=" https://datos.gob.mx/">https://datos.gob.mx/</MuiLink>, podemos encontrar una gran cantidad de datos del gobierno en formato procesables. Esto ya es un gran paso. Sin embargo, no todos los conjuntos de datos cuentan con las variables ni el tamaño necesarios para realizar análisis interesantes. Asimismo, a veces la periodicidad de los datos o la actualización no es la más adecuada. Entonces, el panorama actual es que hemos puesto a disposición de la ciudadanía muchos datos; sin embargo, estos son inútiles para los y las analistas y científicas de datos.
                        </Typography>
                        <Typography paragraph>
                            Este escenario se debe en parte a que los datos de https://datos.gob.mx/ son alimentados por diferentes proveedores de datos, tales como la Secretaría de Hacienda y Crédito Público, Secretaría de Economía, Servicio de Administración Tributaria, entre otras. Cada uno tiene sus procesos de recolección, guardado, publicación y actualización. Los datos están moviéndose y cambiando constantemente. Las bases de datos y sistemas de intercambio de información se rediseñan y se actualizan.
                        </Typography>
                        <Typography paragraph>
                            El resultado típico de esta dinámica es que los sistemas de información se vuelven mejores con el tiempo, pero la calidad de los datos se deteriora [1]. Sin embargo, lo que determina el valor intrínseco de los datos es su calidad; la tecnología y los sistemas de información sólo son magnificadores y expositores de este valor [1]. Entonces, una calidad alta de los datos combinada con tecnología eficiente es un gran activo, con un potencial alto de hacer impacto, pero una calidad baja de los datos combinada con tecnología baja, no solo es un activo de poco valor, sino que se convierte en un esfuerzo poco útil. Para lograr una posibilidad alta de impacto con datos es necesario tener tecnología y sistemas de información eficientes y además alta calidad de datos.
                        </Typography>

                        <img src={DataImpact} alt="Impacto" className={classes.impacto}/>

                        <Typography paragraph>
                            Recordando que uno de los objetivos más importantes en la Plataforma Digital Nacional (PDN) es lograr estandarizar y volver interoperables los datos del gobierno, evaluar las calidad de los datos se vuelve crucial construir una política pública basada en datos.
                        </Typography>

                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography>¿Qué es la evaluación de la calidad de los datos?</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>

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
                                         <b>Identificar</b> las áreas de oportunidad en la calidad de los datos;
                                    </Typography>
                                </li>
                                <li className={classes.li}>
                                    <Typography className={classes.sublist}>
                                       Que las entidades generadoras de datos <b>entiendan cómo mejorar</b> la calidad calidad de los datos que generan;
                                    </Typography>
                                </li>
                                <li className={classes.li}>
                                    <Typography className={classes.sublist}>
                                         <b>Mejorar</b> la calidad de los datos;
                                    </Typography>
                                </li>
                                <li className={classes.li}>
                                    <Typography className={classes.sublist}>
                                        <b>Mejorar las prácticas</b> en general de generación de los datos de gobierno;
                                    </Typography>
                                </li>
                                <li className={classes.li}>
                                    <Typography className={classes.sublist}>
                                       Que los usuarios de los datos <b>identifiquen</b> fácilmente los datos que tienen mayor calidad, e
                                    </Typography>
                                </li>
                                <li className={classes.li}>
                                    <Typography className={classes.sublist}>
                                       <b>Incrementar la confianza</b> para construir productos de datos con los datos del gobierno.
                                    </Typography>
                                </li>
                            </ul>
                        </div>


                        <Typography paragraph>

                            Proponemos la siguiente estrategia para evaluar la calidad de los datos de la Guía Anticorrupción:
                        </Typography>


                        <img src={Pasos} alt="Pasos" className={classes.pasos}/>



                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>


            <ExpansionPanel square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <ExpansionPanelSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography>Propuesta de métricas de calidad</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                        <Typography>
                            Para la propuesta de métricas se tomaron como punto de partida las siguientes fuentes:
                        </Typography>
                        <ol>
                            <li>
                                <Typography>
                                    El <MuiLink component="a" href="https://opendatacharter.net/">Open Data Charter</MuiLink> y el <MuiLink component="a" href="https://www.iadb.org/es/acerca-del-bid/quienes-somos">Banco Interamericano de Desarrollo</MuiLink>, a través de su <MuiLink component="a" href="https://open-data-charter.gitbook.io/open-up-guide-using-open-data-to-combat-corruption/">“Open Up Guide: Using Open Data to Combat Corruption”</MuiLink> y su ejemplo en México, “Open Up Guide: Testing how to use open data to combat corruption in Mexico”, la cual a su vez sirvió para publicar la <MuiLink component='a' href="https://docs.google.com/document/d/182USj4La896XgMZ-LTw7A3HYbA5i7aP0p2JLBL8a-24/edit#heading=h.9vgybo4y3gv2">Guía de apertura Anticorrupción.</MuiLink>
                                </Typography>
                            </li>

                            <li>
                                <Typography>
                                    <MuiLink component="a" href="https://ckan.org/">CKAN</MuiLink>, la plataforma líder de datos Open Source data, a través de un <MuiLink component="a" href="https://ckan.org/2011/01/20/data-quality-what-is-it/">estudio</MuiLink> que hicieron sobre la calidad de los datos en su plataforma
                                </Typography>
                            </li>

                            <li>
                                <Typography>
                                    USAID, la Agencia de los Estados Unidos para el Desarrollo Internacional, a través de su taller de <MuiLink component='a' href="https://www.usaid.gov/sites/default/files/documents/1861/DQA_Training_and_Preparation_11-17-14.ppt">Data Quality Assessment</MuiLink> y del <MuiLink component='a' href="https://www.usaid.gov/sites/default/files/documents/1868/597sad.pdf">checklist</MuiLink>
                                </Typography>
                            </li>

                            <li>
                                <Typography>
                                El Massachusetts Institute of Technology a través de un <MuiLink component='a' href="http://web.mit.edu/tdqm/www/tdqmpub/PipinoLeeWangCACMApr02.pdf">artículo académico sobre Data Quality</MuiLink>
                                </Typography>
                            </li>
                        </ol>


                        <Typography paragraph>
                            Las métricas de calidad de los datos toman en consideración:
                        </Typography>
                        <ul className={classes.ul}>
                            <li className={classes.li}><Typography display='inline'>La disponibilidad de los datos;</Typography></li>
                            <li className={classes.li}><Typography display='inline'>Sus procesos de recolección y actualización, y</Typography></li>
                            <li className={classes.li}><Typography display='inline'>Sus formatos</Typography></li>
                        </ul>

                        <Typography paragraph>
                        Se adaptaron estas ideas al contexto y datos de México y se propusieron varios rubros de evaluación.
                        </Typography>

                        <Typography paragraph>
                        Es importante mencionar que ninguna de las fuentes consultadas hace mención de la calidad analítica de los datos, es decir, qué tan útiles son los datos para poder hacer análisis estadísticos y modelos matemáticos. Este punto es clave porque aunque un conjunto de datos esté disponible para su descarga en línea en formatos abiertos y provenga de una fuente confiable, puede no ser útil para hacer análisis si no tiene variables relevantes, es muy pequeño, o se actualiza con poca frecuencia. Entonces, decidimos agregar un rubro de evaluación que se refiriera a qué tan relevante es el conjunto de datos en términos analíticos.
                        </Typography>



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

                        <ul className={classes.ul}>
                            <li className={classes.li}><Typography display='inline'>Pueda descargarse desde un sitio público del gobierno;</Typography></li>
                            <li className={classes.li}><Typography display='inline'>Pueda encontrarse fácilmente;</Typography></li>
                            <li className={classes.li}><Typography display='inline'>Cuenten con un respaldo en un sitio independiente;</Typography></li>
                        </ul>

                        <Typography className={classes.ul}>
                            <b>2. Integridad:</b>
                        </Typography>
                        <ul className={classes.ul}>
                            <li className={classes.li}><Typography display='inline'>Se encuentre guardado en un sitio seguro;</Typography></li>
                            <li className={classes.li}><Typography display='inline'>Que existan mecanismos de seguridad para controlar los cambios de a los datos;</Typography></li>
                        </ul>

                        <Typography>
                            <b>3. Validez y confiabilidad:</b>
                        </Typography>
                        <ul className={classes.ul}>
                            <li className={classes.li}><Typography display='inline'>Provenga de fuentes confiables;</Typography></li>
                            <li className={classes.li}><Typography display='inline'>Que no existan registros en blanco o errores en los registros;</Typography></li>
                        </ul>

                        <Typography>
                            <b>4. Procesabilidad:</b>
                        </Typography>
                        <ul className={classes.ul}>
                            <li className={classes.li}><Typography display='inline'>Esté en formato de datos legible por computadora (.csv, .json, etc);</Typography></li>
                            <li className={classes.li}><Typography display='inline'>Se encuentre en formato no propietario;</Typography></li>
                            <li className={classes.li}><Typography display='inline'>Pueda bajarse en bulk;</Typography></li>
                        </ul>

                        <Typography>
                            <b>5. Relevancia analítica:</b>
                        </Typography>
                        <ul className={classes.ul}>
                            <li className={classes.li}><Typography display='inline'>Que haya suficientes observaciones para realizar análisis y modelos;</Typography></li>
                            <li className={classes.li}><Typography display='inline'>Que el conjunto de datos contenga variables suficientes para medir lo que se supone deben medir;</Typography></li>
                            <li className={classes.li}><Typography display='inline'>Que el conjunto de datos esté actualizado;</Typography></li>
                        </ul>

                        <Typography>
                            <b>5.1 Consistencia:</b>
                        </Typography>
                        <ul className={classes.ul}>
                            <li className={classes.li}><Typography display='inline'>Que las variables estén codificadas adecuadamente (que no tengan espacios, ni los nombres sean demasiado largos)</Typography></li>
                        </ul>
                        <Typography><b>5.2 Completitud:</b></Typography>
                        <ul className={classes.ul}>
                            <li className={classes.li}><Typography display='inline'>Que los datos faltantes estén marcados, y</Typography></li>
                            <li className={classes.li}><Typography display='inline'>Calidad del diccionario de datos (0 no tiene, 5 sí tiene pero es mejorable, 10 diccionario de buena calidad)</Typography></li>
                        </ul>

                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>



            <ExpansionPanel square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <ExpansionPanelSummary aria-controls="panel4d-content" id="panel4d-header">
                    <Typography>Evaluación</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                        <Typography paragraph>
                            La calidad de cada conjunto de datos fue evaluada usando los rubros anteriormente mencionados. La evaluación detallada de los conjuntos de datos de la Guía puede encontrarse <MuiLink component="a" href="https://docs.google.com/spreadsheets/d/1UwhIH1Q2-boZXvyLnyJInTv8lB_4uVWf_klsJpN4Qdk/edit#gid=1228884255"> aquí </MuiLink>.
                        </Typography>


                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>



            <ExpansionPanel square expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <ExpansionPanelSummary aria-controls="panel5d-content" id="panel5d-header">
                    <Typography>Hallazgos y recomendaciones</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                        <Typography paragraph>
                            Estaremos publicando próximamente el análisis realizado y los siguientes pasos. Actualmente nos encontramos notificando a las instituciones el estatus de sus datos.
                        </Typography>

                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>


            <ExpansionPanel square expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                <ExpansionPanelSummary aria-controls="panel6d-content" id="panel6d-header">
                    <Typography>Referencias</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>

                        <ul className={classes.ul}>
                            <li><Typography style={{wordBreak: "break-all"}}>1. Maydanchik, Arkady. Data quality assessment. Technics publications, 2007.</Typography></li>
                            <li><Typography style={{wordBreak: "break-all"}}>2. https://www.techopedia.com/definition/30610/data-quality-assessment-dqauot</Typography></li>
                            <li><Typography style={{wordBreak: "break-all"}}>3. http://web.mit.edu/tdqm/www/tdqmpub/PipinoLeeWangCACMApr02.pdf</Typography></li>
                            <li><Typography style={{wordBreak: "break-all"}}>4. https://ckan.org/2011/01/20/data-quality-what-is-it/</Typography></li>
                            <li><Typography style={{wordBreak: "break-all"}}>5. https://www.usaid.gov/sites/default/files/documents/1861/DQA_Training_and_Preparation_11-17-14.ppt</Typography></li>
                            <li><Typography style={{wordBreak: "break-all"}}>6. https://www.usaid.gov/sites/default/files/documents/1868/597sad.pdf</Typography></li>
                        </ul>


                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}
