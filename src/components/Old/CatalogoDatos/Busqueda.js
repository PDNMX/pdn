import React from 'react';
import {TextField, MenuItem, Select, InputLabel, FormControl, Input, InputAdornment, IconButton} from '@mui/material';
import {withStyles} from '@mui/styles';
import PropTypes from 'prop-types';
import Visibility from "@mui/icons-material/Search";
//mport purple from "@material-ui/core/es/colors/purple";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',

    },
    textField: {
        marginRight: theme.spacing(1),
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
        color: theme.palette.text.main
    },
    '&$focus': {
        color: theme.palette.text.main,
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
                                className:classes.fontLight,
                            }}
                            input={<Input name="campo" id="campo" />}
                            defaultValue={0}
                        >
                            <MenuItem value={0}>
                                <em>Todos</em>
                            </MenuItem>
                            <MenuItem value={1}>Institución</MenuItem>
                            <MenuItem value={2}>Abreviatura</MenuItem>
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
                                className: classes.fontLight,
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton className={classes.fontLight}>
                                            <Visibility />
                                        </IconButton>
                                    </InputAdornment>
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
