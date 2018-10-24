import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";

const styles = theme => ({
    mensaje:{
        textAlign : 'center',
        padding : '30px',
        color :'red'
    }
});

class Mensaje extends React.Component{
    render() {
        let {mensaje,classes} = this.props;
        return (
            <div>
                <Paper>
                    <Typography variant={"title"} className={classes.mensaje}>
                        {mensaje}
                    </Typography>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Mensaje);