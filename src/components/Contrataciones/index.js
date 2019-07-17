import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import Header from './Header/Header';
import Grid from '@material-ui/core/Grid';
import Footer from "../Home/Footer";

import LabeledHeatmap from './Charts/LabeledHeatmap';
import Treemap from './Charts/Treemap';
import SimpleRadialChart from "./Charts/SimpleRadialChart";
import ScatterPlot from "./Charts/ScatterPlot";


import Gasto from '../../assets/iconos_s6/icono-gasto.svg';
import Tipo from '../../assets/iconos_s6/icono-tipo-procedimiento.svg';
import Proveedor from '../../assets/iconos_s6/icono_proveedor.svg';


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
    container: {
        backgroundColor: '#fff'
    },
    icon: {
        maxWidth: 300
    }
});


class Index extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Header/>

                <Grid container spacing={0} justify="center" className={classes.container}>
                    <Grid item xs={12} className={classes.item}>
                        <Typography paragraph>Donut chart</Typography>
                        <SimpleRadialChart/>
                    </Grid>
                </Grid>

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

                <Grid container spacing={0} justify="center" style={{backgroundColor: "#34b3eb"}}>
                    <Grid item xs={12} className={classes.item}>

                        <Grid container spacing={0}>

                            <Grid item xs={4}>
                                <img src={Gasto} className={classes.icon} alt="Gasto"/>
                            </Grid>
                            <Grid item xs={4}>
                                <img src={Tipo} className={classes.icon} alt="Tipo de procedimiento"/>
                            </Grid>
                            <Grid item xs={4}>
                                <img src={Proveedor} className={classes.icon} alt="Proveedores"/>
                            </Grid>


                        </Grid>
                    </Grid>
                </Grid>

                <Footer/>
            </div>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);