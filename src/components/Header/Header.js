import React from "react";
import {Link} from 'react-router-dom';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Button from '@material-ui/core/Button';
import imgHeader from "../../assets/img/logo_fondo_bco.png";

function Header(props){
    return (
        <AppBar color="white"  position="static" >

            <div style={{paddingLeft:'4em',paddingRight:'4em'}}>
                <div className="left">
                    <img src={imgHeader} alt="logoPDN" style={{width:'4em'}}/>
                </div>
                <div className="right">
                    <Button component={Link} to="/datos">
                        Datos
                    </Button>
                    <Button component={Link} to="/blog">
                        Blog
                    </Button>
                    <Button component={Link} to="/about">
                        Acerca
                    </Button>
                    <Button component={Link} to="/faq">
                        FAQ
                    </Button>
                </div>

            </div>
        </AppBar>
        );

}
export default Header;