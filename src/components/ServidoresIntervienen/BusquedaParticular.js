import React from 'react';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Search";
import Select from "react-select";
import MenuItem from "@material-ui/core/MenuItem";
import rp from "request-promise";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid/Grid";
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
        width : '100%'
    },
    fontLight: {
        color: theme.palette.fontLight.color,
    },
    root: {
        flexGrow: 1,
        height: 250,
    },
    input: {
        color: theme.palette.fontLight.color,

        display : 'contents',
    },
    '&$focus': {
        color: theme.palette.fontLight.color,
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
        color: theme.palette.fontLight.color,
        width : 'auto',
        overflow : 'hidden',
        textOverflow : 'ellipsis'
    },
    placeholder: {
        fontSize: 16,
        color: theme.palette.fontLight.color
    },
    paper: {
        position: 'absolute',
        zIndex: 20,

    },
    divider: {
        height: theme.spacing.unit * 2,
    },
    labelCustom: {
        color: theme.palette.fontLight.color,
    },
    centrado:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
}
});



function inputComponent({inputRef, ...props}) {
    return <div ref={inputRef} {...props}/>;
}

function Control(props) {
    return (
        <TextField
                       fullWidth
                       label="Unidad"
                       placeholder={'TODAS'}
                       InputProps={{
                           inputComponent,
                           inputProps: {
                               className: props.selectProps.classes.input,
                               inputRef: props.innerRef,
                               children: props.children,
                               ...props.innerProps,
                               id : 'inputComponentParticular'
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
        <div className={props.selectProps.classes.singleValue} > {props.children} </div>
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
    'Control':Control,
    'Menu':Menu,
    'Option':Option,
    'SingleValue':SingleValue
};


class BusquedaParticular extends React.Component {
    state = {
        dependencias: [],
        suggestions: []
    };

    componentDidMount() {
        let aux = [];
        let sug = [];
        let id = 0;

        let options = {
            uri: 'https://plataformadigitalnacional.org/api/instituciones?order=institucion.asc',
            json: true
        };
        rp(options)
            .then(data => {
                data.map(item => {
                    aux.push({id: id++, nombre: item.institucion});
                    sug.push({value: item.institucion, label: item.institucion});
                });
                this.setState({dependencias: aux, suggestions: sug});
            }).catch(err => {
            alert("_No se pudo obtener la información");
            console.log(err);
        });


    }

    limpiarBusqueda = ()=>{
        this.props.handleChangeCampo('nombreParticular');
        this.props.handleChangeCampo('institucion');

    };

    render() {
        let {classes, handleChangeCampo, nombreParticular, institucion, theme} = this.props;

        const selectStyles = {
            input: base => ({
                '& input': {
                    font: 'inherit',
                    color: theme.palette.fontLight.color,
                },
            })
        };

        return (
            <Grid container spacing={8}>
                <Grid item md={6} xs={12}>
                    <FormControl className={classes.formControl}>
                        <Select
                            classes={classes}
                            styles={selectStyles}
                            options={this.state.suggestions}
                            components={components}
                            value={{value: institucion, label: institucion}}
                            onChange={(e) => handleChangeCampo('institucion',e)}
                            id="campoSelectInstitucion"
                        />
                    </FormControl>
                </Grid>
                <Grid item md={5} xs={12}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="search"
                            label="Nombre del particular"
                            type="search"
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

BusquedaParticular.propTypes = {
    classes: PropTypes.object.isRequired

};

export default withStyles(styles, {withTheme: true})(BusquedaParticular);
