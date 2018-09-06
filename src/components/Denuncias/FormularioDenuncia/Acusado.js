import React from 'react';
import PropTypes from 'prop-types';

const Acusado = ({acusado}) => (
    <li>
        {acusado.text}
    </li>
)

Acusado.propTypes = {
    onClick : PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
}

export default Acusado