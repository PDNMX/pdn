import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    container: {
        paddingTop: 100,
        paddingBottom: 90
    },
    button:{
        background: '#ffe01b'
    },
    titulos: {
        color: theme.palette.titleBanner.color
    }

});

class Explora extends React.Component{

    render(){
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={0} justify='center' className={classes.container}>
                    <Grid item xs={12} align="center">
                        <Typography variant="h2" className={classes.titulos}>
                            Plataforma Digital Nacional

                        </Typography>
                        <br/>

                        <Typography variant="h2" className={classes.titulos}>
                            explora los 6 sistemas
                        </Typography>
                        <br/>
                        <br/>
                        <Button variant='raised' className={classes.button}>Conoce más</Button>
                        {/*<br/>
                        <Typography>
                            Consulta, visualiza y descarga la información pública de cada uno <br/>de los sistemas de la <b>Plataforma Digital Nacional</b>.
                        </Typography>*/}
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