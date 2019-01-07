import React from 'react';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import PDNAppBar from './PDNAppBar';
import bgi from '../../assets/about/textura.jpg';
import PDNLogo from '../../assets/logo-PDN.svg';
//import Grid from '@material-ui/core/Grid';
//import Chip from '@material-ui/core/Chip';


const styles = theme => ({
    root: {
        align: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundImage: `url(${bgi})`,
        minHeight: '360px',
        //backgroundSize: '50%',
        //backgroundPosition: 'bottom',
        //backgroundRepeat: 'repeat'

        flexGrow:1
    },
    pdn:{
        color: '#fff'
    },
    inteligencia: {
        color: '#96cb99'
    },
    pdnLogo: {
        maxWidth: '250px',
        paddingTop: '55px'
    },
    beta:{
        backgroundColor: '#96cb99',
        width: '70px'
    }

});


class Header extends React.Component{

    render (){
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <PDNAppBar/>
                <img src={PDNLogo} alt="PDN" className={classes.pdnLogo}/>
                <Typography variant="headline" className={classes.pdn}>Plataforma Digital Nacional</Typography>
                <Typography variant="headline" className={classes.inteligencia}>Inteligencia de Datos Anticorrupción</Typography>
                <br/>
                {/*<Chip label="BETA" className={classes.beta}/>*/}

            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);