import React from 'react';
import {withStyles} from '@mui/styles';
import {Grid, Typography} from '@mui/material';
import PropTypes from 'prop-types';
import Footer from '../Home/Footer';
import img1 from "../../assets/img/servidores_publicos_sancionados.svg";
import img2 from "../../assets/img/particulares_sancionados.svg";
import img3 from "../../assets/img/servidores_visualizaciones.svg";
import BuscadorServidoresSancionados from './Servidores/BuscadorServidoresSancionados';
import BuscadorParticularesSancionados from './Particulares/BuscadorParticularesSancionados';
import Header from './Header/Header';
import Dashboard from "./dashboard/Servidores/Dashboard";
import Dashboard2 from "./dashboard/Particulares/Dashboard";
import classNames from 'classnames';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    whiteText: {
        color: theme.palette.textGrey.color
    },
    bgPanelTable: {
        backgroundColor: theme.palette.white.color,
    },
    section: {
        maxWidth: '1200px',
    },
    sectionT: {
        color: theme.palette.textGrey.color,
        marginTop : theme.spacing(7),

    },
    image: {
        width: '60px'
    },
    bgContainer: {
        backgroundColor: theme.palette.pestanas.bg,
    },
    card: {
        backgroundColor: theme.palette.pestanas.bg,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        margin: 0,
        "&:hover": {
            cursor: 'pointer',
            backgroundColor: theme.palette.S3.shade,
            transition: 'background 0.3s ease',
        },
    },
    cardSeleccionada: {
        backgroundColor: theme.palette.S3.shade,
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

function Index({classes}){
    const [idContent, setIdContent] = React.useState(1);
        return (
            <div className={classes.root}>
                <Header/>
                <Grid container justifyContent="center" className={classes.bgContainer}>
                    <Grid item xs={12} className={classes.section}>
                        <Grid container>
                            <Grid item md={3} xs={12}
                                  className={classNames(idContent !== 1 ? classes.card : classes.cardSeleccionada)}
                                  onClick={() => setIdContent(1)}>
                                <figure className={classes.figure}>
                                    <img src={img1} alt="Servidores públicos sancionados"
                                         className={classes.image}/>
                                </figure>
                                <Typography variant="subtitle1" style={{fontWeight: idContent === 1 ? 500 : 300}}
                                            className={classes.whiteText}>
                                    Buscador de Servidores públicos sancionados
                                </Typography>
                            </Grid>
                            <Grid item md={3} xs={12}
                                  className={classNames(idContent !== 2 ? classes.card : classes.cardSeleccionada)}
                                  onClick={() => setIdContent(2)}>
                                <figure className={classes.figure}>
                                    <img src={img2} alt="Particulares sancionados"
                                         className={classes.image}/>
                                </figure>
                                <Typography variant="subtitle1"
                                            style={{fontWeight: idContent === 2 ? 500 : 300}}
                                            className={classes.whiteText}>
                                    Buscador de Particulares sancionados
                                </Typography>
                            </Grid>
                            <Grid item md={3} xs={12}
                                  className={classNames(idContent !== 3 ? classes.card : classes.cardSeleccionada)}
                                  onClick={() => setIdContent(3)}>

                                <figure className={classes.figure}>
                                    <img src={img3} alt="Visor de datos (Servidores públicos sancionados)"
                                         className={classes.image}/>
                                </figure>

                                <Typography variant="subtitle1"
                                            style={{fontWeight: idContent === 3 ? 500 : 300}}
                                            className={classes.whiteText}>
                                    Visor de datos (Servidores públicos sancionados)
                                </Typography>
                            </Grid>
                            <Grid item md={3} xs={12}
                                  className={classNames(idContent !== 4 ? classes.card : classes.cardSeleccionada)}
                                  onClick={() => setIdContent(4)}>

                                <figure className={classes.figure}>
                                    <img src={img3} alt="Visor de datos (Particulares sancionados)"
                                         className={classes.image}/>
                                </figure>

                                <Typography variant="subtitle1"
                                            style={{fontWeight: idContent === 4 ? 500 : 300}}
                                            className={classes.whiteText}>
                                    Visor de datos (Particulares sancionados)
                                </Typography>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
                <Grid container justifyContent='center' className={classes.bgPanelTable}>
                    <Grid item xs={12} className={classes.sectionT}>
                        {idContent === 1 &&
                        <BuscadorServidoresSancionados/>
                        }
                        {idContent === 2 &&
                        <BuscadorParticularesSancionados/>
                        }
                        {idContent === 3 &&
                        <Dashboard/>
                        }
                        {idContent === 4 &&
                        <Dashboard2/>
                        }
                    </Grid>
                </Grid>
                < Footer/>
            </div>
        );


}

Index.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);
