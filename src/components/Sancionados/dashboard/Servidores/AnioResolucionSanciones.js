import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import {Typography} from "@material-ui/core"
import {LinePlot, Pie} from "d3plus-react";
import rp from "request-promise";
import MensajeErrorDatos from "../../../Tablas/MensajeErrorDatos";
import {FlexibleXYPlot} from "react-vis/es";
import VerticalGridLines from "react-vis/es/plot/vertical-grid-lines";
import HorizontalGridLines from "react-vis/es/plot/horizontal-grid-lines";
import XAxis from "react-vis/es/plot/axis/x-axis";
import YAxis from "react-vis/es/plot/axis/y-axis";
import LineMarkSeries from "react-vis/es/plot/series/line-mark-series";
import Hint from "react-vis/es/plot/hint";

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
        marginTop: "15px",
        marginBottom: "15px",
        textAlign : "justify"
    }
});

function aux() {
    return new Promise((resolve, reject) => {
        let options = {
            uri: process.env.REACT_APP_HOST_PDNBACK + '/viz/servidores/getAnioSancion',
            json: true,
            method: "GET"
        };
        rp(options)
            .then(data => {
                resolve(data);
            }).catch(err => {
            console.log(err);
            reject(err);
        });
    });
}


let color = ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
    "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
    "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800",
    "#FF5722", "#795548", "#9E9E9E", "#607D8B", "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
    "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
    "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800",
    "#FF5722", "#795548", "#9E9E9E", "#607D8B"];




class AnioResolucionSanciones extends React.Component {
    state = {
        error: false,
        hoveredCell: false,
    };

    componentDidMount() {
        aux().then(result => {
            let total = 0;
            let aux = result.data.map(item => {
                total += parseInt(item.count,10);
                return {
                    anio: item.anio_resolucion.toString(),
                    x: item.anio_resolucion,
                    y: parseInt(item.count,10)
                }
            });
            this.setState({
                    methods: {
                        data: aux,
                        xConfig: {
                            title: "Año de la sanción",
                            gridConfig: {stroke: "black"},
                        },
                        yConfig: {
                            title: "Número de sanciones",

                        },
                        legend: false,
                        height: 400,
                        shapeConfig: {
                            Line: {
                                strokeWidth: 2,
                                stroke: "blue",
                            },
                            Circle:{

                            }
                        },
                        tooltipConfig: {
                            title: function (d) {
                                return "Datos";
                            },
                            tbody: [
                                ["Año de la sanción: ", function (d) {
                                    return d["anio"]
                                }
                                ],
                                ["Número de sanciones: ", function (d) {
                                    return d["y"]
                                }
                                ]
                            ]
                        },
                        title: "Número de sanciones por año",

                    },
                    configPie: {
                        data: aux,
                        groupBy: "anio",
                        value: function (d) {
                            return d["y"]
                        },
                        height: 300,
                        label: function (d) {
                            return d["anio"] + "\n" + "(" + ((d["y"] * 100) / total).toFixed(2) + "%)"
                        },
                        legend: false,
                        tooltipConfig: {
                            tbody: [
                                ["Número de sanciones: ", function (d) {
                                    return d["y"]
                                }
                                ]
                            ]
                        },
                        shapeConfig: {
                            fill: (d, i) => {
                                return color[i]
                            }
                        }
                    }
                }
            )
        }).catch(err => {
            this.setState({error: true})
        });
    }

    render() {
        const {classes} = this.props;
        let {hoveredCell} = this.state;
        return (
            <div>
                <Grid container spacing={0} justify='center' className={classes.frameChart}>
                    <Grid item xs={12} md={12}>
                        <Typography variant={"h6"} className={classes.titulo}>
                            <b>Cantidad de sanciones</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.descripcion}>
                        <Typography variant={"body1"}>
                            Como se puede apreciar en las gráficas, el número de funcionarios sancionados de 2013 - 2015
                            se mantuvo sin grandes cambios, sancionando cada año aproximandamente a 300 funcionarios. En
                            2016 hubo un incremento de 16% con respecto a 2015. Sin embargo, para 2017 este número se
                            incrementó en casi 100%, llegando a 700 sancionados. Para 2018 disminuyó pero sólo en 7%.
                            En términos totales, si consideramos los 6 años que van de 2013-2018, se tuvieron poco más
                            de 2,500 funcionarios sancionados. Más del 50% de este total, se registró entre 2017 y 2018.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        {
                            this.state.methods && this.state.methods.data &&
                            <LinePlot config={this.state.methods}/> &&
                            <FlexibleXYPlot height={400}>
                            <VerticalGridLines/>
                            <HorizontalGridLines/>
                            <XAxis title={"Año de la sanción"} tickValues={this.state.methods.data.map(item => {
                            return item.x
                        })} tickFormat={v => `${v}`}/>
                            <YAxis title={"Número de sanciones"}/>

                            <LineMarkSeries
                            className="linemark-series-example"
                            style={{
                            strokeWidth: '3px'
                        }}
                            lineStyle={{stroke: '#5fb1e6'}}
                            markStyle={{stroke: 'orange'}}
                            data={this.state.methods.data}
                            onValueMouseOver={(datapoint, event) =>
                            this.setState({hoveredCell: datapoint})
                        }
                            onValueMouseOut={(datapoint, event) => {
                            this.setState({hoveredCell: null})
                        }}
                            >
                            </LineMarkSeries>
                        {hoveredCell ? (
                            <Hint value={hoveredCell}>
                            <div style={{background: 'white'}}>
                            <table style={{border: '1px solid black', color:'black'}}>
                            <thead style={{textAlign: 'center'}}>
                            <tr>
                                <th>Datos</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                            <td>Año:</td>
                            <td>{hoveredCell.x}</td>
                            </tr>
                            <tr>
                            <td>Número de sanciones:</td>
                            <td>{hoveredCell.y}</td>
                            </tr>
                            </tbody>
                            </table>
                            </div>
                            </Hint>
                            ) : null}
                            </FlexibleXYPlot>

                            }
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {
                            this.state.methods && this.state.methods.data &&
                            <Pie config={this.state.configPie}/>
                        }
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {
                            this.state.error &&
                            <MensajeErrorDatos/>
                        }
                    </Grid>



                </Grid>

            </div>
        )
    }

}

AnioResolucionSanciones.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AnioResolucionSanciones);