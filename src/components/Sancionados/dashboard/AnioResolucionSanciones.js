import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import "./index.css";
import Typography from "@material-ui/core/Typography";
import {LinePlot} from "d3plus-react";
import rp from "request-promise";

const styles = theme => ({
    frameChart : {
        marginTop : "15px",
        marginBottom : "15px"
    },
    desc:{
        textAlign : "center"
    }
});

function aux() {
    return new Promise((resolve, reject) => {
        let options = {
            uri: 'http://localhost:3100/viz/getAnioSancion',
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


class AnioResolucionSanciones extends React.Component {
    state= {

    };

    componentDidMount() {
        aux().then(result => {
            let aux = result.data.map(item => {
                return  {
                    anio : item.anio_resolucion.toString(),
                    x: item.anio_resolucion,
                    y : parseInt(item.count)
                }
            });

            this.setState({
                    methods: {
                        data: aux,
                        xConfig: {
                            title : "Año de la sanción",
                            gridConfig:  {stroke: "black"},
                        },
                        yConfig : {
                            title : "Número de sanciones",

                        },
                        legend: false,
                        height: 400,
                        shapeConfig:{
                            Line: {
                                strokeWidth : 2,
                                stroke: "blue",
                            }
                        },
                        tooltipConfig: {
                            title: function (d) {
                                return "Datos";
                            },
                            tbody: [
                                ["Año de la sanción: ",function (d) {
                                    return d["anio"]
                                }
                                ],
                                ["Número de sanciones: ",function (d) {
                                    return d["y"]
                                }
                                ]
                            ]
                        }

                    }
                }
            )
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container spacing={0} justify='center' className={classes.frameChart}>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} className={classes.desc}>
                            {"Año de las sanciones"}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            this.state.methods && this.state.methods.data &&
                            <LinePlot config={this.state.methods}/>
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