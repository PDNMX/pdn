import React from 'react';
import {withStyles} from "@material-ui/core";
import Header from "../Header/Header";

const styles = theme => ({
    root: {
        flexGrow: 1
    }
});

class Productos extends React.Component{

    render() {
        const {classes} = this.props;
        const bci = [
            {to:'/', text: 'Plataforma Digital Nacional'},
            {to:'/contrataciones', text: 'Contrataciones'},
            {text: 'Productos y servicios'}
        ];

        return <div className={classes.root}>
            <Header breadcrumbItems={bci}/>
            Productos
        </div>
    }

}

export default withStyles(styles)(Productos);