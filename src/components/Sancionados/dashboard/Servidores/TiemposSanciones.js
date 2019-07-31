import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import {Typography} from "@material-ui/core"
import {BarChart} from "d3plus-react";
import rp from "request-promise";
import * as d3plus from "d3plus-export";
import MensajeErrorDatos from "../../../Tablas/MensajeErrorDatos";

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
        paddingLeft: "10px",
        paddingRight: "10px",
        marginBottom: "30px",
        textAlign:"justify"
    },
    btnDownload: {
        textAlign: "right"
    }
});


function aux() {
    return new Promise((resolve, reject) => {
        let options = {
            uri: process.env.REACT_APP_HOST_PDNBACK + '/viz/servidores/getTemporalidadSanciones',
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
            let aux = result.data.map(item => {
                return {
                    "anios": item.anios,
                    "total": parseInt(item.total)
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
                                    return d["anios"] + "años"
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
                <Grid container spacing={0} justify='center' className={classes.frameChart}>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} className={classes.titulo}>
                            <b>{"Duración de las sanciones"}</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.descripcion}>
                        <Typography>
                            Si tomamos en cuenta el tiempo que duró la inhabilitación a los funcionarios, podemos obserbar que
                            más del 50% de las sanciones totales fueron de 10 años, aprox. 1363.
                            9% de las sanciones duraron menos de 1 año y 40% menos de 10 años y muy pocas sanciones
                            duraron más de 10 años.
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