import React from 'react';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from '@material-ui/core/InputLabel';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import rp from "request-promise";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import SelectReact from "react-select";
import '../Utils/selectReact.css';
import IconReplay from "@material-ui/icons/Replay";
import IconSearch from "@material-ui/icons/Search";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import {Typography} from "@material-ui/core"
import Button from "@material-ui/core/Button";

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
        width : 'auto',
        overflow : 'hidden',
        textOverflow : 'ellipsis'
    },
    placeholder: {
        fontSize : 16,
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
    centrado:{
        display: 'flex',
       justifyContent: 'center',
       alignItems: 'center'
    },
    flecha:{
        color:'hsl(0,0%,80%)',
        float:'right',


    }
});

function inputComponent({inputRef, ...props}) {
    return <div ref={inputRef} {...props}/>;
}

function Control(props) {
    return (
        <TextField
            fullWidth
            label="INSTITUCIÓN"
            placeholder={'Selecciona'}
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                    id:'inputComponentServidor'
                },
            }}
            InputLabelProps={{
                className: props.selectProps.classes.labelCustom,
                shrink: true,
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 400 : 300,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}


function SingleValue(props) {
    return (
        <div className={props.selectProps.classes.singleValue}>{!props.data.value?'Selecciona una':''} {props.children} </div>
    );
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

const components = {
    'Control' : Control,
    'Menu' : Menu,
    'Option' : Option,
    'SingleValue' : SingleValue,
};

class BusquedaServidor extends React.Component {
    state = {
        suggestions: []
    };

    componentDidMount() {
        let sug = [ {value : '' ,label:'TODAS'}];
        let options = {
            uri: 'https://plataformadigitalnacional.org/api/instituciones?order=institucion.asc',
            json: true
        };
        rp(options)
            .then(data => {
                data.map(item => {
                    return sug.push({value: item.institucion, label: item.institucion});
                });
                this.setState({suggestions: sug});
            }).catch(err => {
            alert("_No se puedó obtener la información");
            console.log(err);
        });
    }

    limpiarBusqueda = ()=>{
        this.props.handleCleanAll();
    };

    buscar = () => {
        this.props.handleSearch('FIELD_FILTER');
    };


    render() {
        const {classes, handleChangeCampo, nombreServidor, procedimiento, institucion, theme} = this.props;
        const selectStyles = {
            input: base => ({
                ...base,
                '& input': {
                    font: 'inherit',
                    color: theme.palette.black.color,
                }
            }),
            placeholder : base => ({
                ...base,
                fontSize: '1em',
                fontWeight: 400
            })
        };

        return (
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="h6">Busca un servidor público</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="search"
                            label="Nombre del servidor"
                            type="search"
                            onChange={(e) => handleChangeCampo('nombreServidor', e)}
                            value={nombreServidor}
                            InputLabelProps = {{
                                className: classes.fontLight,
                                shrink : true
                            }}
                        />

                    </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                    <FormControl className={classes.formControl}>
                        <InputLabel  htmlFor="campoSelectProcedimiento">Categorías</InputLabel>
                        <Select style={{marginTop:'0px'}}
                            value={procedimiento}
                            onChange={(e) => handleChangeCampo('procedimiento', e)}
                            inputProps={{
                                name: 'campoSelectProcedimiento',
                                id: 'campoSelectProcedimiento',
                            }}
                        >
                            <MenuItem value={0}>
                                Selecciona una
                            </MenuItem>
                            <MenuItem value={1}>CONTRATACIONES PÚBLICAS</MenuItem>
                            <MenuItem value={2}>CONCESIONES, LICENCIAS, PERMISOS, AUTORIZACIONES Y PRÓRROGAS</MenuItem>
                            <MenuItem value={3}>ENAJENACIÓN DE BIENES MUEBLES</MenuItem>
                            <MenuItem value={4}>ASIGNACION Y EMISIÓN DE DICTÁMENES DE AVALÚOS NACIONALES</MenuItem>
                        </Select>

                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor={'campoSelectInstitucion'}>Institución</InputLabel>
                        <Select style={{marginTop:'0px'}} value={institucion}
                            onChange={(e) => handleChangeCampo('institucion', e)}
                                inputProps={{
                                    name: 'campoSelectInstitucion',
                                    id: 'campoSelectInstitucion',
                                }}

                        >
                            {
                                this.state.suggestions.map((item => {
                                    return <MenuItem value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                }))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={10}/>
                <Grid item xs={12} md={1} className={classes.centrado}>
                    <Button variant="contained" color="secondary" className={classes.button} onClick={this.buscar}>
                        Buscar
                    </Button>
                </Grid>

                <Grid item xs={12} md={1}  className={classes.centrado}>
                    <Button variant="contained" color="secondary" className={classes.button} onClick={this.limpiarBusqueda}>
                        Limpiar
                    </Button>
                </Grid>
            </Grid>

        );
    }
}

BusquedaServidor.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles, {withTheme: true})(BusquedaServidor);
