import React from 'react';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Header from "../../PDNAppBar/PDNAppBar";
import PDNLinks from "../../PDNLinks/PDNLinks";
import Footer from "../../Footer/Footer";
//import Card from "../Card";
//import img1 from "../../../assets/img/hands.jpg";
//import img2 from "../../../assets/img/caseFile.jpg";
import Paper from "@material-ui/core/Paper/Paper";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import DonoutIcon from '@material-ui/icons/ShowChart';
import QuestionIcon from '@material-ui/icons/QuestionAnswer'
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";


const styles = theme => ({

    root: {
        flexGrow: 1,
        backgroundColor: '#e5e5e5'
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
        [theme.breakpoints.down('sm')]: {},
        minHeight: '500px'
    },
    fontLight: {
        color: theme.palette.fontLight.color,

    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "100%",
    },
    section: {
        maxWidth: '1024px'
    }
});

class FormularioConsulta extends React.Component {
    state = {
        folio: ''
    };
    handleChange = name => event => {
        this.setState({[name]: event.target.checked});
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Header/>
                <Grid container spacing={0} justify='center'>
                    <Grid item xs={12} className={classes.section}>
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
                        <br/>
                    </Grid>
                </Grid>
                <Grid container spacing={0} justify="center">
                    <Grid item xs={12} className={classes.section}>
                        <Paper className={classes.seccion}>
                            <Grid container spacing={24}>
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
                                <Grid item xs={9} container direction="column" spacing={24}>
                                    <Grid item>
                                        <TextField
                                            id="folio"
                                            label="Folio denuncia"
                                            className={classes.textField}
                                            value={this.state.folio}
                                            onChange={this.handleChange('folio')}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <Button variant="contained" color="primary">
                                            Consultar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                <br/>
                <Footer/>

            </div>
        );
    }
}

FormularioConsulta.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormularioConsulta);