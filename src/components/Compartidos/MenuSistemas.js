import React from 'react';
import {withStyles} from '@mui/styles';
import {MenuItem, Menu, IconButton,ListItemText, Typography,Collapse, List, ListItem, Divider, Button } from "@mui/material";
import {Link} from "react-router-dom";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/MoreHoriz';

const style = theme => ({
    menu: {
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
    nested: {
        paddingLeft: theme.spacing(4)
    }
});

class MenuSistemas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            dropDown: false,
            dropDown2: false
        };
    }

    handleClose = () => {
        this.setState({anchorEl: null, dropDown: false});
    };
    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleToggle = () => {
        this.setState({
            dropDown: !this.state.dropDown,
        })
    };

    handleToggle2nd = () => {
        this.setState({
            dropDown2: !this.state.dropDown2,
        })
    };


    render() {
        const {classes} = this.props;
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);
        const {dropDown, dropDown2} = this.state;

        return (
            <div>
                <IconButton
                    aria-owns={open ? "menu-appbar" : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                    style={{marginTop: "28px"}}
                >
                    <MenuIcon className={classes.menu}/>
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
                              href="https://www.plataformadigitalnacional.org/blog">
                        Blog
                    </MenuItem>
                    <MenuItem component={Link} to="/especificaciones">
                        <Typography className={classes.text} variant="inherit" noWrap>{"Especificaciones"}</Typography>
                    </MenuItem>
                    <MenuItem component={Button} className={classes.aux}
                              href="https://www.plataformadigitalnacional.org/mapa-sla/">
                        Interconexión subnacional
                    </MenuItem>

                    <Divider className={classes.divider}/>

                    <List component='div' dense={true} style={{paddingBottom: 0}}>
                        <ListItem button onClick={this.handleToggle}>
                            <ListItemText primary='Sistemas'/>
                            {dropDown != null ? dropDown ?
                            <ExpandLess/> : <ExpandMore/> : null}
                        </ListItem>

                        <Collapse in={dropDown} timeout="auto" unmountOnExit>
                            <List dense={true} component="div">
                                <ListItem button component={Link} to={"/declaraciones"} className={classes.nested}>
                                    <ListItemText primary='Declaraciones'/>
                                </ListItem>
                                <ListItem button component={Link} to={"/servidores"} className={classes.nested}>
                                    <ListItemText primary='S. P. En contrataciones'/>
                                </ListItem>
                                <ListItem button component={Link} to={"/sancionados"} className={classes.nested}>
                                    <ListItemText primary='Sancionados'/>
                                </ListItem>
                                <ListItem button component={Link} to={"#"} disabled={true} className={classes.nested}>
                                    <ListItemText primary='Fiscalización'/>
                                </ListItem>
                                <ListItem button component={Link} to={"#"} disabled={true} className={classes.nested}>
                                    <ListItemText primary='Denuncias'/>
                                </ListItem>
                                <ListItem button component={Link} to={"/contrataciones"} className={classes.nested}>
                                    <ListItemText primary='Contrataciones'/>
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>


                    <List component='div' dense={true} style={{paddingTop:0}}>
                        <ListItem button onClick={this.handleToggle2nd}>
                            <ListItemText primary='Avance interconexión'/>
                            {dropDown2 != null ? dropDown2 ?
                                <ExpandLess/> : <ExpandMore/> : null}
                        </ListItem>

                        <Collapse in={dropDown2} timeout="auto" unmountOnExit>
                            <List dense={true} component="div">
                                <ListItem button component={Button}
                                          href="https://www.plataformadigitalnacional.org/mapa-sla/"
                                          className={classes.nested}
                                          style={{textTransform: "none"}}
                                >
                                    <ListItemText primary='Legislación'/>
                                </ListItem>
                                <ListItem button
                                          component={Button}
                                          href="https://www.plataformadigitalnacional.org/mapa-avance/"
                                          className={classes.nested}
                                          style={{textTransform: "none"}}
                                >
                                    <ListItemText primary='Sistemas 2 y 3'/>
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>



                </Menu>
            </div>
        );
    }
}

//export default withWidth()(withStyles(style)(MenuSistemas));
export default withStyles(style)(MenuSistemas);
