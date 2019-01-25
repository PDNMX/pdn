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
import Extension from '@material-ui/icons/Extension';
import Code from '@material-ui/icons/Code';
import DoneAll from '@material-ui/icons/DoneAll';
import Assignment from '@material-ui/icons/Assignment';
import JSONTree from 'react-json-tree';
import IconButton from "@material-ui/core/IconButton";
import {Link} from "react-router-dom";
import PDNLogo from "../../../assets/PDN.png";
import Build from '@material-ui/icons/Build';
import ListSubheader from '@material-ui/core/ListSubheader';

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
    }
});

const theme = {
    scheme: 'monokai',
    author: 'wimer hazenberg (http://www.monokai.nl)',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#cc6633'
};

class ClippedDrawer extends React.Component {

    state = {
        oas: null,
        example: null
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

            console.log(data[1].results[0]);
            this.setState({
                oas: data[0],
                example: data[1]
            })
        });
    }

    render() {

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar position="fixed" color="default" className={classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" aria-label="Menu" component={Link} to="/pdn/home">
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
                        <ListItem button>
                            <ListItemIcon><Extension/></ListItemIcon>
                            <ListItemText primary="Estándar"/>
                        </ListItem>

                        <List component="div" disablePadding>

                            <ListItem button className={classes.nested}>
                                {/*<ListItemIcon><Assignment/></ListItemIcon>*/}
                                <ListItemText primary="Antecedentes"/>
                            </ListItem>

                            <ListItem button className={classes.nested}>
                                {/*<ListItemIcon><Widgets/></ListItemIcon>*/}
                                <ListItemText primary="Introducción"/>
                            </ListItem>

                            <ListItem button className={classes.nested}>
                                {/*<ListItemIcon><Widgets/></ListItemIcon>*/}
                                <ListItemText primary="OAS"/>
                            </ListItem>

                            <ListItem button className={classes.nested}>
                                {/*<ListItemIcon><Widgets/></ListItemIcon>*/}
                                <ListItemText primary="OAuth 2"/>
                            </ListItem>
                        </List>
                        <Divider/>

                        <ListItem button>
                            <ListItemIcon><Code/></ListItemIcon>
                            <ListItemText primary="Implementación"/>
                        </ListItem>

                        <ListItem button>
                            <ListItemIcon><DoneAll/></ListItemIcon>
                            <ListItemText primary="REST API"/>
                        </ListItem>

                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                {/*<ListItemIcon><Widgets/></ListItemIcon>*/}
                                <ListItemText primary="Comunicación"/>
                            </ListItem>

                            <ListItem button className={classes.nested}>
                                {/*<ListItemIcon><Widgets/></ListItemIcon>*/}
                                <ListItemText primary="Parámentros"/>
                            </ListItem>

                            <ListItem button className={classes.nested}>
                                {/*<ListItemIcon><Widgets/></ListItemIcon>*/}
                                <ListItemText primary="Especificaciones"/>
                            </ListItem>

                            <ListItem button className={classes.nested}>
                                {/*<ListItemIcon><Widgets/></ListItemIcon>*/}
                                <ListItemText primary="Ejemplos"/>
                            </ListItem>

                        </List>
                        <ListItem button>
                            <ListItemIcon><Build/></ListItemIcon>
                            <ListItemText primary="Herramientas"/>
                        </ListItem>
                <Divider/>
                    </List>

                </Drawer>
                <main className={classes.content}>

                    <div className={classes.toolbar}/>




                    <Typography variant="h4">Estándar para la interoperabilidad de datos de declaraciones</Typography>
                    <Typography>
                        El presente documento tiene como finalidad la descripción del estándar para la interoperabilidad de datos de declaraciones, desarrollado por la Secretaría Ejecutiva del Sistema Nacional Anticorrupción (SESNA). El presente documento introduce el modelo de interoperabilidad para los diversos sistemas de declaraciones que proveerán información a la Plataforma Digital Nacional (PDN) y se proporcionará una guía para la implementación del estándar por parte de las Instituciones.
                    </Typography>

                    <Typography variant="h5">Antecedentes</Typography>
                    <ul>
                        <li>
                            <Typography>
                                El 13 de septiembre de 2018, durante la Tercera Sesión Ordinaria 2018 del Comité Coordinador del Sistema Nacional Anticorrupción (SNA), se aprobó el nuevo Formato Nacional para la Declaración  Patrimonial y de Intereses propuesto por el Comité de Participación Ciudadana (CPC), el nuevo formato tendrá impacto a nivel nacional y es de presentación obligatoria para todas las personas que desempeñen un empleo, cargo o comisión en los entes públicos, conforme a lo dispuesto por el artículo 108 de la Constitución Política de los Estados Unidos Mexicanos y entrará en vigor, a más tardar el 30 de abril de 2019.
                            </Typography></li>
                        <li>
                            <Typography>
                                A su vez, el 23 de octubre de 2018 fueron publicadas las Bases para el funcionamiento de la Plataforma Digital Nacional (PDN) en el DOF. El Art. 6 establece que para el correcto funcionamiento de cada uno de los sistemas, la SESNA emitirá los protocolos, estándares, reglamentos, especificaciones técnicas y cualquier normativa necesaria para la colaboración, provisión de datos y acciones para cumplir con las Bases, los cuales serán obligatorios para todos los proveedores, concentradores y encargados a nivel federal, estatal y municipal.
                            </Typography></li>
                        <li>
                            <Typography>
                                El 11 de noviembre de 2018 se publicó en el DOF el Acuerdo por el que el Comité Coordinador del Sistema Nacional Anticorrupción emite el formato de declaraciones: de situación patrimonial y de intereses; y expide las normas e instructivo para su llenado y presentación.
                                Este formato será utilizado por los Servidores Públicos de manera obligatoria para presentar sus declaraciones de situación patrimonial y de intereses cuando se encuentre operable, esto es, una vez que sea técnicamente posible la interoperabilidad de los sistemas de evolución patrimonial y de declaración de intereses, a que hace referencia la fracción I del artículo 49 de la Ley General del Sistema Nacional Anticorrupción, con la Plataforma Digital Nacional del Sistema Nacional Anticorrupción, lo que no podrá exceder del 30 de abril del año 2019.
                            </Typography></li>
                    </ul>

                    <Typography variant="h5">
                        Introducción
                    </Typography>
                    <Typography>
                        En la actualidad, la información de declaraciones de los servidores públicos de los diferentes niveles de gobierno se encuentra contenida en diversos formatos, bases de datos y sistemas de información; cada uno de ellos con particularidades tecnológicas y reglas de negocio distintas, dificultando la integración y la interoperabilidad de los datos.
                    </Typography>
                    <Typography>
                        Por otra parte, la PDN está conceptualizada como una plataforma de interoperabilidad, lo que implica que no tiene el objetivo de ser un repositorio de información, es decir, no concentrará ni será responsable de resguardar la información de las instituciones. En ese sentido, la PDN deberá interconectarse con los diversos sistemas de gobierno para consultar la información que sea necesaria. Conforme a lo anterior, la SESNA ha planeado el desarrollo de la PDN con base en el uso APIs (Application Programming Interface) de tipo REST (REpresentational State Transfer), mismas que son un mecanismo de comunicación ampliamente usado para el desarrollo de aplicaciones web a gran escala. El uso de APIs permitirá a las instituciones conservar el control de sus datos, gestionando el acceso a los mismos mediante perfiles de usuario.
                    </Typography>
                    <Typography>
                        Conforme a lo anterior, el estándar para la interoperabilidad de datos de declaraciones surge a partir de la necesidad de distribuir, comparar, analizar y distribuir la información de las declaraciones de situación patrimonial y de intereses de una manera uniforme e interoperable.
                    </Typography>
                    <Typography>
                        Entrando en detalles más técnicos, las tecnología de APIs REST es ampliamente usada por en la industria de Internet y en la actualidad se cuenta con diversas herramientas de código abierto que permiten su implementación de manera rápida y a un bajo costo. Así también,  dichas APIs pueden ser descritas de manera precisa a través de frameworks como el Open API Specification Format; permitiendo su implementación por diversas instituciones con independencia tecnológica (pueden ser desarrolladas usando distintos lenguajes de programación, bases de datos y herramientas) sin afectar sus objetivos.
                    </Typography>
                    <Typography variant="h5">
                    2.1 Open API Specification
                    </Typography>
                    <Typography>
                    El estándar está basado en el Open API Specification, el cual permitirá describir los recursos, las operaciones, los parámetros disponibles y/o necesarios (con sus valores permitidos) y el formato de la respuesta a la petición.
                    </Typography>
                    <Typography variant="h5">
                    OAuth 2.0
                    </Typography>
                    <Typography>
                        Para proteger la seguridad en la comunicación de la PDN con las APIs de las instituciones, se usará el protocolo OAuth 2.0 es un framework de autorización que permitirá a la PDN obtener acceso necesario a las API’s de las instituciones, delegando la autenticación a las mismas.
                    </Typography>
                    <Typography variant="h4">Implementación del estándar</Typography>
                    La implementación del estándar de declaraciones representará esfuerzos de diferente magnitud dependiendo del nivel de adopción tecnológica de cada Institución. Suponiendo que una cierta Institución ya cuenta con un sistema de captura de declaraciones, el proceso de implementación del API de declaraciones puede ser dividido en los siguientes pasos:

                    Diagnóstico: Revisar y comparar los datos contenidos en su base de datos con los especificados en la publicación del Formato de declaraciones en el Diario Oficial de la Federación, es importante contar con todos los datos solicitados en el nuevo formato, sin embargo, esto no imposibilita a las Instituciones para realizar pruebas de adopción del estándar usando los datos con los que se cuenta.

                    Diseño de arquitectura: Se deberá evaluar las capacidades del sistema de información o base de datos de declaraciones, a fin de diagnosticar su capacidad para soportar la carga de trabajo actual y al mismo tiempo la tarea de resolver las consultas que serán realizadas por la PDN a través del API.

                    En el caso de contar con gran cantidad de usuarios y como medida de seguridad, se recomienda implementar alguna solución de replicación de la información en el sistema de base de datos; de tal manera que se divida la carga de trabajo en dos o más bases de datos.

                    Desarrollo: El desarrollo del API de declaraciones podrá realizarse en el lenguaje de programación que se considere más apropiado con apego a las especificaciones que se proporcionan en las siguientes secciones del presente documento. Dichas especificaciones son agnósticas a la tecnología, es decir, el resultado de la comunicación deberá ser el mismo, siempre que se respeten las reglas, formatos de datos y la sintaxis de los mensajes.
                    4. Especificación del API de declaraciones
                    4.1 Modelo de comunicación
                    A través de la de la PDN, los usuarios serán capaces de realizar consultas a las APIs de las Instituciones, dichas consultas se configurarán usando parámetros (Ver la sección Parámetros de consulta). La Figura 1 muestra un diagrama en el cual se ejemplifica la comunicación entre el API de declaraciones de una Institución y la PDN. El API tendrá la tarea de recibir la consulta y aplicar la lógica de negocio al interior de la institución para generar la respuesta correspondiente. Dicha respuesta deberá estar apegada al estándar de declaraciones proporcionado que se proporciona en la siguiente sección.



                    <Typography variant="h4">
                        Sistema 1
                    </Typography>
                    <Typography variant="h4">
                        Estandar técnico
                    </Typography>
                    <Typography paragraph>
                        Especificaciones
                    </Typography>
                    <div>
                        <JSONTree data={this.state.oas} theme={theme} invertTheme={false}/>
                    </div>

                    <div>
                        <JSONTree data={this.state.example} theme={theme} invertTheme={false}/>
                    </div>
                    <code>
                        {this.state.example === null?"":JSON.stringify(this.state.example.results[0].informacion_personal)}
                    </code>

                    <Typography variant="h4">
                        Intereses
                    </Typography>

                    <code>{this.state.example === null?"":JSON.stringify(this.state.example.results[0].intereses)}</code>

                    <Typography variant="h4">
                        Ingresos
                    </Typography>
                    <code>{this.state.example === null?"":JSON.stringify(this.state.example.results[0].ingresos)}</code>

                    <Typography variant="h4">
                        Activos
                    </Typography>
                    <code>{this.state.example === null?"":JSON.stringify(this.state.example.results[0].activos)}</code>

                    <Typography variant="h4">
                        Pasivos
                    </Typography>

                    <code>{this.state.example === null?"":JSON.stringify(this.state.example.results[0].pasivos)}</code>

                </main>
            </div>
        );
    }
}

ClippedDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);
