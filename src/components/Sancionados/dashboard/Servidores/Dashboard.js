import React from 'react';
import {withStyles} from "@mui/styles";
import PropTypes from 'prop-types';
import {Grid, Typography} from "@mui/material";
import TiemposSanciones from "./TiemposSanciones";
import CausaSanciones from "./CausaSanciones";
import AnioResolucionSanciones from "./AnioResolucionSanciones";
import DependenciasSanciones from "./DependenciasSanciones";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    sectionT: {
        maxWidth: '1200px',
        overflowX : 'auto',
        marginTop : theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            marginBottom: theme.spacing(7),
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(4),
        },
    },
    desc:{
        marginBottom : theme.spacing(2),
    },
    sectionG: {
        maxWidth: '1200px',
        overflowX : 'auto',
    },
    aux:{
        [theme.breakpoints.up('sm')]: {
            marginBottom: theme.spacing(7),
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(4),
        },
        padding: theme.spacing(1)
    }
});

class Dashboard extends React.Component {
    render(){
        const {classes} = this.props;
        return (
            <div className={classes.root}>

                <Grid container spacing={0} justifyContent='center' className={classes.aux}>
                    <Grid item xs={12} className={classes.sectionG}>
                        <Typography >
                            <b>{"¿Qué información es?"}</b>
                        </Typography>
                        <Typography className={classes.desc}>
                            {"La información que se presenta a continuación corresponde a las personas servidoras públicas sancionados reportadas en el Registro de Servidores Públicos Sancionados (RSPS) de 2013 a mayo 2021. La sanción recibida reportada en los datos es la de inhabilitación para desempeñarse como servidor público. En esta entrega, se cuentan con 1,206 registros."}
                        </Typography>
                        <Typography  >
                            <b>{"¿Cómo se obtiene la información?"}</b>
                        </Typography>
                        <Typography className={classes.desc}>
                            Para consultar la información reportada por la Secretaría de la Función Pública visita la
                            página datos.gob.mx <br/>
                            (Fuente:
                            <a href={'https://datos.gob.mx/busca/dataset/servidores-publicos-sancionados'} target="_blank" rel="noopener noreferrer">https://datos.gob.mx/busca/dataset/servidores-publicos-sancionados</a>)
                        </Typography>
                        <Typography >
                            <b>¿Qué puedo encontrar?</b>
                        </Typography>
                        <Typography className={classes.desc}>
                            Considerando los campos en el conjunto de datos, las visualizaciones presentan 4 puntos principales:  <br/><br/>
                            1. <b>Cantidad de personas servidoras públicas sancionadas.</b> Conoce el número de personas servidoras públicas sancionadas del año 2013 a mayo 2021. <a href={"#g1"}>Ver</a><br/>
                            2. <b>Causa de las sanciones.</b> Muestra cuáles fueron las causas de la sanciones desde el año 2013 a mayo 2021, es posible ver el comportamiento de manera general o particular. <a href={"#g2"}>Ver</a><br/>
                            3. <b>Dependencias con más personas servidoras públicas sancionadas.</b> Muestra cuáles son las dependencias con más personas servidoras públicas sancionadas. <a href={"#g3"}>Ver</a><br/>
                            4. <b>Duración de las sanciones.</b> Muestra cómo varía la duración de las inhabilitaciones por año. <a href={"#g4"}>Ver</a>
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