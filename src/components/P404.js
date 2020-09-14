import React from 'react';
import {Link} from 'react-router-dom';
import Typography  from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Header from './Compartidos/BarraLogoMenu';
import Button from '@material-ui/core/Button';
import Footer from './Home/Footer';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

const styles = theme => ({
    root :{
        flexGrow: 1,
        //backgroundColor: '#e5e5e5'
    },
    box:{
        display: "flex",
        justifyContent: "center",
        marginTop: theme.spacing(14) ,
        paddingBottom: theme.spacing(14)
    },
    paper:{
        //minHeight: '800px',
        //maxWidth: '1024px',
        padding: theme.spacing(4),
        margin: theme.spacing(1)
    },
    button: {
        background: '#ffe01b',
        marginTop: theme.spacing(1)
    },
    links: {
        backgroundColor: theme.palette.grisTenue.color
    },
    section: {
        maxWidth: '1024px'
    },
    item3:{
        maxWidth: 1200,
    },
    link: {
        textDecoration: "none",
        color: "inherit"
    }
});

class P404 extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Header/>

                <Grid container spacing={0} className="breadcrumb" justify='center'>
                    <Grid item xs={12} className={classes.item3}>
                        <ul>
                            <li>
                                <Link className={classes.link} to='/'>Plataforma Digital Nacional</Link>
                            </li>
                            <li>
                                404
                            </li>
                        </ul>
                    </Grid>
                </Grid>

                <Box className={classes.box}>
                    <Paper className={classes.paper} elevation={3}>
                        <Typography variant="h1" paragraph>
                            404
                        </Typography>
                        <Typography variant="h4" paragraph>
                            No encontramos lo que buscas
                        </Typography>
                        <Button className={classes.button} component={Link}
                                variant="contained" to="/">
                            Regresar
                        </Button>
                    </Paper>
                </Box>

                <Footer/>
            </div>
        )
    }
}

export default withStyles(styles)(P404);