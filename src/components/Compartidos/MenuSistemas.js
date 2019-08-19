import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import {Link} from "react-router-dom";
import withWidth from "@material-ui/core/withWidth/withWidth";
import Tooltip from '@material-ui/core/Tooltip';


const style = theme => ({
    menuHamburguesa: {
        fill: "#808080",
        fontSize: "36px",
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        marginRight: theme.spacing(5),
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
                >
                    <Tooltip title={'Declaración patrimonial y de intereses'}>
                        <MenuItem component={Link} to="/declaraciones">
                            Declaraciones
                        </MenuItem>
                    </Tooltip>
                    <Tooltip title={'Servidores públicos que intervienen en contrataciones públicas'}>
                        <MenuItem component={Link} to="/servidores">
                            Servidores públicos en contrataciones públicas
                        </MenuItem>
                    </Tooltip>
                    <Tooltip title={'Servidores públicos y particulares sancionados'}>
                        <MenuItem component={Link} to="/sancionados">
                            Sancionados
                        </MenuItem>
                    </Tooltip>
                    <MenuItem component={Link} disabled={true} to="#">
                        Fiscalización
                    </MenuItem>
                    <MenuItem component={Link} disabled={true} to="/#">
                        Denuncias
                    </MenuItem>
                    <Tooltip title={'Contrataciones públicas'}>
                        <MenuItem component={Link} to="/contrataciones">
                            Contrataciones
                        </MenuItem>
                    </Tooltip>
                </Menu>
            </div>
        );
    }
};


export default withWidth()(withStyles(style)(MenuSistemas));
