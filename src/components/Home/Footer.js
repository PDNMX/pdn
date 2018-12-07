import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LogoSesna from '../../assets/Logo-SESNA.png';
//import LibreUso from '../../assets/libre-uso.png';
import Typography from "@material-ui/core/Typography";
//import LogoPDN from '../../assets/PDN-sintexto-blue.png';
//import OK from '../../assets/ok_80x15_blue.png';
import {Link} from 'react-router-dom';

const styles = theme => ({
    root: {
        flexGrow:1,
    },
    parteGris: {
        background: '#666666',
        minHeight: 150,

        paddingTop: 30,
        paddingBottom: 30
    },
    parteBlanca:{
        paddingTop: 20,
        paddingBottom: 10
    },
    logo: {
        maxWidth: 100
    },
    libreUso: {
        maxWidth: 200,
        paddingTop: 40,
        paddingBottom: 20
    },
    item: {
        maxWidth: 1200
    },
    grayText: {
        color: '#ffffff',
        textDecoration: 'none'
    },
    blueText: {
        color: '#34b3eb'
    },
    logoSESNA:{
        paddingTop: 15,
        maxWidth: 150
    }
});

class Footer extends React.Component{
    render(){
        const {classes} = this.props;
        return (
            <div className={classes.root}>

                <Grid container spacing={0} className={classes.parteGris} justify='center'>
                    <Grid item xs={12} className={classes.item}>

                        <Grid container spacing={24}>
                            <Grid item xs={12} md={6}>
                                <a href="https://www.gob.mx/sesna">
                                    <img alt="SESNA" src={LogoSesna} className={classes.logoSESNA}/>
                                </a>
                                {/*
                                <img alt="PDN" src={LogoPDN} className={classes.logoPDN}/>

                                <Typography className={classes.grayText}><b>Plataforma Digital Nacional</b></Typography>
                                <Typography className={classes.grayText}>Inteligencia de Datos Anticorrupción</Typography>
                                <br/>
                                <img alt="Libre Uso MX " src ={LibreUso} className={classes.libreUso}/>
                                <br/>
                                <img alt="Open Knowledge" src={OK}/>*/}
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <Typography className={classes.blueText}><b>Sistemas</b></Typography>

                                <Typography className={classes.grayText}>Declaraciones </Typography>
                                <Typography className={classes.grayText} component={Link} to="/servidores">Servidores en contrataciones</Typography>
                                <Typography className={classes.grayText} component={Link} to="/sancionados">Sancionados</Typography>
                                {/*
                                <Typography className={classes.grayText}>Fiscalización</Typography>
                                <Typography className={classes.grayText}>Denuncias</Typography>
                                <Typography className={classes.grayText}>Contrataciones</Typography>
                                */}
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <Typography className={classes.blueText}><b>PDN</b></Typography>
                                <Typography>
                                    <a href="https://www.plataformadigitalnacional.org/blog" className={classes.grayText}>Blog</a>
                                </Typography>
                                <Typography className={classes.grayText} component={Link} to="/faq">Preguntas frecuentes</Typography>
                                <Typography>
                                    <a href="https://www.plataformadigitalnacional.org/" className={classes.grayText}> ¿Qué es la PDN?</a>
                                </Typography>

                                <Typography>
                                    <a href="https://www.plataformadigitalnacional.org/terminos" className={classes.grayText}>Términos de uso</a>
                                </Typography>
                                {/*<Typography className={classes.grayText}>Contacto</Typography>*/}
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>

                {/*
                <Grid container spacing={0} justify='center' className={classes.parteBlanca}>
                    <Grid item xs={12} align='center'>
                        <img alt="SESNA" src={LogoSesna} className={classes.logo}/>
                    </Grid>
                </Grid>
                */}
            </div>
        )
    }
}



export default  withStyles(styles)(Footer);