import React from 'react';
import withStyles from '@mui/styles/withStyles';
import Typography from "@mui/material/Typography"
import Footer from '../Home/Footer';
import TablaServidores from "./TablaServidores";
import Grid from "@mui/material/Grid";
import img1 from "../../assets/img/servidores_intervienen_contratacion.svg";
import img2 from "../../assets/img/servidores_particulares_inhabilitados.svg";
import img3 from "../../assets/img/servidores_visualizaciones.svg";
import Header from './Header/Header';
import classNames from 'classnames';
import Dashboard from "./Dashboard/Dashboard";
import BuscadorParticularesSancionados from '../Sancionados/Particulares/BuscadorParticularesSancionados';
const styles = theme => ({
    root: {
        flexGrow: 1
    },
    whiteText: {
        color: theme.palette.secondary.contrastText
    },
    bgPanelTable: {
        backgroundColor: "#ffffff"
    },
    section: {
        maxWidth: '1200px',
    },
    sectionT: {
        color: theme.palette.secondary.contrastText,
        maxWidth: 1200,
        marginTop : theme.spacing(7)
    },
    image: {
        width: '60px'
    },
    bgContainer: {
        // backgroundColor: theme.palette.pestanas.bg,
    },
    card: {
        // backgroundColor: theme.palette.pestanas.bg,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        margin: 0,
        "&:hover": {
            cursor: 'pointer',
            backgroundColor: theme.palette.S2.shade,
            transition: 'background 0.3s ease',
        },
    },
    cardSeleccionada: {
        backgroundColor: theme.palette.S2.shade,
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


const TabContents = props => {
    const {index} = props;
    switch (index) {
        case 1:
            return <TablaServidores/>;
        case 2:
            return <BuscadorParticularesSancionados/>;
        case 3:
            return <Dashboard/>;
        default:
            return <Dashboard/>;
    }
};

const Index = props => {
    const {classes} = props;
    const [contentId, setContentId] = React.useState( 1);

    return (
        <div className={classes.root}>
            <Header/>

            {/* TABS */}
            <Grid container spacing={0} justifyContent="center" className={classes.bgContainer}>
                <Grid item xs={12} className={classes.section}>
                    <Grid container spacing={0}>

                        <Grid item md={4} xs={12}
                              onClick={() => setContentId(1)}
                              className={classNames(contentId !== 1 ? classes.card : classes.cardSeleccionada)}>

                            <figure className={classes.figure}>
                                <img src={img1} alt="Servidores que intervinen en procesos de contratacion"
                                     className={classes.image}/>
                            </figure>
                            <Typography variant="subtitle1" className={classes.whiteText}
                                        style={{fontWeight: contentId === 1 ? 500 : 300}}
                            >
                                Buscador de Servidores que intervienen en procesos de contratación
                            </Typography>

                        </Grid>

                        <Grid item md={4} xs={12} onClick={() => setContentId(2)}
                              className={classNames(contentId !== 2 ? classes.card : classes.cardSeleccionada)}>

                            <figure className={classes.figure}>
                                <img src={img2} alt="Particulares inhabilitados" className={classes.image}/>
                            </figure>
                            <Typography variant="subtitle1"
                                        style={{fontWeight: contentId === 2 ? 500 : 300}}
                                        className={classes.whiteText}>

                                Buscador de Particulares inhabilitados
                            </Typography>

                        </Grid>
                        <Grid item md={4} xs={12}
                              onClick={() => setContentId(3)}
                              className={classNames(contentId !== 3 ? classes.card : classes.cardSeleccionada)}>

                            <figure className={classes.figure}>
                                <img src={img3} alt="Visor de datos" className={classes.image}/>
                            </figure>
                            <Typography variant="subtitle1"
                                        style={{fontWeight: contentId === 3 ? 500 : 300}}
                                        className={classes.whiteText}>
                                Visor de datos
                            </Typography>

                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

            <Grid container justifyContent='center' spacing={0} className={classes.bgPanelTable}>
                <Grid item xs={12} className={classes.sectionT}>
                    <TabContents index={contentId}/>
                </Grid>
            </Grid>
            <Footer/>
        </div>
    );
};

export default withStyles(styles)(Index);
