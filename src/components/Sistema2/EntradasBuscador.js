import React from 'react';
import withStyles from '@mui/styles/withStyles';
import {TextField, MenuItem, FormControl, Grid, Typography} from "@mui/material"
import Button from '@mui/material/Button';
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TipoProcedimiento from "./TipoProcedimiento";
import { ThemeProvider } from '@mui/material/styles';
import themeV2 from "../../ThemeV2";
import ReactGA from "react-ga";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    textField: {
        marginRight: theme.spacing(1),
    },
    formControl: {
        width: '100%'
    },
    inputShrink: {
        transform: `scale(1)`
    },
    button: {
        margin: theme.spacing(2),
        marginRight: theme.spacing(1),
    }
});

const EntradasBuscador = props => {
    const {
        classes,
        handleSetState,
        nombres, apellidoUno, apellidoDos,
        tipoProcedimiento, asignarTipoProcedimiento,
        entities, current_entity,
        nivel, changeLevel
    } = props;

    const limpiarBusqueda = () => {
        props.handleCleanAll();
    };

    const buscar = () => {
        props.handleSearch();
    };

    return (
        <ThemeProvider theme={themeV2}>
        <div className={classes.root}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography >
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

                {/*<Grid item xs={12} md={4}>
                    <Typography>Proveedor de información</Typography>
                </Grid>*/}

                <Grid item xs={12} md={4}>
                    <TipoProcedimiento
                        tipoProcedimiento={tipoProcedimiento}
                        asignarTipoProcedimiento={asignarTipoProcedimiento}
                    />
                </Grid>

                <Grid item xs={12} md={8}>
                    <FormControl className={classes.formControl}>
                        <TextField id={'campoSelectInstitucion'} name={'campoSelectInstitucion-select'} margin="normal" select label={'Institución'} value={current_entity} onChange={(e) => handleSetState('current_entity', e)}>
                            <MenuItem value="ANY" key="ANY">
                                Todas
                            </MenuItem>
                            {entities.map((entity, index) => {
                                return (
                                    <MenuItem value={entity} key={index}>
                                        {entity.nombre}
                                    </MenuItem>
                                );
                            })}
                        </TextField>
                        {/* <InputLabel id={'campoSelectInstitucion'}>Institución</InputLabel>
                        <Select
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
                        </Select> */}
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
                            <FormControlLabel value="Todos" control={<Radio/>} label="Todos"/>
                            <FormControlLabel value="Federal" control={<Radio/>} label="Federal"/>
                            <FormControlLabel value="Estatal" control={<Radio/>} label="Estatal"/>
                        </RadioGroup>

                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6} align="right">
                    <Button variant="contained" color="secundario"
                            className={classes.button}
                            onClick={() => limpiarBusqueda()}>
                        Limpiar
                    </Button>

                    <Button variant="contained" color="secundario" className={classes.button} 
                            onClick={() => {
                                buscar();
                                ReactGA.event({ category: 'busqueda-s2', action: 'click' });
                              }}
                    >
                        Buscar
                    </Button>
                </Grid>
            </Grid>
        </div>
        </ThemeProvider>
    );
}

export default withStyles(styles)(EntradasBuscador);
