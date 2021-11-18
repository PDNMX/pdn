import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import Divider from '@mui/material/Divider';
import Footer from "../../Home/Footer";
import Grid from '@mui/material/Grid';
import Estandar from "./DescripcionEstandar";
import Licencia from "../Licencia";
import Implementacion from "./Implementacion";
import {Typography} from "@mui/material"
import Herramientas from "../Herramientas";
import Header from './Header/Header';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import GetAppIcon from "@mui/icons-material/GetApp";

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
    }, container:{
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

class Sancionados extends React.Component {

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
                        
                        <Typography paragraph color='textPrimary' variant='h5'>
                            Diccionario de datos
                        </Typography>

                        <Button
                            href='https://docs.google.com/spreadsheets/d/1wVaVFEJQloanwasIAASFiKGC8mbNEmeijK0F58PxgCA/edit?usp=sharing'
                            target='_blank'
                            className={classes.button} variant='contained'
                        >
                            Más información
                        </Button>

                        <Typography paragraph color='textPrimary' variant='h5'>
                            Catálogos de claves y valores
                        </Typography>

                        <Button
                            href="https://github.com/PDNMX/catalogos/tree/master/S3%20-%20Sancionados"
                            target='_blank'
                            className={classes.button}
                            variant='contained'>
                            Más información
                        </Button>

                        <Typography variant='h5' paragraph color='textPrimary'>
                            Especificaciones en formato Open API Specification
                        </Typography>

                        <ul className={classes.ul}>
                            <li className={classes.li}>
                                <a
                                    href='https://www.plataformadigitalnacional.org/oas/ui/?urls.primaryName=S3%20-%20Particulares%20Sancionados'
                                    target='_blank'
                                    rel="noopener noreferrer"
                                >
                                    <b>Particulares</b>
                                </a>
                            </li>
                            <li className={classes.li}>
                                <a
                                    href='https://www.plataformadigitalnacional.org/oas/ui/?urls.primaryName=S3%20-%20Servidores%20Sancionados'
                                    target='_blank'
                                    rel="noopener noreferrer"
                                >
                                    <b>Servidores públicos</b>
                                </a>
                            </li>
                        </ul>
                        <Typography variant='h5' paragraph color='textPrimary'>
                            Protocolo de conexión
                        </Typography>
                        <Typography paragraph color="textPrimary">
                            Para establecer la conexión con la Plataforma Digital Nacional es necesario requisitar el formato de <b>Solicitud de conexión</b><IconButton target={'_blank'} href={'https://drive.google.com/file/d/1ANQG3f1Q7aO4soQR9__2FvHEi_-UwvBe/view'} color="primary" aria-label="descargar"  size={'small'}><GetAppIcon/></IconButton>correctamente
                            y enviarlo al correo electrónico: <b>pdn@sesna.gob.mx </b>
                        </Typography>
                        <Typography paragraph color="textPrimary">
                            Posteriormente el equipo de la PDN llevará a cabo el procedimiento para la verificación del funcionamiento del API que consiste en la ejecución del siguiente <b>Plan de pruebas</b>.
                        </Typography>
                        <Button
                            href= {'https://drive.google.com/file/d/1in6bHq8rqeTl_v48BpByDjgxeF2fIIve/view'}
                            target='_blank'
                            variant='contained'
                            className={classes.button}>
                             Servidores Sancionados
                        </Button>
                        <Button
                            href= {'https://drive.google.com/file/d/15mPsTLuW6u97cRMxBaEP8YCkAZnX32v-/view'}
                            target='_blank'
                            variant='contained'
                            className={classes.button}>
                            Particulares Sancionados
                        </Button>
                        <Typography paragraph color="textPrimary">
                            Adicionalmente, ponemos a disposición un <Link to="/validador" className={classes.link}><Typography component={'span'}><b>Validador</b> </Typography></Link>
                            que sirve de apoyo para la validación del cumplimiento de los esquemas de datos de las diferentes API's.
                        </Typography>

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

Sancionados.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sancionados);
