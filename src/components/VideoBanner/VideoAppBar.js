import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {Link} from "react-router-dom";
import imgHeader from "../../assets/PDN-sintexto-blue.png";
import app from "../../config/firebase";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import {getPermisos, haySesion} from '../Seguridad/seguridad';
import {withRouter} from 'react-router-dom';

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
    },
    item: {
        maxWidth: 1200
    },
    href: {
        textDecoration: 'none',
        color: 'inherit'
    },
    blog: {
        textTransform: "none"
    }
});


class VideoAppBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentUser: null,
            loading: false,
            authenticated: false,
            anchorEl: null,
            permisos:[],
            haySesion : false,
        };
    };


    componentDidMount(){
        let _this = this;
        let x = getPermisos();
        haySesion().then((value)=>{
            _this.setState({
                haySesion: value
            })
        });
        this.setState({
            permisos :x,
        });
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
            this.props.history.push("/login");
        }).catch(e => {
            alert(e);
        })
    };

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

                    <Grid container spacing={0} justify="center">
                        <Grid item xs={12} className={classes.item}>
                            <Toolbar>
                                <IconButton color="inherit" aria-label="Menu" component={Link} to="/" style={{ marginTop: '28px'}}>
                                    <img src={imgHeader} alt="PDN" style={{height: '40px'}}/>
                                </IconButton>
                                <Typography variant="h6" color="inherit" className={classes.grow}>
                                </Typography>
                                 <div>
                                    <IconButton
                                        aria-owns={open ? 'menu-appbar' : undefined}
                                        aria-haspopup="true"
                                        onClick={this.handleMenu}
                                        color="inherit"
                                    >
                                        <MenuIcon style={{ fill: 'white', fontSize: '36px'}}/>
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
                                        <MenuItem component={Button}
                                                  href= "https://www.plataformadigitalnacional.org/blog"
                                                  className={classes.blog}
                                        >Blog</MenuItem>
                                        <MenuItem component={Link} to="/faq">Preguntas frecuentes</MenuItem>
                                        <MenuItem component={Link} to="/about">¿Qué es la PDN?</MenuItem>
                                        <MenuItem component={Link} to="/terminos">Términos de uso</MenuItem>
                                        {
                                            this.state.permisos.includes('admon-conexion-so:visit') &&
                                            <MenuItem component={Link} to={"/consolaAdmonSO"}>Administrar conexión</MenuItem>
                                        }
                                        {
                                            this.state.permisos.includes('admon-pdn-page:visit') &&
                                            <MenuItem component={Link} to={"/administracionPDN"}>Administrar PDN</MenuItem>
                                        }
                                        {
                                            this.state.haySesion===true &&
                                            <MenuItem onClick={this.handleSignOut}>Cerrar sesión</MenuItem>
                                        }
                                        {
                                            this.state.haySesion===false &&
                                            <MenuItem component={Link} to={"/login"}>Iniciar sesión</MenuItem>
                                        }
                                    </Menu>
                                </div>
                            </Toolbar>
                        </Grid>
                    </Grid>
                </AppBar>
            </div>
        );
    }
}

VideoAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

let previo = withRouter(VideoAppBar);
export default  withStyles(styles)(previo);