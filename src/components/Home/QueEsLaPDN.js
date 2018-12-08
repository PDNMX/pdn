import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Star from '../../assets/grafica.png';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        flexGrow:1
    },
    container: {
        paddingTop: 100,
        paddingBottom: 150
    },
    star: {
        maxWidth: 300
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        background: '#ffe01b',//'#fecb6e'
    },
    text: {
        color : theme.palette.titleBanner.color
    }
});
class QueEsLaPDN extends React.Component{

    render(){
        const { classes } = this.props;

        return(
            <div className={classes.root}>
                <Grid container spacing={24} justify='center' className={classes.container}>
                    <Grid item xs={12} style={{paddingBottom: 60}}>
                        <Typography variant="h4" className={classes.text}>
                            ¿Qué es la Plataforma Digital Nacional?
                        </Typography>
                    </Grid>


                    <Grid item md={4} xs={12} align="center">
                        <img src={Star} alt="PDN" className={classes.star}/>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <Typography variant="h5" className={classes.text}>
                            La <b>Plataforma Digital Nacional</b> es una fuente de inteligencia para construir integridad y combatir la corrupción, que creará valor para el gobierno y la sociedad, a partir de grandes cantidades de datos.
                        </Typography>
                        <br/>
                        <Typography variant="h5" className={classes.text}>
                            La Plataforma es un <b>medio para el intercambio de datos anticorrupción</b> del Gobierno, que busca quitar barreras y romper silos de información para que los datos sean comparables, accesibles y utilizables, empezando con <b>seis sistemas de datos prioritarios</b>.
                        </Typography>

                        <br/>
                        <Button variant="contained" className={classes.button} href="https://www.plataformadigitalnacional.org/">Más información sobre la PDN</Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(QueEsLaPDN);