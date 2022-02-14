import React from 'react';
import TextField from '@mui/material/TextField';
import withStyles from '@mui/styles/withStyles';
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import {Typography} from "@mui/material"
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Select from "@mui/material/Select";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TipoProcedimiento from "./TipoProcedimiento";

const styles = theme => ({
    textField: {
        marginRight: theme.spacing(1),
    },
    formControl: {
        width: '100%'
    },
    fontLight: {
        // color: theme.palette.black.color,
    },
    '&$focus': {
        //color: theme.palette.black.color,
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
                        <InputLabel id={'campoSelectInstitucion'}>Institución</InputLabel>
                        <Select
                            //style={{marginTop: '0px'}}
                            labelId = {'campoSelectInstitucion'}
                            id = {'campoSelectInstitucion-select'}
                            value={current_entity}
                            onChange={(e) => handleSetState('current_entity', e)}
                            inputProps={{
                                name: 'campoSelectInstitucion',
                                id: 'campoSelectInstitucion',
                            }}
                            label =  {'Institución'}
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