import React from "react";
import withStyles from '@mui/styles/withStyles';
import {Button, Paper, Typography, Grid} from "@mui/material";


import bgPDN from '../../assets/bg.jpg';

const styles = theme => ({
    container: {
        padding: "5% 10%",
        backgroundColor: 'rgba(29, 80, 109, 0.95)',
        
    },
    bg: {
        backgroundImage: `url(${bgPDN})`,
        backgroundSize: "cover",
        backgroundPosition: 'center'
    },
    headingText: {
        color: "#ced8db",
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
        color: "#ced8db",
        "& b": {
            color: "#3bb1e6",
        }
    },
    text:{
        fontSize: '18px',
        fontWeight: 500,
        color: "#ced8db",
    },
    btnPDN:{
        color: "#5b747f",
        borderRadius: '50px',
        padding: '5px 10px',
        backgroundColor: "#ced8db",
        '&:hover': {
            backgroundColor: "#eeeeee",
        },
    }
});

const QueEsPDN = props => {
    const {classes} = props;
 

    return (
        <React.Fragment>
            <Paper className={classes.bg}>
            <Grid container spacing={0} alignItems="center" justifyContent='center' className={classes.container}>
                <Grid item md={6} sm={12} xs={12} align="left">
                    <Typography className={classes.headingText} paragraph>
                        Plataforma
                    <br />
                        Digital Nacional
                    </Typography>
                    
                    <Typography className={classes.subTitle} paragraph>
                        Inteligencia <b>Anticorrupción</b>
                    </Typography>
                </Grid>
                <Grid item md={6} sm={12} xs={12} align="left" >
                    <Typography className={classes.text} paragraph>
                    La <b>Plataforma Digital Nacional (PDN)</b> del Sistema Nacional Anticorrupción (SNA) es un <b>instrumento de inteligencia</b> que tiene como objetivo eliminar las barreras de información para que los datos públicos sean comparables, accesibles y utilizables a efecto de combatir cualquier acto de corrupción.
                    <br/><br/>
                    <b>La Secretaría Ejecutiva del Sistema Nacional Anticorrupción (SESNA)</b>, organismo descentralizado no sectorizado, es responsable de administrar la <b>Plataforma Digital Nacional</b>.
                    <br/><br/>
                    La PDN no es un repositorio ni generadora de los datos de cada sistema, sino que es una plataforma de <b>interoperabilidad</b>.
                    </Typography>

                    <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end">
                        <Grid item md={12} sm={12} xs={12} align="right">
                            <Button size="small" className={classes.btnPDN}>Conoce más</Button>
                        </Grid>
                    </Grid>
                
                </Grid>
            </Grid>
            </Paper>
        </React.Fragment>
    );
}
export default withStyles(styles)(QueEsPDN);
