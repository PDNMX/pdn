import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Gasto from "../../assets/iconos_s6/icono-gasto.svg";
import Typography from "@material-ui/core/Typography";
import Tipo from "../../assets/iconos_s6/icono-tipo-procedimiento.svg";
import Proveedor from "../../assets/iconos_s6/icono_proveedor.svg";
import {Link} from "react-router-dom";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    icon: {
        maxWidth: 200,
        //opacity: 0.5
        '&:hover':{
            opacity: 0.5
        }
    },
    iconText: {
        color: theme.palette.text.primary,
        paddingBottom: 60
    },
    visualiza: {
        color: theme.palette.text.primary,
        fontWeight: 500,
        fontSize: '48px',
        paddingBottom: theme.spacing(6)
    },
    link: {
        textDecoration: 'none'
    }
});

class Perspectivas extends React.Component{
    render(){

        const {classes} = this.props;

        return (
            <div className={classes.root}>

                <Grid container spacing={0} alignment="center">
                    <Grid item xs={12} align="center" >
                        <Typography className={classes.visualiza} paragraph>
                        Visualiza las contrataciones públicas
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={4} lg={4} xl={4} align="center">
                        <Link to='/contrataciones/instituciones' className={classes.link}>
                            <img src={Gasto} className={classes.icon} alt="Gasto"/>
                            <Typography className={classes.iconText} variant="h5">
                                Instituciones
                            </Typography>
                        </Link>
                    </Grid>

                    <Grid item xs={12} md={4} lg={4} xl={4} align="center">
                        <Link to="/contrataciones/productos" className={classes.link}>
                            <img src={Tipo} className={classes.icon} alt="Tipo de procedimiento"/>
                            <Typography className={classes.iconText} variant="h5">
                                Productos y servicios
                            </Typography>
                        </Link>
                    </Grid>

                    <Grid item xs={12} md={4} lg={4} xl={4} align="center">
                        <Link to="/contrataciones/proveedores" className={classes.link}>
                            <img src={Proveedor} className={classes.icon} alt="Proveedores"/>
                            <Typography className={classes.iconText} variant="h5">
                                Proveedores
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>

            </div>
        );
    }
}


export default withStyles(styles)(Perspectivas);