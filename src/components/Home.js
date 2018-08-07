import React from 'react';
//import './home.css';
import Grid from '@material-ui/core/Grid';
import Card from '../components/SimpleCard'
import Header from '../components/Header/Header';
import Footer from "./Footer/Footer";
import Typography from "@material-ui/core/Typography";
import img1 from "../assets/img/BI.png";
import img2 from "../assets/img/contratacion.jpg";
import img3 from "../assets/img/bar_chart.png";
import img4 from "../assets/img/reporting.png";
import img5 from "../assets/img/sancion.jpg";
import img6 from '../assets/img/Auditoria.jpg';
import Banner from "./Banner";
import FooterBlog from "./Blog/FooterBlog";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';


const charts1 = [
    {'key': '1', 'title': 'Declaraciones 3x3', 'content': img1, 'to': '/datos'},
    {'key': '2', 'title': 'Servidores que intervienen en procesos de contratacion', 'content': img2, 'to': '/datos'},
    {'key': '3', 'title': 'Servidores públicos y particulares sancionados', 'content': img5, 'to': '/sancionados'}
];
const charts2 = [
    {'key': '4', 'title': 'Contrataciones públicas', 'content': img4, 'to': '/datos'},
    {'key': '5', 'title': 'Denuncias públicas', 'content': img3, 'to': '/datos'},
    {'key': '6', 'title': 'Comunicación del Sistema Nacional de Fiscalización', 'content': img6, 'to': '/datos'}
];


const styles = theme => ({
    root: {
        flexGrow: 1,
        //padding: '50px',
    },
    homeBody:{
        margin: '50px',
    },
    paper: {
        padding: theme.spacing.unit * 2,
        //marginRight: theme.spacing.unit * 4,
        //marginLeft: theme.spacing.unit * 4,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class Home extends React.Component {
    render() {

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Header/>
                <Banner/>
                <div className={classes.homeBody}>
                    <Grid container spacing={24}>

                        <Grid item xs={12}>
                            <Typography variant={"Headline"}>
                                Explora los sistemas de la PDN
                            </Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Paper className={classes.paper}>
                                <Typography>
                                    Lorem Ipsum
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={4}>
                            <Paper className={classes.paper}>
                                <Typography>
                                    Lorem Ipsum
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={classes.paper}>
                                <Typography>
                                    Lorem Ipsum
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={4}>
                            <Paper className={classes.paper}>
                                <Typography>
                                    Lorem Ipsum
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={classes.paper}>
                                <Typography>
                                    Lorem Ipsum
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={classes.paper}>
                                <Typography>
                                    Lorem Ipsum
                                </Typography>
                            </Paper>
                        </Grid>





                        {/*<div className="App-intro">*/}
                        {/*
                    <Typography variant={"display1"} component="p">
                        Explora los sistemas de la PDN
                    </Typography>

                    {charts1.map((prop, key) => (
                        <Grid item key={prop.key} xs={4}>
                            <Card titleCard={prop.title} content={prop.content} to={prop.to}/>
                        </Grid>
                    ))}

                    {charts2.map((prop, key) => (
                        <Grid key={prop.title} xs={4}>
                            <Card titleCard={prop.title} content={prop.content} to={prop.to}/>
                        </Grid>
                    ))}
                    */}

                        {/*</div>*/}
                    </Grid>
                </div>
                <FooterBlog/>
                <Footer/>
            </div>

        );
    }
}

Home.propTypes = {
    classes : PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
