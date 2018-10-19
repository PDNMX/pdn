import React from 'react';
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    containerFooterBlog:{
        height: '160px',
        backgroundColor: theme.palette.grisTenue.color,
        /*[theme.breakpoints.up('sm')]:{
            paddingLeft: '100px',
            paddingRight: '100px'
        },
        [theme.breakpoints.down('sm')]:{
            paddingLeft: 20,
            paddingRight: 20
        },*/
        paddingTop:'2em',
        paddingBottom: '2em'
    },
    text: {
        paddingBottom: theme.spacing.unit
    }
});

class PDNLinks extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.containerFooterBlog}>
                <Typography variant="display1" className={classes.text}>
                    Blog
                </Typography>
                <Typography component={Link} to="/datos" className={classes.text}>
                    Hola de la Plataforma Digital Nacional
                </Typography>

                <Typography component={Link} to="/indicadores" className={classes.text}>
                    Indicadores
                </Typography>

                <Typography component={Link} to="/datos" className={classes.text}>
                    ¿Qué puedes esperar?
                </Typography>

                <Typography component={Link} to="/datos" className={classes.text}>
                    Guia de apertura anticorrupción
                </Typography>
            </div>
        );
    }
}

PDNLinks.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PDNLinks);
