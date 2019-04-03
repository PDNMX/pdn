import React from 'react';
import {Link} from 'react-router-dom';
import Typography  from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Header from './PDNAppBar/PDNAppBar';
import Button from '@material-ui/core/Button';
import Footer from './Home/Footer';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
    root :{
        flexGrow: 1,
        backgroundColor: '#e5e5e5'
    },
    gridItem:{
        maxWidth: '1024px',
        minHeight: '800px',
        marginTop: theme.spacing.unit * 5 ,
        paddingBottom: theme.spacing.unit *2
    },
    paper:{
        padding: theme.spacing.unit * 2
    },
    button: {
        marginTop: theme.spacing.unit
    },
    links: {
        backgroundColor: theme.palette.grisTenue.color
    },
    section: {
        maxWidth: '1024px'
    },
});

class P404 extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Header/>
                <Grid container spacing={0} justify='center'>
                    <Grid item xs={12} className={classes.gridItem}>
                        <Paper className={classes.paper}>
                            <Typography variant="display1">404 </Typography>
                            <Typography variant="subheading">No encontramos lo que buscas </Typography>
                            <Button className={classes.button} component={Link} variant="contained" color="primary" to="/">Regresar</Button>
                        </Paper>
                    </Grid>
                </Grid>
                <Footer/>
            </div>
        )
    }
}

export default withStyles(styles)(P404);