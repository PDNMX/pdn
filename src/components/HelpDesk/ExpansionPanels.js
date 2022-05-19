import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import MuiExpansionPanel from '@mui/material/Accordion';
import MuiExpansionPanelSummary from '@mui/material/AccordionSummary';
import MuiExpansionPanelDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import MuiLink from "@mui/material/Link";
import {Link} from "react-router-dom";
import Diagrama from "../../assets/diagrama_comunicacion_v1.1.svg";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ButtonPDN from "../Compartidos/ButtonPDN";

const Accordion = withStyles(theme =>({
    root: {
        border: '1px solid' + theme.palette.background.opaque,
        boxShadow: 'none'
    },
    expanded: {},
}))(MuiExpansionPanel);

const AccordionSummary = withStyles(theme =>({
    root: {
        backgroundColor: theme.palette.background.opaque,
        /* borderBottom: '1px solid rgba(0, 0, 0, .125)', */
        /* marginBottom: -1, */
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
        color: theme.palette.text.main 
    },
    expandIconWrapper: {
        color: theme.palette.secundario.main,
    },
}))(MuiExpansionPanelSummary);

const AccordionDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        color: theme.palette.text.main,
        backgroundColor: theme.palette.background.opaque,
        border: '1px solid' + theme.palette.secundario.main,
    },
}))(MuiExpansionPanelDetails);


const useStyles = makeStyles( theme => ({
    link: {
        textDecoration: "none",
        color: theme.palette.text.linkColor,
        wordBreak: "break-all",
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
        }
    }
}));

