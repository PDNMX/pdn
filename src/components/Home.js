import React from 'react';
import './home.css';
import Grid from '@material-ui/core/Grid';
import Card from  '../components/SimpleCard'
import Header from '../components/Header/Header';
import Footer from "./Footer/Footer";
import Typography from "@material-ui/core/Typography";
import img1 from "../assets/img/chart1a.png";
import img2 from "../assets/img/person1.png";
import img3 from "../assets/img/folder.png";
import img4 from "../assets/img/person2.png";
import img5 from "../assets/img/2410008-256.png";
import Banner from "./Banner";
import FooterBlog from "./Blog/FooterBlog";


const charts1 =[
    {'key':'1','title':'Declaraciones 3x3','content':img1,'to':'/datos'},
    {'key':'2','title':'Servidores que intervienen en procesos de contratacion','content':img2,'to':'/datos'},
    {'key':'3','title':'Servidores públicos y particulares sancionados','content':img5,'to':'/sancionados'}
];
const charts2 =[
    {'key':'4','title':'Contrataciones públicas','content':img4,'to':'/datos'},
    {'key':'5','title':'Denuncias públicas','content':img3,'to':'/datos'},
    {'key':'6','title':'Comunicación del Sistema Nacional de Fiscalización','content':img1,'to':'/datos'}
];
class Home extends React.Component{
    render (){
        return (
            <div >
                <Header/>
                <Banner/>
                <Grid className="container">
                    <div className="App-intro">
                        <Typography variant={"display1"} align={"left"}>
                            Explora los sistemas de la PDN
                        </Typography>
                        <Grid container spacing={16}>
                            <Grid item xs={12}>
                                <Grid container  justify="center" spacing={Number(16)}>
                                    {charts1.map((prop,key) => (
                                        <Grid key={prop.key} item>
                                            <Card titleCard={prop.title} content={prop.content} to={prop.to}/>
                                        </Grid>
                                    ))}
                                </Grid>

                                <Grid container  justify="center" spacing={Number(16)}>
                                    {charts2.map((prop,key) => (
                                        <Grid key={prop.title} item>
                                            <Card titleCard={prop.title} content={prop.content} to={prop.to}/>
                                        </Grid>
                                    ))}
                                </Grid>

                            </Grid>

                        </Grid>
                    </div>
                </Grid>
                <FooterBlog/>
                <Footer/>
                </div>

        );
    }
}

export default Home;
