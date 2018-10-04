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
import {connect} from 'react-redux';


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
   handleChange = name => event => {
        this.props.setCheck(name,event);
    };
    handleChangeInput = name => event => {
        this.props.setField(name,event);
    };


    render() {
        const {classes, denuncia} = this.props;
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
                                        checked={denuncia.anonima}
                                        onChange={this.handleChange('anonima')}
                                        value="isAnonima"
                                    />
                                }
                                label="¿La petición es anónima?"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={denuncia.is_servidor}
                                        onChange={this.handleChange('is_servidor')}
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
                            value={denuncia.nombre_solicitante}
                            onChange={this.handleChangeInput('nombre_solicitante')}
                            margin="normal" required
                        />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12}>
                        <TextField
                            id="apellidoUnoDenunciante"
                            label="Primer apellido"
                            className={classes.textField}
                            value={denuncia.apellido_uno_solicitante}
                            onChange={this.handleChangeInput('apellido_uno_solicitante')}
                            margin="normal" required
                        />
                    </Grid>
                    <Grid  item lg={3} md={3} sm={12}>
                        <TextField
                            id="apellidoDosDenunciante"
                            label="Segundo apellido"
                            className={classes.textField}
                            value={denuncia.apellido_dos_solicitante}
                            onChange={this.handleChangeInput('apellido_dos_solicitante')}
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
                                        value={denuncia.genero_solicitante}
                                        onChange={this.handleChangeInput('genero_solicitante')}
                            >
                                <FormControlLabel value="F" control={<Radio/>} label="Femenino"/>
                                <FormControlLabel value="M" control={<Radio/>} label="Masculino"/>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item lg={3} md={3} sm={12}>
                        <TextField
                            id="edad"
                            label="Edad"
                            value={denuncia.edad_solicitante}
                            onChange={this.handleChangeInput('edad_solicitante')}
                            type="number"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin={"normal"} required
                        />
                    </Grid>
                    <Grid item lg={3} md={3} sm={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-native-helper">Escolaridad</InputLabel>
                            <NativeSelect
                                value={denuncia.escolaridad_solicitante}
                                onChange={this.handleChangeInput('escolaridad_solicitante')}
                                input={<Input name="escolaridad" id="escolaridad-native-helper"/>}
                            >
                                <option value=""/>
                                <option value={'No tiene'}>No tiene</option>
                                <option value={'Primaria'}>Primaria</option>
                                <option value={'Secundaria'}>Secundaria</option>
                                <option value={'Media superior'}>Media superior</option>
                                <option value={'Carrera técnica'}>Carrera técnica</option>
                                <option value={'Licenciatura'}>Licenciatura</option>
                                <option value={'Maestría'}>Maestría</option>
                                <option value={'Doctorado'}>Doctorado</option>
                            </NativeSelect>
                        </FormControl>
                    </Grid>
                    <Grid item lg={3} md={3} sm={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-native-helper">Ocupación</InputLabel>
                            <NativeSelect
                                value={denuncia.ocupacion_solicitante}
                                onChange={this.handleChangeInput('ocupacion_solicitante')}
                                input={<Input name="ocupacion" id="ocupacion-native-helper"/>}
                            >
                                <option value=""/>
                                <option value={'Ama de casa'}>Ama de casa</option>
                                <option value={'Comerciante'}>Comerciante</option>
                                <option value={'Empleado'}>Empleado</option>
                                <option value={'Estudiante'}>Estudiante</option>
                                <option value={'Servidor público'}>Servidor público</option>
                                <option value={'Jubilado'}>Jubilado</option>
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
                            value={denuncia.empresa_organizacion_solicitante}
                            onChange={this.handleChangeInput('empresa_organizacion_solicitante')}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-native-helper">País</InputLabel>
                            <NativeSelect
                                value={denuncia.pais_solicitante}
                                onChange={this.handleChangeInput('pais_solicitante')}
                                input={<Input name="paisDenunciante" id="paisDenunciante-native-helper"/>}
                            >
                                <option value=""/>
                                <option value={'Estados Unidos'}>Estados Unidos</option>
                                <option value={'México'}>México</option>
                                <option value={'Otros'}>Otros</option>
                            </NativeSelect>
                        </FormControl>
                    </Grid>
                    <Grid item lg={3} md={3} sm={12}>
                        <TextField
                            id="ladaDenunciante"
                            label="Lada"
                            value={denuncia.lada_solicitante}
                            onChange={this.handleChangeInput('lada_solicitante')}
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
                            id="telefonoDenunciante"
                            label="Teléfono"
                            value={denuncia.telefono_solicitante}
                            onChange={this.handleChangeInput('telefono_solicitante')}
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
                            id="correoDenunciante"
                            label="Correo electrónico"
                            className={classes.textField}
                            value={denuncia.correo_solicitante}
                            onChange={this.handleChangeInput('correo_solicitante')}
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


const mapDispatchToProps = (dispatch, ownProps) => ({
    addAcusado : (acusado) => dispatch({type : 'ADD_ACUSADO', acusado}),
    addTestigo : (testigo) => dispatch({type : 'ADD_TESTIGO', testigo}),
    setField: (name,event) => dispatch({type : 'SET_FIELD', name, event}),
    setDate : (name,date) => dispatch({type : 'SET_DATE', name, date}),
    setCheck : (name, event) => dispatch({type : 'SET_CHECK',name, event})
});

const mapStateToProps = (state, ownProps) => {
    let newState = {
        denuncia : state.denunciaReducer.denuncia
    };
    return newState;
};

let previo = withStyles(styles)(DatosSolicitante);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(previo)