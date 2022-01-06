import React from "react";
import withStyles from '@mui/styles/withStyles';
import {
    AppBar, Box, Typography, Grid, IconButton, ListItemText, Menu, MenuItem,
    Button, Divider, List, ListItem, Collapse, Toolbar, ListItemIcon, MenuList
} from "@mui/material";
import {Link} from "react-router-dom";
import {ExpandLess, ExpandMore, MoreHoriz as MoreHorizIcon} from '@mui/icons-material';
import imgHeader from "../../assets/rediseno/logo_pdn.svg";
import Espe from "../../assets/rediseno/ico_especificaciones.svg";
import Mesa from "../../assets/rediseno/ico_mesa-ayuda.svg";
import MDA from "../../assets/rediseno/ico_mda.svg";
import Sistemas from "../../assets/rediseno/ico_sistemas_f.svg";
import Interconexion from "../../assets/rediseno/ico_interconexion.svg";
import LoginIcon from "../../assets/rediseno/ico_login.svg";
import SistemasMenu from "./SistemasMenu";
import S1_logo from "../../assets/rediseno/ico_s1_color.svg";
import S2_logo from "../../assets/rediseno/ico_s2_color.svg";
import S3_logo from "../../assets/rediseno/ico_s3_color.svg";
import S4_logo from "../../assets/rediseno/ico_s4_color.svg";
import S5_logo from "../../assets/rediseno/ico_s5_color.svg";
import S6_logo from "../../assets/rediseno/ico_s6_color.svg";


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#3e5866',

    },
    item: {
        maxWidth: 1000
    },
    opc: {
        "&:hover": {
            backgroundColor: "#64808f"
        },
        paddingBottom: 20,
        textAlign: 'center'
    },
    icon: {
        width: 20,
        margin: 'auto'
    },
    iconSistemas: {
        width: 20,
        marginRight: 10
    },
    link: {
        textDecoration: "none",
        color: "#b2bfc4"
    },
    text: {
        flexGrow: 1,
        color: "#b2bfc4"
    },
    iconSesion: {
        width: 60,
        paddingTop: 20,
        paddingBottom: 0
    },
    iconPDN: {
        height: 60,
        marginRight: 20,
        marginLeft: 20
    },
    containerIconPDN: {
        display: 'flex',
        alignItems: 'center'
    },
    nested: {
        paddingLeft: theme.spacing(4)
    },
    menu: {
        "& .MuiPaper-root": {
            backgroundColor: "#0d3b49"
        }
    },
    menuItem: {
        backgroundColor: "#1a4653",
        marginRight: 8,
        marginLeft: 8,
        marginBottom: 4,
        textTransform: "none",
        color: "#b2bfc4"
    }
});


const BannerMobile = props => {
    const {classes} = props;
    const [showSistemas, setShowSistemas] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [dropDown, setDropDown] = React.useState(false);
    const [dropDown2, setDropDown2] = React.useState(false);
    const open = Boolean(anchorEl);

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

    const handleToggle2nd = () => {
        setDropDown2(!dropDown2);
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
                        <MoreHorizIcon style={{fill: "white", fontSize: "36px"}}/>
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
                    >

                        <MenuItem className={classes.menuItem} component={Link} to="/mesa-de-ayuda">
                            MESA DE AYUDA <img src={Mesa} alt="MESA DE AYUDA" className={classes.icon}/>
                        </MenuItem>
                        <MenuItem className={classes.menuItem} component={Link} to="/especificaciones">
                            ESPECIFICACIONES<img src={Espe} alt="ESPECIFICACIONES" className={classes.icon}/>
                        </MenuItem>
                        <MenuItem className={classes.menuItem} component={"a"} onClick={() => handleToggle()}>
                            SISTEMAS<img src={Mesa} alt="SISTEMAS" className={classes.icon}/>
                        </MenuItem>
                            <Collapse className={classes.menuItem} in={dropDown} timeout="auto" unmountOnExit>
                                <List dense={true} component="div">
                                    <ListItem button component={Link} to={"/declaraciones"}
                                              className={classes.nested}>
                                        <img src={S1_logo} alt="Declaraciones" className={classes.iconSistemas}/>
                                        <ListItemText primary='Declaraciones'/>
                                    </ListItem>
                                    <ListItem button component={Link} to={"/servidores"} className={classes.nested}>
                                        <img src={S2_logo} alt="S. P. En contrataciones"
                                             className={classes.iconSistemas}/>
                                        <ListItemText primary='S. P. En contrataciones'/>
                                    </ListItem>
                                    <ListItem button component={Link} to={"/sancionados"}
                                              className={classes.nested}>
                                        <img src={S3_logo} alt="Sancionados" className={classes.iconSistemas}/>
                                        <ListItemText primary='Sancionados'/>
                                    </ListItem>
                                    <ListItem button component={Link} to={"#"} disabled={true}
                                              className={classes.nested}>
                                        <img src={S4_logo} alt="Fiscalización" className={classes.iconSistemas}/>
                                        <ListItemText primary='Fiscalización'/>
                                    </ListItem>
                                    <ListItem button component={Link} to={"#"} disabled={true}
                                              className={classes.nested}>
                                        <img src={S5_logo} alt="Denuncias" className={classes.iconSistemas}/>
                                        <ListItemText primary='Denuncias'/>
                                    </ListItem>
                                    <ListItem button component={Link} to={"/contrataciones"}
                                              className={classes.nested}>
                                        <img src={S6_logo} alt="Contrataciones" className={classes.iconSistemas}/>
                                        <ListItemText primary='Contrataciones'/>
                                    </ListItem>
                                </List>
                            </Collapse>

                        <MenuItem className={classes.menuItem} component={Button}
                                  href="https://www.plataformadigitalnacional.org/mapa-sla/">
                            INTERCONEXIÓN<img src={Interconexion} alt="Interconexión subnacional"
                                              className={classes.icon}/>
                        </MenuItem>
                        <MenuItem className={classes.menuItem} component={Button}
                                  href="https://mda.plataformadigitalnacional.org/">
                            MDA<img src={MDA} alt="Mercado Digital Anticorrupción" className={classes.icon}/>
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
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default withStyles(styles)(BannerMobile);
