import React from "react";
import withStyles from '@mui/styles/withStyles';
import {
    AppBar, Box, Typography, IconButton, Menu, MenuItem,
    Button, List, ListItemButton, Collapse, Toolbar
} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import { MoreHoriz as MoreHorizIcon} from '@mui/icons-material';
import imgHeader from "../../assets/rediseno2023/imgs/iconos/logotipos/logo_pdn-transparente.svg";
import Especificaciones_logo from "../../assets/rediseno2023/imgs/iconos/menu/ico_especificaciones.svg";
import Mesa_logo from "../../assets/rediseno2023/imgs/iconos/menu/ico_mesa-ayuda.svg";
import MDA_logo from "../../assets/rediseno2023/imgs/iconos/menu/ico_mda.svg";
import Interconexion_logo from "../../assets/rediseno2023/imgs/iconos/menu/ico_interconexion.svg";
import Sistemas_logo from "../../assets/rediseno2023/imgs/iconos/menu/ico_sistemas.svg";
import LoginIcon from "../../assets/rediseno/ico_login.svg";
import legislacion_icono from "../../assets/rediseno2023/imgs/iconos/menu/ico_sistemas123.svg";
import icon_cobertura from "../../assets/rediseno2023/imgs/iconos/menu/ico_cobertura.svg";
import mapa_s2s3_icono from "../../assets/rediseno2023/imgs/iconos/menu/ico_legislacion.svg";
import ReactGA from "react-ga4";
import {UserContext} from "../Login/UserContext";

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
            backgroundColor: "#f7f7f7",
            width: '100%'
        },
    },
    menuItem: {
        backgroundColor: "#fff",
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(1),
        textTransform: "none",
        color: "#4a2f4b",
        justifyContent: 'space-between'
    },
    iconMenu:{
        fill: theme.palette.background.default,
        fontSize: theme.spacing(5)
    },
    iconSesion: {
        width: theme.spacing(5),
    },
});


const BannerMobile = props => {
    const {classes, setOpenLoginDialog} = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [dropDown, setDropDown] = React.useState(false);
    const [dropDownInterconexion, setDropDownInterconexion] = React.useState(false);
    const open = Boolean(anchorEl);
    const {systems} = props;

    const {user} = React.useContext(UserContext);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setDropDown(false);
    };

    const handleToggle = () => {
        setDropDown(!dropDown);
        setDropDownInterconexion(false);
    };

    const handleToggleInterconexion = () => {
        setDropDownInterconexion(!dropDownInterconexion);
        setDropDown(false);
    };

    const handleOpenLoginDialog = () => {
        setOpenLoginDialog(true);
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar
                position="static"
                style={{
                    background: "transparent linear-gradient(230deg, #1C7CBF 0%, #1C7CBF 4%, #9F58E2 49%, #6D4061 100%) 0% 0% no-repeat padding-box",
                    border: 0,
                    boxShadow: "none"
                }}
            >
                <Toolbar>
                    <IconButton className="burguer"
                        aria-owns={open ? "menu-appbar" : undefined}
                        aria-haspopup="true"
                        onClick={(event) => handleMenu(event)}
                        color= '#fff'
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

                        <MenuItem className={classes.menuItem} component={RouterLink} to="/mesa-de-ayuda">
                            <Typography style={{width:'100%'}}>MESA DE AYUDA</Typography>
                            <img src={Mesa_logo} alt="MESA DE AYUDA" className={classes.icon}/>
                        </MenuItem>
                        <MenuItem className={classes.menuItem} component={RouterLink} to="/especificaciones">
                            <Typography style={{width:'100%'}}>ESPECIFICACIONES</Typography>
                            <img src={Especificaciones_logo} alt="ESPECIFICACIONES" className={classes.icon}/>
                        </MenuItem>
                        <MenuItem className={classes.menuItem} component="a" onClick={() => handleToggle()}>
                            <Typography style={{width:'100%'}}>SISTEMAS</Typography>
                            <img src={Sistemas_logo} alt="SISTEMAS" className={classes.icon}/>
                        </MenuItem>

                        <Collapse in={dropDown} timeout="auto" unmountOnExit>
                            <List dense={true} component="div">
                                {systems.map(system => {
                                    return (
                                        <ListItemButton component={RouterLink} to={system.path} key={system.name}
                                                        className={classes.nested} >
                                            <img src={system.icon} alt={system.name} className={classes.iconSistemas}/>
                                            <Typography color={system.color}>{system.name}</Typography>
                                        </ListItemButton>
                                    )
                                })}

                            </List>
                        </Collapse>

                        <MenuItem className={classes.menuItem} component="a" onClick={() => handleToggleInterconexion()}>
                            <Typography style={{width:'100%'}}>INTERCONEXIÓN</Typography>
                            <img src={Interconexion_logo} alt="Interconexión subnacional" className={classes.icon}/>
                        </MenuItem>

                        <Collapse in={dropDownInterconexion} timeout="auto" unmountOnExit>
                            <List dense={true} component="div">
                                <ListItemButton href='/mapa-sla/' key='legislacion'
                                                className={classes.nested} onClick={()=>ReactGA.pageview('/mapa-sla')}>
                                    <img src={legislacion_icono} alt='Legislación' className={classes.iconSistemas}/>
                                    <Typography color={'#4a2f4b'}>Legislación</Typography>
                                </ListItemButton>
                                <ListItemButton href='/mapa-avance/' key='mapa'
                                                className={classes.nested} onClick={()=>ReactGA.pageview('/mapa-avance')}>
                                    <img src={mapa_s2s3_icono} alt='Avance' className={classes.iconSistemas}/>
                                    <Typography color='#4a2f4b'>Sistemas 1, 2 y 3</Typography>
                                </ListItemButton>

                                <ListItemButton component={RouterLink} to={'/cobertura'} key={'cobertura'} className={classes.nested}>
                                    <img src={icon_cobertura} alt={''} className={classes.iconSistemas}/>
                                    <Typography color={'#4a2f4b'}>Cobertura</Typography>
                                </ListItemButton>

                            </List>
                        </Collapse>

                        <MenuItem className={classes.menuItem} component={Button}
                                  href={import.meta.env.VITE_LINK_MDA}
                                  onClick={()=>ReactGA.pageview('/mda')}>
                            <Typography style={{width:'100%'}}>MDA</Typography>
                            <img src={MDA_logo} alt="Mercado Digital Anticorrupción" className={classes.icon}/>
                        </MenuItem>
                    </Menu>
                    <IconButton sx={{flexGrow: 1}}
                                color="inherit"
                                aria-label="Menu"
                                component={RouterLink}
                                to="/"
                                style={{marginTop: "10px", marginBottom: "10px"}}
                                size="large">
                        <img src={imgHeader} alt="PDN" style={{height: "40px"}}/>
                    </IconButton>
                    {user.loggedIn?
                        <img
                            src={LoginIcon}
                            className={classes.iconSesion}
                            alt="Terminar la sesión"
                            onClick={() => handleOpenLoginDialog()}
                        />
                        :
                        <img
                            src={LoginIcon}
                            className={classes.iconSesion}
                            alt="Iniciar sesión"
                            onClick={() => handleOpenLoginDialog()}
                        />
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default withStyles(styles)(BannerMobile);
