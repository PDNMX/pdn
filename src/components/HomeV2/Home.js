import React from 'react';
import withStyles from '@mui/styles/withStyles';
import BlogSys from "./BlogSys";
import bgimg from "../../assets/rediseno/fondo_cruces.png";
import Cards from './Cards/';
import QueEsPDN from "./QueEsPDN";
import Numeralia from "./Numeralia"

const styles = theme => ({
    root: {
        flexGrow :1,
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

    return (
        <div className={classes.root}>
            <QueEsPDN/>
            <Numeralia/>
            <BlogSys/>
            <Cards/>
        </div>
    );
}

export default withStyles(styles)(Home);
