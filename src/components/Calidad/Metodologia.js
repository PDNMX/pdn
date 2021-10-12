import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Header from "./Header/Header";
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Footer from "../Home/Footer";
import ExpansionPanels from "./ExpansionPanels";
import Disclaimer from "./Disclaimer";

const styles = theme => ({
    root :{
        flexGrow: 1
    },
    item: {
        maxWidth: 1200,
        paddingTop: 40,
        paddingBottom: 100
    },
    container: {
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1)
    },
    disclaimer: {
        backgroundColor: '#f6f6f6',
        //paddingTop: theme.spacing(1)
    },
    itemDisclaimer:{
        maxWidth: 1200,
        paddingTop: theme.spacing(4),
        paddingBottom : theme.spacing(4),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    }
});

class Metodologia extends React.Component{

    render (){

        const {classes} = this.props;
        return <div className={classes.root}>
            <Header/>

            <Grid container justify="center" className={classes.disclaimer}>
                <Grid item xs={12} className={classes.itemDisclaimer}>
                    <Disclaimer/>
                </Grid>
            </Grid>


            <Grid container spacing={0} className={classes.container} justify="center">
                <Grid item xs={12} className={classes.item}>
                    <ExpansionPanels/>
                </Grid>
            </Grid>
            <Footer/>
        </div>
    }

}

Metodologia.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Metodologia);
