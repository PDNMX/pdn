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

class DetalleServidorSancionado extends React.Component {
    render() {
        const {classes, handleChangeDetail, servidor} = this.props;

        return (
            <div>
                <Grid container spacing={0} className={classes.infoBusqueda}>
                    <Grid item xs={12} className={classes.container}>
                        <Paper className={classes.paper} elevation={3}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography style={{textAlign: "right"}}>
                                <span className={classes.cuadroActualizacion}>
                                  Actualización:{" "}{servidor.fechaCaptura}
                                </span>
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Typography variant={"h6"}>
                                        {servidor.servidorPublicoSancionado.nombres}{" "}{servidor.servidorPublicoSancionado.primerApellido}{" "}{servidor.servidorPublicoSancionado.segundoApellido}
                                    </Typography>
                                    <Typography className={classes.dataCard}>
                                        {servidor.servidorPublicoSancionado.puesto}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography className={classes.tituloCard}>
                                        Dependencia
                                    </Typography>
                                    <Typography className={classes.dataCard}>
                                        {servidor.institucionDependencia.nombre}({servidor.institucionDependencia.siglas})
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider className={classes.divider} variant={"middle"}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography className={classes.titulo} align={"center"}>
                                        Información de la falta
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Typography className={classes.tituloCard}>
                                        Expediente
                                    </Typography>
                                    <Typography className={classes.dataCard}>
                                        {servidor.expediente}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Typography className={classes.tituloCard}>
                                        Tipo falta
                                    </Typography>
                                    <Typography className={classes.dataCard}>
                                        {servidor.tipoFalta}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Typography className={classes.tituloCard}>
                                        Causa, motivo o hechos
                                    </Typography>
                                    <Typography className={classes.dataCard}>
                                        {servidor.causaMotivoHechos}
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
                                        {servidor.autoridadSancionadora}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Typography className={classes.tituloCard}>
                                        Fecha resolución
                                    </Typography>
                                    <Typography className={classes.dataCard}>
                                        {servidor.resolucion.fechaResolucion}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Typography className={classes.tituloCard}>
                                        Tipo sanción
                                    </Typography>
                                    <Typography className={classes.dataCard}>
                                        {servidor.tipoSancion.join(', ')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Typography className={classes.tituloCard}>
                                        Multa
                                    </Typography>
                                    <Typography className={classes.dataCard}>
                                        {servidor.multa.monto} {servidor.multa.moneda}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Typography className={classes.tituloCard}>
                                        Inhabilitación plazo
                                    </Typography>
                                    <Typography className={classes.dataCard}>
                                        {servidor.inhabilitacion.plazo}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Typography className={classes.tituloCard}>
                                        Inhabilitación periodo
                                    </Typography>
                                    <Typography className={classes.dataCard}>
                                        {servidor.inhabilitacion.fechaInicial}- {servidor.inhabilitacion.fechaFinal}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography className={classes.tituloCard}>
                                        Observaciones
                                    </Typography>
                                    <Typography className={classes.dataCard}>
                                        {servidor.observaciones}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} style={{textAlign: 'right'}}>
                                    <Button className={classes.btnBack} onClick={() => handleChangeDetail()}
                                            startIcon={<ArrowBackIosIcon/>}
                                    >Regresar</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

            </div>
        )
    }

}

DetalleServidorSancionado.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetalleServidorSancionado);