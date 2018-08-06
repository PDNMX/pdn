import React from 'react';
import '../home.css';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/es/styles/withStyles";

var styles = {
    containerFooterBlog:{
        height: '250px',
        paddingTop : '30px'
    }
}

function FooterBlog (props){
    const { classes } = props;
        return (
            <div className={classes.containerFooterBlog}>
                <Grid className="containerL2">
                    <Typography variant={"title"} style={{fontSize:'2.5em'}}>
                        Blog
                    </Typography>
                    <br/>
                    <a href="/datos">
                        <Typography variant={"subheading"}> Hola de la Plataforma Digital Nacional
                        </Typography>
                    </a><br/>
                    <a href="/datos">
                        <Typography variant={"subheading"}>Indicadores
                        </Typography>
                    </a><br/>
                    <a href="/datos">
                        <Typography variant={"subheading"}>¿Qué puedes esperar?
                        </Typography>
                    </a><br/>
                    <a href="/datos">
                        <Typography variant={"subheading"}>Guia de apertura anticorrupcion
                        </Typography>
                    </a>
                </Grid>
            </div>

        );
}

export default withStyles(styles)(FooterBlog);
