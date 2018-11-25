import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Star from '../../assets/iconos_azul/6_icono.svg';
const styles = theme => ({
    root: { flexGrow:1},
    star: {
        maxWidth: 300
    }
});
class QueEsLaPDN extends React.Component{

    render(){
        const { classes } = this.props;

        return(
            <div className={classes.root}>
                <Grid container spacing={24} justify='center'>
                    <Grid item xs={12}>
                        <Typography variant="headline">
                            ¿Qué es la Plataforma Digital Nacional?
                        </Typography>
                    </Grid>

                    <Grid item xs={4}>
                        <img src={Star} alt="PDN" className={classes.star}/>

                    </Grid>
                    <Grid item xs={8}>
                        <Typography>
                            La Plataforma Digital Nacional es una fuente de inteligencia para construir integridad y combatir la corrupción, que creará valor para el gobierno y la sociedad, a partir de grandes cantidades de datos.
                        </Typography>
                        <Typography>
                            La Plataforma es un medio para el intercambio de datos anticorrupción del Gobierno, que busca quitar barreras y romper silos de información para que los datos sean comparables, accesibles y utilizables, empezando con seis sistemas de datos prioritarios.
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(QueEsLaPDN);