//PANTALLA DE BUSQUEDASERVIDOR, CON SELECT PARA SORT
import React from 'react';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import '../../Utils/selectReact.css';
import {Typography} from "@material-ui/core"
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from "@material-ui/core/Select";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const styles = theme => ({
    formControl: {
        width: '100%'
    },
    '&$focus': {
        color: theme.palette.black.color,
    },
    centrado: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

const tiposSancion = [
    {label: 'Inhabilitado', value: 'I'},
    {label: 'Multado', value: 'M'},
    {label: 'Suspensión del empleo, cargo o comisión', value: 'S'},
    {label: 'Destitución del empleo, cargo o comisión', value: 'D'}
]

const camposOrdenamiento=[
    {label: 'RFC', value: 'rfc'},
    {label: 'CURP', value: 'curp'},
    {label: 'Nombre', value: 'nombres'},
    {label: 'Apellido Uno', value: 'primerApellido'},
    {label: 'Apellido Dos', value: 'segundoApellido'},
    {label: 'Institución', value: 'institucionDependencia'}
]
const tiposOrdenamiento = [
    {label: 'Ascendente', value: 'ASC'},
    {label: 'Descendente', value: 'DESC'}
]

class BusquedaServidor extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            busquedaAvanzada : false
        }
    }

    handleBusquedaAvanzada=()=>{
        this.setState({busquedaAvanzada: !this.state.busquedaAvanzada })
    }

    render() {
        const {classes, handleChangeCampo, nombreServidor, apellidoUno, apellidoDos, rfc, curp, institucion, nivel, tipoSancion,campoOrden,tipoOrden, institucionesLista} = this.props;
        return (
            <div>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography><b>Busca un servidor público sancionado</b></Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="search"
                                label="Nombre(s)"
                                type="search"
                                onChange={(e) => handleChangeCampo('nombresServidor', e)}
                                value={nombreServidor}
                            />

                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="search"
                                label="Apellido Uno"
                                type="search"
                                onChange={(e) => handleChangeCampo('primerApellido', e)}
                                value={apellidoUno}
                            />

                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="search"
                                label="Apellido Dos"
                                type="search"
                                onChange={(e) => handleChangeCampo('segundoApellido', e)}
                                value={apellidoDos}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="demo-mutiple-checkbox-label">Tipo sanción</InputLabel>
                            <Select displayEmpty
                                    id="demo-mutiple-checkbox"
                                    multiple
                                    value={tipoSancion}
                                    onChange={e => handleChangeCampo('tipoSancion', e)}
                                    input={<Input/>}
                                    renderValue={
                                        selected => {
                                            if (selected.length === 0) {
                                                return <em>Cualquiera</em>;
                                            }
                                            return selected.map(element => element.label).join(', ')
                                            //selected.join(', ')
                                        }
                                    }

                            >
                                <MenuItem disabled value={[]}>
                                    <em>Cualquiera</em>
                                </MenuItem>
                                {tiposSancion.map(tipo => (
                                    <MenuItem key={tipo.value} value={tipo}>
                                        <Checkbox checked={tipoSancion.indexOf(tipo) > -1}/>
                                        <ListItemText primary={tipo.label}/>
                                    </MenuItem>

                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                Institución
                            </InputLabel>
                            <Select value={institucion}
                                    onChange={(e) => handleChangeCampo('institucionDependencia', e)}
                                    displayEmpty
                            >
                                <MenuItem value="" key={-1}><em>Cualquiera</em></MenuItem>
                                {
                                    institucionesLista.map((item => {
                                        return <MenuItem value={item.value} key={item.key}>
                                            {item.label}
                                        </MenuItem>
                                    }))
                                }
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">Nivel</FormLabel>
                            <RadioGroup row
                                        aria-label="gender"
                                        name="gender1"
                                        className={classes.group}
                                        value={nivel}
                                        onChange={(e) => handleChangeCampo('nivel', e)}
                            >
                                <FormControlLabel value="todos" control={<Radio/>} label="Todos"/>
                                <FormControlLabel value="federal" control={<Radio/>} label="Federal"/>
                                <FormControlLabel value="estatal" control={<Radio/>} label="Estatal"/>
                            </RadioGroup>

                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={() => this.handleBusquedaAvanzada()}
                                startIcon={this.state.busquedaAvanzada?<ExpandLessIcon/>:<ExpandMoreIcon />}
                        >Búsqueda avanzada</Button>
                    </Grid>

                    {this.state.busquedaAvanzada && <Grid item xs={12} md={3}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="search"
                                label="CURP"
                                type="search"
                                onChange={(e) => handleChangeCampo('curp', e)}
                                value={curp}
                            />

                        </FormControl>
                    </Grid>}
                    {this.state.busquedaAvanzada && <Grid item xs={12} md={3}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="search"
                                label="RFC"
                                type="search"
                                onChange={(e) => handleChangeCampo('rfc', e)}
                                value={rfc}
                            />

                        </FormControl>
                    </Grid>}
                    {this.state.busquedaAvanzada  && <Grid item xs={12} md={3}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="demo-mutiple-checkbox-label">Ordenar por</InputLabel>
                            <Select displayEmpty
                                    id="demo-mutiple-checkbox"
                                    value={campoOrden}
                                    onChange={e => handleChangeCampo('campoOrden', e)}
                                    input={<Input/>}
                                    renderValue={
                                        selected => {
                                            if (selected.length === 0) {
                                                return <em>Ninguno</em>;
                                            }
                                            return selected.label
                                        }
                                    }

                            >
                                <MenuItem  value={''}>
                                    <em>Ninguno</em>
                                </MenuItem>
                                {camposOrdenamiento.map(tipo => (
                                    <MenuItem key={tipo.value} value={tipo}>
                                        <ListItemText primary={tipo.label}/>
                                    </MenuItem>

                                ))}
                            </Select>
                        </FormControl>
                    </Grid>}
                    {this.state.busquedaAvanzada && <Grid item xs={12} md={3}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="demo-mutiple-checkbox-label">Tipo ordenamiento</InputLabel>
                            <Select displayEmpty
                                    id="demo-mutiple-checkbox"
                                    value={tipoOrden}
                                    onChange={e => handleChangeCampo('tipoOrden', e)}
                                    input={<Input/>}
                                    renderValue={
                                        selected => {
                                            if (selected.length === 0) {
                                                return <em>Ninguno</em>;
                                            }
                                            return selected.label
                                        }
                                    }

                            >
                                <MenuItem  value={''}>
                                    <em>Ninguno</em>
                                </MenuItem>
                                {tiposOrdenamiento.map(tipo => (
                                    <MenuItem key={tipo.value} value={tipo}>
                                        <ListItemText primary={tipo.label}/>
                                    </MenuItem>

                                ))}
                            </Select>
                        </FormControl>
                    </Grid>}

                    <Grid item md={10}/>
                    <Grid item xs={12} md={1} className={classes.centrado}>
                        <Button variant="contained" color="secondary" className={classes.button} onClick={()=>this.props.handleSearch('FIELD_FILTER')}>
                            Buscar
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={1} className={classes.centrado}>
                        <Button variant="contained" color="secondary" className={classes.button}
                                onClick={()=>this.props.handleCleanAll()}>
                            Limpiar
                        </Button>
                    </Grid>

                </Grid>
            </div>
        );
    }
}

BusquedaServidor.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles, {withTheme: true})(BusquedaServidor);
