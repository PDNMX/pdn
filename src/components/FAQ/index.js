import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Header from "../PDNAppBar/PDNAppBar";
import PDNLinks from "../PDNLinks/PDNLinks";
import Footer from "../Footer/Footer";

const styles = theme => ({
    root:{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
    },
    contents: {
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
            <div className={classes.root}>
                <Header/>
                <div className={classes.contents}>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Typography variant="title">
                                    Preguntas frecuentes
                                </Typography>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
                <PDNLinks/>
                <Footer/>
            </div>
        );
    }
}

Faq.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Faq);