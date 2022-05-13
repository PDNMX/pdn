import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import Estandar from "./DescripcionEstandar";
import Licencia from "../Licencia";
import Implementacion from "./Implementacion";
import {Typography} from "@mui/material"
import Herramientas from "../Herramientas";
import {Paper, Box,Grid, Divider, Link} from '@mui/material';
import pdnRoutes from "../../../routes";
import HeaderV2 from "../../HomeV2/HeaderV2";
import bgimg from "../../../assets/rediseno/fondo_cruces_dark.png";
import ButtonPDN from "../../Compartidos/ButtonPDN";
import ProtocoloConexion from '../ProtocoloConexion';
import ServiceAgreement from '../ServiceAgreement';

const styles = theme => ({
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
    divider: {
        marginBottom: theme.spacing(2)
    },
    ul: {
        listStyle: 'none',
        paddingLeft: '20px',
        color: theme.palette.text.primary
    },
    li: {
        "&:before": {
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
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.primario.main,
        backgroundImage: `url(${bgimg})`,
        backgroundRepeat: "repeat",
        backgroundPosition: 'fixed',
        color: '#f2f2f2'
    },
    rootItem: {
        maxWidth: "1200px",
        padding: theme.spacing(1),
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    paper: {
        backgroundColor: theme.palette.background.opaque,
        padding: theme.spacing(2),
        color: theme.palette.primario.contrastText,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.secundario.main,
        borderRadius: '10px 10px 10px 10px',
        display: 'flex',
        justifyContent: "center"
    },
    box: {
        maxWidth: '900px', paddingTop: '50px', paddingBottom: '50px'
    },
    link:{
        textDecoration: "none",
        color: theme.palette.text.linkColor,
        wordBreak: "break-all",
    }
});

const protocolos=[
    {nombre:'Servidores Sancionados',url:'https://drive.google.com/file/d/1in6bHq8rqeTl_v48BpByDjgxeF2fIIve/view'},
    {nombre:'Particulares Sancionados',url:'https://drive.google.com/file/d/15mPsTLuW6u97cRMxBaEP8YCkAZnX32v-/view'}
    ];

const Sancionados = props => {
    const {classes} = props;
    const section = pdnRoutes.find(route => route.path === '/especificaciones/s3');

    return (
        <div className={classes.root}>
            <HeaderV2 section={section}/>
            <Grid container spacing={0} justifyContent='center'>
                <Grid item xs={12} className={classes.rootItem}>
                    <Paper className={classes.paper} elevation={15}>
                        <Box className={classes.box}>

                            <Estandar/>

                            <Divider className={classes.divider}/>

                            <Implementacion/>

                            <Divider className={classes.divider}/>

                            <Typography variant="h4" paragraph>
                                Especificaciones técnicas
                            </Typography>

                            <Typography paragraph variant='h5'>
                                Diccionario de datos
                            </Typography>

                            <ButtonPDN
                                    href='https://docs.google.com/spreadsheets/d/1wVaVFEJQloanwasIAASFiKGC8mbNEmeijK0F58PxgCA/edit?usp=sharing'
                                    target='_blank'
                            >
                                Más información
                            </ButtonPDN>

                            <Typography paragraph variant='h5'>
                                Catálogos de claves y valores
                            </Typography>

                            <ButtonPDN
                                    href="https://github.com/PDNMX/catalogos/tree/master/S3%20-%20Sancionados"
                                    target='_blank'>
                                Más información
                            </ButtonPDN>

                            <Typography variant='h5' paragraph>
                                Especificaciones en formato Open API Specification
                            </Typography>

                            <ul className={classes.ul}>
                                <li className={classes.li}>
                                    <Link className={classes.link}
                                        href='https://www.plataformadigitalnacional.org/oas/ui/?urls.primaryName=S3%20-%20Particulares%20Sancionados'
                                        target='_blank'
                                        rel="noopener noreferrer"
                                    >
                                        <b>Particulares</b>
                                    </Link>
                                </li>
                                <li className={classes.li}>
                                    <Link className={classes.link}
                                        href='https://www.plataformadigitalnacional.org/oas/ui/?urls.primaryName=S3%20-%20Servidores%20Sancionados'
                                        target='_blank'
                                        rel="noopener noreferrer"
                                    >
                                        <b>Servidores públicos</b>
                                    </Link>
                                </li>
                            </ul>

                            <Typography paragraph variant='h5'>
                              Seguridad
                            </Typography>
                            <Typography paragraph>
                                <ButtonPDN  target='_blank'  href='https://drive.google.com/file/d/1-IvF3KYa5rups73BmVV4W8glT9csVGY9/view'>
                                    Más información
                                </ButtonPDN>
                            </Typography>

                            <ProtocoloConexion urlPlan={protocolos} />                            

                            <Divider className={classes.divider}/>

                            <ServiceAgreement />
                            
                            <Divider className={classes.divider}/>

                            <Licencia/>

                            <Divider className={classes.divider}/>

                            <Herramientas/>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );

}

Sancionados.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sancionados);
