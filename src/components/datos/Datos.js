import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tabla from './Tabla';

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

class Datos extends React.Component {

    render(){
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>

                        <Typography variant='title'>
                            Catálogo de datos anticorrupción
                        </Typography>

                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Typography>


                        <Tabla/>





                    </Grid>
                </Grid>
            </div>
        )
    }
}

Datos.propTypes = {
    classes: PropTypes.object.isRequired
};


export default withStyles(styles)(Datos);