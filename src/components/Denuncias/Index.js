import React from 'react';
import {Typography} from "@material-ui/core"
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import img1 from "../../assets/img/hands.jpg";
import img2 from "../../assets/img/caseFile.jpg";
import img3 from "../../assets/img/fiscal.jpg";
import Paper from "@material-ui/core/Paper/Paper";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import {Link} from "react-router-dom";

const styles = theme => ({
    root: {
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {
            marginLeft: '150px',
            marginRight: '150px',
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(3)
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        }
    },
    bgImg: {
        height: '300px',
        backgroundImage: 'url(libros.jpg)',
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
        textAlign: 'left',
        backgroundSize: 'cover',
        width: '100%'
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
        padding: theme.spacing(2)
    },
    seccion: {
        backgroundColor :  theme.palette.backDark.color
    },
    image:{
        width: '100%',
        height: '250px',
    },
    title: {
        color: theme.palette.textPrincipal.color,
        textAlign: 'center'
    },
    textLight: {
        color: "#e6e6e6",
        textAlign: 'justify'
    },
    textDark: {
        color: theme.palette.textNormal,
        textAlign: 'justify'
    },
    bgContainer : {
        backgroundColor: theme.palette.backLight.color,
        paddingTop : theme.spacing(5)
    },
    section: {
        maxWidth: '1024px'
    },
    links: {
        backgroundColor: theme.palette.grisTenue.color
    }

});


class Index extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Paper className={classes.seccion}>
                    <Grid container>
                        <Grid item lg={8} md={8} sm={12} className={classes.bgImg}/>
                        <Grid item lg={4} md={4} sm={12} className={classes.container}>
                            <Typography variant="h4" className={classes.title}>
                                Denuncias
                            </Typography>
                            <Typography variant="body1" className={classes.textLight}>
                                It is a long established fact that a reader will be distracted by the readable
                                content of a page
                                when looking at its layout. The point of using Lorem Ipsum is that it has a
                                more-or-less normal
                                distribution of letters
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <div id={'container'} className={classes.bgContainer}>
                    <div className={classes.root}>
                        <Grid container spacing={0} justify="center">
                            <Grid item xs={12} className={classes.section}>
                              <Grid container spacing={4}>
                                    <Grid item md={4} xs={12}>
                                        <CardMedia image={img1} className={classes.image} to="/formDenuncia" component={Link}/>
                                        <Typography variant="h6" className={classes.title}>
                                            Presenta tu denuncia
                                        </Typography>
                                        <Typography  className={classes.textPrimary}>
                                            Llena el formulario y obten tu folio con el cual podrás dar seguimiento a tu
                                            denuncia.
                                        </Typography>
                                    </Grid>
                                    <Grid item md={4} xs={12}>
                                        <CardMedia image={img2} className={classes.image} to="/formConsultaDenuncia" component={Link}/>
                                        <Typography variant="h6" className={classes.title}>
                                            Consulta tu folio
                                        </Typography>
                                        <Typography  className={classes.textPrimary} >
                                            Ten a la mano el número de folio con el que podrás consultar el estatus de tu
                                            denuncia
                                        </Typography>
                                    </Grid>
                                    <Grid item md={4} xs={12}>
                                        <CardMedia image={img3} className={classes.image} to="/informesDenuncias" component={Link}/>
                                        <Typography variant="h6" className={classes.title}>
                                            Informes
                                        </Typography>
                                        <Typography  className={classes.textPrimary}>
                                            Visualizar informes
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </div>
                </div>


            </div>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);