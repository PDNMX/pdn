import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Typography} from "@material-ui/core"
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
    root: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    box : {
        padding: theme.spacing(2),
        marginTop: '20px',
        borderRadius: 0,
        borderColor: '#96cb99',
        borderStyle: 'solid',
        background: '#ffffff'
    },
    bullet: {
        backgroundColor: '#96cb99',
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
        paddingLeft: '15px'
    },
    li: {
        paddingBottom: theme.spacing(1) //*2
    },
    links: {
        color: '#5fb1e6'
    }
});

class Uso extends React.Component{
    render(){

        const {classes} = this.props;

        return(
            <div className={classes.root}>
                <Typography variant="h3" style={{ marginBottom:'50px'}}>Impacto de los <b>datos</b> para <b>combatir la corrupción</b></Typography>

                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={6} style={{ marginBottom:'20px', padding:'15px'}}>
                        <Typography variant="subtitle1"> <a href="https://www.fuistetu.org/" className={classes.links}>Fuiste Tú</a> usa datos de auditorías para fomentar la trazabilidad en el uso de recursos públicos.</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ marginBottom:'20px', padding:'15px'}}>
                      <Typography variant="subtitle1"> <a href="https://imco.org.mx/articulo_es/indice-riesgos-corrupcion-sistema-mexicano-contrataciones-publicas/" className={classes.links}>Imco y OPI</a> utilizaron datos de contrataciones para identificar riesgos e impulsar una cultura de prevención en contrataciones.</Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={6} style={{ padding:'15px'}}>
                      <Typography variant="subtitle1"><a href="https://1560000.org/explora" className={classes.links}>Data Cívica</a> utilizó datos abiertos para reconstruir las declaraciones patrimoniales de servidores públicos del gobierno.</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ padding:'15px'}}>
                      <Typography variant="subtitle1"><a href="https://www.animalpolitico.com/estafa-maestra/#datos" className={classes.links}>Animal Político</a> utilizó datos de auditorías y licitaciones para detectar desvíos de recursos, algo que ha sido utilizado como insumo en el proceso para sancionar a posibles involucrados.</Typography>
                    </Grid>


                    </Grid>

            </div>
        );
    }
}

export default withStyles(styles)(Uso);
