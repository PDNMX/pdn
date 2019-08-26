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
    sectionT: {
        maxWidth: '1200px',
        overflowX : 'auto',
        marginTop : theme.spacing(7)
    },
    desc:{
        marginBottom : theme.spacing(2),
    },
    sectionG: {
        maxWidth: '1200px',
        overflowX : 'auto',
    },
});

class Dashboard extends React.Component {
    render(){
        const {classes} = this.props;
        return (
            <div className={classes.root}>

                <Grid container spacing={0} justify='center'>
                    <Grid item xs={12} className={classes.sectionG}>
                        <Typography >
                            <b>¿Qué información es?</b>
                        </Typography>
                        <Typography className={classes.desc}>
                            {"La información que se presenta a continuación corresponde a los servidores públicos sancionados reportados en el Registro de Servidores Públicos Sancionados (RSPS) de 2013 a 2018. La sanción recibida reportada en los datos es la de inhabilitación para desempeñarse como servidor público."}
                        </Typography>
                        <Typography  >
                            <b>¿Cómo se obtiene la información?</b>
                        </Typography>
                        <Typography className={classes.desc}>
                            {"Obtención semanal de las sanciones de tipo Inhabilitación vigentes resueltas a partir del año 2013. La fuente de datos es el Registro de Servidores Públicos Sancionados reportada por la Secretaria de la Función Pública en datos.gob.mx (Fuente: https://datos.gob.mx/busca/dataset/servidores-publicos-sancionados)."}
                        </Typography>
                        <Typography >
                            <b>¿Qué puedo encontrar?</b>
                        </Typography>
                        <Typography className={classes.desc}>
                            Considerando los campos en el conjunto de datos, las visualizaciones presentan 4 puntos principales:  <br/><br/>
                            1. <b>Cantidad de funcionarios sancionados.</b> Conoce el número de funcionarios sancionados del 2013 a la fecha. <a href="#g1">Ver</a><br/>
                            2. <b>Causa de las sanciones.</b> Muestra cuáles fueron las causas de la sanciones desde 2013, es posible ver el comportamiento de manera general o particular. <a href="#g2">Ver</a><br/>
                            3. <b>Dependencias con más sancionados.</b> Muestra cuáles son las dependencias con más funcionarios sancionados. <a href="#g3">Ver</a><br/>
                            4. <b>Duración de las sanciones.</b> Muestra cómo varía la duración de las inhabilitaciones por año. <a href="#g4">Ver</a>
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