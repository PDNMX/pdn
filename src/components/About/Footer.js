import React from 'react';
//import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import SESNA from '../../assets/sesna-gris.jpg';

const styles  = theme => ({
    root: {
        //textAlign: 'center',
        //paddingBottom: theme.spacing.unit,
        flexGrow:1
    },
    logo:{
        marginTop: 0,
        maxWidth: '150px'
    },
    links: {
        color: '#96cb99',
        //marginTop: '10px'
    },
    itemLogo:{
        [theme.breakpoints.down('md')]:{
            paddingBottom: theme.spacing.unit*2,
            textAlign: 'center'
        }
    },
    terminos:{
        [theme.breakpoints.up('md')]:{
            textAlign: 'right'
        },
        [theme.breakpoints.down('md')]:{
            textAlign: 'center'
        }
    }
});

class Footer extends React.Component{

    render (){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container justify='center'>
                    <Grid item md={6} xs={12} className={classes.itemLogo}>
                        <img src={SESNA} alt='SESNA' className={classes.logo}/>
                    </Grid>
                    <Grid item md={6} xs={12} className={classes.terminos}>
                        <Typography variant="subheading">
                            <a href="/terminos" className={classes.links}>
                            Términos de uso
                            </a>
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(Footer);