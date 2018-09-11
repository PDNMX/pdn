import React from 'react'
import PropTypes from 'prop-types'
import Acusado from './Acusado'

class AcusadoLista extends React.Component{

    state = {
        acusados : []
    };

    componentWillReceiveProps(nextProps){
        console.log("next props -> ", nextProps);

        this.setState({
            acusados: nextProps.acusados
        });
    }


   render(){

        console.log("lista props ->",this.props);

        return (
            <ul>
                {this.props.acusados.map((e,i) =>
                    <li key={i}>{ e.id }</li>
                )}
            </ul>
        )
   }
}

/*
AcusadoList.propTypes = {
    acusados: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        nombre: PropTypes.string.isRequired,
        descripcionFisica: PropTypes.string.isRequired
    }).isRequired).isRequired
};
*/

export default AcusadoLista;