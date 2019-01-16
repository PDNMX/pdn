import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React from "react";
import {withStyles} from '@material-ui/core/styles';
import Registro from "./InformacionPersonal/Registro";
import Intereses from "./Intereses/Intereses";
import Ingresos from "./Ingresos/Ingresos";
import Activos from "./Activos/Activos";
import Pasivos from "./Pasivos/Pasivos";
import Grid from "@material-ui/core/Grid/Grid";
import AppBar from "@material-ui/core/AppBar/AppBar";

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    container: {
        maxWidth: '1024px'
    },
    rootTabs: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    }
});

class TabsDemo extends React.Component {
    state = {
        value: 'IP',
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {classes, declaracion} = this.props;
        const {value} = this.state;
        return (
            <div className={classes.rootTabs}>

                <Tabs
                    value={value}
                    onChange={this.handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    id={'tabsISela'}
                >
                    <Tab value={'IP'} label="Información personal"/>
                    <Tab value={'INT'} label="Intereses"/>
                    <Tab value={'ING'} label="Ingresos"/>
                    <Tab value={'ACT'} label="Activos"/>
                    <Tab value={'PAS'} label="Pasivos"/>
                </Tabs>
                <Grid item xs={12}>
                    {value === 'IP' && <Registro declaracion={declaracion}/>}
                    {value === 'INT' && <Intereses declaracion={declaracion}/>}
                    {value === 'ING' && <Ingresos declaracion={declaracion}/>}
                    {value === 'ACT' && <Activos declaracion={declaracion}/>}
                    {value === 'PAS' && <Pasivos declaracion={declaracion}/>}
                </Grid>


            </div>
        );
    }
}

export default withStyles(styles)(TabsDemo);