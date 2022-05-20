import React from 'react';
import {Typography, Grid, Paper, Box} from "@mui/material";
import {withStyles} from "@mui/styles";
import bgimg from "../../assets/rediseno/fondo_cruces_dark.png";
import HeaderV2 from '../HomeV2/HeaderV2';
import pdnRoutes from "../../routes";
import erizoConstructor from "../../assets/rediseno/ico-espin-construction.svg";

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundImage: `url(${bgimg})`,
        backgroundRepeat: "repeat",
        backgroundPosition: 'fixed',
        color: '#f2f2f2'
    },
    item: {
        maxWidth: 1200,
        padding: theme.spacing(1),
        paddingTop: 90,
        paddingBottom: 90,
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
    },
    erizo: {
        margin: theme.spacing(6),
        width: "200px"
    }
});

const CustomTypography = withStyles({
    root: {
        color: "#d0d7d9",
        backgroundAttachment: "fixed"
    }
})(Typography);

const index = props => {
    const {classes} = props;
    const system = pdnRoutes.find(route => route.path === '/denuncias');

    return <div className={classes.root}>
        <HeaderV2 section={system}/>
        <Grid container justifyContent="center">
            <Grid item xs={12} className={classes.item}>
                <Paper elevation={15} className={classes.paper}>
                    <Box className={classes.box}>
                            <Box display="flex" flexWrap="wrap" justifyContent={"center"} alignItems="center">
                                <Box>
                                    <img alt="enConstruccion" src={erizoConstructor} className={classes.erizo}/>
                                </Box>
                                <Box sx={
                                    {
                                        maxWidth: "600px"
                                    }
                                }>
                                    <CustomTypography variant="h4" paragraph>
                                        Sistema en construcción
                                    </CustomTypography>

                                    <CustomTypography paragraph>
                                        Estamos trabajando en el desarrollo del Sistema de denuncias públicas de faltas
                                        administrativas y hechos de corrupción (S5).
                                    </CustomTypography>

                                    <CustomTypography paragraph>
                                        Este sistema permitirá establecer un canal único para la denuncia de faltas
                                        administrativas y hechos de corrupción y simplificará su presentación, trámite y
                                        seguimiento generando información relevante para el Sistema Nacional
                                        Anticorrupción.
                                    </CustomTypography>
                                </Box>
                            </Box>
                        </Box>
                </Paper>
            </Grid>
        </Grid>
    </div>
}

export default withStyles(styles)(index);