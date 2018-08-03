import React from 'react';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Tabs from './Tabs';
//import Paper from '@material-ui/core/Paper';
import BusquedaSancionados from './BusquedaSancionados';

const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 5,
        paddingRight: theme.spacing.unit * 25,
        paddingLeft: theme.spacing.unit * 25,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        //textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class Sancionados extends  React.Component {

    render (){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid containter spacing={24}>
                    <Grid item xs={12}>
                        <Typography variant="title">
                            Servidores públicos y contratistas sancionados
                        </Typography>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Typography>
                        <br/>
                        <Tabs/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Sancionados.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sancionados);