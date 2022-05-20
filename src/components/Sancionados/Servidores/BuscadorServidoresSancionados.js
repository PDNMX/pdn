import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import BusquedaServidor from "./BusquedaServidor";
import Grid from "@mui/material/Grid";
import {Typography} from "@mui/material";
import Descarga from "../../Compartidos/Descarga";
import Paper from '@mui/material/Paper';

const styles = theme => ({
    gridTable: {
        marginBottom: theme.spacing(3),
        padding: theme.spacing(1)
    },
    ul: {
        listStyle: "none",
        paddingLeft: theme.spacing(3)
    },
    container: {
        paddingRight: theme.spacing(4),
        paddingLeft: theme.spacing(4),
    },
    toolBarStyle: {
        paddingTop: theme.spacing(7),
        paddingBottom: theme.spacing(8),
        maxWidth: '1200px',
    },
    li: {
        "&:before": {
            content: '"•"',
            color: theme.palette.azulPDN,
            fontWeight: "bold",
            display: "inline-block",
            width: "1em",
            marginLeft: "-1em"
        },
    },
    itemD: {
        maxWidth: 1200,
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(8),
        paddingTop: theme.spacing(8)
    },
    paper:{
        backgroundColor: theme.palette.background.opaque,
        maxWidth: 1200,
        paddingTop: theme.spacing(7),
        margin: 'auto',
        color: theme.palette.primario.contrastText,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.secundario.main,
        borderRadius: '0px 10px 10px 10px'
    }
});

function BuscadorServidoresSancionados(props) {
    const {classes} = props;
    return (
        <div >
            {/*TEXTO*/}
            <Paper elevation={15} className={classes.paper}>
                <Grid container className={classes.container}>
                    <Grid item xs={12} style={{maxWidth: 1200, margin: "0 auto"}}>
                        <Typography paragraph>
                            <b>Aquí puedes consultar:</b>
                        </Typography>
                        <ul className={classes.ul}>
                            <li className={classes.li}><Typography display='inline'>Datos de la sanción firme impuesta a la persona servidora pública como: plazo, tipo de falta y la causa.</Typography></li>
                            <li className={classes.li}><Typography display='inline'>Información de la persona servidora pública sancionada como:  nombre, puesto e institución en donde se realizó la falta o hecho de corrupción.</Typography></li>
                            {/* <li className={classes.li}>
                                <Typography display='inline'>
                                    Obtén los datos de la sanción impuesta al servidor: plazo, tipo de falta,
                                    causa,
                                    etc.
                                </Typography>
                            </li> */}
                        </ul>
                    </Grid>
                </Grid>
                {/*BUSCADOR*/}
                <Grid container justifyContent={'center'} className={classes.container}>
                    <Grid item xs={12} >
                        <BusquedaServidor/>
                    </Grid>
                </Grid>
            </Paper>
            {/*DESCARGA*/}
            <Grid container spacing={0} justifyContent="center">
                <Grid item xs={12} className={classes.itemD}>
                    <Descarga url={process.env.REACT_APP_BULK_S3_SERVIDORES} tipoGA={'bulk-s3SP'}/>
                </Grid>
            </Grid>
        </div>
    );
}

BuscadorServidoresSancionados.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BuscadorServidoresSancionados);
