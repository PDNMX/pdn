import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import {Typography} from "@material-ui/core"
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect/NativeSelect";
import InputLabel from '@material-ui/core/InputLabel';
import Input from "@material-ui/core/Input/Input";
import PlusIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton/IconButton";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import DatePicker from "material-ui-pickers/DatePicker";
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import {TimePicker} from 'material-ui-pickers';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Acusado from "./Acusado";
import Table from "@material-ui/core/Table";
import ClearIcon from "@material-ui/icons/Clear";
import {connect} from 'react-redux';

const styles = theme => ({
    root: {
        width: '100%',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: "100%",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "100%",
    },
    form: {
        padding: theme.spacing(2)
    },
});

class DatosDenuncia extends React.Component {
    state = {
        acusado: {
            id: 0,
            nombre: ''
        },
        testigo:{
            id : 0,
            nombre : ''
        }
    };


    handleChangeInput = name => event => {
       this.props.setField(name,event);
    };

    handleDateChange = (date) => {
        this.props.setDate('fecha_hecho', date);
    };

    handleChange = name => event => {
        this.setState({
            acusado: {
                ...this.state.acusado,
                [name]: event.target.value
            }
        })
    };
    handleChangeTestigo = name => event => {
      this.setState({
          testigo : {
              ...this.state.testigo,
              [name] : event.target.value
          }
      });
    };
    fireAction = () => {
        this.props.addAcusado(this.state.acusado);
        this.setState({
            acusado: {
                id : 0,
                nombre : ''
            }
        })
    };
    addTestigo = () => {
        this.props.addTestigo(this.state.testigo);
        this.setState({
            testigo:{
                id : 0,
                nombre : ''
            }
        })
    };

