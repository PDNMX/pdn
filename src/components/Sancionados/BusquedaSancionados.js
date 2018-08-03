import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        //marginLeft: theme.spacing.unit,
        marginRight: 0,//theme.spacing.unit,
        marginTop: 0,
        width: 500,
    },
    menu: {
        width: 200,
    },
});

class BusquedaSancionados extends React.Component{

    render (){
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete='off'>
                <TextField
                    id="search"
                    label="Buscar datos"
                    type="search"
                    className={classes.textField}
                    margin="normal"
                />
            </form>
        );
    }
}

BusquedaSancionados.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BusquedaSancionados);