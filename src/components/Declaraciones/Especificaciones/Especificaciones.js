import React from 'react';
//import Footer from '../../Home/Footer'
import PropTypes from 'prop-types';
//import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//import PDNAppBar from "../../PDNAppBar/PDNAppBar";
import rp from 'request-promise';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LinkIcon from '@material-ui/icons/Link'
import Extension from '@material-ui/icons/Extension';
import Code from '@material-ui/icons/Code';
import Widgets from '@material-ui/icons/Widgets';
import ReactJson from 'react-json-view';
import IconButton from "@material-ui/core/IconButton";
import {Link} from "react-router-dom";
import LinkM from "@material-ui/core/Link";
import PDNLogo from "../../../assets/PDN.png";
import Build from '@material-ui/icons/Build';
import ListSubheader from '@material-ui/core/ListSubheader';
import TablaParametros from "./TablaParametros";
import Button from '@material-ui/core/Button';
import Diagrama from '../../../assets/Diagrama_de_comunicacion_API.svg';
//import Paper from '@material-ui/core/Paper';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        //width: '100%'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
    flex: {
        flexGrow: 1
    },
    nested: {
        paddingLeft: theme.spacing.unit * 9
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing.unit *2,
        background: '#ffe01b',//'#fecb6e'
    },
    diagrama: {
        maxWidth: 900
    },
    paper : {
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit
    }
});

class ClippedDrawer extends React.Component {

    state = {
        oas: ["cargando"],
        example: ["cargando"]
    };

    componentDidMount() {

        let promises = [];
        promises.push(rp({
            url: 'https://raw.githubusercontent.com/PDNMX/api_docs/master/S1/oas/declaraciones.json',
            method: 'GET',
            json: true
        }));

        promises.push(rp({
            url: 'https://raw.githubusercontent.com/PDNMX/api_docs/master/S1/example.json',
            method: 'GET',
            json: true
        }));

        Promise.all(promises).then(data => {

            //console.log(data[1].results[0]);
            this.setState({
                oas: data[0],
                example: data[1]
            })
        });

        //this.setState({oas:  { "test": 123, "others": [ { "abc": 1 }, { "xyz": 999 } ] }, example: {}})
    }

