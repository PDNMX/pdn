import React from 'react';
import Grid from '@material-ui/core/Grid';
//import Card from '../components/SimpleCard'
import Header from './PDNAppBar/PDNAppBar';
import Footer from "./Footer/Footer";
import Banner from "./Banner";
import PDNLinks from "./PDNLinks/PDNLinks";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography/Typography";
import Cards from './Cards';


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
        }
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
        backgroundColor: '#fff'
    }
});



class Home extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Header/>
                <Banner/>
                <div className={classes.homeBody}>
                    <Grid justify="center" container spacing={0}>
                        <Grid item xs={12} className={classes.section}>
                            <Typography variant="headline" >
                                Explora los sistemas de la PDN
                            </Typography>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
