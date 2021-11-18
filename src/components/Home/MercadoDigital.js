import React from 'react';
import withStyles from '@mui/styles/withStyles';
import Grid from '@mui/material/Grid';
import {Typography} from "@mui/material";
//import {Link} from "react-router-dom";
import Button from "@mui/material/Button";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    container: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10),
        //paddingRight
    },
    button:{
        background: '#ffe01b',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2)
    },
    headingText: {
        color: theme.palette.titleBanner.color,
        fontWeight: "700",
        fontSize: '48px',
        [theme.breakpoints.down('md')]:{
            fontSize: '40px',
        },
    },
    text:{
        fontSize: '18px',
        fontWeight: 500,
        color: theme.palette.titleBanner.color,
        paddingBottom: theme.spacing(3)
    },
    videoDiv:{
        maxWidth: 800,
        margin: theme.spacing(1)
    }
});

const MercadoDigital = props => {
    const {classes}  = props;

    return (
        <div className={classes.root}>
            <Grid container spacing={0} justifyContent='center' className={classes.container}>
                <Grid item xs={12} align="center">
                    <Typography className={classes.headingText} paragraph>
                        Mercado Digital Anticorrupción
                    </Typography>

                    <Typography className={classes.text} paragraph>
                        El Mercado Digital Anticorrupción (MDA) es un espacio donde podrás encontrar
                        diversas herramientas que facilitarán el desarrollo y conexión de los sistemas
                        que conforman a la Plataforma Digital Nacional.
                        Estas herramientas podrán ser utilizadas por todas las Instituciones que las requieran,
                        ya que son de libre uso, haz click en "Conoce más".
                    </Typography>

                    <div className={classes.videoDiv}>
                        <iframe width="100%" height="450" src="https://www.youtube.com/embed/JQNPwOOG4yw" frameBorder="0" title={'Video'}
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen/>
                    </div>

                    <div>
                        <Button variant="contained" className={classes.button}
                                href="https://mda.plataformadigitalnacional.org/"
                            //target="_blank"
                        >
                            Conoce más
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default withStyles(styles)(MercadoDigital);