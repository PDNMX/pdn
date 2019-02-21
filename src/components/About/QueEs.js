import React from 'react';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import mapita from '../../assets/about/mapa.svg';
import Grid from '@material-ui/core/Grid';
const styles = theme => ({
    root : {
        paddingTop: theme.spacing.unit*4,
        paddingBottom: theme.spacing.unit*4,
    },
    mapita: {
        maxWidth: "70%"
    },
    links: {
        color: '#96cb99'
    }
});

class QueEs extends React.Component{

    render (){
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Typography style={{color:'#96cb99'}} variant="display2">¿Qué es la Plataforma Digital Nacional?</Typography>

                <br/>
                <br/>

                <Grid container spacing={0}>
                    <Grid item xs={12} md={6}>
                        <img src={mapita} alt="Mapita" className={classes.mapita}/>
                    </Grid>

                    <Grid item xs={12} md={6}>

                        <Typography variant="subheading">
                            La Plataforma Digital Nacional es una fuente de
                            <b className={classes.links}> inteligencia para construir integridad y combatir la corrupción,</b> que creará
                            valor para el gobierno y la sociedad, a partir de grandes cantidades de datos.
                        </Typography>
                        <br/>
                        <Typography variant="subheading">
                            La Plataforma es un <b className={classes.links}>medio para el intercambio de datos anticorrupción</b> del Gobierno,
                            que busca quitar barreras y romper silos de información para que los datos sean comparables, accesibles y utilizables,
                            empezando con <b className={classes.links}>seis sistemas de datos prioritarios</b>.
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }
}


export default withStyles(styles)(QueEs);