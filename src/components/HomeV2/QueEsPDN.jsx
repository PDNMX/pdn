import React from "react";
import withStyles from '@mui/styles/withStyles';
import {Button, Paper, Typography, Grid} from "@mui/material";
import {Link} from "react-router-dom";
import BuscadorModal from "./Buscador/BotonPrincipal";

import bgPDN from '../../assets/rediseno2023/imgs/fondos/fondo-mapa.svg';
import lgoSNA from "../../assets/rediseno2023/imgs/iconos/logotipos/logo-sna.svg";
import lgoSESNA from "../../assets/rediseno2023/imgs/iconos/logotipos/logo-sesna.svg";
const styles = theme => ({
    container: {
        background: `url(${bgPDN}) 10% -10px no-repeat rgb(255, 255, 255)`,
        padding: "5% 10%"        
    },
    bg: {
        
    },
    headingText: {

        
    },
    subTitle:{

    },

    btnPDN:{

    },
    link:{

    }
});

const QueEsPDN = props => {
    const {classes} = props;
 

    return (
        <React.Fragment>
        <div className="home">        
            <Grid container spacing={0} alignItems="flex-start" justifyContent='center' className={classes.container}>
                <Grid item md={6} sm={12} xs={12} align="left" >
                       <h1>Plataforma
                        <br />
                        Digital Nacional</h1> 
                        <h2>Inteligencia <span>Anticorrupción</span></h2>
                        <div>
                        <img src={lgoSNA} alt="Sistema Nacional Anticorrupción"/>
                        <img src={lgoSESNA} alt="Secretaría Ejecutiva del Sistema Nacional Anticorrupción"/>
                        </div>
                    <BuscadorModal />
                </Grid>
                <Grid item md={6} sm={12} xs={12} align="left" >
                    <Typography >
                    La <b>Plataforma Digital Nacional (PDN)</b> del Sistema Nacional Anticorrupción (SNA) es un <b>instrumento de inteligencia</b> que tiene como objetivo eliminar las barreras de información para que los datos públicos sean comparables, accesibles y utilizables a efecto de combatir cualquier acto de corrupción.<br/><br/>
                    <b>La Secretaría Ejecutiva del Sistema Nacional Anticorrupción (SESNA)</b>, organismo descentralizado no sectorizado, es responsable de administrar la <b>PDN</b>.<br/><br/>
                    La PDN no es generadora ni un repositorio de datos, sino una plataforma de <b>interoperabilidad</b> que consulta información de diversas fuentes.<br/><br/>
                    </Typography>

                    <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end">
                        <Grid item md={12} sm={12} xs={12} align="right">
                            <Link className={classes.link} to="/about">
                                <Button arget="_blank" style={{ color: 'white' }} >Conoce más</Button>
                            </Link>
                        </Grid>
                    </Grid>
                
                </Grid>
            </Grid>
        </div>    
        </React.Fragment>
    );
}
export default withStyles(styles)(QueEsPDN);
