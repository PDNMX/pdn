import React from 'react';
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import PDNAppBar from '../PDNAppBar/PDNAppBar';
import PDNLinks from '../PDNLinks/PDNLinks';
import Footer from '../Footer/Footer';
import Controles from './Controles';
import Resultados from './Resultados'



const styles = theme => ({
    root: {
        flexGrow: 1
    },
    contents :{
        [theme.breakpoints.up('sm')]:{
            marginLeft: '100px',
            marginRight: '100px',
            marginTop: theme.spacing.unit * 2,
            marginBottom: theme.spacing.unit * 2
        },
        [theme.breakpoints.down('sm')]:{
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            marginTop: theme.spacing.unit,
            marginBottom: theme.spacing.unit
        },
    },
    paper: {
        padding: theme.spacing.unit * 2,
        //marginRight: theme.spacing.unit * 4,
        //marginLeft: theme.spacing.unit * 4,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

});

class Index extends React.Component{
    render(){

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <PDNAppBar/>
                <div className={classes.contents}>
                    <Typography variant="title">
                        Servidores que intervienen en procesos de contratación
                    </Typography>
                    <Typography>
                        Conoce quiénes son los servidores públicos que intervienen en las contrataciones públicas, el otorgamiento de licencias, permisos, concesiones y autorizaciones, así como en la enajenación de bienes muebles de la administración pública federal y en la asignación y emisión de dictámenes en materia de avalúos y justipreciación de rentas.
                    </Typography>

                    <br/>

                    <Controles/>
                    <Resultados/>

                </div>

                <PDNLinks/>
                <Footer/>
            </div>
        );
    }

}

Index.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);