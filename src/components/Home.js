import React from 'react';
import './home.css';
import imgHeader from "../assets/img/BannereDark_PDN.png";
import Grid from '@material-ui/core/Grid';
import Card from  '../components/SimpleCard'
import Header from '../components/Header/Header';
import Footer from "./Footer/Footer";
import Typography from "@material-ui/core/Typography";
import LineChart from './charts/LineChart';

const graph1 = <LineChart/>;


const charts1 =[
    {'key':'1','title':'Declaraciones 3x3','content':graph1},
    {'key':'2','title':'Servidores que intervienen en procesos de contratacion','content':graph1},
    {'key':'3','title':'Servidores públicos y particulares sancionados','content':graph1}
];
const charts2 =[
    {'key':'4','title':'Contrataciones públicas','content':graph1},
    {'key':'5','title':'Denuncias públicas','content':graph1},
    {'key':'6','title':'Comunicación del Sistema Nacional de Fiscalización','content':graph1}
];
class Home extends React.Component{
    render (){
        return (
            <div className="App">
                <Header/>
                <img style={{width: '100%', height: 'auto'}} src={imgHeader}/>
                <div className="App-intro">
                     <Typography variant={"display1"} align={"left"}>
                        Explora los sistemas de la PDN
                    </Typography>
                    <Grid container spacing={16}>
                        <Grid item xs={12}>
                            <Grid container  justify="center" spacing={Number(16)}>
                                {charts1.map((prop,key) => (
                                    <Grid key={prop.key} item>
                                        <Card titleCard={prop.title} content={prop.content}/>
                                    </Grid>
                                ))}
                            </Grid>

                            <Grid container  justify="center" spacing={Number(16)}>
                                {charts2.map((prop,key) => (
                                    <Grid key={prop.title} item>
                                        <Card titleCard={prop.title} content={prop.content}/>
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
