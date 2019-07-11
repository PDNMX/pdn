import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import {Typography} from "@material-ui/core"
import Ejercicio from "./Ejericicio";
import Agrupaciones from "./Agrupaciones";
import Tops from "./Tops";
import Procedimientos from "./Procedimientos";

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
        //overflowX: 'auto',
        marginBottom: "25px",
        marginTop: "53px"
    },
    desc: {
        marginBottom: "15px",
        textAlign : "justify"
    }
});

class Dashboard extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>

                <Grid container spacing={0} justify='center'>
                    <Grid item xs={12} className={classes.sectionT}>
                        <Typography variant={"h6"}>
                            <b>¿Qué información es?</b>
                        </Typography>
                        <Typography variant={"body1"} className={classes.desc}>
                            La información utilizada para generar las siguientes visualizaciones corresponde a la
                            reportada por la Secretaría de la Función Pública del 2015 a la fecha, respecto al Registro
                            de Servidores públicos de la Administración Pública Federal
                            que intervienen en procedimientos de contrataciones públicas, el otorgamiento de licencias,
                            permisos, concesiones y autorizaciones, así como en la enajenación
                            de bienes muebles de la administración pública federal y en la asignación y emisión de
                            dictámenes en materia de avalúos y justipreciación de rentas.
                        </Typography>
                        <Typography variant={"h6"}>
                            <b>¿Cómo se obtiene la información?</b>
                        </Typography>
                        <Typography variant={"body1"} className={classes.desc}>
                            Para consultar la información reportada por la Secretaría de la Función Pública visita la
                            página datos.gob.mx <br/>
                            (Fuente:
                            https://datos.gob.mx/busca/dataset/registro-de-servidores-publicos-que-intervienen-en-contrataciones-publicas)
                        </Typography>
                        <Typography variant={"h6"}>
                            <b>¿Qué puedo encontrar?</b>
                        </Typography>
                        <Typography variant={"body1"} className={classes.desc}>
                            Las adquisiciones, arrendamientos, servicios y obras públicas del gobierno se realizan
                            mediante un proceso en el que las instituciones gubernamentales
                            contratan a proveedores para el cumplimiento de metas y objetivos de los programas
                            presupuestarios en cada Ejercicio Fiscal.Estas instituciones, de acuerdo al tipo de
                            organismo
                            que son, conforman los diferentes ramos (Previsión de gasto con el mayor nivel de agregación
                            en el Presupuesto de Egresos).<br/><br/>

                            Las visualizaciones te permiten observar el comportamiento de los procesos de contratación
                            desde diferentes perspectivas que involucran lo antes mencionado.<br/><br/>

                            1. <b>Ejercicio fiscal.</b> Permite conocer el número de funcionarios que intervienen en
                            procesos de contratación en cada uno de los ejercicios fiscales.<a
                            href="#g1">Ver</a><br/><br/>

                            2. <b>Procedimiento.</b> Conoce la cantidad de cada uno de los tipos de procedimiento que se
                            han llevado a cabo en cada ejercicio fiscal.<a href="#g2">Ver</a><br/><br/>

                            3. <b>Ejercicios, Ramos e Instituciones.</b> Observa más a fondo el comportamiento de los
                            funcionarios que intervienen en procesos de contratación,
                            podrás configuar variables como el Ejercicio Fiscal, el Ramo y/o la Institución para obtener
                            información más detallada<a href="#g3">Ver</a><br/><br/>

                            4. <b>Top 10.</b> Debido a la gran diversidad de datos, en está gráfica puedes obtener el
                            Top 10 de los procedimientos, las instituciones, unidades responsables o puestos,
                            de manera general o bien en cada Ejercicio, Ramo, o Institución.<a
                            href="#g4">Ver</a><br/><br/>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.sectionT} id={"g1"}>
                        <Ejercicio/>
                    </Grid>
                    <Grid item xs={12} className={classes.sectionT}  id={"g2"}>
                        <Procedimientos/>
                    </Grid>
                    <Grid item xs={12} className={classes.sectionT}  id={"g3"}>
                        <Agrupaciones/>
                    </Grid>
                    <Grid item xs={12} className={classes.sectionT} id={"g4"}>
                        <Tops/>
                    </Grid>
                </Grid>
            </div>
        )
    }

}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);