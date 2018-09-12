import {connect} from 'react-redux';
import AcusadoLista from '../components/Denuncias/FormularioDenuncia/AcusadoLista';

const mapStateToProps = (state, ownProps) => {
    let newState = {
        acusados:  state.fieldsReducer.acusados
    };
   return  newState;

};

export default connect(
    mapStateToProps,
    null
)(AcusadoLista)