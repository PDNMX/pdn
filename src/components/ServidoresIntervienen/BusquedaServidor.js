import React from 'react';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core"
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from "@material-ui/core/Select";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import TipoProcedimiento from "./TipoProcedimiento";

const styles = theme => ({
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
    inputShrink: {
        transform: `scale(1)`
    },
    button: {
        margin: theme.spacing(2),
        marginRight: theme.spacing(1),
    }
});

const BusquedaServidor = props => {

    const {
        classes,
        handleSetState,
        nombres,
        apellidoUno,
        apellidoDos,
        tipoProcedimiento,
        asignarTipoProcedimiento,
        entities,
        current_entity,
        nivel,
        changeLevel
    } = props;

    const limpiarBusqueda = () => {
        props.handleCleanAll();
    };

    const buscar = () => {
        props.handleSearch();
    };

    return (
        <div>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="h6">
                        <b>Busca servidores públicos que intervienen en contrataciones, concesiones, enajenaciones y dictámenes</b>
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="search"
                            label="Nombre(s)"
                            type="search"
                            onChange={(e) => handleSetState('nombres', e)}
                            value={nombres}
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
                            onChange={(e) => handleSetState('apellidoUno', e)}
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
                            onChange={(e) => handleSetState('apellidoDos', e)}
                            value={apellidoDos}
                            InputLabelProps={{
                                className: classes.inputShrink,
                                shrink: true
                            }}
                        />

                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>

                    <TipoProcedimiento
                        tipoProcedimiento={tipoProcedimiento}
                        asignarTipoProcedimiento={asignarTipoProcedimiento}
                    />

                </Grid>
                <Grid item xs={12} md={8}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor={'campoSelectInstitucion'}>Institución</InputLabel>
                        <Select
                            //style={{marginTop: '0px'}}
                            value={current_entity}
                            onChange={(e) => handleSetState('current_entity', e)}
                            inputProps={{
                                name: 'campoSelectInstitucion',
                                id: 'campoSelectInstitucion',
                            }}
                        >
                            <MenuItem value="ANY" key="ANY">
                                Todas
                            </MenuItem>
                            {
                                entities.map(((entity, index) => {
                                    return <MenuItem value={entity} key={index}>
                                        {entity.nombre}
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
                                    onChange={(e) => changeLevel(e)}
                        >
                            <FormControlLabel value="todos" control={<Radio/>} label="Todos"/>
                            <FormControlLabel value="federal" control={<Radio/>} label="Federal"/>
                            <FormControlLabel value="estatal" control={<Radio/>} label="Estatal"/>
                        </RadioGroup>

                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6} align="right">
                    <Button variant="contained" color="secondary" className={classes.button}
                            onClick={() => limpiarBusqueda()}>
                        Limpiar
                    </Button>

                    <Button variant="contained" color="secondary" className={classes.button} onClick={() => buscar()}>
                        Buscar
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default withStyles(styles)(BusquedaServidor);