import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Footer from "../../Home/Footer";
import Grid from '@material-ui/core/Grid';
import DescripcionEstandar from "./DescripcionEstandar";
import Licencia from "../Licencia";
import Recomendaciones from "./Recomendaciones";
import {Typography} from "@material-ui/core"
import Herramientas from "../Herramientas";
import Header from './Header/Header';
import {Link} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ProcoloConexion from "../ProcoloConexion";

const styles = theme => ({
    root:{
        flexGrow: 1
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    item: {
        maxWidth: 1200,
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2)
    }, container: {
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
    },
});

class Declaraciones extends React.Component {

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Header/>
                <Grid container spacing={0} justify='center' className={classes.container}>
                    <Grid item xs={12} className={classes.item}>

                        <DescripcionEstandar/>

                        <Divider className={classes.divider}/>

                        <Recomendaciones/>

                        <Divider className={classes.divider}/>

                        <Typography variant="h4" paragraph color="textPrimary">
                            Especificaciones técnicas
                        </Typography>

                        <Typography paragraph color='textPrimary' variant='h5'>
                            Diccionario de datos
                        </Typography>

                        <Button
                            className={classes.button}
                            target="_blank"
                            href="https://docs.google.com/spreadsheets/d/19Kyq46YwJk9wM7znYLQdLEKfAF8jTF4WmGJINXd9Lwg/edit?ts=5d88f08f#gid=0"
                            variant="contained"
                        >
                            Más información
                        </Button>

                        <Typography paragraph color='textPrimary' variant='h5'>
                            Catálogos de códigos y valores
                        </Typography>

                        <Button
                            className={classes.button}
                            target="_blank"
                            variant="contained"
                            href="https://github.com/PDNMX/catalogos/tree/master/S1%20-%20Declaraciones">
                            Más información
                        </Button>

                        <Typography paragraph variant='h5' color='textPrimary'>
                            Especificaciones en formato Open API Specification
                        </Typography>

                        <ul className={classes.ul}>
                            <li className={classes.li}>
                                <Link
                                    href='https://www.plataformadigitalnacional.org/oas/ui/?urls.primaryName=S1%20-%20Inicial'
                                    target="_blank">
                                    <b>Formato de inicio</b>
                                </Link>
                            </li>
                            <li className={classes.li}>
                                <Link
                                    href='https://www.plataformadigitalnacional.org/oas/ui/?urls.primaryName=S1%20-%20Modificaci%C3%B3n'
                                    target="_blank">
                                    <b>Formato de modificación</b>
                                </Link>
                            </li>
                            <li className={classes.li}>
                                <Link
                                    href='https://www.plataformadigitalnacional.org/oas/ui/?urls.primaryName=%20S1%20-%20Conclusi%C3%B3n'
                                    target="_blank">
                                    <b>Formato de conclusión</b>
                                </Link>
                            </li>
                        </ul>

                        <Typography paragraph variant="h5" color='textPrimary'>Versionado</Typography>
                        <Button className={classes.button} target='_blank' variant="contained"
                                href="https://drive.google.com/file/d/1xIPoMa-xKlCi9OZs_Uc7ffvANImaKWnK/view">
                            Más información
                        </Button>

                        
                        <ProcoloConexion urlPlan={'https://drive.google.com/open?id=1HZailvIOV77By1JwQKWXGTungYRBFmHi'} apiName={'Declaraciones'} />
                        

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

Declaraciones.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Declaraciones);
