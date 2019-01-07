import React from 'react';
import SingleLineGridList from './SingleLineGridList';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
//import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
//import { Slide } from 'material-auto-rotating-carousel';
//import {red, green, blue} from '@material-ui/core/colors';
import Tarjeta from './Tarjeta';
import Grid from '@material-ui/core/Grid';

import C1 from '../../assets/about/banner4.png';//'../assets/banner1.png';
import C2 from '../../assets/about/banner2.png';
import C3 from '../../assets/about/banner3.png';

const styles = theme => ({
    root: {
        flexGrow:1,
        paddingTop: theme.spacing.unit*4,
        paddingBottom: theme.spacing.unit*4,
    },
    title: {
        color: '#96cb99'
    },
});
class Carrusel extends React.Component{


    handleClick = (e) => {
        //e.preventDefault();
        console.log('The link was clicked.');
    };

    render(){

        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Typography variant={'display2'} className={classes.title}>Conoce más</Typography>
                <br/>
                <br/>

                <Grid container spacing={24}>
                    <Grid item xs={12} md={4}>
                        <Tarjeta img={C1} title="Proximamente" text="Datatón Anticorrupción" url='https://www.plataformadigitalnacional.org/blog/por-una-plataforma-digital-nacional-incluyente/'/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Tarjeta img={C2} title="Conoce" text="Guía de Apertura de Datos Anticorrupción" url="https://www.plataformadigitalnacional.org/blog/que-es-la-guia-de-apertura-anticorrupcion/"/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Tarjeta img={C3} title="Conoce" text="Trabajo del Grupo Asesor de la PDN" url="https://www.plataformadigitalnacional.org/blog/primera-sesion-del-grupo-asesor-de-la-plataforma-digital-nacional/"/>
                    </Grid>
                </Grid>
                {/*<SingleLineGridList/>*/}

                {/*
                <AutoRotatingCarousel
                    label='Get started'
                    open={true}
                    //onClose={() => setState({ open: false })}
                    style={{ position: 'absolute' }}
                >
                    <Slide
                        media={<img src='http://www.icons101.com/icon_png/size_256/id_79394/youtube.png' />}
                        mediaBackgroundStyle={{ backgroundColor: red[400] }}
                        style={{ backgroundColor: red[600] }}
                        title='This is a very cool feature'
                        subtitle='Just using this will blow your mind.'
                    />
                    <Slide
                        media={<img src='http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png' />}
                        mediaBackgroundStyle={{ backgroundColor: blue[400] }}
                        style={{ backgroundColor: blue[600] }}
                        title='Ever wanted to be popular?'
                        subtitle='Well just mix two colors and your are good to go!'
                    />
                    <Slide
                        media={<img src='http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png' />}
                        mediaBackgroundStyle={{ backgroundColor: green[400] }}
                        style={{ backgroundColor: green[600] }}
                        title='May the force be with you'
                        subtitle='The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe.'
                    />
                </AutoRotatingCarousel>*/}
            </div>
        )
    }

}

Carrusel.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(Carrusel);