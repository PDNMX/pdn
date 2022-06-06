import React from 'react';
import {Typography, Grid, Link, Paper, Box} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {withStyles} from "@mui/styles";
import bgimg from "../../assets/rediseno/fondo_cruces_dark.png";
import pdnRoutes from "../../routes/index";
import HeaderV2 from '../HomeV2/HeaderV2';
import S1 from "@assets/rediseno/sistemas_sin_fondo/btn-s1.svg";
import S2 from "@assets/rediseno/sistemas_sin_fondo/btn-s2.svg";
import S3 from "@assets/rediseno/sistemas_sin_fondo/btn-s3.svg";
import S4 from "@assets/rediseno/sistemas_sin_fondo/btn-s4.svg";
import S5 from "@assets/rediseno/sistemas_sin_fondo/btn-s5.svg";
import S6 from "@assets/rediseno/sistemas_sin_fondo/btn-s6.svg";

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundImage: `url(${bgimg})`,
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed"
    },
    rootItem: {
        maxWidth: "1200px",
        padding: theme.spacing(1),
        paddingTop: 90,
        paddingBottom: 90,
    },
    ol: {
        color: "#d0d7d9",
        fontFamily: "Roboto",
        fontSize: "16px"
    },
    ul: {
        color: "#d0d7d9",
        fontFamily: "Roboto",
        fontSize: "16px"
    },
    videoDiv: {
        maxWidth: 850,
        margin: theme.spacing(1)
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
    sistemas: {
        maxWidth: 150,
        "&:hover": {
            opacity: .5
        }
    },
    link: {
        textDecoration: "none"
    },
    containerSistemas: {
        maxWidth: "1200px",
        padding: theme.spacing(1),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
});

const CustomTypography = withStyles(theme => ({
    root: {
        color: theme.palette.text.main,

    }
}))(Typography);

