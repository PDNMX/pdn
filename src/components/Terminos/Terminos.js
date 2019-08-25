import React from 'react';
import PropTypes from 'prop-types';
import {Typography} from "@material-ui/core"
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Header from "./Header/Header.js";
import by from '../../assets/about/by.svg';
import Footer from '../Home/Footer';
import './Terminos.css';

const styles = theme => ({
    root: {
        flexGrow:1
    },
    section: {
        maxWidth: '1000px',
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingBottom: 100,
        paddingTop: 100
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
        }
    }

});

class Terminos extends React.Component{
    render (){
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Header/>
                <Grid container spacing={0} justify='center'>
                    <Grid item xs={12} className={classes.section}>
                        <Typography variant='title' className="pdn_term_title">
                            Aceptación de términos de uso de plataformadigitalnacional.org
                        </Typography>
                        <Typography paragraph className="pdn_term_content">
                            El uso del plataformadigitalnacional.org o de cualquiera de sus componentes, implica la aceptación expresa de los presentes “Términos y Condiciones”.
                        </Typography>

                        <Typography variant='title' className="pdn_term_title">
                            Sobre el uso de plataformadigitalnacional.org
                        </Typography>

                        <Typography className="pdn_term_content">
                            Son obligaciones del usuario:
                        </Typography>

                        <ul className={classes.ul}>
                            <li className={classes.li}>
                                <Typography display='inline'>
                                    No dañar, inutilizar o deteriorar los sistemas informáticos que puedan ser incorporados en este sitio, incluido el portal plataformadigitalnacional.org.
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography display="inline">
                                    No modificar de ninguna manera los sistemas informáticos que puedan ser incorporados.
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography display='inline'>
                                    No utilizar versiones de sistemas modificados con el fin de obtener acceso no autorizado a cualquier sistema de información, contenido y/o servicios del portal.
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography display='inline'>
                                    No interferir ni interrumpir el acceso, funcionalidad y utilización del portal, servidores o redes conectados al mismo.
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography display='inline'>
                                    Los enlaces que son proporcionados en el sitio son sólo con fines informativos, por lo que los contenidos o recursos de esos sitios de internet o páginas gubernamentales, será responsabilidad exclusiva de los entes públicos , por lo que la autoría y reconocimiento de la misma, es responsabilidad del propio ente público. Lo anterior sin perjuicio de lo que establece la Ley Federal del Derecho de Autor y demás normatividad aplicable.
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography display='inline'>
                                    Este sitio contiene medidas de seguridad para proteger la información de cualquier alteración realizada por terceros.
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography display='inline'>
                                    La Secretaría Ejecutiva del Sistema Nacional Anticorrupción se deslinda de cualquier responsabilidad, perjuicio o daño que pueda generar el usuario por cualquier uso inadecuado del portal o la información contenida en plataformadigitalnacional.org.
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography display='inline'>
                                    El usuario se obliga a hacer buen uso del sitio, respetando la Ley General del Sistema Nacional Anticorrupción, la Ley Federal de Derechos de Autor y demás  normatividad aplicable.
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography display='inline'>
                                    Debe contar con un equipo que cumpla con las características mínimas necesarias para navegar en el sitio, recomendando su navegación en las últimas versiones de los navegadores Google Chrome, Mozilla Firefox y Safari para obtener la mejor experiencia.
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography display='inline'>
                                    Exime a la Secretaría Ejecutiva del Sistema Nacional Anticorrupción de toda responsabilidad por los daños que el uso del sitio le pudieran ocasionar en forma incidental o consecuente con su equipo, información, patrimonio o persona, así como ninguna responsabilidad por la la alteración o manipulación de los datos una vez publicados en él.
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography display='inline'>
                                    Acepta y se obliga a utilizar el sitio para fines lícitos y con apego a las disposiciones legales aplicables.
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography display='inline'>
                                    El destino y tratamiento de los datos que se obtengan de la plataforma, son responsabilidad exclusivamente del usuario, y de manera alguna señalarán el posicionamiento de ningún ente público, salvo que expresamente se refiera.
                                </Typography>
                            </li>
                        </ul>


                        <Typography variant='title' className="pdn_term_title">
                            Del libre uso de los datos
                        </Typography>

                        <Typography className="pdn_term_content">
                            Los presentes “Términos de libre uso” promueven el uso, reúso y redistribución de los conjuntos de datos abiertos, de conformidad con lo siguiente:<br/><br/>
                        </Typography>
                        <Typography className="pdn_term_content">
                            <b>Usted puede:</b>
                        </Typography>

                        <ul className={classes.ul}>
                            <li className={classes.li}><Typography display='inline'>Hacer y distribuir copias del conjunto de datos y su contenido;</Typography></li>
                            <li className={classes.li}><Typography display='inline'>Difundir y publicar el conjunto de datos y su contenido;</Typography></li>
                            <li className={classes.li}><Typography display='inline'>Adaptar o reordenar el conjunto de datos y su contenido;</Typography></li>
                            <li className={classes.li}><Typography display='inline'>Extraer total o parcialmente el contenido del conjunto de datos;</Typography></li>
                            <li className={classes.li}><Typography display='inline'>Explotar comercialmente el conjunto de datos y su contenido, y;</Typography></li>
                            <li className={classes.li}><Typography display='inline'>Crear conjuntos de datos derivados del conjunto de datos o su contenido.</Typography></li>
                        </ul>


                        <Typography className="pdn_term_content"><b>Condiciones:</b></Typography>
                        <ul className={classes.ul}>
                            <li className={classes.li}><Typography display='inline'>Citar la fuente de origen de donde obtuvo el conjunto de datos:</Typography>
                                <ul>
                                    <li>
                                        <Typography display='inline'>
                                            “Nombre del conjunto de datos”, [Siglas de la institución publicante]; Liga de internet de los datos descargados, y la fecha de la de consulta en formato numérico [AAAA-MM-DD], puestos a disposición de tal manera que sean fácilmente accesibles para los usuarios, y en la forma que mejor se adecue al funcionamiento del bien o servicio;
                                        </Typography>
                                    </li>
                                </ul>
                            </li>
                            <li className={classes.li}>
                                <Typography display='inline'>
                                    No utilizar la información con objeto de engañar o confundir a la población variando el sentido original de la información y su veracidad.
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography display='inline'>
                                    No aparentar que el uso que usted haga de los datos representa una postura.
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography display='inline'>
                                Estos términos de libre uso de datos no lo autorizan para utilizar el contenido de terceros como pueden ser obras en cualquier formato que se encuentren dentro de los conjuntos de datos. En caso de que requiera utilizar dicho contenido, deberá buscar la autorización directamente del titular de los derechos correspondientes de conformidad con la Ley Federal de Derechos de Autor.
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography display='inline'>Términos compatibles con </Typography>
                                <img src={by} alt="Creative Commons"/></li>
                        </ul>

                        <br/>

                        <Typography variant='title' className="pdn_term_title">
                            Actualización de los términos y condiciones
                        </Typography>

                        <Typography paragraph className="pdn_term_content">
                            En cualquier momento estos términos y condiciones pueden cambiar, por lo que te pedimos revises constantemente nuestro portal.
                        </Typography>
                        <br/>
                        <Typography variant='title' className="pdn_term_title">
                            Glosario
                        </Typography>
                        <Typography paragraph className="pdn_term_content">

                            <b>plataformadigitalnacional.org:</b> El sitio de internet que habilita la operación de la Plataforma Digital Nacional establecida en el Artículo 9 de la Ley General del Sistema Nacional Anticorrupción.
                            <br/>
                            <br/>
                            <b>Sistemas informáticos:</b> componentes tecnológicos de infraestructura y software utilizados para la operación de la Plataforma Digital Nacional y los establecidos en el artículo 49 de la Ley del Sistemas que alimentan la información de los subsistemas, conjuntos de datos o
                            proveedores, y que en su conjunto conforman la Plataforma Digital Nacional.
                            <br/>
                            <br/>
                            <b>Subsistemas:</b> Conjuntos de datos e información concentrados, resguardados,
                            administrados y actualizados por los encargados que alimentan a los sistemas, y que
                            contendrán la información que establezca la Secretaría Ejecutiva para ser
                            interconectada e integrada en los sistemas,
                            <br/>
                            <br/>
                            <b>Usuario:</b> Las personas y entes con atribuciones y facultades para hacer uso
                            de los sistemas de la Plataforma, y/o para ejercer derechos o acceder a la
                            información, conforme a la normativa aplicable.

                        </Typography>

                        <Typography variant="h6" className="pdn_term_title">
                            Propiedad intelectual
                        </Typography>

                        <Typography paragraph className="pdn_term_content">
                            La información del portal plataformadigitalnacional.org es pública a menos que se indique lo contrario,
                            en cuyo caso antes de reproducirla, deberás observar si tiene derechos reservados y respetarlos en términos
                            de las normas relativas a derechos de autor y propiedad industrial. Adicionalmente el usuario que reproduzca o
                            procese información contenida en gob.mx deberá referir la localización electrónica y fecha en que se realizó la
                            consulta de la información. El usuario se compromete a respetar y dejar a salvo los derechos de terceros sobre los
                            contenidos que se contengan en el portal gob.mx, en términos de la Ley aplicable, por lo que para su uso, usted
                            deberá de obtener las autorizaciones correspondientes directamente de los titulares de los derechos.
                        </Typography>
                    </Grid>
                </Grid>
                <Footer/>
            </div>
        )
    }
}

Terminos.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Terminos);
