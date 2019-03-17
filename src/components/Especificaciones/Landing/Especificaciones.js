import React from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from "@material-ui/core/styles";
import {Link} from 'react-router-dom';
import Footer from "../../Home/Footer";
import Header from "./Header/Header";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    item: {
        maxWidth: 1200,
        paddingTop: "50px",
        paddingBottom: "50px"
    },
    button: {
        margin: theme.spacing.unit,
        background: '#ffe01b'
    },
    ul: {
        listStyle: 'none'
    }
});

class Especificaciones extends React.Component {
    render (){
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Header/>
                <Grid container spacing={0} justify="center" style={{background: '#fff'}}>
                    <Grid item xs={12} className={classes.item}>
                        <ul className={classes.ul}>
                            <li><Button className={classes.button} variant='contained' component={Link} to="/declaraciones/especificaciones">Sistema 1</Button></li>
                            <li><Button className={classes.button} variant='contained' component={Link} to="/intervienen/especificaciones">Sistema 2</Button></li>
                            <li><Button className={classes.button} variant="contained" component={Link} to="/sancionados/especificaciones">Sistema 3</Button></li>
                        </ul>
                    </Grid>
                </Grid>
                <Footer/>
            </div>
        );
    }
}

export default withStyles(styles)(Especificaciones);