import React from "react";
import withStyles from '@mui/styles/withStyles';
import {Button, Paper, Typography, Grid} from "@mui/material";
import {Link} from "react-router-dom";
import BuscadorModal from "./Buscador/BotonPrincipal";

import bgPDN from '../../assets/bg.jpg';

const styles = theme => ({
    container: {
        padding: "5% 10%",
        backgroundColor: 'rgba(29, 80, 109, 0.9)',
    },
    bg: {
        backgroundImage: `url(${bgPDN})`,
        backgroundSize: "cover",
        backgroundPosition: 'center'
    },
    headingText: {
        color: "#E1E8EB",
        fontWeight: "700",
        fontSize: '52px',
        [theme.breakpoints.down('md')]:{
            fontSize: '40px',
        },
        
    },
    subTitle:{
        fontSize: '30px',
        fontWeight: 500,
        textTransform :'uppercase',
        color: "#E1E8EB",
        "& b": {
            color: "#3bb1e6",
        }
    },
    text:{
        fontSize: '18px',
        fontWeight: 100,
        color: "#d0d7d9",
        "& b": {
            fontWeight: 500,
        }
    },
    btnPDN:{
        margin: theme.spacing(1),
        background: "rgb(255,255,255,0.5)",
        borderRadius: "50px",
        fontWeight: "bold",
        fontStyle: "italic",
        '&:hover': {
            backgroundColor: "#56a3bf",
        },
    },
    link:{
        textDecoration:'none',
        '&:hover': {
            textDecoration:'none',
        },
    }
});

const QueEsPDN = props => {
    const {classes} = props;
 

    return (
        <React.Fragment>
            <Paper className={classes.bg}>
            <Grid container spacing={0} alignItems="flex-start" justifyContent='center' className={classes.container}>
                <Grid item md={6} sm={12} xs={12} align="left">
                    <Typography className={classes.headingText} paragraph>
                        Plataforma
                    <br />
                        Digital Nacional
                    </Typography>
                    
                    <Typography className={classes.subTitle} paragraph>
                        Inteligencia <b>Anticorrupción</b>
                    </Typography>
                    <BuscadorModal />
                </Grid>
                <Grid item md={6} sm={12} xs={12} align="left" >
                    <Typography className={classes.text} paragraph>
                    La <b>Plataforma Digital Nacional (PDN)</b> del Sistema Nacional Anticorrupción (SNA) es un <b>instrumento de inteligencia</b> que tiene como objetivo eliminar las barreras de información para que los datos públicos sean comparables, accesibles y utilizables a efecto de combatir cualquier acto de corrupción.<br/><br/>
                    <b>La Secretaría Ejecutiva del Sistema Nacional Anticorrupción (SESNA)</b>, organismo descentralizado no sectorizado, es responsable de administrar la <b>PDN</b>.<br/><br/>
                    La PDN no es generadora ni un repositorio de datos, sino una plataforma de <b>interoperabilidad</b> que consulta información de diversas fuentes.<br/><br/>
                    </Typography>

                    <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end">
                        <Grid item md={12} sm={12} xs={12} align="right">
                            <Link className={classes.link} to="/about">
                                <Button variant="contained" className={classes.btnPDN}>Conoce más</Button>
                            </Link>
                        </Grid>
                    </Grid>
                
                </Grid>
            </Grid>
            </Paper>
        </React.Fragment>
    );
}
export default withStyles(styles)(QueEsPDN);
