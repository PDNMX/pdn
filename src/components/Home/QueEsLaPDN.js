import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import Star from '../../assets/grafica.png';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

const styles = theme => ({
    root: {
        flexGrow:1
    },
    container: {
        paddingTop: 100,
        paddingBottom: 150,
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1)
    },
    star: {
        maxWidth: 300
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
        background: '#ffe01b',//'#fecb6e'
    },
    headingText: {
        color : theme.palette.titleBanner.color,
        fontSize: '48px',
        [theme.breakpoints.down('sm')]:{
            fontSize: '40px',
        },
        fontWeight: 500
    },
    text: {
        fontSize: '18px',
        fontWeight: 500,
        color: theme.palette.titleBanner.color
    }
});

const QueEsLaPDN = props => {
    const { classes } = props;

    return(
        <div className={classes.root}>
            <Grid container spacing={0} justify='center' className={classes.container}>
                <Grid item xs={12} style={{paddingBottom: 60}}>
                    <Typography className={classes.headingText}>
                        ¿Qué es la Plataforma Digital Nacional?
                    </Typography>
                </Grid>


                <Grid item md={4} xs={12} align="center">
                    <img src={Star} alt="PDN" className={classes.star}/>
                </Grid>
                <Grid item md={8} xs={12}>
                    <Typography className={classes.text} paragraph>
                        La <b>Plataforma Digital Nacional</b> es una fuente de inteligencia para construir integridad y combatir la corrupción, que creará valor para el gobierno y la sociedad, a partir de grandes cantidades de datos.
                    </Typography>

                    <Typography className={classes.text} paragraph>
                        La Plataforma es un <b>medio para el intercambio de datos anticorrupción</b> del Gobierno, que busca quitar barreras y romper silos de información para que los datos sean comparables, accesibles y utilizables, empezando con <b>seis sistemas de datos prioritarios</b>.
                    </Typography>

                    <Button variant="contained" className={classes.button} component={Link} to="/about">Más información sobre la PDN</Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default withStyles(styles)(QueEsLaPDN);