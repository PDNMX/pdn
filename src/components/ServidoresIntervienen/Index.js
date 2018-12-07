import React from 'react';
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Footer from '../Home/Footer';
import Header from "../PDNAppBar/PDNAppBar";
import TablaServidores from "./TablaServidores";
import TablaParticulares from "./TablaParticulares";
import Grid from "@material-ui/core/Grid/Grid";
import img1 from "../../assets/img/servidores_intervienen_contratacion.svg";
import img2 from "../../assets/img/servidores_particulares_inhabilitados.svg";
import img3 from "../../assets/img/servidores_visualizaciones.svg";
import BubbleHolder from "./BubbleHolder";
import "../../index.css";
import BubbleHolder_Servidores_Contrataciones from "./BubbleHolder_Servidores_Contrataciones";

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
        marginBottom : '266px'
    },
    section: {
        maxWidth: '1200px'
    },
    bgImg: {
        background: 'url(FOTO_BANNER_1.JPG)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        position: 'relative',
        zIndex: 1,
        paddingTop: '163px',
        paddingBottom: '192px',
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
            <div className={classes.root}>
                <Header/>
                <div id={"imgBanner"} className={classes.bgImg}>
                    <Grid container justify={"center"} spacing={0}>
                        <Grid item xs={12} className={classes.section}>
                            <Grid container spacing={24}>
                                <Grid item xs={6}>
                                    <Typography variant={"h2"} className={classes.titleLight}>Servidores que intervienen
                                        en procesos de contratación</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h6" className={classes.titleSub}>
                                        Aquí puedes consultar, visualizar y descargar datos de:
                                    </Typography>
                                    <br/>
                                    <Typography variant="h6" className={classes.titleSub}>
                                        Los nombres, institución, cargo actividades y adscripción de los servidores públicos que intervienen en contrataciones públicas y otros actos de autoridad, y
                                    </Typography>
                                    <br/>
                                    <Typography variant="h6" className={classes.titleSub}>
                                        La relación de personas físicas y morales que se encuentran inhabilitados para celebrar contratos con instituciones públicas, por qué fueron inhabilitados, por cuánto tiempo y con qué monto
                                    </Typography>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
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
                {/*
                 <div className={classes.bgPanelLight}>
                    <Grid container justify={'center'} spacing={0}>
                        <Grid item xs={12} className={classes.section}>
                            <Grid container spacing={32} justify={'center'} className={classes.section}>
                                <Grid item xs={12}>
                                    {this.state.idContent === 1 &&
                                    <Typography variant={'h6'} className={classes.title}>
                                        Servidores que intervienen en procesos de contratación</Typography>
                                    }
                                    {this.state.idContent === 2 &&
                                    <Typography variant={'h6'} className={classes.title}>Particulares
                                        inhabilitados</Typography>
                                    }
                                    {this.state.idContent === 3 &&
                                    <Typography variant={'h6'} className={classes.title}>
                                        Visualizaciones</Typography>
                                    }
                                </Grid>
                                <Grid item xs={6} style={{paddingBottom: '105px'}}>
                                    {this.state.idContent === 1 &&
                                    <Typography variant={"subheading"} className={classes.textPrimary}>
                                        Consulta los nombres, institución, cargo y actividades de y adscripción
                                        de los servidores públicos que intervengan en contrataciones y otros
                                        actos de autoridad.
                                    </Typography>
                                    }
                                    {this.state.idContent === 2 &&
                                    <Typography variant={"subheading"} className={classes.textPrimary}>
                                        Consulta la relación de particulares, personas físicas y morales, que se
                                        encuentren inhabilitados para celebrar contratos con los entes públicos,
                                        por
                                        qué fueron inhabilitados, por cuánto tiempo y con qué monto.
                                    </Typography>
                                    }
                                    {this.state.idContent === 3 &&
                                    <Typography variant={"subheading"} className={classes.textPrimary}>
                                        Consulta cuáles son las instituciones con el mayor número de sanciones a
                                        particulares, y mayor monto.
                                    </Typography>
                                    }
                                </Grid>
                                <Grid item xs={6} style={{paddingBottom: '105px'}}>
                                    {this.state.idContent === 1 &&
                                    <Typography variant={"subheading"} align={"justify"}>
                                        Además podrás consultar:<br/><br/>
                                        ¿Cuáles son las dependencias con más servidores públicos facultados para
                                        intervenir en procesos de contratación?<br/><br/>
                                        ¿Cuál es el puesto de los funcionarios que intervienen en estos
                                        procesos?
                                    </Typography>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                </div>
                */}

                <div className={classes.bgPanelTable}>
                    <Grid container justify={'center'} spacing={0}>
                        <Grid item xs={12} className={classes.section}>
                            <Grid container spacing={32} justify={'center'} className={classes.section}>
                                <Grid item xs={12}>
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