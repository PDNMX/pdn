import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LogoSesna from '../../assets/Logo-SESNA.png';
import LibreUso from '../../assets/libre-uso.png';
import {Typography} from "@material-ui/core"
import LogoPDN from '../../assets/PDN-sintexto-blue.png';
//import OK from '../../assets/ok_80x15_blue.png';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookSquare} from "@fortawesome/free-brands-svg-icons/faFacebookSquare";
import {faTwitter} from "@fortawesome/free-brands-svg-icons/faTwitter";
import {faYoutube} from "@fortawesome/free-brands-svg-icons/faYoutube";

const styles = theme => ({
    root: {
        flexGrow: 1,
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
        width: 170,
        paddingTop: 50,
        paddingBottom: 10
    },
    libreUso: {
        maxWidth: 140,
        paddingTop: 40,
        paddingBottom: 20
    },
    item: {
        maxWidth: "1100px!important"
    },
    grayText: {
        color: '#ffffff',
        textDecoration: 'none',
        fontSize: 14
    },
    blueText: {
        color: '#34b3eb',
        fontSize: 14
    },
    logoSESNA: {
        paddingTop: 15,
        maxWidth: 150
    },
    logoPDN: {
        paddingTop: 15,
        maxWidth: 85
    },
    link: {
        textDecoration: "none"
    },
    contentsSN: {
        paddingBottom: 50,
        position: 'absolute',
        textAlign: 'center',
        width: '100%'
    },
    redSocial: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        color: '#54565a'
    }
});

const Footer = props => {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={0}
                className={classes.parteGris}
                justifyContent="center"
            >
                <Grid item xs={12} className={classes.item}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} md={6}>
                            {/*<a href="https://www.gob.mx/sesna">
                                    <img alt="SESNA" src={LogoSesna} className={classes.logoSESNA}/>
                                </a>*/}

                            <img
                                alt="PDN"
                                src={LogoPDN}
                                className={classes.logoPDN}
                            />

                            <Typography className={classes.grayText} paragraph>
                                <b>Plataforma Digital Nacional</b>
                            </Typography>
                            <br/>
                            <br/>
                            <Typography
                                className={classes.grayText}
                                style={{
                                    fontSize: "12px",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    fontFamily: "Noto Sans SC"
                                }}
                                paragraph
                            >
                                Inteligencia de Datos Anticorrupción
                            </Typography>
                            <br/>
                            <img
                                alt="Libre Uso MX "
                                src={LibreUso}
                                className={classes.libreUso}
                            />
                            <br/>
                            {/*
                                <img alt="Open Knowledge" src={OK}/>
                                */}
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Typography className={classes.blueText} paragraph>
                                <b>Sistemas</b>
                            </Typography>
                            <Link to="/declaraciones" className={classes.link}>
                                <Typography
                                    className={classes.grayText}
                                    paragraph
                                >
                                    Declaraciones
                                </Typography>
                            </Link>
                            <Link to="/servidores" className={classes.link}>
                                <Typography
                                    className={classes.grayText}
                                    paragraph
                                >
                                    Servidores en contrataciones
                                </Typography>
                            </Link>
                            <Link to="/sancionados" className={classes.link}>
                                <Typography
                                    className={classes.grayText}
                                    paragraph
                                >
                                    Sancionados
                                </Typography>
                            </Link>
                            {/*
                                <Typography className={classes.grayText}>Fiscalización</Typography>
                                <Typography className={classes.grayText}>Denuncias</Typography>*/}
                            <Link to="/contrataciones" className={classes.link}>
                                <Typography className={classes.grayText}>
                                    Contrataciones
                                </Typography>
                            </Link>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Typography className={classes.blueText} paragraph>
                                <b>PDN</b>
                            </Typography>
                            <Typography paragraph>
                                <a
                                    href="https://www.plataformadigitalnacional.org/blog"
                                    className={classes.grayText}
                                >
                                    Blog
                                </a>
                            </Typography>

                            <Link to="/faq" className={classes.link}>
                                <Typography
                                    className={classes.grayText}
                                    paragraph
                                >
                                    Preguntas frecuentes
                                </Typography>
                            </Link>

                            <Link to="/about" className={classes.link}>
                                <Typography
                                    className={classes.grayText}
                                    paragraph
                                >
                                    ¿Qué es la PDN?
                                </Typography>
                            </Link>

                            <Link to="/terminos" className={classes.link}>
                                <Typography
                                    className={classes.grayText}
                                    paragraph
                                >
                                    Términos de uso
                                </Typography>
                            </Link>
                            {/*<Typography className={classes.grayText}>Contacto</Typography>*/}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container spacing={0} justifyContent="center">
                <Grid item xs={12} align="center">
                    <img
                        alt="SESNA"
                        src={LogoSesna}
                        className={classes.logo}
                    />
                </Grid>
                <Grid item xs={12} align={"center"}>
                    <div className={classes.contentsSN}>
                        <a href={"https://www.facebook.com/SESNAOficial/"} target={"_blank"} rel="noopener noreferrer"
                           className={classes.redSocial}><FontAwesomeIcon
                            icon={faFacebookSquare} size="2x"/></a>
                        <a href={"https://twitter.com/SESNAOficial"} target={"_blank" }className={classes.redSocial} rel="noopener noreferrer"><FontAwesomeIcon
                            icon={faTwitter} size="2x"/></a>
                        <a href={"https://www.youtube.com/channel/UCRUpiHth_WRkNo2sBmZIyfQ/"} target={"_blank" } rel="noopener noreferrer"
                           className={classes.redSocial}><FontAwesomeIcon
                            icon={faYoutube} size="2x"/></a>

                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default withStyles(styles)(Footer);