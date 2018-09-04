import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import Radio from "@material-ui/core/Radio/Radio";
import NativeSelect from "@material-ui/core/NativeSelect/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";

const styles = theme => ({
    root: {
        width: '100%',
    },
    formControl: {
        margin: theme.spacing.unit,
        width: "100%",
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "100%",
    },
    form: {
        padding: theme.spacing.unit * 2
    },
});

class DatosSolicitante extends React.Component {
    state = {
        isAnonima: true,
        isServidor: true,
        nombreDenunciante: '',
        apellidoUnoDenunciante: '',
        apellidoDosDenunciante: '',
        genero: '',
        edad: 0,
        escolaridad: '',
        ladaEmpresa: '',
        telefonoEmpresa: '',
        correoEmpresa: '',
        empresaPais: ''
    };
    handleChange = name => event => {
        this.setState({[name]: event.target.checked});
    };
    handleChangeInput = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleChangeGenero = event => {
        this.setState({genero: event.target.value});
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Paper className={classes.form}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography variant={"body1"}>
                            Sus datos personales se encuentran protegidos en términos de lo señalado por las leyes y
                            demás disposiciones aplicables
                            en materia de Transparencia y Protección de Datos Personales
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.isAnonima}
                                        onChange={this.handleChange('isAnonima')}
                                        value="isAnonima"
                                    />
                                }
                                label="¿La petición es anónima?"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.isServidor}
                                        onChange={this.handleChange('isServidor')}
                                        value="isServidor"
                                    />
                                }
                                label="¿Es servidor público?"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item lg={3} md={3} sm={12}>
                        <TextField
                            id="nombreDenunciante"
                            label="Nombre(s)"
                            className={classes.textField}
                            value={this.state.nombreDenunciante}
                            onChange={this.handleChangeInput('nombreDenunciante')}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12}>
                        <TextField
                            id="apellidoUnoDenunciante"
                            label="Primer apellido"
                            className={classes.textField}
                            value={this.state.apellidoUnoDenunciante}
                            onChange={this.handleChangeInput('apellidoUnoDenunciante')}
                            margin="normal"
                        />
                    </Grid>
                    <Grid  item lg={3} md={3} sm={12}>
                        <TextField
                            id="apellidoDosDenunciante"
                            label="Segundo apellido"
                            className={classes.textField}
                            value={this.state.apellidoDosDenunciante}
                            onChange={this.handleChangeInput('apellidoDosDenunciante')}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12}>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">Género</FormLabel>
                            <RadioGroup row
                                        aria-label="Género"
                                        name="genero"
                                        className={classes.group}
                                        value={this.state.genero}
                                        onChange={this.handleChangeGenero}
                            >
                                <FormControlLabel value="femenino" control={<Radio/>} label="Femenino"/>
                                <FormControlLabel value="masculino" control={<Radio/>} label="Masculino"/>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item lg={3} md={3} sm={12}>
                        <TextField
                            id="edad"
                            label="Edad"
                            value={this.state.edad}
                            onChange={this.handleChangeInput('edad')}
                            type="number"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-native-helper">Escolaridad</InputLabel>
                            <NativeSelect
                                value={this.state.escolaridad}
                                onChange={this.handleChangeInput('escolaridad')}
                                input={<Input name="escolaridad" id="escolaridad-native-helper"/>}
                            >
                                <option value=""/>
                                <option value={10}>No tiene</option>
                                <option value={20}>Primaria</option>
                                <option value={30}>Secundaria</option>
                                <option value={40}>Media superior</option>
                                <option value={50}>Carrera técnica</option>
                                <option value={60}>Licenciatura</option>
                                <option value={70}>Maestría</option>
                                <option value={80}>Doctorado</option>
                            </NativeSelect>
                        </FormControl>
                    </Grid>
                    <Grid item lg={3} md={3} sm={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-native-helper">Ocupación</InputLabel>
                            <NativeSelect
                                value={this.state.ocupacion}
                                onChange={this.handleChangeInput('ocupacion')}
                                input={<Input name="ocupacion" id="ocupacion-native-helper"/>}
                            >
                                <option value=""/>
                                <option value={10}>Ama de casa</option>
                                <option value={20}>Comerciante</option>
                                <option value={30}>Empleado</option>
                                <option value={40}>Estudiante</option>
                                <option value={50}>Servidor público</option>
                                <option value={60}>Jubilado</option>
                            </NativeSelect>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"body1"}>
                            En caso de acudir en representación de alguna empresa u organización, especifique cuál:
                        </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12}>
                        <TextField
                            id="empresa"
                            label="Empresa u organización"
                            className={classes.textField}
                            value={this.state.empresa}
                            onChange={this.handleChangeInput('empresa')}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-native-helper">País</InputLabel>
                            <NativeSelect
                                value={this.state.empresaPais}
                                onChange={this.handleChangeInput('empresaPais')}
                                input={<Input name="empresaPais" id="empresaPais-native-helper"/>}
                            >
                                <option value=""/>
                                <option value={10}>Estados Unidos</option>
                                <option value={20}>México</option>
                                <option value={30}>Otros</option>
                            </NativeSelect>
                        </FormControl>
                    </Grid>
                    <Grid item lg={3} md={3} sm={12}>
                        <TextField
                            id="ladaEmpresa"
                            label="Lada"
                            value={this.state.ladaEmpresa}
                            onChange={this.handleChangeInput('ladaEmpresa')}
                            type="number"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12}>
                        <TextField
                            id="telefonoEmpresa"
                            label="Teléfono"
                            value={this.state.telefonoEmpresa}
                            onChange={this.handleChangeInput('telefonoEmpresa')}
                            type="number"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12}>
                        <TextField
                            id="correoEmpresa"
                            label="Correo electrónico"
                            className={classes.textField}
                            value={this.state.correoEmpresa}
                            onChange={this.handleChangeInput('correoEmpresa')}
                            margin="normal"
                        />
                    </Grid>

                </Grid>
                </Paper>
            </div>
        )
    }
}

DatosSolicitante.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DatosSolicitante);