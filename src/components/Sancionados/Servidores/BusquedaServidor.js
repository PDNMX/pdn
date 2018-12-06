import React from 'react';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Visibility from "@material-ui/icons/Search";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import rp from "request-promise";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import SelectReact from "react-select";
import '../../Utils/selectReact.css';
import Typography from "@material-ui/core/Typography/Typography";
import IconReplay from "@material-ui/icons/Replay";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginRight: theme.spacing.unit,
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
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
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
        height: theme.spacing.unit * 2,
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
        let sug = [ {value : '' ,label:'TODAS'}];
        let options = {
            uri: 'https://plataformadigitalnacional.org/api/instituciones_rsps?order=dependencia.asc',
            json: true
        };
        rp(options)
            .then(data => {
                data.map(item => {
                    sug.push({value: item.dependencia, label: item.dependencia});
                });
                this.setState({suggestions: sug});
            }).catch(err => {
            alert("_No se puedó obtener la información");
            console.log(err);
        });
    }

    limpiarBusqueda = ()=>{
        this.props.handleChangeCampo('nombreServidor');
        this.props.handleChangeCampo('procedimiento');
        this.props.handleChangeCampo('institucion');
    };

    render() {
        const {classes, handleChangeCampo, nombreServidor, institucion, theme} = this.props;
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
            <Grid container spacing={8}>
                <Grid item xs={12} md={6}>
                    <FormControl className={classes.formControl}>
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

                    </FormControl>
                </Grid>
                <Grid item xs={12} md={5}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="search"
                            label="NOMBRE DEL SERVIDOR SANCIONADO"
                            type="search"
                            onChange={(e) => handleChangeCampo('nombreServidor', e)}
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
                            InputLabelProps = {{
                                className: classes.fontLight,
                                shrink : true
                            }}
                        />

                    </FormControl>
                </Grid>
                <Grid item xs={12} md={1} className={classes.centrado}>
                    <Tooltip title={'Limpiar'}>
                        <IconReplay className={classes.fontLight} onClick={this.limpiarBusqueda}/>
                    </Tooltip>
                </Grid>
            </Grid>

        );
    }
}

BusquedaServidor.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles, {withTheme: true})(BusquedaServidor);
