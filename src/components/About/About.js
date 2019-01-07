import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import QueEs from './QueEs';
import Sectores from './Sectores';
import Objetivos from './Objetivos';
import Carrusel from './Carrusel';
import Uso from './Uso';
import Interoperabilidad from './Interoperabilidad';
import Construimos from './Construimos';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1,
        //display: 'flex',
        //flexDirection: 'column',
        //height: '100vh'
    },
    contents: {
        flexGrow: 1,
        paddingTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 5,
        [theme.breakpoints.up('sm')]:{
            //maxWidth: 1024
            marginLeft: theme.spacing.unit * 25,
            marginRight: theme.spacing.unit * 25
        },
        [theme.breakpoints.down('sm')]:{
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit
        }
    },
    paper: {
        padding: theme.spacing.unit * 2,
        //textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    gridItem:{
        maxWidth: '1024px',
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    }
});


class About extends React.Component {

    render(){
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Header/>

                <Grid container spacing={0} justify="center">
                    <Grid item xs={12} className={classes.gridItem}>
                        <QueEs/>
                    </Grid>
                </Grid>

                <Grid container spacing={0} justify="center" style={{background: "#f9f9f9"}}>
                    <Grid item xs={12} className={classes.gridItem}>
                        <Sectores/>
                    </Grid>
                </Grid>

                <Grid container spacing={0} justify="center" style={{background: '#e6e6e6'}}>
                    <Grid item xs={12} className={classes.gridItem}>
                        <Objetivos/>
                    </Grid>
                </Grid>

                {/*
                    <Grid container spacing={24} justify="center" style={{background: '#37464f'}}>
                        <Grid item xs={12} className={classes.gridItem}>
                            <QueHacemos/>
                        </Grid>
                    </Grid>
                    */}

                <Grid container spacing={0} justify='center' style={{background: '#37464f'}}>
                    <Grid item xs={12} className ={classes.gridItem}>
                        <Interoperabilidad/>
                    </Grid>
                </Grid>


                <Grid container spacing={0} justify='center'>
                    <Grid item xs={12} className={classes.gridItem}>
                        <Construimos/>
                    </Grid>
                </Grid>

                {/*<div style={{background: "#e6e6e6"}}>
                        <div className={classes.contents}>
                            <QueSigue/>
                        </div>
                    </div>*/}


                <Grid container justify="center" spacing={0}>
                    <Grid item xs={12} className={classes.gridItem}>
                        <Carrusel/>
                    </Grid>
                </Grid>


                <Grid container justify="center" spacing={0} style={{background: '#f9f9f9'}}>
                    <Grid item xs={12} className={classes.gridItem}>
                        <Uso/>
                    </Grid>
                </Grid>

                <Grid container justify="center" spacing={0} style={{background:  "#fff"}}>
                    <Grid item xs={12} className={classes.gridItem}>
                        <Footer/>
                    </Grid>
                </Grid>
            </div>);
    }

}

About.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(About);
