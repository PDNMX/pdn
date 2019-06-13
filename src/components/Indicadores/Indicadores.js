import React from 'react';
import Header from '../PDNAppBar/PDNAppBar';
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
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),


        },
        [theme.breakpoints.down('sm')]:{
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            padding:20
        }
    },
    paper: {
        padding: theme.spacing(2),
        //marginRight: theme.spacing(4),
        //marginLeft: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    appBar: {
        marginBottom: theme.spacing(5)
    },
    p: {
        marginBottom: theme.spacing(2)
    },
    gridItem: {
        marginBottom: theme.spacing(2)
    }
});

class Indicadores extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Header/>
                <div className={classes.homeBody}>
                    <iframe src="https://datos.gob.mx/visualizaciones/composicion/presupuestos.html?muestra=td" title={"Indicadores"}
                            frameBorder="0"
                            scrolling="no"
                            style={{overflow: "hidden", width: "100%", minHeight: "800px"}}/>
                </div>

            </div>
        );
    }
}

Indicadores.propTypes = {
    classes : PropTypes.object.isRequired
};

export default withStyles(styles)(Indicadores);
