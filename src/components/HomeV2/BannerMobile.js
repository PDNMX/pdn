import React from "react";
import withStyles from '@mui/styles/withStyles';
import {
    AppBar, Box, Typography, IconButton, Menu, MenuItem,
    Button, List, ListItem, Collapse, Toolbar} from "@mui/material";
import {Link} from "react-router-dom";
import { MoreHoriz as MoreHorizIcon} from '@mui/icons-material';
import imgHeader from "../../assets/rediseno/logo_pdn.svg";
import Especificaciones_logo from "../../assets/rediseno/ico_especificaciones.svg";
import Mesa_logo from "../../assets/rediseno/ico_mesa-ayuda.svg";
import MDA_logo from "../../assets/rediseno/ico_mda.svg";
import Interconexion_logo from "../../assets/rediseno/ico_interconexion.svg";
import Sistemas_logo from "../../assets/rediseno/ico_sistemas_f.svg";
import LoginIcon from "../../assets/rediseno/ico_login.svg";

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#3e5866',
    },
    icon: {
        width: theme.spacing(4),
        margin: 'auto'
    },
    iconSistemas: {
        width: theme.spacing(5),
        marginRight: theme.spacing(3)
    },
    link: {
        textDecoration: "none",

    },
    text: {
        flexGrow: 1,
        color: "#b2bfc4"
    },
    nested: {
        paddingLeft: theme.spacing(3)
    },
    menu: {
        "& .MuiPaper-root": {
            backgroundColor: "#0d3b49",
            width: '100%'
        },
    },
    menuItem: {
        backgroundColor: "#1a4653",
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(1),
        textTransform: "none",
        color: "#ced8db",
        justifyContent: 'space-between'
    },
    iconMenu:{
        fill: theme.palette.azul.pdn,
        fontSize: theme.spacing(5)
    },
    iconSesion: {
        width: theme.spacing(5),
    },
});


const BannerMobile = props => {
    const {classes} = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [dropDown, setDropDown] = React.useState(false);
    const open = Boolean(anchorEl);
    const {systems} = props;

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setDropDown(false);
    };

    const handleToggle = () => {
        setDropDown(!dropDown);
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar
                position="static"
                style={{
                    backgroundColor: "#3e5866",
                    border: 0,
                    boxShadow: "none"
                }}
            >
                <Toolbar>
                    <IconButton
                        aria-owns={open ? "menu-appbar" : undefined}
                        aria-haspopup="true"
                        onClick={(event) => handleMenu(event)}
                        color="inherit"
                        size="large">
                        <MoreHorizIcon className={classes.iconMenu}/>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right"
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        open={open}
                        onClose={() => handleClose()}
                        className={classes.menu}
                        PopoverClasses={classes.test}
                    >

                        <MenuItem className={classes.menuItem} component={Link} to="/mesa-de-ayuda">
                            <Typography style={{width:'100%'}}>MESA DE AYUDA</Typography> <img src={Mesa_logo} alt="MESA DE AYUDA" className={classes.icon}/>
                        </MenuItem>
                        <MenuItem className={classes.menuItem} component={Link} to="/especificaciones">
                            <Typography style={{width:'100%'}}>ESPECIFICACIONES</Typography><img src={Especificaciones_logo} alt="ESPECIFICACIONES" className={classes.icon}/>
                        </MenuItem>
                        <MenuItem className={classes.menuItem} component={"a"} onClick={() => handleToggle()}>
                            <Typography style={{width:'100%'}}>SISTEMAS</Typography><img src={Sistemas_logo} alt="SISTEMAS" className={classes.icon}/>
                        </MenuItem>
                            <Collapse in={dropDown} timeout="auto" unmountOnExit>
                                <List dense={true} component="div">
                                    {systems.map(system => {
                                        return (
                                        <ListItem button component={Link} to={system.url} key={system.name}
                                                  className={classes.nested} disabled={system.disabled}>
                                            <img src={system.icon} alt={system.name} className={classes.iconSistemas}/>
                                            <Typography color={system.color}>{system.name}</Typography>
                                        </ListItem>
                                        )
                                    })}
                                </List>
                            </Collapse>
                        <MenuItem className={classes.menuItem} component={Button}
                                  href="https://www.plataformadigitalnacional.org/mapa-sla/">
                            <Typography style={{width:'100%'}}>INTERCONEXIÓN</Typography><img src={Interconexion_logo} alt="Interconexión subnacional"
                                              className={classes.icon}/>
                        </MenuItem>
                        <MenuItem className={classes.menuItem} component={Button}
                                  href="https://mda.plataformadigitalnacional.org/">
                            <Typography style={{width:'100%'}}>MDA</Typography><img src={MDA_logo} alt="Mercado Digital Anticorrupción" className={classes.icon}/>
                        </MenuItem>
                    </Menu>
                    <IconButton sx={{flexGrow: 1}}
                                color="inherit"
                                aria-label="Menu"
                                component={Link}
                                to="/"
                                style={{marginTop: "10px", marginBottom: "10px"}}
                                size="large">
                        <img src={imgHeader} alt="PDN" style={{height: "40px"}}/>
                    </IconButton>
                    <img
                        src={LoginIcon}
                        className={classes.iconSesion}
                        alt="Iniciar sesión"
                    />
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default withStyles(styles)(BannerMobile);
