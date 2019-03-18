import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Gi from '../../assets/about/interoperabilidad.png';

const styles = theme => ({
    root : {
        flexGrow: 1,
        paddingTop: theme.spacing.unit*4,
        paddingBottom: theme.spacing.unit*4,
    },
    links: {
        color: '#606060'
    },
    whiteText: {
        color: '#606060'
    },

    interopera: {
        //maxWidth: '90%'
    }
});


class Interoperabilidad extends React.Component{
    render(){
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Typography variant='display2' className={classes.links}>
                    Plataforma de <b>Interoperabilidad</b>
                </Typography>

                <br/>
                <br/>

                <Grid container spacing={0}>

                    <Grid item xs={12} md={6}>
                        <Typography className={classes.whiteText} variant="subheading">
                            Con la <b className={classes.links}>PDN</b>, las instituciones del Gobierno continuarán generando sus propios datos,
                            que ahora deberán ser <b className={classes.links}> estandarizados y distribuidos para ser consultados desde la Plataforma</b>.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography className={classes.whiteText} variant="subheading">
                            Con esto, la <b className={classes.links}>PDN permitirá el intercambio y consulta de datos eficiente </b>
                            con autoridades y ciudadanía, cuidando en todo momento la seguridad e integridad de la información.
                        </Typography>

                    </Grid>
                </Grid>

                <br/>
                <br/>

                <Grid container spacing={0} justify='center'>
                    <Grid item xs={12}>
                        <img src={Gi} alt="Interoperabilidad" className={classes.interopera} style={{maxWidth: '95%'}}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Interoperabilidad.propTypes ={
    classes : PropTypes.object.isRequired
};

export default withStyles(styles)(Interoperabilidad);
