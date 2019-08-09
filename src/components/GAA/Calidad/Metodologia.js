import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Header from "./Header/Header";
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Footer from "../../Home/Footer";
import ScrollToTopButton from '../../Navigation/ScrollToTopButton';
import ExpansionPanels from "./ExpansionPanels";
//import data  from './mora_data';
//import Histogram from './Histogram';

const styles = theme => ({
    root :{
        flexGrow: 1
    },
    item: {
        maxWidth:1000,
        paddingTop: 100,
        paddingBottom: 100
    },
    container: {
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1)
    }
});

class Metodologia extends React.Component{

    render (){

        const {classes} = this.props;
        return <div className={classes.root}>
            <Header/>

            <Grid container spacing={0} className={classes.container} justify="center">
                <Grid item xs={12} className={classes.item}>

                    <ExpansionPanels/>


                    {/*<Histogram data = {data}/>*/}



                </Grid>
            </Grid>
            <Footer/>
            <ScrollToTopButton/>
        </div>
    }

}

Metodologia.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Metodologia);
