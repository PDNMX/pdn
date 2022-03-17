import React from 'react';
import Banner from './Banner';
import Version from "./Version";
import Footer from "./Footer/";
import ChatBotPDN from "../ChatBot/ChatBotPDN";

import style from '../Declaraciones2/style';
import { makeStyles } from '@mui/styles';

const useStyles=makeStyles(style);

const Layout = ({children})=>{
    const classes = useStyles();
    return (
        <React.Fragment>
            <div className={classes.backgroundCruces}>
                <Banner/>
                <Version/>
                {children}
                <ChatBotPDN/>
                <Footer/>
            </div>            
        </React.Fragment>
    );
};

export default Layout;