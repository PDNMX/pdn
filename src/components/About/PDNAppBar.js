import React from "react";
import {AppBar, Toolbar, Typography, IconButton, Grid, MenuItem, Menu, Button} from "@mui/material";
import imgHeader from "../../assets/about/logo-PDN-mini.svg";
import {withStyles} from '@mui/styles';
import PropTypes from 'prop-types';
import MenuIcon from '@mui/icons-material/Menu';
//import AccountCircle from '@material-ui/icons/AccountCircle';
import {Link} from 'react-router-dom';


const styles = theme => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(1.7)
    },
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        [theme.breakpoints.up('sm')]:{
            //marginLeft: '80px'
        },
        [theme.breakpoints.down('sm')]:{
            //marginLeft: theme.spacing(1)
        },
        //marginRight: 20,
    },
    lastButton: {
        [theme.breakpoints.up('sm')]: {
            //marginRight: '80px'
        }
    },
    blog: {
        textTransform: "none"
    }
});

class PDNAppBar extends React.Component {

    state = {
        achorEl: null
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
        const {classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <AppBar color="default"  position="static" >
                    <Grid container justify="center" spacing={0}>
                        <Grid item xs={12} style ={{maxWidth: '1024px'}}>
                            <Toolbar>
                                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" component={Link} to='/'>
                                    <img src={imgHeader} alt="logoPDN" style={{width:'55px'}}/>

                                </IconButton>
                                <Typography variant="h6" color="inherit" className={classes.flex}>

                                </Typography>

                                {/*<Button color="inherit" href="/datos">
                            Datos
                        </Button>*/}


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
                                        <MenuItem onClick={this.handleClose} component={Button}
                                                  href = "https://www.plataformadigitalnacional.org/blog/"
                                                  className={classes.blog}
                                        >
                                            Blog
                                        </MenuItem>
                                        <MenuItem onClick={this.handleClose} component={Link} to="/faq">Preguntas frecuentes</MenuItem>
                                        <MenuItem onClick={this.handleClose} component={Link} to="/about">¿Qué es la PDN?</MenuItem>
                                        <MenuItem onClick={this.handleClose} component={Link} to="/terminos">Términos de uso</MenuItem>
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

PDNAppBar.propTypes= {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PDNAppBar);