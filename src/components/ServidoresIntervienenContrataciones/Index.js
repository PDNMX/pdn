import React from 'react';
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';


const styles = theme => ({
    root: {
        flexGrow: 1
    }

});

class Index extends React.Component{
    render(){

        const {classes} = this.props;

        return (
            <Typography>
                Servidores que intervienen en procesos de contratación
            </Typography>);
    }

}

Index.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);