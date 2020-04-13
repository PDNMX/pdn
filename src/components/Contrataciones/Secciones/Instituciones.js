import React from 'react';
import {withStyles} from "@material-ui/core";
import Header from "../Header/Header"
import Footer from "../../Home/Footer";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    item:{
        maxWidth: 1200,
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(8),
        paddingTop: theme.spacing(8),
        // overflow: "auto"
    },
});

class Instituciones extends React.Component{

    render() {
        const {classes} = this.props;
        const bci = [
            {to:'/', text: 'Plataforma Digital Nacional'},
            {to:'/contrataciones', text: 'Contrataciones'},
            {text: 'Instituciones'}
        ];

        return <div className={classes.root}>
            <Header breadcrumbItems={bci}/>

            <Grid container spacing={0} align="center">
                <Grid item xs={12} className={classes.item}>
                    <Typography>
                        Instituciones
                    </Typography>
                </Grid>
            </Grid>

            <Footer/>
        </div>
    }

}

export default withStyles(styles)(Instituciones);