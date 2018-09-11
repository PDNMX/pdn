import React from 'react';
import PropTypes from 'prop-types';

const Acusado = acusado => (
    <li>
        Nombre: {acusado.nombre} Descripción: {acusado.descripcionFisica}
    </li>
);

Acusado.propTypes = {
    //onClick : PropTypes.func.isRequired,
    nombre: PropTypes.string.isRequired
};

export default Acusado