import React from 'react';
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Footer from '../Footer/Footer';
import PDNLinks from '../PDNLinks/PDNLinks';
import Tabs from "./Tabs";
import Grid from "@material-ui/core/Grid/Grid";
import Header from "../PDNAppBar/PDNAppBar";
import TablaServidores from "./TablaServidores";
import TablaParticulares from "./TablaParticulares";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Paper from "@material-ui/core/Paper/Paper";


const styles = theme => ({
    root:{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    },
    containers: {
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {
            marginLeft: '100px',
            marginRight: '100px',
            paddingTop: theme.spacing.unit,
            paddingBottom: theme.spacing.unit * 3
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            paddingTop: theme.spacing.unit,
            paddingBottom: theme.spacing.unit,
        }
    },
    title:{
        color : theme.palette.primary.main,

    },
    summary : {
        display : 'block',
        color : theme.palette.primary.main,
    },
});

class Index extends React.Component {
    render() {

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Header/>
                <div className={classes.containers}>
                    <ExpansionPanel defaultExpanded >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} classes={{content:classes.summary}} >
                            <Typography variant="title" className={classes.title}>
                                Servidores que intervienen en procesos de contratación
                            </Typography>
                            <br/>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum.
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <TablaServidores/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <br/>
                    <ExpansionPanel defaultExpanded>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} classes={{content:classes.summary}}>
                            <Typography variant={'title'} className={classes.title}>Particulares inhabilitados</Typography>
                            <br/>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum.
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <TablaParticulares/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
                <PDNLinks/>
                <Footer/>
            </div>
        );
    }

}

Index.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);