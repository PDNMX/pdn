import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import MuiLink from "@material-ui/core/Link";
import {Link} from "react-router-dom";
import Diagrama from "../../assets/Diagrama_de_comunicacion_API.svg";
import Icon from '@material-ui/core/Icon';

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
    }
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
                    <Typography>¿Qué es la PDN?</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>


                    <div>



                        <Typography paragraph>
                            Una fuente de inteligencia para construir integridad y combatir la corrupción que creará valor para el gobierno y la sociedad a partir de grandes cantidades de datos.
                        </Typography>

                        <Typography paragraph>
                            Un medio para el intercambio de datos anticorrupción del gobierno, que busca quitar barreras y romper silos de información para que los datos sean comparables, accesibles y utilizables.
                        </Typography>

                        <Typography paragraph>
                            El desarrollo de la PDN considera seis sistemas que contienen datos estratégicos para la lucha contra la corrupción, <b>contemplados en la Ley General del Sistema Nacional Anticorrupción (LGSNA):</b>
                        </Typography>

                        <Grid container spacing={0}>
                            <Grid item xs={12} md={12} lg={6} xl={6}>
                                <ul>
                                    <li><Typography>Sistema 1 | Declaraciones patrimonial,  de intereses y constancia de declaración fiscal.</Typography></li>
                                    <li><Typography>Sistema 2 | Servidores públicos que intervienen en procedimientos de contratación.</Typography></li>
                                    <li><Typography>Sistema 3 | Servidores públicos y particulares sancionados.</Typography></li>
                                </ul>
                            </Grid>
                            <Grid item xs={12} md={12} lg={6} xl={6}>
                                <ul>
                                    <li><Typography>Sistema 4 | Información y comunicación del Sistema Nacional Anticorrupción y el Sistema Nacional de Fiscalización.</Typography></li>
                                    <li><Typography>Sistema 5 | Denuncias por faltas administrativas y hechos de corrupción.</Typography></li>
                                    <li><Typography>Sistema 6 | Contrataciones Públicas.</Typography></li>
                                </ul>
                            </Grid>
                        </Grid>

                        <Typography paragraph>
                            Es importante señalar que la PDN no es un repositorio ni generadora de los datos de cada sistema, sino que es una plataforma de interoperabilidad.
                        </Typography>

                    </div>


                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography>Objetivos de la PDN</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                        <Typography>
                            Usar nuevas tecnologías y metodologías de trabajo como apoyo al trabajo de las autoridades del Sistema Nacional Anticorrupción para:
                        </Typography>

                        <ul>
                            <li><Typography>Analizar y alertar a las autoridades sobre riesgos de corrupción;</Typography></li>
                            <li><Typography>Automatizar procesos, evitar discrecionalidad y conflicto de interés;</Typography></li>
                            <li><Typography>Promover el uso de los datos para respaldar sanciones;</Typography></li>
                            <li><Typography>Dar seguimiento, en tiempo real, a los procesos y proyectos de contratación pública, y garantizar una mayor eficiencia en las compras públicas;</Typography></li>
                            <li><Typography>Fortalecer la participación ciudadana en el combate a la corrupción;</Typography></li>
                            <li><Typography>Incorporar información sobre indicadores para evaluar la Política Nacional Anticorrupción;</Typography></li>
                            <li><Typography>Dar evidencia para generar recomendaciones de política pública a las autoridades;</Typography></li>
                        </ul>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <ExpansionPanelSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography>Marco normativo</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>

                        <Typography paragraph>
                            El marco normativo de la PDN está compuesto por la Ley General del Sistema Nacional Anticorrupción (LGSNA), la Ley General de Responsabilidades Administrativas (LGSNA) y las Bases para el Funcionamiento de la Plataforma Digital Nacional (publicadas el 23 de octubre del 2018 en el Diario Oficial de la Federación).
                        </Typography>

                        <MuiLink href="http://www.diputados.gob.mx/LeyesBiblio/pdf/LGSNA.pdf">
                            Ley General Del Sistema Nacional Anticorrupción
                        </MuiLink>

                        <ul>
                            <li><Typography>Artículos 9, fracciones XII, XIII y XVI;</Typography></li>
                            <li><Typography>17;</Typography></li>
                            <li><Typography>21, VII, b);</Typography></li>
                            <li><Typography>35, X y XI;</Typography></li>
                            <li><Typography>Título cuarto;</Typography></li>
                        </ul>
                        <MuiLink href="https://declaranet.gob.mx/docs/LGRA.pdf">
                            Ley General de Responsabilidades Administrativas
                        </MuiLink>

                        <ul>
                            <li><Typography>Artículos 9, VI, c);</Typography></li>
                            <li><Typography>26;</Typography></li>
                            <li><Typography>27;</Typography></li>
                            <li><Typography>30;</Typography></li>
                            <li><Typography>31;</Typography></li>
                            <li><Typography>34;</Typography></li>
                            <li><Typography>43;</Typography></li>
                            <li><Typography>44;</Typography></li>
                            <li><Typography>46;</Typography></li>
                            <li><Typography>59;</Typography></li>
                            <li><Typography>93, y</Typography></li>
                        </ul>

                        <MuiLink href="https://www.dof.gob.mx/nota_detalle.php?codigo=5541802&fecha=23/10/2018">
                            Bases para el Funcionamiento de la Plataforma Digital Nacional.
                        </MuiLink>

                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>



            <ExpansionPanel square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <ExpansionPanelSummary aria-controls="panel4d-content" id="panel4d-header">
                    <Typography>¿Qué hace la SESNA y la USTPDN?</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                        <Typography paragraph>
                            La Secretaría Ejecutiva del Sistema Nacional Anticorrupción (SESNA) tiene como propósito brindar apoyo técnico al Comité Coordinador del Sistema Nacional Anticorrupción.
                        </Typography>

                        <Typography paragraph>
                            La SESNA es responsable de diseñar, promover y evaluar la Política Nacional Anticorrupción, y de administrar la Plataforma Digital Nacional.
                        </Typography>

                        <Typography paragraph>
                            El objetivo de la Unidad encargada de la Plataforma Digital Nacional (USTPDN) es utilizar nuevas tecnologías, metodologías, ciencia de datos e inteligencia artificial como insumos y apoyo al trabajo de las autoridades que conforman el Comité Coordinador del Sistema Nacional Anticorrupción.
                        </Typography>

                        <Typography paragraph>
                            Asimismo, la LGSNA menciona que la función de la PDN es integrar y conectar los diversos sistemas electrónicos que posean datos e información sobre los seis sistemas. Éstos deben ser interoperables, es decir, deben ser capaces de obtener o transferir información con otros sistemas. Para lograr la interoperabilidad de los datos, es necesario estandarizarlos y ponerlos en un formato común.
                        </Typography>

                        <Typography paragraph>
                            Para ello la SESNA emitirá los protocolos, estándares, reglamentos, especificaciones técnicas y cualquier normativa necesaria para la colaboración, provisión de datos y acciones para cumplir con las Bases, los cuales serán obligatorios para todos los proveedores, concentradores y encargados a nivel federal, estatal y municipal, enmarcado en el artículo 6 de las Bases de la PDN (Artículo 6, BFPDN).
                        </Typography>

                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>



            <ExpansionPanel square expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <ExpansionPanelSummary aria-controls="panel5d-content" id="panel5d-header">
                    <Typography>Sistemas Estatales Anticorrupción</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>

                        <Typography variant="h6" paragraph> Normatividad:</Typography>


                        <Typography paragraph>
                            <b>Concentradores estatales:</b> Son los miembros de los Sistemas Estatales Anticorrupción que resguardan la información para su integración a los sistemas de la PDN (VI, art. 3, Bases; legislaciones estatales anticorrupción).
                        </Typography>

                        <Typography paragraph>
                            <b>Bases para el funcionamiento de la PDN: </b>
                            La Secretaría Ejecutiva se coordinará con las Secretarías Ejecutivas de los Sistemas Locales Anticorrupción (SLA), a efecto de determinar su participación en la construcción de los sistemas de la Plataforma y la forma de interconexión que tendrán con cada uno de los sistemas a nivel local (Art 23).
                        </Typography>

                        <Typography paragraph>
                            Las Secretarías Ejecutivas de los Sistemas Locales Anticorrupción deberán coordinar los trabajos de implementación de las Bases, previo acuerdo con sus Comités Coordinadores, conforme a lo establecido por la Secretaría Ejecutiva (Art. 24).
                        </Typography>

                        <Typography paragraph>
                            <b>LGSNA: </b>
                            Los SLA promoverán la publicación de la información contenida en la plataforma en formato de datos abiertos, conforme a la Ley General de Transparencia y Acceso a la Información Pública y la demás normatividad aplicable como las Bases para el funcionamiento de la PDN y otros lineamientos que emita la SESNA (Art. 50).
                        </Typography>


                        <Typography variant="h5">
                            Acciones
                        </Typography>

                        <Typography paragraph>
                            Las Secretarías Ejecutivas de los Sistemas Locales, serán las <b><u>responsables de coordinar el  trabajo a nivel local,</u></b> para asegurarse de que sus sistemas cuenten con la información estandarizada y que cumpla con las especificaciones técnicas establecidas por la SESNA, necesarias para conectarse con la Plataforma Digital Nacional.
                        </Typography>

                        <Typography paragraph>
                            Se sugiere realizar la interpretación acerca la responsabilidad que la <i>Ley del Sistema Local Anticorrupción</i> u homóloga.
                        </Typography>

                        <Typography paragraph>
                            Asimismo, se les recomienda comenzar por <b><u>revisar de manera detallada</u></b> las especificaciones técnicas y los diccionarios de datos que ya fueron publicados en la siguiente página: <Link to="/especificaciones" className={classes.link}>https://plataformadigitalnacional.org/especificaciones</Link>. Es importante comenzar con los Sistemas 2 y 3, ya que los formatos necesarios para el Sistema 1 se encuentran en <MuiLink href="https://www.dof.gob.mx/nota_detalle.php?codigo=5557896&fecha=16%2F04%2F2019">proceso de revisión por parte del Comité Coordinador</MuiLink>.
                        </Typography>

                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>


            <ExpansionPanel square expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                <ExpansionPanelSummary aria-controls="panel6d-content" id="panel6d-header">
                    <Typography>Preguntas técnicas frecuentes </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>



                        <Typography variant="h5" paragraph>
                            ¿Cómo funciona la PDN?
                        </Typography>


                        <Typography paragraph>
                            El siguiente Diagrama 1 muestra un diseño de alto nivel de la arquitectura y las funcionalidades de la PDN. El flujo es el siguiente:
                        </Typography>

                        <ol>
                            <li><Typography>Un usuario entra a la PDN y hace una petición de cierta información.</Typography></li>
                            <li><Typography>La PDN envía la petición de información del usuario usando parámetros de consulta al API de la dependencia.</Typography></li>
                            <li><Typography>El API solicita a sus Bases de Datos la información.</Typography></li>
                            <li><Typography>En este punto de comunicación también hay controles de autenticación de permisos, así como encriptación de datos que protegen el envío de la respuesta con la información solicitada desde la dependencia  hasta  la PDN.</Typography></li>
                        </ol>



                        <img src={Diagrama} className={classes.diagrama}/>

                        <Typography variant="h5" paragraph>¿Cómo se está construyendo la PDN?</Typography>

                        <Typography paragraph>
                            El equipo de la PDN cuenta con desarrolladores web, que hacen uso intensivo de las tecnologías de software más
                            modernas y de código abierto.
                        </Typography>

                        <Typography paragraph>
                            Existen tres componentes técnicos clave que permiten el desarrollo de la PDN
                        </Typography>

                        <ol>
                            <li><Typography>Uso de web APIs que permitan la consulta de los datos desde la PDN a la entidad. Actualmente existen herramientas de código abierto para implementar las APIs rápidamente y de bajo costo.</Typography></li>
                            <li><Typography>Estándares técnicos de datos que permiten compartir, para cada uno de los seis sistemas clave, información entre las dependencias y la PDN en una manera unificada y estandarizada. Actualmente hemos desarrollado tres estándares:</Typography></li>
                            <ul>
                                <li><Link to="/declaraciones/especificaciones" className={classes.link}><Typography>Declaraciones</Typography></Link></li>
                                <li><Link to="/intervienen/especificaciones" className={classes.link}><Typography>Servidores públicos que intevienen en contrataciones</Typography></Link></li>
                                <li><Link to="/sancionados/especificaciones" className={classes.link}><Typography>Servidores públicos y particulares sancionados</Typography></Link></li>
                            </ul>
                            <li><Typography>Tecnologías y servicios de software modernos y de código abierto. El código de la PDN puede consultarse <MuiLink href="https://github.com/PDNMX"> aquí</MuiLink>. Las tecnologías que usamos son las siguientes:</Typography></li>
                        </ol>

                        {/*
                        <TablaTecnologias/>
                        */}


                        <ul>
                            <li>
                                <Typography paragraph>
                                    <b>Contenedores</b> <br/>
                                    Uso: Puesta en marcha y distribución de actualizaciones <br/>
                                    Tecnología: Docker, Kubernetes
                                </Typography>
                            </li>
                            <li>
                                <Typography paragraph>
                                    <b>Analíticos</b><br/>
                                    Uso: Inteligencia de datos<br/>
                                    Tecnología: Python
                                </Typography>
                            </li>
                            <li>
                                <Typography paragraph>
                                    <b>Backend</b><br/>
                                    Uso: Lógica de negocio de la PDN<br/>
                                    Tecnología: Python, Node.js, express.js  y Graphql
                                </Typography>
                            </li>
                            <li>
                                <Typography paragraph>
                                    <b>Base de Datos</b><br/>
                                    Uso: Tecnología de almacenamiento <br/>
                                    Tecnología: PostgreSQL y MongoDB
                                </Typography>
                            </li>
                            <li>
                                <Typography paragraph>
                                    <b>FrontEnd</b><br/>
                                    Uso: Desarrollo de interfaz de usuario<br/>
                                    Tecnología: React.js Material UI
                                </Typography>
                            </li>
                            <li>
                                <Typography paragraph>
                                    <b>Seguridad</b><br/>
                                    Uso: Autorización<br/>
                                    Tecnología: OAuth 2.0
                                </Typography>
                            </li>
                            <li>
                                <Typography paragraph>
                                    <b>Testing</b><br/>
                                    Uso: Pruebas de software<br/>
                                    Tecnología: Jestjs
                                </Typography>
                            </li>
                            <li>
                                <Typography paragraph>
                                    <b>Continous integration</b><br/>
                                    Uso: Integración continua<br/>
                                    Tecnología: TravisCI
                                </Typography>
                            </li>
                            <li>
                                <Typography paragraph>
                                    <b>Servicios web</b><br/>
                                    Uso: Comunicación con instituciones<br/>
                                    Tecnología: Web APIs (REST y GrapQL)
                                </Typography>
                            </li>
                            <li>
                                <Typography paragraph>
                                    <b>Estándares de datos</b><br/>
                                    Uso: Estandarización de información<br/>
                                    Tecnología: Open API Specification y GraphQL
                                </Typography>
                            </li>
                            <li>
                                <Typography paragraph>
                                    <b>Control de versiones</b><br/>
                                    Uso: Repositorios de código y control de versiones<br/>
                                    Tecnología: Git
                                </Typography>
                            </li>
                        </ul>


                        <Typography paragraph variant="h5">
                            ¿Qué es la interoperabilidad?
                        </Typography>

                        <Typography paragraph>
                            Interoperabilidad se refiere a la posibilidad que tiene un sistema de obtener o transferir información con otros sistemas. Para lograr la interoperabilidad de los datos, es necesario estandarizarlos y ponerlos en un formato común.
                        </Typography>

                        <Typography paragraph variant="h5">
                            ¿Qué es un estándar de datos?
                        </Typography>
                        <Typography paragraph>
                            Un estándar se refiere a las reglas y características con las que debe de contar un conjunto de datos, como: tipo de dato (i.e., numérico, entero, caracter, cadena), longitud, número de veces que aparece, precisión, etc.
                        </Typography>

                        <Typography variant="h5">
                            ¿Qué es un API?
                        </Typography>
                        <Typography paragraph>
                            Un API (<i>‘Application Programming Interface’</i> en inglés) es un conjunto de reglas que las aplicaciones deben seguir para comunicarse entre ellas, sirviendo de interfaz de comunicación entre componentes de software. En el contexto de la presente guía, el uso de APIs tiene el objetivo de permitir la comunicación entre la Plataforma Digital Nacional (Sistema de la SESNA) y los diversos sistemas de información de las instituciones obligadas a proveer datos anticorrupción.
                        </Typography>
                        <Typography variant="h5" paragraph>
                            ¿La Secretaría Ejecutiva del Sistema Nacional Anticorrupción establecerá cómo desarrollar las Plataformas Estatales?
                        </Typography>

                        <Typography paragraph>
                            La facultad de diseñar y desarrollar las Plataformas estatales es de cada entidad, siempre y cuando se cumpla con la normatividad que está establecida en las Bases para el funcionamiento de la Plataforma Digital Nacional y los lineamientos que serán publicados para la estandarización y distribución de datos para cada Sistema.
                        </Typography>

                        <Typography paragraph>
                            Las Bases fueron aprobadas por el Comité Coordinador del Sistema Nacional Anticorrupción, y estipulan que la Secretaría Ejecutiva emitirá los protocolos, estándares, reglamentos, especificaciones técnicas y cualquier normativa necesaria para la colaboración, provisión de datos y acciones para cumplir con las Bases.
                        </Typography>



                        <Typography paragraph>
                            Revisar las especificaciones técnicas publicadas en la versión Alfa de la PDN:
                        </Typography>
                        <ul>
                            <li>
                                <Link to="/declaraciones/especificaciones" className={classes.link}>
                                    Sistema 1
                                </Link>
                            </li>
                            <li>
                                <Link to="/intervienen/especificaciones" className={classes.link}>
                                    Sistema 2
                                </Link>
                            </li>
                            <li>
                                <Link to="/sancionados/especificaciones" className={classes.link}>
                                    Sistema 3
                                </Link>
                            </li>
                        </ul>
                        <Typography variant="h5" paragraph>
                            ¿Las Plataformas Digitales van a operar ahora sistemas como CompraNet o Declaranet?
                        </Typography>
                        <Typography paragraph>
                            No. Las Plataformas serán una herramienta de interoperabilidad que a través de las estandarización de la información serán capaces de consultar los datos que contienen sistemas como CompraNet o Declaranet.
                        </Typography>

                        <Typography paragraph>
                            La generación de los datos desde sistemas como CompraNet o Declaranet  seguirá siendo responsabilidad de los entes que tienen la atribución actualmente.
                        </Typography>

                        <Typography paragraph variant="h5">
                            ¿Qué papel juegan las entidades federativas?
                        </Typography>
                        <Typography>
                            Cada una de las 32 entidades federativas debe contar con su propio Sistema Local Anticorrupción y su propia ley que motive la conexión de sus datos con la PDN. Es necesario que las secretarías ejecutivas establezcan canales de comunicación con las secretarías o instancias encargadas del control interno y con las autoridades locales competentes en el combate a la corrupción para desarrollar sistemas de información o plataformas estatales de interoperabilidad.
                        </Typography>


                        <Typography paragraph variant="h5">¿Cuándo entran en vigor los nuevos formatos para las declaraciones patrimonial y de intereses?</Typography>

                        <Typography paragraph>Los formatos publicados en el Diario Oficial de la Federación (DOF) el 16 de noviembre del 2018 se encuentran en un proceso de revisión por parte de las autoridades del Comité Coordinador del SIstema Nacional Anticorrupción.  Por lo anterior, se modificó el Artículo Segundo Transitorio del <MuiLink href="https://www.dof.gob.mx/nota_detalle.php?codigo=5557896&fecha=16/04/2019">“Acuerdo por el que se modifica el artículo Segundo Transitorio del “Acuerdo por el que el Comité Coordinador del Sistema Nacional Anticorrupción emite el formato de declaraciones: de situación patrimonial y de intereses; y expide las normas e instructivo para su llenado y presentación”</MuiLink>; quedando de la siguiente manera:</Typography>

                        <Typography paragraph>
                            <i>“SEGUNDO. Se determina que los formatos aprobados mediante el presente Acuerdo, serán obligatorios para los Servidores Públicos al momento de presentar sus declaraciones de situación patrimonial y de intereses, una vez que se encuentren debidamente integrados y correctamente segmentados, estén plenamente adecuados a las directrices establecidas en el marco jurídico aplicable y se garantice la interoperabilidad con el sistema de evolución patrimonial y de declaración de intereses de la Plataforma Digital Nacional, a que hace referencia la fracción I del artículo 49 de la Ley General del Sistema Nacional Anticorrupción, situación que será formalmente informada a los involucrados mediante el Acuerdo correspondiente que, para tal efecto, emita el Comité Coordinador del Sistema Nacional Anticorrupción y publique en el Diario Oficial de la Federación para su aplicación y observancia obligatoria, lo que no podrá exceder del 31 de diciembre de 2019"
                            </i>
                        </Typography>

                        <Typography paragraph>Bajo ese contexto y en observancia al artículo Tercero Transitorio del Acuerdo por el que el Comité Coordinador del Sistema Nacional Anticorrupción emite el formato de declaraciones: de situación patrimonial y de intereses; y expide las normas e instructivo para su llenado y presentación”, publicado en el Diario Oficial de la Federación el día 16 de noviembre del año 2018, los Servidores Públicos de todos los órdenes de gobierno que deban presentar sus declaraciones de situación patrimonial, inicial o de conclusión, utilizarán los formatos y la normatividad que se encuentren vigentes, utilizables y a través de las plataformas o medios operables al día en que se genere la obligación de presentar la declaración que corresponda.</Typography>

                        <Typography paragraph>Lo anterior se mantendrá vigente hasta en tanto el Comité Coordinador concluya el análisis correspondiente al Formato, lo cual se dará a conocer mediante el Acuerdo correspondiente.</Typography>






                        <Typography paragraph variant="h5">
                            ¿Cómo se va a trabajar en la seguridad e integridad de los datos?
                        </Typography>
                        <Typography paragraph>
                            Se utilizarán herramientas de autentificación que contemplarán los roles y permisos, por ejemplo: SSL, OAuth, eFirma; estas herramientas permitirán mantener la trazabilidad de las consultas de datos que se hagan dentro de las plataformas, garantizando el acceso seguro a los datos.
                        </Typography>







                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>


            <ExpansionPanel square expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                <ExpansionPanelSummary aria-controls="panel7d-content" id="panel7d-header">
                    <Typography>Preguntas frecuentes - datos</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>


                        <Typography paragraph variant="h5">
                            ¿Qué hace la PDN y qué sucederá con los datos?
                        </Typography>
                        <Typography paragraph>
                            La PDN consultará a través de APIs (medios tecnológicos para comunicar diversos sistemas) los datos que las instituciones públicas ya generan y los ordenará conforme a estándares que señale la SESNA. Así, las instituciones seguirán generando, controlando y siendo responsables de sus datos, pero ahora serán interoperables y comparables para generar inteligencia anticorrupción.
                        </Typography>
                        <Typography variant="h5" paragraph>
                            ¿La Plataforma Digital Nacional (PDN) va a generar información?
                        </Typography>
                        <Typography paragraph>
                            No. El objetivo de la Plataforma es generar interoperabilidad entre los datos que ya generan actualmente los entes obligados, a través del uso de estándares comunes.
                        </Typography>
                        <Typography variant="h5" paragraph>
                            ¿La PDN se va a quedar con los datos generados por las instituciones?
                        </Typography>
                        <Typography paragraph>
                            No. Las Instituciones son las responsables de los datos que generan, y a partir de la publicación de los lineamientos de cada Sistema, deberán estandarizarlos de acuerdo a lo solicitado por la SESNA a través del Comité Coordinador del SNA.
                        </Typography>
                        <Typography variant="h5" paragraph>
                            ¿Se van a compartir los datos reservados o personales?
                        </Typography>
                        <Typography paragraph>
                            No.
                            Los integrantes del Sistema Nacional y de los Sistemas Locales promoverán la publicación de la información contenida en la plataforma en formato de datos abiertos, conforme a la Ley General de Transparencia y Acceso a la Información Pública y la demás normatividad aplicable (Artículo 50 LGSNA).
                        </Typography>

                        <Typography paragraph variant="h5">
                            ¿Quién va a poder acceder a la PDN?
                        </Typography>

                        <Typography paragraph>
                            El componente público de la PDN será para consulta de cualquier ciudadano, y dará acceso a los datos que tienen carácter público, de acuerdo a la Ley General de Transparencia y Acceso a la Información.
                        </Typography>

                        <Typography paragraph>
                            El componente privado tendrá un acceso restringido que será determinado por el Comité Coordinador del SNA, quien tendrá la responsabilidad de aprobar el catálogo de perfiles y funcionarios que tendrán acceso a los datos reservados.
                        </Typography>
                        <Typography paragraph>
                            Los diferentes niveles de acceso a la Plataforma se definirán conforme a los derechos, atribuciones y competencias de cada usuario, conforme a la normativa aplicable a cada uno de los sistemas (Artículo 17, BFPDN).
                        </Typography>
                        <Typography paragraph>
                            La Secretaría Ejecutiva elaborará y publicará un catálogo de perfiles, en el cual se establezcan las facultades,obligaciones, y/o atribuciones que les sean aplicables a cada uno de los usuarios de manera genérica (Artículo 18, BFPDN)
                        </Typography>



                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>



            <ExpansionPanel square expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                <ExpansionPanelSummary aria-controls="panel8d-content" id="panel8d-header">
                    <Typography>Contactanos</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>

                        <Typography paragraph>
                            Escribenos si tienes dudas sobre la construcción de la PDN.
                        </Typography>
                        <Typography>
                            pdn<Icon style={{fontSize:12}}>alternate_email</Icon>sesna.gob.mx
                        </Typography>

                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>

        </div>
    );
}
