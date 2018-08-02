import React from 'react';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Header from "./Header/Header";
const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 5
    },
    paper: {
        padding: theme.spacing.unit * 2,
        //textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});


class About extends React.Component {

    render(){
        const { classes } = this.props;

        return (
            <div className={classes.root}>
               <Header/>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper className = {classes.paper}>
                            <Typography>
                                Acerca de ...
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

About.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(About);