import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import Plat from "../../../assets/iconos_barra/ico-plataformas_sistemas.svg";

const styles = theme => ({
    root: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10),
    },
    headingText: {
        color: theme.palette.titleBanner.color,
        fontWeight: "700",
        fontSize: '48px',
        [theme.breakpoints.down('md')]:{
            fontSize: '40px',
        },
        textAlign: "center"
    },
    titleBox: {
        display: "flex",
        justifyContent: "center",
        paddingBottom: theme.spacing(2)
    },
    logoBox: {
        display: "flex",
        justifyContent: "center",
    },
    icon: {
        width: '90%',
        [theme.breakpoints.down('lg')]:{
            maxWidth: 350
        }
    },
    button:{
        background: '#ffe01b',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2)
    },
    item: {
        padding: theme.spacing(1)
    }
});

const Avance = props => {
    const {classes} = props;
    return <div className={classes.root}>
        <Box className={classes.titleBox}>
            <Typography className={classes.headingText}>
                Avance de interconexión
            </Typography>
        </Box>

        <Grid container spacing={0} className={classes.item}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <Box className={classes.logoBox}>
                    <img src={Plat} alt="Interconexión subnacional" className={classes.icon}/>
                </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} className={classes.item}>

                <Typography variant="h6">
                    Legislación
                </Typography>

                <Typography color="textPrimary">
                    Localiza una entidad federativa en el mapa e identifica qué tan similar es la normatividad de la Plataforma Digital Estatal o Sistema de información con la normatividad de la Plataforma Digital Nacional.
                </Typography>

                <Button variant="contained"
                        className={classes.button}
                        href="https://www.plataformadigitalnacional.org/mapa-sla/"
                >
                    Conoce más
                </Button>

                <Typography variant="h6">
                    Sistemas 2 y 3
                </Typography>

                <Typography color="textPrimary">
                    Identifica una entidad en el tablero y consulta los avances de las Secretarías Estatales Anticorrupción en el desarrollo y conexión de los sistemas de: Servidores Públicos que Intervienen en Procedimientos de Contratación (S2); y Servidores Públicos y Particulares Sancionados (S3), con la a Plataforma Digital Nacional.
                </Typography>

                <Button variant="contained"
                        className={classes.button}
                        href="https://www.plataformadigitalnacional.org/mapa-avance/"
                >
                    Conoce más
                </Button>

            </Grid>
        </Grid>
    </div>
}

export default withStyles(styles)(Avance);
