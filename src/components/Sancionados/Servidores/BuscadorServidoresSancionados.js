import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import BusquedaServidor from "./BusquedaServidor";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
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
    infoBusqueda: {
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        backgroundColor: "white"
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
    },
    containerD: {
        backgroundColor: '#f6f6f6'
    },
});


class BuscadorServidoresSancionados extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {classes} = this.props;
        return (
            <div>
                <div>
                    {/*TEXTO*/}
                    <Grid container className={classes.infoBusqueda}>
                        <Grid item xs={12} style={{maxWidth: 1200, margin: "0 auto"}}>
                            <Typography paragraph>
                                <b>Aquí encontrarás la siguiente información:</b>
                            </Typography>
                            <ul className={classes.ul}>
                                <li className={classes.li}><Typography color="textPrimary" display='inline'>Consulta
                                    los servidores sancionados (inhabilitados) por institución, a nivel federal y/o
                                    estatal</Typography></li>
                                <li className={classes.li}>
                                    <Typography color="textPrimary" display='inline'>
                                        Obtén datos del servidor como: nombre, puesto, institución donde cometió la
                                        falta
                                    </Typography>
                                </li>
                                <li className={classes.li}>
                                    <Typography color="textPrimary" display='inline'>
                                        Obtén los datos de la sanción impuesta al servidor: plazo, tipo de falta,
                                        causa,
                                        etc.
                                    </Typography>
                                </li>
                            </ul>
                        </Grid>
                    </Grid>
                    {/*BUSCADOR*/}
                    <Grid container justify={'center'} className={classes.gridTable}>
                        <Grid item xs={12} className={classes.toolBarStyle}>
                            <BusquedaServidor verDetalle={this.verDetalle}/>
                        </Grid>
                    </Grid>
                    {/*DESCARGA*/}
                    <Grid container spacing={0} justify="center" className={classes.containerD}>
                        <Grid item xs={12} className={classes.itemD}>
                            <Descarga url={process.env.REACT_APP_BULK_S3_SERVIDORES}/>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

BuscadorServidoresSancionados.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BuscadorServidoresSancionados);
