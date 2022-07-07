import React from "react";
import withStyles from '@mui/styles/withStyles';
import {Paper, Grid} from "@mui/material";
import Stepper from "./LinearStepper";

const styles = theme => ({
    container: {
        padding: "5% 10%",
        //backgroundColor: 'rgba(29, 80, 109, 0.95)',
    }, 
    bg: {
        backgroundSize: "cover",
        backgroundPosition: 'center'
    },
    headingText: {
        color: "#ced8db",
        fontWeight: "700",
        fontSize: '52px',
        [theme.breakpoints.down('md')]:{
            fontSize: '40px',
        },
        
    },
    subTitle:{
        fontSize: '30px',
        fontWeight: 500,
        textTransform :'uppercase',
        color: "#ced8db",
        "& b": {
            color: "#3bb1e6",
        }
    },
    text:{
        fontSize: '18px',
        fontWeight: 100,
        color: "#d0d7d9",
        "& b": {
            fontWeight: 500,
        }
    },
    btnPDN:{
        margin: theme.spacing(1),
        background: "rgb(255,255,255,0.5)",
        borderRadius: "50px",
        fontWeight: "bold",
        fontStyle: "italic",
        '&:hover': {
            backgroundColor: "#56a3bf",
        },
    },
    link:{
        textDecoration:'none',
        '&:hover': {
            textDecoration:'none',
        },
    }
});

const Buscador = props => {
    const {classes} = props;
 
    return (
        <React.Fragment>
            <Paper className={classes.bg}>
            <Grid container spacing={0} alignItems="flex-start" justifyContent='center' className={classes.container}>
                <Grid item md={12} sm={12} xs={12} align="center">
                    <Stepper/>
                </Grid>
            </Grid>
            </Paper>
        </React.Fragment>
    );
}
export default withStyles(styles)(Buscador);
