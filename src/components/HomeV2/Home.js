import React from 'react';
import withStyles from '@mui/styles/withStyles';
import BlogSys from "./BlogSys";
import bgimg from "../../assets/rediseno/fondo_cruces_dark.png";
import Cards from './Cards/';
import QueEsPDN from "./QueEsPDN";
import Numeralia from "./Numeralia";
import AlertDialog from "./Disclaimer";
import Evolucion from "./Evolucion";
import {UserContext} from "../Login/UserContext";
//import Ad from "./Ad";

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundImage: `url(${bgimg})`,
        backgroundRepeat: "repeat",
    },
    item: {
        maxWidth: 1200
    },
    sistemas: {
        background: '#34b3eb'
    },
    mercado:{
        backgroundColor: "#f6f6f6"
    },
});

const Home = props => {
    const { classes } = props;
    const { user } = React.useContext(UserContext);

    return (
        <div className={classes.root}>
            { /*<Ad/>*/ }
            { user.loggedIn && <Evolucion/> }
            <QueEsPDN/>
            <Numeralia/>
            <BlogSys/>
            <Cards/>
            <AlertDialog/>
        </div>
    );
}

export default withStyles(styles)(Home);
