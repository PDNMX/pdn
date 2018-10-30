import React from 'react';
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Footer from '../Footer/Footer';
import PDNLinks from '../PDNLinks/PDNLinks';
import Header from "../PDNAppBar/PDNAppBar";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import img1 from "../../assets/img/contrataciones.jpg";
import img2 from "../../assets/img/sancionadosl.jpg";
import img3 from "../../assets/img/fiscal.jpg";
import TablaServidoresSancionados from './Servidores/TablaServidoresSancionados';
import TablaParticularaesSancionados from './Particulares/TablaParticularesSancionados';
import BubbleHolder from './Visualizaciones/BubbleHolder';

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
    titleLight: {
        color: "#e6e6e6",
        textAlign: 'center',
        marginTop: theme.spacing.unit * 2,
    },
    titleDark: {
        color: "#e6e6e6",
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
        backgroundColor: theme.palette.white.color,
    },
    section: {
        maxWidth: '1024px'
    },
    bgImg: {
        height: '300px',
        backgroundImage: 'url(bannerDark3.jpg)',
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
        backgroundColor: theme.palette.grisTenue.color,
        paddingTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 5
    },
    center: {
        textAlign: 'center'
    },
    links: {
        backgroundColor: theme.palette.grisTenue.color
    }

});

class Index extends React.Component {
    state = {
        idContent: 1
    };
    changeContent = id => {
        this.setState({idContent: id});
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Header/>
                <div className={classes.bgImg}>
                    <Grid container justify={"center"} spacing={0}>
                        <Grid item xs={12} className={classes.section}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} align={"center"}>
                                    <Typography variant="display1" className={classes.titleLight}>
                                        Servidores públicos y particulares sancionados
                                    </Typography>
                                    <Typography variant="subheading" className={classes.textLight}>
                                        It is a long established fact that a reader will be distracted by the
                                        readable
                                        content of a page when looking at its layout. The point of using Lorem Ipsum
                                        is that it has a
                                        more-or-less normal distribution of letters
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                </div>
                <div className={classes.bgContainer}>
                    <div className={classes.root}>
                        <Grid container spacing={0} justify="center">
                            <Grid item xs={12} className={classes.section}>
                                <Grid container spacing={0}>
                                    <Grid item md={4} xs={12} className={classes.center}>
                                        <CardMedia image={img1} className={classes.image}
                                                   onClick={() => this.changeContent(1)}/>
                                        <Typography variant="title" className={classes.title}>
                                            Servidores públicos sancionados
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
                                            Particulares sancionados
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
                <div className={classes.bgPanelLight}>
                    <div className={classes.root}>
                        <Grid container justify={'center'} spacing={0}>
                            <Grid item xs={12} className={classes.section}>
                                <Grid container spacing={0}>
                                    <Grid item xs={12}>
                                        {this.state.idContent === 1 &&
                                        <div><Typography variant={'title'} className={classes.title}>
                                            Servidores públicos sancionados</Typography>
                                            <TablaServidoresSancionados/>
                                        </div>
                                        }
                                        {this.state.idContent === 2 &&
                                        <div>
                                            <Typography variant={'title'} className={classes.title}>Particulares
                                                sancionados</Typography>
                                            <TablaParticularaesSancionados/>
                                        </div>
                                        }
                                        {this.state.idContent === 3 &&
                                        <div>
                                            <Typography variant={'title'}
                                                        className={classes.title}>Visualizaciones</Typography>
                                            <BubbleHolder/>
                                        </div>
                                        }
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>

                    </div>
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