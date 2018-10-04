import React from "react";
import {Link} from 'react-router-dom';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Button from '@material-ui/core/Button';
import imgHeader from "../../assets/img/logo_pdn.png";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing.unit * 1.7
    },
    flex: {
        flexGrow: 1,
    },
    gridItem: {
        maxWidth: '1024px'
    }
});

class PDNAppBar extends React.Component {

    render(){
        const {classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar color="default"  position="static" >

                    <Grid container spacing={0} justify='center'>
                        <Grid item xs={12} className={ classes.gridItem}>
                            <Toolbar>
                                <IconButton  color="inherit" aria-label="Menu" component={Link} to="/">
                                    <img src={imgHeader} alt="logoPDN" style={{width:'55px'}}/>

                                </IconButton>
                                <Typography variant="title" color="inherit" className={classes.flex}>

                                </Typography>

                                <Button color="inherit" href="https://www.plataformadigitalnacional.org/blog">
                                    Blog
                                </Button>
                                <Button color="inherit" component={Link} to="/about">
                                    Acerca
                                </Button>
                                <Button color="inherit" component={Link} to="/faq" >
                                    FAQ
                                </Button>
                            </Toolbar>
                        </Grid>
                    </Grid>
                </AppBar>
            </div>
        );
    }
}

PDNAppBar.propTypes= {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PDNAppBar);