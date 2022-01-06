import React from 'react';
import withStyles from '@mui/styles/withStyles';
import Banner from "./Banner";
import BannerMobile from "./BannerMobile";
import Version from "./Version";
import BlogSys from "./BlogSys";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@emotion/react";


const styles = theme => ({
    root: {
        flexGrow :1,
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


function useIsWidthUp(breakpoint) {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.up(breakpoint));
}

const Home = props => {
    const { classes } = props;
    const isXsUp = useIsWidthUp("lg");

    return (
        <React.Fragment>
            {isXsUp && <Banner/>}
            {!isXsUp && <BannerMobile/>}
            <Version/>
            <BlogSys/>
        </React.Fragment>
    );
}

export default withStyles(styles)(Home);