import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Header from "./Header";
import Grid from "@material-ui/core/Grid/Grid";
import Footer from "../../Home/Footer";

const styles = theme => ({
    root: {
        flexGrow: 1
    }
});

class Dashboard extends React.Component {
    render(){
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Header/>
                <Grid container spacing={0} justify='center'>
                    <Grid item xs={12} className={classes.section}>
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