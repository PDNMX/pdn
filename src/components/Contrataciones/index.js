import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PDNLinks from "../PDNLinks/PDNLinks";
import Footer from "../Footer/Footer";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import Header from "../PDNAppBar/PDNAppBar";
import PropTypes from 'prop-types';
import Paper from "@material-ui/core/Paper";
import Card from "./CardChart";
import Grafica1 from "./Grafica1"

const styles = theme => ({
    root: {
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {
            marginLeft: '100px',
            marginRight: '100px',
            paddingTop: theme.spacing.unit,
            paddingBottom: theme.spacing.unit * 3
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            paddingTop: theme.spacing.unit,
            paddingBottom: theme.spacing.unit,
        }
    },
    subroot: {
        flexGrow: 1,
        [theme.breakpoints.down('md')]: {
            width:'100%'
        }

    },
    paperIzquierdo:{
        backgroundColor: theme.palette.grey.color,
        height:'100%',
        width:'100%',
        color:theme.palette.fontLight.color,
    },
    paperDerecho:{
        height:'90%',
        width:'95%',
        paddingLeft:"3rem",
        paddingTop:"3rem"
    },
    titleBox:{
        color: theme.palette.fontLight.color,
        backgroundColor: theme.palette.greyTitle.color,
        paddingTop:'1rem',
        paddingBottom:'1rem',
        paddingLeft:'6rem',
        paddingRight:'2rem',
        fontSize:'1rem',
        display:'inline-block',
        fontWeight:700,
        marginLeft:"-3rem",
        marginBottom: "2rem"

    },
    seccion:{
        padding:"3rem"
    },
    fontLight:{
        color: theme.palette.fontLight.color,

    }
});

class Index extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div>
                <Header/>
                <div className={classes.root}>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Typography variant="headline">
                                Contrataciones públicas
                            </Typography>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est
                                laborum.
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
                <div>
                    <Grid container spacing={0}>
                        <Grid item md={4} sm={12} className={classes.subroot}>
                            <Paper className={classes.paperIzquierdo}>
                                <div className={classes.seccion}>
                                    <Typography variant="headline" className={classes.titleBox}>
                                        Resumen
                                    </Typography>
                                    <Typography variant="body1" className={classes.fontLight}>
                                        It is a long established fact that a reader will be distracted by the readable content of a page
                                        when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                                        distribution of letters
                                    </Typography>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item md={8} sm={12}>
                            <Paper className={classes.paperDerecho}>
                                <Typography variant="headline" className={classes.titleBox}>
                                    Resumen
                                </Typography>
                                <Grafica1/>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
                <PDNLinks/>
                <Footer/>
            </div>


        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);