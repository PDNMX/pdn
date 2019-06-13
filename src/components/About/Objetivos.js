import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Typography} from "@material-ui/core"
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    bullet: {
        backgroundColor: '#89d4f2',
        height: '10px',
        width: '10px',
        borderRadius: '50%',
        display: 'inline-block',
        marginLeft: '-20px',
        //marginTop: '-10px'
    },
    ul: {
        listStyle: 'none',
        //marginLeft: 0,
        paddingLeft: '20px'
    },
    li: {
      paddingBottom: theme.spacing(2)
    },
    links: {
        color: '#606060'
    },
    b: {
      color: '#606060'
    }
});

class Objetivos extends React.Component{

    render(){
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Typography variant="h3" className={classes.links}>
                            Objetivos
                        </Typography>
                        <br/>
                        <br/>
                        <Typography variant="subtitle1">
                            Usar <b className={classes.links}>nuevas tecnologías</b>, <b className={classes.links}>metodologías de trabajo</b>, <b className={classes.links}>ciencia de datos</b> e <b className={classes.links}>inteligencia artificial</b> como insumos y
                            apoyo al trabajo de las autoridades del <b className={classes.b}>Sistema Nacional Anticorrupción</b> para:
                        </Typography>
                        <br/>
                        <Grid item xs={12} style={{background: '#f2f2f2', padding: '15px 25px'}}>
                        <ul className={classes.ul}>
                            <li className={classes.li}>
                                <Typography variant="subtitle1"><span className={classes.bullet}/> <b className={classes.b}>Analizar, predecir y alertar</b> a las autoridades sobre posibles riesgos de corrupción</Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography variant="subtitle1"><span className={classes.bullet}/> <b className={classes.b}>Automatizar procesos, evitar discrecionalidad, colusión y conflicto de interés</b></Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography variant="subtitle1"><span className={classes.bullet}/> <b className={classes.b}>Promover el uso de los datos</b> para respaldar sanciones y como evidencia para combatir la impunidad</Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography variant="subtitle1"><span className={classes.bullet}/> <b className={classes.b}>Dar seguimiento, en tiempo real</b>, a los procesos y proyectos de contratación pública, asegurar el cumplimiento de sus objetivos
                                    y garantizar una mayor eficiencia en las compras públicas
                                </Typography>
                            </li>
                            <li className={classes.li}>
                                <Typography variant="subtitle1"><span className={classes.bullet}/> <b className={classes.b}>Apoyar la participación ciudadana</b>, poniendo al ciudadano al centro del combate a la corrupción
                                </Typography>
                            </li>

                            <li className={classes.li}>
                                <Typography variant="subtitle1"> <span className={classes.bullet}/> <b className={classes.b}> Incorporar información sobre indicadores</b> para evaluar la Política Nacional Anticorrupción y el fenómeno en México</Typography>

                            </li>
                            <li className={classes.li}>
                                <Typography variant="subtitle1">
                                    <span className={classes.bullet}/> <b className={classes.b}> Dar evidencia para generar recomendaciones de politica pública</b> a las autoridades del Sistema Nacional Anticorrupción
                                </Typography>
                            </li>
                        </ul>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    };
}

export default withStyles(styles)(Objetivos);
