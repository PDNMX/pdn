import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
//import Typography from "@material-ui/core/Typography";
import Header from './Header/Header';
import Grid from '@material-ui/core/Grid';
import Footer from "../Home/Footer";

//import LabeledHeatmap from './Charts/LabeledHeatmap';
//import Treemap from './Charts/Treemap';
//import ScatterPlot from "./Charts/ScatterPlot";

import Busqueda from "./Busqueda";
import Cifras from "./Cifras";
import Perspectivas from "./Perspectivas";
import Top from './Top';
import Descarga from "../Compartidos/Descarga";
import Disclaimer from "./Disclaimer";
import img1 from "../../assets/img/servidores_publicos_sancionados.svg";
//import img2 from "../../assets/img/particulares_sancionados.svg";
import img3 from "../../assets/img/servidores_visualizaciones.svg";
import {Typography} from "@material-ui/core";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    item:{
        maxWidth: 1200,
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(8),
        paddingTop: theme.spacing(8),
       // overflow: "auto"
    },
    disclaimer: {
        maxWidth: 1200,
        paddingTop: theme.spacing(2),
        padding: theme.spacing(1),
    },

    container: {
        backgroundColor: '#fff'
    },

    tabItem:{
        backgroundColor: theme.palette.pestanas.bg,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        margin: 0,
        '&:hover':{
            cursor: 'pointer'
        }
    },
    selectedTabItem:{
        backgroundColor: theme.palette.pestanas.activa,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        margin: 0,
    },
    tabIcon: {
        width: 60,
    },
    figure: {
       display: 'inline-block',
        float: 'left',
        margin: 0,
        padding: 0,
        paddingRight: '8px'
    },
    tabContainer: {
        backgroundColor: theme.palette.pestanas.bg
    }

});


class Index extends React.Component {

    state = {
        selectedTab: 0
    };


    handleSelectTab = t => {

      this.setState({
          selectedTab: t
      })
    };

    render() {
        const {classes} = this.props;
        const {selectedTab} = this.state;

        const isSelected = t => t === this.state.selectedTab;

        return (
            <div className={classes.root}>
                <Header/>

                <Grid container spacing={0} justify="center" className={classes.tabContainer}>
                    <Grid item xs={12} style={{padding:0, maxWidth: 1200}}>

                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}
                                  onClick={ () => this.handleSelectTab(0)}
                                  id={0}
                                  className={isSelected(0)?classes.selectedTabItem:classes.tabItem}>

                                <figure className={classes.figure}>
                                    <img src={img3} className={classes.tabIcon} alt="Visualiza"/>
                                </figure>

                                <Typography color='textPrimary' style={{fontWeight: isSelected(0)?500:300, paddingTop: 15}}>
                                    Visualiza las contrataciones
                                </Typography>

                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}
                                  onClick={() => this.handleSelectTab(1)}
                                  id={1}
                                  className={isSelected(1)?classes.selectedTabItem:classes.tabItem}>

                                <figure className={classes.figure}>
                                    <img src={img1} className={classes.tabIcon} alt="explora"/>
                                </figure>

                                <Typography color='textPrimary' style={{fontWeight: isSelected(1)?500:300, paddingTop: 15}}>
                                    Explora las contrataciones
                                </Typography>

                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>


                {selectedTab === 0?
                    <Grid container spacing={0} justify="center" className={classes.container}>
                        <Grid item xs={12} className={classes.item} id={"test"} style={{"overflow":"auto"}}>
                            <Busqueda/>
                        </Grid>
                    </Grid>
                    :
                    <div>
                        <Grid container spacing={0} justify="center">
                            <Grid item xs={12} className={classes.disclaimer}>
                                <Disclaimer/>
                            </Grid>
                        </Grid>

                        <Grid container spacing={0} justify="center" className={classes.container}>
                            <Grid item xs={12} className={classes.item}>
                                <Cifras/>
                            </Grid>
                        </Grid>


                        <Grid container spacing={0} justify="center" className={classes.container}>
                            <Grid item xs={12} className={classes.item}>
                                <Top/>
                            </Grid>
                        </Grid>

                    </div>
                }


                <Grid container spacing={0} justify="center" style={{backgroundColor: "#34b3eb"}}>
                    <Grid item xs={12} className={classes.item}>

                        <Perspectivas/>

                    </Grid>
                </Grid>

                <Grid container spacing={0} justify="center" className={classes.container} style={{backgroundColor: '#f6f6f6'}}>
                    <Grid item xs={12} className={classes.item}>
                        <Descarga url={"https://drive.google.com/file/d/1XOYDLVv-RqcMs8_hzkZ0fjC9FYh2psFw/view"}/>
                    </Grid>
                </Grid>


                {/*

                <Grid container spacing={0} justify="center" className={classes.container}>
                    <Grid item xs={12} className={classes.item}>
                        <ScatterPlot/>
                    </Grid>
                </Grid>

                <Grid container spacing={0} justify="center" className={classes.container}>
                    <Grid item xs={12} className={classes.item}>
                        <Typography paragraph> Heatmap </Typography>
                        <LabeledHeatmap/>
                    </Grid>
                </Grid>

                <Grid container spacing={0} justify="center" className={classes.container}>
                    <Grid item xs={12} className={classes.item}>
                        <Typography paragraph> Treemap </Typography>
                        <Treemap/>
                    </Grid>
                </Grid>
                */}

                <Footer/>
            </div>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);
