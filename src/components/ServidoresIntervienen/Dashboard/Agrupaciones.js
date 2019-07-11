import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid/Grid";
import {Typography} from "@material-ui/core";
import rp from "request-promise";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from '@material-ui/core/InputLabel';
import Button from "@material-ui/core/Button";
import Toolbar from '@material-ui/core/Toolbar';
import {Treemap} from "d3plus-react";
import * as d3 from "d3";
import MensajeErrorDatos from "../../Tablas/MensajeErrorDatos";

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
        /* justifyContent: "center",*/
        alignItems: "center",
        marginTop: "15px",
        paddingLeft: "10px",
        paddingRight: "10px",
        marginBottom: "30px",
        textAlign : "justify"
    },
    btnDownload: {
        textAlign: "right"
    },
    formControl: {
        width: '100%'
    },
    buttonContainer:{
        textAlign : "center"
    },

});


let z = d3.scaleOrdinal()
    .range(["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
        "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50",
        "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800",
        "#FF5722", "#795548", "#9E9E9E", "#607D8B"]);

class Agrupaciones extends React.Component {
    state = {
        ejercicio: null,
        ejercicios: [],
        ramo: null,
        ramos: [],
        institucion: null,
        instituciones: [],
        error : false
    };

    componentDidMount() {
        this.loadEjercicios();
        this.loadRamos();
        this.loadInstituciones();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.ejercicio != this.state.ejercicio) {
            this.loadRamos();
        }
        if (prevState.ramo != this.state.ramo) {
            this.loadInstituciones();
        }
    }

    loadEjercicios = () => {
        let options = {
            uri: process.env.REACT_APP_HOST_PDNBACK + '/viz/servidoresIntervienen/getEjercicios',
            json: true,
            method: "get"
        };

        rp(options).then(data => {
            let ejercicios = [];
            let idEjercicio = 0;
            data.data.forEach(item => {
                ejercicios.push({id: idEjercicio++, ejercicio: item.ejercicio});
            });
            this.setState({ejercicios: ejercicios});
        }).catch(err => {
            console.log(err);
            this.setState({error:true})
        })
    };

    loadRamos = () => {
        let options = {
            uri: process.env.REACT_APP_HOST_PDNBACK + '/viz/servidoresIntervienen/getRamos',
            json: true,
            method: "post",
            body: {
                filtros: this.state.ejercicio ? ("ejercicio= '" + this.state.ejercicio + "'") : null
            }
        };

        rp(options).then(data => {
            let ramos = [];
            let idRamo = 0;
            data.data.forEach(item => {
                ramos.push({id: idRamo++, ramo: item.ramo});
            });
            this.setState({ramos: ramos, ramo: null, institucion: null});
        }).catch(err => {
            console.log(err);
            this.setState({error:true})
        })
    };

    loadInstituciones = () => {
        let filtros = [];
        if (this.state.ejercicio) filtros.push("ejercicio='" + this.state.ejercicio + "'");
        if (this.state.ramo) filtros.push("ramo='" + this.state.ramo + "'");

        let options = {
            uri: process.env.REACT_APP_HOST_PDNBACK + '/viz/servidoresIntervienen/getInstituciones',
            json: true,
            method: "post",
            body: {
                filtros: filtros.length > 0 ? filtros : null
            }
        };

        rp(options).then(data => {
            let instituciones = [];
            let idInstitucion = 0;
            data.data.forEach(item => {
                instituciones.push({id: idInstitucion++, institucion: item.institucion});
            });
            this.setState({instituciones: instituciones, institucion: null});
        }).catch(err => {
            console.log(err);
            this.setState({error:true})
        })
    };


    loadData = () => {
        return new Promise((resolve, reject) => {
            let filtros = [];
            if (this.state.ejercicio) filtros.push("ejercicio='" + this.state.ejercicio + "'");
            if (this.state.ramo) filtros.push("ramo='" + this.state.ramo + "'");
            if (this.state.institucion) filtros.push("institucion='" + this.state.institucion + "'");

            let options = {
                uri: process.env.REACT_APP_HOST_PDNBACK + '/viz/servidoresIntervienen/getAgrupaciones',
                json: true,
                method: "post",
                body: {
                    filtros: filtros
                }
            };

            let v = "";
            if (this.state.ejercicio && !this.state.ramo && !this.state.institucion)
                v = "group";
            else if (this.state.ejercicio && this.state.ramo && !this.state.institucion)
                v = "subgroup"
            else if ((this.state.ejercicio && this.state.ramo && this.state.institucion)
                || (this.state.ejercicio && !this.state.ramo && this.state.institucion))
                v = "subgroup";
            else if ((!this.state.ejercicio && this.state.ramo && !this.state.institucion)
                || (!this.state.ejercicio && !this.state.ramo && this.state.institucion)
                || (!this.state.ejercicio && this.state.ramo && this.state.institucion))
                v = "parent";

            rp(options)
                .then(data => {
                    let aux2 = data.data.map(item => {
                        return {
                            "value": parseInt(item.total),
                            "subgroup": item.institucion,
                            "group": item.ramo,
                            "parent": item.ejercicio,

                        }
                    });
                    this.setState({
                        config: {
                            data: aux2,
                            height: 400,
                            groupBy: v,
                            sum: "value",
                            tooltipConfig: {
                                tbody: [
                                    ["Número de funcionarios: ", function (d) {
                                        return d["value"]
                                    }
                                    ]
                                ]
                            },
                            legend: false,
                            shapeConfig: {
                                label: function (d) {
                                    return d[v] + "\n" + d["value"] + " funcionarios"
                                },
                                labelConfig: {
                                    fontMax: 18,
                                    fontMin: 10
                                },
                                fill: (d) => {
                                    return z(d[v])
                                }
                            },
                        }
                    })
                    resolve(data);
                }).catch(err => {

                console.log(err);
                this.setState({error : true})
            });
        });
    }


    limpiarBusqueda = () => {
        this.setState({
            ejercicio: null,
            ramo: null,
            institucion: null,
            error : false
        })
    };

    handleChangeCampo = (varState, event) => {
        this.setState({
            [varState]: event ? (event.target ? event.target.value : event.value) : ''
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Toolbar>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant={"h6"} className={classes.titulo}>
                                <b>{"Ejercicios, Ramos e Instituciones"}</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.descripcion}>
                            <Typography variant={"body1"}>
                                En las secciones anteriores se puede observar de manera general el comportamiento de los procesos de contratación, sin embargo, resulta interesante conocer cómo se distribuyen estós en
                                diferntes variables como: Ejericio fiscal, Ramo, Institución.De acuerdo a los valores que selecciones, podrás obtener 5 diferentes combinaciones que mostrarán lo siguiente:<br/><br/>

                                1.- <b>Ejercicio:</b> seleccionando únicamente el Ejercicio, conocerás el total de funcionaros que intervinieron en procesos de contratación en cada uno de ellos<br/>
                                2.- <b>Ramo:</b> seleccionando únicamente el Ramo, obtendrás el número de funcionarios que intervinieron en procesos de contratación dentro de ese Ramo en cada uno
                                de los Ejercicios fiscales<br/>
                                3.- <b>Institución:</b> selecciona únicamente una Institución o bien el Ramo y la Institución, para conocer el número de servidores que intervinieron en procesos de
                                contatación que tuvo en cada uno de los ejercicios fiscales<br/>
                                4.- <b>Ejercicio y Ramo: </b> Cada Ramo cuenta con una serie de Instituciones, selecciona un Ejercicio fiscal y un Ramo para conocer como se distribuyen el
                                número de funcionarios en cada una de las Instituciones en los diferentes años<br/>
                                5.-<b>Ejercicio, Ramo e Institución: </b> Para conocer de manera puntual el número de servidores en procesos de contatatación de determinada Institución en cierto Ejercicio,
                                podrás seleccionar el Ejercicio, Ramo e Institución o bien el Ejercicio y la Institución deseada.<br/>


                                <br/><br/>Para comenzar, selecciona algún filtro y da clic en el botón <b>Buscar</b>
                            </Typography>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="campoSelectEjercicio">Ejercicio</InputLabel>
                                <Select style={{marginTop: '0px'}}
                                        value={this.state.ejercicio}
                                        onChange={(e) => this.handleChangeCampo('ejercicio', e)}
                                        inputProps={{
                                            name: 'campoSelectEjercicio',
                                            id: 'campoSelectEjercicio',
                                        }}
                                >
                                    {
                                        this.state.ejercicios.map(item => {
                                            return <MenuItem value={item.ejercicio}>
                                                {item.ejercicio}
                                            </MenuItem>
                                        })
                                    }
                                </Select>

                            </FormControl>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="campoSelectRamo">Ramo</InputLabel>
                                <Select style={{marginTop: '0px'}}
                                        value={this.state.ramo}
                                        onChange={(e) => this.handleChangeCampo('ramo', e)}
                                        inputProps={{
                                            name: 'campoSelectRamo',
                                            id: 'campoSelectRamo',
                                        }}
                                >
                                    <MenuItem value={null} > TODOS</MenuItem>
                                    {
                                        this.state.ramos.map(item => {
                                            return <MenuItem value={item.ramo}>
                                                {item.ramo}
                                            </MenuItem>
                                        })
                                    }
                                </Select>

                            </FormControl>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="campoSelectInstitucion">Institución</InputLabel>
                                <Select style={{marginTop: '0px'}}
                                        value={this.state.institucion}
                                        onChange={(e) => this.handleChangeCampo('institucion', e)}
                                        inputProps={{
                                            name: 'campoSelectInstitucion',
                                            id: 'campoSelectInstitucion',
                                        }}
                                >
                                    <MenuItem value={null} > TODAS</MenuItem>
                                    {
                                        this.state.instituciones.map(item => {
                                            return <MenuItem value={item.institucion}>
                                                {item.institucion}
                                            </MenuItem>
                                        })
                                    }
                                </Select>

                            </FormControl>
                        </Grid>
                        <Grid item xs={10}/>
                        <Grid item md={1}xs={12} className={classes.buttonContainer}>
                            <Button variant="contained" color="secondary" className={classes.button}
                                    onClick={this.loadData}
                                    disabled={!this.state.ejercicio && !this.state.ramo && !this.state.institucion}>
                                Buscar
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={1} className={classes.buttonContainer}>
                            <Button variant="contained" color="secondary" className={classes.button}
                                    onClick={this.limpiarBusqueda}>
                                Limpiar
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            {
                                this.state.config && this.state.config.data &&
                                <Treemap config={this.state.config}/>
                            }
                            {
                                this.state.error &&
                                    <MensajeErrorDatos/>
                            }
                        </Grid>
                    </Grid>
                </Toolbar>

            </div>


        )
    }

}

export default withStyles(styles)(Agrupaciones);