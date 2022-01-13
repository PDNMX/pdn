

import React from "react";
import withStyles from '@mui/styles/withStyles';
import {Box, Typography, Grid} from "@mui/material";


const styles = theme => ({
    container: {
        paddingTop: 100,
        paddingBottom: 90,
        backgroundColor: '#35a2d2',
        
    },
    headingText: {
        color: "#d0d7d9",
        fontWeight: "700",
        fontSize: '48px',
        [theme.breakpoints.down('md')]:{
            fontSize: '40px',
        },
    },
    text:{
        fontSize: '18px',
        fontWeight: 500,
        color: "#d0d7d9",
        paddingBottom: theme.spacing(3)
    },
});

const Numeralia = props => {
    const {classes} = props;
 
    return (
        <React.Fragment>
            <Grid container spacing={0} justifyContent='center' className={classes.container}>
                <Grid item xs={12} align="left">
                    
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
export default withStyles(styles)(Numeralia);
