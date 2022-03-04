import React from 'react';
import Banner from './Banner';
import Version from "./Version";
import Footer from "./Footer/";
const Layout = ({children})=>{
    return (
        <React.Fragment>
            <Banner/>
            <Version/>
            {children}
            <Footer/>
        </React.Fragment>
    );
};

export default Layout;