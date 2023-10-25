import React from 'react';
import {
    Typography, Divider, List, ListItem, ListItemAvatar, Avatar, ListItemText
} from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from "@mui/icons-material/Description";
import BuildIcon from '@mui/icons-material/Build';
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ButtonPDN from "../../Compartidos/ButtonPDN";
const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    ul: {
        listStyle: 'none',
        paddingLeft: '20px',
        //color: theme.palette.text.primary
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
    title: {
        fontWeight: "bold"
    },
    divider:{
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    },
});

const etapas = [
    {
        icon: <AccountTreeIcon/>,
        etapa: "Planeación",
        descripcion: "Contiene datos sobre el presupuesto, fundamento y descripción general del proyecto; así como sus documentos, estudios y evaluaciones preparatorias."
    },
    {
        icon: <BarChartIcon/>,
        etapa: "Licitación",
        descripcion: "Contiene datos sobre el proceso de adjudicación del proyecto, como tipo de procedimiento, valor, método y criterios de adjudicación y aclaraciones, fechas relevantes y datos del testigo social, etc."
    },
    {
        icon: <ThumbUpIcon/>,
        etapa: "Adjudicación",
        descripcion: "Contiene datos sobre el proveedor asignado para el proyecto, el proceso de adjudicación, sus documentos, inconformidades y modificaciones."
    },
    {
        icon: <DescriptionIcon/>,
        etapa: "Contrato",
        descripcion: "Contiene datos sobre la firma del contrato donde se establecen las particularidades del bien, obra o servicio, periodos de pago, entrega y sus documentos principales."
    },
    {
        icon: <BuildIcon/>,
        etapa: "Implementación de la contratación",
        descripcion: "Contiene datos sobre la ejecución del proyecto, como las fechas y pagos correspondientes por el bien, obra o servicio, hitos del proyecto y evidencia de la ejecución."
    }
];