export default function CustomizedExpansionPanels() {
    const [expanded, setExpanded] = React.useState('panel1');//'panel1');

    const handleChange = panel => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const classes = useStyles();

    return (
        <div>

            <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1d-content" id="panel1d-header">
                    <Typography variant="h6">¿Qué es la PDN?</Typography>
                </AccordionSummary>
                <AccordionDetails>

                    <div>
                        <Typography paragraph>
                            La PDN es una fuente de inteligencia para construir integridad y combatir la corrupción que creará valor para el gobierno y la sociedad a partir de grandes cantidades de datos.
                        </Typography>

                        <Typography paragraph>
                            Es un medio para el intercambio de datos anticorrupción del gobierno, que busca quitar barreras y romper silos de información para que los datos sean comparables, accesibles y utilizables.
                        </Typography>

                        <Typography paragraph>
                            El desarrollo de la PDN considera seis sistemas que contienen datos como: declaraciones patrimoniales de personas servidoras públicas de todo el país, información de contrataciones gubernamentales y los datos de quienes participan en estos procedimientos, así como información de particulares y personas servidoras públicas sancionadas por la comisión de faltas administrativas.
                        </Typography>

                        <Typography paragraph>
                            Es importante señalar que la PDN no es generadora ni un repositorio de datos, sino que es una plataforma de interoperabilidad que consulta información de diversas fuentes.
                        </Typography>

                        <ButtonPDN target="_blank" href='https://drive.google.com/file/d/1wdy8bgX9fn1yRCAWSJMhjeTYKxEOXRQv/view'>
                            ¿Qué es la PDN?
                        </ButtonPDN>

                        <ButtonPDN target="_blank" href="https://drive.google.com/file/d/1YbkcDrRoscIUJtEiyM55GCliHsW22TkK/view">
                            ¿Cómo se construye?
                        </ButtonPDN>

                        <ButtonPDN target="_blank" href="https://drive.google.com/file/d/1xYlY50lXttiuu0brV5CVd5H8qx96vDsK/view">
                            Guía desarrollo PDE
                        </ButtonPDN>

                        <ButtonPDN target="_blank" href="https://drive.google.com/file/d/1-IvF3KYa5rups73BmVV4W8glT9csVGY9/view">
                            Seguridad de la información
                        </ButtonPDN>
                    </div>


                </AccordionDetails>
            </Accordion>

            <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2d-content" id="panel2d-header">
                    <Typography variant="h6">Objetivos de la PDN</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <Typography>
                            Usar nuevas tecnologías y metodologías como apoyo al trabajo de las autoridades del Sistema Nacional Anticorrupción para:
                        </Typography>

                        <ul className={classes.ul}>
                            <li className={classes.li}><Typography display='inline'>
                                Analizar y alertar a las autoridades sobre riesgos de corrupción;
                            </Typography></li>
                            <li className={classes.li}><Typography display='inline'>
                                Automatizar procesos, evitar discrecionalidad y conflictos de interés;
                            </Typography></li>
                            <li className={classes.li}><Typography display='inline'>
                                Promover el uso de los datos para respaldar sanciones;
                            </Typography></li>
                            <li className={classes.li}><Typography display='inline'>
                                Dar seguimiento, en tiempo real, a los procesos y proyectos de contratación pública, y garantizar una mayor eficiencia en las compras públicas;
                            </Typography></li>
                            <li className={classes.li}><Typography display='inline'>
                                Fortalecer la participación ciudadana en el combate a la corrupción;
                            </Typography></li>
                            <li className={classes.li}><Typography display='inline'>
                                Incorporar información sobre indicadores para evaluar la Política Nacional Anticorrupción;
                            </Typography></li>
                            <li className={classes.li}><Typography display='inline'>
                                Dar evidencia para generar recomendaciones de política pública a las autoridades;
                            </Typography></li>
                        </ul>
                    </div>
                </AccordionDetails>
            </Accordion>

            <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3d-content" id="panel3d-header">
                    <Typography variant="h6">Marco normativo</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <Typography paragraph>
                            El marco normativo de la PDN está compuesto por:
                        </Typography>

                        <ol>
                            <li><Typography>
                                <MuiLink href="http://www.dof.gob.mx/nota_detalle.php?codigo=5445048&fecha=18/07/2016" target="_blank">
                                    Ley General del Sistema Nacional Anticorrupción (LGSNA)</MuiLink> artículos 9, fracciones XII, XIII y XVI; 17; 21, fracción VII, inciso b); 35, fracciones X y XI).
                            </Typography>
                            </li>
                            <li>
                                <Typography>
                                    <MuiLink href="https://www.diputados.gob.mx/LeyesBiblio/pdf/LGRA.pdf" target="_blank">
                                        Ley General de Responsabilidades Administrativas (LGRA)</MuiLink> artículos 26, 27, 30, 31, 34, 43, 44, 46, 59 y 93.
                                </Typography>
                            </li>
                            <li>
                                <Typography>
                                    <MuiLink href="https://www.dof.gob.mx/nota_detalle.php?codigo=5541802&fecha=23/10/2018" target="_blank">
                                        Bases para el Funcionamiento de la Plataforma Digital Nacional</MuiLink>, las cuales establecen las directrices para el funcionamiento de la PDN y de los sistemas que la conforman, buscando garantizar en todo momento la interoperabilidad, interconexión, estabilidad, uso y seguridad de la información.
                                </Typography>
                            </li>
                        </ol>

                    </div>
                </AccordionDetails>
            </Accordion>

            <Accordion square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4d-content" id="panel4d-header">
                    <Typography variant="h6">¿Qué hacen la SESNA y la USTPDN?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <Typography paragraph>
                            Conforme a lo establecido en la LGSNA, la PDN es administrada por la SESNA y lo hace a través de la Unidad de Servicios Tecnológicos y Plataforma Digital Nacional (USTPDN), la cual tiene a su cargo la evaluación, implementación, mantenimiento y actualización de los componentes informáticos de la PDN, además del desarrollo de proyectos estratégicos en materia de informática y tecnologías de la información, análisis de datos e inteligencia para el cumplimiento de los objetivos del Sistema Nacional Anticorrupción.
                        </Typography>
                    </div>
                </AccordionDetails>
            </Accordion>

            <Accordion square expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel5d-content" id="panel5d-header">
                    <Typography variant="h6">Sistemas Estatales Anticorrupción</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>

                        <Typography paragraph>
                            A nivel estatal, las Secretarías Ejecutivas de los Sistemas Locales Anticorrupción (SESLA) son las encargadas de recibir, ordenar o resguardar los datos e información para integrarlos a los sistemas de la PDN.
                        </Typography>

                        <Typography paragraph>
                            Bajo este entendido, de conformidad con lo establecido en el artículo 23 de las Bases para el Funcionamiento de la PDN, la SESNA se coordinará con las SESLA, a efecto de determinar su participación en la construcción de los sistemas de la PDN y la forma de interconexión que tendrán con cada uno de los sistemas a nivel local.
                        </Typography>

                        <Typography paragraph>
                            Con base en lo anterior,  las Secretarías Ejecutivas de los Sistemas Locales Anticorrupción, son las responsables de coordinar el trabajo a nivel local y de asegurar que sus sistemas cuenten con la información estandarizada para conectarse con la PDN.
                        </Typography>

                        <Typography paragraph>
                            Se sugiere realizar la interpretación y análisis acerca de la responsabilidad que la Ley del Sistema Local Anticorrupción u homóloga le confiere.
                        </Typography>


                        <Typography paragraph>
                            Asimismo, se recomienda revisar  las especificaciones técnicas y los diccionarios disponibles en la siguiente dirección:
                            <br/>
                            <Link className={classes.link} to='/especificaciones'>https://www.plataformadigitalnacional.org/especificaciones</Link>
                        </Typography>

                    </div>
                </AccordionDetails>
            </Accordion>

            <Accordion square expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel6d-content" id="panel6d-header">
                    <Typography variant="h6">Preguntas frecuentes </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>

                        <Typography variant="h6" paragraph>
                            ¿Cómo funciona la PDN?
                        </Typography>

                        <Typography paragraph>
                            El siguiente diagrama muestra la arquitectura y funcionalidades de la PDN:
                        </Typography>

                        <ol>
                            <li><Typography>Un usuario entra a la PDN y hace una búsqueda de información.</Typography></li>
                            <li><Typography>La PDN envía la solicitud de información usando parámetros de consulta a la API de la institución pública.</Typography></li>
                            <li><Typography>La API de la institución pública solicita a sus bases de datos la información.</Typography></li>
                            <li><Typography>En este punto de comunicación hay controles de autenticación de permisos, así como encriptación de datos que protegen el envío de la información solicitada desde la institución pública hasta la PDN.</Typography></li>
                        </ol>

                        <img alt="diagrama" src={Diagrama} className={classes.diagrama}/>

                        <Typography variant="h6" paragraph>¿Cómo se está construyendo la PDN?</Typography>

                        <Typography paragraph>
                            El equipo de la PDN cuenta con desarrolladores web, que hacen uso intensivo de las tecnologías de software más modernas y de código abierto.
                        </Typography>

                        <Typography paragraph>
                            Existen tres componentes técnicos clave que permiten el desarrollo de la PDN:
                        </Typography>

                        <ol>
                            <li><Typography>Uso de API´s que permiten la consulta de los datos desde la PDN a la institución pública. </Typography></li>
                            <li><Typography>Estándares técnicos de datos que permiten compartir información entre las instituciones públicas y la PDN de manera unificada y estandarizada. Hemos desarrollado tres estándares:</Typography></li>
                            <ul className={classes.ul}>
                                <li className={classes.li}>
                                    <Link to="/especificaciones/s1" className={classes.link}><Typography display='inline'>Declaraciones patrimoniales y de intereses,</Typography></Link>
                                </li>
                                <li className={classes.li}>
                                    <Link to="/especificaciones/s2" className={classes.link}><Typography display='inline'>Servidores públicos que intervienen en contrataciones públicas, y</Typography></Link>
                                </li>
                                <li className={classes.li}>
                                    <Link to="/especificaciones/s3" className={classes.link}><Typography display='inline'>Servidores públicos y particulares sancionados</Typography></Link>
                                </li>
                            </ul>
                            <li><Typography>Tecnologías y servicios de software modernos y de código abierto. Las tecnologías que usamos son las siguientes:</Typography></li>
                        </ol>


                        <ul className={classes.ul}>
                            <li className={classes.li}>
                                <Typography paragraph display='inline'>
                                    <b>Contenedores</b> <br/>
                                    Uso: Puesta en marcha y distribución de actualizaciones <br/>
                                    Tecnología: Docker, Kubernetes
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography paragraph display='inline'>
                                    <b>Analíticos</b><br/>
                                    Uso: Inteligencia de datos<br/>
                                    Tecnología: Python
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography paragraph display='inline'>
                                    <b>Backend</b><br/>
                                    Uso: Lógica de negocio de la PDN<br/>
                                    Tecnología: Python, Node.js, express.js  y Graphql
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography paragraph display='inline'>
                                    <b>Base de Datos</b><br/>
                                    Uso: Tecnología de almacenamiento <br/>
                                    Tecnología: PostgreSQL y MongoDB
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography paragraph display='inline'>
                                    <b>FrontEnd</b><br/>
                                    Uso: Desarrollo de interfaz de usuario<br/>
                                    Tecnología: React.js Material UI
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography paragraph display='inline'>
                                    <b>Seguridad</b><br/>
                                    Uso: Autorización<br/>
                                    Tecnología: OAuth 2.0
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography paragraph display='inline'>
                                    <b>Testing</b><br/>
                                    Uso: Pruebas de software<br/>
                                    Tecnología: Jestjs
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography paragraph display='inline'>
                                    <b>Continous integration</b><br/>
                                    Uso: Integración continua<br/>
                                    Tecnología: TravisCI
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography paragraph display='inline'>
                                    <b>Servicios web</b><br/>
                                    Uso: Comunicación con instituciones<br/>
                                    Tecnología: Web APIs (REST y GrapQL)
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography paragraph display='inline'>
                                    <b>Estándares de datos</b><br/>
                                    Uso: Estandarización de información<br/>
                                    Tecnología: Open API Specification y GraphQL
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography paragraph display='inline'>
                                    <b>Control de versiones</b><br/>
                                    Uso: Repositorios de código y control de versiones<br/>
                                    Tecnología: Git
                                </Typography>
                            </li>
                        </ul>

                        <Typography paragraph variant="h6">
                            ¿Qué es la interoperabilidad?
                        </Typography>

                        <Typography paragraph>
                            Es la posibilidad que tiene un sistema de obtener o transferir información con otros sistemas. Para lograr la interoperabilidad, es necesario estandarizar los datos y ponerlos en un formato común.
                        </Typography>

                        <Typography paragraph variant="h6">
                            ¿Qué es un estándar de datos?
                        </Typography>
                        <Typography paragraph>
                            Son las reglas y características con las que debe de contar un conjunto de datos, como: tipo de dato (i.e., numérico, entero, caracter, cadena), longitud, número de veces que aparece, precisión, etc.
                        </Typography>

                        <Typography variant="h6">
                            ¿Qué es una API?
                        </Typography>
                        <Typography paragraph>
                            Una API (<i>‘Application Programming Interface’</i> en inglés) es un conjunto de reglas que las aplicaciones deben seguir para comunicarse entre ellas, sirviendo de interfaz de comunicación entre componentes de software. El uso de API´s tiene el objetivo de permitir la comunicación entre la PDN y los sistemas de información de las instituciones públicas.
                        </Typography>

                        <Typography variant="h6" paragraph>
                            ¿La Secretaría Ejecutiva del Sistema Nacional Anticorrupción establecerá cómo desarrollar las Plataformas Estatales?
                        </Typography>

                        <Typography paragraph>
                            La facultad de diseñar y desarrollar las Plataformas estatales es de cada entidad, sin embargo, se debe cumplir con lo establecido en las Bases para el Funcionamiento de la Plataforma Digital Nacional, aprobadas por el Comité Coordinador del Sistema Nacional Anticorrupción, así como con las <Link to="/especificaciones" className={classes.link}>especificaciones técnicas</Link> para cada Sistema.
                        </Typography>

                        <Typography paragraph>
                            Las Bases estipulan que la Secretaría Ejecutiva emitirá los protocolos, estándares, reglamentos, especificaciones técnicas y cualquier normativa necesaria para la colaboración y provisión de datos.
                        </Typography>

                        <Typography paragraph>
                            En el siguiente enlace, encontrarás una presentación que describe nuestra visión sobre el desarrollo tecnológico de las Plataformas y Sistemas Estatales.
                        </Typography>

                        <ButtonPDN target="_blank" href="https://drive.google.com/file/d/1xYlY50lXttiuu0brV5CVd5H8qx96vDsK/view">
                            Guía desarrollo PDE
                        </ButtonPDN>

                        {/*
                        <Typography variant="h6" paragraph>
                            ¿Las Plataformas Digitales van a operar ahora sistemas como CompraNet o Declaranet?
                        </Typography>
                        <Typography paragraph>
                            No. Las Plataformas serán una herramienta de interoperabilidad que a través de las estandarización de la información serán capaces de consultar los datos que contienen sistemas como CompraNet o Declaranet.
                        </Typography>

                        <Typography paragraph>
                            La generación de los datos desde sistemas como CompraNet o Declaranet  seguirá siendo responsabilidad de los entes que tienen la atribución actualmente.
                        </Typography>
                        */}

                        <Typography paragraph variant="h6">
                            ¿Qué papel juegan las entidades federativas?
                        </Typography>

                        <Typography>
                            Cada entidad federativa debe contar con su propio Sistema Local Anticorrupción y su propia ley que motive la conexión de sus datos con la PDN. Es necesario que las secretarías ejecutivas establezcan canales de comunicación con las áreas encargadas del control interno y con las autoridades locales competentes en el combate a la corrupción para desarrollar sistemas de información o plataformas estatales de interoperabilidad.
                        </Typography>


                        <Typography paragraph variant="h6">
                            ¿Cuándo entraron en vigor los formatos para las declaraciones patrimoniales y de intereses?
                        </Typography>

                        <Typography paragraph>
                            El 7 de agosto de 2019, el Comité Coordinador del Sistema Nacional Anticorrupción aprobó por unanimidad el Acuerdo por el que se modifican los anexos Primero y Segundo del Acuerdo por el que el Comité Coordinador del Sistema Nacional Anticorrupción emite el formato de declaraciones: De Situación Patrimonial y De Intereses; y expide las normas e instructivo para su llenado y presentación.
                        </Typography>

                        <Typography paragraph>
                            Derivado de lo anterior, dichos formatos empezaron a usarse a partir del 1 de enero de 2020.
                        </Typography>

                        <Typography paragraph variant="h6">
                            ¿Cómo se va a trabajar en la seguridad e integridad de los datos?
                        </Typography>
                        <Typography paragraph>
                            Para conocer más detalles sobre la seguridad de la información de la PDN, visita el <MuiLink target="_blank"
                                                                                                                         className={classes.link}
                                                                                                                         href="https://drive.google.com/file/d/1-IvF3KYa5rups73BmVV4W8glT9csVGY9/view?usp=sharing">
                            documento de Seguridad informática</MuiLink>.
                        </Typography>

                        <Typography variant="h6" paragraph>
                            ¿La PDN va a generar información?
                        </Typography>
                        <Typography paragraph>
                            No. El objetivo de la PDN es generar interoperabilidad entre los datos que  generan los sujetos obligados  y es una herramienta de consulta.
                        </Typography>

                        <Typography variant="h6" paragraph>
                            ¿La PDN almacenará los datos generados por las instituciones?
                        </Typography>
                        <Typography paragraph>
                            No, ya que la PDN es una plataforma de consulta, los generadores de la información siguen siendo responsables de  los datos que generan.
                        </Typography>

                        <Typography variant="h6" paragraph>
                            ¿Se van a compartir los datos reservados o personales?
                        </Typography>
                        <Typography paragraph>

                            No. Los estándares de datos que serán publicados por la SESNA permiten el control institucional para la consulta de datos reservados o personales.

                        </Typography>
                        <Typography paragraph>
                            De acuerdo con lo señalado en la Ley General del Sistema Nacional Anticorrupción, el Comité Coordinador del SNA, es  responsable  de aprobar el catálogo de perfiles de funcionarios que podrán acceder  a los datos reservados.
                        </Typography>

                        <Typography variant="h6" paragraph>
                            ¿Quién podrá acceder a la PDN?
                        </Typography>
                        <Typography paragraph>
                            Se dará acceso a los datos de carácter público a la ciudadanía en general, de conformidad con lo establecido en  la Ley General de Transparencia y Acceso a la Información Pública.
                        </Typography>
                        <Typography>
                            En cuanto a los datos reservados o confidenciales el Comité Coordinador del SNA tiene la responsabilidad de aprobar el catálogo de perfiles y funcionarios que podrán acceder a los datos reservados.
                        </Typography>

                    </div>
                </AccordionDetails>
            </Accordion>

            <Accordion square expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel7d-content" id="panel7d-header">
                    <Typography variant="h6">Protocolo de conexión</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <Typography paragraph>
                            La Plataforma Digital Nacional (PDN) basa su funcionamiento en el uso de APIs, por medio de las cuales, se comunica con sus proveedores de información para obtener exclusivamente los datos necesarios.
                        </Typography>

                        <Typography paragraph>
                            Las Instituciones públicas interesadas en ser proveedores de información de la PDN deben establecer sus APIs de acuerdo con las <Link to="/especificaciones" className={classes.link}>Especificaciones técnicas</Link> para cada Sistema y solicitar a la USTPDN, el inicio del proceso de conexión con la PDN a través del envío del <MuiLink href="https://drive.google.com/file/d/1ANQG3f1Q7aO4soQR9__2FvHEi_-UwvBe/view" target="_blank" className={classes.link}>Formato de solicitud de conexión</MuiLink> a través del correo pdn@sesna.gob.mx.
                        </Typography>

                        <Typography paragraph>
                            Asimismo, el proceso de conexión con la PDN contempla un protocolo para verificar el funcionamiento de las APIs, mismo que consiste en la ejecución de conjuntos de pruebas para cada Sistema de la PDN. Cada conjunto de pruebas se divide a su vez en tres categorías:
                        </Typography>
                        <ul>
                            <li>Pruebas de seguridad;</li>
                            <li>Pruebas funcionales; y</li>
                            <li>Pruebas de estrés.</li>
                        </ul>

                        <Typography paragraph>
                            Estas pruebas se ejecutan en dos ambientes: 1) desarrollo y 2) productivo. En cada uno de ellos, se verifica el funcionamiento de la API, usando datos sintéticos (falsos) y reales (omitiendo datos reservados) de manera correspondiente.
                        </Typography>

                        <Typography>
                            Las pruebas para la verificación de las APIs, se encuentran descritas en documentos denominados Planes de pruebas, que podrás encontrar en la sección de Especificaciones de cada uno de los Sistemas de la PDN.
                        </Typography>

                        <Typography paragraph>
                            En caso de que los resultados no sean aprobatorios, se notificará a la institución para que realice los ajustes necesarios y solicite una nueva revisión.
                        </Typography>

                        <Typography paragraph>
                            Como apoyo para la verificar el cumplimiento de los esquemas de datos de las diferentes API 's, ponemos a su disposición un <Link to="/validador" className={classes.link}>Validador</Link>.
                        </Typography>

                        <Typography>
                            Asimismo, te invitamos a probar <MuiLink href="https://www.plataformadigitalnacional.org/validapi/" target="_blank" className={classes.link}>ValidAPI</MuiLink> una aplicación web que te permitirá ejecutar de manera automatizada las validaciones de seguridad y de funcionalidad incluidas en los planes de pruebas de los sistemas 1, 2 y 3; recibiendo retroalimentación de una forma rápida. Esta herramienta se encuentra en una etapa de pilotaje, por lo que el resultado obtenido  debe considerarse una prevalidación y no como un resultado final.
                        </Typography>
                    </div>
                </AccordionDetails>
            </Accordion>

            <Accordion square expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel8d-content" id="panel8d-header">
                    <Typography variant="h6">Sistema de declaración patrimonial y de intereses</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <Typography paragraph>
                            Haz click en el botón que aparece a continuación para visualizar un documento que <b>contienene información relevante para</b> las personas
                            servidoras públicas encargados de desarrollar la <b>interconexión de los sistemas de declaraciones</b> con la
                            Plataforma Digital Nacional.
                        </Typography>

                        <ButtonPDN target="_blank" href="https://drive.google.com/file/d/1wHQpaFdP5An8V4Vhnjj1a4GBbYIREMHo/view?usp=sharing">
                            Más información
                        </ButtonPDN>
                    </div>
                </AccordionDetails>
            </Accordion>


            <Accordion square expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel9d-content" id="panel9d-header">
                    <Typography variant="h6">Manual de usuario</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <Typography paragraph>
                            Conoce a detalle las secciones y funcionalidades de la PDN a través del Manual de usuario.
                        </Typography>
                        <ButtonPDN
                            href='https://drive.google.com/file/d/1Fc0bg22fMoBXXxnihUCZBpnM77Je9Wap/view?usp=sharing'
                            target='_blank'>
                            Manual de usuario
                        </ButtonPDN>
                    </div>
                </AccordionDetails>
            </Accordion>

            <Accordion square expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel10d-content" id="panel10d-header">
                    <Typography variant="h6">Contáctanos</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <Typography paragraph>
                            Escríbenos si tienes dudas sobre la construcción de la PDN al correo:
                        </Typography>
                        <Typography>
                            <MuiLink className={classes.link} component='a' href="mailto:pdn@sesna.gob.mx">
                                pdn@sesna.gob.mx
                            </MuiLink>
                        </Typography>
                    </div>
                </AccordionDetails>
            </Accordion>

        </div>
    );
}
