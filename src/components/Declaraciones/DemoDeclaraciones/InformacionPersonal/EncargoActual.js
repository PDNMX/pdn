import React from 'react';
import {withStyles} from '@material-ui/core/styles/index'
import Typography from '@material-ui/core/Typography/index';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";

const styles = theme => ({
    title: {
        color: theme.palette.textPrincipal.color,
        textAlign: 'center',
        marginTop: theme.spacing.unit * 2,
    },
    section: {
        maxWidth: '1024px'
    },
    formControl: {
        margin: theme.spacing.unit,
    }
});

class EncargoActual extends React.Component {
    state = {
        rol: '',
        nombre: '',
        apellidoUno: '',
        apellidoDos: ''
    };

    render() {
        const {classes, encargo} = this.props;
        return (
            <div>
                <Grid container justify={'center'} spacing={0}>
                    <Grid item xs={12} className={classes.section}>
                        <Grid container spacing={24}>
                            <Grid item md={6} xs={12}>
                                <TextField disabled
                                           id="ente"
                                           label="Ente público: "
                                           className={classes.textField}
                                           value={encargo.ente_publico}
                                           margin="normal" fullWidth
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField disabled
                                           id="area"
                                           label="Área adscripción: "
                                           className={classes.textField}
                                           value={encargo.area_adscripcion}
                                           margin="normal" fullWidth
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField disabled
                                           id="status"
                                           label="Nombre empleo: "
                                           className={classes.textField}
                                           value={encargo.empleo_cargo_comision}
                                           margin="normal" fullWidth
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField disabled
                                           id="sectorIndustria"
                                           label="Sector/Industria: "
                                           className={classes.textField}
                                           value={encargo.sector_industria.valor}
                                           margin="normal" fullWidth
                                />
                            </Grid>
                            <Grid item md={3} xs={6}>
                                <TextField disabled
                                           id="nivelEncargo"
                                           label="Nivel encargo: "
                                           className={classes.textField}
                                           value={encargo.nivel_encargo}
                                           margin="normal" fullWidth
                                />
                            </Grid>
                            <Grid item md={3} xs={6}>
                                <TextField disabled
                                           id="nivel"
                                           label="Nivel gobierno: "
                                           className={classes.textField}
                                           value={encargo.nivel_gobierno.valor}
                                           margin="normal" fullWidth
                                />
                            </Grid>

                            <Grid item md={3} xs={6}>
                                <TextField disabled
                                           id="poderJudicial"
                                           label="Poder judicial: "
                                           className={classes.textField}
                                           value={encargo.poder_juridico.valor}
                                           margin="normal" fullWidth
                                />
                            </Grid>

                            <Grid item md={3} xs={6}>
                                <TextField disabled
                                           id="lugarUbicacion"
                                           label="Lugar: "
                                           className={classes.textField}
                                           value={encargo.lugar_ubicacion.valor}
                                           margin="normal" fullWidth
                                />
                            </Grid>
                            <Grid item md={3} xs={6}>
                                <TextField disabled
                                           id="fechaPosesion"
                                           label="Fecha posesión: "
                                           className={classes.textField}
                                           value={encargo.fecha_posesion}
                                           margin="normal" fullWidth
                                />
                            </Grid>
                            <Grid item md={3} xs={6}>
                                <TextField disabled
                                           id="funciones"
                                           label="Funciones principales: "
                                           className={classes.textField}
                                           value={encargo.funciones_principales.map(item => item.valor + ' ')}
                                           margin="normal" fullWidth
                                />
                            </Grid>
                            <Grid item  md={3} xs={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={encargo.contratado_honorarios}
                                            value="checkedA"
                                        />
                                    }
                                    label="Contratado por honorarios"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant={'subheading'}
                                            className={classes.title}>{'Dirección'}</Typography>
                            </Grid>
                            <Grid item  md={3} xs={6}>
                                <TextField disabled
                                           id="domicilioPais"
                                           label="País: "
                                           className={classes.textField}
                                           value={encargo.direccion_encargo.pais.valor}
                                           margin="normal" fullWidth
                                />
                            </Grid>
                            <Grid item  md={3} xs={6}>
                                <TextField disabled
                                           id="domicilioEntidad"
                                           label="Entidad federavia: "
                                           className={classes.textField}
                                           value={encargo.direccion_encargo.entidad_federativa.nom_ent}
                                           margin="normal" fullWidth
                                />
                            </Grid>
                            <Grid item  md={3} xs={6}>
                                <TextField disabled
                                           id="domicilioMunicipio"
                                           label="Municipio: "
                                           className={classes.textField}
                                           value={encargo.direccion_encargo.municipio.nom_mun}
                                           margin="normal" fullWidth
                                />
                            </Grid>
                            <Grid item  md={3} xs={6}>
                                <TextField disabled
                                           id="domicilioCP"
                                           label="Código postal: "
                                           className={classes.textField}
                                           value={encargo.direccion_encargo.cp}
                                           margin="normal" fullWidth
                                />
                            </Grid>
                            <Grid item  md={3} xs={6}>
                                <TextField disabled
                                           id="domicilioColonia"
                                           label="Colonia: "
                                           className={classes.textField}
                                           value={encargo.direccion_encargo.localidad.nom_loc}
                                           margin="normal" fullWidth
                                />
                            </Grid>
                            <Grid item  md={3} xs={6}>
                                <TextField disabled
                                           id="domicilioTipoVia"
                                           label="Tipo de vía: "
                                           className={classes.textField}
                                           value={encargo.direccion_encargo.vialidad.tipo_vial}
                                           margin="normal" fullWidth
                                />
                            </Grid>
                            <Grid item  md={3} xs={6}>
                                <TextField disabled
                                           id="domicilioNombreVia"
                                           label="Nombre de la vía: "
                                           className={classes.textField}
                                           value={encargo.direccion_encargo.vialidad.nom_vial}
                                           margin="normal" fullWidth
                                />
                            </Grid>
                            <Grid item  md={3} xs={6}>
                                <TextField disabled
                                           id="domicilionoExterior"
                                           label="Número exterior: "
                                           className={classes.textField}
                                           value={encargo.direccion_encargo.numExt}
                                           margin="normal" fullWidth
                                />
                            </Grid>
                            <Grid item  md={3} xs={6}>
                                <TextField disabled
                                           id="domicilioInterior"
                                           label="Número interior: "
                                           className={classes.textField}
                                           value={encargo.direccion_encargo.numInt}
                                           margin="normal" fullWidth
                                />
                            </Grid>
                            <Grid item  md={3} xs={6}>
                                <TextField disabled
                                           id="telefonoLaboral"
                                           label="Teléfono laboral: "
                                           className={classes.textField}
                                           value={encargo.telefono_laboral}
                                           margin="normal" fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </div>
        );
    }

}

EncargoActual.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EncargoActual);