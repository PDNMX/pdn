import React from 'react';
import './home.css';
import imgHeader from "../assets/img/BannereDark_PDN.png";
import Grid from '@material-ui/core/Grid';
import Card from  '../components/SimpleCard'
import Header from '../components/Header/Header';
import Footer from "./Footer/Footer";

const charts1 =[
    'Declaraciones 3x3',
    'Servidores que intervienen en procesos de contratacion',
    'Servidores públicos y particulares sancionados'
];
const charts2 =[
    'Contrataciones públicas',
    'Denuncias públicas',
    'Comunicación del Sistema Nacional de Fiscalización'
];
class Home extends React.Component{
    render (){
        return (
            <div className="App">
                <Header/>
                <div className="App-intro">
                    <img style={{width: '100%', height: 'auto'}} src={imgHeader}/>

                    <Grid container spacing={16}>
                        <Grid item xs={12}>
                            <Grid container  justify="center" spacing={Number(16)}>
                                {charts1.map(value => (
                                    <Grid key={value} item>
                                        <Card titleCard={value}/>
                                    </Grid>
                                ))}
                            </Grid>

                            <Grid container  justify="center" spacing={Number(16)}>
                                {charts2.map(value => (
                                    <Grid key={value} item>
                                        <Card titleCard={value}/>
                                    </Grid>
                                ))}
                            </Grid>

                        </Grid>

                    </Grid>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Home;
