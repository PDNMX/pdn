import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
    },
    paper: {
        padding : theme.spacing.unit * 2
    }
});

class Controles extends React.Component{

    render(){
        const { classes } = this.props;

        return (
            <div>
                <Paper className={classes.paper}>
                    Controles
                </Paper>
            </div>
        );
    }
}


Controles.propTypes = {
    classes : PropTypes.object.isRequired
};

export default withStyles(styles)(Controles);

