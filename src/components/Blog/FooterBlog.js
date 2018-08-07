import React from 'react';
import '../home.css';
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/es/styles/withStyles";
import {Link} from "react-router-dom";

const styles = theme => ({
    containerFooterBlog:{
        height: '230px',
        backgroundColor: 'white',
        [theme.breakpoints.up('sm')]:{
            paddingLeft: '100px',
            paddingRight: '100px'
        },
        [theme.breakpoints.down('sm')]:{
            paddingLeft: theme.spacing.unit,
            paddingRight: theme.spacing.unit
        },
        paddingTop:'2em',
        paddingBottom: '2em'
    }
});

function FooterBlog (props){
    const { classes } = props;
    return (
        <div className={classes.containerFooterBlog}>
            <Typography variant={"title"} style={{fontSize:'2.5em'}}>
                Blog
            </Typography>
            <br/>


            <Typography variant={"subheading"} component = {Link} to="/datos">
                Hola de la Plataforma Digital Nacional
            </Typography>
            <br/>

            <Typography variant={"subheading"} component = {Link}  to="/datos">
                Indicadores
            </Typography>

            <br/>

            <Typography variant={"subheading"} component = {Link} to="/datos">
                ¿Qué puedes esperar?
            </Typography>

            <br/>

            <Typography variant={"subheading"} component = {Link}  to="/datos">
                Guia de apertura anticorrupción
            </Typography>
        </div>
    );
}

export default withStyles(styles)(FooterBlog);
