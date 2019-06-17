import React  from 'react';
import {withStyles} from "@material-ui/core/styles";
import Header from './Header/Header';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography"
import MuiLink from "@material-ui/core/Link";
import {Link} from "react-router-dom";
import Footer from "../Home/Footer";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    item: {
        maxWidth: 1200,
        padding: theme.spacing(2)
    },
    title: {
        color: theme.palette.primary.dark
    },
});

class HelpDesk extends React.Component{

    render() {

        const {classes} = this.props;

        return <div className={classes.root}>
            <Header/>

            <Grid container spacing={0} justify="center">
                <Grid item xs={12} className={classes.item}>
                    <Typography  variant="h5" paragraph className={classes.title}>
                        ¿Qué es la PDN?
                    </Typography>

                    <Typography paragraph>
                        Una fuente de inteligencia para construir integridad y combatir la corrupción que creará valor para el gobierno y la sociedad a partir de grandes cantidades de datos.
                    </Typography>

                    <Typography paragraph>
                        Un medio para el intercambio de datos anticorrupción del gobierno, que busca quitar barreras y romper silos de información para que los datos sean comparables, accesibles y utilizables.
                    </Typography>

                    <Typography paragraph>
                        El desarrollo de la PDN considera seis sistemas que contienen datos estratégicos para la lucha contra la corrupción, <b>contemplados en la Ley General del Sistema Nacional Anticorrupción (LGSNA):</b>
                    </Typography>

                    <Grid container spacing={0}>
                        <Grid item xs={6}>
                            <ul>
                                <li>Sistema 1 | Declaraciones patrimonial,  de intereses y constancia de declaración fiscal.</li>
                                <li>Sistema 2 | Servidores públicos que intervienen en procedimientos de contratación.</li>
                                <li>Sistema 3 | Servidores públicos y particulares sancionados.</li>
                            </ul>
                        </Grid>
                        <Grid item xs={6}>
                            <ul>
                                <li>Sistema 4 | Información y comunicación del Sistema Nacional Anticorrupción y el Sistema Nacional de Fiscalización.</li>
                                <li>Sistema 5 | Denuncias por faltas administrativas y hechos de corrupción.</li>
                                <li>Sistema 6 | Contrataciones Públicas.</li>
                            </ul>
                        </Grid>
                    </Grid>

                    <Typography paragraph>
                        Es importante señalar que la PDN no es un repositorio ni generadora de los datos de cada sistema, sino que es una plataforma de interoperabilidad.
                    </Typography>

                    <Typography variant="h5" className={classes.title} paragraph>
                        Objetivos de la PDN
                    </Typography>
                    <Typography>
                        Usar nuevas tecnologías y metodologías de trabajo como apoyo al trabajo de las autoridades del Sistema Nacional Anticorrupción para:
                    </Typography>

                    <ul>
                        <li>Analizar y alertar a las autoridades sobre riesgos de corrupción;</li>
                        <li>Automatizar procesos, evitar discrecionalidad y conflicto de interés;</li>
                        <li>Promover el uso de los datos para respaldar sanciones;</li>
                        <li>Dar seguimiento, en tiempo real, a los procesos y proyectos de contratación pública, y garantizar una mayor eficiencia en las compras públicas;</li>
                        <li>Fortalecer la participación ciudadana en el combate a la corrupción;</li>
                        <li>Incorporar información sobre indicadores para evaluar la Política Nacional Anticorrupción;</li>
                        <li>Dar evidencia para generar recomendaciones de política pública a las autoridades;</li>
                    </ul>

                    <Typography variant="h5" paragraph className={classes.title}>
                        Marco normativo
                    </Typography>

                    <Typography paragraph>
                        El marco normativo de la PDN está compuesto por la Ley General del Sistema Nacional Anticorrupción (LGSNA), la Ley General de Responsabilidades Administrativas (LGSNA) y las Bases para el Funcionamiento de la Plataforma Digital Nacional (publicadas el 23 de octubre del 2018 en el Diario Oficial de la Federación).
                    </Typography>

                    <MuiLink href="http://www.diputados.gob.mx/LeyesBiblio/pdf/LGSNA.pdf">
                        Ley General Del Sistema Nacional Anticorrupción
                    </MuiLink>

                    <ul>
                        <li>Artículos 9, fracciones XII, XIII y XVI;</li>
                        <li>17;</li>
                        <li>21, VII, b);</li>
                        <li>35, X y XI;</li>
                        <li>Título cuarto;</li>
                    </ul>
                    <MuiLink href="https://declaranet.gob.mx/docs/LGRA.pdf">
                        Ley General de Responsabilidades Administrativas
                    </MuiLink>

