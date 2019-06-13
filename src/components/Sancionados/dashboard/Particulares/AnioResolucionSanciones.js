import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import {Typography} from "@material-ui/core"
import rp from "request-promise";
import LineMarkSeries from "react-vis/es/plot/series/line-mark-series";
import YAxis from "react-vis/es/plot/axis/y-axis";
import XAxis from "react-vis/es/plot/axis/x-axis";
import HorizontalGridLines from "react-vis/es/plot/horizontal-grid-lines";
import VerticalGridLines from "react-vis/es/plot/vertical-grid-lines";
import 'react-vis/dist/style.css';
import {FlexibleXYPlot} from "react-vis/es";
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
        marginBottom: "15px"
    }
});

function aux() {
    return new Promise((resolve, reject) => {
        let options = {
            uri: process.env.REACT_APP_HOST_PDNBACK + '/viz/particulares/getAnioSancion',
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
    state = {
        hoveredCell: false
    };

    componentDidMount() {
        aux().then(result => {
            let total = 0;
            let temp = result.data.slice(1);
            let aux = temp.map(item => {
                return {
                    x: item.anio_resolucion,
                    y: parseInt(item.count)
                }
            });
            this.setState({
                    methods: {
                        data: aux,
                    },
                    configPie: {
                        data: aux.map(item => {
                            return {angle: item.x}
                        })
                    }
                }
            )
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
                            {"Cantidad de sanciones"}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.descripcion}>
                        <Typography variant={"body1"}>
                            Como se aprecia en la gráfica, el comportamiento de las sanciones no ha sido constante, iniciando en el año 2004 con apenas 4 sanciones registradas, pasó a 29 sanciones en 2005 y un total de 302 sanciones durante 2006-2007. <br/>
                            Con un descenso drástico en 2008 con 43 sanciones registradas, volvió a repuntar en el año 2010 con 239 sanciones, siendo este año el año con mayor sanciones registradas.<br/>
                            De 2011 a la fecha, el número de sanciones ha variado entre 84 y 179 sanciones, variando de un año a otro en 60 sanciones registradas máximo.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
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
                                            <table style={{border: '1px solid black', color:'black'}}>
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

                </Grid>

            </div>
        )
    }

}

AnioResolucionSanciones.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AnioResolucionSanciones);