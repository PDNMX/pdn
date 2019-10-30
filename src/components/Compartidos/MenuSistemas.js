import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import {Link} from "react-router-dom";
import withWidth from "@material-ui/core/withWidth/withWidth";
//import Tooltip from '@material-ui/core/Tooltip';
import {ListItemText, Typography} from "@material-ui/core";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from "@material-ui/core/Collapse/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const style = theme => ({
    menuHamburguesa: {
        fill: "#808080",
        fontSize: "36px",
    },
    text: {
        whiteSpace: "initial"
    },
    aux: {
        textTransform: "none"
    },
    divider:{
        marginTop: theme.spacing(1)
    },
    subList: {
        paddingLeft: theme.spacing(1)
    }
});

class MenuSistemas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open2: false
        };
    }


    handleClose = () => {
        this.setState({anchorEl: null, open2: false});
    };
    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleToggle = () => {
        this.setState({
            open2: !this.state.open2,
        })
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
                >

                    <MenuItem component={Link} to="/mesa-de-ayuda">
                        <Typography className={classes.text} variant="inherit" noWrap>{"Mesa de ayuda"}</Typography>
                    </MenuItem>
                    <MenuItem component={Button} className={classes.aux}
                              href="https://www.plataformadigitalnacional.org/blog">Blog</MenuItem>
                    <MenuItem component={Link} to="/gaa/calidad">
                        <Typography className={classes.text} variant="inherit" noWrap>{"Calidad de datos"}</Typography>
                    </MenuItem>
                    <MenuItem component={Link} to="/especificaciones">
                        <Typography className={classes.text} variant="inherit" noWrap>{"Especificaciones"}</Typography>
                    </MenuItem>
                    <MenuItem component={Button} className={classes.aux}
                              href="https://plataformadigitalnacional.org/mapa-sla/">
                        Interconexión subnacional
                    </MenuItem>

                    <Divider className={classes.divider}/>
                    <List component='div' dense={true}>
                        <ListItem button onClick={this.handleToggle}>
                            <ListItemText primary='Sistemas' className={classes.listItemText}/>
                            {this.state.open2 != null ? this.state.open2 ?
                            <ExpandLess/> : <ExpandMore/> : null}
                        </ListItem>

                        <Collapse in={this.state.open2} timeout="auto" unmountOnExit>
                            <List dense={true} component="div" className={classes.subList}>
                                {/*<Tooltip
                                    title={"Sistema de evolución patrimonial, de declaración de intereses y constancia de presentación de declaración fiscal"}>
                                    */}
                                <ListItem button component={Link} to={"/declaraciones"}>
                                    <ListItemText primary='Declaraciones'/>
                                </ListItem>
                                {/*</Tooltip>*/}

                                {/*<Tooltip
                                    title={"Sistema de los Servidores públicos que intervengan en procedimientos de contrataciones públicas"}>
                                    */}
                                <ListItem button component={Link} to={"/servidores"}>
                                    <ListItemText primary='S. P. En contrataciones'/>
                                </ListItem>
                                {/*</Tooltip>*/}

                                {/*<Tooltip
                                    title={"Sistema nacional de Servidores públicos y particulares sancionados"}>
                                    */}
                                <ListItem button component={Link} to={"/sancionados"}>
                                    <ListItemText primary='Sancionados'/>
                                </ListItem>
                                {/*</Tooltip>*/}

                                {/*<Tooltip
                                    title={"Sistema de información y comunicación del Sistema Nacional y del Sistema Nacional de Fiscalización"}>
                                    */}
                                <ListItem button component={Link} to={"#"} disabled={true}>
                                    <ListItemText primary='Fiscalización'/>
                                </ListItem>
                                {/*</Tooltip>*/}

                                {/*<Tooltip
                                    title={"Sistema de denuncias públicas de faltas administrativas y hechos de corrupción"}>
                                    */}
                                <ListItem button component={Link} to={"#"} disabled={true}>
                                    <ListItemText primary='Denuncias'/>
                                </ListItem>
                                {/*</Tooltip>*/}

                                {/*<Tooltip
                                    title={"Sistema de Información Pública de Contrataciones"}>*/}
                                <ListItem button component={Link} to={"/contrataciones"}>
                                    <ListItemText primary='Contrataciones'/>
                                </ListItem>
                                {/*</Tooltip>*/}
                            </List>
                        </Collapse>
                    </List>
                </Menu>
            </div>
        );
    }
};


export default withWidth()(withStyles(style)(MenuSistemas));
