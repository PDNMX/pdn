import React from "react";
import {Grid, Typography, Paper} from "@mui/material";
import {withStyles} from '@mui/styles';
import BusquedaParticular from "./BusquedaParticular";
import Descarga from "../../Compartidos/Descarga";

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
    paper: {
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

function BuscadorParticularesSancionados({classes}) {
    return (
        <div>
            <Paper elevation={15} className={classes.paper}>
                {/*TEXTO*/}
                <Grid container className={classes.container}>
                    <Grid item xs={12} style={{maxWidth: 1200, margin: "0 auto"}}>
                        <Typography paragraph>
                            <b>Aquí puedes consultar:</b>
                        </Typography>
                        <ul className={classes.ul}>
                            <li className={classes.li}><Typography display='inline'>Datos de la sanción firme impuesta a particulares como: número de expediente, autoridad que sanciona y resolución.</Typography></li>
                            <li className={classes.li}><Typography display='inline'>Información del particular sancionado como: nombre, razón social, causa y tipo de sanción.</Typography></li>
                            {/* <li className={classes.li}>
                                <Typography display='inline'>
                                    Obtén los datos de la sanción impuesta al particular como: expediente, hechos de la
                                    falta, tipo de falta, resolución, entre otros datos
                                    de interes.
                                </Typography>
                            </li> */}
                        </ul>
                    </Grid>
                </Grid>

                {/*BUSCADOR*/}
                <Grid container justifyContent={'center'} className={classes.container}>
                    <Grid item xs={12}>
                        <BusquedaParticular/>
                    </Grid>
                </Grid>
            </Paper>
            {/*DESCARGA*/}
            <Grid container spacing={0} justifyContent="center">
                <Grid item xs={12} className={classes.itemD}>
                    <Descarga url={process.env.REACT_APP_BULK_S3_PARTICULARES} tipoGA={'bulk-s3P'}/>
                </Grid>
            </Grid>
        </div>
    )

}

export default withStyles(styles)(BuscadorParticularesSancionados);
