import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';
import {Link} from "react-router-dom";
import imgHeader from "../../assets/PDN-sintexto-blue.png";

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    buttons: {
        color: '#fff'
    }
};

function VideoAppBar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static" style={{
                backgroundColor: "rgba(0, 0, 0, 0)",
                border: 0,
                boxShadow: 'none'
            }}>
                <Toolbar>

                    <IconButton color="inherit" aria-label="Menu" component={Link} to="/home">
                        <img src={imgHeader} alt="PDN" style={{width: '55px'}}/>
                    </IconButton>

                    <Typography variant="h6" color="inherit" className={classes.grow}>

                    </Typography>
                    <Button color="inherit" href="https://www.plataformadigitalnacional.org/blog" className={classes.buttons}>Blog</Button>
                    <Button color="inherit" className={classes.buttons}>Salir</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

VideoAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VideoAppBar);