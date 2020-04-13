import React from 'react';
import {withStyles} from "@material-ui/core";
import Header from "../Header/Header"

const styles = theme => ({
    root: {
        flexGrow: 1
    }
});

class Instituciones extends React.Component{

    render() {
        const {classes} = this.props;
        const bci = [
            {to:'/', text: 'Plataforma Digital Nacional'},
            {to:'/contrataciones', text: 'Contrataciones'},
            {text: 'Instituciones'}
        ];

        return <div className={classes.root}>
            <Header breadcrumbItems={bci}/>
            <p>
            Instituciones
            </p>
        </div>
    }

}

export default withStyles(styles)(Instituciones);