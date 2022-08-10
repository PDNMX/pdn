import React from 'react';
import {withStyles} from "@mui/styles";
import PropTypes from 'prop-types';
import {Grid, Paper} from "@mui/material";
import AnioResolucionSanciones from "./AnioResolucionSanciones";
import SentidoResoluciones from "./SentidoResoluciones";
import SentidoResolucionesAnio from "./SentidoResolucionesAnio";
import DependenciasSanciones from "./DependenciasSanciones";
import '../graficas.css';
import TotalRows from "./TotalRows";
//import TotalDependencias from "./TotalDependencias";
import TotalParticulares from "./TotalParticulares";
import TotalMultas from "./TotalMultas";
import FooterPage from "@Compartidos/Dashboards/FooterPage";

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
                <Grid container spacing={3} justifyContent='center' className={classes.aux}>
                    <Grid item xs={4}>
                        <TotalRows/>
                    </Grid>
                    {
                        /*
                    <Grid item xs={3}>
                        <TotalDependencias/>
                    </Grid>

                         */
                    }
                    <Grid item xs={4}>
                        <TotalParticulares/>
                    </Grid>
                    <Grid item xs={4}>
                        <TotalMultas/>
                    </Grid>
                    <Grid item xs={12} md={6}  id={"g1"}>
                        <AnioResolucionSanciones/>
                    </Grid>
                    <Grid item xs={12} md={6}  id={"g2"}>
                        <SentidoResoluciones/>
                    </Grid>
                    <Grid item xs={12}  id={"g2"}>
                        <SentidoResolucionesAnio/>
                    </Grid>
                    <Grid item xs={12}  id={"g3"}>
                        <DependenciasSanciones/>
                    </Grid>
                    {
                        /*
                        <Grid item xs={12} >
                        <BoxPlotTest/>
                    </Grid>
                         */
                    }

                    <Grid item xs={12}>
                       <FooterPage  dataSet={"Proveedores y contratistas sancionados"}
                                    provider={"Secretaría de la Función Pública"}
                                    referenceDate={"17/05/2022"}/>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);