import React from 'react';
import {Link} from 'react-router-dom';
import Typography  from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Header from './PDNAppBar/PDNAppBar';
import Button from '@material-ui/core/Button';
import PDNLinks from './PDNLinks/PDNLinks';
import Footer from './Footer/Footer';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root :{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
    },
    contents: {

        flexGrow: 1,
        paddingTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 5,
        [theme.breakpoints.up('sm')]:{
            marginLeft: '100px',
            marginRight: '100px'
        },
        [theme.breakpoints.down('sm')]:{
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit
        }
    },
    paper:{
        padding: theme.spacing.unit * 2
    },
    button: {
        marginTop: theme.spacing.unit
    }
});

class P404 extends React.Component {
    render() {

        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Header/>
                <div className={classes.contents}>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                            <Typography variant="display1">404 </Typography>
                            <Typography variant="subheading">No encontramos lo que buscas </Typography>
                            <Button className={classes.button} component={Link} variant="contained" color="primary" to="/">Regresar</Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
                <PDNLinks/>
                <Footer/>
            </div>
        )
    }
}

export default withStyles(styles)(P404);