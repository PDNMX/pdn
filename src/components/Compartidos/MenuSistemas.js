import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import {Link} from "react-router-dom";
import withWidth from "@material-ui/core/withWidth/withWidth";
import Tooltip from '@material-ui/core/Tooltip';
import {Typography} from "@material-ui/core";


const style = theme => ({
    menuHamburguesa: {
        fill: "#808080",
        fontSize: "36px",
    }

});

class MenuSistemas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };
    }


    handleClose = () => {
        this.setState({anchorEl: null, open2: false});
    };
    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    render() {
        const {classes} = this.props;
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);

        return (
            <div>
                <IconButton
                    aria-owns={open ? "menu-appbar" : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                    style={{marginTop: "28px"}}
                >
                    <MenuIcon className={classes.menuHamburguesa}/>
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    open={open}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: 200,
                        },
                    }}
                >
                    <MenuItem component={Link} to="/declaraciones">
                        <Tooltip title={'Declaración patrimonial y de intereses'}>
                            <Typography variant="inherit" noWrap>{"Declaraciones"}</Typography>
                        </Tooltip>
                    </MenuItem>
                    <MenuItem component={Link} to="/servidores">
                        <Tooltip title={'Servidores públicos que intervienen en contrataciones públicas'}>
                            <Typography variant="inherit" noWrap>{"Servidores públicos en contrataciones públicas"}</Typography>
                        </Tooltip>
                    </MenuItem>
                    <MenuItem component={Link} to="/sancionados">
                        <Tooltip title={'Servidores públicos y particulares sancionados'}>
                            <Typography variant="inherit" noWrap>{"Sancionados"}</Typography>
                        </Tooltip>
                    </MenuItem>
                    <MenuItem component={Link} disabled={true} to="#">
                        <Typography variant="inherit" noWrap>{"Fiscalización"}</Typography>
                    </MenuItem>
                    <MenuItem component={Link} disabled={true} to="/#">
                        <Typography variant="inherit" noWrap>{"Denuncias"}</Typography>
                    </MenuItem>
                    <MenuItem component={Link} to="/contrataciones">
                        <Tooltip title={'Contrataciones públicas'}>
                            <Typography variant="inherit" noWrap>{"Contrataciones"}</Typography>
                        </Tooltip>
                    </MenuItem>

                </Menu>
            </div>
        );
    }
};


export default withWidth()(withStyles(style)(MenuSistemas));
