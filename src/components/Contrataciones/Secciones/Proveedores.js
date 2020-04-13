import React from 'react';
import {withStyles} from "@material-ui/core";
import Header from "../Header/Header";

const styles = theme => ({
    root: {
        flexGrow: 1
    }
});

class Proveedores extends React.Component{

    render() {
        const {classes} = this.props;
        const bci = [
            {to:'/', text: 'Plataforma Digital Nacional'},
            {to:'/contrataciones', text: 'Contrataciones'},
            {text: 'Proveedores'}
        ];

        return <div className={classes.root}>
            <Header breadcrumbItems={bci}/>
            Proveedores
        </div>
    }

}

export default withStyles(styles)(Proveedores);