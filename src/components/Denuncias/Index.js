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
import img3 from "../../assets/img/fiscal.jpg";
import Paper from "@material-ui/core/Paper/Paper";

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
    bgImg: {
        height: '300px',
        backgroundImage: 'url(libros.jpg)',
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
        textAlign: 'left',
        backgroundSize: 'cover',
        width : '100%'
    },
    textPrimary: {
        color: theme.palette.primary.dark,
        textAlign: "center"
    },
    textSecondary: {
        color: theme.palette.primary.main,
        textAlign: "center"
    },
    container: {
        padding: theme.spacing.unit * 2
    },
    section: {
        marginBottom: theme.spacing.unit * 5,
        //  backgroundColor :  theme.palette.primary.main
    }

});


class Index extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Header/>
                <div className={classes.root}>
                    <Paper className={classes.section}>
                        <Grid container>
                            <Grid item lg={8} md={8} sm={12} className={classes.bgImg}/>
                            <Grid item lg={4} md={4} sm={12} className={classes.container}>
                                <Typography variant="display1" className={classes.textPrimary}>
                                    Denuncias
                                </Typography>
                                <Typography variant="body1" className={classes.textSecondary}>
                                    It is a long established fact that a reader will be distracted by the readable
                                    content of a page
                                    when looking at its layout. The point of using Lorem Ipsum is that it has a
                                    more-or-less normal
                                    distribution of letters
                                </Typography>
                            </Grid>

                        </Grid>
                    </Paper>
                    <Paper className={classes.section}>
                        <Grid container spacing={16} justify="center">
                            <Grid item lg={4} md={4} sm={12}>
                                <Card title="Presenta tu denuncia" icon={img1} to="/formDenuncia"
                                      content="Llena el formulario y obten tu folio con el cual podrás dar seguimiento a tu denuncia."/>
                            </Grid>
                            <Grid item lg={4} md={4} sm={12}>
                                <Card title="Consulta tu folio" icon={img2} to="/formConsultaDenuncia"
                                      content="Ten a la mano el número de folio con el que podrás  consultar el estatus de tu denuncia"/>
                            </Grid>
                            <Grid item lg={4} md={4} sm={12}>
                                <Card title="Informes" icon={img3} to="/formDenuncia" content="Visualizar informes"/>
                            </Grid>
                        </Grid>

                    </Paper>
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