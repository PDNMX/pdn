import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import FormControl from "@material-ui/core/FormControl/FormControl";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Fab from "@material-ui/core/Fab/Fab";
import AddIcon from '@material-ui/icons/Add';
import Typography from "@material-ui/core/Typography/Typography";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import rp from "request-promise";
import Select from "@material-ui/core/Select/Select";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";


const styles = theme => ({
    fab: {
        margin: theme.spacing.unit,
    },
    formControl: {
        width: '100%'
    },
    mensajeError: {
        color: 'red'
    },
    text: {
        color: theme.palette.primary.dark,
    }
});

const nuevo = {
    nombre: '',
    apellido1: '',
    apellido2: '',
    dependencia: '',
    cargo: '',
    correo: '',
    telefono_personal: '',
    telefono_oficina: '',
    extension: '',
    otra_dependencia: ''
};

let loadDependencias = (_this) => {
    let sug = [];
    let index = 0;
    let options = {
        uri: 'https://demospdn.host/demo1/captura/api/catDependencias',
        json: true
    };
    rp(options)
        .then(data => {
            data.map(item => {
                sug.push({id: index, value: item.valor, label: item.valor});
                index += 1;
            });
            _this.setState({dependencias: sug});
        }).catch(err => {
        alert("_No se puedó obtener la información");
        console.log(err);
    });
};


const expCorreo = '^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)+(.[a-z]{2,4})$';

class FormularioConexion extends React.Component {
    state = {
        registro: nuevo,
        mensaje: '',
        dependencias: []
    };

    componentDidMount() {
        loadDependencias(this);
    }

    handleChange = name => event => {
        this.setState({
            registro: {
                ...this.state.registro,
                [name]: event ? (event.target ? event.target.value : event.value) : ''
            }
        })
    };

    handleClick = () => {
        let item = this.state.registro;
        let okDependencia = item.dependencia && item.dependencia !== 'OTRA' ? true : (item.dependencia === 'OTRA' && item.otra_dependencia) ? true : false;
        if (item.cargo && okDependencia && item.nombre && item.apellido1 && item.correo &&
            item.correo.match(expCorreo) !== null) {
            this.props.addRegistro(this.state.registro);
            this.setState({
                registro: nuevo,
                mensaje: ''
            })
        } else {
            this.setState({
                mensaje: '*Llena los campos requeridos'
            })
        }
    };

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Grid container spacing={32}>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} className={classes.text}>
                            Datos del Servidor Público
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField className={classes.formControl} required={true}
                                   id={'cargo'}
                                   label={'Cargo'} value={this.state.registro.cargo}
                                   onChange={this.handleChange('cargo')}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-simple">Dependencia</InputLabel>
                            <Select
                                value={this.state.registro.dependencia}
                                onChange={this.handleChange('dependencia')}
                                inputProps={{
                                    name: 'dependencia',
                                    id: 'dependencia-simple',
                                    required: true
                                }}

                            >
                                <MenuItem value='OTRA' key={-1}>
                                    <em>OTRA</em>
                                </MenuItem>
                                {
                                    this.state.dependencias.map(item => {
                                        return (<MenuItem value={item.value} key={item.id}>{item.label}</MenuItem>)
                                    })
                                }

                            </Select>
                        </FormControl>
                    </Grid>
                    {
                        this.state.registro.dependencia === 'OTRA' &&
                        <Grid item xs={12} md={6}>
                            <TextField className={classes.formControl}
                                       id={'dependencia'}
                                       label={'Dependencia'} value={this.state.registro.otra_dependencia}
                                       onChange={this.handleChange('otra_dependencia')}
                            />
                        </Grid>
                    }
                    {
                        this.state.registro.dependencia !== 'OTRA' &&
                        <Grid item xs={12} md={6}/>

                    }

                    <Grid item xs={12} md={3}>
                        <TextField className={classes.formControl} required={true}
                                   id={'nombre'}
                                   label={'Nombre'} value={this.state.registro.nombre}
                                   onChange={this.handleChange('nombre')}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField className={classes.formControl} required={true}
                                   id={'apellido1'}
                                   label={'Apellido Uno'} value={this.state.registro.apellido1}
                                   onChange={this.handleChange('apellido1')}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField className={classes.formControl}
                                   id={'apellido2'}
                                   label={'Apellido Dos'} value={this.state.registro.apellido2}
                                   onChange={this.handleChange('apellido2')}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>

                    </Grid>

                    <Grid item xs={12} md={3}>
                        <TextField className={classes.formControl} required={true} type={'email'}
                                   error={this.state.registro.correo !== '' && this.state.registro.correo.match(expCorreo) === null}
                                   id={'correo'}
                                   label={'Correo electrónico'} value={this.state.registro.correo}
                                   onChange={this.handleChange('correo')}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField className={classes.formControl}
                                   id={'telefonoPersonal'}
                                   label={'Telefono Personal'} value={this.state.registro.telefono_personal}
                                   onChange={this.handleChange('telefono_personal')}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField className={classes.formControl}
                                   id={'telefonoOficina'}
                                   label={'Telefono Oficina'} value={this.state.registro.telefono_oficina}
                                   onChange={this.handleChange('telefono_oficina')}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField className={classes.formControl}
                                   id={'extension'}
                                   label={'Extensión'} value={this.state.registro.extension}
                                   onChange={this.handleChange('extension')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"body1"} className={classes.mensajeError}>{this.state.mensaje}</Typography>
                    </Grid>
                    <Grid item xs={11}/>
                    <Grid item xs={1}>
                        <Tooltip title={'Agregar'}>
                            <Fab color="primary" aria-label="Add" className={classes.fab}
                                 onClick={() => this.handleClick()}>
                                <AddIcon/>
                            </Fab>
                        </Tooltip>
                    </Grid>
                </Grid>

            </div>
        );
    }
}

export default withStyles(styles)(FormularioConexion);