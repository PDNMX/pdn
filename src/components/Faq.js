import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
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

class Faq extends React.Component{
    render (){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Header/>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography>Preguntas frecuentes</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Faq.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Faq);