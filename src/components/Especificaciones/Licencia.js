import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Typography} from "@material-ui/core"
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {flexGrow: 1 }
});


class Licencia extends React.Component{


    render(){
        const {classes} = this.props;
        return(
            <div className={classes.root}>

                <Typography variant="h4" paragraph>Licencia</Typography>

                <Typography paragraph variant="h6">
                    Usted es libre de:
                </Typography>

                <ul>
                    <li><Typography paragraph><b>Compartir</b> &mdash; copiar y redistribuir el material en cualquier medio o formato </Typography></li>
                    <li><Typography paragraph><b>Adaptar</b> &mdash; remezclar, transformar y construir a partir del material </Typography> </li>
                </ul>
                
                <Typography paragraph>
                    La licenciante no puede revocar estas libertades en tanto usted siga los términos de la licencia.
                </Typography>

                <Typography paragraph variant="h6">
                    Bajo los siguientes términos:
                </Typography>

                <ul>
                    <li><Typography paragraph><b>Atribución</b> &mdash; Usted debe dar crédito de manera adecuada, brindar un enlace a la licencia, e indicar si se han realizado cambios. Puede hacerlo en cualquier forma razonable, pero no de forma tal que sugiera que usted o su uso tienen el apoyo de la licenciante.</Typography></li>
                    <li><Typography paragraph><b>No comercial</b> &mdash; Usted no puede hacer uso del material con propósitos comerciales.</Typography></li>
                    <li><Typography paragraph><b>Compartir igual</b> &mdash; Si remezcla, transforma o crea a partir del material, debe distribuir su contribución bajo la misma licencia del original. </Typography></li>
                    <li><Typography paragraph><b>No hay reestricciones adicionales</b> &mdash; No puede aplicar términos legales ni medidas tecnológicas que restrinjan legalmente a otras a hacer cualquier uso permitido por la licencia.</Typography></li>
                </ul>

                <Typography paragraph variant="h6">
                    Avisos:
                </Typography>
                <Typography paragraph>
                    No tiene que cumplir con la licencia para elementos del material en el dominio público o cuando su uso esté permitido por una excepción o limitación aplicable.
                </Typography>
                <Typography paragraph>
                    No se dan garantías. La licencia podría no darle todos los permisos que necesita para el uso que tenga previsto. Por ejemplo, otros derechos como publicidad, privacidad, o derechos morales pueden limitar la forma en que utilice el material.
                </Typography>
            </div>
        )
    }
}

Licencia.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles) (Licencia);