import React from "react";
import {Link} from 'react-router-dom';
import AppBar from "@material-ui/core/AppBar/AppBar";
import imgHeader from "../../assets/img/Demo.PNG";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Avatar from "@material-ui/core/Avatar/Avatar";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";


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
    state = {
        auth: true,
        anchorEl: null,
        user :'Auditor Superior de la Federación',
        open : false
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    render(){
        const {classes ,user,handleChangeUser,srcAvatar} = this.props;

        return (
            <div className={classes.root}>
                <AppBar color="default"  position="static" >

                    <Grid container spacing={0} justify='center'>
                        <Grid item xs={12} className={ classes.gridItem}>
                            <Toolbar>
                                <IconButton  color="inherit" aria-label="Menu" component={Link} to="/">
                                    <img src={imgHeader} alt="logoPDN" style={{width:'110px'}}/>

                                </IconButton>
                                <Typography variant="title" color="inherit" className={classes.flex}>

                                </Typography>
                                <div>
                                    <IconButton
                                        aria-owns={this.state.open ? 'menu-appbar' : null}
                                        aria-haspopup="true"
                                        onClick={this.handleMenu}
                                        color="inherit"
                                    >
                                        <Avatar src={srcAvatar} className={classes.avatar}/>
                                    </IconButton>
                                    <Select
                                        id="menu-appbar"
                                        open={this.state.open}
                                        onClose={this.handleClose}
                                        value = {user}
                                        onChange = {handleChangeUser}
                                        onOpen={this.handleOpen}
                                    >
                                        <MenuItem value={'Auditor Superior de la Federación'}  onClick={this.handleClose}>Auditor Superior de la Federación</MenuItem>
                                        <MenuItem value={'Secretario de la Función Pública'}  onClick={this.handleClose}>Secretario de la Función Pública</MenuItem>
                                        <MenuItem value={'UST-Subdirector de área'}  onClick={this.handleClose}>UST-Subdirector de área</MenuItem>
                                    </Select>
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