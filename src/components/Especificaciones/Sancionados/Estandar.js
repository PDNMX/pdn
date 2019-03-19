import Typography from "@material-ui/core/Typography";
import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        flexGrow:1
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing.unit *2,
        background: '#ffe01b',//'#fecb6e'
    }
});

class Estandar extends React.Component {

    render() {

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Typography variant="h4" paragraph>Servidores públicos y particulares sancionados</Typography>
                <Typography paragraph>
                    Esta guía tiene como finalidad la descripción del Estándar para la Interoperabilidad de Datos de Servidores Públicos y Particulares Sancionados,
                    desarrollado por la Secretaría Ejecutiva del Sistema Nacional Anticorrupción (SESNA).
                    Se presenta el modelo de interoperabilidad que deberán adoptar los diversos sistemas de declaraciones que proveerán
                    información a la Plataforma Digital Nacional (PDN) y
                    se proporciona una serie de recomendaciones para la implementación del estándar por parte de las Instituciones.
                </Typography>

                <Typography variant="h5" paragraph>Antecedentes</Typography>
                <ul>
                    <li>
                        <Typography paragraph>
                            El 13 de septiembre de 2018, durante la Tercera Sesión Ordinaria 2018 del Comité Coordinador
                            del Sistema Nacional Anticorrupción (SNA), se aprobó el nuevo Formato Nacional para la Declaración
                            Patrimonial y de Intereses propuesto por el Comité de Participación Ciudadana (CPC),
                            el nuevo formato tendrá impacto a nivel nacional y es de presentación obligatoria para todas
                            las personas que desempeñen un empleo, cargo o comisión en los entes públicos, conforme a lo
                            dispuesto por el artículo 108 de la Constitución Política de los Estados Unidos Mexicanos y entrará en vigor, a más tardar el 30 de abril de 2019.
                        </Typography></li>
                    <li>
                        <Typography paragraph>
                            A su vez, el 23 de octubre de 2018 fueron publicadas las Bases para el funcionamiento de la
                            Plataforma Digital Nacional (PDN) en el DOF. El Art. 6 establece que para el correcto funcionamiento
                            de cada uno de los sistemas, la SESNA emitirá los protocolos, estándares, reglamentos, especificaciones
                            técnicas y cualquier normativa necesaria para la colaboración, provisión de datos y acciones para
                            cumplir con las Bases, los cuales serán obligatorios para todos los proveedores, concentradores
                            y encargados a nivel federal, estatal y municipal.
                        </Typography></li>
                    <li>
                        <Typography paragraph>
                            El 11 de noviembre de 2018 se publicó en el DOF el Acuerdo por el que el Comité Coordinador
                            del Sistema Nacional Anticorrupción emite el formato de declaraciones: de situación patrimonial
                            y de intereses; y expide las normas e instructivo para su llenado y presentación.
                            Dicho formato será utilizado por los Servidores Públicos de manera obligatoria para presentar
                            sus declaraciones de situación patrimonial y de intereses cuando se encuentre operable, esto es,
                            una vez que sea técnicamente posible la interoperabilidad de los sistemas de evolución patrimonial
                            y de declaración de intereses, a que hace referencia la fracción I del artículo 49 de la
                            Ley General del Sistema Nacional Anticorrupción, con la Plataforma Digital Nacional del
                            Sistema Nacional Anticorrupción, lo que no podrá exceder del 30 de abril del año 2019.
                        </Typography></li>
                </ul>

                <Typography variant="h5" paragraph>
                    Introducción
                </Typography>

                <Typography paragraph>
                    En la actualidad, la información de los servidores públicos y particulares sancionados de los diferentes
                    niveles de gobierno se encuentra contenida en diversos formatos,
                    bases de datos y sistemas de información; cada uno de ellos con particularidades tecnológicas y
                    reglas de negocio distintas, dificultando la integración y la
                    interoperabilidad de los datos. El Estándar para la Interoperabilidad de Datos de Servidores Públicos y Particulares Sancionados surge
                    a partir de la necesidad de distribuir, comparar y analizar
                    la información de una manera uniforme e interoperable.
                </Typography>

                <Typography paragraph>
                    Conforme a lo anterior, la SESNA ha conceptualizado a la Plataforma Digital Nacional como una
                    herramienta que permitirá la consulta de información de las diferentes instituciones de los tres
                    niveles de gobierno en un solo punto, sin tener el objetivo de concentrarla o resguardarla.
                    En ese sentido, resulta necesario dotar a la PDN de mecanismos le que permitan interconectarse
                    con los diversos sistemas de gobierno para consultar la información que resulte necesaria,
                    sin importar la tecnología con la que dichos sistemas fueron desarrollados (i.e., lenguajes de programación, bases de datos, etc.).
                </Typography>
                <Typography paragraph>

                    La PDN logrará la interoperabilidad técnica con los diversos sistemas que la integrarán a través
                    de la creación de estándares de datos y mediante el uso de Interfaces de Programación de Aplicaciones
                    o APIs (por sus siglas en Inglés). Los estándares de datos permitirán homologar la manera en que la
                    información se debe representar para su entrega a la PDN, mientras que las APIs serán el mecanismo
                    que permitirá la comunicación entre sistemas a través de Internet.
                    Las APIs son ampliamente usadas para el desarrollo de aplicaciones a gran escala.
                    El uso de APIs permitirá que las instituciones conserven el control de sus datos, gestionando el
                    acceso a los mismos mediante reglas y perfiles de usuario.

                </Typography>
                <Typography paragraph>
                    La SESNA ha planeado el desarrollo de la PDN mediante el uso APIs Web
                    con arquitectura REST (REpresentational State Transfer).
                    Dicha tecnología es ampliamente usada por en la industria del software para el desarrollo de aplicaciones web,
                    y en la actualidad, existe grán diversidad de herramientas de código abierto que permiten la implementación de
                    sistemas basados en APIs REST de manera rápida y a un bajo costo.
                </Typography>

                <Typography variant="h5" id="oas" paragraph>
                    Open API Specification
                </Typography>
                <Typography paragraph>
                    El Estándar para la Interoperabilidad de Datos de Servidores Públicos y Particulares Sancionados está basado en el formato conocido como Open API Specification (OAS),
                    el cual es un formato de especificación que permite describir de manera precisa las características con las que deberan
                    contar las APIs que integrarán a la PDN.
                    El OAS cuenta con capacidades para describir los recursos, operaciones, parámetros y estructuras de datos
                    con las que deberán contar las APIs, permitiendo su implementación con independencia tecnológica, es decir,
                    las instituciones podrán
                    emplear las herramientas tecnológicas de su elección (e.g., lenguajes de programación, bases de datos, etc.)
                    siempre que se sigan las especificaciones de manera correcta.
                </Typography>

                <p>
                    <Button variant="contained" className={classes.button} href="https://github.com/OAI/OpenAPI-Specification">Más información</Button>
                </p>

                <Typography variant="h5" id="oauth" paragraph>
                    OAuth 2.0
                </Typography>
                <Typography paragraph>
                    El acceso a las APIs que se integrarán a la PDN se gestionará a través del protocolo de autorización OAuth 2.0,
                    el cual es un estándar ampliamente usado por la industria de Internet. El estándar OAuth 2.0
                    que permitirá a la PDN obtener acceso necesario a las APIs de las instituciones
                    a través del uso de tokens de autorización.
                </Typography>
                <p>
                    <Button variant="contained" className={classes.button} href="https://oauth.net/2/"> Más información </Button>
                </p>
            </div>)
    }
}

export default withStyles(styles) (Estandar);