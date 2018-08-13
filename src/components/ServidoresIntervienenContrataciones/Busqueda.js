import React from 'react';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Input from "@material-ui/core/Input/Input";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',

    },
    textField: {
        marginRight: theme.spacing.unit,
    },
    menu: {
        width: 200,
    },
    formControlSelect: {
        minWidth: 150,
        marginRight:10,
    },
    formControlText: {
        minWidth: 300,
        marginRight:10,
    },

    fontLight: {
        color: theme.palette.fontLight.color,
    },
    '&$focus': {
        color: theme.palette.fontLight.color,
    }
});


class Busqueda extends React.Component{
    render (){
        const { classes,handleSearch,value,handleChangeCampo,campo } = this.props;
        return (
            <div>
                <form className={classes.container} noValidate autoComplete='on' >
                    <FormControl className={classes.formControlSelect} margin="normal">
                        <InputLabel htmlFor="campoSelect" className={classes.fontLight}>Por campo</InputLabel>
                        <Select
                            value={campo}
                            onChange={handleChangeCampo}
                            name="campoSelect"
                            inputProps={{
                                name: 'campo',
                                id: 'campo',
                                className:classes.fontLight
                            }}
                            input={<Input name="campo" id="campo" />}
                            defaultValue={0}
                        >
                            <MenuItem value={0}>
                                <em>Todos</em>
                            </MenuItem>
                            <MenuItem value={2}>Atención o tramitación</MenuItem>
                            <MenuItem value={3}>Resolución</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControlText}>
                        <TextField
                            id="search"
                            label="Buscar datos"
                            type="search"
                            className={classes.textField}
                            margin="normal"
                            onChange={handleSearch}
                            value={value}
                            InputProps={{
                                className: classes.fontLight
                            }}
                            InputLabelProps={{className: classes.fontLight}}
                        />

                    </FormControl>

                </form>
            </div>
        );
    }
}

Busqueda.propTypes = {
    classes : PropTypes.object.isRequired
};

export default withStyles(styles)(Busqueda);
