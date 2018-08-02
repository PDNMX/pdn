import React from "react";
import {Link} from 'react-router-dom';

function Header(props){
    return (
            <div>
                <Link to="/"> Principal </Link>
                <Link to="/about">Acerca de </Link>
                <Link to="/faq">FAQ </Link>
            </div>
        );

}
export default Header;