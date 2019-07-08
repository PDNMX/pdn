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
import '../Utils/selectReact.css';
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
    },
    inputShrink:{
        transform : `scale(1)`
    }
});


class BusquedaServidor extends React.Component {
    state = {
        suggestions: []
    };

    componentDidMount() {
        let sug = [ {value : null ,label:'TODAS'}];
        let id = 0;

        let options = {
            uri: process.env.REACT_APP_HOST_PDNBACK + '/apis/getDependenciasRENIRESP',
            json: true,
            method : "get"
        };
        rp(options)
            .then(data => {
                data.data.forEach(item => {
                    sug.push({value: item, label: item});
                });
                this.setState({suggestions: sug});
            }).catch(err => {
                this.props.handleError(true);
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
        const {classes, handleChangeCampo, nombreServidor, apellidoUno, apellidoDos, procedimiento, institucion, theme} = this.props;
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
                    <Typography variant="h6"><b>Busca un servidor público</b></Typography>
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
                                className: classes.inputShrink,
                                shrink : true
                            }}
                        />

                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="search"
                            label="Apellido Uno"
                            type="search"
                            onChange={(e) => handleChangeCampo('apellidoUno', e)}
                            value={apellidoUno}
                            InputLabelProps = {{
                                className: classes.inputShrink,
                                shrink : true
                            }}
                        />

                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="search"
                            label="Apellido Dos"
                            type="search"
                            onChange={(e) => handleChangeCampo('apellidoDos', e)}
                            value={apellidoDos}
                            InputLabelProps = {{
                                className: classes.inputShrink,
                                shrink : true
                            }}
                        />

                    </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="campoSelectProcedimiento">Procedimiento</InputLabel>
                        <Select style={{marginTop:'0px'}}
                            value={procedimiento}
                            onChange={(e) => handleChangeCampo('procedimiento', e)}
                            inputProps={{
                                name: 'campoSelectProcedimiento',
                                id: 'campoSelectProcedimiento',
                            }}
                        >
                            <MenuItem value={null}>
                                TODOS
                            </MenuItem>
                            <MenuItem value={'CONTRATACIONES'}>CONTRATACIONES</MenuItem>
                            <MenuItem value={'CONCESIONES'}>CONCESIONES</MenuItem>
                            <MenuItem value={'ENAJENACIONES'}>ENAJENACIONES</MenuItem>
                            <MenuItem value={'DICTAMENES'}>DICTAMENES</MenuItem>
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
                <Grid item xs={1}/>
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
