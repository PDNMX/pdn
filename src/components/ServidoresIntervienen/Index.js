import React from 'react';
import {withStyles} from '@material-ui/core/styles'
import {Typography} from "@material-ui/core"
import PropTypes from 'prop-types';
import Footer from '../Home/Footer';
import TablaServidores from "./TablaServidores";
import TablaParticulares from "./TablaParticulares";
import Grid from "@material-ui/core/Grid/Grid";
import img1 from "../../assets/img/servidores_intervienen_contratacion.svg";
import img2 from "../../assets/img/servidores_particulares_inhabilitados.svg";
import img3 from "../../assets/img/servidores_visualizaciones.svg";
import BubbleHolderServidoresContrataciones from "./BubbleHolder_Servidores_Contrataciones";
import Header from './Header/Header';
import './s2.css';
import classNames from 'classnames';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    whiteText: {
        color: '#fff', //theme.palette.titleBanner.color,
    },
    bgPanelTable: {
        backgroundColor: theme.palette.white.color,
        [theme.breakpoints.up('sm')]: {
            marginBottom: theme.spacing(30),
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(10),
        },

    },
    section: {
        maxWidth: '1200px',
    },
    sectionT: {
        maxWidth: '1200px',
        overflowX : 'auto'
    },
    image: {
        width: '60px',
        padding: 0,
        margin: 0,
        border: 0
    },
    bgContainer: {
        backgroundColor: '#34b3eb',//theme.palette.azul.color,
    },
    links: {
        backgroundColor: theme.palette.grisTenue.color
    },
    card: {
        backgroundColor: '#34b3eb', //theme.palette.azul.color,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        margin: 0,
    },
    cardSeleccionada: {
        backgroundColor: 'grey',//theme.palette.white.color,
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

                {/* TABS */}
                <Grid container spacing={0} justify="center" className={classes.bgContainer}>
                    <Grid item xs={12} className={classes.section}>
                        <Grid container spacing={0}>
                            <Grid item md={4} xs={12}
                                  onClick={() => this.changeContent(1)}
                                  className={classNames(this.state.idContent !== 1 ? classes.card : classes.cardSeleccionada, 'tab')}>

                                <figure className={classes.figure}>
                                    <img src={img1} alt="Servidores que intervinen en procesos de contratacion"
                                         className={classes.image} />
                                </figure>
                                <Typography variant="subtitle1" className={classes.whiteText}
                                            style={{fontWeight: this.state.idContent === 1 ? 500: 300}}
                                >
                                    Buscador de Servidores que intervienen en procesos de contratación
                                </Typography>

                            </Grid>

                            <Grid item md={4} xs={12}
                                  onClick={() => this.changeContent(2)}
                                  className={ classNames(this.state.idContent !== 2 ? classes.card : classes.cardSeleccionada, 'tab')}>

                                <figure className={classes.figure}>
                                <img src={img2} alt="Particulares inhabilitados" className={classes.image}/>
                                </figure>
                                <Typography variant="subtitle1" style={{fontWeight: this.state.idContent === 2 ? 500: 300}}
                                            className={classes.whiteText}>

                                    Buscador de Particulares inhabilitados
                                </Typography>

                            </Grid>

                            <Grid item md={4} xs={12}
                                  onClick={() => this.changeContent(3)}
                                  className= {classNames (this.state.idContent !== 3 ? classes.card : classes.cardSeleccionada, 'tab')}>

                                <figure className={classes.figure}>
                                    <img src={img3} alt="Visualizaciones" className={classes.image}/>
                                </figure>
                                <Typography variant= "subtitle1"
                                            style={{fontWeight: this.state.idContent === 3? 500: 300}}
                                            className={classes.whiteText}>
                                    Visualizaciones de datos
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
                            <TablaParticulares/>
                        }
                        {this.state.idContent === 3 &&
                            <BubbleHolderServidoresContrataciones/>
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