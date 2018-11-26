import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import s1 from '../../assets/iconos_azul/1_icono.svg';
import s2 from '../../assets/iconos_azul/2_icono.svg';
import s3 from '../../assets/iconos_azul/3_icono.svg';
import s4 from '../../assets/iconos_azul/4_icono.svg';
import s5 from '../../assets/iconos_azul/5_icono.svg';
import s6 from '../../assets/iconos_azul/6_icono.svg';
import {Link} from 'react-router-dom';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    container: {
      paddingTop: 100,
      paddingBottom: 100
    },
    icons: {
        maxWidth: 200
    },
    link: {
        textDecoration: "none",
        color: '#000'

    }
});

class Sistemas extends React.Component{
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24} justify='center' className={classes.container}>
                    <Grid item xs={4} align="center">
                        <Link to="/home" className={ classes.link }>
                            <img src={s1} alt="Sistema 1" className={classes.icons}/>
                            <br/>
                            Declaraciones
                        </Link>
                    </Grid>
                    <Grid item xs={4} align="center">
                        <Link to="/servidores" className={ classes.link }>
                            <img src={s2} alt="Sistema 2" className={classes.icons}/>
                            <br/>
                            Servidores públicos en contrataciones públicas
                        </Link>
                    </Grid>
                    <Grid item xs={4} align="center">
                        <Link to="/sancionados" className ={ classes.link }>
                            <img src={s3} alt="Sistema 3" className={classes.icons}/>
                            <br/>
                            Sancionados
                        </Link>
                    </Grid>
                    <Grid item xs={4} align="center">
                        <Link to="/home" className={classes.link }>
                            <img src={s4} alt="Sistema 4" className={classes.icons}/>
                            <br/>
                            Fiscalización
                        </Link>
                    </Grid>
                    <Grid item xs={4} align="center">
                        <Link to="/home" className={classes.link }>
                            <img src={s5} alt="Sistema 5" className={classes.icons}/>
                            <br/>
                            Denuncias
                        </Link>
                    </Grid>
                    <Grid item xs={4} align="center">
                        <Link to="/home" className={classes.link}>
                            <img src={s6} alt="Sistema 6" className={classes.icons}/>
                            <br/>
                            Contrataciones
                        </Link>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Sistemas);