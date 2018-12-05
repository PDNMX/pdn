import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';
import {Link, withRouter} from "react-router-dom";
import imgHeader from "../../assets/PDN-sintexto-blue.png";
import {connect} from 'react-redux';
import app from "../../config/firebase";


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

    constructor(props){
        super(props);
    };
    state = {
        open: false,
        currentUser: null,
        loading: false,
        authenticated: false
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

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

    render(){
        const {classes} = this.props;
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

                        <Button color="inherit" href="https://www.plataformadigitalnacional.org/blog"
                                className={classes.buttons}>Blog</Button>

                        {
                            this.props.sesion.authenticated &&
                            <Button color="inherit" className={classes.buttons} onClick={this.handleSignOut}>Salir</Button>
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
