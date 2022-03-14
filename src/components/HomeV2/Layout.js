import React from 'react';
import Banner from './Banner';
import Version from "./Version";
import Footer from "./Footer/";
import ChatBotPDN from "../ChatBot/ChatBotPDN";

const Layout = ({children})=>{
    return (
        <React.Fragment>
            <Banner/>
            <Version/>
            {children}
            <ChatBotPDN/>
            <Footer/>
        </React.Fragment>
    );
};

export default Layout;