    render() {

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar position="fixed" color="default" className={classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" aria-label="Menu" component={Link} to="/home">
                            <img src={PDNLogo} alt="logoPDN" style={{width: '55px'}}/>
                        </IconButton>

                        <Typography variant="h6" color="inherit" noWrap className={classes.flex}>

                        </Typography>
                    </Toolbar>
                </AppBar>
                {/*<div className={classes.appBar}>
                <PDNAppBar position="fixed" className={classes.appBar}/>
            </div>*/}

                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar}/>
                    <List component="nav"
                          subheader={<ListSubheader component="div">Declaraciones</ListSubheader>}
                    >


                        <Divider/>
                        <ListItem  component={LinkM} href="#estandar" button>
                            <ListItemIcon><Extension/></ListItemIcon>
                            <ListItemText primary="Estándar"/>
                        </ListItem>

                        <List component="div" disablePadding>

                            <ListItem component={LinkM} className={classes.nested} href="#antecedentes" button>
                                {/*<ListItemIcon><Assignment/></ListItemIcon>*/}
                                <ListItemText primary="Antecedentes"/>
                            </ListItem>

                            <ListItem component={LinkM} href="#introduccion" button className={classes.nested}>
                                {/*<ListItemIcon><Widgets/></ListItemIcon>*/}
                                <ListItemText primary="Introducción"/>
                            </ListItem>

                            <ListItem component={LinkM} href="#oas" button className={classes.nested}>
                                {/*<ListItemIcon><Widgets/></ListItemIcon>*/}
                                <ListItemText primary="OAS"/>
                            </ListItem>

                            <ListItem component={LinkM} href="#oauth" button className={classes.nested}>
                                {/*<ListItemIcon><Widgets/></ListItemIcon>*/}
                                <ListItemText primary="OAuth 2"/>
                            </ListItem>
                        </List>
                        <Divider/>

                        <ListItem component={LinkM} href="#implementacion" button>
                            <ListItemIcon><Code/></ListItemIcon>
                            <ListItemText primary="Implementación"/>
                        </ListItem>

                        <ListItem component={LinkM} href="#api" button>
                            <ListItemIcon><Widgets/></ListItemIcon>
                            <ListItemText primary="REST API"/>
                        </ListItem>

                        <List component="div" disablePadding>
                            <ListItem component={LinkM} href="#comunicacion" button className={classes.nested}>
                                {/*<ListItemIcon><Widgets/></ListItemIcon>*/}
                                <ListItemText primary="Comunicación"/>
                            </ListItem>

                            <ListItem button component={LinkM} href="#parametros" className={classes.nested}>
                                {/*<ListItemIcon><Widgets/></ListItemIcon>*/}
                                <ListItemText primary="Parámentros"/>
                            </ListItem>

                            <ListItem button component={LinkM} href="#especificaciones" className={classes.nested}>
                                {/*<ListItemIcon><Widgets/></ListItemIcon>*/}
                                <ListItemText primary="Especificaciones"/>
                            </ListItem>

                            <ListItem button component={LinkM} href="#ejemplos" className={classes.nested}>
                                {/*<ListItemIcon><Widgets/></ListItemIcon>*/}
                                <ListItemText primary="Ejemplos"/>
                            </ListItem>

                        </List>
                        <ListItem component={LinkM} href="#herramientas" button>
                            <ListItemIcon><Build/></ListItemIcon>
                            <ListItemText primary="Herramientas"/>
                        </ListItem>
                        <Divider/>
                    </List>

                </Drawer>
                <main className={classes.content}>

                    <div className={classes.toolbar}/>

                    <Typography variant="h4" id="estandar" paragraph>Estándar para la Interoperabilidad de Datos de Declaraciones</Typography>
                    <Typography paragraph>
                        Esta guía tiene como finalidad la descripción del Estándar para la Interoperabilidad de Datos de Declaraciones,
                        desarrollado por la Secretaría Ejecutiva del Sistema Nacional Anticorrupción (SESNA).
                        Se presenta el modelo de interoperabilidad que deberán adoptar los diversos sistemas de declaraciones que proveerán
                        información a la Plataforma Digital Nacional (PDN) y
                        se proporciona una serie de recomendaciones para la implementación del estándar por parte de las Instituciones.
                    </Typography>

                    <Typography variant="h5" id="antecedentes">Antecedentes</Typography>
                    <ul>
                        <li>
                            <Typography paragraph>
                                El 13 de septiembre de 2018, durante la Tercera Sesión Ordinaria 2018 del Comité Coordinador del Sistema Nacional Anticorrupción (SNA), se aprobó el nuevo Formato Nacional para la Declaración  Patrimonial y de Intereses propuesto por el Comité de Participación Ciudadana (CPC), el nuevo formato tendrá impacto a nivel nacional y es de presentación obligatoria para todas las personas que desempeñen un empleo, cargo o comisión en los entes públicos, conforme a lo dispuesto por el artículo 108 de la Constitución Política de los Estados Unidos Mexicanos y entrará en vigor, a más tardar el 30 de abril de 2019.
                            </Typography></li>
                        <li>
                            <Typography paragraph>
                                A su vez, el 23 de octubre de 2018 fueron publicadas las Bases para el funcionamiento de la Plataforma Digital Nacional (PDN) en el DOF. El Art. 6 establece que para el correcto funcionamiento de cada uno de los sistemas, la SESNA emitirá los protocolos, estándares, reglamentos, especificaciones técnicas y cualquier normativa necesaria para la colaboración, provisión de datos y acciones para cumplir con las Bases, los cuales serán obligatorios para todos los proveedores, concentradores y encargados a nivel federal, estatal y municipal.
                            </Typography></li>
                        <li>
                            <Typography paragraph>
                                El 11 de noviembre de 2018 se publicó en el DOF el Acuerdo por el que el Comité Coordinador del Sistema Nacional Anticorrupción emite el formato de declaraciones: de situación patrimonial y de intereses; y expide las normas e instructivo para su llenado y presentación.
                                Dicho formato será utilizado por los Servidores Públicos de manera obligatoria para presentar sus declaraciones de situación patrimonial y de intereses cuando se encuentre operable, esto es, una vez que sea técnicamente posible la interoperabilidad de los sistemas de evolución patrimonial y de declaración de intereses, a que hace referencia la fracción I del artículo 49 de la Ley General del Sistema Nacional Anticorrupción, con la Plataforma Digital Nacional del Sistema Nacional Anticorrupción, lo que no podrá exceder del 30 de abril del año 2019.
                            </Typography></li>
                    </ul>

                    <Typography variant="h5" id="introduccion" paragraph>
                        Introducción
                    </Typography>
                    <Typography paragraph>
                        En la actualidad, la información de declaraciones de los servidores públicos de los diferentes
                        niveles de gobierno se encuentra contenida en diversos formatos,
                        bases de datos y sistemas de información; cada uno de ellos con particularidades tecnológicas y
                        reglas de negocio distintas, dificultando la integración y la
                        interoperabilidad de los datos. El Estándar para la Interoperabilidad de Datos de Declaraciones surge
                        a partir de la necesidad de distribuir, comparar, analizar y
                        distribuir la información
                        de las declaraciones de situación patrimonial y de intereses de una manera uniforme e interoperable.
                    </Typography>

                    <Typography paragraph>
                        Conforme a lo anterior, la SESNA ha conceptualizado a la Plataforma Digital Nacional como una
                        herramienta que permitirá la consulta de información de las diferentes instituciones de los tres
                        niveles de gobierno en un solo punto, sin tener el objetivo de concentrar o resguardar su información.
                        En ese sentido, resulta necesario dotar a la PDN de mecanismos le que permitan interconectarse
                        con los diversos sistemas de gobierno para consultar la información que resulte necesaria,
                        sin importar la tecnología con la que dichos sistemas fueron desarrollados (i.e., lenguajes de programación, bases de datos, etc.).
                    </Typography>
                    <Typography paragraph>

                        La PDN logrará la interoperabilidad técnica con los diversos sistemas que la integrarán a través
                        de la creación de estándares de datos y mediante el uso de Interfaces de Programación de Aplicaciones
                        o APIs (por sus siglas en Inglés). Los estándares de datos permitirán homologar la manera en que la
                        información se debe representar para su entrega a la PDN, mientras que las APIs serán el mecanismo
                        que permitirá la comunicación entre sistemas a través de Internet.
                        Las APIs son ampliamente usadas para el desarrollo de aplicaciones a gran escala.
                        El uso de APIs permitirá que las instituciones conserven el control de sus datos, gestionando el
                        acceso a los mismos mediante reglas y perfiles de usuario.

                    </Typography>
                    <Typography paragraph>
                        La SESNA ha planeado el desarrollo de la PDN mediante el uso APIs Web
                        con arquitectura REST (REpresentational State Transfer).
                        Dicha tecnología es ampliamente usada por en la industria del software para el desarrollo de aplicaciones web,
                        y en la actualidad, existe grán diversidad de herramientas de código abierto que permiten la implementación de
                        sistemas basados en APIs REST de manera rápida y a un bajo costo.
                    </Typography>

                    <Typography variant="h5" id="oas" paragraph>
                        Open API Specification
                    </Typography>
                    <Typography paragraph>
                        El Estándar para la Interoperabilidad de Datos de Declaraciones está basado en el formato conocido como Open API Specification (OAS),
                        el cual es un formato de especificación que permite describir de manera precisa las características con las que deberan
                        contar las APIs que integrarán a la PDN.
                        El OAS cuenta con capacidades para describir los recursos, operaciones, parámetros y estructuras de datos
                        con las que deberán contar las APIs, permitiendo su implementación con independencia tecnológica, es decir,
                        las instituciones podrán
                        emplear las herramientas tecnológicas de su elección (e.g., lenguajes de programación, bases de datos, etc.)
                        siempre que se sigan las especificaciones de manera correcta.
                    </Typography>

                    <Button variant="contained" className={classes.button} href="https://github.com/OAI/OpenAPI-Specification">Más información</Button>
                    <br/>
                    <Typography variant="h5" id="oauth" paragraph>
                        OAuth 2.0
                    </Typography>
                    <Typography paragraph>
                        El acceso a las APIs que se integrarán a la PDN se gestionará a través del protocolo de autorización OAuth 2.0,
                        el cual es un estándar ampliamente usado por la industria de Internet. El estándar OAuth 2.0
                        que permitirá a la PDN obtener acceso necesario a las APIs de las instituciones
                        a través del uso de tokens de autorización.
                    </Typography>
                    <Button variant="contained" className={classes.button} href="https://oauth.net/2/"> Más información </Button>

                    <Typography variant="h4" id="implementacion" paragraph>Implementación del estándar</Typography>
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
                    <Typography variant="h4" id="api" paragraph>
                        Especificación del API de declaraciones
                    </Typography>
                    <Typography variant="h5" id="comunicacion" paragraph>
                        Modelo de comunicación
                    </Typography>
                    <Typography paragraph>
                        A través de la de la PDN, los usuarios serán capaces de realizar consultas a las APIs de las Instituciones, dichas consultas se configurarán usando parámetros (Ver la sección Parámetros de consulta). La Figura 1 muestra un diagrama en el cual se ejemplifica la comunicación entre el API de declaraciones de una Institución y la PDN. El API tendrá la tarea de recibir la consulta y aplicar la lógica de negocio al interior de la institución para generar la respuesta correspondiente. Dicha respuesta deberá estar apegada al estándar de declaraciones proporcionado que se proporciona en la siguiente sección.
                    </Typography>

                    {/*<Paper>*/}
                    <img src={Diagrama} alt="Comunicación" className={classes.diagrama}/>
                    <Typography paragraph>
                        <b>Figura 1. </b>  Esquema conceptual del flujo de comunicación entre Instituciones y la Plataforma Digital Nacional. De derecha a izquierda se observan usuarios con diferentes perfiles accediendo a la PDN y solicitando información de acuerdo a sus atribuciones.
                    </Typography>
                    {/*</Paper>*/}

                    <Typography variant="h5" id="parametros" paragraph>
                        Parámetros de consulta
                    </Typography>


                    <TablaParametros/>

                    <br/>


                    <Typography variant="h5" id="especificaciones" paragraph>
                        Especificaciones
                    </Typography>


                    <Typography paragraph>
                        Esta sección contiene la especificación completa del API de declaraciones en el formato OAS. La especificación puede ser interpretada usando las herramientas compatibles con el OAS o <LinkM href="https://swagger.io/tools/">Swagger</LinkM>.
                    </Typography>
                    <ReactJson src={this.state.oas}/>

                    <br/>
                    <Typography variant="h5" id="ejemplos" paragraph>
                        Ejemplos de respuesta
                    </Typography>

                    <p>
                        <code>
                            https://dominio_institucion/declaraciones?api_key=ACXXXXXXXXXXXXXXXXXX&sort=asc&page=1&page_size=10&nombres=Carlos&
                            apellido1=Pérez&apellido2=López&curp=BEML920313HMCLNS09&rfc=GOAP780710RH7&id=a1b2c3d4&actualizacion=2017-07-21&
                            rfc_solicitante=GOAP780710RH7
                        </code>
                    </p>

                    <ReactJson src={this.state.example}/>
                    <br/>

                    <Typography variant="h4" id="herramientas" paragraph>Herramientas para desarrollo web</Typography>

                    <Typography paragraph>
                        La interconexión entre los sistemas de información de las Instituciones y la PDN se establecerá a través de Internet, usando servicios web o APIs con arquitectura REST (REpresentational State Transfer); REST es un modelo ampliamente usado para el desarrollo de sistemas Web. En la actualidad, existe gran variedad de herramientas de código abierto que permiten el desarrollo de APIs REST usando diferentes lenguajes de programación y tecnologías de bases de datos; entre las más destacados se encuentran:
                    </Typography>

                    <ul>
                        <li>
                            <Typography><b>Express JS</b></Typography>
                            <Typography>Lenguaje de programación: JavaScript</Typography>
                            <IconButton href="https://expressjs.com/">
                                <LinkIcon/>
                            </IconButton>
                        </li>
                        <li>
                            <Typography><b>Django</b></Typography>
                            <Typography>Lenguaje de programación: Python</Typography>

                            <IconButton href="https://www.djangoproject.com/">
                                <LinkIcon/>
                            </IconButton>
                        </li>
                        <li>
                            <Typography><b>Flask</b></Typography>
                            <Typography>Lenguaje de programación: Python</Typography>
                            <IconButton href="https://flask-restful.readthedocs.io/en/latest/quickstart.html">
                                <LinkIcon/>
                            </IconButton>
                        </li>
                        <li>
                            <Typography><b>Spring</b></Typography>
                            <Typography>Lenguaje de programación: Java</Typography>
                            <IconButton href="https://spring.io/guides/gs/rest-service/" size="small">
                                <LinkIcon/>
                            </IconButton>
                        </li>
                        <li>
                            <Typography><b>.NET Core</b></Typography>
                            <Typography>Lenguajes de programación: C#, Visual Basic, F# </Typography>
                            <IconButton href = "https://www.microsoft.com/net/learn/dotnet/hello-world-tutorial">
                                <LinkIcon/>
                            </IconButton>
                        </li>
                        <li>
                            <Typography><b>Apigility</b></Typography>
                            <Typography>
                                Lenguaje de programación: PHP
                            </Typography>
                            <IconButton href="https://apigility.org/">
                                <LinkIcon/>
                            </IconButton>
                        </li>
                    </ul>
                </main>
            </div>
        );
    }
}

ClippedDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);
