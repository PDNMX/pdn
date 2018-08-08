import React from "react";
import {Link} from 'react-router-dom';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Button from '@material-ui/core/Button';
import imgHeader from "../../assets/img/logo_fondo_bco.png";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Header extends React.Component {

    render(){
        const {classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar color="default"  position="static" >
                    {/*
                <div style={{paddingLeft:'100px',paddingRight:'100px'}}>
                    <div className="left">
                        <img src={imgHeader} alt="logoPDN" style={{width:'4em'}}/>
                    </div>
                    <div className="right">
                        <Button component={Link} to="/datos">
                            Datos
                        </Button>
                        <Button component={Link} to="/blog">
                            Blog
                        </Button>
                        <Button component={Link} to="/about">
                            Acerca
                        </Button>
                        <Button component={Link} to="/faq">
                            FAQ
                        </Button>
                    </div>
                </div>
                */}

                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex} component={Link} to="/">
                            PDN
                        </Typography>

                        <Button color="inherit" component={Link} to="/datos">
                            Datos
                        </Button>
                        <Button color="inherit" component={Link} to="/blog">
                            Blog
                        </Button>
                        <Button color="inherit" component={Link} to="/about">
                            Acerca
                        </Button>
                        <Button color="inherit" component={Link} to="/faq">
                            FAQ
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header.propTypes= {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);