    Testigo = (testigo) => {
        return (
        <TableRow key={testigo.id}>
            <TableCell>{testigo.nombre}</TableCell>
            <TableCell>
                <IconButton color="primary" component="span">
                    <ClearIcon/>
                </IconButton>
            </TableCell>
        </TableRow>
        );
    };
    render() {
        const {classes, denuncia} = this.props;
        return (
            <div>
                <Paper className={classes.form}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant={"body1"}>
                                Capture la información solicitada sobre la denuncia a presentar.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="motivo"
                                label="Narre el motivo de su petición: "
                                className={classes.textField}
                                value={denuncia.motivo_peticion}
                                onChange={this.handleChangeInput('motivo_peticion')}
                                margin="normal" multiline fullWidth rows={5}
                            />
                        </Grid>
                        <Grid item lg={3} md={3} sm={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    value={denuncia.fecha_hecho}
                                    onChange={this.handleDateChange}
                                    label="Fecha de los hechos"
                                    disableFuture
                                    maxDateMessage="La fecha debe ser menor o igual al día de hoy"
                                    showTodayButton
                                    format="yyyy/MM/dd"
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item lg={3} md={3} sm={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <TimePicker
                                    autoOk
                                    label="Si conoce la hora, indíquela"
                                    value={denuncia.fecha_hecho}
                                    onChange={this.handleDateChange}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item lg={3} md={3} sm={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-native-helper">Motivo de la denuncia</InputLabel>
                                <NativeSelect
                                    value={denuncia.motivo_denuncia}
                                    onChange={this.handleChangeInput('motivo_denuncia')}
                                    input={<Input name="motivoDenuncia" id="motivoDenuncia-native-helper"/>}
                                >
                                    <option value=""/>
                                    <option value={10}>Abuso de funciones</option>
                                    <option value={20}>Actuación bajo conflicto de interes</option>
                                    <option value={30}>Encubrimiento</option>
                                    <option value={40}>Enriquecimiento oculto</option>
                                    <option value={50}>No denunciar actos u omisiones</option>
                                </NativeSelect>
                            </FormControl>
                        </Grid>
                        <Grid item lg={3} md={3} sm={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-native-helper">El trato que recibió fue</InputLabel>
                                <NativeSelect
                                    value={denuncia.trato_recibido}
                                    onChange={this.handleChangeInput('trato_recibido')}
                                    input={<Input name="trato" id="trato-native-helper"/>}
                                >
                                    <option value=""/>
                                    <option value={10}>Amable</option>
                                    <option value={20}>Descortés</option>
                                    <option value={30}>Abusivo</option>
                                    <option value={40}>Discriminatorio</option>
                                </NativeSelect>
                            </FormControl>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12}>
                            <TextField
                                id="lugarHecho"
                                label="¿En dónde sucedieron los hechos?"
                                className={classes.textField}
                                value={denuncia.lugar_hecho}
                                onChange={this.handleChangeInput('lugar_hecho')}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12}>
                            <TextField
                                id="institucionHecho"
                                label="¿De qué institución es el trámite/servicio o el personal con quien trató? *"
                                value={denuncia.institucion_servidor}
                                onChange={this.handleChangeInput('institucion_servidor')}
                                className={classes.textField}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12}>
                            <TextField
                                id="nombreTramiteServicio"
                                label="Nombre del trámite o servicio"
                                value={denuncia.nombre_tramite}
                                onChange={this.handleChangeInput('nombre_tramite')}
                                className={classes.textField}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12}>
                            <TextField
                                id="cantidadDescripcionSolicitada"
                                label="Cantidad solicitada o descripción de solicitud"
                                value={denuncia.solicitud_hecho}
                                onChange={this.handleChangeInput('solicitud_hecho')}
                                className={classes.textField}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-native-helper">País</InputLabel>
                                <NativeSelect
                                    value={denuncia.pais_hecho}
                                    onChange={this.handleChangeInput('pais_hecho')}
                                    input={<Input name="paisHecho" id="paisHecho-native-helper"/>}
                                >
                                    <option value=""/>
                                    <option value={10}>Estados Unidos</option>
                                    <option value={20}>México</option>
                                    <option value={30}>Otros</option>
                                </NativeSelect>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={"body1"}>
                                Si desea denunciar a un servidor público o a un particular, especifique:
                            </Typography>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item lg={6} md={6} sm={12}>
                                <TextField
                                    id="nombre"
                                    label="Nombre del servidor público o particular"
                                    value={this.state.acusado.nombre}
                                    className={classes.textField}
                                    margin="normal"
                                    onChange={this.handleChange('nombre')}
                                />
                            </Grid>
                            <Grid item lg={1} md={1} sm={12}>
                                <IconButton color="primary" className={classes.button} aria-label="Agregar"
                                            onClick={() => {
                                                this.fireAction()
                                            }
                                            }
                                >
                                    <PlusIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item md={12} sm={12}>
                            {denuncia.acusados.length > 0 &&
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nombre servidor público o particular</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {denuncia.acusados.map(acusado =>
                                        <Acusado key={acusado.id} {...acusado}/>)}
                                </TableBody>

                            </Table>
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={"body1"}>
                                En caso de contar con testigos, favor de indicarlos:
                            </Typography>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12}>
                            <TextField
                                id="nombreTestigo"
                                label="Nombre del testigo"
                                value={this.state.testigo.nombre}
                                onChange={this.handleChangeTestigo('nombre')}
                                className={classes.textField}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item lg={1} md={1} sm={12}>
                            <IconButton color="primary" className={classes.button} aria-label="Agregar"
                            onClick = {() => {
                                this.addTestigo()
                            }}>
                                <PlusIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item md={12} sm={12}>
                            {denuncia.testigos.length > 0 &&
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nombre testigo</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {denuncia.testigos.map(testigo =>
                                        this.Testigo(testigo)
                                        )}
                                </TableBody>
                            </Table>
                            }
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }
}


DatosDenuncia.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    addAcusado : (acusado) => dispatch({type : 'ADD_ACUSADO', acusado}),
    addTestigo : (testigo) => dispatch({type : 'ADD_TESTIGO', testigo}),
    setField: (name,event) => dispatch({type : 'SET_FIELD', name, event}),
    setDate : (name,date) => dispatch({type : 'SET_DATE', name, date}),
});

const mapStateToProps = (state, ownProps) => {
    let newState = {
        denuncia : state.denunciaReducer.denuncia
    };
    return newState;
};

let previo = withStyles(styles)(DatosDenuncia);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(previo)