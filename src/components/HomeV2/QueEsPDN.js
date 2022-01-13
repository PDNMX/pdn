

import React from "react";
import withStyles from '@mui/styles/withStyles';
import {Box, Typography, Grid} from "@mui/material";


const styles = theme => ({

    container: {
        paddingTop: 100,
        paddingBottom: 90,
        backgroundColor: '#263d49',
        
    },
    headingText: {
        color: "#d0d7d9",
        fontWeight: "700",
        fontSize: '48px',
        [theme.breakpoints.down('md')]:{
            fontSize: '40px',
        },
    },
    text:{
        fontSize: '18px',
        fontWeight: 500,
        color: "#d0d7d9",
        paddingBottom: theme.spacing(3)
    },
});

const QueEsPDN = props => {
    const {classes} = props;
 

    return (
        <React.Fragment>
            <Grid container spacing={0} justifyContent='center' className={classes.container}>
                <Grid item xs={6} align="left">
                    <Typography className={classes.headingText} paragraph>
                        Plataforma Digital Nacional
                    </Typography>
                    
                    <Typography className={classes.text} paragraph>
                        Una fuente de inteligencia para construir integridad y combatir la corrupción, que crea valor para el gobierno y la sociedad, a partir de grandes cantidades de datos.
                    </Typography>
                </Grid>
                <Grid item xs={6} align="left" >
                    
                    <Typography className={classes.text} paragraph>
                    La <b>Plataforma Digital Nacional (PDN)</b> del Sistema Nacional Anticorrupción (SNA) es un <b>instrumento de inteligencia</b> que tiene como objetivo eliminar las barreras de información para que los datos públicos sean comparables, accesibles y utilizables a efecto de combatir culaquier acto de corrupción.
                    </Typography>
                    <Typography className={classes.text} paragraph>
                    <b>La Secretaría Ejecutiva del Sistema Nacional Anticorrupción (SESNA)</b>, organismo descentralizado no sectorizado, es responsable de administrar la <b>Plataforma Digital Nacional</b>.
                    </Typography>
                    <Typography className={classes.text} paragraph>
                    La PDN no es un repositorio ni generadora de los datos de cada sistema, sino que es una plataforma de <b>interoperabilidad</b>.
                    </Typography>
                </Grid>
                
            </Grid>
        </React.Fragment>
    );
}
export default withStyles(styles)(QueEsPDN);
