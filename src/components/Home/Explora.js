import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    container: {
        paddingTop: 100,
        paddingBottom: 60
    }

});

class Explora extends React.Component{

    render(){
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={0} justify='center' className={classes.container}>
                    <Grid item xs={12} align="center">
                        <Typography variant="display2">
                            Explora los 6 sistemas de la PDN
                        </Typography>
                        <br/>
                        <Typography>
                            Consulta, visualiza y descarga la información pública de cada uno <br/>de los sistemas de la <b>Plataforma Digital Nacional</b>.
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

Explora.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Explora);