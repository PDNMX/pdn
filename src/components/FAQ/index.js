import React from 'react';
import {Grid, Box, Paper, Typography} from "@mui/material"
import { withStyles } from '@mui/styles';
import bgimg from "../../assets/rediseno/fondo_cruces_dark.png";
import HeaderV2 from "../HomeV2/HeaderV2";
import pdnRoutes from "../../routes";
import Link from "@mui/material/Link";

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
    },
    link: {
        textDecoration: "none",
        color: theme.palette.text.linkColor,
        wordBreak: "break-all",
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
                                        <b>¿La PDN va a generar información?</b><br/>
                                    </Typography>
                                    <CustomTypography className={classes.sublist}>
                                        No. El objetivo de la PDN es generar interoperabilidad entre los datos que  generan los sujetos obligados  y es una herramienta de consulta.
                                    </CustomTypography>
                                </li>

                                <li className={classes.li}>
                                    <Typography className={classes.question}>
                                        <b>¿La PDN almacenará los datos generados por las instituciones?</b><br/>
                                    </Typography>
                                    <CustomTypography className={classes.sublist}>
                                        No, ya que la PDN es una plataforma de consulta, los generadores de la información siguen siendo responsables de  los datos que generan.
                                    </CustomTypography>
                                </li>


                                <li className={classes.li}>
                                    <Typography className={classes.question}>
                                        <b>¿Cómo se va a trabajar en la seguridad e integridad de los datos?</b><br/>
                                    </Typography>
                                    <CustomTypography className={classes.sublist}>
                                        Para conocer más detalles sobre la seguridad de la información de la PDN, visita el <Link href="https://drive.google.com/file/d/1-IvF3KYa5rups73BmVV4W8glT9csVGY9/view?usp=sharing" target="_blank" className={classes.link}>documento de Seguridad Informática</Link>.
                                    </CustomTypography>
                                </li>

                                <li className={classes.li}>
                                    <Typography className={classes.question}>
                                        <b>¿Quién podrá consultar información en la PDN?</b><br/>
                                    </Typography>
                                    <CustomTypography className={classes.sublist}>
                                        La PDN es una herramienta gratuita y pública, a ella puede acceder la ciudadanía en general, sin embargo, de conformidad con lo establecido en  la Ley General de Transparencia y Acceso a la Información Pública, únicamente podrán tener acceso a los datos de carácter reservado o confidencial, aquellas personas servidoras públicas que cumplan con los perfiles aprobados por el Comité Coordinador del SNA.
                                    </CustomTypography>
                                </li>

                                <li className={classes.li}>
                                    <Typography className={classes.question}>
                                        <b>¿Qué es interoperabilidad?</b><br/>
                                    </Typography>
                                    <CustomTypography className={classes.sublist}>
                                        Es la posibilidad que tiene un sistema de obtener o transferir información con otros sistemas. Para lograr la interoperabilidad, es necesario estandarizar los datos y ponerlos en un formato común.

                                    </CustomTypography>
                                </li>
                                <li className={classes.li}>
                                    <Typography className={classes.question}>
                                        <b>¿Qué es un estándar de datos?</b>
                                    </Typography>
                                    <CustomTypography className={classes.sublist}>
                                        <br/>
                                        Son las reglas y características con las que debe de contar un conjunto de datos, como: tipo de dato (i.e., numérico, entero, caracter, cadena), longitud, número de veces que aparece, precisión, etc.
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
