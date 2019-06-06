import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
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
import Collapse from "@material-ui/core/Collapse/Collapse";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";

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
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    }
});


class VideoAppBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            loading: false,
            authenticated: false,
            anchorEl: null,
            permisos: [],
            haySesion: false,
            open2: false,
        };
    };


    componentDidMount() {
        let _this = this;
        let x = getPermisos();
        haySesion().then((value) => {
            _this.setState({
                haySesion: value
            })
        });
        this.setState({
            permisos: x,
        });
    };

    handleSignOut = () => {
        app.auth().signOut().then(() => {
            this.props.history.push("/login");
        }).catch(e => {
            alert(e);
        })
    };

    handleChange = event => {
        this.setState({auth: event.target.checked});
    };

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null, open2: false});
    };

    handleToggle = () => {
        this.setState({
            open2: !this.state.open2,
        })
    };


    render() {
        const {classes} = this.props;

        const {anchorEl, open2} = this.state;
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
                                <IconButton color="inherit" aria-label="Menu" component={Link} to="/"
                                            style={{marginTop: '28px'}}>
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
                                        <MenuIcon style={{fill: 'white', fontSize: '36px'}}/>
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
                                                  href="https://www.plataformadigitalnacional.org/blog"
                                                  className={classes.blog}
                                        >Blog</MenuItem>
                                        <MenuItem component={Link} to="/faq">Preguntas frecuentes</MenuItem>
                                        <MenuItem component={Link} to="/about">¿Qué es la PDN?</MenuItem>
                                        <MenuItem component={Link} to="/terminos">Términos de uso</MenuItem>
                                        {/*<MenuItem component={Link} to="/especificaciones">Especificaciones</MenuItem>*/}
                                        <MenuItem
                                            onClick={this.handleToggle}> Especificaciones {open2 != null ? open2 ?
                                            <ExpandLess/> : <ExpandMore/> : null}
                                        </MenuItem>
                                        <Collapse in={this.state.open2} timeout="auto" unmountOnExit>
                                            <List component={"div"}>

                                                <ListItem button component={Link}
                                                          to="/declaraciones/especificaciones" className={classes.nested}>
                                                    <Typography> Sistema 1</Typography>
                                                </ListItem>
                                                <ListItem button component={Link} to="/intervienen/especificaciones" className={classes.nested}>
                                                    <Typography>Sistema 2</Typography>

                                                </ListItem>
                                                <ListItem button component={Link} to="/sancionados/especificaciones" className={classes.nested}>
                                                    <Typography>Sistema 3</Typography>
                                                </ListItem>

                                            </List>

                                        </Collapse>
                                        {
                                            this.state.permisos.includes('admon-conexion-so:visit') &&
                                            <MenuItem component={Link} to={"/consolaAdmonSO"}>Administrar
                                                conexión</MenuItem>
                                        }
                                        {
                                            this.state.permisos.includes('admon-pdn-page:visit') &&
                                            <MenuItem component={Link} to={"/administracionPDN"}>Administrar
                                                PDN</MenuItem>
                                        }
                                        {
                                            this.state.haySesion === true &&
                                            <MenuItem onClick={this.handleSignOut}>Cerrar sesión</MenuItem>
                                        }
                                        {
                                            this.state.haySesion === false &&
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
export default withStyles(styles)(previo);