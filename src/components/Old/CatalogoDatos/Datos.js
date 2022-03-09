import React from 'react';
import {withStyles} from '@mui/styles';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import {Typography} from "@mui/material"
import Tabla from './Tabla';
const styles = theme => ({
    root: {
        flexGrow: 1,
        [theme.breakpoints.up('sm')]:{
            marginLeft: '100px',
            marginRight: '100px',
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(3)
        },
        [theme.breakpoints.down('md')]:{
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        }
    },
    paper: {
        padding: theme.spacing(2),
        //textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});



class Datos extends React.Component {

    render(){
        const { classes} = this.props;
        return (
                <div>
                    <div className={classes.root}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant='h6'>
                                    Catálogo de datos anticorrupción
                                </Typography>

                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </Typography>
                                <Tabla/>
                            </Grid>
                        </Grid>

                    </div>

                </div>
        )
    }
}

Datos.propTypes = {
    classes: PropTypes.object.isRequired
};


export default withStyles(styles)(Datos);