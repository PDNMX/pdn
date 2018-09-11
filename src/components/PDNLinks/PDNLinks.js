import React from 'react';
import '../home.css';
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

const styles = theme => ({
    containerFooterBlog:{
        height: '160px',
        backgroundColor: '#fff',
        [theme.breakpoints.up('sm')]:{
            paddingLeft: '100px',
            paddingRight: '100px'
        },
        [theme.breakpoints.down('sm')]:{
            paddingLeft: 20,
            paddingRight: 20
        },
        paddingTop:'2em',
        paddingBottom: '2em'
    },
    text: {
        paddingBottom: theme.spacing.unit
    }
});

function PDNLinks (props){
    const { classes } = props;
    return (
        <div className={classes.containerFooterBlog}>
            <Typography variant="display1" className={classes.text}>
                Blog
            </Typography>
            <Typography component = {Link} to="/datos" className = {classes.text}>
                Hola de la Plataforma Digital Nacional
            </Typography>

            <Typography component = {Link}  to="/indicadores" className = {classes.text}>
                Indicadores
            </Typography>

            <Typography component = {Link} to="/datos" className = {classes.text}>
                ¿Qué puedes esperar?
            </Typography>

            <Typography component = {Link}  to="/datos" className = {classes.text}>
                Guia de apertura anticorrupción
            </Typography>
        </div>
    );
}

export default withStyles(styles)(PDNLinks);
