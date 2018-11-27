import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LogoSesna from '../../assets/sesna-gris.jpg';
import LibreUso from '../../assets/libre-uso.png';
import Typography from "@material-ui/core/es/Typography/Typography";
import LogoPDN from '../../assets/logo-PDN.svg';
import OK from '../../assets/ok_80x15_blue.png';

const styles = theme => ({
    root: {
        flexGrow:1,
    },
    parteGris: {
        background: '#666666',
        minHeight: 300,

        paddingTop: 80,
        paddingBottom: 60
    },
    parteBlanca:{
        paddingTop: 20,
        paddingBottom: 10
    },
    logo: {
        maxWidth: 200
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
        color: '#ffffff'
    },
    blueText: {
        color: '#34b3eb'
    },
    logoPDN:{
        maxWidth: 75
    }
});

class Footer extends React.Component{
    render(){
        const {classes} = this.props;
        return (
            <div className={classes.root}>

                <Grid container spacing={24} className={classes.parteGris} justify='center'>
                    <Grid item xs={12} className={classes.item}>

                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <img src={LogoPDN} className={classes.logoPDN}/>

                                <Typography className={classes.grayText}><b>Plataforma Digital Nacional</b></Typography>
                                <Typography className={classes.grayText}>Inteligencia de Datos Anticorrupción</Typography>
                                <br/>
                                <img src ={LibreUso} className={classes.libreUso}/>
                                <br/>
                                <img src={OK}/>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <Typography className={classes.blueText}><b>Sistemas</b></Typography>
                                <Typography className={classes.grayText}>Declaraciones </Typography>
                                <Typography className={classes.grayText}>Servidores en contrataciones</Typography>
                                <Typography className={classes.grayText}>Sancionados</Typography>
                                <Typography className={classes.grayText}>Fiscalización</Typography>
                                <Typography className={classes.grayText}>Denuncias</Typography>
                                <Typography className={classes.grayText}>Contrataciones</Typography>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <Typography className={classes.blueText}><b>PDN</b></Typography>
                                <Typography className={classes.grayText}>¿Qué es la PDN?</Typography>
                                <Typography className={classes.grayText}>Blog</Typography>
                                <Typography className={classes.grayText}>Preguntas frecuentes</Typography>
                                <Typography className={classes.grayText}>Términos de uso</Typography>
                                <Typography className={classes.grayText}>Contacto</Typography>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>

                <Grid container spacing={24} justify='center' className={classes.parteBlanca}>
                    <Grid item xs={12} align='center'>
                        <img src={LogoSesna} className={classes.logo}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}



export default  withStyles(styles)(Footer);