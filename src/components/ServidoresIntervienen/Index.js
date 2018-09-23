import React from 'react';
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Footer from '../Footer/Footer';
import PDNLinks from '../PDNLinks/PDNLinks';
import Header from "../PDNAppBar/PDNAppBar";
import TablaServidores from "./TablaServidores";
import TablaParticulares from "./TablaParticulares";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from "@material-ui/core/Grid/Grid";
import ViewListIcon from "@material-ui/icons/ViewList";


const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    },
    container1: {
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {
            paddingLeft: '100px',
            paddingRight: '100px',
            paddingTop: theme.spacing.unit*3,
            paddingBottom: theme.spacing.unit * 3
        },
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing.unit,
            paddingRight: theme.spacing.unit,
            paddingTop: theme.spacing.unit,
            paddingBottom: theme.spacing.unit,
        },
        [theme.breakpoints.up('xl')]: {
            paddingLeft: '400px',
            paddingRight: '400px',
            paddingTop: theme.spacing.unit,
            paddingBottom: theme.spacing.unit,
        },
        backgroundColor: theme.palette.backDark.color
    },
    title: {
        color: theme.palette.textPrincipal.color,
        textAlign: 'center'
    },
    summary: {
        color: theme.palette.primary.main,
    },
    textLight: {
        color: "#e6e6e6",
        textAlign: 'justify'
    },
    textDark: {
        color: theme.palette.textNormal,
        textAlign: 'justify'
    },
    container2: {
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {
            paddingLeft: '100px',
            paddingRight: '100px',
            paddingTop: theme.spacing.unit*3,
            paddingBottom: theme.spacing.unit * 3
        },
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing.unit,
            paddingRight: theme.spacing.unit,
            paddingTop: theme.spacing.unit,
            paddingBottom: theme.spacing.unit,
        },
        [theme.breakpoints.up('xl')]: {
            paddingLeft: '400px',
            paddingRight: '400px',
            paddingTop: theme.spacing.unit,
            paddingBottom: theme.spacing.unit,
        },
        backgroundColor: theme.palette.backLight.color
    },
    bgPanelDark: {
        backgroundColor: theme.palette.backDark.color,
    },
    bgPanelLight: {
        backgroundColor: theme.palette.backLight.color,
    }

});

class Index extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Header/>
                <div className={classes.container2}>
                    <Typography variant="title" className={classes.title}>
                        Servidores que intervienen en procesos de contratación
                    </Typography>
                    <br/><br/>
                    <Grid container spacing={32}>
                        <Grid item  md={4} xs={12} xl={12} >
                            <Typography className={classes.textDark}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum.
                            </Typography>
                        </Grid>
                        <Grid item md={8} xs={12} xl={12}>
                            <ExpansionPanel classes={{root: classes.bgPanelLight}}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} classes={{content: classes.summary}}>
                                    <ViewListIcon/>
                                    <Typography>
                                        Ver tabla
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <TablaServidores/>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Grid>
                    </Grid>

                </div>
                <div name="container2" className={classes.container1}>
                    <Typography variant={'title'} className={classes.title}>Particulares inhabilitados</Typography>
                    <br/><br/>
                    <Grid container spacing={32}>
                        <Grid item  md={4} xs={12} xl={12}>
                            <Typography className={classes.textLight}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum.
                            </Typography>
                        </Grid>
                        <Grid item  md={8} xs={12} xl={12}>
                            <ExpansionPanel classes={{root: classes.bgPanelDark}}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}
                                                       classes={{content: classes.summary}}>
                                    <ViewListIcon/>
                                    <Typography  className={classes.textLight}>
                                        Ver Tabla
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <TablaParticulares/>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Grid>
                    </Grid>


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