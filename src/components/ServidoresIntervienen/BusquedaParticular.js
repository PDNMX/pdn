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
import Typography from "@material-ui/core/Typography";
import NoSsr from "@material-ui/core/NoSsr";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Grid from "@material-ui/core/Grid/Grid";

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
    },
    root: {
        flexGrow: 1,
        height: 250,
    },
    input: {
        color: theme.palette.fontLight.color,
        minWidth: '150px',
        display : 'contents'
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        minWidth: '150px',
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        color: theme.palette.fontLight.color,
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
});

function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({inputRef, ...props}) {
    return <span id={'prueba'}style={{'display':'contents'}} ref={inputRef} {...props}/>;
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
                               ...props.innerProps
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

function Placeholder(props) {
    return (
        <Typography
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <div className={props.selectProps.classes.singleValue}> {props.children} </div>
    );
}

function ValueContainer(props) {
    return <div>{props.children}</div>;
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}


const components = {
    Control,
    Menu,
    Option,
    SingleValue
};


class BusquedaParticular extends React.Component {
    state = {
        dependencias: [],
        suggestions: [],
        test: null,
    };

    componentDidMount() {
        let aux = [];
        let sug = [];
        let id = 0;

        let options = {
            uri: 'https://204.48.18.61/api/instituciones?order=institucion.asc',
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
            alert("_No se puedó obtener la información");
            console.log(err);
        });


    }


    render() {
        let {classes, handleChangeCampo, nombreParticular, institucion, theme} = this.props;
        let aux = '';
        const selectStyles = {
            input: base => ({
                ...base,
                '& input': {
                    font: 'inherit',
                    color: theme.palette.fontLight.color,
                },
                margin: "dense"
            }),
        };

        return (
            <Grid container>
                <Grid item xs={3}>
                    <FormControl className={classes.formControl}>
                        <Select
                            classes={classes}
                            styles={selectStyles}
                            options={this.state.suggestions}
                            components={components}
                            value={{value: institucion, label: institucion}}
                            onChange={handleChangeCampo('institucion')}
                            id="campoSelectInstitucion"
                        />

                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="search"
                            label="Nombre del particular"
                            type="search"
                            onChange={handleChangeCampo('nombreParticular')}
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
                </Grid>
            </Grid>

        );
    }
}

BusquedaParticular.propTypes = {
    classes: PropTypes.object.isRequired

};

export default withStyles(styles, {withTheme: true})(BusquedaParticular);
