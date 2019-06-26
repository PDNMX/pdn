import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import TiemposSanciones from "./TiemposSanciones";
import CausaSanciones from "./CausaSanciones";
import AnioResolucionSanciones from "./AnioResolucionSanciones";
import DependenciasSanciones from "./DependenciasSanciones";
import {Typography} from "@material-ui/core"

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
        overflowX : 'auto',
        marginBottom : "25px",
        marginTop : "53px"
    },
    desc:{
        marginBottom : "15px"
    }
});

class Dashboard extends React.Component {
    render(){
        const {classes} = this.props;
        return (
            <div className={classes.root}>

                <Grid container spacing={0} justify='center' className={classes.bgPanelTable}>
                    <Grid item xs={12} className={classes.sectionT}>
                        <Typography variant={"h6"}>
                            <b>¿Qué información es?</b>
                        </Typography>
                        <Typography variant={"body1"} className={classes.desc}>
                            {"La información que se presenta a continuación corresponde a  los servidores públicos sancionados reportados en el Registro de Servidores Públicos Sancionados (RSPS) a partir de 2013 y hasta 2018. La sanción recibida reportada en los datos es la de inhabilitación para desempeñarse como servidor público"}
                        </Typography>
                        <Typography variant={"h6"} >
                            <b>¿Cómo se obtiene la información?</b>
                        </Typography>
                        <Typography variant={"body1"} className={classes.desc}>
                            {"Obtención semanal de las sanciones de tipo Inhabilitación vigentes resueltas a partir del año 2013. La fuente de datos es el Registro de Servidores Públicos Sancionados reportada por Función Pública en datos.gob.mx (Fuente: https://datos.gob.mx/busca/dataset/servidores-publicos-sancionados)."}
                        </Typography>
                        <Typography variant={"h6"}>
                            <b>¿Qué puedo encontrar?</b>
                        </Typography>
                        <Typography variant={"body1"} className={classes.desc}>
                            Las visualizaciones presentan 4 puntos principales:  <br/>
                            1. <b>Cantidad de funcionarios sancionados.</b> Permite conocer desde 2013 a la fecha el número de funcionarios sancionados. <a href="#g1">Ver</a><br/>
                            2. <b>Causa de las sanciones.</b> Muestra cuáles fueron las causas de la sanción desde 2013. Es posible ver cuáles son las más y las menos comunes.<a href="#g2">Ver</a><br/>
                            3. <b>Dependencias con más sancionados.</b> Muestra cuáles son las dependencias con más funcionarios sancionados. Es posible descargar el detalle de los sancionados (nombre, autoridad sancionadora, dependencia, inicio y fin de la sanción y causa). <a href="#g3">Ver</a><br/>
                            4. <b>Duración de las sanciones.</b> Muestra cómo varía la duración de las sanciones por año, por tipo de sanción y por dependencia. <a href="#g4">Ver</a>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.sectionT} id={"g1"}>
                        <AnioResolucionSanciones/>
                    </Grid>
                    <Grid item xs={12} className={classes.sectionT} id={"g2"}>
                        <CausaSanciones/>
                    </Grid>
                    <Grid item xs={12} className={classes.sectionT} id={"g3"}>
                        <DependenciasSanciones/>
                    </Grid>
                    <Grid item xs={12} className={classes.sectionT} id={"g4"}>
                        <TiemposSanciones/>
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