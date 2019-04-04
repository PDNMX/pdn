import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Footer from "../../Home/Footer";
import Grid from '@material-ui/core/Grid';
import Estandar from "./Estandar";
import Licencia from "../Licencia";
import Implementacion from "./Implementacion";
import TablaParametros from "./TablaParametros";
import Typography from '@material-ui/core/Typography';
import Herramientas from "../Herramientas";
import Especificaciones from "./Especificaciones";
import Header from './Header/Header';

const styles = theme => ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    item: {
        maxWidth: 1200,
        paddingRight: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2
    }, container: {
        background: "#fff",
        paddingTop: theme.spacing.unit * 4,
        paddingBottom: theme.spacing.unit * 4
    }
});

class TemporaryDrawer extends React.Component {
    state = {
        top: false,
        left: false,
        bottom: false,
        right: false,
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render() {
        const {classes} = this.props;

        const sideList = (
            <div className={classes.list}>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </div>
        );

        const fullList = (
            <div className={classes.fullList}>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </div>
        );

        return (
            <div>
                <Header/>
                <Grid container spacing={0} justify='center' className={classes.container}>
                    <Grid item xs={12} className={classes.item}>

                        {/*<p>
                            <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button>
                            <Button onClick={this.toggleDrawer('right', true)}>Open Right</Button>
                            <Button onClick={this.toggleDrawer('top', true)}>Open Top</Button>
                            <Button onClick={this.toggleDrawer('bottom', true)}>Open Bottom</Button>
                        </p>*/}

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

                        <div id="especificaciones">
                            <Especificaciones/>
                        </div>
                        <Divider/>
                        <Herramientas/>
                        {/*

                        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                            <div
                                tabIndex={0}
                                role="button"
                                onClick={this.toggleDrawer('left', false)}
                                onKeyDown={this.toggleDrawer('left', false)}
                            >
                                {sideList}
                            </div>
                        </Drawer>
                        <Drawer anchor="top" open={this.state.top} onClose={this.toggleDrawer('top', false)}>
                            <div
                                tabIndex={0}
                                role="button"
                                onClick={this.toggleDrawer('top', false)}
                                onKeyDown={this.toggleDrawer('top', false)}
                            >
                                {fullList}
                            </div>
                        </Drawer>
                        <Drawer
                            anchor="bottom"
                            open={this.state.bottom}
                            onClose={this.toggleDrawer('bottom', false)}
                        >
                            <div
                                tabIndex={0}
                                role="button"
                                onClick={this.toggleDrawer('bottom', false)}
                                onKeyDown={this.toggleDrawer('bottom', false)}
                            >
                                {fullList}
                            </div>
                        </Drawer>
                        <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
                            <div
                                tabIndex={0}
                                role="button"
                                onClick={this.toggleDrawer('right', false)}
                                onKeyDown={this.toggleDrawer('right', false)}
                            >
                                {sideList}
                            </div>
                        </Drawer>*/}

                    </Grid>
                </Grid>

                <Footer/>

            </div>
        );
    }
}

TemporaryDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);
