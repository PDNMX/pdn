import React from 'react';
import {withStyles} from '@material-ui/core/styles'
import {Typography} from "@material-ui/core"
import PropTypes from 'prop-types';
import Footer from '../Home/Footer';
import TablaServidores from "./TablaServidores";
import Grid from "@material-ui/core/Grid/Grid";
import img1 from "../../assets/img/servidores_intervienen_contratacion.svg";
import img2 from "../../assets/img/servidores_particulares_inhabilitados.svg";
import img3 from "../../assets/img/servidores_visualizaciones.svg";
import Header from './Header/Header';
import classNames from 'classnames';
import Dashboard from "./Dashboard/Dashboard";
import ScrollToTopButton from "../Navigation/ScrollToTopButton";
import TablaParticularesSancionados from "../Sancionados/Particulares/TablaParticularesSancionados";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    whiteText: {
        color: theme.palette.textGrey.color
    },
    bgPanelTable: {
        backgroundColor: theme.palette.white.color,
        [theme.breakpoints.up('sm')]: {
            marginBottom: theme.spacing(7),
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(4),
        },
    },
    section: {
        maxWidth: '1200px',
    },
    sectionT: {
        color: theme.palette.textGrey.color,
        marginTop : theme.spacing(7)
    },
    image: {
        width: '60px'
    },
    bgContainer: {
        backgroundColor: theme.palette.pestanas.bg,
    },
    center: {
        textAlign: 'center'
    },
    links: {
        backgroundColor: theme.palette.grisTenue.color
    },
    card: {
        backgroundColor: theme.palette.pestanas.bg,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        margin: 0,
    },
    cardSeleccionada: {
        backgroundColor: theme.palette.pestanas.activa,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        margin: 0,
    },
    figure: {
        display: 'inline-block',
        float: 'left',
        margin: 0,
        padding: 0,
        paddingRight: '8px'
    }
});

class Index extends React.Component {
    state = {
        idContent: 3
    };
    changeContent = id => {
        this.setState({idContent: id});
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>

                <Header/>

                {/* TABS */}
                <Grid container spacing={0} justify="center" className={classes.bgContainer}>
                    <Grid item xs={12} className={classes.section}>
                        <Grid container spacing={0}>
                            <Grid item md={4} xs={12}
                                  onClick={() => this.changeContent(3)}
                                  className={classNames(this.state.idContent !== 3 ? classes.card : classes.cardSeleccionada, 'tab')}>

                                <figure className={classes.figure}>
                                    <img src={img3} alt="Visor de datos" className={classes.image}/>
                                </figure>
                                <Typography variant="subtitle1"
                                            style={{fontWeight: this.state.idContent === 3 ? 500 : 300}}
                                            className={classes.whiteText}>
                                    Visor de datos
                                </Typography>

                            </Grid>
                            <Grid item md={4} xs={12}
                                  onClick={() => this.changeContent(1)}
                                  className={classNames(this.state.idContent !== 1 ? classes.card : classes.cardSeleccionada, 'tab')}>

                                <figure className={classes.figure}>
                                    <img src={img1} alt="Servidores que intervinen en procesos de contratacion"
                                         className={classes.image}/>
                                </figure>
                                <Typography variant="subtitle1" className={classes.whiteText}
                                            style={{fontWeight: this.state.idContent === 1 ? 500 : 300}}
                                >
                                    Buscador de Servidores que intervienen en procesos de contratación
                                </Typography>

                            </Grid>

                            <Grid item md={4} xs={12}
                                  onClick={() => this.changeContent(2)}
                                  className={classNames(this.state.idContent !== 2 ? classes.card : classes.cardSeleccionada, 'tab')}>

                                <figure className={classes.figure}>
                                    <img src={img2} alt="Particulares inhabilitados" className={classes.image}/>
                                </figure>
                                <Typography variant="subtitle1"
                                            style={{fontWeight: this.state.idContent === 2 ? 500 : 300}}
                                            className={classes.whiteText}>

                                    Buscador de Particulares inhabilitados
                                </Typography>

                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>

                <Grid container justify='center' spacing={0} className={classes.bgPanelTable}>
                    <Grid item xs={12} className={classes.sectionT}>
                        {this.state.idContent === 1 &&
                        <TablaServidores/>
                        }
                        {this.state.idContent === 2 &&
                        <TablaParticularesSancionados/>
                        /*<TablaParticulares/>*/
                        }
                        {this.state.idContent === 3 &&
                        <Dashboard/>
                        }
                    </Grid>
                </Grid>
                <Footer/>
                <ScrollToTopButton/>
            </div>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);