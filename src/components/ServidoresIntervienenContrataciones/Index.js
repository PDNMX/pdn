import React from 'react';
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    root: {

    }

});


class Index extends React.Component{


    render(){
        return (
            <Typography>
                Servidores que intervienen en procesos de contratación
            </Typography>);
    }

}


export default withStyles(styles)(Index);