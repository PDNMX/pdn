import React from "react";
import Typography from "@material-ui/core/Typography/Typography";
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    paperSecondary:{
        backgroundColor: theme.palette.secondary.light,
        padding: theme.spacing.unit*5,

    }
});
class AvisoPrivacidad extends React.Component {

    render(){
        const {classes} = this.props;
        return(
            <div>
                <div className={classes.paperSecondary}>
                    <Typography variant={"h6"}>
                        Estimado(a) quejoso(a) o denunciante:
                    </Typography>
                    <Typography variant={"body1"}>
                        La Secretaría de la Función Pública (SFP), a través de la Dirección General de Denuncias e Investigaciones (DGDI), recabará y utilizará sus datos personales para integrar expedientes de investigación de quejas y denuncias que presenten las personas físicas o morales, por actos u omisiones cometidos por servidores públicos en el ejercicio de sus funciones, y que puedan constituir una responsabilidad administrativa.

                        Lo datos personales que se recaben (nombre completo, correo electrónico, teléfono particular, sexo, edad, escolaridad, ocupación -todos opcionales-), y que desee aportar para el fin antes señalado, no serán materia de transferencia, salvo que se actualice alguna de las excepciones previstas en el artículo 22 de la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados.

                        Usted podrá ejercer sus derechos de acceso, rectificación, cancelación u oposición de sus datos personales (derechos ARCO) directamente ante la Dirección General de Transparencia de la Secretaría de la Función Pública, en el módulo de atención ciudadana ubicado en la Planta Baja del edificio ubicado en Av. Insurgentes Sur 1735, Colonia Guadalupe Inn, Delegación Álvaro Obregón, Código Postal 01020, Ciudad de México; a través de la Plataforma Nacional de Transparencia en la siguiente liga electrónica: www.plataformadetransparencia.org.mx, en el apartado de Solicitudes de Acceso a la Información; o bien, mediante el correo electrónico derechos.arco@funcionpublica.gob.mx.

                        Si tiene alguna duda sobre el ejercicio de sus derechos ARCO puede acudir a Dirección General de Transparencia, enviar un correo electrónico a la dirección antes señalada o comunicarse al teléfono +52 (55) 2000 3000, extensión 1535

                        Para mayor información acerca del tratamiento de los datos personales y de los derechos que puede hacer valer, puede consultar el aviso de privacidad integral disponible en la siguiente dirección electrónica: www.gob.mx/sfp/documentos/avisos-de-privacidad así como en el área de recepción de este inmueble.
                    </Typography>
                </div>
            </div>
        )
    }

}
export default withStyles(styles)(AvisoPrivacidad);