import React from 'react';
import withStyles from '@mui/styles/withStyles';
import Grid from '@mui/material/Grid';
import LogoSesna from '../../assets/Logo-SESNA.png';
import LibreUso from '../../assets/libre-uso.png';
import {Typography} from "@mui/material"
import LogoPDN from '../../assets/PDN-sintexto-blue.png';
import OK from '../../assets/ok_80x15_blue.png';
import {Link} from 'react-router-dom';

const styles = theme => ({
    root: {
        flexGrow:1,
    },
    parteGris: {
        background: '#666666',
        minHeight: 150,

        paddingTop: '94px',
        paddingBottom: '64px',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    logo: {
        width: 115,
        paddingTop: 50,
        paddingBottom: 45
    },
    libreUso: {
        maxWidth: 140,
        paddingTop: 40,
        paddingBottom: 20
    },
    item: {
        maxWidth: "1100px"
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
    },
    logoPDN:{
        paddingTop: 15,
        maxWidth: 85
    }
});

class Footer extends React.Component{
    render(){
        const {classes} = this.props;
        return (
            <div className={classes.root}>

                <Grid container spacing={0} className={classes.parteGris} justifyContent='center'>
                    <Grid item xs={12} className={classes.item}>

                        <Grid container spacing={0}>
                            <Grid item xs={12} md={6}>
                                {/*<a href="https://www.gob.mx/sesna">
                                    <img alt="SESNA" src={LogoSesna} className={classes.logoSESNA}/>
                                </a>*/}

                                <img alt="PDN" src={LogoPDN} className={classes.logoPDN}/>

                                <Typography className={classes.grayText} paragraph>
                                    <b>Plataforma Digital Nacional</b>
                                </Typography>
                                <br/>
                                <br/>
                                <Typography className={classes.grayText}  style={{
                                    fontSize: '12px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    fontFamily: 'Noto Sans SC'
                                }} paragraph>Inteligencia de Datos Anticorrupción</Typography>
                                <br/>
                                <img alt="Libre Uso MX " src ={LibreUso} className={classes.libreUso}/>
                                <br/>
                                <img alt="Open Knowledge" src={OK}/>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <Typography className={classes.blueText} paragraph>
                                    <b>Sistemas</b>
                                </Typography>
                                <Typography className={classes.grayText} paragraph>
                                    <a href="https://demospdn.host/declaraciones/" className={classes.grayText}> Declaraciones</a> </Typography>
                                <Typography className={classes.grayText} component={Link} to="/servidores" paragraph>
                                    Servidores en contrataciones
                                </Typography>
                                <Typography className={classes.grayText} component={Link} to="/sancionados" paragraph>
                                    Sancionados
                                </Typography>
                                {/*
                                <Typography className={classes.grayText}>Fiscalización</Typography>
                                <Typography className={classes.grayText}>Denuncias</Typography>
                                <Typography className={classes.grayText}>Contrataciones</Typography>
                                */}
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <Typography className={classes.blueText} paragraph>
                                    <b>PDN</b>
                                </Typography>
                                <Typography paragraph>
                                    <a href="https://www.plataformadigitalnacional.org/blog" className={classes.grayText}>Blog</a>
                                </Typography>
                                <Typography className={classes.grayText} component={Link} to="/faq" paragraph>
                                    Preguntas frecuentes
                                </Typography>
                                <Typography component={Link} to="/about" className={classes.grayText} paragraph>
                                    ¿Qué es la PDN?
                                </Typography>
                                <Typography component={Link} to="/terminos" className={classes.grayText}>
                                    Términos de uso
                                </Typography>
                                {/*<Typography className={classes.grayText}>Contacto</Typography>*/}
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>


                <Grid container spacing={0} justifyContent='center'>
                    <Grid item xs={12} align="center">
                        <img alt="SESNA" src={LogoSesna} className={classes.logo}/>
                    </Grid>
                </Grid>

            </div>
        );
    }
}



export default  withStyles(styles)(Footer);
