import React from 'react';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Chrono from '../assets/grafico-cronograma.svg';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
    },
    chrono:{
        maxWidth: '750px'
    },
    itemCentered: {
        textAlign: 'center'
    }
});

class QueSigue extends React.Component{
    render (){
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing ={24}>
                    <Grid item xs={6}>
                        <Typography variant="display3">
                            ¿Qué sigue?
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>
                            La construcción de la PDN empezará con seis
                            sistemas que contienen datos estratégicos para la
                            lucha contra la corrupción.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.itemCentered}>
                        <img src={Chrono} alt="Cronograma" className={classes.chrono}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

QueSigue.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QueSigue);