import React from 'react';
import {Grid, Box, Paper, Typography} from "@mui/material"
import { withStyles } from '@mui/styles';
import bgimg from "../../assets/rediseno/fondo_cruces.png";
import HeaderV2 from "../HomeV2/HeaderV2";
import pdnRoutes from "../../routes";

const styles = theme => ({
    root:{
        flexGrow: 1,
        backgroundImage: `url(${bgimg})`,
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed"
    },
    item: {
        maxWidth: '1200px',
        paddingTop: 100,
        paddingBottom: 100
    },
    ul: {
        listStyle: 'none',
        //paddingLeft: '20px'
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
        paddingBottom: theme.spacing(2)
    },
    container: {
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1)
    },
    sublist: {
        display: 'inline',
        //color: '#606060',
        fontSize: '0.975rem',
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
    },
    question:{
        color: theme.palette.text.blueColor,
        display:'inline'
    }
});

const CustomTypography = withStyles(theme => ({
    root: {
        color: theme.palette.text.main,

    }
}))(Typography);

const Faq = props => {
    const { classes } = props;
    const section = pdnRoutes.find(route => route.path==='/faq');

    return (
        <div className={classes.root}>
            <HeaderV2 section = {section}/>
            <Grid container spacing={0} justifyContent='center' className={classes.container}>
                <Grid item xs={12} justifyContent="center" className={classes.item}>

                    <Paper className={classes.paper} elevation={15}>
                        <Box className={classes.box}>
                            <ul className={classes.ul}>
                                <li className={classes.li}>
                                    <Typography className={classes.question}>
                                        <b>¿La Plataforma Digital Nacional (PDN) va a generar información?</b><br/>
                                    </Typography>
                                    <CustomTypography className={classes.sublist}>
                                        No. El objetivo de la Plataforma es generar interoperabilidad entre los datos que ya generan actualmente los entes obligados, a través del uso de estándares comunes.
                                    </CustomTypography>
                                </li>
                                <li className={classes.li}>
                                    <Typography className={classes.question}>
                                        <b>¿La PDN va a operar sistemas como CompraNet o Declaranet?</b><br/>
                                    </Typography>
                                    <CustomTypography className={classes.sublist}>
                                        No. La Plataforma será una herramienta de interoperabilidad que a través de la estandarización de la información será capaz de consultar los datos que contienen sistemas como CompraNet o Declaranet.
                                        <br/>
                                        La generación de los datos desde sistemas como CompraNet o Declaranet seguirá siendo responsabilidad de los entes que tienen la atribución actualmente.
                                    </CustomTypography>
                                </li>
                                <li className={classes.li}>
                                    <Typography className={classes.question}>
                                        <b>¿La PDN se van a quedar con los datos generados por las instituciones?</b><br/>
                                    </Typography>
                                    <CustomTypography className={classes.sublist}>
                                        No. Las Instituciones son las responsables de los datos que generan, y a partir de la publicación de los lineamientos de cada Sistema, deberán estandarizarlos de acuerdo a lo solicitado por la SESNA a través del Comité Coordinador del SNA.
                                    </CustomTypography>
                                </li>
                                <li className={classes.li}>
                                    <Typography className={classes.question}>
                                        <b>¿Se van a compartir los datos reservados o personales?</b><br/>
                                    </Typography>
                                    <CustomTypography className={classes.sublist}>
                                        No. Los estándares de datos que serán publicados por la SESNA permiten el control institucional para la consulta de datos reservados o personales.
                                        <br/>
                                        De acuerdo a lo mandatado por la Ley del SNA, el Comité Coordinador del SNA, tendrá la responsabilidad de aprobar el catálogo de perfiles de funcionarios que tendrán acceso a los datos reservados.
                                    </CustomTypography>
                                </li>
                                <li className={classes.li}>
                                    <Typography className={classes.question}>
                                        <b>¿Cómo se va a trabajar en la seguridad e integridad de los datos?</b><br/>
                                    </Typography>
                                    <CustomTypography className={classes.sublist}>
                                        Se utilizarán  herramientas de autentificación que contemplarán los roles y permisos, por ejemplo: SSL, Firebase, OAuth, eFirma; estas herramientas permitirán mantener la trazabilidad de las consultas de datos que se hagan dentro de las plataformas, garantizando su máxima seguridad.
                                    </CustomTypography>
                                </li>
                                <li className={classes.li}>
                                    <Typography className={classes.question}>
                                        <b>¿Quién va a poder acceder a la PDN?</b><br/>
                                    </Typography>
                                    <CustomTypography className={classes.sublist}>
                                        El componente público de la PDN será para consulta de cualquier ciudadano, y dará acceso a los datos que tienen carácter público, de acuerdo a la Ley General de Transparencia y Acceso a la Información.
                                        <br/>
                                        El componente privado tendrá un acceso restringido que será determinado por el Comité Coordinador del SNA, quien tendrá la responsabilidad de aprobar el catálogo de perfiles y funcionarios que tendrán acceso a los datos reservados.
                                    </CustomTypography>
                                </li>
                                <li className={classes.li}>
                                    <Typography className={classes.question}>
                                        <b>¿Qué es interoperabilidad?</b><br/>
                                    </Typography>
                                    <CustomTypography className={classes.sublist}>
                                        Interoperabilidad se refiere a la posibilidad que tiene un sistema de obtener o transferir información con otros sistemas. Para lograr la interoperabilidad de los datos, es necesario estandarizarlos y ponerlos en un formato común.
                                    </CustomTypography>
                                </li>
                                <li className={classes.li}>
                                    <Typography className={classes.question}>
                                        <b>¿Qué es un estándar de datos?</b>
                                    </Typography>
                                    <CustomTypography className={classes.sublist}>
                                        <br/>
                                        Un estándar se refiere a las reglas y características con las que debe de contar un dato, como: tipo de dato, longitud, número de veces que aparece, precisión, etc.
                                    </CustomTypography>
                                </li>
                            </ul>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default withStyles(styles)(Faq);
