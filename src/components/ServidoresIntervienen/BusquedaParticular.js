import React from 'react';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import rp from "request-promise";
import Grid from "@material-ui/core/Grid/Grid";
import {Typography} from "@material-ui/core"
import Button from "@material-ui/core/Button/Button";
import InputLabel from '@material-ui/core/InputLabel';

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
        textOverflow: 'ellipsis'
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
    inputShrink:{
        transform : `scale(1)`
    }
});



class BusquedaParticular extends React.Component {
    state = {
        suggestions: []
    };

    componentDidMount() {
        let sug = [ {value : null ,label:'TODAS'}];
        let id = 0;

        let options = {
            uri: process.env.REACT_APP_HOST_PDNBACK + '/apis/getDependenciasParticulares',
            json: true,
            method: "post"
        };
        rp(options)
            .then(data => {
                data.data.forEach(item => {
                    sug.push({value: item, label: item});
                });
                this.setState({suggestions: sug});
            }).catch(err => {
            alert("_No se pudo obtener la información");
            console.log(err);
        });


    }

    limpiarBusqueda = () => {
        this.props.handleCleanAll();
    };

    buscar = () => {
        this.props.handleSearch('FIELD_FILTER');
    };

    render() {
        let {classes, handleChangeCampo, nombreParticular, numeroExpediente, institucion, theme} = this.props;

        return (
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="h6" paragraph><b>Busca un particular sancionado</b></Typography>
                </Grid>
                <Grid item md={6} xs={12}>
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
                    </FormControl>
                </Grid>
                <Grid item md={3} xs={12}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="search"
                            label="Nombre/Razón social particular sancionado"
                            type="search"
                            onChange={(e) => handleChangeCampo('nombreParticular', e)}
                            value={nombreParticular}
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
                            label="Número expediente"
                            type="search"
                            onChange={(e) => handleChangeCampo('numeroExpediente', e)}
                            value={numeroExpediente}
                            InputLabelProps={{
                                className: classes.inputShrink,
                                shrink: true
                            }}
                        />

                    </FormControl>
                </Grid>

                <Grid item md={10}/>
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

        );
    }
}

BusquedaParticular.propTypes = {
    classes: PropTypes.object.isRequired

};

export default withStyles(styles, {withTheme: true})(BusquedaParticular);
