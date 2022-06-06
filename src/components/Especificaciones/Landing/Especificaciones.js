import React from 'react';
import {Grid, Box, Paper} from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import {Link} from 'react-router-dom';
import Typography from "@mui/material/Typography";
import S1 from '@assets/rediseno/sistemas_sin_fondo/btn-s1.svg';
import S2 from '@assets/rediseno/sistemas_sin_fondo/btn-s2.svg';
import S3 from '@assets/rediseno/sistemas_sin_fondo/btn-s3.svg';
import S6 from '@assets/rediseno/sistemas_sin_fondo/btn-s6.svg';
import bgimg from "@assets/rediseno/fondo_cruces_dark.png";
import HeaderV2 from "../../HomeV2/HeaderV2";
import pdnRoutes from "../../../routes";

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.primario.main,
        backgroundImage: `url(${bgimg})`,
        backgroundRepeat: "repeat",
        backgroundPosition: 'fixed',
        color: '#f2f2f2'
    },
    rootItem: {
        maxWidth: 1200,
        paddingTop: 90,
        paddingBottom: 90,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)

    },
    sistemas: {
        maxWidth: 200,
        "&:hover": {
            opacity: .5
        }
    },
    link: {
        textDecoration: "none"
    },
    text: {
        color: theme.palette.greyColor,
        //paddingBottom: 60
    },
    paper: {
        backgroundColor: theme.palette.background.opaque,
        padding: theme.spacing(2),
        color: theme.palette.primario.contrastText,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.secundario.main,
        borderRadius: '10px 10px 10px 10px',
        display: 'flex',
        justifyContent: "center"
    },
    box: {
        maxWidth: '900px', paddingTop: '50px', paddingBottom: '50px'
    }
});

const Especificaciones = props => {
    const {classes} = props;
    const section = pdnRoutes.find(route => route.path === '/especificaciones');

    return (
        <div className={classes.root}>
            <HeaderV2 section={section}/>
            <Grid container spacing={0} justifyContent="center">
                <Grid item xs={12} className={classes.rootItem}>
                    <Paper className={classes.paper} elevation={15}>
                        <Box className={classes.box}>
                            <Typography paragraph>
                                Las  especificaciones son los campos mínimos de datos que debe contener cada sistema, así como los estándares que debe de seguir cada campo para ser interoperable con la PDN. Esto es lo que permite que los sistemas de las instituciones responsables de generar los datos estén ordenados y puedan ser consultados en la PDN.
                            </Typography>

                            <Typography paragraph>
                                Además, en esta sección podrás consultar información sobre  el Open API Specification (OAS), un formato que permite describir de manera precisa las características con las que deberán contar las APIs que integrarán a la PDN.
                            </Typography>

                            <Typography paragraph>
                                Conoce las especificaciones para los Sistemas 1, 2, 3 y 6
                            </Typography>

                            <Grid container spacing={0} justifyContent='center'>
                                <Grid item xs={12} className={classes.rootItem}>
                                    <Grid container spacing={0} justifyContent='center'>
                                        <Grid item xs={12} md={6} lg={3} xl={3} align="center" >
                                            <Link to="/especificaciones/s1" className={classes.link}>
                                                <img src={S1} alt="" className={classes.sistemas}/>
                                            </Link>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={3} xl={3}  align="center" >
                                            <Link to="/especificaciones/s2" className={classes.link}>
                                                <img src={S2} alt="" className={classes.sistemas}/>
                                            </Link>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={3} xl={3} align="center" >
                                            <Link to="/especificaciones/s3" className={classes.link}>
                                                <img src={S3} alt="" className={classes.sistemas}/>
                                            </Link>
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={3} xl={3} align="center" >
                                            <Link to="/especificaciones/s6" className={classes.link}>
                                                <img src={S6} alt="" className={classes.sistemas}/>
                                            </Link>
                                        </Grid>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>

            </Grid>

        </div>
    );
}

export default withStyles(styles)(Especificaciones);
