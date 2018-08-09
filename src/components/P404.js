import React from 'react';
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';

class P404 extends React.Component {
    render() {
        return (
            <Paper style={{margin: '50px', padding: '45px'}}>
                <h1>404: No encontramos lo que buscabas</h1>
                <Link to="/">Regresar</Link>
            </Paper>
        )
    }
}

export default P404;