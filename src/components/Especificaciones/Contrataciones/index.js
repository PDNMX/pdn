import React from "react";
import { Divider, Grid } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import Intro from "./Intro";
import Licencia from '../Licencia';
import Herramientas from "../Herramientas";
import bgimg from "../../../assets/rediseno/fondo_cruces.png";
const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.primario.main,
        backgroundImage: `url(${bgimg})`,
        backgroundRepeat: "repeat",
        backgroundPosition: 'fixed',
        color: '#f2f2f2'
    },
    rootItem: {
        maxWidth: 1200,
        padding: theme.spacing(1)
    },
    divider:{
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    },
});

const Index = props => {
    const {classes}= props;
    return (
        <div className={classes.root}>
            <Grid container justifyContent="center">
                <Grid item xs={12} className={classes.rootItem}>
                    <Intro/>
                    <Divider className={classes.divider}/>
                    <Licencia/>
                    <Divider className={classes.divider}/>
                    <Herramientas/>
                </Grid>
            </Grid>
        </div>
    );
}

export default withStyles(styles)(Index);
