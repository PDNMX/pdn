import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography";
import {BarChart} from "d3plus-react";
import rp from "request-promise";
import 'react-vis/dist/style.css';
import VerticalBarSeries from "react-vis/es/plot/series/vertical-bar-series";
import * as d3 from "d3";


const styles = theme => ({
    frameChart: {
        marginTop: "15px",
        marginBottom: "15px"
    },
    descripcion: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "15px",
        paddingLeft: "10px",
        paddingRight: "10px",
        marginBottom: "30px"
    },
    titulo: {
        textAlign: "center",
        marginBottom: "30px",
    },
    graph: {
        marginBottom: "30px"
    }
});

function aux() {
    return new Promise((resolve, reject) => {
        let options = {
            uri: process.env.REACT_APP_HOST_PDNBACK + '/viz/particulares/getSentidoSanciones',
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


function loadData2() {
    return new Promise((resolve, reject) => {
        let options = {
            uri: process.env.REACT_APP_HOST_PDNBACK + '/viz/particulares/getSentidosAnio',
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

let color= ["#2979FF","#1565C0","#0277BD","#00838F","#90caf9","#e3f2fd"];
let z = d3.scaleOrdinal()
    .range(["#bd0026","#f03b20","#fd8d3c","#fecc5c","#ffffb2"]);

class SentidoResoluciones extends React.Component {
    state = {};

    componentDidMount() {
        aux().then(result => {
            let aux = result.data.map(item => {
                return {
                    "x": item.sentido_de_resolucion ? item.sentido_de_resolucion : "No especifíca",
                    "y": parseInt(item.total)
                }
            })

            loadData2().then(temp2 => {
                let aux2 = temp2.data.map(item => {
                    return {
                        id: item.sentido_de_resolucion,
                        y: parseInt(item.total),
                        x: item.anio,
                    }
                });
                this.setState({
                        methods: {
                            data: aux,
                            groupBy: "x",
                            x: "x",
                            y: "y",
                            xConfig: {
                                title: "Sentido de la resolución de la sanción",
                            },
                            yConfig: {
                                title: "Número de sanciones",

                            },
                            tooltipConfig: {
                                title: function (d) {
                                    return "Datos";
                                },
                                tbody: [
                                    ["Resolución: ", function (d) {
                                        return d["x"]
                                    }
                                    ],
                                    ["Número de resoluciones: ", function (d) {
                                        return d["y"]
                                    }
                                    ]
                                ]
                            },
                            legend: false,
                            height: 400,
                            shapeConfig: {
                                label: false,
                                fill:(d,i)=>{
                                    return color[i]
                                }
                            },
                            title: "Historico",
                        },
                        config2: {
                            data: aux2,
                            xConfig: {
                                title: "Sentido de la resolución de la sanción",
                            },
                            yConfig: {
                                title: "Número de sanciones"
                            },
                            tooltipConfig: {
                                title: function (d) {
                                    return "Datos";
                                },
                                tbody: [
                                    ["Resolución: ", function (d) {
                                        return d["id"]
                                    }
                                    ],
                                    ["Número de resoluciones: ", function (d) {
                                        return d["y"]
                                    }
                                    ]
                                ]
                            },
                            legend: true,
                            height: 400,
                            shapeConfig: {
                                label: false,
                              /*  fill : (d)=>{
                                    console.log("D: ",d);
                                    return z(d.x)}

                               */
                                    },
                            stacked: true,
                            title: "Por año",
                        },

                    }
                )
            });


        });
    }

//["#2196F3", "#00BCD4", "#009688","#4CAF50","#CDDC39","#FFC107"]
    render() {
        const {classes} = this.props;
        const BarSeries = VerticalBarSeries;
        return (
            <div>
                <Grid container spacing={0} justify='center' className={classes.frameChart}>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} className={classes.titulo}>
                            Sentido de las resoluciones
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={8} className={classes.graph}>
                        {
                            this.state.methods && this.state.methods.data &&
                            <BarChart config={this.state.methods}/>
                        }
                    </Grid>
                    <Grid item xs={12} md={4} className={classes.descripcion}>
                        <Typography variant={"body1"}>
                            La Secretaría de la Función Pública, de acuerdo con la Ley General de Responsabilidades Administrativas, engloba el sentido de las resoluciones en: Absolutoria, Sancionatoria, Sancionatoria con multa y Sancionatoria con multa e inhabilitación.
                            Como muestra la gráfica de la izquierda, del 2004 a la fecha, de las 1742 resoluciones en total, la mayoría derivó en sanción con multa e inhabilitación (1317 en total), seguido por sanciones con multa con un total de 366, 36 sancionatorias, 1 absolutoria y 22 que no especifican el sentido de la resolución.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.descripcion}>
                        <Typography variant={"body1"}>
                            A lo largo del tiempo, se aprecia que del total de resoluciones por año, el mayor número de sanciones termina en Sancionatorias con multa e inhabilitación, las demás resoluciones tienen una presencia partical a lo largo de los años, siendo el año 2009 donde hubo 10 resoluciones sancionatorias y el año 2011 donde se presentó el mayor número de resoluciones sancionatorias con multa.<br/>
                            El año 2010, que fue el que mayor número de sanciones presentó, se descompone en 187 resoluciones sancionatorias con multa e inhabilitación, 50 resoluciones sancionatorias con multa y 2 sancionatorias.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        {
                            this.state.methods && this.state.methods.data &&
                            <BarChart config={this.state.config2}/>
                        }
                    </Grid>

                </Grid>

            </div>
        )
    }

}

SentidoResoluciones.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SentidoResoluciones);