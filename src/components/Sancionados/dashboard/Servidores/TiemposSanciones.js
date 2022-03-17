import React from 'react';
import {withStyles} from "@mui/styles";
import PropTypes from 'prop-types';
import {Grid, Typography} from "@mui/material";
import {BarChart} from "d3plus-react";
import axios from 'axios';
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
        paddingRight: theme.spacing(4),
        paddingLeft: theme.spacing(4),
    },
    btnDownload: {
        textAlign: "right"
    }
});

function aux() {
    return new Promise((resolve, reject) => {
        let options = {
            url: process.env.REACT_APP_S3S_BACKEND + '/charts/getTemporalidadSanciones',
            json: true,
            method: "GET"
        };
        axios(options)
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
    "#FF5722", "#795548", "#9E9E9E", "#607D8B","#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
    "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
    "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800",
    "#FF5722", "#795548", "#9E9E9E", "#607D8B"];

class TiemposSanciones extends React.Component {
    state = {
        error : false
    };

    componentDidMount() {
        aux().then(result => {
            let aux = result.data.data.map(item => {
                return {
                    "anios": item.anios,
                    "total": parseInt(item.total,10)
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
                            domain: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                            labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],

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
        }).catch(err=>{
            console.error(err);
            this.setState({error:true})
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

                            Tomando en cuenta el tiempo que duró la inhabilitación a las personas servidoras públicas se  observa que 84.55% de las sanciones totales fueron de 10 años; 6.31% de las sanciones tienen una duración mayor a 10 años; 5.89% tiene una duración entre 1 y 9 años, mientras que solo 0.49% es de menos de un año.

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