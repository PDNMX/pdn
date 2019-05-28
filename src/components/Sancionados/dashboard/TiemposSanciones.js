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
            uri: 'http://localhost:3100/viz/getTemporalidadSanciones',
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
                            labels : ["","<1año",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],

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
                        }


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

TiemposSanciones.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TiemposSanciones);