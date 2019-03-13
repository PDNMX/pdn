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
import Implementacion from "./Implementacion";
import Estandar from "./Estandar";

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

        //Particulares
        promises.push(rp({
            url: 'https://raw.githubusercontent.com/PDNMX/api_docs/master/S3/oas/OAS_API_Particulares_Sancionados.json',
            method: 'GET',
            json: true
        }));

        promises.push(rp({
            url: 'https://raw.githubusercontent.com/PDNMX/api_docs/master/S3/Resp_API_Particulares_Sancionados.json',
            method: 'GET',
            json: true
        }));

        //Servidores públicos
        promises.push(rp({
            url: 'https://raw.githubusercontent.com/PDNMX/api_docs/master/S3/oas/OAS_API_Servidores_Sancionados.json',
            method: 'GET',
            json: true
        }));

        promises.push(rp({
            url: 'https://raw.githubusercontent.com/PDNMX/api_docs/master/S3/Resp_API_Servidores_Sancionados.json',
            method: 'GET',
            json: true
        }));

        Promise.all(promises).then(data => {

            //console.log(data[1].results[0]);
            this.setState({
                oas_particulares: data[0],
                example_particulares: data[1],
                oas_servidores: data[2],
                example_servidores: data[3]
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
                          subheader={<ListSubheader component="div">Sancionados</ListSubheader>}
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

                    <Estandar/>


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

                    <Typography variant='h6' paragraph>
                        Servidores públicos sancionados
                    </Typography>
                    <ReactJson src={this.state.oas_servidores}/>
                    <Typography variant="h6" paragraph>
                        Particulares sancionados
                    </Typography>
                    <ReactJson src={this.state.oas_particulares}/>

                    <br/>
                    <Typography variant="h5" id="ejemplos" paragraph>
                        Ejemplos de respuesta
                    </Typography>

                    <Typography variant="h6">
                        Servidores públicos sancionados
                    </Typography>
                    <ReactJson src={this.state.example_servidores}/>

                    <Typography variant="h6" paragraph>
                        Particulares sancionados
                    </Typography>
                    <ReactJson src={this.state.example_particulares}/>
                    <br/>
                    <Divider/>

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
