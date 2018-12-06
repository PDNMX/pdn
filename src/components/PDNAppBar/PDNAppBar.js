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
import Grid from '@material-ui/core/Grid';
import app from "../../config/firebase";
import {connect} from "react-redux";
import {withRouter } from 'react-router-dom';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing.unit * 1
    },
    flex: {
        flexGrow: 1,
    },
    gridItem: {
        maxWidth: '1200px'
    },
    barDemo: {
        width: '100%',
        backgroundColor: '#671e1e',
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 3,
    },
    textoDemo:{
        color : 'white'
    },
    modalParticipa: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
}

});

class PDNAppBar extends React.Component {
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

    render() {

        const {classes} = this.props;
        return (
            <div>
                <div className={classes.root}>
                    <AppBar color="default" position="static">

                        <Grid container spacing={0} justify='center'>
                            <Grid item xs={12} className={classes.gridItem}>
                                <Toolbar>
                                    <IconButton color="inherit" aria-label="Menu" component={Link} to="/home">
                                        <img src={imgHeader} alt="logoPDN" style={{width: '55px'}}/>

                                    </IconButton>
                                    <Typography variant="title" color="inherit" className={classes.flex}>

                                    </Typography>

                                    <Button color="inherit" href="https://www.plataformadigitalnacional.org/blog">
                                        Blog
                                    </Button>
                                    {/*<Button color="inherit" component={Link} to="/about">
                                        Acerca
                                    </Button>
                                    <Button color="inherit" component={Link} to="/faq">
                                        FAQ
                                    </Button>*/}

                                    {
                                        this.props.sesion.authenticated &&
                                        <Button color="inherit" onClick={this.handleSignOut}>Salir</Button>
                                    }

                                </Toolbar>

                            </Grid>
                        </Grid>
                    </AppBar>
                </div>
                {
                    /*
                     <Grid container className={classes.barDemo}justify={"center"} >
                    <Grid item xs={12} style={{textAlign: 'center'}}>
                        <Typography variant={"title"} className={classes.textoDemo}>
                            DEMO
                        </Typography>
                    </Grid>

                </Grid>
                   */
                }

            </div>
        );
    }
}

PDNAppBar.propTypes = {
    classes: PropTypes.object.isRequired
};



const mapStateToProps = (state, ownProps) => {
    let newState = {
        sesion: state.sesionReducer.sesion
    };
    return newState;
};
const mapDispatchToProps = (dispatch, ownProps) => ({
    newSesion: (sesion) => dispatch({type: 'SET_SESION', sesion}),
    removeSesion : () => dispatch({type : 'REMOVE_SESION'}),
});

let previo =  withStyles(styles)(PDNAppBar);
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(previo));