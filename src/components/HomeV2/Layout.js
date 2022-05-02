import React from 'react';
import Banner from './Banner';
import Version from "./Version";
import Footer from "./Footer/";
import ChatBotPDN from "../ChatBot/ChatBotPDN";
import Glosario from "../Glosario/";

import style from '../Declaraciones2/style';
import { makeStyles } from '@mui/styles';
import useAnalyticsEventTracker from '../useAnalyticsEventTracker';

const useStyles=makeStyles(style);

const Layout = ({children})=>{
    const classes = useStyles();
    const gaEventTracker = useAnalyticsEventTracker('inicio');
    return (
        <React.Fragment>
            <div className={classes.backgroundCruces}>
                <Banner/>
                <Version/>
                {children}
                <Glosario/>
                <ChatBotPDN onClick={()=>gaEventTracker('chatbot')}/>
                <Footer/>
            </div>            
        </React.Fragment>
    );
};

export default Layout;
