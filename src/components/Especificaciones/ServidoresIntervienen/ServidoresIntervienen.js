import React from 'react';
import { withStyles } from '@mui/styles';
import {Divider, Grid, Button, Typography, Box, Paper} from '@mui/material';
import Estandar from "./DescripcionEstandar";
import Licencia from "../Licencia";
import Implementacion from "./Implementacion";
import Herramientas from "../Herramientas";
import ProcoloConexion from "../ProcoloConexion";
import bgimg from "../../../assets/rediseno/fondo_cruces.png";
import pdnRoutes from "../../../routes";
import HeaderV2 from "../../HomeV2/HeaderV2";

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.primario.main,
        backgroundImage: `url(${bgimg})`,
        backgroundRepeat: "repeat",
        backgroundPosition: 'fixed',
        color: '#f2f2f2'
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    item:{
        maxWidth: 1200,
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2)
    },
    container:{
        //background: "#fff",
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    divider:{
        marginBottom: theme.spacing(2)
    },
    ul: {
        listStyle: 'none',
        paddingLeft: '20px',
        color: theme.palette.text.primary
    },
    li: {
        "&:before":{
            content: '"•"',
            color: '#5fb1e6',
            fontWeight: "bold",
            display: "inline-block",
            width: "1em",
            marginLeft: "-1em"
        },
        paddingBottom: theme.spacing(1)
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(2),
        //background: '#ffe01b',//'#fecb6e'
    },
    paper: {
        backgroundColor: theme.palette.background.opaque,
        padding: theme.spacing(2),
        color: theme.palette.primario.contrastText,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.secundario.main,
        borderRadius: '10px 10px 10px 10px',
        display: 'flex',
        justifyContent: "center"
    },
    box: {
        maxWidth: '900px', paddingTop: '50px', paddingBottom: '50px'
    }
});

const ServidoresIntervienen = props => {
    const { classes } = props;
    const section = pdnRoutes.find(route => route.path === '/especificaciones/s2');

    return (
        <div className={classes.root}>
            <HeaderV2 section={section}/>
            <Grid container spacing={0} justifyContent='center' className={classes.container}>
                <Grid item xs={12} className={classes.item}>
                    <Paper className={classes.paper}>
                        <Box className={classes.box}>

                            <Estandar/>

                            <Divider className={classes.divider}/>

                            <Implementacion/>

                            <Divider className={classes.divider}/>

                            <Typography variant="h4" paragraph>
                                Especificaciones técnicas
                            </Typography>

                            <Typography variant='h5' paragraph>
                                Diccionario de datos
                            </Typography>

                            <Button
                                href='https://docs.google.com/spreadsheets/d/1fRhDfHtrBPYyR36zxpenXWind9FP1pLAQJOVS69QwUM/edit?usp=sharing'
                                target='_blank'
                                variant='contained'
                                color="secundario"
                                className={classes.button}>
                                Más información
                            </Button>

                            <Typography variant='h5' paragraph>
                                Catálogos de claves y valores
                            </Typography>

                            <Button
                                href='https://github.com/PDNMX/catalogos/tree/master/S2%20-%20Servidores%20p%C3%BAblicos%20en%20contrataciones'
                                target='_blank'
                                variant='contained'
                                color="secundario"
                                className={classes.button}>
                                Más información
                            </Button>

                            <Typography variant='h5' paragraph>
                                Especificaciones en formato Open API Specification
                            </Typography>

                            <Button
                                href='https://www.plataformadigitalnacional.org/oas/ui/?urls.primaryName=S2'
                                target='_blank'
                                variant='contained'
                                color="secundario"
                                className={classes.button}>
                                Más información
                            </Button>

                            <ProcoloConexion urlPlan = {'https://drive.google.com/file/d/1ooAuvc1kNMiftE_R1yRglC6OK9bIIx8U/view'} apiName={'Servidores que intervienen en' +
                                ' procedimientos de contratación'}/>


                            <Divider className={classes.divider}/>

                            <Licencia/>

                            <Divider className={classes.divider}/>

                            <Herramientas/>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default withStyles(styles)(ServidoresIntervienen);
