import React from 'react';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        //marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 500,
    },
    menu: {
        width: 200,
    },
});

class Busqueda extends React.Component{

    /*
    state = {
        name: 'Cat in the Hat',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };*/


    render (){
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete='on'>
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

Busqueda.propTypes = {
    classes : PropTypes.object.isRequired
};

export default withStyles(styles)(Busqueda);
