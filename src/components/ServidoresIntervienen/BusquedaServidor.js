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

class BusquedaServidor extends React.Component {
    state = {
        instituciones: []
    };
    componentDidMount() {
        let aux = [];
        let id = 0;
        let options = {
            uri: 'http://204.48.18.61/api/instituciones',
            json: true
        };
        rp(options)
            .then(data => {
                data.map(item => {
                    aux.push({id: id++, nombre: item.institucion});
                });
                this.setState({instituciones: aux});
            }).catch(err => {
                alert("_No se puedó obtener la información");
            console.log(err);
        });
    }

    render() {
        const {classes, handleChangeCampo,nombreServidor, procedimiento, institucion} = this.props;
        return (
            <div>
                <form noValidate autoComplete='on'>
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink htmlFor="campoSelectProcedimiento" className={classes.fontLight}>Categoría</InputLabel>
                        <Select
                            margin="dense"
                            value={procedimiento}
                            onChange={(e) => handleChangeCampo('procedimiento', e)}
                            name="campoSelectProcedimiento"
                            inputProps={{
                                name: 'procedimiento',
                                id: 'procedimiento',
                                className: classes.fontLight
                            }}
                            input={<Input margin="dense"/>}
                        >
                            <MenuItem value={0}>
                                <em>Todos</em>
                            </MenuItem>
                            <MenuItem value={1}>CONTRATACIONES PÚBLICAS</MenuItem>
                            <MenuItem value={2}>CONCESIONES,LICENCIAS, PERMISOS, AUTORIZACIONES Y PRÓROOGAS</MenuItem>
                            <MenuItem value={3}>ENAJENACIÓN DE BIENES MUEBLES</MenuItem>
                            <MenuItem value={4}>ASIGNACION Y EMISIÓN DE DICTÁMENES DE AVALÚOS NACIONALES</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink htmlFor="campoSelectInstitucion" className={classes.fontLight}>Unidad</InputLabel>
                        <Select
                            margin="dense"
                            value={institucion}
                            onChange={(e) => handleChangeCampo('institucion', e)}
                            name="campoSelectInstitucion"
                            inputProps={{
                                name: 'institucion',
                                id: 'institucion',
                                className: classes.fontLight
                            }}
                            input={<Input margin="dense"/>}
                        >
                            <MenuItem key = {0} value={''}>
                                <em>Todos</em>
                            </MenuItem>
                            {this.state.instituciones.map(institucion =>
                                <MenuItem key={institucion.id} value={institucion.nombre}>{institucion.nombre}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="search"
                            label="Nombre del servidor"
                            type="search"
                            margin="normal"
                            onChange={(e) => handleChangeCampo('nombreServidor',e)}
                            value={nombreServidor}
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

BusquedaServidor.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BusquedaServidor);
