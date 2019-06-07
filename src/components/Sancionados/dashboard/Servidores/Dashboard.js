import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import TiemposSanciones from "./TiemposSanciones";
import CausaSanciones from "./CausaSanciones";
import AnioResolucionSanciones from "./AnioResolucionSanciones";
import DependenciasSanciones from "./DependenciasSanciones";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    bgPanelTable: {
        backgroundColor: theme.palette.white.color,
        [theme.breakpoints.up('sm')]: {
            marginBottom: theme.spacing.unit * 30,
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing.unit * 10,
        },
    },
    sectionT: {
        maxWidth: '1200px',
        overflowX : 'auto',
        marginBottom : "25px",
        marginTop : "53px"
    },
    desc:{
        marginBottom : "15px"
    }
});

class Dashboard extends React.Component {
    render(){
        const {classes} = this.props;
        return (
            <div className={classes.root}>

                <Grid container spacing={0} justify='center' className={classes.bgPanelTable}>
                    <Grid item xs={12} className={classes.sectionT}>
                        <Typography variant={"h6"}>
                            {"¿Qué información es?"}
                        </Typography>
                        <Typography variant={"body1"} className={classes.desc}>
                            {"La información que se presenta a continuación corresponde a  los servidores públicos sancionados reportados en el Registro de Servidores Públicos Sancionados (RSPS) a partir de 2013 y hasta 2018. La sanción recibida reportada en los datos es la de inhabilitación para desempeñarse como servidor público"}
                        </Typography>
                        <Typography variant={"h6"} >
                            {"¿Cómo se obtiene la información?"}
                        </Typography>
                        <Typography variant={"body1"} className={classes.desc}>
                            {"Obtención semanal de las sanciones de tipo Inhabilitación vigentes resueltas a partir del año 2013. La fuente de datos es el Registro de Servidores Públicos Sancionados reportada por Función Pública en datos.gob.mx (Fuente: https://datos.gob.mx/busca/dataset/servidores-publicos-sancionados)."}
                        </Typography>
                        <Typography variant={"h6"}>
                            {"¿Cómo usar este dashboard?"}
                        </Typography>
                        <Typography variant={"body1"} className={classes.desc}>
                            Este dashboard está dividido en 4 partes principales:  <br/>
                            1. Cantidad de funcionarios sancionados. Permite conocer desde 2013 a la fecha el número de funcionarios sancionados.<br/>
                            2. Causa de las sanciones. Muestra cuáles fueron las causas de la sanción desde 2013. Es posible ver cuáles son las más y las menos comunes.<br/>
                            3. Dependencias con más sancionados. Muestra cuáles son las dependencias con más funcionarios sancionados. Es posible descargar el detalle de los sancionados (nombre, autoridad sancionadora, dependencia, inicio y fin de la sanción y causa)<br/>
                            4. Duración de las sanciones. Muestra cómo varía la duración de las sanciones por año, por tipo de sanción y por dependencia.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.sectionT}>
                        <AnioResolucionSanciones/>
                    </Grid>
                    <Grid item xs={12} className={classes.sectionT}>
                        <CausaSanciones/>
                    </Grid>
                    <Grid item xs={12} className={classes.sectionT}>
                        <DependenciasSanciones/>
                    </Grid>
                    <Grid item xs={12} className={classes.sectionT}>
                        <TiemposSanciones/>
                    </Grid>
                    {
                        /*
                        <Grid item xs={12} className={classes.sectionT}>
                        <BoxPlotTest/>
                    </Grid>
                         */
                    }


                </Grid>
            </div>
        )
    }

}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);