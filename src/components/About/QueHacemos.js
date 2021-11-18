import React from 'react';
import {Typography} from "@mui/material"
import {withStyles} from '@mui/styles';
import PropTypes from 'prop-types';
import Bd from '../assets/grafico-BD.svg';
import Ejes from '../assets/grafico-ejes.svg';
import Grid from '@mui/material/Grid';

const styles = theme => ({
    bd: {
        maxWidth: "200px"
    },
    ejes: {
        maxWidth: "400px"
    },
    itemCentered:{
        textAlign: 'center'
    },
    links: {
        color: '#96cb99'
    },
    whiteText: {
        color: '#e6e6e6'
    },
    bullet: {
        backgroundColor: '#96cb99',
        height: '12px',
        width: '12px',
        borderRadius: '50%',
        display: 'inline-block',
        marginLeft: '-20px',
        //marginTop: '-10px'
    },
    ul: {
        listStyle: 'none',
        //marginLeft: 0,
        paddingLeft: '15px'
    },
    li: {
        paddingBottom: theme.spacing(2)
    }
});

class QueHacemos extends React.Component{
    render (){
        const { classes } = this.props;
        return (
            <div>


                <Typography variant="h6" className={classes.links}>
                    Conoce lo que estamos haciendo para construir la plataforma
                </Typography>

                <br/>

                <Grid container spacing={0}>
                    <Grid item xs={6} className={classes.itemCentered}>
                        <img src={Bd} alt="PDN" className={classes.bd}/>
                    </Grid>



                    <Grid item xs={6}>
                        <Typography className={classes.whiteText}>
                            La PDN permitirá que las base de datos de los sistemas <b className={classes.links}>estén estandarizadas y sean interoperables.</b>
                        </Typography>
                            <br/>
                        <Typography className={classes.whiteText}>
                            El objetivo es contar con <b className={classes.links}>datos de calidad</b>, para apoyar esfuerzos existentes y detonar nuevos mecanismos
                            inteligentes, eficientes y eficaces para combatir la corrupción, de manera <b className={classes.links}>multidisciplinaria, colaborativa y multisectorial.</b>
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography  className={classes.whiteText}>
                            Trabajamos en <b className={classes.links}>cinco ejes</b> clave para desarrollar y fomentar el uso de la Plataforma
                        </Typography>

                        <br/>
                        <ul className={classes.ul}>
                            <li className={classes.li}><Typography className={classes.whiteText}> <span className={classes.bullet}/> Diseño centrado en las usuarias-os y sus necesidades</Typography></li>
                            <li className={classes.li}><Typography className={classes.whiteText}> <span className={classes.bullet}/> Construcción gradual, modular, escalable, ágil y flexible</Typography></li>
                            <li className={classes.li}><Typography className={classes.whiteText}> <span className={classes.bullet}/> Datos interoperables y abiertos</Typography></li>
                            <li className={classes.li}><Typography className={classes.whiteText}> <span className={classes.bullet}/> Seguridad de la información y protección de datos personales</Typography></li>
                            <li className={classes.li}><Typography className={classes.whiteText}> <span className={classes.bullet}/> Creación de impacto y entrega de valor público en el centro</Typography></li>
                        </ul>
                    </Grid>

                    <Grid item xs={6} className={classes.itemCentered}>
                        <img src = {Ejes} alt="Ejes" className={classes.ejes}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

QueHacemos.propTypes = {
    classes : PropTypes.object.isRequired
};

export default withStyles(styles) (QueHacemos);
