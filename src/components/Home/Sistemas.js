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
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    container: {
      paddingTop: 110,
      paddingBottom: 100
    },
    link: {
        textDecoration: "none"
    },
    disabled: {
        opacity: 0.3,
        maxWidth: 200
    },
    text: {
        color: theme.palette.titleBanner.color,
        paddingBottom: 60
    },
    iconosSistemas: {
        maxWidth: 200,
        '&:hover':{
            opacity: 0.5,
            cursor: "pointer"
        }
    },
    textExplora: {
        color: theme.palette.titleBanner.color,
        fontWeight: 500,
        fontSize: '48px',
        paddingBottom: theme.spacing(6)
    }

});

class Sistemas extends React.Component{


    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={0} justify='center' className={classes.container}>

                    <Grid item xs={12} align="center">
                        <Typography className={classes.textExplora} paragraph>
                            Explora los 6 sistemas
                        </Typography>
                    </Grid>

                    <Grid item xl={4} lg={4} md={6} xs={12} align="center">
                        <Tooltip title="Declaración patrimonial y de intereses" placement="top">
                            <Link to="/declaraciones" className={ classes.link }>
                                <img src={s1} alt="Sistema 1" className={classes.iconosSistemas}/>
                                <br/>
                                <Typography variant="h5" className={classes.text}>
                                    Declaraciones
                                </Typography>
                            </Link>
                        </Tooltip>
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} xs={12} align="center">
                        <Tooltip title="Servidores públicos que intervienen en contrataciones públicas" placement="top">
                            <Link to="/servidores" className={ classes.link }>
                                <img src={s2} alt="Sistema 2" className={classes.iconosSistemas}/>
                                <br/>
                                <Typography variant="h5" className={classes.text}>
                                    Servidores públicos en contrataciones públicas
                                </Typography>
                            </Link>
                        </Tooltip>
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} xs={12} align="center">
                        <Tooltip title="Servidores públicos y particulares sancionados" placement="top">
                            <Link to="/sancionados" className ={ classes.link }>
                                <img src={s3} alt="Sistema 3" className={classes.iconosSistemas}/>
                                <br/>
                                <Typography variant="h5" className={classes.text}>
                                    Sancionados
                                </Typography>
                            </Link>
                        </Tooltip>
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} xs={12} align="center">
                        {/*<Link to="/pdn/home" className={classes.link }>*/}
                        <img src={s4} alt="Sistema 4" className={classes.disabled}/>
                        <br/>
                        <Typography variant="h5" className={classes.text }>
                            Fiscalización
                        </Typography>
                        {/*</Link>*/}
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} xs={12} align="center">
                        {/*<Link to="/pdn/home" className={classes.link }>*/}
                        <img src={s5} alt="Sistema 5" className={classes.disabled}/>
                        <br/>
                        <Typography variant="h5" className={classes.text}>Denuncias</Typography>
                        {/*</Link>*/}
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} xs={12} align="center">
                        <Tooltip title="Contrataciones públicas" placement="top">
                            <Link to="/contrataciones" className={classes.link}>
                                <img src={s6} alt="Sistema 6" className={classes.iconosSistemas}/>
                                <br/>
                                <Typography variant="h5" className={classes.text}>Contrataciones</Typography>
                            </Link>
                        </Tooltip>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Sistemas);