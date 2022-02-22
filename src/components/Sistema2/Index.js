import React from 'react';
import withStyles from '@mui/styles/withStyles';
import {Grid, Typography} from "@mui/material"
import Footer from "../HomeV2/Footer";
import BuscadorS2 from "./BuscadorS2";
import Header from './Header/Header';
import classNames from 'classnames';
import Dashboard from "./Dashboard/Dashboard";
import BuscadorParticularesSancionados from '../Sancionados/Particulares/BuscadorParticularesSancionados';
import img1 from "../../assets/img/servidores_intervienen_contratacion.svg";
import img2 from "../../assets/img/servidores_particulares_inhabilitados.svg";
import img3 from "../../assets/img/servidores_visualizaciones.svg";
import bgimg from "../../assets/rediseno/fondo_cruces.png";
const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundImage: `url(${bgimg})`,
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed"
    },
    tabText: {
        //color: theme.palette.secondary.contrastText
    },
    tabsSection: {
        maxWidth: '1200px',
    },
    contentsSection: {
        color: theme.palette.secondary.contrastText,
        maxWidth: '1200px',
        marginTop : theme.spacing(7),
    },
    bgContainer: {
        // backgroundColor: theme.palette.pestanas.bg,
        paddingTop: theme.spacing(8),
    },
    card: {
        color: theme.palette.S2.color,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        margin: 0,
        "&:hover": {
            cursor: 'pointer',
            backgroundColor: theme.palette.background.opaque,
            transition: 'background 0.3s ease',
        },
    },
    selectedCard: {
        backgroundColor: theme.palette.background.opaque,
        color: theme.palette.S2.color,
        borderStyle: 'solid',
        borderColor: theme.palette.secundario.main,
        borderRadius: '5px 5px 5px 5px',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        margin: 0,
    },
    logo: {
        width: '60px'
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
            return <BuscadorS2/>;
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
                <Grid item xs={12} className={classes.tabsSection}>
                    <Grid container spacing={0}>
                        <Grid item md={4} xs={12}
                              onClick={() => setContentId(1)}
                              className={classNames(contentId !== 1 ? classes.card : classes.selectedCard)}>

                            <figure className={classes.figure}>
                                <img src={img1} alt="Servidores que intervinen en procesos de contratacion"
                                     className={classes.logo}/>
                            </figure>
                            <Typography variant="subtitle1" className={classes.tabText}
                                        style={{fontWeight: contentId === 1 ? 500 : 300}}
                            >
                                Buscador de Servidores que intervienen en procesos de contratación
                            </Typography>
                        </Grid>

                        <Grid item md={4} xs={12} onClick={() => setContentId(2)}
                              className={classNames(contentId !== 2 ? classes.card : classes.selectedCard)}>

                            <figure className={classes.figure}>
                                <img src={img2} alt="Particulares inhabilitados" className={classes.logo}/>
                            </figure>
                            <Typography variant="subtitle1"
                                        style={{fontWeight: contentId === 2 ? 500 : 300}}
                                        className={classes.tabText}>

                                Buscador de Particulares inhabilitados
                            </Typography>
                        </Grid>

                        <Grid item md={4} xs={12}
                              onClick={() => setContentId(3)}
                              className={classNames(contentId !== 3 ? classes.card : classes.selectedCard)}>

                            <figure className={classes.figure}>
                                <img src={img3} alt="Visor de datos" className={classes.logo}/>
                            </figure>
                            <Typography variant="subtitle1"
                                        style={{fontWeight: contentId === 3 ? 500 : 300}}
                                        className={classes.tabText}>
                                Visor de datos
                            </Typography>

                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

            <Grid container justifyContent='center' spacing={0}>
                <Grid item xs={12} className={classes.contentsSection}>
                        <TabContents index={contentId}/>
                </Grid>
            </Grid>

            <Footer/>
        </div>
    );
};

export default withStyles(styles)(Index);
