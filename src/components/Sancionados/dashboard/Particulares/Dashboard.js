import React from 'react';
import {withStyles} from "@mui/styles";
import PropTypes from 'prop-types';
import {Grid, Link, Paper, Typography} from "@mui/material";
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
    },
    link: {
        textDecoration: "none",
        color: theme.palette.text.linkColor,
        wordBreak: "break-all",
    },
});

function Dashboard(props) {
    const {classes} = props;
    return (
        <div id={'s3pgraf'} className={classes.root}>
            <Paper elevation={15} className={classes.paper}>
                <Grid container spacing={0} justifyContent='center' className={classes.aux}>
                    <Grid item xs={12} className={classes.sectionG}>
                        <Typography>
                            <b>{"¿Qué información es?"}</b>
                        </Typography>
                        <Typography className={classes.desc}>
                            La información corresponde a las personas servidoras públicas y particulares sancionados ,
                            reportada en el Registro de Proveedores y Contratistas Sancionados de la Secretaría de la
                            Función Pública del 2004 a enero de 2022, actualmente se cuenta con <b>2,074 registros</b>.
                        </Typography>
                        <Typography>
                            <b>{"¿Cómo se obtiene la información?"}</b>
                        </Typography>
                        <Typography className={classes.desc}>
                            Se obtiene del Registro de Proveedores y Contratistas Sancionados disponible en
                            datos.gob.mx <br/>
                            (Fuente:
                            <Link className={classes.link}
                                  href={'https://www.datos.gob.mx/busca/dataset/proveedores-y-contratistas-sancionados'}
                                  target="_blank" rel="noopener noreferrer">datos.gob.mx</Link>)
                        </Typography>
                        <Typography>
                            <b>{"¿Qué puedo encontrar?"}</b>
                        </Typography>
                        <Typography className={classes.desc}>
                            A continuación encontrará 4 secciones:<br/><br/>
                            1.-<b>Cantidad de licitantes, proveedores y contratistas sancionados.</b> Muestra el número
                            de licitantes, proveedores y contratistas sancionados cuya fecha de resolución va del 2004 a
                            enero 2022. <Link className={classes.link} href={"#g1"}>Ver</Link><br/>
                            2.-<b>Sentido de las resoluciones.</b> Conoce cuál ha sido el sentido de la resolución para
                            las sanciones a lo largo del tiempo, así como, de manera general, el número de sanciones por
                            cada uno de ellos. <Link className={classes.link} href={"#g2"}>Ver</Link><br/>
                            3.-<b>Dependencias con mayor número de sanciones.</b> Muestra cuáles son las dependencias
                            con mayor número de licitantes, proveedores y contratistas sancionados de manera global y
                            por año. <Link className={classes.link} href={"#g3"}>Ver</Link><br/>
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

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);