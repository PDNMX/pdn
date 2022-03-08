import React from "react";
import {Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import GetAppIcon from "@mui/icons-material/GetApp";
import Button from "@mui/material/Button";
import withStyles from '@mui/styles/withStyles';
import {Link} from "react-router-dom";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(2),
        //background: '#ffe01b',//'#fecb6e'
    }
});

const ProtocoloConexion = props => {
    const {classes} = props;
    const {urlPlan, apiName} = props;
    return(
        <div className={classes.root}>
            <Typography variant='h5' paragraph color='textPrimary'>
                Protocolo de conexión
            </Typography>
            <Typography paragraph color="textPrimary">
                El primer paso en el proceso de establecer conexión con la Plataforma Digital Nacional es requisitar correctamente el formato de <b>Solicitud de conexión</b>
                <IconButton target={'_blank'} href={'https://drive.google.com/file/d/1ANQG3f1Q7aO4soQR9__2FvHEi_-UwvBe/view'} color="primary" aria-label="descargar"  size={'small'}><GetAppIcon/></IconButton>
                y enviarlo al correo electrónico: <b>pdn@sesna.gob.mx</b>
            </Typography>
            <Typography paragraph color="textPrimary">
                Posteriormente el equipo de la PDN llevará a cabo el procedimiento para la verificación del funcionamiento del API {apiName}, que consiste en la ejecución del siguiente <b>Plan de pruebas</b>.
            </Typography>
            <Button
                href= {urlPlan}
                target='_blank'
                variant='contained'
                color="secundario"
                className={classes.button}>
                Plan de pruebas
            </Button>

            <Typography paragraph color="textPrimary">
                Adicionalmente, ponemos a su disposición una herramienta de validación que permite verificar el cumplimiento de los esquemas de datos.
            </Typography>

            <Button
                to='/validador'
                component={Link}
                variant='contained'
                color="secundario"
                className={classes.button}>
                Validador
            </Button>
        </div>
    )
}

export default withStyles (styles) (ProtocoloConexion);