                    <ul>
                        <li>Artículos 9, VI, c);</li>
                        <li>26;</li>
                        <li>27;</li>
                        <li>30;</li>
                        <li>31;</li>
                        <li>34;</li>
                        <li>43;</li>
                        <li>44;</li>
                        <li>46;</li>
                        <li>59;</li>
                        <li>93, y</li>
                    </ul>

                    <MuiLink className={classes.lastLink} href="https://www.dof.gob.mx/nota_detalle.php?codigo=5541802&fecha=23/10/2018">
                        Bases para el Funcionamiento de la Plataforma Digital Nacional.
                    </MuiLink>
                    <br/>
                    <br/>

                    <Typography variant="h5" className={classes.title} paragraph>
                        ¿Qué hace la SESNA y la USTPDN?
                    </Typography>

                    <Typography paragraph>
                        La Secretaría Ejecutiva del Sistema Nacional Anticorrupción (SESNA) tiene como propósito brindar apoyo técnico al Comité Coordinador del Sistema Nacional Anticorrupción.
                    </Typography>

                    <Typography paragraph>
                        La SESNA es responsable de diseñar, promover y evaluar la Política Nacional Anticorrupción, y de administrar la Plataforma Digital Nacional.
                    </Typography>

                    <Typography paragraph>
                        El objetivo de la Unidad encargada de la Plataforma Digital Nacional (USTPDN) es utilizar nuevas tecnologías, metodologías, ciencia de datos e inteligencia artificial como insumos y apoyo al trabajo de las autoridades que conforman el Comité Coordinador del Sistema Nacional Anticorrupción.
                    </Typography>

                    <Typography paragraph>
                        Asimismo, la LGSNA menciona que la función de la PDN es integrar y conectar los diversos sistemas electrónicos que posean datos e información sobre los seis sistemas. Éstos deben ser interoperables, es decir, deben ser capaces de obtener o transferir información con otros sistemas. Para lograr la interoperabilidad de los datos, es necesario estandarizarlos y ponerlos en un formato común.
                    </Typography>

                    <Typography paragraph>
                        Para ello la SESNA emitirá los protocolos, estándares, reglamentos, especificaciones técnicas y cualquier normativa necesaria para la colaboración, provisión de datos y acciones para cumplir con las Bases, los cuales serán obligatorios para todos los proveedores, concentradores y encargados a nivel federal, estatal y municipal, enmarcado en el artículo 6 de las Bases de la PDN (Artículo 6, BFPDN).
                    </Typography>


                    <Typography variant="h5" className={classes.title}>
                        <u>Sistemas Estatales Anticorrupción</u>
                    </Typography>

                    <Typography variant="h6" className={classes.title} paragraph> Normatividad:</Typography>


                    <Typography paragraph>
                        <b>Concentradores estatales:</b> Son los miembros de los Sistemas Estatales Anticorrupción que resguardan la información para su integración a los sistemas de la PDN (VI, art. 3, Bases; legislaciones estatales anticorrupción).
                    </Typography>

                    <Typography paragraph>
                        <b>Bases para el funcionamiento de la PDN: </b>
                    La Secretaría Ejecutiva se coordinará con las Secretarías Ejecutivas de los Sistemas Locales Anticorrupción (SLA), a efecto de determinar su participación en la construcción de los sistemas de la Plataforma y la forma de interconexión que tendrán con cada uno de los sistemas a nivel local (Art 23).
                    </Typography>

                    <Typography paragraph>
                    Las Secretarías Ejecutivas de los Sistemas Locales Anticorrupción deberán coordinar los trabajos de implementación de las Bases, previo acuerdo con sus Comités Coordinadores, conforme a lo establecido por la Secretaría Ejecutiva (Art. 24).
                    </Typography>

                    <Typography paragraph>
                        <b>LGSNA: </b>
                    Los SLA promoverán la publicación de la información contenida en la plataforma en formato de datos abiertos, conforme a la Ley General de Transparencia y Acceso a la Información Pública y la demás normatividad aplicable como las Bases para el funcionamiento de la PDN y otros lineamientos que emita la SESNA (Art. 50).
                    </Typography>


                    <Typography className={classes.title} variant="h5">
                        Acciones
                    </Typography>

                    <Typography paragraph>
                        Las Secretarías Ejecutivas de los Sistemas Locales, serán las <b><u>responsables de coordinar el  trabajo a nivel local,</u></b> para asegurarse de que sus sistemas cuenten con la información estandarizada y que cumpla con las especificaciones técnicas establecidas por la SESNA, necesarias para conectarse con la Plataforma Digital Nacional.
                    </Typography>

                    <Typography paragraph>
                        Se sugiere realizar la interpretación acerca la responsabilidad que la <i>Ley del Sistema Local Anticorrupción</i> u homóloga.
                    </Typography>

                    <Typography paragraph>
                        Asimismo, se les recomienda comenzar por <b><u>revisar de manera detallada</u></b> las especificaciones técnicas y los diccionarios de datos que ya fueron publicados en la siguiente página: <Link to="/especificaciones">https://plataformadigitalnacional.org/especificaciones</Link>. Es importante comenzar con los Sistemas 2 y 3, ya que los formatos necesarios para el Sistema 1 se encuentran en <MuiLink href="https://www.dof.gob.mx/nota_detalle.php?codigo=5557896&fecha=16%2F04%2F2019">proceso de revisión por parte del Comité Coordinador</MuiLink>.
                    </Typography>



                </Grid>

            </Grid>
            <Footer/>
        </div>
    }
}


export default withStyles(styles)(HelpDesk);

