import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import {Typography} from "@material-ui/core"

const styles = theme => ({
    root: {
        flexGrow:1
    }
});

class Antecedentes extends React.Component{

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Typography variant="h5">Antecedentes</Typography>
                <ul>
                    <li>
                        <Typography paragraph>
                            El 13 de septiembre de 2018, durante la Tercera Sesión Ordinaria 2018 del Comité Coordinador
                            del Sistema Nacional Anticorrupción (SNA), se aprobó el nuevo Formato Nacional para la Declaración
                            Patrimonial y de Intereses propuesto por el Comité de Participación Ciudadana (CPC),
                            el nuevo formato tendrá impacto a nivel nacional y es de presentación obligatoria para todas
                            las personas que desempeñen un empleo, cargo o comisión en los entes públicos, conforme a lo
                            dispuesto por el artículo 108 de la Constitución Política de los Estados Unidos Mexicanos
                            y entrará en vigor, a más tardar el 30 de abril de 2019.
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
            </div>
        );
    }

}


Antecedentes.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles) (Antecedentes);