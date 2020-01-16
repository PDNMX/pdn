import React from 'react';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormControl from "@material-ui/core/FormControl/FormControl";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import rp from "request-promise";
import Grid from "@material-ui/core/Grid/Grid";
import '../../Utils/selectReact.css';
import {Typography} from "@material-ui/core"
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from "@material-ui/core/Select";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormHelperText from "@material-ui/core/FormHelperText";
import Autocomplete from '@material-ui/lab/Autocomplete';
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginRight: theme.spacing(1),
    },
    formControl: {
        width: '100%'
    },
    fontLight: {
        color: theme.palette.black.color,
    },
    '&$focus': {
        color: theme.palette.black.color,
    },
    root: {
        flexGrow: 1,
        height: 250,
    },
    input: {
        color: theme.palette.black.color,
        display: 'contents'
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
    },
    noOptionsMessage: {
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    },
    singleValue: {
        color: theme.palette.black.color,
        width: 'auto',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    placeholder: {
        fontSize: 16,
        color: theme.palette.black.color
    },
    paper: {
        position: 'absolute',
        zIndex: 20,

    },
    divider: {
        height: theme.spacing(2),
    },
    labelCustom: {
        color: theme.palette.black.color,
    },
    centrado: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputShrink: {
        transform: `scale(1)`
    },


});


class BusquedaServidor extends React.Component {
    state = {
        suggestions: []
    };

    componentDidMount() {
        this.loadData(this.props.nivel);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.nivel !== this.props.nivel) {
            this.loadData(this.props.nivel);
        }
    }

    loadData = (nivel) => {
        let sug = [{value: null, label: 'TODAS'}];
        let options = {
            uri: process.env.REACT_APP_HOST_PDNBACK + '/apis/getDependenciasServidores',
            json: true,
            method: "post",
            body: {
                nivel: nivel
            }
        };
        rp(options)
            .then(data => {
                data.data.forEach(item => {
                    sug.push({value: item, label: item});
                });
                this.setState({suggestions: sug});
            }).catch(err => {
            this.props.handleError(true);
        });
    }
    limpiarBusqueda = () => {
        this.props.handleCleanAll();
    };
    buscar = () => {
        this.props.handleSearch('FIELD_FILTER');
    };

    render() {
        const {classes, handleChangeCampo, nombreServidor, apellidoUno, apellidoDos, rfc, curp, institucion, nivel, tipoSancion} = this.props;

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
                                label="RFC"
                                type="search"
                                onChange={(e) => handleChangeCampo('rfc', e)}
                                value={rfc}
                            />

                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="search"
                                label="CURP"
                                type="search"
                                onChange={(e) => handleChangeCampo('curp', e)}
                                value={curp}
                            />

                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                Institución
                            </InputLabel>
                            <Select style={{marginTop: '0px'}} value={institucion}
                                    onChange={(e) => handleChangeCampo('institucion', e)}
                                    inputProps={{
                                        name: 'campoSelectInstitucion',
                                        id: 'campoSelectInstitucion',
                                    }}
                                    displayEmpty
                            >
                                <MenuItem value="" key={""}><em>Cualquiera</em></MenuItem>
                                {
                                    this.state.suggestions.map((item => {
                                        return <MenuItem value={item.value} key={item.value}>
                                            {item.label}
                                        </MenuItem>
                                    }))
                                }
                            </Select>
                            {
                                /*
                                <SelectReact
                                classes={classes}
                                styles={selectStyles}
                                options={this.state.suggestions}
                                components={components}
                                value={{value: institucion, label: institucion}}
                                onChange={(e) => handleChangeCampo('institucion', e)}
                                id="campoSelectInstitucion"
                                placeholder = {'TODAS'}
                            />
                                */
                            }


                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="search"
                                label="Nombre(s)"
                                type="search"
                                onChange={(e) => handleChangeCampo('nombreServidor', e)}
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
                                onChange={(e) => handleChangeCampo('apellidoUno', e)}
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
                                onChange={(e) => handleChangeCampo('apellidoDos', e)}
                                value={apellidoDos}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item md={3}/>
                    <Grid item xs={12} md={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="demo-simple-select-placeholder-label-label"
                                        htmlFor={'campoSelectSancion'}>
                                Tipo Sanción
                            </InputLabel>
                            <Autocomplete
                                multiple
                                id="tags-standard"
                                options={[
                                    {title: 'Inhabilitado', value: 'I'},
                                    {title: 'Multado', value: 'M'},
                                    {title: 'Suspensión del empleo, cargo o comisión', value: 'S'},
                                    {title: 'Destitución del empleo, cargo o comisión', value: 'D'}
                                ]}
                                getOptionLabel={option => option.title}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        label="Tipo Sanción"
                                        placeholder="Selecciona las que desees"
                                        fullWidth
                                    />
                                )}
                            />
                           {/* <Select2
                                classes={classes}
                                TextFieldProps={{
                                    label: 'Tipo Sanción',
                                    InputLabelProps: {
                                        htmlFor: 'react-select-single',
                                        shrink: true,
                                    },

                                }}
                                placeholder="Puedes seleccionar más de un tipo de sanción"
                                onChange={(e) => handleChangeCampo('tipoSancion', e)}
                                value={tipoSancion}
                                isMulti
                                options={[
                                    {label: 'Inhabilitado', value: 'I'},
                                    {label: 'Multado', value: 'M'},
                                    {label: 'Suspensión del empleo, cargo o comisión', value: 'S'},
                                    {label: 'Destitución del empleo, cargo o comisión', value: 'D'}
                                ]}
                            />*/}

                            { /*<Select style={{marginTop: '0px'}} value={tipoSancion}
                                    onChange={(e) => handleChangeCampo('tipoSancion', e)}
                                    displayEmpty
                                    inputProps={{
                                        name: 'campoSelectSancion',
                                        id: 'campoSelectSancion',

                                    }}
                                    multiple
                            >
                                <MenuItem value={""} key={"T"} disabled>Cualquiera</MenuItem>
                                <MenuItem value={"I"} key={"I"}>Inhabilitado</MenuItem>
                                <MenuItem value={"M"} key={"M"}>Multado</MenuItem>
                                <MenuItem value={"S"} key={"S"}>Suspensión del empleo, cargo o comisión</MenuItem>
                                <MenuItem value={"D"} key={"D"}>Destitución del empleo, cargo o comisión</MenuItem>
                                }
                            </Select>*/}
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
                    <Grid item xs={12} md={1} className={classes.centrado}>
                        <Button variant="contained" color="secondary" className={classes.button} onClick={this.buscar}>
                            Buscar
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={1} className={classes.centrado}>
                        <Button variant="contained" color="secondary" className={classes.button}
                                onClick={this.limpiarBusqueda}>
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
