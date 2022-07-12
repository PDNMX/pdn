import React from 'react';
import {withStyles} from "@mui/styles";
import PropTypes from 'prop-types';
import {Grid, Paper} from "@mui/material";
import CausaSanciones from "./CausaSanciones";
import AnioResolucionSanciones from "./AnioResolucionSanciones";
import DependenciasSanciones from "./DependenciasSanciones";
import '../graficas.css';
import TotalRows from "./TotalRows"
import TotalDependencias from "./TotalDependencias";
import TotalSancionesFin from "./TotalSancionesFin";
import FooterPage from "@Compartidos/Dashboards/FooterPage";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    sectionT: {
        maxWidth: '1200px',
        overflowX : 'auto',
        [theme.breakpoints.up('sm')]: {
            marginBottom: theme.spacing(2),
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(1),
        }
    },
    desc:{
        marginBottom : theme.spacing(2),
    },
    sectionG: {
        maxWidth: '1200px',
        overflowX : 'auto',
        paddingRight: theme.spacing(4),
        paddingLeft: theme.spacing(4),
    },
    aux:{
        [theme.breakpoints.up('sm')]: {
            marginBottom: theme.spacing(7),
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(4),
        },
        padding: theme.spacing(1)
    },
    paper:{
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

const Dashboard = (props) => {
        const {classes} = props;
        return (
            <div id={'s3sgraf'} className={classes.root}>
                <Paper elevation={15} className={classes.paper}>
                <Grid container spacing={3} justifyContent='center' className={classes.aux}>
                    <Grid item xs={4}>
                        <TotalRows/>
                    </Grid>
                    <Grid item xs={4}>
                        <TotalDependencias/>
                    </Grid>
                    <Grid item xs={4}>
                        <TotalSancionesFin/>
                    </Grid>
                    <Grid item xs={12}  id={"g1"}>
                        <AnioResolucionSanciones/>
                    </Grid>
                    <Grid item xs={12}  id={"g2"}>
                        <CausaSanciones/>
                    </Grid>
                    <Grid item xs={12}  id={"g3"}>
                        <DependenciasSanciones/>
                    </Grid>
                    <Grid item xs={12}>
                        <FooterPage  dataSet={"Servidores públicos sancionados"}
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