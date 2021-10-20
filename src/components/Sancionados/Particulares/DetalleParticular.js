import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {Paper, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const styles = theme => ({
    infoBusqueda: {
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        backgroundColor: "white",
        marginBottom: theme.spacing(8)
    },
    paper: {
        padding: theme.spacing(3, 2),
        margin: theme.spacing(3, 2)
    },
    cuadroActualizacion: {
        color: "#FFF",
        backgroundColor: theme.palette.primary.dark,
        fontWeight: "bold",
        padding: "5px 10px"
    },
    titulo: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 10,
        textDecoration: "underline",
        textDecorationColor: theme.palette.primary.dark,
        color: theme.palette.primary.dark,
    },
    tituloCard: {
        fontSize: 13,
        fontWeight: "bold",
        marginBottom: 10
    },
    dataCard: {
        fontSize: 14,
        paddingBottom: 10,
        marginBottom: 10,
        paddingLeft: 20
    },
    divider: {
        backgroundColor: theme.palette.primary.dark,
        height: theme.spacing(1)
    },
    btnBack: {
        color: theme.palette.primary.dark,
    },
    container: {
        maxWidth: '1200px',
        margin: "0 auto"
    }
});

function DetalleParticularSancionado({classes, hideDetalle, particular}) {
    return (
        <Grid container spacing={0} className={classes.infoBusqueda}>
            <Grid item xs={12} className={classes.container}>
                <Paper className={classes.paper} elevation={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography style={{textAlign: "right"}}>
                                <span className={classes.cuadroActualizacion}>
                                  Actualización:{" "}{particular.fechaCaptura}
                                </span>
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant={"h6"}>
                                {particular.particularSancionado.nombreRazonSocial}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography className={classes.tituloCard}>
                                Dependencia
                            </Typography>
                            <Typography className={classes.dataCard}>
                                {particular.institucionDependencia.nombre}{particular.institucionDependencia.siglas ? '(' + particular.institucionDependencia.siglas + ')' : ''}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider className={classes.divider} variant={"middle"}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.titulo} align={"center"}>
                                Información general
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography className={classes.tituloCard}>
                                Expediente
                            </Typography>
                            <Typography className={classes.dataCard}>
                                {particular.expediente}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography className={classes.tituloCard}>
                                Tipo persona
                            </Typography>
                            <Typography className={classes.dataCard}>
                                {particular.particularSancionado.tipoPersona}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Typography className={classes.tituloCard}>
                                Objeto contrato
                            </Typography>
                            <Typography className={classes.dataCard}>
                                {particular.objetoContrato}
                            </Typography>
                        </Grid>


                        <Grid item xs={12} md={4}>
                            <Typography className={classes.tituloCard}>
                                Tipo falta
                            </Typography>
                            <Typography className={classes.dataCard}>
                                {particular.tipoFalta}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography className={classes.tituloCard}>
                                Acto
                            </Typography>
                            <Typography className={classes.dataCard}>
                                {particular.acto}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={particular.particularSancionado.objetoSocial.length < 86 ? 4 : 12}>
                            <Typography className={classes.tituloCard}>
                                Objeto social
                            </Typography>
                            <Typography className={classes.dataCard}>
                                {particular.particularSancionado.objetoSocial}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Typography className={classes.tituloCard}>
                                Causa, motivo o hechos
                            </Typography>
                            <Typography className={classes.dataCard}>
                                {particular.causaMotivoHechos}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography className={classes.titulo} align={"center"}>
                                Información de la sanción
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Typography className={classes.tituloCard}>
                                Autoridad sancionadora
                            </Typography>
                            <Typography className={classes.dataCard}>
                                {particular.autoridadSancionadora}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography className={classes.tituloCard}>
                                Fecha notificación
                            </Typography>
                            <Typography className={classes.dataCard}>
                                {particular.resolucion.fechaNotificacion}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography className={classes.tituloCard}>
                                Tipo sanción
                            </Typography>
                            <Typography className={classes.dataCard}>
                                {particular.tipoSancion.map(e => e.valor).join(', ')}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography className={classes.tituloCard}>
                                Multa
                            </Typography>
                            <Typography className={classes.dataCard}>
                                {particular.multa.monto} {particular.multa.moneda.clave}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography className={classes.tituloCard}>
                                Inhabilitación plazo
                            </Typography>
                            <Typography className={classes.dataCard}>
                                {particular.inhabilitacion ? particular.inhabilitacion.plazo : '-'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography className={classes.tituloCard}>
                                Inhabilitación periodo
                            </Typography>
                            <Typography className={classes.dataCard}>
                                Del {particular.inhabilitacion ? particular.inhabilitacion.fechaInicial : '-'} al {particular.inhabilitacion ? particular.inhabilitacion.fechaFinal : ''}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography className={classes.tituloCard}>
                                Observaciones
                            </Typography>
                            <Typography className={classes.dataCard}>
                                {particular.observaciones}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{textAlign: 'right'}}>
                            <Button className={classes.btnBack} onClick={() => hideDetalle()}
                                    startIcon={<ArrowBackIosIcon/>}
                            >Regresar</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )


}

DetalleParticularSancionado.propTypes = {
    classes: PropTypes.object.isRequired,
    hideDetalle: PropTypes.func.isRequired,
    particular: PropTypes.object.isRequired
};

export default withStyles(styles)(DetalleParticularSancionado);