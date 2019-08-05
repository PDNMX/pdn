import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import InputBusqueda from './InputBusqueda';
import TablaResultados from './TablaResultados';
const styles = theme => ({
    root: {
        flexGrow: 1
    }
});
class Busqueda extends React.Component{

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <InputBusqueda/>

                <TablaResultados/>

            </div>
        );
    }

}

export default withStyles(styles)(Busqueda);