import React from 'react';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormControl from "@material-ui/core/FormControl/FormControl";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import rp from "request-promise";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import SelectReact from "react-select";
import '../../Utils/selectReact.css';
import {Typography} from "@material-ui/core"
import Button from '@material-ui/core/Button';
import InputLabel from "@material-ui/core/es/InputLabel";
import Select from "@material-ui/core/Select";

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
        display: 'contents',
        id:'test'
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
        textOverflow : 'ellipsis',
        whiteSpace : 'nowrap'
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
    }
});

function inputComponent({inputRef, ...props}) {
    return <div ref={inputRef} {...props}/>;
}

function Control(props) {
    return (
        <TextField
            fullWidth
            label="INSTITUCIÓN SANCIONADORA"
            placeholder={'Selecciona una'}
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
        <div className={props.selectProps.classes.singleValue}> {!props.data.value?'Selecciona una':''} {props.children} </div>
    );
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

const components = {
    'Control' : Control,
    'Menu' : Menu,
    'Option' : Option,
    'SingleValue' : SingleValue,
    'Placeholder': Placeholder
};

class BusquedaServidor extends React.Component {
    state = {
        suggestions: []
    };

    componentDidMount() {
        let sug = [ {value : 'TODAS' ,label:'TODAS'}];
        let options = {
            uri: process.env.REACT_APP_HOST_PDNBACK+'/apis/getDependenciasServidores',
            json: true,
            method: "GET"
        };
        rp(options)
            .then(data => {
                data.data.forEach(item =>{
                    sug.push({value: item, label: item});
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
        const {classes, handleChangeCampo, nombreServidor, apellidoUno, apellidoDos, rfc,curp,institucion, theme} = this.props;
        const selectStyles = {
            input: base => ({
                ...base,
                '& input': {
                    font: 'inherit',
                    color: theme.palette.fontLight.color,
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
                    <Typography variant="h6">Busca un servidor público sancionado</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="search"
                            label="RFC"
                            type="search"
                            onChange={(e) => handleChangeCampo('rfc', e)}
                            value={rfc}
                            InputLabelProps = {{
                                className: classes.fontLight,
                                shrink : true
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
                            InputLabelProps = {{
                                className: classes.fontLight,
                                shrink : true
                            }}
                        />

                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor={'campoSelectInstitucion'}>Institución</InputLabel>
                        <Select style={{marginTop:'0px'}}value={institucion} onChange={(e) => handleChangeCampo('institucion', e)} inputProps={{
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
                            label="NOMBRE DEL SERVIDOR SANCIONADO"
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
                <Grid item xs={12} md={3}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="search"
                            label="APELLIDO UNO"
                            type="search"
                            onChange={(e) => handleChangeCampo('apellidoUno', e)}
                            value={apellidoUno}
                            InputLabelProps = {{
                                className: classes.fontLight,
                                shrink : true
                            }}
                        />

                    </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="search"
                            label="APELLIDO DOS"
                            type="search"
                            onChange={(e) => handleChangeCampo('apellidoDos', e)}
                            value={apellidoDos}
                            value={apellidoDos}
                            InputLabelProps = {{
                                className: classes.fontLight,
                                shrink : true
                            }}
                        />

                    </FormControl>
                </Grid>

                <Grid item md={1}/>
                <Grid item xs={12} md={1} className={classes.centrado}>
                    <Button variant="contained" color="secondary" className={classes.button} onClick={this.buscar}>
                        Buscar
                    </Button>
                </Grid>
                <Grid item xs={12} md={1} className={classes.centrado}>
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
