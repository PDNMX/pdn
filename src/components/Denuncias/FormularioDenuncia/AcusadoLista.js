import React from 'react'
import PropTypes from 'prop-types'
import Acusado from './Acusado'

const AcusadoList = ({acusados}) => (
    <ul>
        {acusados.map(acusado =>
            <Acusado key={acusado.id}
                     acusado = {acusado}
            />
        )}
    </ul>
)

AcusadoList.propTypes ={
    acusados: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    toogleAcusado: PropTypes.func.isRequired
}

export default AcusadoList