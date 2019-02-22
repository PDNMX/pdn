import React from 'react';
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Footer from '../Home/Footer';
//import PDNAppBar from "../PDNAppBar/PDNAppBar";
import TablaServidores from "./TablaServidores";
import TablaParticulares from "./TablaParticulares";
import Grid from "@material-ui/core/Grid/Grid";
import img1 from "../../assets/img/servidores_intervienen_contratacion.svg";
import img2 from "../../assets/img/servidores_particulares_inhabilitados.svg";
import img3 from "../../assets/img/servidores_visualizaciones.svg";
import BubbleHolder_Servidores_Contrataciones from "./BubbleHolder_Servidores_Contrataciones";
//import imgBanner from '../../assets/banners/FOTO_BANNER_1.jpg';
import Header from './Header/Header';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    title: {
        color: theme.palette.black.color,
        maxHeight: '20px',
        paddingBottom: '56px'
    },
    titleImg: {
        color: theme.palette.titleBanner.color,
        minHeight: '100px'
    },
    titleLight: {
        color: theme.palette.titleBanner.color,
        // paddingTop : '10%'
    },
    titleSub: {
        color: theme.palette.titleBanner.color,
        paddingTop: '10px',
    },
    textDark: {
        color: theme.palette.textNormal,
        textAlign: 'justify'
    },
    bgPanelDark: {
        backgroundColor: theme.palette.backDark.color,
    },
    bgPanelLight: {
        backgroundColor: theme.palette.grisTenue.color,
        paddingTop: '84px'
    },
    bgPanelTable: {
        backgroundColor: theme.palette.white.color,
        marginBottom: '266px'
    },
    section: {
        maxWidth: '1200px'
    },
    bgImg: {
        width: '100%',
        position: 'absolute',
        zIndex: 2,
        opacity: 0.2
    },
    image: {
        paddingBottom: '24px',
        paddingTop: '28px',
        minWidth: '230px'
    },
    bgContainer: {
        backgroundColor: theme.palette.azul.color,
        paddingTop: '102px',
    },
    center: {
        textAlign: 'center'
    },
    links: {
        backgroundColor: theme.palette.grisTenue.color
    },
    card: {
        backgroundColor: theme.palette.azul.color,
        borderRadius: '5px 5px 0px 0px',
        paddingBottom: '90px',
        paddingRight: '40px',
        paddingLeft: '40px',
        maxWidth: '230px',
        margin: 0,
        display: 'inline-block'
    },
    cardSeleccionada: {
        backgroundColor: theme.palette.white.color,
        borderRadius: '5px 5px 0px 0px',
        paddingBottom: '90px',
        paddingRight: '40px',
        paddingLeft: '40px',
        maxWidth: '230px',
        margin: 0,
        display: 'inline-block'
    },
    /*
    banner: {
        height: '600px',
        zIndex: '1',
        position: 'relative',
        overflow: 'hidden',
    }
    */
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
            <div className={classes.root}>

                <Header/>

                {/*
                <PDNAppBar/>

                <div className={classes.banner}>
                    <img className={classes.bgImg} src={imgBanner}/>
                    <Grid container justify={"center"} spacing={0}>
                        <Grid item xs={12} className={classes.section} style={{paddingTop: 150}}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant={"h2"} className={classes.titleLight}>Servidores que intervienen
                                        en procesos de contratación</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h6" className={classes.titleSub}>
                                        Aquí puedes consultar, visualizar y descargar datos de:<br/>
                                        Los nombres, institución, cargo actividades y adscripción de los servidores
                                        públicos que intervienen en contrataciones públicas y otros actos de autoridad,
                                        y<br/>
                                        La relación de personas físicas y morales que se encuentran inhabilitados para
                                        celebrar contratos con instituciones públicas, por qué fueron inhabilitados, por
                                        cuánto tiempo y con qué monto
                                    </Typography>
                                    <br/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                */}



                <div id={"menu"} className={classes.bgContainer}>
                    <Grid container spacing={0} justify="center">
                        <Grid item xs={12} className={classes.section}>
                            <Grid container spacing={0}>
                                <Grid item md={4} xs={12} className={classes.center}>
                                    <div
                                        className={this.state.idContent !== 1 ? classes.card : classes.cardSeleccionada}>
                                        <img src={img1} alt="Servidores que intervinen en procesos de contratacion"
                                             className={classes.image}
                                             onClick={() => this.changeContent(1)}/>
                                        <Typography variant={this.state.idContent === 1 ? "h5" : "h6"}
                                                    className={classes.titleImg}>
                                            Servidores que intervienen en procesos de contratación
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item md={4} xs={12} className={classes.center}>
                                    <div
                                        className={this.state.idContent !== 2 ? classes.card : classes.cardSeleccionada}>
                                        <img src={img2} alt="Particulares inhabilitados" className={classes.image}
                                             onClick={() => this.changeContent(2)}/>
                                        <Typography variant={this.state.idContent === 2 ? "h5" : "h6"}
                                                    className={classes.titleImg}>
                                            Particulares inhabilitados
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item md={4} xs={12} className={classes.center}>
                                    <div
                                        className={this.state.idContent !== 3 ? classes.card : classes.cardSeleccionada}>
                                        <img src={img3} alt="Visualizaciones" className={classes.image}
                                             onClick={() => this.changeContent(3)}/>
                                        <Typography variant={this.state.idContent === 3 ? "h5" : "h6"}
                                                    className={classes.titleImg}>
                                            Visualizaciones
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                </div>



                <Grid container justify='center' spacing={0} className={classes.bgPanelTable}>
                    <Grid item xs={12} className={classes.section}>
                        {this.state.idContent === 1 &&
                        <div>
                            <TablaServidores/>
                        </div>
                        }
                        {this.state.idContent === 2 &&
                        <div>
                            <TablaParticulares/>
                        </div>
                        }
                        {this.state.idContent === 3 &&
                        <div>
                            <BubbleHolder_Servidores_Contrataciones/>
                        </div>
                        }
                    </Grid>
                </Grid>

                <Footer/>
            </div>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);