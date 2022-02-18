import React from 'react';
import withStyles from '@mui/styles/withStyles';
import Version from "./Version";
import BlogSys from "./BlogSys";
import IconS1 from "../../assets/rediseno/ico_sistemas/ico_s1_color.svg";
import IconS2 from "../../assets/rediseno/ico_sistemas/ico_s2_color.svg";
import IconS3 from "../../assets/rediseno/ico_sistemas/ico_s3_color.svg";
import IconS4 from "../../assets/rediseno/ico_sistemas/ico_s4_color.svg";
import IconS5 from "../../assets/rediseno/ico_sistemas/ico_s5_color.svg";
import IconS6 from "../../assets/rediseno/ico_sistemas/ico_s6_color.svg";
import Banner from "./Banner";
import bgimg from "../../assets/rediseno/fondo_cruces.png";

import Footer from './Footer/';
import Cards from './Cards';

import QueEsPDN from "./QueEsPDN";
import Numeralia from "./Numeralia"

const styles = theme => ({
    root: {
        flexGrow :1,
        backgroundImage: `url(${bgimg})`,
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed"
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

    return (
        <div className={classes.root}>
            <Banner/>
            <Version/>
            <QueEsPDN/>
            <Numeralia/>
            <BlogSys/>
            <Cards/>
            <Footer/>
        </div>
    );
}

export default withStyles(styles)(Home);
