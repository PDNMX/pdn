import React from 'react';
import '../home.css';
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/es/styles/withStyles";

var styles = {
    containerFooterBlog:{
        height: '230px',
        backgroundColor: 'white',
        paddingLeft : '100px',
        paddingRight: '100px',
        paddingTop:'2em',
        paddingBottom: '2em'
    }
}

function FooterBlog (props){
    const { classes } = props;
        return (
            <div className={classes.containerFooterBlog}>
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
                        <Typography variant={"subheading"}>Guia de apertura anticorrupción
                        </Typography>
                    </a>

            </div>

        );
}

export default withStyles(styles)(FooterBlog);
