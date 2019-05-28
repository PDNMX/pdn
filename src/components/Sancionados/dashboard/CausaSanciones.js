import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import "./index.css";
import Typography from "@material-ui/core/Typography";
import {BarChart} from "d3plus-react";
import rp from "request-promise";

const styles = theme => ({
    frameChart : {
        marginTop : "15px",
        marginBottom : "15px"
    },
    descripcion: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "15px",
        paddingLeft : "10px",
        paddingRight : "10px"
    },
    titulo: {
        textAlign: "center",
        marginBottom: "30px",
    },
    graph:{
        marginBottom : "30px"
    }
});

function aux() {
    return new Promise((resolve, reject) => {
        let options = {
            uri: 'http://localhost:3100/viz/getCausasSanciones',
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


class CausasSanciones extends React.Component {
    state= {

    };

    componentDidMount() {
        aux().then(result => {
            let aux = result.data.map(item => {
                return  {
                    "causa" : item.causa,
                    "total" : parseInt(item.total)
                }
            })
            this.setState({
                    methods: {
                        data: aux,
                        groupBy: "causa",
                        x: "causa",
                        y: "total",
                        xConfig: {
                            title : "Causa de la sanción",
                            //domain : [-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
                            //labels : ["","<1año",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],

                        },
                        yConfig : {
                            title : "Número de sanciones"
                        },
                        tooltipConfig: {
                            title: function (d) {
                                return "Datos";
                            },
                            tbody: [
                                ["Causa de la sanción: ",function (d) {
                                    return d["causa"]
                                }
                                ],
                                ["Número de sanciones: ",function (d) {
                                    return d["total"]
                                }
                                ]
                            ]
                        },
                        legend: false,
                        height: 400,
                        shapeConfig:{label : false}
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
                        <Typography variant={"h6"} className={classes.titulo}>
                            Causa de las sanciones de 2013 a la fecha
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
                            Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem
                            Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un
                            impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de
                            textos y los mezcló de tal manera que logró hacer un libro de textos especimen.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} className={classes.descripcion}>
                        <Typography variant={"body1"}>
                            Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem
                            Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un
                            impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de
                            textos y los mezcló de tal manera que logró hacer un libro de textos especimen.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        {
                            this.state.methods && this.state.methods.data &&
                            <BarChart config={this.state.methods}/>
                        }
                    </Grid>
                </Grid>

            </div>
        )
    }

}

CausasSanciones.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CausasSanciones);