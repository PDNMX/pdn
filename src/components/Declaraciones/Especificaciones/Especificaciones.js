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
import AccountBox from '@material-ui/icons/AccountBox';
import LocalAtm from '@material-ui/icons/LocalAtm';
import Business from '@material-ui/icons/Business';
import StoreMallDirectory from '@material-ui/icons/StoreMallDirectory'
import CreditCard from '@material-ui/icons/CreditCard';
import DoneAll from '@material-ui/icons/DoneAll';
import Assignment from '@material-ui/icons/Assignment';
import Widgets from '@material-ui/icons/Widgets';
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
                        <ListItem button>
                            <ListItemIcon><Assignment/></ListItemIcon>
                            <ListItemText primary="Antecedentes"/>
                        </ListItem>

                        <Divider/>
                        <ListItem button>
                            <ListItemIcon><Extension/></ListItemIcon>
                            <ListItemText primary="Estándar"/>
                        </ListItem>
                        <List component="div" disablePadding>
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

                        <ListItem button>
                            <ListItemIcon><Code/></ListItemIcon>
                            <ListItemText primary="Implementación"/>
                        </ListItem>

                        <Divider/>
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
                        <Divider/>


                        <ListItem button>
                            <ListItemIcon><Build/></ListItemIcon>
                            <ListItemText primary="Herramientas"/>
                        </ListItem>

                        {/*
                        <Divider/>

                        <ListItem button>
                            <ListItemIcon><AccountBox/></ListItemIcon>
                            <ListItemText primary="Información personal"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><Business/></ListItemIcon>
                            <ListItemText primary="Intereses"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><LocalAtm/></ListItemIcon>
                            <ListItemText primary="Ingresos"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><StoreMallDirectory/></ListItemIcon>
                            <ListItemText primary="Activos"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><CreditCard/></ListItemIcon>
                            <ListItemText primary="Pasivos"/>
                        </ListItem>*/}

                    </List>

                </Drawer>
                <main className={classes.content}>



                    <div className={classes.toolbar}/>
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
