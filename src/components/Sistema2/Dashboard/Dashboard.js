import React from 'react';
import {withStyles} from '@mui/styles';
import {Paper, Box, Typography, List, ListItem, ListItemText, Link} from "@mui/material";
import Ejercicio from "./Ejercicio";
import Agrupaciones from "./Agrupaciones";
import Tops from "./Tops";
import Procedimientos from "./Procedimientos";
import './graficas.css'

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    box: {
        maxWidth: '1200px',
        overflowX: 'auto',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(4)
    },
    paper: {
        backgroundColor: theme.palette.background.opaque,
        padding: theme.spacing(2),
        color: theme.palette.primario.contrastText,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.secundario.main,
        borderRadius: '10px 10px 10px 10px'
    }
});

const Dashboard = props => {
    const {classes} = props;
    return (
        <div className={classes.root} id={"s2sgraf"}>
            <Paper className={classes.paper} elevation={15}>
                <Box p={1}>
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
                        (Fuente: <Link href='https://datos.gob.mx/busca/dataset/registro-de-servidores-publicos-que-intervienen-en-contrataciones-publicas'
                           target="_blank" rel="noopener noreferrer">
                            datos.gob.mx
                        </Link>)
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
                                procesos de contratación en cada uno de los ejercicios fiscales. <Link href="#g1">Ver</Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                2. <b>Procedimiento:</b> Conoce la cantidad de cada uno de los tipos de procedimiento que se
                                han llevado a cabo en cada ejercicio fiscal. <Link href="#g2">Ver</Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                3. <b>Ejercicios, ramos e instituciones:</b> Observa más a fondo el comportamiento del número de personas servidoras públicas
                                que intervienen en procesos de contratación,
                                podrás configuar variables como el Ejercicio Fiscal, el Ramo y/o la Institución para obtener
                                información más detallada <Link href="#g3">Ver</Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <Typography paragraph>
                                4. <b>Top 10:</b> En esta gráfica puedes conocer los procedimientos, las instituciones, unidades
                                responsables o puestos con más registros de manera general o bien en cada ejercicio, ramo, o institución. <Link href="#g4">Ver</Link>
                            </Typography>
                        </ListItem>
                    </List>
                </Box>

                <Box className={classes.box} id='g1'>
                    <Ejercicio/>
                </Box>
                <Box className={classes.box} id='g2'>
                    <Procedimientos/>
                </Box>
                <Box className={classes.box} id='g3'>
                    <Agrupaciones/>
                </Box>
                <Box className={classes.box} id='g4'>
                    <Tops/>
                </Box>

            </Paper>
        </div>
    );
};

export default withStyles(styles)(Dashboard);