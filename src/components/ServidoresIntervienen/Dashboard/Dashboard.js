import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import {Typography} from "@material-ui/core"
import Ejercicio from "./Ejericicio";
import Agrupaciones from "./Agrupaciones";

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
                            <b>¿Qué información es?</b>
                        </Typography>
                        <Typography variant={"body1"} className={classes.desc}>
                            {"La información que se presenta a continuación corresponde a  los servidores públicos que intervienen en procesos de contratación " +
                            "reportados en el Registro de Servidores Públicos de la Administración Pública Federal (RENIRESP)."}
                        </Typography>
                        <Typography variant={"h6"}>
                            <b>¿Cómo se obtiene la información?</b>
                        </Typography>
                        <Typography variant={"body1"} className={classes.desc}>
                            {"La fuente de datos es el Registro de Servidores Públicos Sancionados reportada por Función Pública en datos.gob.mx (Fuente: https://datos.gob.mx/busca/dataset/registro-de-servidores-publicos-que-intervienen-en-contrataciones-publicas)."}
                        </Typography>
                        <Typography variant={"h6"}>
                            <b>¿Qué puedo encontrar?</b>
                        </Typography>
                        <Typography variant={"body1"} className={classes.desc}>
                            Las visualizaciones permiten realizar un análisis del comportamiento del número de funcionarios ante diversas variables interesantes: <br/><br/>

                            1. <b>Ejercicio fiscal.</b> Permite conocer el comportamiento del número de funcionarios que intervienen en procesos de contratación a través de los
                            ejercicios fiscales, se cuenta con información del año 2015 a la fecha <a href="#g1">Ver</a><br/><br/>

                            2. <b>Ejercicios, Ramos e Instituciones.</b> Permite conocer más a fondo el comportamiento de los funcionarios que intervienen en procesos de
                            contatación a través de la configuración de variables como el Ejercicio Fiscal, el Ramo y/o la Institución<a href="#g2">Ver</a><br/><br/>

                            3. <b>Puesto.</b> En la APF se encuentra una gran variedad de procesos de contratación, aquí
                            se puede encontrar información de los puestos que más intervienen en procesos de
                            contratación. Debido a que se encontraron 13,088 puestos diferentes, se muestra la
                            información de los 10 más comunes.<a href="#g3">Ver</a><br/><br/>

                            4. <b>Ramo, Institución, Unidad Responsable y Puesto.</b> En está sección se podrán
                            encontrar diferentes visualizaciones que muestran el comportamiento y la relación entre
                            estás variables <a href="#g3">Ver</a><br/>

                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.sectionT} id={"g1"}>
                        <Ejercicio/>
                    </Grid>
                    <Grid item xs={12}  id={"g2"}>
                        <Agrupaciones/>
                    </Grid>
                    <Grid item xs={12} className={classes.sectionT} id={"g3"}>

                    </Grid>
                    <Grid item xs={12} className={classes.sectionT} id={"g4"}>

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