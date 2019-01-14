import React from 'react';
import Header from '../PDNAppBar/PDNAppBar';
import Footer from "../Footer/Footer";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';


const styles = theme => ({
    root: {
        flexGrow: 1,

    },
    homeBody:{
        [theme.breakpoints.up('sm')]:{
            marginLeft: '100px',
            marginRight: '100px',
            marginTop: theme.spacing.unit * 2,
            marginBottom: theme.spacing.unit * 2,


        },
        [theme.breakpoints.down('sm')]:{
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            marginTop: theme.spacing.unit,
            marginBottom: theme.spacing.unit,
            padding:20
        }
    },
    paper: {
        padding: theme.spacing.unit * 2,
        //marginRight: theme.spacing.unit * 4,
        //marginLeft: theme.spacing.unit * 4,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    appBar: {
        marginBottom: theme.spacing.unit * 5
    },
    p: {
        marginBottom: theme.spacing.unit * 2
    },
    gridItem: {
        marginBottom: theme.spacing.unit * 2
    }
});

class Indicadores extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Header/>
                <div className={classes.homeBody}>
                    <iframe src="https://datos.gob.mx/visualizaciones/composicion/presupuestos.html?muestra=td"
                            frameBorder="0"
                            scrolling="no"
                            style={{overflow: "hidden", width: "100%", minHeight: "800px"}}/>
                </div>
                <Footer/>
            </div>
        );
    }
}

Indicadores.propTypes = {
    classes : PropTypes.object.isRequired
};

export default withStyles(styles)(Indicadores);
