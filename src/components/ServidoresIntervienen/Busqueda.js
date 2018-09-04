import React from 'react';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Input from "@material-ui/core/Input/Input";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Visibility from '@material-ui/icons/Search';


const styles = theme => ({
    textField: {
        marginRight: theme.spacing.unit,
    },
    menu: {
        width: 200,
    },
    formControlSelect: {
        [theme.breakpoints.up('sm')]:{
            minWidth: 150,
            marginRight:10,
        },
        [theme.breakpoints.down('sm')]:{
            minWidth:80,
            marginLeft: theme.spacing.unit
        },

    },
    formControlText: {
        [theme.breakpoints.up('sm')]:{
            minWidth: "auto",
            marginRight:10,
        },
        [theme.breakpoints.down('sm')]:{
            maxWidth: 150,
            marginLeft: theme.spacing.unit
        },

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
                <form noValidate autoComplete='on' >
                    <FormControl className={classes.formControlSelect}>
                        <InputLabel  htmlFor="campoSelect" className={classes.fontLight}>Por campo</InputLabel>
                        <Select
                            margin="dense"
                            value={campo}
                            onChange={handleChangeCampo}
                            name="campoSelect"
                            inputProps={{
                                name: 'campo',
                                id: 'campo',
                                className:classes.fontLight
                            }}
                            input={<Input name="campo" id="campo" margin="dense"/>}
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

        );
    }
}

Busqueda.propTypes = {
    classes : PropTypes.object.isRequired
};

export default withStyles(styles)(Busqueda);
