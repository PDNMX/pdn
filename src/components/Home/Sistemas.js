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
import Typography from "@material-ui/core/Typography";

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
        color: '#000',
    }
});

class Sistemas extends React.Component{
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24} justify='center' className={classes.container}>
                    <Grid item xl={4} lg={4} md={6} xs={12} align="center">
                        <Link to="/home" className={ classes.link }>
                            <img src={s1} alt="Sistema 1" className={classes.icons}/>
                            <br/>
                            <Typography variant="headline">
                                Declaraciones
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} xs={12} align="center">
                        <Link to="/servidores" className={ classes.link }>
                            <img src={s2} alt="Sistema 2" className={classes.icons}/>
                            <br/>
                            <Typography variant="headline">
                                Servidores públicos en contrataciones públicas
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} xs={12} align="center">
                        <Link to="/sancionados" className ={ classes.link }>
                            <img src={s3} alt="Sistema 3" className={classes.icons}/>
                            <br/>
                            <Typography variant="headline">
                                Sancionados
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} xs={12} align="center">
                        <Link to="/home" className={classes.link }>
                            <img src={s4} alt="Sistema 4" className={classes.icons}/>
                            <br/>
                            <Typography variant="headline">
                                Fiscalización
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} xs={12} align="center">
                        <Link to="/home" className={classes.link }>
                            <img src={s5} alt="Sistema 5" className={classes.icons}/>
                            <br/>
                            <Typography variant="headline">Denuncias</Typography>
                        </Link>
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} xs={12} align="center">
                        <Link to="/home" className={classes.link}>
                            <img src={s6} alt="Sistema 6" className={classes.icons}/>
                            <br/>
                            <Typography variant="headline">Contrataciones</Typography>
                        </Link>

                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Sistemas);