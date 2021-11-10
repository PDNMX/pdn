import React from 'react';
import Header from './Header/Header';
import Footer from "../Home/Footer";
import {withStyles} from '@mui/styles';
import PropTypes from 'prop-types';
//import QueEs from './QueEs';
//import Sectores from './Sectores';
import Objetivos from './Objetivos';
import Carrusel from './Carrusel';
import Uso from './Uso';
import Interoperabilidad from './Interoperabilidad';
import Construimos from './Construimos';
import Grid from '@mui/material/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1,
        //display: 'flex',
        //flexDirection: 'column',
        //height: '100vh'
    },
    contents: {
        flexGrow: 1,
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        [theme.breakpoints.up('sm')]:{
            //maxWidth: 1024
            marginLeft: theme.spacing(25),
            marginRight: theme.spacing(25)
        },
        [theme.breakpoints.down('lg')]:{
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
        }
    },
    paper: {
        padding: theme.spacing(2),
        //textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    gridItem:{
        maxWidth: '1024px',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    }
});


class About extends React.Component {

    render(){
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Header/>

                <Grid container spacing={0} justifyContent="center">
                    <Grid item xs={12} className={classes.gridItem} style={{marginTop: '110px', marginBottom: '110px'}}>
                        <Objetivos/>
                    </Grid>
                </Grid>

                {/*
                    <Grid container spacing={3} justify="center" style={{background: '#37464f'}}>
                        <Grid item xs={12} className={classes.gridItem}>
                            <QueHacemos/>
                        </Grid>
                    </Grid>
                    */}

                <Grid container spacing={0} justifyContent='center' style={{background: '#f2f2f2', padding: '90px 0 120px'}}>
                    <Grid item xs={12} className ={classes.gridItem} >
                        <Interoperabilidad/>
                    </Grid>
                </Grid>


                <Grid container spacing={0} justifyContent='center' style={{marginTop: '110px', marginBottom: '110px'}}>
                    <Grid item xs={12} className={classes.gridItem}>
                        <Construimos/>
                    </Grid>
                </Grid>

                {/*<div style={{background: "#e6e6e6"}}>
                        <div className={classes.contents}>
                            <QueSigue/>
                        </div>
                    </div>*/}


                <Grid container justifyContent="center" spacing={0} style={{background: '#f2f2f2', padding: '90px 0 120px'}}>
                    <Grid item xs={12} className={classes.gridItem}>
                        <Carrusel/>
                    </Grid>
                </Grid>


                <Grid container justifyContent="center" spacing={0} style={{marginTop: '110px', marginBottom: '110px'}}>
                    <Grid item xs={12} className={classes.gridItem}>
                        <Uso/>
                    </Grid>
                </Grid>

                <Grid container justifyContent="center" spacing={0} style={{background:  "#fff"}}>
                        <Footer/>
                </Grid>
            </div>
        );
    }

}

About.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(About);
