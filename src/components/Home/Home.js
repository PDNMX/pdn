import React from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Explora from './Explora';
import Sistemas from './Sistemas';
import Footer from './Footer';
import Banner from "../VideoBanner/VideoBanner";
import AlertDialog from "./AlertDialog";

import BarraFea from "./BarraFea";
import BlogPosts from "./BlogPosts/BlogPosts";
import AvanceInterconexion from "./AvanceInterconexion/Avance";
import MercadoDigital from "./MercadoDigital";

const styles = theme => ({
    root: {
        flexGrow :1,
    },
    item: {
        maxWidth: 1200
    },
    sistemas: {
        background: '#34b3eb'
    },
    mercado:{
        backgroundColor: "#f6f6f6"
    },
});

const Home = props => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <Banner/>
            <BarraFea/>
            <Grid container spacing={0} justifyContent="center">
                <Grid item xs={12} className={classes.item}>
                    <Explora/>
                </Grid>
            </Grid>

            <Grid container spacing={0} justifyContent="center" className={classes.sistemas}>
                <Grid item xs={12} className={classes.item}>
                    <Sistemas/>
                </Grid>
            </Grid>

            <Grid container spacing={0} justifyContent="center" >
                <Grid item xs={12} className={classes.item}>
                    <AvanceInterconexion/>
                </Grid>
            </Grid>

            <Grid container spacing={0} justifyContent="center" className={classes.mercado}>
                <Grid item xs={12} className={classes.item}>
                    <MercadoDigital/>
                </Grid>
            </Grid>

            <Grid container spacing={0} justifyContent="center">
                <Grid item xs={12} className={classes.item}>
                    <BlogPosts/>
                </Grid>
            </Grid>

            <Footer/>
            <AlertDialog/>
        </div>
    );
}

export default withStyles(styles)(Home);
