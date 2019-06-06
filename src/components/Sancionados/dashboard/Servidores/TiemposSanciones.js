import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import "./index.css";
import Typography from "@material-ui/core/Typography";
import {BarChart} from "d3plus-react";
import rp from "request-promise";
import Button from "@material-ui/core/Button";
import * as d3plus from "d3plus-export";

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


class TiemposSanciones extends React.Component {
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
                        data: aux,
                        groupBy: "anios",
                        x: "anios",
                        y: "total",
                        xConfig: {
                            title : "Duración en años de la sanción",
                            domain : [-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
                            labels : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],

                        },
                        yConfig : {
                            title : "Número de sanciones"
                        },
                        tooltipConfig: {
                            title: function (d) {
                                return "Datos";
                            },
                            tbody: [
                                ["Duración de la sanción: ",function (d) {
                                  return d["anios"]+"años"
                                }
                                ],
                                ["Número de sanciones: ",function (d) {
                                    return d["total"]
                                }
                                ]
                            ]
                        },
                        height: 400,
                        shapeConfig:{
                            label : false,

                        },
                        legend:false,
                        axes :{
                            fill : "#666672"
                        },
title : "Duración de las sanciones en años"

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
                            {"Duración de las sanciones"}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.descripcion}>
                        <Typography>
                            Si tomamos en cuenta el tiempo que duró la sanción a los funcionarios, podemos obserbar que más del 50% de las sanciones totales fueron de 10 años, aprox. 1363.
                            9% de las sanciones duraron menos de 1 año y 40% menos de 10 años y muy pocas sanciones duraron más de 10 años.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.btnDownload} >
                        {
                            this.state.methods && this.state.methods.data &&
                            <Button color={"primary"} variant={"outlined"} onClick={this.test}>Guardar</Button>
                        }
                    </Grid>
                    <Grid item xs={12} id={"graf"}>
                        {
                            this.state.methods && this.state.methods.data &&
                            <BarChart  config={this.state.methods}/>
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