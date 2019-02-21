import React from 'react';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import Ejes from '../../assets/about/grafico-ejes.svg';


const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing.unit*4,
        paddingBottom: theme.spacing.unit*4,
    },
    links: {
        color: '#96cb99'
    },
    whiteText: {
        color: '#e6e6e6'
    },
    titles: {
        background: '#96cb99',
        color: '#ffffff',
        textAlign: 'center',
        padding: theme.spacing.unit
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
        paddingLeft: '0px'
    },
    li: {
        paddingBottom: theme.spacing.unit *2
    },
    ejes: {
        paddingTop: '20px',
        maxWidth: '350px'
    },
    numbering: {
        color : '#96cb99'
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

                <Typography variant="display2" className={classes.links}>
                    ¿Cómo se construye la PDN?
                </Typography>

                <br/>
                <br/>
                <Grid container spacing={0}>
                    <Grid item xs={12} md={6} className={classes.items}>
                        <Typography variant="title" className={classes.titles }>Principios</Typography>
                        <ul className={classes.ul}>
                            <li className={classes.li}><Typography variant="subheading"> <b className={classes.numbering}>1.</b>{/*<span className={classes.bullet}/>*/} Diseño centrado en las usuarias-os y sus necesidades</Typography></li>
                            <li className={classes.li}><Typography variant="subheading"> <b className={classes.numbering}>2.</b>{/*<span className={classes.bullet}/>*/} Construcción gradual, modular, escalable, ágil y flexible</Typography></li>
                            <li className={classes.li}><Typography variant="subheading"> <b className={classes.numbering}>3.</b>{/*<span className={classes.bullet}/>*/} Datos interoperables y abiertos</Typography></li>
                            <li className={classes.li}><Typography variant="subheading"> <b className={classes.numbering}>4.</b>{/*<span className={classes.bullet}/>*/} Seguridad de la información y protección de datos personales</Typography></li>
                            <li className={classes.li}><Typography variant="subheading"> <b className={classes.numbering}>5.</b>{/*<span className={classes.bullet}/>*/} Creación de impacto y entrega de valor público en el centro</Typography></li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} md={6} style={{textAlign: 'center'}} className={classes.items}>
                        <Typography variant="title" className={classes.titles}>Ejes de trabajo</Typography>

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