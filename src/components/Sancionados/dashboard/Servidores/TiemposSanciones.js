import React from 'react';
import {withStyles} from "@mui/styles";
import PropTypes from 'prop-types';
import {Grid, Typography} from "@mui/material";
import {BarChart} from "d3plus-react";
import rp from "request-promise";
import * as d3plus from "d3plus-export";
import MensajeErrorDatos from "../../../Mensajes/MensajeErrorDatos";

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
    },
    btnDownload: {
        textAlign: "right"
    }
});


function aux() {
    return new Promise((resolve, reject) => {
        let options = {
            uri: process.env.REACT_APP_S3S_BACKEND + '/charts/getTemporalidadSanciones',
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

class TiemposSanciones extends React.Component {
    state = {
        error: false
    };

    componentDidMount() {
        aux().then(result => {
            let aux = result.data.map(item => {
                return {
                    "anios": item.anios,
                    "total": parseInt(item.total, 10)
                }
            })
            this.setState({
                    methods: {
                        data: aux,
                        groupBy: "anios",
                        x: "anios",
                        y: "total",
                        xConfig: {
                            title: "Duración en años de la sanción",
                        },
                        yConfig: {
                            title: "Número de sanciones"
                        },
                        tooltipConfig: {
                            title: function (d) {
                                return "Datos";
                            },
                            tbody: [
                                ["Duración de la sanción: ", function (d) {
                                    return d["anios"] + " años"
                                }
                                ],
                                ["Número de sanciones: ", function (d) {
                                    return d["total"]
                                }
                                ]
                            ]
                        },
                        height: 400,
                        shapeConfig: {
                            label: false,
                            fill: (d, i) => {
                                return color[i]
                            }
                        },
                        legend: false,
                        axes: {
                            fill: "#666672"
                        },
                        title: "Duración de las sanciones en años",


                    }
                }
            )
        }).catch(err => {
            console.error(err);
            this.setState({error: true})
        });
    }

    test = () => {
        let x = document.getElementById("graf")
        d3plus.saveElement(x, {type: "jpg", filename: "Duración de las sanciones", backgroundColor: 'white'})
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container spacing={0} justifyContent='center' className={classes.frameChart}>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} className={classes.titulo}>
                            <b>{"Duración de las sanciones"}</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.descripcion}>
                        <Typography>
                            La siguiente gráfica muestra la duración de las inhabilitaciones,que van de un año hasta veinte.
                            Observamos que un <b>86.2%</b> de las inhabilitaciones son por 10 años, <b>4.5%</b> tienen una duración menor a 10 años y <b>8.94%</b> una duración mayor a 10 años.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} id={"graf"}>
                        {
                            this.state.methods && this.state.methods.data &&
                            <BarChart config={this.state.methods}/>
                        }
                        {
                            this.state.error && <MensajeErrorDatos/>
                        }

                    </Grid>


                </Grid>

            </div>
        )
    }

}

TiemposSanciones.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TiemposSanciones);