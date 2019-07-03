import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import Header from './Header/Header';
import Grid from '@material-ui/core/Grid';
import Footer from "../Home/Footer";


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    item:{
        maxWidth: 1200,
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(8),
        paddingTop: theme.spacing(8)
    },
    container: {
        backgroundColor: '#fff'
    }
});


class Index extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Header/>

                <Grid container spacing={0} justify="center" className={classes.container}>
                    <Grid item xs={12} className={classes.item}>

                    <Typography> Contrataciones </Typography>

                    </Grid>
                </Grid>

                <Footer/>
            </div>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);