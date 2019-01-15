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
import AccountBox from '@material-ui/icons/AccountBox';
import LocalAtm from '@material-ui/icons/LocalAtm';
import Business from '@material-ui/icons/Business';
import StoreMallDirectory from '@material-ui/icons/StoreMallDirectory'
import CreditCard from '@material-ui/icons/CreditCard';

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
});

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
                        <Typography variant="h6" color="inherit" noWrap>
                            Especificaciones
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
                    <List>

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
                        </ListItem>

                    </List>
                    <Divider/>
                    <List>

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
                        </ListItem>

                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Typography variant="h4">
                        Sistema 1
                    </Typography>
                    <Typography variant="h4">
                        Información personal
                    </Typography>
                    <Typography paragraph>
                        Lorem ipsum
                    </Typography>
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
