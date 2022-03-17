import React from 'react';
import {withStyles} from "@mui/styles";
import PropTypes from 'prop-types';
import {Grid, Typography, Paper} from "@mui/material";
import AnioResolucionSanciones from "./AnioResolucionSanciones";
import SentidoResoluciones from "./SentidoResoluciones";
import DependenciasSanciones from "./DependenciasSanciones";
import '../graficas.css';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    sectionT: {
        maxWidth: '1200px',
        overflowX: 'auto',
        marginBottom: "25px",
        marginTop: "53px"
    },
    desc: {
        marginBottom: "15px"
    },
    sectionG: {
        maxWidth: '1200px',
        overflowX: 'auto',
        paddingRight: theme.spacing(4),
        paddingLeft: theme.spacing(4),
    },
    aux: {
        [theme.breakpoints.up('sm')]: {
            marginBottom: theme.spacing(7),
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(4),
        },
        padding: theme.spacing(1)
    },
    paper: {
        backgroundColor: theme.palette.background.opaque,
        maxWidth: 1200,
        paddingTop: theme.spacing(7),
        margin: 'auto',
        color: theme.palette.primario.contrastText,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.secundario.main,
        borderRadius: '0px 10px 10px 10px'
    }
});

class Dashboard extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div id={'s3pgraf'} className={classes.root}>
                <Paper elevation={15} className={classes.paper}>
                    <Grid container spacing={0} justifyContent='center' className={classes.aux}>
                        <Grid item xs={12} className={classes.sectionG}>
                            <Typography>
                                <b>{"¿Qué información es?"}</b>
                            </Typography>
                            <Typography className={classes.desc}>
                                La información presentada corresponde a los licitantes, proveedores y contratistas
                                sancionados, reportada en el Registro de Proveedores
                                y Contratistas Sancionados del 2004 a mayo 2021.
                                <br/>En esta entrega, se cuentan con 1,974 registros.
                            </Typography>
                            <Typography>
                                <b>{"¿Cómo se obtiene la información?"}</b>
                            </Typography>
                            <Typography className={classes.desc}>
                                Para consultar la información reportada por la Secretaría de la Función Pública visita
                                la
                                página datos.gob.mx <br/>
                                (Fuente:
                                <a href={'https://www.datos.gob.mx/busca/dataset/proveedores-y-contratistas-sancionados'}
                                   target="_blank"
                                   rel="noopener noreferrer">https://www.datos.gob.mx/busca/dataset/proveedores-y-contratistas-sancionados</a>)
                            </Typography>
                            <Typography>
                                <b>{"¿Qué puedo encontrar?"}</b>
                            </Typography>
                            <Typography className={classes.desc}>
                                A continuación encontrará 4 secciones:<br/><br/>
                                1.-<b>Cantidad de licitantes, proveedores y contratistas sancionados.</b> Comprende la
                                información entre el 2004 a mayo 2021, respecto a la cantidad de licitantes, proveedores
                                y contratistas sancionados. <a href={"#g1"}>Ver</a><br/>
                                2.-<b>Sentido de las resoluciones.</b> Muestra cuál fue el sentido de la resolución para
                                las sanciones a lo largo del tiempo y de manera general. <a href={"#g2"}>Ver</a><br/>
                                3.-<b>Dependencias con mayor número de sanciones.</b> Muestra cuáles son las
                                dependencias con mayor número de licitantes, proveedores y contratistas sancionados de
                                manera global y por año. <a href={"#g3"}>Ver</a><br/>
                                {/*4.-<b>Duración de las sanciones.</b> Muestra cómo varía la duración de las sanciones por año, por tipo de resolución y por dependencia. <a href="#g4">Ver</a>*/}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.sectionT} id={"g1"}>
                            <AnioResolucionSanciones/>
                        </Grid>
                        <Grid item xs={12} className={classes.sectionT} id={"g2"}>
                            <SentidoResoluciones/>
                        </Grid>
                        <Grid item xs={12} className={classes.sectionT} id={"g3"}>
                            <DependenciasSanciones/>
                        </Grid>
                        {
                            /*
                            <Grid item xs={12} className={classes.sectionT}>
                            <BoxPlotTest/>
                        </Grid>
                             */
                        }


                    </Grid>
                </Paper>
            </div>
        )
    }

}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);