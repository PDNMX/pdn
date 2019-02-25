import React from 'react';
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Footer from '../Home/Footer';
import Header from "../PDNAppBar/PDNAppBar";
import Grid from "@material-ui/core/Grid/Grid";
import img1 from "../../assets/img/servidores_publicos_sancionados.svg";
import img2 from "../../assets/img/particulares_sancionados.svg";
import img3 from "../../assets/img/servidores_visualizaciones.svg";
import TablaServidoresSancionados from './Servidores/TablaServidoresSancionados';
import TablaParticularaesSancionados from './Particulares/TablaParticularesSancionados';
import BubbleHolder from './Visualizaciones/BubbleHolder';
import imgBanner from '../../assets/banners/FOTO_BANNER_2.jpg';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    title: {
        color: theme.palette.black.color,
        maxHeight: '20px',
        paddingBottom: '56px'
    },
    whiteText: {
        color: theme.palette.titleBanner.color,
        minHeight: '100px'
    },
    titleLight: {
        color: theme.palette.titleBanner.color,
        //   paddingTop : '11%'
    },
    titleSub: {
        color: theme.palette.titleBanner.color,
        paddingTop: '10px'
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
    },
    banner: {
        height: '600px',
        zIndex: '1',
        position: 'relative',
        overflow: 'hidden',
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
                <div className={classes.banner}>
                    <img alt="PDN" className={classes.bgImg} src={imgBanner}/>
                    <Grid container justify={"center"} spacing={0}>
                        <Grid item xs={12} className={classes.section} style={{paddingTop: 150}}>
                            <Grid container spacing={24}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h2" className={classes.titleLight}>
                                        Servidores públicos <br/>y particulares sancionados
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h6" className={classes.titleSub}>
                                        Aquí puedes consultar, visualizar y descargar datos de:<br/>
                                        Las sanciones o inhabilitación firmes en contra de servidores públicos por actos
                                        vinculados con faltas administrativas graves,<br/>
                                        Los particulares que están inhabilitados o cuentan con impedimentos para ser
                                        contratados como servidores públicos, y<br/>
                                        Las persona físicas que están inhabilitadas o cuentan con impedimentos para ser
                                        contratistas o prestadores de servicios en el gobierno por faltas
                                        administrativas graves.
                                    </Typography><br/>
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
                                        <img src={img1} alt="Servidores públicos sancionados"
                                             className={classes.image}
                                             onClick={() => this.changeContent(1)}/>
                                        <Typography variant={this.state.idContent === 1 ? "h5" : "h6"}
                                                    className={classes.whiteText}>
                                            Servidores públicos sancionados
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item md={4} xs={12} className={classes.center}>
                                    <div
                                        className={this.state.idContent !== 2 ? classes.card : classes.cardSeleccionada}>
                                        <img src={img2} alt="Particulares sancionados"
                                             className={classes.image}
                                             onClick={() => this.changeContent(2)}/>
                                        <Typography variant={this.state.idContent === 2 ? "h5" : "h6"}
                                                    className={classes.whiteText}>
                                            Particulares sancionados
                                        </Typography>
                                    </div>


                                </Grid>
                                <Grid item md={4} xs={12} className={classes.center}>
                                    <div
                                        className={this.state.idContent !== 3 ? classes.card : classes.cardSeleccionada}>
                                        <img src={img3} alt="Visualizaciones"
                                             className={classes.image}
                                             onClick={() => this.changeContent(3)}/>
                                        <Typography variant={this.state.idContent === 3 ? "h5" : "h6"}
                                                    className={classes.whiteText}>
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
                            <Grid container spacing={24}>
                                <Grid item xs={12}>
                                    {this.state.idContent === 1 &&
                                    <Typography variant={'h6'} className={classes.title}>
                                        Servidores públicos sancionados</Typography>
                                    }
                                    {this.state.idContent === 2 &&
                                    <Typography variant={'h6'} className={classes.title}>
                                        Particulares sancionados</Typography>
                                    }
                                    {this.state.idContent === 3 &&
                                    <Typography variant={'h6'} className={classes.title}>
                                        Visualizaciones</Typography>
                                    }
                                </Grid>
                                <Grid item xs={6} style={{paddingBottom: '105px'}}>
                                    {this.state.idContent === 1 &&
                                    <Typography variant={'subheading'} className={classes.textPrimary}>
                                        Consulta los datos de las sanciones o inhabilitación firmes en contra de
                                        servidores públicos por actos vinculados con faltas administrativas
                                        graves, la anotación de aquellas abstenciones que hayan realizado las
                                        autoridades investigadoras o el Tribunal Federal de Justicia
                                        Administrativa en términos de los artículos 77 y 80 de la Ley de
                                        Responsabilidades.
                                    </Typography>
                                    }
                                    {this.state.idContent === 2 &&
                                    <Typography variant={'subheading'} className={classes.textPrimary}>
                                        Consulta los datos de la relación de particulares que cuentan con algún
                                        impedimento o están inhabilitadas para ser contratadas como servidores
                                        públicos, y de persona físicas y morales que de igual forma cuentan con
                                        un impedimento o están inhabilitadas como prestadoras de servicio o
                                        contratista derivado de una sanción grave por una falta
                                        administrativa.</Typography>
                                    }
                                    {this.state.idContent === 3 &&
                                    <Typography variant={'subheading'} className={classes.textPrimary}>
                                        Consulta cuáles son las instituciones con mayor número de servidores
                                        públicos sancionados, y las que han sancionado al mayor número de
                                        particulares.</Typography>
                                    }
                                </Grid>
                                <Grid item xs={6} style={{paddingBottom: '105px'}}>
                                    {this.state.idContent === 1 &&
                                    <Typography variant={'subheading'} className={classes.textPrimary}>

                                    </Typography>
                                    }
                                    {this.state.idContent === 2 &&
                                    <Typography variant={'subheading'} className={classes.textPrimary}>
                                    </Typography>
                                    }
                                    {this.state.idContent === 3 &&
                                    <Typography variant={'subheading'} className={classes.textPrimary}>
                                    </Typography>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>


                </div>
                */
                }

                <div className={classes.bgPanelTable}>
                    <Grid container justify={'center'} spacing={0}>
                        <Grid item xs={12} className={classes.section}>
                            <Grid container spacing={32} justify={'center'} className={classes.section}>
                                <Grid item xs={12}>
                                    {this.state.idContent === 1 &&
                                    <div>
                                        <TablaServidoresSancionados/>
                                    </div>
                                    }
                                    {this.state.idContent === 2 &&
                                    <div>
                                        <TablaParticularaesSancionados/>
                                    </div>
                                    }
                                    {this.state.idContent === 3 &&
                                    <div>
                                        <BubbleHolder/>
                                    </div>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                < Footer/>
            </div>
        );
    }

}

Index.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);