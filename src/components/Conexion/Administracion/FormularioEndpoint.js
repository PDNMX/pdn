import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Select from "@material-ui/core/Select/Select";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Fab from "@material-ui/core/Fab/Fab";
import AddIcon from '@material-ui/icons/Add';
import rp from "request-promise";
import Mensaje from "../../Mensajes/Mensaje";
import MensajeError from "../../Mensajes/MensajeError";
import Save from '@material-ui/icons/Save';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    text: {
        color: theme.palette.secondary.dark,
    },
    formControl: {
        width: '100%'
    },
    mensajeError: {
        color: 'red',
        display : 'inline',
        marginRight : theme.spacing.unit *2,
    },
    fab: {
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 5,
            height: theme.spacing.unit * 5,
        },
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing.unit * 4,
            height: theme.spacing.unit * 4,
        }
    }
});

 let nuevo = {
     url : '',
     metodo : '',
     sistema : '',
     descripcion : ''
 };

class FormularioEndpoint extends React.Component {
    state = {
        endpoint: nuevo,
        mensajeError: '',
        mensaje: '',
        tituloMensaje: '',
        mensaje_modal: '',
        flag_msj: false,
        flag_msj_error: false,
    };

    componentDidMount(){
        if(!this.props.endpoint){
            let aux = JSON.parse(localStorage.getItem("sesion"));
            this.setState({
                currentUser : aux.currentUser
            },()=>{
                nuevo.dependencia = this.state.currentUser.dependencia
            })
        }
        else{
            this.setState({
                endpoint : this.props.endpoint,
                urlOriginal : this.props.endpoint.url
            })
        }
    };

    handleChange = name => event => {
        this.setState({
            endpoint: {
                ...this.state.endpoint,
                [name]: event ? (event.target ? event.target.value : event.value) : ''
            }
        })
    };
    handleClick = () => {
        let item = this.state.endpoint;
        console.log("Item: ",item);
        if (item.url && item.metodo && item.sistema && item.descripcion ){
            return this.saveRegistro();
        } else {
            this.setState({
                mensaje: '*Llena los campos requeridos'
            })
        }
    };

    saveRegistro = () => {
        this.state.endpoint.fecha_registro = new Date();
        this.state.endpoint.estatus = 'EN REVISIÓN';

        let options = {
            method: 'POST',
            uri: 'https://plataformadigitalnacional.org/api/apis_conexion',
            headers: {
                'Prefer': 'return = representation',
                'Content-Type': 'application/json'
            },
            body: this.state.endpoint,
            json: true
        };

        rp(options)
            .then(parseBody => {
                this.setState({
                    registro: nuevo,
                    flag_msj: true,
                    tituloMensaje: 'Aviso',
                    mensaje_modal: 'El endpoint se ha registrado correctamente',
                    flag_send: false,
                }, () => {
                    if (this.props.updateView) this.props.updateView();
                });
                return true;
            })
            .catch(err => {
                let mensaje = '';
                switch (err.error.code) {
                    case '23505':'Endpoint ya registrado en la institución';
                        break;
                    default :
                        mensaje = 'Error al insertar registro';
                        break;
                }
                this.setState({
                    flag_msj_error: true,
                    mensaje_error_modal: mensaje
                })
            });
        return null;
    };

    saveChanges = () => {
        let params = {};
        let registro = this.state.endpoint;
        params.url = 'eq.' + this.state.urlOriginal;

        let options = {
            method: 'PATCH',
            uri: 'https://plataformadigitalnacional.org/api/apis_conexion',
            qs: params,
            headers: {
                'Prefer': 'return = representation',
                'Content-Type': 'application/json'
            },
            body: {
                'url': registro.url,
                'metodo': registro.metodo,
                'sistema': registro.sistema,
                'descripcion': registro.descripcion,
            },
            json: true
        };
        rp(options)
            .then(data => {
                this.setState({
                    tituloMensaje: 'Aviso',
                    mensaje_modal: 'Los cambios se han realizado correctamente',
                    flag_msj: true
                });
                return true;
            })
            .catch(err => {
                console.log("Error:", err);
                let mensaje = '';
                switch (err.error.code) {
                    case '23505':
                        mensaje = 'Endpoint ya registrado en la institución';
                        break;
                    default :
                        mensaje = 'Error al actualizar registro';
                        break;
                }
                this.setState({
                    flag_msj_error: true,
                    mensaje_error_modal: mensaje
                });
                return true;
            });
    };


    handleCloseMsj = () => {
        this.setState({flag_msj: false}, () => {
            if(this.props.closeContainer) this.props.closeContainer();
        });
    };
    handleCloseMsjError = () => {
        this.setState({flag_msj_error: false});
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container spacing={32}>
                    <Grid item xs={12}>
                        <Mensaje mensaje={this.state.mensaje_modal} titulo={this.state.tituloMensaje}
                                 open={this.state.flag_msj} handleClose={this.handleCloseMsj}/>
                        <MensajeError mensaje={this.state.mensaje_error_modal} titulo={'Error'}
                                      open={this.state.flag_msj_error} handleClose={this.handleCloseMsjError}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} className={classes.text}>
                            Datos endpoint
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField className={classes.formControl} required={true}
                                   id={'url'}
                                   label={'URL'} value={this.state.endpoint.url}
                                   onChange={this.handleChange('url')}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-simple">Método</InputLabel>
                            <Select
                                value={this.state.endpoint.metodo}
                                onChange={this.handleChange('metodo')}
                            >
                                <MenuItem value={'POST'}>POST</MenuItem>
                                <MenuItem value={'GET'}>GET</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-simple">Sistema</InputLabel>
                            <Select
                                value={this.state.endpoint.sistema}
                                onChange={this.handleChange('sistema')}
                            >
                                <MenuItem value={'S1'}>Declaraciones</MenuItem>
                                <MenuItem value={'S2'}>Servidores públicos en contrataciones públicas</MenuItem>
                                <MenuItem value={'S3'}>Sancionados</MenuItem>
                                <MenuItem value={'S4'}>Fiscalización</MenuItem>
                                <MenuItem value={'S5'}>Denuncias</MenuItem>
                                <MenuItem value={'S6'}>Contrataciones</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField className={classes.formControl} required={true}
                                   id={'descripcion'}
                                   label={'Descripcion'} value={this.state.endpoint.descripcion}
                                   onChange={this.handleChange('descripcion')}
                        />
                    </Grid>
                    <Grid item xs={12} style={{textAlign:'right'}}>
                        <Typography variant={"body1"} className={classes.mensajeError}>{this.state.mensaje}</Typography>
                        {
                            !this.props.endpoint &&
                            <Tooltip title={'Agregar'}>
                                <Fab color="primary" aria-label="Add" className={classes.fab}
                                     onClick={() => this.handleClick()}>
                                    <AddIcon/>
                                </Fab>
                            </Tooltip>
                        }
                        {this.props.endpoint &&
                        <Tooltip title={'Guardar cambios'}>
                            <Fab color="primary" aria-label="Add" className={classes.fab}
                                 onClick={() => this.saveChanges()}>
                                <Save/>
                            </Fab>
                        </Tooltip>
                        }
                    </Grid>
                    <Grid item xs={12}>

                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(FormularioEndpoint);