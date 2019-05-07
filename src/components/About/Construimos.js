import React from 'react';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import Ejes from '../../assets/about/ejes.svg';


const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing.unit*4,
        paddingBottom: theme.spacing.unit*4,
    },
    links: {
        color: '#606060'
    },
    whiteText: {
        color: '#606060'
    },
    titles: {
        color: '#606060',
        padding: theme.spacing.unit,
    },
    bullet: {
        backgroundColor: '#5fb1e6',
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
        paddingLeft: '0px'
    },
    li: {
        paddingBottom: theme.spacing.unit *4,
        fontSize: '18px'
    },
    ejes: {
        padding: '20px',
        maxWidth: '100%'
    },
    numbering: {
        color : '#5fb1e6',
        fontSize: '26px'
    },
    items: {
        paddingRight: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
    }
});


class Construimos extends React.Component{
    render (){
        const {classes} = this.props;

        return (
            <div className={classes.root}>

                <Typography variant="h3" className={classes.links}>
                    ¿Cómo se <b>construye</b> la <b>PDN</b>?
                </Typography>

                <br/>
                <br/>
                <Grid container spacing={0}>
                    <Grid item xs={12} md={6} className={classes.items} style={{background: '#f2f2f2', padding: '20px 15px'}}>
                        <Typography variant="h6" className={classes.titles }>Principios</Typography>
                        <ul className={classes.ul}>
                            <li className={classes.li}><Typography variant="subtitle1"> <b className={classes.numbering}>1.</b>{/*<span className={classes.bullet}/>*/} Diseño centrado en las usuarias-os y sus necesidades</Typography></li>
                            <li className={classes.li}><Typography variant="subtitle1"> <b className={classes.numbering}>2.</b>{/*<span className={classes.bullet}/>*/} Construcción gradual, modular, escalable, ágil y flexible</Typography></li>
                            <li className={classes.li}><Typography variant="subtitle1"> <b className={classes.numbering}>3.</b>{/*<span className={classes.bullet}/>*/} Datos interoperables y abiertos</Typography></li>
                            <li className={classes.li}><Typography variant="subtitle1"> <b className={classes.numbering}>4.</b>{/*<span className={classes.bullet}/>*/} Seguridad de la información y protección de datos personales</Typography></li>
                            <li className={classes.li}><Typography variant="subtitle1"> <b className={classes.numbering}>5.</b>{/*<span className={classes.bullet}/>*/} Creación de impacto y entrega de valor público en el centro</Typography></li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} md={6} style={{textAlign: 'center'}} className={classes.items}>
                        <Typography variant="h6" className={classes.titles}>Ejes de trabajo</Typography>

                        <img className={classes.ejes} src={Ejes} alt="Ejes"/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Construimos.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Construimos);
