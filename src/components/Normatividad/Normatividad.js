import React from 'react';
import {Grid, Box, Paper} from '@mui/material';
import withStyles from '@mui/styles/withStyles';

import bgimg from "@assets/rediseno/fondo_cruces_dark.png";
import HeaderV2 from "../HomeV2/HeaderV2";
import ExpansionPanels from './ExpansionPanels';
import pdnRoutes from "../../routes";

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
        paddingTop: 90,
        paddingBottom: 90,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)

    },
    sistemas: {
        maxWidth: 200,
        "&:hover": {
            opacity: .5
        }
    },
    link: {
        textDecoration: "none"
    },
    text: {
        color: theme.palette.greyColor,
        //paddingBottom: 60
    },
    paper: {
        backgroundColor: theme.palette.background.opaque,
        padding: theme.spacing(2),
        color: theme.palette.primario.contrastText,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.secundario.main,
        borderRadius: '10px 10px 10px 10px',
        display: 'flex',
        justifyContent: "center"
    },
    box: {
        maxWidth: '900px', paddingTop: '50px', paddingBottom: '50px'
    }
});

const Normatividad = props => {
    const {classes} = props;
    const section = pdnRoutes.find(route => route.path === '/normatividad');

    return (
        <div className={classes.root}>
            <HeaderV2 section={section}/>
            <Grid container spacing={0} justifyContent="center">
                <Grid item xs={12} className={classes.rootItem}>
                    <Paper className={classes.paper} elevation={15}>
                        <Box className={classes.box}>
                            <ExpansionPanels/>
                        </Box>
                    </Paper>
                </Grid>

            </Grid>

        </div>
    );
}

export default withStyles(styles)(Normatividad);