const About = props => {
    const {classes} = props;
    const section = pdnRoutes.find(route => route.path === '/about');


    return <div className={classes.root}>
        <HeaderV2 section={section}/>
        <Grid container justifyContent="center" spacing={0}>
            <Grid item xs={12} className={classes.rootItem}>
                <Paper className={classes.paper} elevation={15}>
                    <Box className={classes.box}>

                        <CustomTypography paragraph>
                            Usando la PDN, las autoridades encargadas de la lucha anticorrupción pueden tomar decisiones basadas en evidencia a partir de grandes cantidades de datos.
                        </CustomTypography>

                        <CustomTypography paragraph>
                            El desarrollo de la PDN considera seis sistemas contemplados en la Ley General del Sistema Nacional Anticorrupción (LGSNA):
                        </CustomTypography>

                        <Typography color={'S1.color'} display={'inline'}>Sistema 1 | </Typography>
                        <CustomTypography display={'inline'}>
                            Evolución patrimonial, de declaración de intereses y constancia de presentación de declaración fiscal (S1).
                        </CustomTypography>
                        <br/>
                        <Typography color={'S2.color'} display={'inline'}>Sistema 2 | </Typography>
                        <CustomTypography display={'inline'}>
                            Servidores públicos que intervengan en procedimientos de contrataciones públicas (S2).
                        </CustomTypography>
                        <br/>
                        <Typography color={'S3.color'} display={'inline'}>Sistema 3 | </Typography>
                        <CustomTypography display={'inline'}>
                            Servidores públicos y particulares sancionados (S3).
                        </CustomTypography>
                        <br/>
                        <Typography color={'S4.color'} display={'inline'}>Sistema 4 | </Typography>
                        <CustomTypography display={'inline'}>
                            Información y comunicación del Sistema Nacional Anticorrupción y del Sistema Nacional de Fiscalización (S4).
                        </CustomTypography>
                        <br/>
                        <Typography color={'S5.color'} display={'inline'}>Sistema 5 | </Typography>
                        <CustomTypography display={'inline'}>
                            Denuncias públicas de  faltas administrativas y hechos de corrupción (S5).
                        </CustomTypography>
                        <br/>
                        <Typography color={'S6.color'} display={'inline'}>Sistema 6 | </Typography>
                        <CustomTypography display={'inline'}>
                            Información Pública de Contrataciones (S6).
                        </CustomTypography>

                        <Grid container spacing={0} justifyContent='center'>
                            <Grid item xs={12} className={classes.containerSistemas}>
                                <Grid container spacing={0} justifyContent='center'>
                                    <Grid item xs={12} md={6} lg={4} xl={2} align="center">
                                        <RouterLink to="/declaraciones" className={classes.link}>
                                            <img src={S1} alt="" className={classes.sistemas}/>
                                        </RouterLink>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={4} xl={2} align="center">
                                        <RouterLink to="/servidores" className={classes.link}>
                                            <img src={S2} alt="" className={classes.sistemas}/>
                                        </RouterLink>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={4} xl={2} align="center">
                                        <RouterLink to="/sancionados" className={classes.link}>
                                            <img src={S3} alt="" className={classes.sistemas}/>
                                        </RouterLink>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={4} xl={2} align="center">
                                        <RouterLink to="/fiscalizacion" className={classes.link}>
                                            <img src={S4} alt="" className={classes.sistemas}/>
                                        </RouterLink>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={4} xl={2} align="center">
                                        <RouterLink to="/denuncias" className={classes.link}>
                                            <img src={S5} alt="" className={classes.sistemas}/>
                                        </RouterLink>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={4} xl={2} align="center">
                                        <RouterLink to="/contrataciones" className={classes.link}>
                                            <img src={S6} alt="" className={classes.sistemas}/>
                                        </RouterLink>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                        <CustomTypography paragraph>
                            ¿Quieres saber más sobre el marco normativo de la PDN? haz click <Link
                            component={RouterLink} to="/mesa-de-ayuda">aquí</Link>.
                        </CustomTypography>


                        <div className={classes.videoDiv}>
                            <iframe width="100%" height="450" src="https://www.youtube.com/embed/e9zZE5i8Vt4?rel=0"
                                    frameBorder="0" title={'Video'}
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen/>
                        </div>

                        <CustomTypography variant="h4" paragraph>
                            ¿Cómo estamos desarrollando la PDN?
                        </CustomTypography>

                        <CustomTypography paragraph>
                            La PDN opera con una arquitectura que permite consultar información de diversos proveedores (instituciones públicas), en tiempo real y de manera estandarizada (en un mismo formato). Con el objetivo de incorporar datos a la PDN, los generadores de información deben establecer mecanismos de comunicación que permitan la consulta de información desde la PDN hacia sus bases de datos.
                        </CustomTypography>

                        <CustomTypography paragraph>
                            La SESNA publicó las especificaciones técnicas y estándares de datos que permiten que cualquier institución pública  pueda desarrollar los mecanismos de comunicación con la PDN.
                        </CustomTypography>

                        <CustomTypography variant="h5" paragraph>
                            El desarrollo de la PDN tiene grandes ventajas:
                        </CustomTypography>

                        <ol className={classes.ol}>
                            <li>
                                <CustomTypography>
                                    Es un modelo más barato (no requiere grandes inversiones en infraestructura ya que no concentra, almacena o replica la información);
                                </CustomTypography>
                            </li>
                            <li>
                                <CustomTypography>
                                    Promueve que los datos estén siempre actualizados por los generadores, ya que consulta directamente sus bases de datos;
                                </CustomTypography>
                            </li>
                            <li>
                                <CustomTypography>
                                    Atiende a la normatividad vigente y se desarrolla de manera modular y escalable al interior de la SESNA, por personas servidoras públicas, lo que significa que responde directamente a las necesidades de las y los usuarios, contrario a las plataformas que se desarrollan por medio de un tercero, bajo un modelo cerrado;
                                </CustomTypography>
                            </li>
                            <li>
                                <CustomTypography>
                                    No genera costos adicionales el hacer cualquier modificación o adecuación ya que la desarrolla el equipo de la SESNA;
                                </CustomTypography>
                            </li>
                            <li>
                                <CustomTypography>
                                    Es un modelo sostenible y replicable ya que todo su desarrollo se hace con tecnologías de código abierto, lo cual reduce los costos de licenciamiento de software y evita generar dependencias de proveedores de tecnología/software.
                                </CustomTypography>
                            </li>
                        </ol>

                        <CustomTypography variant="h4" paragraph>
                            ¿Qué puedo hacer a través de la PDN?
                        </CustomTypography>

                        <CustomTypography paragraph>
                            A través de la PDN podrás saber:
                        </CustomTypography>

                        <ul className={classes.ul}>
                            <li>
                                <CustomTypography>
                                    Los datos de personas servidoras públicas sancionadas por la comisión de actos de corrupción.
                                </CustomTypography>
                            </li>
                            <li>
                                <CustomTypography>
                                    El nombre o razón social de particulares sancionados e inhabilitados para proporcionar bienes o servicios a las instituciones públicas.
                                </CustomTypography>
                            </li>
                            <li>
                                <CustomTypography>
                                    Las declaraciones patrimoniales de millones de personas servidoras públicas de todo el país.
                                </CustomTypography>
                            </li>
                            <li>
                                <CustomTypography>
                                    Los datos de personas servidoras públicas que participan en procedimientos de compras gubernamentales.
                                </CustomTypography>
                            </li>
                            <li>
                                <CustomTypography>
                                    La información pública de los contratos que celebren las instituciones públicas.
                                </CustomTypography>
                            </li>
                        </ul>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    </div>
}

export default withStyles(styles)(About);