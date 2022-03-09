import React  from 'react';
import withStyles from '@mui/styles/withStyles';
import Grid from '@mui/material/Grid';
import ExpansionPanels from './ExpansionPanels';
import Disclaimer from "./Disclaimer";
import bgimg from "../../assets/rediseno/fondo_cruces.png";
import HeaderV2 from "../HomeV2/HeaderV2";
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
    item: {
        maxWidth: 1200,
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingTop: 40,
        paddingBottom: theme.spacing(10),
    }
});

const HelpDesk = props => {
    const {classes} = props;
    const section = pdnRoutes.find(route => route.path === '/mesa-de-ayuda');
    return (<div className={classes.root}>
        <HeaderV2 section={section}/>
        <Grid container spacing={0} justifyContent="center">
            <Grid item xs={12} className={classes.item}>
                <Disclaimer/>
                <ExpansionPanels/>
            </Grid>
        </Grid>
    </div>);
}


export default withStyles(styles)(HelpDesk);

