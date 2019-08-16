import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
//import Typography from "@material-ui/core/Typography";
import Header from './Header/Header';
import Grid from '@material-ui/core/Grid';
import Footer from "../Home/Footer";

//import LabeledHeatmap from './Charts/LabeledHeatmap';
//import Treemap from './Charts/Treemap';
//import ScatterPlot from "./Charts/ScatterPlot";

import Busqueda from "./Busqueda";
import Cifras from "./Cifras";
import Perspectivas from "./Perspectivas";
import Top from './Top';
import Descarga from "./Descarga";
import Disclaimer from "./Disclaimer";



const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    item:{
        maxWidth: 1200,
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(8),
        paddingTop: theme.spacing(8)
    },
    disclaimer: {
        maxWidth: 1200,
        paddingTop: theme.spacing(2),
        padding: theme.spacing(1),
    },

    container: {
        backgroundColor: '#fff'
    },

});


class Index extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Header/>

                <Grid container spacing={0} justify="center" style={{ backgroundColor: '#f6f6f6'}}>
                    <Grid item xs={12} className={classes.disclaimer}>
                        <Disclaimer/>
                    </Grid>
                </Grid>

                <Grid container spacing={0} justify="center" className={classes.container}>
                    <Grid item xs={12} className={classes.item}>
                        <Cifras/>
                    </Grid>
                </Grid>


                <Grid container spacing={0} justify="center" className={classes.container}>
                    <Grid item xs={12} className={classes.item}>
                        <Top/>
                    </Grid>
                </Grid>

                <Grid container spacing={0} justify="center" style={{backgroundColor: "#34b3eb"}}>
                    <Grid item xs={12} className={classes.item}>

                       <Perspectivas/>

                    </Grid>
                </Grid>

                <Grid container spacing={0} justify="center" className={classes.container}>
                    <Grid item xs={12} className={classes.item}>
                        <Busqueda/>
                    </Grid>
                </Grid>


                <Grid container spacing={0} justify="center" className={classes.container} style={{backgroundColor: '#f6f6f6'}}>
                    <Grid item xs={12} className={classes.item}>
                        <Descarga/>
                    </Grid>
                </Grid>

                {/*

                <Grid container spacing={0} justify="center" className={classes.container}>
                    <Grid item xs={12} className={classes.item}>
                        <ScatterPlot/>
                    </Grid>
                </Grid>

                <Grid container spacing={0} justify="center" className={classes.container}>
                    <Grid item xs={12} className={classes.item}>
                        <Typography paragraph> Heatmap </Typography>
                        <LabeledHeatmap/>
                    </Grid>
                </Grid>

                <Grid container spacing={0} justify="center" className={classes.container}>
                    <Grid item xs={12} className={classes.item}>
                        <Typography paragraph> Treemap </Typography>
                        <Treemap/>
                    </Grid>
                </Grid>
                */}



                <Footer/>
            </div>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);