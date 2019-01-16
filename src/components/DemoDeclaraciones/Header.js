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
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Input from "@material-ui/core/Input/Input";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    flex: {
        flexGrow: 1,
    },
    gridItem: {
        maxWidth: '1024px'
    },
    avatar:{
        display:'inline-block'
    },
    inputCss:{
        overflow : 'hidden',
        textOverflow : 'ellipsis'
    }
});

class PDNAppBar extends React.Component {
    state = {
        auth: true,
        anchorEl: null,
        user: 'Auditor Superior de la Federación',
        open: false
    };

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    render() {
        const {classes, user, handleChangeUser, srcAvatar} = this.props;

        let propsMenu = {
            backgroundColor: 'blue'
        };
        return (
                <div className={classes.root}>
                    <AppBar color="default" position="static">
                        <Grid container spacing={0} justify='center'>
                            <Grid item xs={12} className={classes.gridItem}>
                                <Toolbar>
                                    <IconButton color="inherit" aria-label="Menu" component={Link} to="/">
                                        <img src={imgHeader} alt="logoPDN" style={{width: '110px'}}/>
                                    </IconButton>
                                    <Typography variant="title" color="inherit" className={classes.flex}>

                                    </Typography>
                                    <Avatar src={srcAvatar} />
                                    <div>
                                        <Select
                                            value={user}
                                            onChange={handleChangeUser}
                                            name={'selectProfile'}
                                            SelectDisplayProps={{
                                                id:'testIsela',
                                                className:classes.inputCss
                                            }}
                                        >
                                            <MenuItem value={'profile_4'}>Auditor Superior de
                                                la Federación</MenuItem>
                                            <MenuItem value={'profile_2'}>Secretario de la
                                                Función Pública</MenuItem>
                                            <MenuItem value={'profile_1'} >Ministerio
                                                público</MenuItem>
                                            <MenuItem value={'profile_3'}>Público</MenuItem>
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

PDNAppBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PDNAppBar);