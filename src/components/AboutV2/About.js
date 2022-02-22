import React from 'react';
import {Typography, Grid, Link} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {withStyles} from "@mui/styles";
import bgimg from "../../assets/rediseno/fondo_cruces.png";
import Banner from "../HomeV2/Banner";
import Footer from '../HomeV2/Footer';

const styles = theme => ({
    root: {
        flexGrow :1,
        backgroundImage: `url(${bgimg})`,
        backgroundRepeat: "repeat"
    },
    rootItem: {
        maxWidth: 900,//1200
        padding: theme.spacing(1),
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
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
    videoDiv:{
        maxWidth: 850,
        margin: theme.spacing(1)
    }
});

const CustomTypography = withStyles({
    root: {
        color: "#d0d7d9"
    }
})(Typography);

const About = props => {
    const { classes } = props;
    return <div className={classes.root}>
        <Banner/>
        <Grid container justifyContent="center">
            <Grid item xs={12} className={classes.rootItem}>
                <CustomTypography variant="h4" paragraph>
                    ¿Qué es la Plataforma Digital Nacional?
                </CustomTypography>

                <CustomTypography paragraph>
                    Usando la PDN, por primera vez,  las autoridades encargadas de la lucha anticorrupción pueden tomar decisiones basadas en evidencia a partir de grandes cantidades de datos.
                </CustomTypography>

                <CustomTypography paragraph>
                    El desarrollo de la PDN considera seis sistemas contemplados en la Ley General del Sistema Nacional Anticorrupción (LGSNA):
                </CustomTypography>

                <CustomTypography>
                    Sistema 1 | Evolución patrimonial, declaración de intereses y constancia de presentación de declaración fiscal (S1).
                </CustomTypography>
                <CustomTypography>
                    Sistema 2 | Servidores públicos que intervengan en procedimientos de contrataciones públicas (S2).
                </CustomTypography>
                <CustomTypography>
                    Sistema 3 | Servidores públicos y particulares sancionados (S3).
                </CustomTypography>
                <CustomTypography>
                    Sistema 4 | Información y comunicación del Sistema Nacional Anticorrupción y el Sistema Nacional de Fiscalización (S4).
                </CustomTypography>
                <CustomTypography>
                    Sistema 5 | Denuncias por faltas administrativas y hechos de corrupción (S5).
                </CustomTypography>
                <CustomTypography paragraph>
                    Sistema 6 | Información Pública de contrataciones (S6).
                </CustomTypography>

                <CustomTypography paragraph>
                    ¿Quieres saber más sobre el marco normativo de la PDN? haz click <Link component={RouterLink} to="/mesa-de-ayuda">aquí</Link>.
                </CustomTypography>


                <div className={classes.videoDiv}>
                    <iframe width="100%" height="450" src="https://www.youtube.com/embed/e9zZE5i8Vt4?rel=0" frameBorder="0" title={'Video'}
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen/>
                </div>

                <CustomTypography variant="h4" paragraph>
                    ¿Cómo la estamos desarrollando?
                </CustomTypography>

                <CustomTypography paragraph>
                    La forma más fácil de entender el funcionamiento de la PDN es pensar en cualquier plataforma de internet para reservar vacaciones (por ejemplo; Expedia). Con tan solo introducir fechas, lugar y rango de precios, la plataforma de reservaciones genera una búsqueda de opciones de vuelos y hoteles. Estas plataformas no generan los datos por sí mismas, sino que se comunican con otros sistemas para permitir al usuario consultar de manera uniforme entre miles de opciones de diversos proveedores de información, con tan solo un clic.
                </CustomTypography>

                <CustomTypography paragraph>
                    De manera similar, la PDN opera con una arquitectura que permite consultar información proveniente de diversos proveedores (instituciones de gobierno), en tiempo real y de manera estandarizada (en un mismo formato). Con el objetivo de incorporar datos a la PDN, los generadores de información deben establecer mecanismos de comunicación que permitan la consulta de información desde la PDN hacia sus bases de datos.
                </CustomTypography>

                <CustomTypography paragraph>
                    La SESNA publicó las especificaciones técnicas y estándares de datos que permiten que cualquier institución del gobierno pueda desarrollar los mecanismos de comunicación con la PDN.
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
                            Atiende a la normatividad vigente y se desarrolla de manera modular y escalable al interior de la SESNA, por servidores públicos, lo que significa que responde directamente a las necesidades de los usuarios, contrario a las plataformas que se desarrollan por medio de un tercero, bajo un modelo cerrado;
                        </CustomTypography>
                    </li>
                    <li>
                        <CustomTypography>
                            No genera costos adicionales el hacer cualquier modificación o adecuación ya que la desarrolla  el equipo de la SESNA;
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
                    Por primera vez en la historia de nuestro país se está trabajando para ordenar y estandarizar millones de datos estratégicos para el combate contra la corrupción, para poderlos procesar mediante algoritmos que permiten identificar patrones, banderas rojas y otras alertas con tan solo un click.
                </CustomTypography>

                <CustomTypography paragraph>
                    A través de la PDN podrás saber:
                </CustomTypography>

                <ul className={classes.ul}>
                    <li>
                        <CustomTypography>
                            Si una persona servidora pública que fue sancionada en una entidad federativa  por una falta administrativa grave está buscando trabajo en otro estado. Esto permitiría alertar y evitar su contratación y prevenir un posible acto de corrupción.
                        </CustomTypography>
                    </li>
                    <li>
                        <CustomTypography>
                            Listado de particulares sancionados e inhabilitados para ser contratados por instituciones de gobierno.
                        </CustomTypography>
                    </li>
                    <li>
                        <CustomTypography>
                            Si una empresa cuenta con un giro específico, por ejemplo: que se dedica a producir garrafones de agua y gana una licitación para vender dispositivos médicos; o si en una invitación a tres, hay empresas que se están poniendo de acuerdo para ganar o participan como si fueran diferentes empresas y son la misma.
                        </CustomTypography>
                    </li>
                    <li>
                        <CustomTypography>
                            Conocer la evolución patrimonial de millones de personas servidoras públicas, identificando banderas rojas con tan solo un click. Actualmente hay más de 6 millones de personas servidoras públicas en el país que están obligados a presentar una declaración patrimonial. Esto puede abordarse de dos maneras; 1) actualmente, se presentarán más de 6 millones de documentos en PDF y en algunos casos en papel, que nunca se procesarán; o 2) Una mina de oro en términos de datos patrimoniales de activos y de pasivos, que al estar conectados a la PDN y al ser interoperables, permitan que un simple algoritmo encuentre patrones anormales en el incremento del patrimonio de uno, de miles o de millones de servidores públicos, de manera automática y simultánea.
                        </CustomTypography>
                    </li>
                </ul>

                <CustomTypography paragraph>
                    Esto ya es una realidad, haz click <Link target="_blank" href="https://www.plataformadigitalnacional.org/blog/dataton-anticorrupcion-2021/">aquí</Link> y <Link target="_blank" href="https://www.plataformadigitalnacional.org/blog/dataton-anticorrupcion-2019/">aquí</Link> para saber cómo hemos explotado los datos de la PDN.
                </CustomTypography>

            </Grid>
        </Grid>
        <Footer/>
    </div>
}

export default withStyles(styles)(About);