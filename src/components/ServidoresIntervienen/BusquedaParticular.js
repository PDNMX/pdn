import React from 'react';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Visibility from "@material-ui/icons/Search";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import Input from "@material-ui/core/Input/Input";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import rp from "request-promise"


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
        minWidth: "150px",
        marginRight: 10,
    },
    fontLight: {
        color: theme.palette.fontLight.color,
    },
    '&$focus': {
        color: theme.palette.fontLight.color,
    }
});

class BusquedaParticular extends React.Component {
    state = {
        dependencias: []
    };
    componentDidMount() {
        let aux = [];
        let id = 0;
        let options = {
            uri: 'http://204.48.18.61/api/proveedores_sancionados',
            json: true
        };
        rp(options)
            .then(data => {
                data.map(item => {
                    aux.push({id: id++, nombre: item.dependencia});
                });
                this.setState({instituciones: aux});
            }).catch(err => {
            alert("_No se puedó obtener la información");
            console.log(err);
        });
    }

    render() {
        const {classes, handleChangeCampo,nombreParticular, dependencia} = this.props;
        return (
            <div>
                <form noValidate autoComplete='on'>
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink htmlFor="campoSelectDependencia" className={classes.fontLight}>Unidad</InputLabel>
                        <Select
                            margin="dense"
                            value={dependencia}
                            onChange={(e) => handleChangeCampo('dependencia', e)}
                            name="campoSelectDependencia"
                            inputProps={{
                                name: 'dependencia',
                                id: 'dependencia',
                                className: classes.fontLight
                            }}
                            input={<Input margin="dense"/>}
                        >
                            <MenuItem key = {0} value={''}>
                                <em>Todos</em>
                            </MenuItem>
                            {this.state.dependencias.map(dependencia =>
                                <MenuItem key={dependencia.id} value={dependencia.nombre}>{dependencia.nombre}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="search"
                            label="Nombre del particular"
                            type="search"
                            margin="normal"
                            onChange={(e) => handleChangeCampo('nombreParticular',e)}
                            value={nombreParticular}
                            InputProps={{
                                className: classes.fontLight,
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton className={classes.fontLight}>
                                            <Visibility/>
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

BusquedaParticular.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BusquedaParticular);
