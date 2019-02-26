import React from 'react';
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Footer from '../Home/Footer';
import Grid from "@material-ui/core/Grid/Grid";
import img1 from "../../assets/img/servidores_publicos_sancionados.svg";
import img2 from "../../assets/img/particulares_sancionados.svg";
import img3 from "../../assets/img/servidores_visualizaciones.svg";
import TablaServidoresSancionados from './Servidores/TablaServidoresSancionados';
import TablaParticularaesSancionados from './Particulares/TablaParticularesSancionados';
import BubbleHolder from './Visualizaciones/BubbleHolder';
import './s3.css';
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
    whiteText: {
        color: theme.palette.titleBanner.color,
        minHeight: '100px'
    },
    textDark: {
        color: theme.palette.textNormal,
        textAlign: 'justify'
    },
    bgPanelTable: {
        backgroundColor: theme.palette.white.color,
        marginBottom: '266px'
    },
    section: {
        maxWidth: '1200px'
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

                {/*
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
                */}

                <div id="menu" className={classes.bgContainer}>
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