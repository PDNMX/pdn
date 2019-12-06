import React from "react";
import {Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import GetAppIcon from "@material-ui/icons/GetApp";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Link} from "react-router-dom";


const styles = theme => ({
    root: {
        flexGrow: 1
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(2),
        background: '#ffe01b',//'#fecb6e'
    }
});

class ProcoloConexion extends React.Component{
    render(){
        const {classes} = this.props;
        let {urlPlan, apiName} = this.props;
        return(
            <div className={classes.root}>
                <Typography variant='h5' paragraph color='textPrimary'>
                    Protocolo de conexión
                </Typography>
                <Typography paragraph color="textPrimary">
                    Para establecer la conexión con la Plataforma Digital Nacional es necesario requisitar el formato de <b>Solicitud de conexión</b>
                    <IconButton target={'_blank'} href={'https://drive.google.com/file/d/1ANQG3f1Q7aO4soQR9__2FvHEi_-UwvBe/view'} color="primary" aria-label="descargar"  size={'small'}><GetAppIcon/></IconButton>correctamente
                    y enviarlo al correo electrónico: <b>pdn@sesna.gob.mx </b>
                </Typography>
                <Typography paragraph color="textPrimary">
                    Posteriormente el equipo de la PDN llevará a cabo el procedimiento para la verificación del funcionamiento del API {apiName}, que consiste en la ejecución del siguiente <b>Plan de pruebas</b>.
                </Typography>
                <Typography paragraph color="textPrimary">
                    Adicionalmente, ponemos a disposición un <Link to="/validador" className={classes.link}><Typography component={'span'}>Validador </Typography></Link>
                     que sirve de apoyo para la validación del cumplimiento de los esquemas de datos de las diferentes API's.
                </Typography>
                <Button
                    href= {urlPlan}
                    target='_blank'
                    variant='contained'
                    className={classes.button}>
                    Plan de pruebas
                </Button>

            </div>
        )
    }
}

ProcoloConexion.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles (styles) (ProcoloConexion);