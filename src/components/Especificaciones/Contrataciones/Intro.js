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