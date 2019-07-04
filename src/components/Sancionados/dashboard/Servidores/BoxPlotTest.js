import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import {Typography} from "@material-ui/core"
import rp from "request-promise";
import Button from "@material-ui/core/Button";
import * as d3plus from "d3plus-export";
import WhiskerSeries from "react-vis/es/plot/series/whisker-series";
import YAxis from "react-vis/es/plot/axis/y-axis";
import XAxis from "react-vis/es/plot/axis/x-axis";
import HorizontalGridLines from "react-vis/es/plot/horizontal-grid-lines";
import VerticalGridLines from "react-vis/es/plot/vertical-grid-lines";
import XYPlot from "react-vis/es/plot/xy-plot";




const styles = theme => ({
    frameChart: {
        marginTop: "15px",
        marginBottom: "15px"
    },
    titulo: {
        textAlign: "center",
        marginBottom: "30px",
    },
    descripcion: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "15px"
    },
    btnDownload:{
        textAlign: "right"
    }
});



function aux() {
    return new Promise((resolve, reject) => {
        let options = {
            uri: process.env.REACT_APP_HOST_PDNBACK+'/viz/servidores/getTemporalidadSanciones',
            json: true,
            method: "GET"
        };
        rp(options)
            .then(data => {
                resolve(data);
            }).catch(err => {
            alert("_No se pudo obtener la información");
            console.log(err);
        });
    });
}

let data = [
    {"year": 1991, "name":"alpha", "value": 15},
    {"year": 1992, "name":"alpha", "value": 34},
    {"year": 1991, "name":"alpha2", "value": 17},
    {"year": 1992, "name":"alpha2", "value": 65},
    {"year": 1991, "name":"beta", "value": 10},
    {"year": 1992, "name":"beta", "value": 10},
    {"year": 1991, "name":"beta2", "value": 40},
    {"year": 1992, "name":"beta2", "value": 38},
    {"year": 1991, "name":"gamma", "value": 5},
    {"year": 1992, "name":"gamma", "value": 10},
    {"year": 1991, "name":"gamma2", "value": 20},
    {"year": 1992, "name":"gamma2", "value": 34},
    {"year": 1991, "name":"delta", "value": 50},
    {"year": 1992, "name":"delta", "value": 43},
    {"year": 1991, "name":"delta2", "value": 17},
    {"year": 1992, "name":"delta2", "value": 35}
];

class BoxPlotTest extends React.Component {
    state= {

    };


    componentDidMount() {
        aux().then(result => {
            let aux = result.data.map(item => {
                return  {
                    "anios" : item.anios,
                    "total" : parseInt(item.total)
                }
            })
            this.setState({
                    methods: {
                        data: data,
                        id :"name",
                        x : "year",
                        y :"value",
                        time:"year"

                    }
                }
            )
        });
    }
    test = ()=>{
        let x = document.getElementById("graf")
        d3plus.saveElement( x, {type:"jpg",filename:"Duración de las sanciones",backgroundColor: 'white'})
    }


    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container spacing={0} justify='center' className={classes.frameChart}>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} className={classes.titulo}>
                            {"Box Plot"}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.btnDownload} >
                        {
                            this.state.methods && this.state.methods.data &&
                            <Button color={"primary"} variant={"outlined"} onClick={this.test}>Guardar</Button>
                        }
                    </Grid>
                    <Grid item xs={12} id={"viz"}>
                        <XYPlot width={300} height={400}>
                            <VerticalGridLines />
                            <HorizontalGridLines />
                            <XAxis />
                            <YAxis />
                            <WhiskerSeries
                                className="whisker-series-example"
                                data={[
                                    {x: 2013, y: 10, xVariance: 0.2, yVariance: 4},
                                    {x: 2014, y: 12, xVariance: 0.3, yVariance: 7},
                                    {x: 2015, y: 5, xVariance: 0.1, yVariance: 3},
                                    {x: 2016, y: 15, xVariance: 0.4, yVariance: 10},
                                    {x: 2017, y: 7, xVariance: 0.3, yVariance: 4}
                                ]}
                            />
                        </XYPlot>

                    </Grid>
                    <Grid item xs={12} className={classes.descripcion}>
                        <Typography>
                            Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem
                            Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un
                            impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de
                            textos y los mezcló de tal manera que logró hacer un libro de textos especimen.
                        </Typography>
                    </Grid>

                </Grid>

            </div>
        )
    }

}

BoxPlotTest.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BoxPlotTest);