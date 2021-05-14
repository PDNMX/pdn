import React from 'react';
import {withStyles, Typography, Divider, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText} from "@material-ui/core";
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import BarChartIcon from '@material-ui/icons/BarChart';
import DescriptionIcon from "@material-ui/icons/Description";
import BuildIcon from '@material-ui/icons/Build';
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
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
        descripcion: "Contiene datos sobre el presupuesto, fundamento y descripción general del proyecto; así como sus documentos, estudios y evaluaciones preparatorios relevantes."
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
        descripcion: "Contiene datos sobre la firma del contrato donde se establecen las particularidades del bien o servicio, periodos de pago, entrega y sus documentos principales."
    },
    {
        icon: <BuildIcon/>,
        etapa: "Implementación",
        descripcion: "Contiene datos sobre la ejecución del proyecto, como las fechas y pagos correspondientes por el bien o servicio, hitos del proyecto y evidencia de la ejecución."
    }
];

const Intro = props => {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <Typography color="textPrimary" paragraph>
                El Estándar de Datos de Contrataciones Abiertas (EDCA) es un referente global para la publicación estructurada
                de la información de una contratación &mdash; desde la planeación hasta la implementación &mdash; en datos abiertos.
            </Typography>

            <Typography color="textPrimary" paragraph>
                El EDCA es el estandar que permitirá a las Instituciones de Gobierno, incorporar datos de Contrataciones Públicas
                a la Plataforma Digital Nacional de manera uniforme, haciendo que la información sea comparable, accesible y utilizable.
            </Typography>

            <Button href="https://standard.open-contracting.org/latest/es/"
                    className={classes.button}
                    target="_blank" variant="contained">
                Conoce más
            </Button>

            <Typography paragraph color="textPrimary" className={classes.title}>
                ¿Qué distingue a una Contratación Abierta?
            </Typography>

            <ul className={classes.ul}>
                <li className={classes.li}>
                    <Typography color="textPrimary" display="inline">
                        En una contratación abierta, la información &mdash; desde su planeación hasta su implementación y evaluación &mdash; es pública, de manera de oportuna.
                    </Typography>
                </li>
                <li className={classes.li}>
                    <Typography color="textPrimary" display="inline">
                        En una contratación abierta, la información se encuentra disponible en datos abiertos para que cualquier ciudadano pueda reutilizarla de forma ágil y sencilla.
                    </Typography>
                </li>
                <li className={classes.li}>
                    <Typography color="textPrimary" display="inline">
                        En una contratación abierta, existen mecanismos y canales para que ciudadanos y empresas aporten ideas e información que conduzca a un mejor gasto y mejores servicios públicos.
                    </Typography>
                </li>
            </ul>

            <Typography color="textPrimary" paragraph className={classes.title}>
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
                            <ListItemText primary={e.etapa} secondary={e.descripcion}/>
                        </ListItem>
                    ))
                }

            </List>

            <Divider className={classes.divider}/>

            <Typography variant="h4" color="textPrimary" paragraph>
                Preguntas frecuentes
            </Typography>


            <Typography paragraph color="textPrimary">
                La  implementación correcta del Estándar de Datos para las Contrataciones Abiertas (EDCA) es necesaria para que las personas usuarias consulten datos útiles para la generación de inteligencia anticorrupción en el Sistema de Información Pública de Contrataciones (Sistema 6) de la Plataforma Digital Nacional (PDN).
                A continuación, se presentan las respuestas a las principales preguntas sobre la relación entre el EDCA y la PDN.
            </Typography>


            <Typography paragraph color="textPrimary">
                Las contrataciones públicas son un área de riesgo para los gobiernos; esto se debe a que implican el contacto entre personas servidoras públicas y particulares, y estos trámites y procesos consideran sumas importantes de recursos públicos. El desarrollo del Sistema 6 tiene el objetivo de permitir que la ciudadanía y las personas servidoras públicas tengan acceso a información oportuna de todo el proceso de contratación, desde la planeación hasta la ejecución de una contratación pública.  Para lograr lo anterior, es necesario estandarizar la información generada de acuerdo al  Estándar de Datos para las Contrataciones Abiertas.
            </Typography>

            <Typography color="textPrimary" className={classes.title}>
                ¿Qué es el EDCA MX?
            </Typography>

            <Typography color="textPrimary" paragraph>
                Un modelo de datos común que estructura información de todas las etapas de los procesos de contrataciones públicas. EDCA permite la divulgación de datos y documentos relevantes para someter a escrutinio público la planeación, licitación, adjudicación, contratación e implementación de cualquier adquisición pública. Contar con todos estos datos en formatos de datos abiertos que tengan una buena calidad fortalece la transparencia y fomenta que diversas personas usuarias analicen el uso de recursos públicos. En 2018, se presentó EDCA MX, la traducción al español realizada en México; sin embargo, esta versión se basó en la lista de referencia de campos en el esquema básico del EDCA 1.1.
            </Typography>

            <Typography color="textPrimary" className={classes.title}>
                ¿Qué implica el uso del EDCA MX en la PDN?
            </Typography>

            <Typography paragraph color="textPrimary">
                Con base en los artículos 49 y 50 de la LGSNA, las instituciones públicas en México que administran sistemas transaccionales de contrataciones públicas deben considerar procesos para generar o transformar datos estructurados conforme al diccionario de datos y al esquema de entrega.
            </Typography>

            <Typography paragraph color="textPrimary">
                Por otro lado, el artículo 64 de las Bases para el Funcionamiento de la PDN establece que“La Secretaría Ejecutiva establecerá un portal para dar acceso a la información agregada de este sistema, para lo cual deberá atender, preferentemente, al Estándar de Datos para Contrataciones Abiertas”.
            </Typography>

            <Typography color="textPrimary" className={classes.title}>
                ¿Dónde encuentro la definición del estándar EDCA MX?
            </Typography>

            <Typography color="textPrimary">
                Toda la información ha sido publicada por la Open Contracting Partnership en el siguiente enlace:
            </Typography>
            <Button
                className={classes.button}
                variant="contained"
                href="https://standard.open-contracting.org/latest/es/"
                target="_blank">
                Estándar OCDS
            </Button>

            <Typography paragraph color="textPrimary">
                Asimismo, para consultar la traducción, puede consultarse la especificación técnica del Sistema 6 más adelante en
                la sección "Implementación del EDCA".
                {/*https://plataformadigitalnacional.org/contrataciones/especificaciones*/}
            </Typography>

            <Typography color="textPrimary" className={classes.title}>
                ¿Qué información debe publicarse obligatoriamente?
            </Typography>

            <Typography color="textPrimary" paragraph>
                Con base en los artículos 49 y 50 de la LGSNA, y 63 y 64 de las Bases para el Funcionamiento de la Plataforma Digital Nacional, deberán publicarse datos de planeación, contratación y ejecución de arrendamientos, servicios y obras públicas indicados en la EDCA.
            </Typography>

            <Typography color="textPrimary" paragraph>
                Los datos de cada una de las mencionadas secciones se deberán publicar conforme se encuentren disponibles.
            </Typography>

            <Typography color="textPrimary" className={classes.title}>
                ¿Quién me ayuda a adaptar el estándar al contexto de mi institución?
            </Typography>

            <Typography paragraph color="textPrimary">
                Consulta el diccionario de datos del EDCA MX disponible más adelante en la sección "Implementación del EDCA".
                {/*https://plataformadigitalnacional.org/contrataciones/especificaciones*/}
            </Typography>

            <Typography paragraph color="textPrimary">
                En caso de dudas, escríbenos a pdn@sesna.gob.mx.
            </Typography>

            <Typography color="textPrimary" className={classes.title}>
                ¿Cómo publico información que no está en el estándar?
            </Typography>

            <Typography color="textPrimary">
                Es posible generar extensiones del EDCA que respondan a particularidades de cada generador de datos y a las necesidades de las personas usuarias locales.
                Para conocer más sobre las extensiones consulta el siguiente enlace:
            </Typography>

            <Button
                variant="contained"
                className={classes.button}
                href="https://standard.open-contracting.org/latest/es/guidance/map/extensions/"
                target="_blank"
            >
                Extensiones OCDS
            </Button>

            <Typography color="textPrimary" paragraph className={classes.title}>
                ¿El Sistema 6 de la PDN sustituye CompraNet?
            </Typography>

            <Typography paragraph color="textPrimary">
                No, la generación de datos del sistema de Compranet y de cualquier otro sistema transaccional de contrataciones seguirá siendo responsabilidad de los entes públicos facultados conforme a la legislación aplicable.
                El Sistema 6 de la PDN únicamente permitirá la consulta confiable de datos abiertos de todas las fases de los procesos de contrataciones realizados por medio de Compranet u otros sistemas.
            </Typography>

            <Divider className={classes.divider}/>

            <Typography variant="h4" paragraph color="textPrimary">
                Implementación del EDCA
            </Typography>

            <Typography className={classes.title} color="textSecondary">
                Diccionario de datos
            </Typography>

            <Typography color="textSecondary" >
                Contiene la traducción del Open Contracting Data Standar para México.
            </Typography>

            <Button href="https://drive.google.com/file/d/1z5uKwMozYMtVPBRcmKJfoZasI417O-p9/view?usp=sharing"
                    target="_blank" className={classes.button} variant="contained">
                Conoce más
            </Button>

            <Typography className={classes.title} color="textSecondary">
                Esquema de entrega (Release Schema)
            </Typography>

            <Typography color="textPrimary">
                El esquema de entrega proporciona la definición oficial de los campos y su estructura en Formato JSON.
            </Typography>

            <Button
                href="https://standard.open-contracting.org/schema/1__1__5/release-schema.json"
                target="_blank" className={classes.button} variant="contained"
            >
                Conoce más
            </Button>

        </div>
    )
}

export default withStyles(styles)(Intro);