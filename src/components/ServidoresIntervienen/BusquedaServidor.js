import React from 'react';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormControl from "@material-ui/core/FormControl/FormControl";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import rp from "request-promise";
import Grid from "@material-ui/core/Grid/Grid";
import '../Utils/selectReact.css';
import {Typography} from "@material-ui/core"
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from "@material-ui/core/Select";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

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
    button: {
        margin: theme.spacing(2),
        marginRight: theme.spacing(1),
    }

});

class BusquedaServidor extends React.Component {
    state = {
        suggestions: []
    };

    componentDidMount() {
        this.loadData(this.props.nivel)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.nivel !== this.props.nivel) {
            this.loadData(this.props.nivel);
        }
    }
    loadData = nivel =>{
        let sug = [];

        let options = {
            uri: process.env.REACT_APP_HOST_PDNBACK + '/apis/s2/dependencias',
            json: true,
            method: "post",
            body:{
                nivel: nivel
            }
        };
        rp(options)
            .then(data => {
                data.data.forEach(item => {
                    sug.push({value: item, label: item});
                });
                this.setState({
                    suggestions: sug
                });
            }).catch(err => {
            // this.props.handleError(true);
        });
    };

    limpiarBusqueda = () => {
        this.props.handleCleanAll();
    };
    buscar = () => {
        this.props.handleSearch('FIELD_FILTER');
    };

    render() {
        const {
            classes,
            handleChangeCampo,
            nombreServidor,
            apellidoUno,
            apellidoDos,
            procedimiento,
            institucion,
            nivel
        } = this.props;

        return (
            <div>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h6"><b>Busca un servidor público que interviene en procesos de contratación</b></Typography>
                    </Grid>
                    {/* <Grid item xs={12} md={3}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="search"
                                label="RFC"
                                type="search"
                                onChange={(e) => handleChangeCampo('rfc', e)}
                                value={rfc}
                                InputLabelProps={{
                                    className: classes.inputShrink,
                                    shrink: true
                                }}
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
                                InputLabelProps={{
                                    className: classes.inputShrink,
                                    shrink: true
                                }}
                            />

                        </FormControl>
                    </Grid> */}
                    <Grid item xs={12} md={4}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="search"
                                label="Nombre(s)"
                                type="search"
                                onChange={(e) => handleChangeCampo('nombreServidor', e)}
                                value={nombreServidor}
                                InputLabelProps={{
                                    className: classes.inputShrink,
                                    shrink: true
                                }}
                            />

                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="search"
                                label="Primer apellido"
                                type="search"
                                onChange={(e) => handleChangeCampo('apellidoUno', e)}
                                value={apellidoUno}
                                InputLabelProps={{
                                    className: classes.inputShrink,
                                    shrink: true
                                }}
                            />

                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="search"
                                label="Segundo apellido"
                                type="search"
                                onChange={(e) => handleChangeCampo('apellidoDos', e)}
                                value={apellidoDos}
                                InputLabelProps={{
                                    className: classes.inputShrink,
                                    shrink: true
                                }}
                            />

                        </FormControl>
                    </Grid>
                    {<Grid item xs={12} md={4}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="campoSelectProcedimiento"> Tipo de procedimiento</InputLabel>
                        <Select style={{marginTop:'0px'}}
                            value={procedimiento}
                            onChange={(e) => handleChangeCampo('procedimiento', e)}
                            inputProps={{
                                name: 'campoSelectProcedimiento',
                                id: 'campoSelectProcedimiento',
                            }}
                        >
                            <MenuItem value={'Todos'} key={'Todos'}>
                                Todos
                            </MenuItem>
                            <MenuItem value={'CONTRATACIONES'} key={'CONTRATACIONES'}>Contrataciones</MenuItem>
                            <MenuItem value={'CONCESIONES'} key={'CONCESIONES'}>Concesiones</MenuItem>
                            <MenuItem value={'ENAJENACIONES'} key={'ENAJENACIONES'}>Enajenaciones</MenuItem>
                            <MenuItem value={'DICTAMENES'} key={'DICTAMENES'}>Dictamenes</MenuItem>
                        </Select>

                    </FormControl>
                </Grid>}
                    <Grid item xs={12} md={8}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor={'campoSelectInstitucion'}>Institución</InputLabel>
                            <Select style={{marginTop: '0px'}} value={institucion}
                                    onChange={(e) => handleChangeCampo('institucion', e)}
                                    inputProps={{
                                        name: 'campoSelectInstitucion',
                                        id: 'campoSelectInstitucion',
                                    }}
                            >
                                <MenuItem value="ANY" key="ANY">
                                    Cualquiera
                                </MenuItem>
                                {
                                    this.state.suggestions.map((item => {
                                        return <MenuItem value={item.value} key={item.value}>
                                            {item.label}
                                        </MenuItem>
                                    }))
                                }
                            </Select>


                        </FormControl>
                    </Grid>
                    
                    <Grid item md={6} xs={12}>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">Nivel de gobierno</FormLabel>
                            <RadioGroup row
                                        aria-label="gender"
                                        name="gender1"
                                        className={classes.group}
                                        value={nivel}
                                        onChange={(e) => handleChangeCampo('nivel', e)}
                            >
                                <FormControlLabel value="todos" control={<Radio/>} label="Cualquiera"/>
                                <FormControlLabel value="federal" control={<Radio/>} label="Federal"/>
                                <FormControlLabel value="estatal" control={<Radio/>} label="Estatal"/>
                            </RadioGroup>

                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6} align="right">

                                <Button variant="contained" color="secondary" className={classes.button} onClick={this.buscar}>
                                    Buscar
                                </Button>

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
