import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../PDNAppBar/PDNAppBar';
import Footer from "../Footer/Footer";
import Banner from "../Banner";
import PDNLinks from "../PDNLinks/PDNLinks";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography/Typography";
import Cards from './Cards';
//import VideoBanner from './VideoBanner';
import Modal from "@material-ui/core/Modal/Modal";
import TypePicker from "../Charts/bubbles/TypePicker";

//import video_mp4 from '../assets/videos/hero2.mp4'


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#e5e5e5'

    },
    homeBody:{
        [theme.breakpoints.down('sm')]:{
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            marginTop: theme.spacing.unit,
            marginBottom: theme.spacing.unit,
            padding: 10
        },
        backgroundColor: theme.palette.white.color,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        //marginRight: theme.spacing.unit * 4,
        //marginLeft: theme.spacing.unit * 4,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    appBar: {
        marginBottom: theme.spacing.unit * 5
    },
    gridItem: {
        marginBottom: theme.spacing.unit * 2
    },
    section: {
        maxWidth: '1024px',
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    },
    links: {
        backgroundColor: theme.palette.grisTenue.color
    },
    /*video: {
        position: "fixed",
        right: 0,
        bottom: 0,
        minWidth: '100%',
        minHeight: '100%'
    }*/
});



class Home extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Header/>
                <Banner/>
                {/* <VideoBanner/> */}

                <div className={classes.homeBody}>
                    <Grid justify="center" container spacing={0}>
                        <Grid item xs={12} className={classes.section}>
                            <Typography variant="headline" >
                                Explora los sistemas de la PDN
                            </Typography>
                            <br/>
                            <Typography variant={"subheading"} align={"justify"}>
                                Consulta, visualiza y descarga la información pública de cada uno de los sistemas de la Plataforma Digital Nacional.
                            </Typography>
                            <br/>
                            <Typography variant={"subheading"} align={"justify"}>
                                La Plataforma permite que los datos de cada uno de los sistemas, que son generados por las instituciones, estén estandarizados y puedan ser interoperables, permitiendo que los consultes, visualices, descargues y uses libremente.
                            </Typography>
                            <br/>
                            <Typography variant={"subheading"} align={"justify"}>
                                El artículo 49 de la Ley General del Sistema Nacional Anticorrupción establece que la PDN estará integrada, inicialmente, por al menos los siguientes seis sistemas:
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={0} justify="center">
                        <Grid item xs={12} className={classes.section}>
                            <Cards/>
                        </Grid>
                    </Grid>
                </div>

                <div className={classes.links}>
                    <Grid container spacing={0} justify='center'>
                        <Grid item xs={12} className={classes.section}>
                            <PDNLinks/>
                        </Grid>
                    </Grid>
                </div>
                <Footer/>
            </div>

        );
    }
}

Home.propTypes = {
    classes : PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
