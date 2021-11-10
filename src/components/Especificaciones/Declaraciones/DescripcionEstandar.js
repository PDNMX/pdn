import {Typography} from "@mui/material"
import React from "react";
import withStyles from '@mui/styles/withStyles';
import Button from '@mui/material/Button';

const styles = theme => ({
    root: {
        flexGrow:1
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(2),
        background: '#ffe01b',//'#fecb6e'
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
});

class DescripcionEstandar extends React.Component {

    render() {

        const {classes} = this.props;

        return (
            <div className={classes.root}>

                <Typography paragraph color='textPrimary'>
                    Esta guía tiene como finalidad la descripción del Estándar para la Interoperabilidad de Datos de Declaraciones,
                    desarrollado por la Secretaría Ejecutiva del Sistema Nacional Anticorrupción (SESNA).
                    Se presenta el modelo de interoperabilidad que deberán adoptar los diversos sistemas de declaraciones que proveerán información a
                    la Plataforma Digital Nacional (PDN) y se proporciona una serie de recomendaciones para la implementación del estándar por parte de las Instituciones.
                </Typography>

                <Typography paragraph color="textPrimary">
                    También puedes hacer click en el botón que aparece a continuación, el cual <b>contienene información relevante para</b> los equipos
                    encargados de desarrollar la <b>interconexión de su sistema de declaraciones</b> con la
                    Plataforma Digital Nacional.
                </Typography>

                <Button variant="contained" className={classes.button} target="_blank" href="https://drive.google.com/file/d/1wHQpaFdP5An8V4Vhnjj1a4GBbYIREMHo/view?usp=sharing">
                    Más información
                </Button>

                <Typography variant="h5" paragraph color='textPrimary'>Antecedentes</Typography>
                <ul className={classes.ul}>
                    <li className={classes.li}>
                        <Typography paragraph display='inline'>
                            El 23 de octubre de 2018 fueron publicadas las Bases para el funcionamiento
                            de la Plataforma Digital Nacional (PDN) en el Diario Oficial de la Federación (DOF).
                            En el art. 6 de las Bases, se establece que para el correcto funcionamiento de cada uno de los sistemas,
                            la SESNA emitirá los protocolos, estándares, reglamentos, especificaciones técnicas y cualquier normativa necesaria para la colaboración,
                            provisión de datos y acciones, los cuales serán obligatorios para todos los proveedores, concentradores y encargados a nivel federal, estatal y municipal.
                        </Typography></li>
                    <li className={classes.li}>
                        <Typography paragraph display='inline'>
                            El 10 de julio y el 7 de agosto del 2019, sucedieron la 3º Sesión Ordinaria y la 2º Sesión
                            Extraordinaria del Comité Coordinador del Sistema Nacional Anticorrupción. El resultado de éstas
                            es la aprobación a las modificaciones de los formatos que los y las servidoras públicas a nivel nacional utilizaremos para declarar nuestros patrimonios e intereses.
                        </Typography></li>
                    <li className={classes.li}>
                        <Typography paragraph display="inline">
                            La publicación en el DOF del nuevo formato de declaraciones de situación patrimonial y de intereses sucedió
                            el 23 de septiembre del 2019. Asimismo, en el segundo transitorio del Acuerdo por el que el Comité Coordinador del Sistema Nacional Anticorrupción emite el formato,
                            se estableció que las autoridades correspondientes deberán, en los sistemas de información para presentar las declaraciones,
                            implementar el nuevo formato y garantizar la interoperabilidad con la PDN a más tardar el 31 de diciembre del 2019.
                        </Typography></li>
                </ul>

                <Typography variant="h5" paragraph color="textPrimary">
                    Introducción
                </Typography>

                <Typography paragraph color="textPrimary">
                    La información de declaraciones de los servidores públicos de los diferentes niveles de gobierno se encuentra contenida en diversos formatos, bases de datos y sistemas de información; cada uno de ellos con particularidades tecnológicas y reglas de negocio distintas que complican la integración y la interoperabilidad de los datos. El Estándar para la Interoperabilidad de Datos de Declaraciones surge a partir de la necesidad de distribuir, comparar y analizar la información de las declaraciones de situación patrimonial y de intereses de una manera uniforme e interoperable.
                </Typography>

                <Typography paragraph color="textPrimary">
                    Conforme a lo anterior, la SESNA ha conceptualizado a la Plataforma Digital Nacional como una herramienta que permitirá la consulta de información de las diferentes instituciones de los tres niveles de gobierno, sin tener el objetivo de concentrarla o resguardarla. En ese sentido, resulta necesario dotar a la PDN de mecanismos que le permitan interconectarse con los diversos sistemas de gobierno para consultar la información que resulte necesaria, sin importar la tecnología con la que dichos sistemas fueron desarrollados (i.e. lenguajes de programación, bases de datos, etc.).
                </Typography>

                <Typography paragraph color="textPrimary">
                    La PDN logrará la interoperabilidad técnica con los diversos sistemas que la integrarán a través de la creación de estándares de datos y mediante el uso de Interfaces de Programación de Aplicaciones (APIs, por sus siglas en Inglés). Los estándares de datos permitirán homologar la manera en que la información se debe representar para su entrega a la PDN, mientras que las APIs serán el mecanismo que permitirá la comunicación entre sistemas a través de Internet. Las APIs son ampliamente usadas para el desarrollo de aplicaciones a gran escala. El uso de APIs permitirá que las instituciones conserven el control de sus datos, gestionando el acceso a los mismos mediante reglas y perfiles de usuario.
                </Typography>


                <Typography paragraph color="textPrimary">
                    La SESNA ha planeado el desarrollo de la PDN mediante el uso APIs Web con arquitectura REST (REpresentational State Transfer). Dicha tecnología es ampliamente usada por en la industria del software para el desarrollo de aplicaciones web, y en la actualidad, existe grán diversidad de herramientas de código abierto que permiten la implementación de sistemas basados en APIs REST de manera rápida y a un bajo costo.
                </Typography>

                <Typography variant="h5" paragraph color="textPrimary">
                    Open API Specification
                </Typography>
                <Typography paragraph color="textPrimary">
                    El Estándar para la Interoperabilidad de Datos de Declaraciones está basado en el formato
                    conocido como Open API Specification (OAS),
                    el cual es un formato de especificación que permite describir de manera precisa las características con las que deberan
                    contar las APIs que integrarán a la PDN.
                    El OAS cuenta con capacidades para describir los recursos, operaciones, parámetros y estructuras de datos
                    con las que deberán contar las APIs, permitiendo su implementación con independencia tecnológica, es decir,
                    las instituciones podrán
                    emplear las herramientas tecnológicas de su elección (e.g., lenguajes de programación, bases de datos, etc.)
                    siempre que se sigan las especificaciones de manera correcta.
                </Typography>

                <p>
                    <Button variant="contained" className={classes.button} target="_blank" href="https://github.com/OAI/OpenAPI-Specification">Más información</Button>
                </p>

                <Typography variant="h5" paragraph color="textPrimary">
                    OAuth 2.0
                </Typography>
                <Typography paragraph color="textPrimary">
                    El acceso a las APIs que se integrarán a la PDN se gestionará a través del protocolo de autorización OAuth 2.0,
                    el cual es un estándar ampliamente usado por la industria de Internet. El estándar OAuth 2.0
                    que permitirá a la PDN obtener acceso necesario a las APIs de las instituciones
                    a través del uso de tokens de autorización.
                </Typography>
                <p>
                    <Button variant="contained" className={classes.button} target="_blank" href="https://oauth.net/2/"> Más información </Button>
                    <Button variant="contained" className={classes.button} target="_blank" href="https://drive.google.com/file/d/17-npQleAV87gV19hbmtzgZipegl0qrIO/view?usp=sharing"> Guía de referencia </Button>
                </p>
            </div>)
    }
}

export default withStyles(styles) (DescripcionEstandar);