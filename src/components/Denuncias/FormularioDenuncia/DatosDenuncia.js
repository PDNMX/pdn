import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import PlusIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton/IconButton";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import DatePicker from "material-ui-pickers/DatePicker";
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import {TimePicker} from 'material-ui-pickers';
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Acusado from "./Acusado";
import Table from "@material-ui/core/Table/Table";

const styles = theme => ({
    root: {
        width: '100%',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: "100%",
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

class DatosDenuncia extends React.Component {
    state = {
        motivo: '',
        fechaHecho: new Date(),
        trato: '',
        institucionHecho: '',
        lugarHecho: '',
        cantidadDescripcionSolicitada: '',
        nombreTramite: '',
        programaRelacionado: '',
        descripcionAcusado: '',
        nombreAcusado: '',
        nombreTestigo: '',
        empresaPais: '',
        acusado: {
            id: 0,
            nombre: '',
            descripcionFisica: ''
        }
    };


    handleChangeInput = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleDateChange = (date) => {
        this.setState({fechaHecho: date});
    };

    handleChange = name => event => {
        this.setState({
            acusado: {
                ...this.state.acusado,
                [name]: event.target.value
            }
        })
    };
    fireAction = () => {
        this.props.addAcusado(this.state.acusado);
        this.setState({
            acusado: {
                id: 0,
                nombre: '',
                descripcionFisica: ''
            }
        })
    }

    render() {
        const {classes} = this.props;
        const {acusados} = this.props;
        return (
            <div>
                <Paper className={classes.form}>
                    <Grid container spacing={24}>
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
                                value={this.state.motivo}
                                onChange={this.handleChangeInput('motivo')}
                                margin="normal" multiline fullWidth rows={5}
                            />
                        </Grid>
                        <Grid item lg={3} md={3} sm={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    value={this.state.fechaHecho}
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
                                    value={this.state.fechaHecho}
                                    onChange={this.handleDateChange}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item lg={3} md={3} sm={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-native-helper">Motivo de la denuncia</InputLabel>
                                <NativeSelect
                                    value={this.state.motivo}
                                    onChange={this.handleChangeInput('motivoDenuncia')}
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
                                    value={this.state.trato}
                                    onChange={this.handleChangeInput('trato')}
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
                                value={this.state.lugarHecho}
                                onChange={this.handleChangeInput('lugarHecho')}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12}>
                            <TextField
                                id="institucionHecho"
                                label="¿De qué institución es el trámite/servicio o el personal con quien trató? *"
                                value={this.state.institucionHecho}
                                onChange={this.handleChangeInput('institucionHecho')}
                                className={classes.textField}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12}>
                            <TextField
                                id="nombreTramiteServicio"
                                label="Nombre del trámite o servicio"
                                value={this.state.nombreTramite}
                                onChange={this.handleChangeInput('nombreTramiteServicio')}
                                className={classes.textField}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12}>
                            <TextField
                                id="cantidadDescripcionSolicitada"
                                label="Cantidad solicitada o descripción de solicitud"
                                value={this.state.cantidadDescripcionSolicitada}
                                onChange={this.handleChangeInput('cantidadDescripcionSolicitada')}
                                className={classes.textField}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-native-helper">Programa relacionado</InputLabel>
                                <NativeSelect
                                    value={this.state.programaRelacionado}
                                    onChange={this.handleChangeInput('programaRelacionado')}
                                    input={<Input name="programaRelacionado"
                                                  id="programaRelacionado-native-helper"/>}
                                >
                                    <option value=""/>
                                    <option value={10}>Ninguno</option>
                                    <option value={20}>Educación para adultos</option>
                                    <option value={30}>Prevención y control de enfermedades</option>
                                    <option value={40}>Programa de cultura física y deporte</option>
                                </NativeSelect>
                            </FormControl>
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
                        <Grid item xs={12}>
                            <Typography variant={"body1"}>
                                Si desea denunciar a un servidor público o a un particular, especifique:
                            </Typography>
                        </Grid>
                        <Grid container spacing={24}>
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
                            <Grid item lg={5} md={5} sm={12}>
                                <TextField id="descripcionFisica" label="Descripción física: "
                                           className={classes.textField}
                                           value={this.state.acusado.descripcionFisica}
                                           margin="normal"
                                           multiline
                                           fullWidth
                                           onChange={this.handleChange('descripcionFisica')}
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
                            {acusados.length > 0 &&
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell>Descripción</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {acusados.map(acusado =>
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
                                value={this.state.nombreTestigo}
                                onChange={this.handleChangeInput('nombreTestigo')}
                                className={classes.textField}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item lg={5} md={5} sm={12}/>
                        <Grid item lg={1} md={1} sm={12}>
                            <IconButton color="primary" className={classes.button} aria-label="Agregar">
                                <PlusIcon/>
                            </IconButton>
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
DatosDenuncia = withStyles(styles)(DatosDenuncia);
export default DatosDenuncia;