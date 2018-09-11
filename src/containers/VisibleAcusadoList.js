import {connect} from 'react-redux';
//import {toogleAcusado} from '../actions/index';
import AcusadoLista from '../components/Denuncias/FormularioDenuncia/AcusadoLista';

const mapStateToProps = (state, ownProps) => {
    console.log("mapping state to props ", state);
    return {
        acusados: state.fieldsReducer.acusados
    };
};

export default connect(
    mapStateToProps,
    null
)(AcusadoLista)