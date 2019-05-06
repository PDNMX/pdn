import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
        flexGrow: 1
    }
});

class Dashboard extends React.Component{
    render(){
        const {classes} = this.props;

        return (
            <div className={classes.root}>

            </div>
        )
    }
}


Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);