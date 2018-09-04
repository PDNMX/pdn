import React from 'react';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Header from "../PDNAppBar/PDNAppBar";
import PDNLinks from "../PDNLinks/PDNLinks";
import Footer from "../Footer/Footer";
import Card from "./Card";
import img1 from "../../assets/img/hands.jpg";
import img2 from "../../assets/img/caseFile.jpg";
import Paper from "@material-ui/core/Paper/Paper";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import DonoutIcon from '@material-ui/icons/ShowChart';
import QuestionIcon from '@material-ui/icons/QuestionAnswer'


const styles = theme => ({

    root: {
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {
            marginLeft: '100px',
            marginRight: '100px',
            paddingTop: theme.spacing.unit,
            paddingBottom: theme.spacing.unit * 3
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            paddingTop: theme.spacing.unit,
            paddingBottom: theme.spacing.unit,
        }
    },
    homeBody: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: '100px',
            marginRight: '100px',
            marginTop: theme.spacing.unit * 2,
            marginBottom: theme.spacing.unit * 2,


        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            marginTop: theme.spacing.unit,
            marginBottom: theme.spacing.unit,
            padding: 20
        }
    },
    gridItem: {
        marginBottom: theme.spacing.unit * 2
    },

    paperIzquierdo: {
        backgroundColor: theme.palette.secondary.main,
        height: '100%',
        width: '100%',
        color: theme.palette.fontLight.color,
    },
    paperDerecho: {
        height: '95%%',
        width: '100%',
        /*paddingLeft:"3rem",
        paddingTop:"3rem"*/
    },
    titleBox: {
        color: theme.palette.fontLight.color,
        backgroundColor: theme.palette.primary.main,
        paddingTop: '1rem',
        paddingBottom: '1rem',
        paddingLeft: '6rem',
        paddingRight: '2rem',
        fontSize: '1rem',
        display: 'inline-block',
        fontWeight: 700,
        marginLeft: "-2rem",
        marginBottom: "2rem"

    },
    seccion: {
        padding: "2rem",
        [theme.breakpoints.up('sm')]: {
            display: "flex",
        },
        [theme.breakpoints.down('sm')]: {

        }
    },
    fontLight: {
        color: theme.palette.fontLight.color,

    }

});


class Index extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Header/>
                <div className={classes.root}>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Typography variant="headline">
                                Denuncias
                            </Typography>
                            <Typography variant={"body1"}>
                                It is a long established fact that a reader will be distracted by the readable
                                content of a page
                                when looking at its layout. The point of using Lorem Ipsum is that it has a
                                more-or-less normal
                                distribution of letters
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={0}>
                        <Paper className={classes.seccion}>
                            <Grid item lg={3} md={3} sm={12}>
                                <Typography variant="headline" className={classes.titleBox}>
                                    Servicios
                                </Typography>
                                <List component="nav">
                                    <ListItem button>
                                        <ListItemIcon>
                                            <QuestionIcon/>
                                        </ListItemIcon>
                                        <ListItemText inset primary="Preguntas frecuentes"/>
                                    </ListItem>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <DonoutIcon/>
                                        </ListItemIcon>
                                        <ListItemText inset primary="Informes"/>
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item lg={9} md={9} sm={12} className={classes.seccion}>
                                <Card title="Presenta tu denuncia" icon={img1} to="/formDenuncia" content="Llena el formulario y obten tu folio con el cual podrás dar seguimiento a tu denuncia."/>
                                <Card title="Consulta tu folio" icon={img2} to="/consultaDenuncia" content="Ten a la mano el número de folio con el que podrás  consultar el estatus de tu denuncia"/>
                            </Grid>
                        </Paper>
                    </Grid>
                </div>
                < PDNLinks/>
                < Footer/>

            </div>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);