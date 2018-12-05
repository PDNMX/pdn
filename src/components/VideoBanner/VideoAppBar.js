import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {Link, withRouter} from "react-router-dom";
import imgHeader from "../../assets/PDN-sintexto-blue.png";
import {connect} from 'react-redux';
import app from "../../config/firebase";

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
//import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';


const styles = theme => ({
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
        color: '#666666'
    }
});

class VideoAppBar extends React.Component {

    state = {
        //open: false,
        currentUser: null,
        loading: false,
        authenticated: false,

        //auth: true,
        anchorEl: null
    };

    constructor(props){
        super(props);
    };

    /*
    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };
    */

    handleSignOut = () => {
        app.auth().signOut().then(() => {
            let aux = {};
            localStorage.setItem("sesion",JSON.stringify(aux));
            this.props.history.push("/");
            this.props.removeSesion();
        }).catch(e => {
            alert(e);
        })
    };



    //menu

    handleChange = event => {
        this.setState({ auth: event.target.checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };


    render(){
        const {classes} = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <AppBar position="static" style={{
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    border: 0,
                    boxShadow: 'none'
                }}>
                    <Toolbar>

                        <IconButton color="inherit" aria-label="Menu" component={Link} to="/home">
                            <img src={imgHeader} alt="PDN" style={{width: '40px'}}/>
                        </IconButton>

                        <Typography variant="h6" color="inherit" className={classes.grow}>

                        </Typography>

                        {/*
                        <Button color="inherit" href="https://www.plataformadigitalnacional.org/blog"
                                className={classes.buttons}>Blog</Button>

                        {
                            this.props.sesion.authenticated &&
                            <Button color="inherit" className={classes.buttons} onClick={this.handleSignOut}>Salir</Button>
                        }

                        */}

                        {
                            this.props.sesion.authenticated && (
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <MenuIcon/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    {/*<MenuItem onClick={this.handleClose}>Blog</MenuItem>*/}
                                    <MenuItem onClick={this.handleSignOut}>Salir</MenuItem>
                                </Menu>
                            </div>
                            )
                        }

                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

VideoAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        sesion: state.sesionReducer.sesion
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    newSesion: (sesion) => dispatch({type: 'SET_SESION', sesion}),
    removeSesion : () => dispatch({type : 'REMOVE_SESION'}),
});

let previo =  withStyles(styles)(VideoAppBar);

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(previo));
