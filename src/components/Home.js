import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '../components/SimpleCard'
import Header from './PDNAppBar/PDNAppBar';
import Footer from "./Footer/Footer";
import img1 from "../assets/img/BI.png";
import img2 from "../assets/img/contratacion.jpg";
import img3 from "../assets/img/bar_chart.png";
import img4 from "../assets/img/reporting.png";
import img5 from "../assets/img/sancion.jpg";
import img6 from '../assets/img/Auditoria.jpg';
import Banner from "./Banner";
import FooterBlog from "./PDNLinks/PDNLinks";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography/Typography";

const charts1 = [
    {'key': '1', 'title': 'Declaraciones 3x3', 'content': img1, 'to': '/datos'},
    {'key': '2', 'title': 'Servidores que intervienen en procesos de contratacion', 'content': img2, 'to': '/servidores'},
    {'key': '3', 'title': 'Servidores públicos y particulares sancionados', 'content': img5, 'to': '/sancionados'},
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
        [theme.breakpoints.up('sm')]:{
            marginLeft: '100px',
            marginRight: '100px',
            marginTop: theme.spacing.unit * 2,
            marginBottom: theme.spacing.unit * 2
        },
        [theme.breakpoints.down('sm')]:{
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            marginTop: theme.spacing.unit,
            marginBottom: theme.spacing.unit
        }
    },
    paper: {
        padding: theme.spacing.unit * 2,
        //marginRight: theme.spacing.unit * 4,
        //marginLeft: theme.spacing.unit * 4,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    appBar: {
        marginBottom: theme.spacing.unit * 5
    }
});

class Home extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Header/>
                <Banner/>
                <div className={classes.homeBody}>
                    <Grid container  justify="center" spacing={12}>
                        <Grid item xs={12}>
                            <Typography variant={"headline"}>
                                Explora los sistemas de la PDN
                            </Typography>
                        </Grid>
                        {
                            charts1.map((prop, key) => {
                                return (
                                    <Grid item md={4} sm={12} key={key} style={{marginBottom:"10px"}}>
                                        <Card titleCard={prop.title} content={prop.content} to={prop.to}/>
                                    </Grid>
                                );
                            })
                        }

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
