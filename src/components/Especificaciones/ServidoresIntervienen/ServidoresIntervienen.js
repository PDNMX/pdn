import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import Divider from '@mui/material/Divider';
import Header from './Header/Header';
import Footer from "../../Home/Footer";
import Grid from '@mui/material/Grid';
import Estandar from "./DescripcionEstandar";
import Licencia from "../Licencia";
import Implementacion from "./Implementacion";
import {Typography} from "@mui/material"
import Herramientas from "../Herramientas";
import Button from '@mui/material/Button';
import ProcoloConexion from "../ProcoloConexion";

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
    },
    divider:{
        marginBottom: theme.spacing(2)
    },
    ul: {
        listStyle: 'none',
        paddingLeft: '20px',
        color: theme.palette.text.primary
    },
    li: {
        "&:before":{
            content: '"•"',
            color: '#5fb1e6',
            fontWeight: "bold",
            display: "inline-block",
            width: "1em",
            marginLeft: "-1em"
        },
        paddingBottom: theme.spacing(1)
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(2),
        background: '#ffe01b',//'#fecb6e'
    }
});

class ServidoresIntervienen extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Header/>

                <Grid container spacing={0} justifyContent='center' className={classes.container}>
                    <Grid item xs={12} className={classes.item}>

                        <Estandar/>

                        <Divider className={classes.divider}/>

                        <Implementacion/>

                        <Divider className={classes.divider}/>

                        <Typography variant="h4" paragraph color='textPrimary'>
                            Especificaciones técnicas
                        </Typography>

                        <Typography variant='h5' paragraph color='textPrimary'>
                            Diccionario de datos
                        </Typography>

                        <Button
                            href='https://docs.google.com/spreadsheets/d/1fRhDfHtrBPYyR36zxpenXWind9FP1pLAQJOVS69QwUM/edit?usp=sharing'
                            target='_blank'
                            variant='contained'
                            className={classes.button}>
                            Más información
                        </Button>

                        <Typography variant='h5' paragraph color='textPrimary'>
                            Catálogos de claves y valores
                        </Typography>

                        <Button
                            href='https://github.com/PDNMX/catalogos/tree/master/S2%20-%20Servidores%20p%C3%BAblicos%20en%20contrataciones'
                            target='_blank'
                            variant='contained'
                            className={classes.button}>
                            Más información
                        </Button>

                        <Typography variant='h5' paragraph color='textPrimary'>
                            Especificaciones en formato Open API Specification
                        </Typography>

                        <Button
                            href='https://www.plataformadigitalnacional.org/oas/ui/?urls.primaryName=S2'
                            target='_blank'
                            variant='contained'
                            className={classes.button}>
                            Más información
                        </Button>

                        <ProcoloConexion urlPlan = {'https://drive.google.com/file/d/1ooAuvc1kNMiftE_R1yRglC6OK9bIIx8U/view'} apiName={'Servidores que intervienen en' +
                        ' procedimientos de contratación'}/>


                        <Divider className={classes.divider}/>

                        <Licencia/>

                        <Divider className={classes.divider}/>

                        <Herramientas/>

                    </Grid>
                </Grid>

                <Footer/>
            </div>
        );
    }
}

ServidoresIntervienen.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ServidoresIntervienen);
