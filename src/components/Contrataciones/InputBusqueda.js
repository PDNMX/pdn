import React from 'react'
import {withStyles} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import PropTypes from 'prop-types';
//import rp from 'request-promise';

const styles = theme => ({
    root: {
        padding: '2px 0px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },
});

class InputBusqueda extends React.Component{

    handleSearch = e => {
        if (e.key === 'Enter'){
            this.props.search();
        }
    };

    render(){

        const {classes} = this.props;

        return (
            <Paper className={classes.root}>
                <IconButton className={classes.iconButton} aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <InputBase
                    className={classes.input}
                    placeholder="Buscar contrataciones..."
                    inputProps={{ 'aria-label': 'buscar contrataciones' }}
                    onChange = { e => this.props.setInputText(e.target.value)}
                    onKeyDown={ e => this.handleSearch(e)}
                />
                <IconButton className={classes.iconButton} aria-label="search" onClick={e => this.props.search()}>
                    <SearchIcon />
                </IconButton>
                <Divider className={classes.divider} />
                <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                    <DirectionsIcon />
                </IconButton>
            </Paper>
        );
    }
}


InputBusqueda.propTypes = {
  classes : PropTypes.object.isRequired
};



export default withStyles(styles)(InputBusqueda);