import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import {Typography} from "@material-ui/core"
import AnioResolucionSanciones from "./AnioResolucionSanciones";
import SentidoResoluciones from "./SentidoResoluciones";
import DependenciasSanciones from "./DependenciasSanciones";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    bgPanelTable: {
        backgroundColor: theme.palette.white.color,
        [theme.breakpoints.up('sm')]: {
            marginBottom: theme.spacing(30),
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(10),
        },
    },
    sectionT: {
        maxWidth: '1200px',
        overflowX: 'auto',
        marginBottom: "25px",
        marginTop: "53px"
    },
    desc: {
        marginBottom: "15px"
    }
});

class Dashboard extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>

                <Grid container spacing={0} justify='center' className={classes.bgPanelTable}>
                    <Grid item xs={12} className={classes.sectionT}>
                        <Typography variant={"h6"}>
                            {"¿Qué información es?"}
                        </Typography>
                        <Typography variant={"body1"} className={classes.desc}>
                            {"La información presentada corresponde a los proveedores y contratistas sancionados. Cuenta con información del 2004 a la fecha. "}
                        </Typography>
                        <Typography variant={"h6"}>
                            {"¿Cómo se obtiene la información?"}
                        </Typography>
                        <Typography variant={"body1"} className={classes.desc}>
                            {"La fuente de datos es del Registro de Proveedores y Contratistas Sancionados reportada por la Secretaria de la Función Pública en datos.gob.mx (Fuente: https://datos.gob.mx/busca/dataset/servidores-publicos-sancionados)"}
                        </Typography>
                        <Typography variant={"h6"}>
                            {"¿Cómo usar este dashboard?"}
                        </Typography>
                        <Typography variant={"body1"} className={classes.desc}>
                            El dashboard está dividido en 4 secciones:<br/>
                            1.-Cantidad de proveedores y contratistas sancionados. Comprende la información entre el 2004 a la fecha.<br/>
                            2.-Sentido de las resoluciones: Muestra cuál fue el sentido de la resolución para las sanciones a lo largo del tiempo y de manera general.<br/>
                            3.-Dependencias con mayor número de sanciones: Muestra cuáles son las dependencias con mayor número de proveedores y contratistas sacionados de manera global y por año.<br/>
                            4.-Duración de las sanciones. Muestra cómo varía la duración de las sanciones por año, por tipo de resolución y por dependencia.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.sectionT}>
                        <AnioResolucionSanciones/>
                    </Grid>
                    <Grid item xs={12} className={classes.sectionT}>
                        <SentidoResoluciones/>
                    </Grid>
                    <Grid item xs={12} className={classes.sectionT}>
                        <DependenciasSanciones/>
                    </Grid>
                    <Grid item xs={12} className={classes.sectionT}>

                    </Grid>
                    {
                        /*
                        <Grid item xs={12} className={classes.sectionT}>
                        <BoxPlotTest/>
                    </Grid>
                         */
                    }


                </Grid>

            </div>
        )
    }

}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);