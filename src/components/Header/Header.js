import React from "react";
import {Link} from 'react-router-dom';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Button from '@material-ui/core/Button';

function Header(props){
    var styles = {
        appBar: {
            flexWrap: 'wrap'
        },
        tabs: {
            width: '100%',
            color : 'black'
        }
    }
    return (
        <AppBar color="default" >
            <div className="textRight">
                <Button component={Link} to="/">
                    Principal
                </Button>
                <Button component={Link} to="/about">
                    Acerca de
                </Button>
                <Button component={Link} to="/faq">
                    FAQ
                </Button>
            </div>
        </AppBar>
        );

}
export default Header;