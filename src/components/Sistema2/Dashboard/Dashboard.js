import React from 'react';
import {withStyles} from '@mui/styles';
import {Paper, Grid} from "@mui/material";
import Ejercicio from "./Ejercicio";
import Agrupaciones from "./Agrupaciones";
import Tops from "./Tops";
import Procedimientos from "./Procedimientos";
import './graficas.css'
import PropTypes from 'prop-types';
import GeneralData from "./GeneralData";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    box: {
        maxWidth: '1200px',
        overflowX: 'auto',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(4)
    },
    paper: {
        backgroundColor: theme.palette.background.opaque,
        padding: theme.spacing(2),
        color: theme.palette.primario.contrastText,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.secundario.main,
        borderRadius: '10px 10px 10px 10px'
    },
    link: {
        textDecoration: "none",
        color: '#89d4f2',//theme.palette.text.linkColor,
        wordBreak: "break-all",
    },
});

const Dashboard = props => {
    const {classes} = props;
    return (
        <div className={classes.root} id={"s2sgraf"}>
            <Paper className={classes.paper} elevation={15}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                     <GeneralData digit={45654} text={'fasldkfa'}/>
                    </Grid>
                    <Grid item xs={4}>
                        <GeneralData digit={45654} text={'fasldkfa'}/>
                    </Grid>
                    <Grid item xs={4}>
                        <GeneralData digit={45654} text={'fasldkfa'}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Ejercicio/>
                    </Grid>
                    <Grid item xs={6}>
                        <Procedimientos/>
                    </Grid>
                    <Grid item xs={12}>
                        <Agrupaciones/>
                    </Grid>
                    <Grid item xs={12}>
                        <Tops/>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);