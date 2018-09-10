import React from 'react'
import PropTypes from 'prop-types'
import Acusado from './Acusado'

class AcusadoList extends React.Component{

   render(){
        let acusados = this.props.acusados;
       console.log("props:  ",this.props)
        return (
            <ul>
                {acusados.map(acusado =>
                    <Acusado key={acusado.id}
                             acusado={acusado}
                    />
                )}
            </ul>
        )
    }
}


AcusadoList.propTypes ={
    acusados: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        nombre: PropTypes.string.isRequired,
        descripcionFisica: PropTypes.string.isRequired
    }).isRequired).isRequired
}

export default AcusadoList