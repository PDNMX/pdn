import React from 'react';
import {Link} from 'react-router-dom';
import Typography  from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Header from './Header/Header';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {

        [theme.breakpoints.up('sm')]:{
            marginLeft: '100px',
            marginRight: '100px',
            marginTop: '50px',
            marginBottom: '50px',
            paddingBottom: '50px'
        },
        [theme.breakpoints.down('sm')]:{
            paddingTop: theme.spacing.unit * 2,
            paddingBottom: theme.spacing.unit * 2,
            marginLeft: theme.spacing.unit*2,
            marginRight: theme.spacing.unit* 2
        },
    },
    button: {
        marginTop: theme.spacing.unit
    }
});

class P404 extends React.Component {
    render() {

        const { classes } = this.props;
        return (
            <div>

                <Header/>

                <div className={classes.root}>
                    <Typography variant="display1">404 </Typography>
                    <Typography variant="subheading">No encontramos lo que buscas </Typography>
                    <Button className={classes.button} component={Link} variant="contained" color="primary" to="/">Regresar</Button>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(P404);