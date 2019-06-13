import React from 'react';
import {withStyles} from '@material-ui/core/styles/index'
import Typography from '@material-ui/core/Typography/index';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";

const styles = theme => ({
    title: {
        color: theme.palette.textPrincipal.color,
        textAlign: 'center',
        marginTop: theme.spacing(2),
    },
    section: {
        maxWidth: '1024px'
    },
    center: {
        textAlign: 'center'
    },
});

class InformacionPersonal extends React.Component {
    render() {
        const {classes, informacionPersonal} = this.props;
        return (
            <div>
                <div className={classes.bgPanelLight}>
                    <Grid container justify={'center'} spacing={0}>
                        <Grid item xs={12} className={classes.section}>
                            <Grid container spacing={3}>
                                <Grid item xs={6} md={3}>
                                    <TextField
                                        disabled
                                        id="nombre"
                                        label="Nombre(s): "
                                        className={classes.textField}
                                        value={informacionPersonal.nombres}
                                        margin="normal" fullWidth
                                    />
                                </Grid>
                                <Grid item xs = {6} md={3}>
                                    <TextField
                                        disabled
                                        id="apellidoUno"
                                        label="Apellido uno: "
                                        className={classes.textField}
                                        value={informacionPersonal.primer_apellido}
                                        margin="normal" fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <TextField disabled
                                        id="apellidoDos"
                                        label="Apellido dos: "
                                        className={classes.textField}
                                        value={informacionPersonal.segundo_apellido}
                                        margin="normal" fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <TextField disabled
                                        id="fechaDeclaracion"
                                        label="Fecha declaración: "
                                        className={classes.textField}
                                        value={informacionPersonal.fecha_declaracion}
                                        margin="normal" fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <TextField disabled
                                        id="curp"
                                        label="CURP: "
                                        className={classes.textField}
                                        value={informacionPersonal.curp}
                                        margin="normal" fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <TextField disabled
                                        id="rfc"
                                        label="RFC: "
                                        className={classes.textField}
                                        value={informacionPersonal.rfc}
                                        margin="normal" fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <TextField disabled
                                        id="nacionalidad"
                                        label="Nacionalidades: "
                                        className={classes.textField}
                                        value={informacionPersonal.nacionalidades.map(item=>{return item.valor+', '})}
                                        margin="normal" fullWidth
                                    />
                                </Grid>
                                <Grid item md={3} xs={6}>
                                    <TextField disabled
                                        id="paisNacimiento"
                                        label="País nacimiento: "
                                        className={classes.textField}
                                        value={informacionPersonal.pais_nacimiento.valor}
                                        margin="normal" fullWidth
                                    />
                                </Grid>


                                <Grid item xs={6} md={3}>
                                    <TextField disabled
                                        id="entidadFederativaNacimiento"
                                        label="Entidad federativa nacimiento: "
                                        className={classes.textField}
                                        value={informacionPersonal.entidad_federativa_nacimiento.nom_ent}
                                        margin="normal" fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <TextField disabled
                                        id="fechaNacimiento"
                                        label="Fecha nacimiento: "
                                        className={classes.textField}
                                        value={informacionPersonal.fecha_nacimiento}
                                        margin="normal" fullWidth
                                    />
                                </Grid>

                                <Grid item xs={6} md={3}>
                                    <TextField disabled
                                        id="numeroIdentificacion"
                                        label="Numero identificacion oficial: "
                                        className={classes.textField}
                                        value={informacionPersonal.numero_identificacion_oficial}
                                        margin="normal" fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <TextField disabled
                                        id="correoLaboral"
                                        label="Correo electrónico laboral: "
                                        className={classes.textField}
                                        value={informacionPersonal.correo_electronico.laboral}
                                        margin="normal" fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <TextField disabled
                                        id="correoPersonal"
                                        label="Correo electrónico personal: "
                                        className={classes.textField}
                                        value={informacionPersonal.correo_electronico.personal}
                                        margin="normal" fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <TextField disabled
                                        id="telefonoPersonal"
                                        label="Teléfono personal: "
                                        className={classes.textField}
                                        value={informacionPersonal.telefono.personal}
                                        margin="normal" fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <TextField disabled
                                        id="celular"
                                        label="Teléfono celular: "
                                        className={classes.textField}
                                        value={informacionPersonal.telefono.celular}
                                        margin="normal" fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <TextField disabled
                                        id="estadoCivil"
                                        label="Estado civil: "
                                        className={classes.textField}
                                        value={informacionPersonal.estado_civil.valor}
                                        margin="normal" fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <TextField disabled
                                        id="regimenMatrimonial"
                                        label="Régimen matrimonial: "
                                        className={classes.textField}
                                        value={informacionPersonal.regimen_matrimonial.valor}
                                        margin="normal" fullWidth
                                    />
                                </Grid>
                                <Grid item  xs={12}>
                                    <Typography variant={'subheading'}
                                                className={classes.title}>{'Domicilio'}</Typography>
                                </Grid>
                                <Grid item md={3} xs={6}>
                                    <TextField disabled
                                        id="domicilioPais"
                                        label="País: "
                                        className={classes.textField}
                                        value={informacionPersonal.domicilio.pais.valor}
                                        margin="normal" fullWidth
                                    />
                                </Grid>
                                <Grid item md={3} xs={6}>
                                    <TextField disabled
                                        id="domicilioEntidad"
                                        label="Entidad federavia: "
                                        className={classes.textField}
                                        value={informacionPersonal.domicilio.entidad_federativa.nom_ent}
                                        margin="normal" fullWidth
                                    />
                                </Grid>
                                <Grid item md={3} xs={6}>
                                    <TextField disabled
                                        id="domicilioMunicipio"
                                        label="Municipio: "
                                        className={classes.textField}
                                        value={informacionPersonal.domicilio.municipio.nom_mun}
                                        margin="normal" fullWidth
                                    />
                                </Grid>
                                <Grid item md={3} xs={6}>
                                    <TextField disabled
                                        id="domicilioCP"
                                        label="Código postal: "
                                        className={classes.textField}
                                        value={informacionPersonal.domicilio.cp}
                                        margin="normal" fullWidth
                                    />
                                </Grid>
                                <Grid item md={3} xs={6}>
                                    <TextField disabled
                                        id="domicilioColonia"
                                        label="Colonia: "
                                        className={classes.textField}
                                        value={informacionPersonal.domicilio.localidad.nom_loc}
                                        margin="normal" fullWidth
                                    />
                                </Grid>
                                <Grid item md={3} xs={6}>
                                    <TextField disabled
                                        id="domicilioTipoVia"
                                        label="Tipo de vía: "
                                        className={classes.textField}
                                        value={informacionPersonal.domicilio.vialidad.tipo_vial}
                                        margin="normal" fullWidth
                                    />
                                </Grid>
                                <Grid item md={3} xs={6}>
                                    <TextField disabled
                                        id="domicilioNombreVia"
                                        label="Nombre de la vía: "
                                        className={classes.textField}
                                        value={informacionPersonal.domicilio.vialidad.nom_vial}
                                        margin="normal" fullWidth
                                    />
                                </Grid>
                                <Grid item md={3} xs={6}>
                                    <TextField disabled
                                        id="domicilionoExterior"
                                        label="Número exterior: "
                                        className={classes.textField}
                                        value={informacionPersonal.domicilio.numExt}
                                        margin="normal" fullWidth
                                    />
                                </Grid>
                                <Grid item md={3} xs={6}>
                                    <TextField disabled
                                        id="domicilioInterior"
                                        label="Número interior: "
                                        className={classes.textField}
                                        value={informacionPersonal.domicilio.numInt}
                                        margin="normal" fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                </div>

            </div>
        );
    }

}

InformacionPersonal.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InformacionPersonal);