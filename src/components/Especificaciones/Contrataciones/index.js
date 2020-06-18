import React from "react";
import {withStyles, Divider, Grid} from "@material-ui/core";
import Header from "./Header/Header";
import Intro from "./Intro";
import Licencia from '../Licencia';
import Herramientas from "../Herramientas";
import Footer from "../../Home/Footer";
import ScrollToTopButton from "../../Navigation/ScrollToTopButton";
const styles = theme => ({
    root: {flexGrow: 1},
    rootItem: {
        maxWidth: 1200,
        padding: theme.spacing(1)
    },
    divider:{
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    },
});

const Index = props => {
    const {classes}= props;
    return (
        <div className={classes.root}>
            <Header/>
            <Grid container justify="center">
                <Grid item xs={12} className={classes.rootItem}>
                    <Intro/>
                    <Divider className={classes.divider}/>
                    <Licencia/>
                    <Divider className={classes.divider}/>
                    <Herramientas/>
                </Grid>
            </Grid>
            <Footer/>
            <ScrollToTopButton/>

        </div>
    );
}

export default withStyles(styles)(Index);