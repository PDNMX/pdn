import React from 'react';
import withStyles from '@mui/styles/withStyles';
import Banner from "./Banner";
import Version from "./Version";
import BlogSys from "./BlogSys";

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

const Home = props => {
    const { classes } = props;

    return (
        <React.Fragment>
            <Banner/>
            <Version/>
            <BlogSys/>
        </React.Fragment>
    );
}

export default withStyles(styles)(Home);