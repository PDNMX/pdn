import React from 'react';
import {withStyles} from '@mui/styles';
import PropTypes from 'prop-types';
import {Grid, Typography, List, ListItem, ListItemText} from "@mui/material";
import Ejercicio from "./Ejericicio";
import Agrupaciones from "./Agrupaciones";
import Tops from "./Tops";
import Procedimientos from "./Procedimientos";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    sectionT: {
        maxWidth: '1200px',
        overflowX: 'auto',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(4)
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
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={0} justify='center' className={classes.aux}>
                    <Grid item xs={12}>
                        <Typography>
                            <b>¿Qué información es?</b>
                        </Typography>
                        <Typography paragraph>
                            La información utilizada para generar las siguientes visualizaciones corresponde a la
                            reportada por la Secretaría de la Función Pública del 2015 a mayo 2021, respecto al Registro
                            de Servidores públicos de la Administración Pública Federal
                            que intervienen en procedimientos de contrataciones públicas, el otorgamiento de licencias,
                            permisos, concesiones y autorizaciones, así como en la enajenación
                            de bienes muebles de la administración pública federal y en la asignación y emisión de
                            dictámenes en materia de avalúos y justipreciación de rentas.
                            <br/>
                            En esta entrega, se cuentan con 160,776 registros.
                        </Typography>

                        <Typography>
                            <b>¿Cómo se obtiene la información?</b>
                        </Typography>
                        <Typography paragraph>
                            Para consultar la información reportada por la Secretaría de la Función Pública visita la
                            página datos.gob.mx <br/>
                            (Fuente:
                            <a href={'https://datos.gob.mx/busca/dataset/registro-de-servidores-publicos-que-intervienen-en-contrataciones-publicas'} target="_blank" rel="noopener noreferrer">https://datos.gob.mx/busca/dataset/registro-de-servidores-publicos-que-intervienen-en-contrataciones-publicas</a>)
                        </Typography>

                        <Typography>
                            <b>¿Qué puedo encontrar?</b>
                        </Typography>
                        <Typography paragraph>
                            Las adquisiciones, arrendamientos, servicios y obras públicas del gobierno se realizan
                            mediante un proceso en el que las instituciones gubernamentales
                            contratan a proveedores para el cumplimiento de metas y objetivos de los programas
                            presupuestarios en cada ejercicio fiscal. Estas instituciones, de acuerdo al tipo de
                            organismo que son, conforman los diferentes ramos (previsión de gasto con el mayor nivel de agregación
                            en el Presupuesto de Egresos).
                        </Typography>
                        <Typography paragraph>
                            Las visualizaciones te permiten observar el comportamiento de los procesos de contratación
                            desde diferentes perspectivas:
                        </Typography>

                        <List>
                            <ListItem>
                                <ListItemText>
                                    1. <b>Ejercicio fiscal:</b> Permite conocer el número de personas servidoras públicas que intervienen en
                                    procesos de contratación en cada uno de los ejercicios fiscales. <a
                                    href={"#g1"}>Ver</a>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    2. <b>Procedimiento:</b> Conoce la cantidad de cada uno de los tipos de procedimiento que se
                                    han llevado a cabo en cada ejercicio fiscal. <a href={"#g2"}>Ver</a>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    3. <b>Ejercicios, ramos e instituciones:</b> Observa más a fondo el comportamiento del número de personas servidoras públicas
                                    que intervienen en procesos de contratación,
                                    podrás configuar variables como el Ejercicio Fiscal, el Ramo y/o la Institución para obtener
                                    información más detallada <a href={"#g3"}>Ver</a>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <Typography paragraph>
                                    4. <b>Top 10:</b> En esta gráfica puedes conocer los procedimientos, las instituciones, unidades
                                    responsables o puestos con más registros de manera general o bien en cada ejercicio, ramo, o institución. <a href={"#g4"}>Ver</a>
                                </Typography>
                            </ListItem>
                        </List>
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