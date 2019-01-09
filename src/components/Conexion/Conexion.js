import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import FormularioConexion from './FormularioConexion';
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import TablaRegistros from "./TablaRegistros";
import Typography from "@material-ui/core/Typography/Typography";
import "../../index.css";
import Button from "@material-ui/core/Button/Button";
import rp from 'request-promise';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    section: {
        maxWidth: '1200px'
    },
    contenedor: {
        padding: theme.spacing.unit * 5,
    },
    bgImg: {
        background: 'url(/FOTO_BANNER_3.JPG)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        position: 'relative',
        zIndex: 1,
        paddingTop: 0,//'163px',
        paddingBottom: '140px',
    },
    titleLight: {
        color: theme.palette.titleBanner.color,
    },
    titleSub: {
        color: theme.palette.titleBanner.color,
        paddingTop: '10px',
    },
    bgContainer: {
        paddingTop: '102px',
        marginBottom: '266px'
    },
    button: {
        margin: theme.spacing.unit,
        float : 'right'
    },
    text :{
        color : theme.palette.primary.dark,
    }
});

class Conexion extends React.Component {
    state = {
        registros: [],
    };

    addRegistro = (item) => {
        this.setState({
            registros: [
                ...this.state.registros,
                {
                    nombre: item.nombre,
                    apellido1: item.apellido1,
                    apellido2: item.apellido2,
                    dependencia: item.dependencia!=='OTRA'? item.dependencia : item.otra_dependencia,
                    cargo: item.cargo,
                    correo: item.correo,
                    telefono_personal: item.telefono_personal,
                    telefono_oficina: item.telefono_oficina,
                    extension: item.extension
                }

            ],
            mensaje: ''
        })
    };


    removeRegistro = (elemento) => {
        let index = this.state.registros.indexOf(elemento);
        let aux = this.state.registros;
        aux.splice(index, 1);
        this.setState({
            registros: aux
        });
    };

    saveRegistros = () => {
        let registros = this.state.registros;
        for(let i= 0; i< registros.length; i++){
            registros[i].fecha_solicitud = new Date();
            registros[i].estatus = 'PENDIENTE';
        }
        let options = {
          method : 'POST',
          uri: 'https://plataformadigitalnacional.org/api/solicitudes',
          headers : {
              'Prefer' : 'return = representation',
              'Content-Type' : 'application/json'
          },
            body: registros,
            json : true
        };

        rp(options)
            .then(parseBody =>{
                alert("Registro exitoso");
                this.setState({
                    registros : []
                });
            })
            .catch(err =>{
                alert("No se pudo completar la operación");
                console.log(err);
            })
    };
    render() {
        const {classes} = this.props;
        return (
            <div>
                <div id={"imgBanner"} className={classes.bgImg}>
                    <Grid container justify={"center"} spacing={0}>
                        <Grid item xs={12} className={classes.section} style={{paddingTop: 150}}>
                            <Grid container spacing={24}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant={"h2"} className={classes.titleLight}>Solicitud de
                                        conexión</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h6" className={classes.titleSub}>
                                        Los sujetos obligados deberán solicitar la conexión con la PDN, adjuntando un
                                        oficio en formato digital
                                        (PDF), especificando nombres, cargos y datos de contacto de él o los servidores
                                        públicos encargados de
                                        mantener la conexión con la PDN, que tendrán nivel mínimo de Director general u
                                        homólogo.<br/>
                                        Los permisos de conexión a la PDN serán otorgados o denegados por la SESNA
                                        posteriormente a una evaluación de aspectos técnicos de interconexión. En caso
                                        de
                                        que los sujetos obligados no cumplan con los requerimientos de interconexión a
                                        la
                                        PDN establecidos por la SESNA, se denegará el permiso de conexión a la PDN.
                                    </Typography>
                                    <br/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.bgContainer}>
                    <Grid container justify={'center'} spacing={0}>
                        <Grid item xs={12} className={classes.section}>
                            <Paper className={classes.contenedor}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <FormularioConexion addRegistro={this.addRegistro}/>
                                        <TablaRegistros registros={this.state.registros} remove={this.removeRegistro}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant={"h6"} className={classes.text}>Oficio</Typography>
                                        <input type="file"/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" color="primary" className={classes.button} onClick = {()=>this.saveRegistros()}>
                                            Enviar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>

                </div>
            </div>
        );
    }

}

export default withStyles(styles)(Conexion);