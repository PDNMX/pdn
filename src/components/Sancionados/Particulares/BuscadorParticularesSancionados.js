import {Grid, Typography} from "@mui/material";
import React from "react";
import {withStyles} from '@mui/styles';
import BusquedaParticular from "./BusquedaParticular";
import Descarga from "../../Compartidos/Descarga";

const styles = theme => ({
    gridTable: {
        marginBottom: '27px',
        padding: theme.spacing(1)
    },
    ul: {
        listStyle: "none",
        paddingLeft: "20px"
    },
    toolBarStyle: {
        paddingTop: '53px',
        paddingBottom: '61px',
        maxWidth: '1200px',
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
    },
    itemD: {
        maxWidth: 1200,
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(8),
        paddingTop: theme.spacing(8)
    }
});

function BuscadorParticularesSancionados({classes}) {
    return (
        <div>
            {/*TEXTO*/}
            <Grid item xs={12} style={{maxWidth: 1200, margin: "0 auto"}}>
                <Typography paragraph>
                    <b>Aquí encontrarás la siguiente información:</b>
                </Typography>
                <ul className={classes.ul}>
                    <li className={classes.li}>
                        <Typography color="textPrimary" display='inline'>
                            Consulta los particulares sancionados (inhabilitados) por institución donde cometieron
                            la falta, nombre o razón social, a nivel federal y/o estatal
                        </Typography>
                    </li>
                    <li className={classes.li}>
                        <Typography color="textPrimary" display='inline'>
                            Obtén datos del particular sancionado como: nombre, puesto, sanción y causa de la misma
                        </Typography>
                    </li>
                    <li className={classes.li}>
                        <Typography color="textPrimary" display='inline'>
                            Obtén los datos de la sanción impuesta al particular como: expediente, hechos de la
                            falta, tipo de falta, resolución, entre otros datos
                            de interes.
                        </Typography>
                    </li>
                </ul>
            </Grid>

            {/*BUSCADOR*/}
            <Grid container justifyContent={'center'} className={classes.gridTable}>
                <Grid item xs={12} className={classes.toolBarStyle}>
                    <BusquedaParticular/>
                </Grid>
            </Grid>

            {/*DESCARGA*/}
            <Grid container spacing={0} justifyContent="center">
                <Grid item xs={12} className={classes.itemD}>
                    <Descarga url={process.env.REACT_APP_BULK_S3_PARTICULARES}/>
                </Grid>
            </Grid>
        </div>
    )

}

export default withStyles(styles)(BuscadorParticularesSancionados);