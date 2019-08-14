import React from 'react';
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/styles";

const styles = theme => ({
    root: {
        flexGrow: 1
    }
});

class Disclaimer extends React.Component{

    render() {
        return (
            <div>
                <Typography paragraph>
                    Aquí encontrarás la siguiente información:
                </Typography>

                <ul>
                    <li><Typography>Cuánto gasta el gobierno</Typography></li>
                    <li><Typography>Qué tipos de procedimientos</Typography></li>
                    <li><Typography>información sobre los proveedores que participan</Typography></li>
                </ul>
            </div>
        );
    }
}

export default withStyles(styles)(Disclaimer);