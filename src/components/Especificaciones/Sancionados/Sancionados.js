import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Footer from "../../Home/Footer";
import Grid from '@material-ui/core/Grid';
import Estandar from "./DescripcionEstandar";
import Licencia from "../Licencia";
import Implementacion from "./Implementacion";
import {Typography} from "@material-ui/core"
import Herramientas from "../Herramientas";
import Header from './Header/Header';
import ScrollToTopButton from "../../Navigation/ScrollToTopButton";
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

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

                <Grid container spacing={0} justify='center' className={classes.container}>
                    <Grid item xs={12} className={classes.item}>

                        <Estandar/>

                        <Divider className={classes.divider}/>

                        <Licencia/>

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
                                <Link
                                    href='https://app.swaggerhub.com/apis/pdn-mx/s3-Sancionados_Particulares/1.0.0'
                                    target='_blank'
                                >
                                    <b>Particulares</b>
                                </Link>
                            </li>
                            <li className={classes.li}>
                                <Link
                                    href='https://app.swaggerhub.com/apis/pdn-mx/s3-Sancionados_Servidores_Publicos/1.0.0'
                                    target='_blank'
                                >
                                    <b>Servidores públicos</b>
                                </Link>
                            </li>
                        </ul>

                        <Divider className={classes.divider}/>

                        <Herramientas/>

                    </Grid>
                </Grid>

                <Footer/>
                <ScrollToTopButton/>
            </div>
        );
    }
}

Sancionados.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sancionados);
