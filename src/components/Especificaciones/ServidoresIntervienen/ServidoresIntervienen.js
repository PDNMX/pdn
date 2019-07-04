import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Header from './Header/Header';
import Footer from "../../Home/Footer";
import Grid from '@material-ui/core/Grid';
import Estandar from "./Estandar";
import Licencia from "../Licencia";
import Implementacion from "./Implementacion";
import TablaParametros from "./TablaParametros";
import {Typography} from "@material-ui/core"
import Herramientas from "../Herramientas";
import Especificaciones from "./Especificaciones";
import ScrollToTopButton from "../../Navigation/ScrollToTopButton";

const styles = theme => ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    item:{
        maxWidth: 1200,
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2)
    },
    container:{
        background: "#fff",
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    }
});

class ServidoresIntervienen extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Header/>


                <Grid container spacing={0} justify='center' className={classes.container}>
                    <Grid item xs={12} className={classes.item}>

                        <div id="estandar">
                            <Estandar/>
                        </div>

                        <Divider/>
                        <br/>

                        <div id="licencia">
                            <Licencia/>
                        </div>

                        <Divider/>
                        <br/>

                        <div id="implementacion">
                            <Implementacion/>
                        </div>

                        <Divider/>
                        <br/>

                        <Typography variant="h4" id="api" paragraph>
                            Especificación del API de Servidores públicos que intervienen en contrataciones
                        </Typography>


                        <Typography variant="h5" id="parametros" paragraph>
                            Parámetros de consulta
                        </Typography>
                        <TablaParametros/>
                        <br/>

                        <div id="especificaciones">
                            <Especificaciones/>
                        </div>
                        
                        <Divider/>
                        <br/>

                        <Herramientas/>

                    </Grid>
                </Grid>

                <Footer/>
                <ScrollToTopButton/>

            </div>
        );
    }
}

ServidoresIntervienen.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ServidoresIntervienen);
