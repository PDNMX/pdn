import React from 'react';
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Footer from '../Footer/Footer';
import Header from "../PDNAppBar/PDNAppBar";
import TablaServidores from "./TablaServidores";
import TablaParticulares from "./TablaParticulares";
import Grid from "@material-ui/core/Grid/Grid";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import img1 from "../../assets/img/contrataciones.jpg";
import img2 from "../../assets/img/sancionadosl.jpg";
import img3 from "../../assets/img/fiscal.jpg";
import BubbleHolder from "./BubbleHolder";

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
    title: {
        color: theme.palette.textPrincipal.color,
        textAlign: 'center',
        marginTop: theme.spacing.unit * 2,
    },
    titleLight: {
        color: theme.palette.textSecondary.color,
        textAlign: 'center',
        marginTop: theme.spacing.unit * 2,
        [theme.breakpoints.up('sm')]:{
            paddingTop: '75px'
        },
        [theme.breakpoints.down('sm')]:{
            paddingTop: '40px'

        }
    },
    textLight: {
        color: theme.palette.textSecondary.color,
        textAlign: 'center'
    },
    textDark: {
        color: theme.palette.textNormal,
        textAlign: 'justify'
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
        backgroundImage: 'url(bannerDark2.jpg)',
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
        textAlign: 'left',
        backgroundSize: 'cover',
        width: '100%',
    },
    container: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: '100px',
            marginRight: '100px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit
        }
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
                                        Servidores que intervienen en procesos de contración
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
                                            Servidores que intervienen en procesos de contratación
                                        </Typography>

                                    </Grid>
                                    <Grid item md={4} xs={12} className={classes.center}>
                                        <CardMedia image={img2} className={classes.image}
                                                   onClick={() => this.changeContent(2)}/>
                                        <Typography variant="title" className={classes.title}>
                                            Particulares inhabilitados
                                        </Typography>
                                    </Grid>
                                    <Grid item md={4} xs={12} className={classes.center}>
                                        <CardMedia image={img3} className={classes.image}
                                                   onClick={() => this.changeContent(3)}/>
                                        <Typography variant="title" className={classes.title}>
                                            Visualizaciones
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
                                            Servidores que intervienen en procesos de contratación</Typography><br/>
                                            <Typography variant={"subheading"} className={classes.textPrimary}>
                                                Consulta los nombres, institución, cargo y actividades de y adscripción
                                                de los servidores públicos que intervengan en contrataciones y otros
                                                actos de autoridad.
                                            </Typography>
                                            <br/>
                                            <Typography variant={"subheading"} align={"justify"}>
                                                Además podrás consultar:<br/><br/>
                                                ¿Cuáles son las dependencias con más servidores públicos facultados para intervenir en procesos de contratación?<br/><br/>
                                                ¿Cuál es el puesto de los funcionarios que intervienen en estos procesos?
                                            </Typography><br/>
                                            <TablaServidores/>
                                        </div>
                                        }
                                        {this.state.idContent === 2 &&
                                        <div>
                                            <Typography variant={'title'} className={classes.title}>Particulares
                                                inhabilitados</Typography><br/>
                                            <Typography variant={"subheading"} align={"justify"} className={classes.textPrimary}>
                                                Consulta la relación de particulares, personas físicas y morales, que se
                                                encuentren inhabilitados para celebrar contratos con los entes públicos,
                                                por
                                                qué fueron inhabilitados, por cuánto tiempo y con qué monto.
                                            </Typography><br/>
                                            <TablaParticulares/>
                                        </div>
                                        }
                                        {this.state.idContent === 3 &&
                                        <div>
                                            <Typography variant={'title'}
                                                        className={classes.title}>Visualizaciones</Typography><br/>
                                            <Typography variant={"subheading"} align={"justify"} className={classes.textPrimary}>
                                                Consulta cuáles son las instituciones con el mayor número de sanciones a
                                                particulares, y mayor monto.
                                            </Typography><br/>
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