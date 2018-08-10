import React from 'react';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Input from "@material-ui/core/Input/Input";
import purple from "@material-ui/core/es/colors/purple";

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
    formControl: {
        minWidth: 120,
        marginRight:10,
    },
    fontLigth: {
        color: theme.palette.fontLigth.color,
        },

});


class Busqueda extends React.Component{
    render (){
        const { classes,handleSearch,value,handleChangeCampo,campo } = this.props;
        return (
            <div>
            <form className={classes.container} noValidate autoComplete='on' >
                <FormControl className={classes.formControl} margin="normal">
                    <InputLabel htmlFor="campoSelect" className={classes.fontLigth}>Por campo</InputLabel>
                    <Select
                        value={campo}
                        onChange={handleChangeCampo}
                        name="campoSelect"
                        inputProps={{
                            name: 'campo',
                            id: 'campo',
                            className:classes.fontLigth
                        }}
                        input={<Input name="campo" id="campo" />}
                        defaultValue={0}
                    >
                        <MenuItem value={0}>
                            <em>Sin filtro</em>
                        </MenuItem>
                        <MenuItem value={1}>Institución</MenuItem>
                        <MenuItem value={2}>Abreviatura</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="search"
                        label="Buscar datos"
                        type="search"
                        className={classes.textField}
                        margin="normal"
                        onChange={handleSearch}
                        value={value}
                        InputProps={{
                            className: classes.fontLigth
                        }}
                        InputLabelProps={{className: classes.fontLigth}}
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
