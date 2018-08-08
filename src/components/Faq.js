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
        paddingTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 5,
        [theme.breakpoints.up('sm')]:{
            marginLeft: '100px',
            marginRight: '100px'
        },
        [theme.breakpoints.down('sm')]:{
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit
        }
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
            <div>
                <Header/>
                <div className={classes.root}>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Typography>Preguntas frecuentes</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

Faq.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Faq);