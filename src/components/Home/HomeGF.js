import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Explora from './Explora';
import Sistemas from './Sistemas';
import QueEsLaPDN from './QueEsLaPDN';
const styles = theme => ({
    root: {
        flexGrow :1
    }
});
class HomeGF extends React.Component{

    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Grid container spacing={24} justify="center">
                    <Grid item xs={12}>
                        <Explora/>
                    </Grid>
                    <Grid item xs={12}>
                        <Sistemas/>
                    </Grid>
                    <Grid item xs={12}>
                        <QueEsLaPDN/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

HomeGF.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomeGF);