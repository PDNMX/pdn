import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
//import Paper from '@material-ui/core/Paper';


const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit*4,
        paddingBottom: theme.spacing.unit*4,
    },
    box : {
        padding: theme.spacing.unit * 2,
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
        paddingBottom: theme.spacing.unit //*2
    },
    links: {
        color: '#96cb99'
    }
});

class Uso extends React.Component{
    render(){

        const {classes} = this.props;

        return(
            <div className={classes.root}>
                <Typography variant="display2" className={classes.links}>Impacto de los datos para combatir la corrupción</Typography>
                <br/>
                <br/>

                <div className={classes.box}>
                    <ul className={classes.ul}>
                        <li className={classes.li}>
                            <Typography variant="subheading"><span className={classes.bullet}/> <a href="https://www.fuistetu.org/" className={classes.links}>Fuiste Tú</a> usa datos de auditorías para fomentar la trazabilidad en el uso de recursos públicos.</Typography>
                        </li>
                        <li className={classes.li}>
                            <Typography variant="subheading"><span className={classes.bullet}/> <a href="https://imco.org.mx/articulo_es/indice-riesgos-corrupcion-sistema-mexicano-contrataciones-publicas/" className={classes.links}>Imco y OPI</a> utilizaron datos de contrataciones para identificar riesgos e impulsar una cultura de prevención en contrataciones.</Typography>
                        </li>
                        <li className={classes.li}>
                            <Typography variant="subheading"><span className={classes.bullet}/> <a href="https://1560000.org/explora" className={classes.links}>Data Cívica</a> utilizó datos abiertos para reconstruir las declaraciones patrimoniales de servidores públicos del gobierno.</Typography>
                        </li>
                        <li className={classes.li}>
                            <Typography variant="subheading"><span className={classes.bullet}/> <a href="https://www.animalpolitico.com/estafa-maestra/#datos" className={classes.links}>Animal Político</a> utilizó datos de auditorías y licitaciones para detectar desvíos de recursos, algo que ha sido utilizado como insumo en el proceso para sancionar a posibles involucrados.</Typography>
                        </li>
                    </ul>
                </div>

            </div>
        );
    }
}

export default withStyles(styles)(Uso);
