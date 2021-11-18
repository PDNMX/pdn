import React  from 'react';
import withStyles from '@mui/styles/withStyles';
import Header from './Header/Header';
import Grid from '@mui/material/Grid';
import Footer from "../Home/Footer";
import ExpansionPanels from './ExpansionPanels';
import Disclaimer from "./Disclaimer";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    item: {
        maxWidth: 1200,
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingTop: 40,
        paddingBottom: theme.spacing(10),
    },
    title: {
        color: theme.palette.primary.dark
    },
    link: {
        textDecoration: "none",
        color: theme.palette.primary.dark
    },
    diagrama: {
        maxWidth: 900,
        padding: theme.spacing(2)
    },
    disclaimer:{
        backgroundColor: '#f6f6f6',
    },
    disclaimerItem: {
        paddingTop: theme.spacing(4),
        paddingBottom : theme.spacing(4),
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        maxWidth: 1200
    }
});

class HelpDesk extends React.Component{

    render() {

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Header/>

                <Grid container spacing={0} justifyContent="center" className={classes.disclaimer}>
                    <Grid item xs={12} className={classes.disclaimerItem}>
                        <Disclaimer/>
                    </Grid>
                </Grid>



                <Grid container spacing={0} justifyContent="center">
                    <Grid item xs={12} className={classes.item}>


                        <ExpansionPanels/>


                    </Grid>

                </Grid>
                <Footer/>
            </div>
        );
    }
}


export default withStyles(styles)(HelpDesk);

