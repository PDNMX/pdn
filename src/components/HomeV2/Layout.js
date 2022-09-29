import React from 'react';
import Banner from './Banner';
import Version from "./Version";
import Footer from "./Footer/";
import ChatBotPDN from "../ChatBot/ChatBotPDN";
import Glosario from "../Glosario/";
import AsistenteBusqueda from "../HomeV2/Buscador/BotonFlotante";

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
                <AsistenteBusqueda/>
                <Glosario/>
                <ChatBotPDN />
                <Footer/>
            </div>            
        </React.Fragment>
    );
};

export default Layout;