const Intro = props => {
    const {classes} = props;
    return (
        <div className={classes.root}>

            <Typography variant="h4" paragraph>
                Introducción
            </Typography>
            <Typography paragraph>
                El Estándar de Datos de Contrataciones Abiertas (EDCA) es un referente global para la publicación estructurada de la información de una contratación — desde la planeación hasta la implementación — en datos abiertos.
            </Typography>

            <Typography paragraph>
                El EDCA es el estándar que permitirá a las instituciones públicas, incorporar datos de contrataciones públicas a la Plataforma Digital Nacional (PDN) de manera uniforme, haciendo que la información sea comparable, accesible y utilizable.
            </Typography>

            <ButtonPDN href="https://standard.open-contracting.org/latest/es/"
                       target="_blank" >
                Conoce más
            </ButtonPDN>

            <Typography paragraph className={classes.title}>
                ¿Qué distingue a una Contratación Abierta?
            </Typography>

            <ul className={classes.ul}>
                <li className={classes.li}>
                    <Typography display="inline">
                        En una contratación abierta, la información — desde su planeación hasta su implementación y evaluación — es pública, de manera oportuna.
                    </Typography>
                </li>
                <li className={classes.li}>
                    <Typography display="inline">
                        En una contratación abierta, la información se encuentra disponible en datos abiertos para que cualquier ciudadano pueda utilizarla de forma ágil y sencilla.
                    </Typography>
                </li>
                <li className={classes.li}>
                    <Typography display="inline">
                        En una contratación abierta, existen mecanismos y canales para que la ciudadanía y empresas aporten ideas e información que conduzca a un mejor gasto y mejores servicios públicos.
                    </Typography>
                </li>
            </ul>

            <Typography paragraph className={classes.title}>
                Etapas del proceso de Contratación Abierta
            </Typography>

            <List>
                {
                    etapas.map((e,i) => (
                        <ListItem key={i}>
                            <ListItemAvatar>
                                <Avatar>
                                    {
                                        e.icon
                                    }
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={e.etapa} secondary={<Typography fontSize='small'>{e.descripcion}</Typography>} />
                        </ListItem>
                    ))
                }
            </List>

            <Divider className={classes.divider}/>

            <Typography variant="h4" paragraph>
                Implementación del EDCA
            </Typography>

            <Typography className={classes.title}>
                Diccionario de datos
            </Typography>

            <Typography>
                Contiene la traducción del Open Contracting Data Standard para México.
            </Typography>

            <ButtonPDN href="https://docs.google.com/spreadsheets/d/1DDpMvPG9S1H45YMAFlHBZy9jnJu71nU1Y9CEIbxRSRQ/edit?usp=sharing"
                       target="_blank" >
                Diccionario de datos
            </ButtonPDN>

            <Typography className={classes.title}>
                Esquema de entrega (Release Schema)
            </Typography>

            <Typography>
                El esquema de entrega proporciona la definición oficial de los campos y su estructura en Formato JSON.
            </Typography>

            <ButtonPDN
                href="https://standard.open-contracting.org/schema/1__1__5/release-schema.json"
                target="_blank">
                Esquema de entrega
            </ButtonPDN>


            <Typography className={classes.title}>
                Herramienta de revisión de datos
            </Typography>

            <Typography>
                La herramienta de revisión permite comprobar que los datos cumplen los requisitos del esquema.
            </Typography>

            <ButtonPDN
                href="https://standard.open-contracting.org/review/"
                target="_blank">
                Herramienta de revisión
            </ButtonPDN>

            <Typography className={classes.title}>
                Open Contracting Data Standard (OCDS)
            </Typography>

            <Typography>
                La descripción del OCDS ha sido publicada por la Open Contracting Partnership en el siguiente enlace:
            </Typography>

            <ButtonPDN
                href="https://standard.open-contracting.org/latest/es/"
                target="_blank">
                Estándar OCDS
            </ButtonPDN>

            <Divider className={classes.divider}/>

            <Typography variant="h4" paragraph>
                Protocolo de conexión
            </Typography>

            <Typography paragraph>
                La interoperabilidad entre los sistemas informáticos de las Instituciones y la PDN se establece a través de servicios web o APIs que intercambian información a través de Internet.
            </Typography>

            <Typography paragraph>
                La comunicación con la PDN se realiza a través de servicios basados en el modelo REST (REpresentational State Transfer), una tecnología ampliamente usada para el desarrollo de aplicaciones web.
            </Typography>

            <Typography paragraph>
                No obstante, la definición del API para incorporar datos al Sistema 6 se encuentra en proceso de definición, por lo cual, se recomienda comenzar con la estandarización de los datos en términos del EDCA.
            </Typography>

            <Typography paragraph>
                Las instituciones públicas interesadas en incorporar datos al Sistema 6 de la PDN deberán solicitarlo a través del correo pdn@sesna.gob.mx.
            </Typography>

            <Typography paragraph>
                A fin de que la información de contrataciones públicas pueda estar disponible a través del portal web de la PDN, se deberá realizar el envío a la SESNA, del dataset a publicar (en formato JSON). En su caso, el personal de la SESNA se pondrá en contacto para la coordinación de la publicación de los datos.
            </Typography>

            <Typography>
                Una vez que se inicie con el envío de información para su incorporación al Sistema 6 de la PDN, se deberá establecer un compromiso para la actualización de la misma con una periodicidad al menos bimestral.
            </Typography>

            <Divider className={classes.divider}/>

            <Typography variant="h4" paragraph>
                Preguntas frecuentes
            </Typography>

            <Typography paragraph>
                La implementación correcta del EDCA es necesaria para que las personas usuarias consulten datos útiles para la generación de inteligencia anticorrupción en el Sistema de Información Pública de Contrataciones (Sistema 6) de la PDN.
            </Typography>

            <Typography paragraph>
                A continuación, se presentan las respuestas a las principales preguntas sobre la relación entre el EDCA y la PDN.
            </Typography>

            <Typography paragraph>
                Las contrataciones públicas son un área de riesgo para los gobiernos; esto se debe a que implican el contacto entre personas servidoras públicas y particulares, y estos trámites y procesos consideran sumas importantes de recursos públicos. El desarrollo del Sistema 6 tiene el objetivo de permitir que la ciudadanía y las personas servidoras públicas tengan acceso a información oportuna de todo el proceso de contratación, desde la planeación hasta la ejecución. Para lograr lo anterior, es necesario que la información generada esté de acuerdo a lo establecido en el EDCA.
            </Typography>

            <Typography className={classes.title}>
                ¿Qué es el EDCA MX?
            </Typography>

            <Typography paragraph>
                Un modelo de datos que estructura información de las etapas de los procesos de contrataciones públicas y pone a disposición de la ciudadanía datos y documentos relevantes de los mismos. Contar con esta información en formatos de datos abiertos, fortalece la transparencia y fomenta que las personas usuarias vigilen el uso de recursos públicos. En 2018, se presentó EDCA MX, la traducción al español realizada en México; sin embargo, esta versión se basó en la lista de referencia de campos en el esquema básico del EDCA 1.1.
            </Typography>

            <Typography className={classes.title}>
                ¿Qué implica el uso del EDCA MX en la PDN?
            </Typography>

            <Typography paragraph>
                El artículo 63 de las Bases para el Funcionamiento de la PDN establece que El sistema de contrataciones de la PDN deberá contar al menos, información relacionada con la planeación, los procedimientos de contratación y los datos relevantes y la ejecución de los contratos de adquisiciones, arrendamientos, servicios, obras públicas y servicios relacionados con las mismas.
            </Typography>

            <Typography paragraph>
                Asímismo, el artículo 64 menciona: “La Secretaría Ejecutiva establecerá un portal para dar acceso a la información agregada de este sistema, para lo cual deberá atender, preferentemente, al Estándar de Datos para Contrataciones Abiertas”.
            </Typography>

            <Typography className={classes.title}>
                ¿Dónde encuentro la definición del estándar EDCA MX?
            </Typography>

            <Typography>
                Toda la información ha sido publicada por la Open Contracting Partnership en el siguiente enlace:
            </Typography>
            <ButtonPDN
                href="https://standard.open-contracting.org/latest/es/"
                target="_blank">
                Estándar OCDS
            </ButtonPDN>

            <Typography paragraph>
                Asimismo, para conocer la traducción, puede consultar la especificación técnica del Sistema 6 en la sección "Implementación del EDCA".
                {/*https://plataformadigitalnacional.org/contrataciones/especificaciones*/}
            </Typography>

            <Typography className={classes.title}>
                ¿Qué información debe publicarse obligatoriamente?
            </Typography>

            <Typography paragraph>
                Con base en los artículos 49 y 50 de la LGSNA, y 63 y 64 de las Bases para el Funcionamiento de la Plataforma Digital Nacional, deberán publicarse datos de la planeación, contratación y ejecución de arrendamientos, servicios y obras públicas indicados en la EDCA.
            </Typography>

            <Typography paragraph>
                Los datos de cada una de las mencionadas secciones se deberán publicar conforme se encuentren disponibles.
            </Typography>

            <Typography className={classes.title}>
                ¿Por dónde inicio para adaptar el estándar al contexto de mi institución?
            </Typography>

            <Typography paragraph>
                Consultando el diccionario de datos del EDCA MX disponible en la sección "Implementación del EDCA".
                {/*https://plataformadigitalnacional.org/contrataciones/especificaciones*/}
            </Typography>

            <Typography paragraph>
                En caso de dudas, escríbenos a pdn@sesna.gob.mx.
            </Typography>

            <Typography className={classes.title}>
                ¿Cómo publico información que no está en el estándar?
            </Typography>

            <Typography>
                Es posible generar extensiones del EDCA que respondan a particularidades de cada generador de datos y a las necesidades de las personas usuarias locales. Para conocer más sobre las extensiones consulta el siguiente enlace:
            </Typography>

            <ButtonPDN
                href="https://standard.open-contracting.org/latest/es/guidance/map/extensions/"
                target="_blank"
            >
                Extensiones OCDS
            </ButtonPDN>

            <Typography paragraph className={classes.title}>
                ¿El Sistema 6 de la PDN sustituye CompraNet?
            </Typography>

            <Typography paragraph>
                No, la generación de datos del sistema de Compranet y de cualquier otro sistema transaccional de contrataciones seguirá siendo responsabilidad de las instituciones públicas facultadas conforme a la legislación aplicable. El Sistema 6 de la PDN únicamente permitirá la consulta de datos abiertos de todas las fases de los procesos de contrataciones.
            </Typography>

        </div>
    )
}

export default withStyles(styles)(Intro);