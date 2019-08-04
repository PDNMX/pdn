import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Gasto from "../../assets/iconos_s6/icono-gasto.svg";
import Typography from "@material-ui/core/Typography";
import Tipo from "../../assets/iconos_s6/icono-tipo-procedimiento.svg";
import Proveedor from "../../assets/iconos_s6/icono_proveedor.svg";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    icon: {
        maxWidth: 200,
        '&:hover':{
            opacity: 0.5
        }
    },
    iconText: {
        color: theme.palette.titleBanner.color,
        paddingBottom: 60
    },
    visualiza: {
        color: theme.palette.titleBanner.color,
        fontWeight: 500,
        fontSize: '48px',
        paddingBottom: theme.spacing(6)
    }
});

class Perspectivas extends React.Component{
    render(){

        const {classes} = this.props;

        return (
            <div className={classes.root}>

                <Grid container spacing={0}>
                    <Grid item xs={12} align="center" >
                        <Typography className={classes.visualiza} paragraph>
                        Visualiza las contrataciones púbicas
                        </Typography>
                    </Grid>

                    <Grid item xs={4} align="center">
                        <img src={Gasto} className={classes.icon} alt="Gasto"/>
                        <Typography className={classes.iconText} variant="h5">
                            Gasto
                        </Typography>
                    </Grid>
                    <Grid item xs={4} align="center">
                        <img src={Tipo} className={classes.icon} alt="Tipo de procedimiento"/>
                        <Typography className={classes.iconText} variant="h5">
                            Tipo de procedimiento
                        </Typography>
                    </Grid>
                    <Grid item xs={4} align="center">
                        <img src={Proveedor} className={classes.icon} alt="Proveedores"/>
                        <Typography className={classes.iconText} variant="h5">
                            Proveedores
                        </Typography>
                    </Grid>
                </Grid>

            </div>
        );
    }
}


export default withStyles(styles)(Perspectivas);