import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Explora from './Explora';
import Sistemas from './Sistemas';
import QueEsLaPDN from './QueEsLaPDN';
import Footer from './Footer';
import Bandita from "./Bandita";
import Banner from "../VideoBanner/VideoBanner";
import AlertDialog from "./AlertDialog";

import BarraFea from "./BarraFea";

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
});

class Home extends React.Component{

    render(){
        const { classes } = this.props;
        return(
                <div className={classes.root}>
                    <Banner/>
                    <BarraFea/>
                    <Grid container spacing={0} justify="center">
                        <Grid item xs={12} className={classes.item}>
                            <Explora/>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0} justify="center" className={classes.sistemas}>
                        <Grid item xs={12} className={classes.item}>
                            <Sistemas/>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0} justify="center">
                        <Grid item xs={12} className={classes.item}>
                           <QueEsLaPDN/>
                        </Grid>
                    </Grid>

                    <Footer/>
                    <Bandita/>
                    <AlertDialog/>
                </div>

        );
    }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);