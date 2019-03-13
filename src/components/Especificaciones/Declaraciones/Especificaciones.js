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
import AssigmentIcon from '@material-ui/icons/Assignment';
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
import Footer from "../../Home/Footer";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from "@material-ui/icons/Menu";
import app from "../../../config/firebase";
import Herramientas from '../Herramientas';
import Licencia from '../Licencia';
import Implementacion from './Implementacion';
import Antecedentes from "../Antecedentes";

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
        example: ["cargando"],

        open: false,
        currentUser: null,
        loading: false,
        authenticated: false,

        anchorEl: null
    };



    handleSignOut = () => {
        app.auth().signOut().then(() => {
            let aux = {};
            localStorage.setItem("sesion",JSON.stringify(aux));
            this.props.history.push("/pdn");
            this.props.removeSesion();
        }).catch(e => {
            alert(e);
        })
    };


    //menu

    handleChange = event => {
        this.setState({ auth: event.target.checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
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
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar position="fixed" color="default" className={classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" aria-label="Menu" component={Link} to="/">
                            <img src={PDNLogo} alt="logoPDN" style={{width: '55px'}}/>
                        </IconButton>

                        <Typography variant="h6" color="inherit" noWrap className={classes.flex}>

                        </Typography>



                        <div>
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.handleClose}
                            >

                                <MenuItem component={Button}
                                          href="https://www.plataformadigitalnacional.org/blog"
                                          className={classes.blog}
                                >Blog</MenuItem>
                                <MenuItem component={Link} to="/faq">Preguntas frecuentes</MenuItem>
                                <MenuItem component={Link} to="/about">¿Qué es la PDN?</MenuItem>
                                <MenuItem component={Link} to="/terminos">Términos de uso</MenuItem>

                                {/* this.props.sesion.authenticated &
                                <MenuItem onClick={this.handleSignOut}>Cerrar sesión</MenuItem>
                                */}
                            </Menu>
                        </div>


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

                        <ListItem component={LinkM} href="#licencia" button>
                            <ListItemIcon><AssigmentIcon/></ListItemIcon>
                            <ListItemText primary="Licencia"/>
                        </ListItem>
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

                            <ListItem button component={LinkM} href="#parametros" className={classes.nested}>
                                {/*<ListItemIcon><Widgets/></ListItemIcon>*/}
                                <ListItemText primary="Parámetros"/>
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

                    <div id="antecedentes">
                        <Antecedentes/>
                    </div>


                    <Typography variant="h5" id="introduccion" paragraph>
                        Introducción
                    </Typography>
                    <Typography paragraph>
                        En la actualidad, la información de declaraciones de los servidores públicos de los diferentes
                        niveles de gobierno se encuentra contenida en diversos formatos,
                        bases de datos y sistemas de información; cada uno de ellos con particularidades tecnológicas y
                        reglas de negocio distintas, dificultando la integración y la
                        interoperabilidad de los datos. El Estándar para la Interoperabilidad de Datos de Declaraciones surge
                        a partir de la necesidad de distribuir, comparar y analizar
                        la información
                        de las declaraciones de situación patrimonial y de intereses de una manera uniforme e interoperable.
                    </Typography>

                    <Typography paragraph>
                        Conforme a lo anterior, la SESNA ha conceptualizado a la Plataforma Digital Nacional como una
                        herramienta que permitirá la consulta de información de las diferentes instituciones de los tres
                        niveles de gobierno en un solo punto, sin tener el objetivo de concentrarla o resguardarla.
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

                    <p>
                    <Button variant="contained" className={classes.button} href="https://github.com/OAI/OpenAPI-Specification">Más información</Button>
                    </p>
                    <Typography variant="h5" id="oauth" paragraph>
                        OAuth 2.0
                    </Typography>
                    <Typography paragraph>
                        El acceso a las APIs que se integrarán a la PDN se gestionará a través del protocolo de autorización OAuth 2.0,
                        el cual es un estándar ampliamente usado por la industria de Internet. El estándar OAuth 2.0
                        que permitirá a la PDN obtener acceso necesario a las APIs de las instituciones
                        a través del uso de tokens de autorización.
                    </Typography>
                    <p>
                    <Button variant="contained" className={classes.button} href="https://oauth.net/2/"> Más información </Button>
                    </p>

                    <Divider/>
                    <br/>

                    <div id="licencia">
                        <Licencia/>
                    </div>


                    <Divider/>
                    <br/>

                    <div id="implementacion">
                        <Implementacion/>
                    </div>

                    <Divider/>
                    <br/>
                    <Typography variant="h4" id="api" paragraph>
                        Especificación del API de declaraciones
                    </Typography>

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
                    <ReactJson src={this.state.oas} collapsed={4}/>

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

                    <ReactJson src={this.state.example} collapsed={4}/>
                    <br/>
                    <Divider/>
                    <br/>

                    <div id="herramientas">
                        <Herramientas/>
                    </div>

                <Footer/>
                </main>
            </div>
        );
    }
}

ClippedDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);
