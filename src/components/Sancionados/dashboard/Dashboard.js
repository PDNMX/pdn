import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Header from "./Header";
import Grid from "@material-ui/core/Grid/Grid";
import Footer from "../../Home/Footer";
import TiemposSanciones from "./TiemposSanciones";
import CausaSanciones from "./CausaSanciones";
import AnioResolucionSanciones from "./AnioResolucionSanciones";
import DependenciasSanciones from "./DependenciasSanciones";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    bgPanelTable: {
        backgroundColor: theme.palette.white.color,
        [theme.breakpoints.up('sm')]: {
            marginBottom: theme.spacing.unit * 30,
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing.unit * 10,
        },
    },
    sectionT: {
        maxWidth: '1200px',
        overflowX : 'auto'
    },
});

class Dashboard extends React.Component {
    render(){
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Header/>
                <Grid container spacing={0} justify='center' className={classes.bgPanelTable}>
                    <Grid item xs={12} className={classes.sectionT}>
                        <TiemposSanciones/>
                    </Grid>
                    <Grid item xs={12} className={classes.sectionT}>
                        <CausaSanciones/>
                    </Grid>
                    <Grid item xs={12} className={classes.sectionT}>
                        <AnioResolucionSanciones/>
                    </Grid>
                    <Grid item xs={12} className={classes.sectionT}>
                        <DependenciasSanciones/>
                    </Grid>
                </Grid>
                <Footer/>
            </div>
        )
    }

}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);