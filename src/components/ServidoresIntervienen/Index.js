import React from 'react';
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Footer from '../Footer/Footer';
import PDNLinks from '../PDNLinks/PDNLinks';
import Header from "../PDNAppBar/PDNAppBar";
import TablaServidores from "./TablaServidores";
import TablaParticulares from "./TablaParticulares";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import img1 from "../../assets/img/contrataciones.jpg";
import img2 from "../../assets/img/sancionadosl.jpg";
import img3 from "../../assets/img/fiscal.jpg";


const styles = theme => ({
    root: {
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {
            marginLeft: '150px',
            marginRight: '150px',

        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,

        }
    },
    container1: {
        flexGrow: 1,
        backgroundColor: theme.palette.backDark.color
    },
    title: {
        color: theme.palette.textPrincipal.color,
        textAlign: 'center',
        marginTop: theme.spacing.unit * 2,
    },
    summary: {
        color: theme.palette.primary.main,
    },
    textLight: {
        color: "#e6e6e6",
        textAlign: 'justify'
    },
    textDark: {
        color: theme.palette.textNormal,
        textAlign: 'justify'
    },
    container2: {
        flexGrow: 1,
        backgroundColor: theme.palette.backLight.color,

    },
    bgPanelDark: {
        backgroundColor: theme.palette.backDark.color,
    },
    bgPanelLight: {
        backgroundColor: theme.palette.backLight.color,
    },
    section: {
        maxWidth: '1024px'
    },
    bgImg: {
        height: '300px',
        backgroundImage: 'url(contrataciones.jpg)',
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
        textAlign: 'left',
        backgroundSize: 'cover',
        width: '100%'
    },
    container: {
        padding: theme.spacing.unit * 2
    },
    seccion: {
        backgroundColor: theme.palette.backDark.color
    },
    image: {
        width: '50%',
        height: '150px',
        borderRadius: '50px',
        display: 'inline-block'
    },
    bgContainer: {
        backgroundColor: theme.palette.backLight.color,
        paddingTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 5
    },
    center: {
        textAlign: 'center'
    }

});

class Index extends React.Component {
    state = {
        idContent: 0
    };
    changeContent = id => {
        this.setState({idContent: id});
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Header/>
                <Paper className={classes.seccion}>
                    <Grid container>
                        <Grid item md={8} sm={12} className={classes.bgImg}/>
                        <Grid item md={4} sm={12} className={classes.container}>
                            <Typography variant="display1" className={classes.title}>
                                Servidores que intervienen en procesos de contración
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
                <div className={classes.bgContainer}>
                    <div className={classes.root}>
                        <Grid container spacing={0} justify="center">
                            <Grid item xs={12} className={classes.section}>
                                <Grid container spacing={0}>
                                    <Grid item md={4} xs={12} className={classes.center}>
                                        <CardMedia image={img1} className={classes.image}
                                                   onClick={() => this.changeContent(1)}/>
                                        <Typography variant="title" className={classes.title}>
                                            Servidores que intervienen en procesos de contratación
                                        </Typography>
                                        <Typography className={classes.textPrimary}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                            tempor
                                            incididunt ut labore et dolore magna aliqua.
                                        </Typography>
                                    </Grid>
                                    <Grid item md={4} xs={12} className={classes.center}>
                                        <CardMedia image={img2} className={classes.image}
                                                   onClick={() => this.changeContent(2)}/>
                                        <Typography variant="title" className={classes.title}>
                                            Particulares inhabilitados
                                        </Typography>
                                        <Typography className={classes.textPrimary}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                            tempor
                                            incididunt ut labore et dolore magna aliqua.
                                        </Typography>
                                    </Grid>
                                    <Grid item md={4} xs={12} className={classes.center}>
                                        <CardMedia image={img3} className={classes.image}
                                                   onClick={() => this.changeContent(3)}/>
                                        <Typography variant="title" className={classes.title}>
                                            Visualizaciones
                                        </Typography>
                                        <Typography className={classes.textPrimary}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                            tempor
                                            incididunt ut labore et dolore magna aliqua.
                                        </Typography>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className={classes.bgPanelDark}>
                    <div className={classes.root}>
                        <Grid container justify={'center'} spacing={0}>
                            <Grid item xs={12} className={classes.section}>
                                <Grid container spacing={0}>
                                    {this.state.idContent === 1 &&
                                    <Grid item xs={12}>
                                        <Typography variant={'title'} className={classes.title}>
                                            Servidores que intervienen en procesos de contratación</Typography>
                                        <TablaServidores/>
                                    </Grid>
                                    }
                                    {this.state.idContent === 2 &&
                                    <Grid item xs={12}>
                                        <Typography variant={'title'} className={classes.title}>Particulares
                                            inhabilitados</Typography>
                                        <TablaParticulares/>
                                    </Grid>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>

                    </div>
                </div>

                <div style={{backgroundColor: '#fff'}}>
                    <Grid container spacing={0} justify='center'>
                        <Grid item xs={12} className={classes.section}>
                            <PDNLinks/>
                        </Grid>
                    </Grid>
                </div>
                <Footer/>
            </div>
        );
    }

}

Index.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);