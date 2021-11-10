import React from 'react';
import {withStyles} from "@mui/styles";
import PropTypes from 'prop-types';
import {Grid, Typography, Button} from "@mui/material";
import rp from "request-promise";
import LineMarkSeries from "react-vis/es/plot/series/line-mark-series";
import YAxis from "react-vis/es/plot/axis/y-axis";
import XAxis from "react-vis/es/plot/axis/x-axis";
import HorizontalGridLines from "react-vis/es/plot/horizontal-grid-lines";
import VerticalGridLines from "react-vis/es/plot/vertical-grid-lines";
import 'react-vis/dist/style.css';
import {FlexibleXYPlot} from "react-vis/es";
import Hint from "react-vis/es/plot/hint";
import MensajeErrorDatos from "../../../Mensajes/MensajeErrorDatos";
import {Pie} from "d3plus-react";

const styles = theme => ({
    frameChart: {
        marginTop: "15px",
        marginBottom: "15px"
    },
    titulo: {
        textAlign: "center",
        marginBottom: theme.spacing(2)
    },
    descripcion: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
});

function aux() {
    return new Promise((resolve, reject) => {
        let options = {
            uri: process.env.REACT_APP_S3P_BACKEND + '/charts/getAnioSancion',
            json: true,
            method: "GET"
        };
        rp(options)
            .then(data => {
                resolve(data);
            }).catch(err => {
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
        hoveredCell: false,
        error: false,
    };

    componentDidMount() {
        let total = 0;
        aux().then(result => {
            let temp = result.data.slice(1);
            let aux = temp.map(item => {
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
                    },
                    configPie: {
                        data: aux,
                        groupBy: "anio",
                        value: function (d) {
                            return d["y"]
                        },
                        height: 300,
                        label: function (d) {
                            return d["anio"] + "\n (" + ((d["y"] * 100) / total).toFixed(2) + "%)"
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
            console.error(err);
            this.setState({error: true});
        });
    }

    render() {
        const {classes} = this.props;
        let {hoveredCell} = this.state;
        return (
            <div>
                <Grid container spacing={0} justifyContent='center' className={classes.frameChart}>
                    <Grid item xs={12} md={12}>
                        <Typography variant={"h6"} className={classes.titulo}>
                            <b> {"Cantidad de sanciones"}</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.descripcion}>
                        <Typography variant={"body1"}>
                            Como se aprecia en la gráfica, el comportamiento de las sanciones no ha sido constante, se aprecia el año 2010 con un mayor número de sanciones (233) representando el 11.95% del total. En contraste, el año 2004 representa únicamente el 0.21% del total con 4 sanciones.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        {
                            this.state.methods && this.state.methods.data &&
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
                                    markStyle={{stroke: 'yellow'}}
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
                                            <table style={{border: '1px solid black', color: 'black'}}>
                                                <thead style={{textAlign: 'center'}}>
                                                Datos
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
                    <Grid item xs={12}>
                        {
                            this.state.error && <MensajeErrorDatos/>
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