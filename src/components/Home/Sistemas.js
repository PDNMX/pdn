import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import s1 from '../../assets/iconos_azul/1_icono.svg';
import s2 from '../../assets/iconos_azul/2_icono.svg';
import s3 from '../../assets/iconos_azul/3_icono.svg';
import s4 from '../../assets/iconos_azul/4_icono.svg';
import s5 from '../../assets/iconos_azul/5_icono.svg';
import s6 from '../../assets/iconos_azul/6_icono.svg';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    icons: {
        maxWidth: 200
    }
});

class Sistemas extends React.Component{
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24} justify='center'>
                    <Grid item xs={4} align="center">
                        <img src={s1} alt="Sistema 1" className={classes.icons}/>
                        <br/>
                        Declaraciones
                    </Grid>
                    <Grid item xs={4} align="center">
                        <img src={s2} alt="Sistema 2" className={classes.icons}/>
                        <br/>
                        Servidores públicos en contrataciones públicas
                    </Grid>
                    <Grid item xs={4} align="center">
                        <img src={s3} alt="Sistema 3" className={classes.icons}/>
                        <br/>
                        Sancionados
                    </Grid>
                    <Grid item xs={4} align="center">
                        <img src={s4} alt="Sistema 4" className={classes.icons}/>
                        <br/>
                        Fiscalización
                    </Grid>
                    <Grid item xs={4} align="center">
                        <img src={s5} alt="Sistema 5" className={classes.icons}/>
                        <br/>
                        Denuncias
                    </Grid>
                    <Grid item xs={4} align="center">
                        <img src={s6} alt="Sistema 6" className={classes.icons}/>
                        <br/>
                        Contrataciones
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Sistemas);