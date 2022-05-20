import React from 'react';
import {withStyles} from '@mui/styles';
import {Grid, Select, MenuItem, FormControl, Typography, InputLabel, List, ListItem, ListItemText,Button, Alert} from '@mui/material';
import axios from 'axios';
import {Treemap} from "d3plus-react";
import * as d3 from "d3";
import { ThemeProvider } from '@mui/material/styles';
import ThemeV2 from "../../../ThemeV2";

const styles = theme => ({
    frameChart: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    titulo: {
        textAlign: "center",
        marginBottom: theme.spacing(2),
        fontWeight: "bold"
    },
    item: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    formControl: {
        width: '90%'
    },
    buttonContainer: {
        textAlign: "center",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
});

let z = d3.scaleOrdinal()
    .range(["#F87268", "#DC6AF0", "#B286FD", "#8A97D6",
        "#3DA2F5", "#00BCD4", "#00B3A1", "#4CAF50",
        "#8BC34A", "#FFC107", "#FF9800", "#FF7247",
        "#E2977E", "#FD938B", "#FF85AD", "#ED85FF",
        "#AD94D6", "#8A9BF9", "#6DBCFD", "#1C9BFD",
        "#1DE2FC", "#00DBC5", "#71E575", "#AFEE68",
        "#F9AE3E", "#FF9270", "#F2B39C"]);

class Agrupaciones extends React.Component {
    state = {
        ejercicio: 'any',
        ejercicios: [],
        ramo: 'any',
        ramos: [],
        institucion: 'any',
        instituciones: [],
        error: false
    };

    componentDidMount() {
        //Ojo: todas estas invocan a setState y son Promises
        this.loadEjercicios();
        this.loadRamos();
        this.loadInstituciones();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        //Ojo: todas estas invocan a setState y son Promises
        if (prevState.ejercicio !== this.state.ejercicio) {
            if (this.state.ejercicio !== 'any')
                this.loadRamos();
            this.loadData();
        }
        if (prevState.ramo !== this.state.ramo) {
            if (this.state.ramo !== 'any')
                this.loadInstituciones();
            this.loadData();
        }
        if (prevState.institucion !== this.state.institucion ) {
            this.loadData();
        }
    }

    //Debería retornar Promise y no hacer setState
    loadEjercicios = () => {
        let options = {
            url: process.env.REACT_APP_S2_BACKEND + '/api/v0/getEjercicios',
            json: true,
            method: "get"
        };

        axios(options).then(res => {
            let ejercicios = res.data.data.map((item, index) => ({id: (index + 1), ejercicio: item.ejercicio}));
            this.setState({
                ejercicios: ejercicios,
                ejercicio: ejercicios[ejercicios.length - 1].ejercicio
            });
        }).catch(err => {
            console.log(err);
            this.setState({error: true});
        })
    };

    //Debería retornar Promise y no hacer setState
    loadRamos = () => {
        let options = {
            url: process.env.REACT_APP_S2_BACKEND + '/api/v0/getRamos',
            json: true,
            method: "post",
            data: {
                filtros: this.state.ejercicio !== 'any' ? ("ejercicio= '" + this.state.ejercicio + "'") : null
            }
        };

        axios(options).then(res => {
            let ramos = res.data.data.map((item, index) => ({id: index, ramo: item.ramo}));
            this.setState({ramos: ramos, ramo: 'any', institucion: 'any'});
        }).catch(err => {
            console.log(err);
            this.setState({error: true});
        });
    };

    //Debería retornar Promise y no hacer setState
    loadInstituciones = () => {
        let filtros = [];
        if (this.state.ejercicio !== 'any') filtros.push("ejercicio='" + this.state.ejercicio + "'");
        if (this.state.ramo !== 'any') filtros.push("ramo='" + this.state.ramo + "'");

        let options = {
            url: process.env.REACT_APP_S2_BACKEND + '/api/v0/getInstituciones',
            json: true,
            method: "post",
            data: {
                filtros: filtros.length > 0 ? filtros : null
            }
        };

        axios(options).then(res => {
            let instituciones = res.data.data.map((item, index) => ({id: index, institucion: item.institucion}));
            this.setState({instituciones: instituciones, institucion: 'any'});
            //return null;
        }).catch(err => {
            console.log(err);
            this.setState({error: true});
            //return null;
        })
    };

    //Debería retornar Promise y no hacer setState
    loadData = () => {
        let filtros = [];
        if (this.state.ejercicio !== 'any') filtros.push("ejercicio='" + this.state.ejercicio + "'");
        if (this.state.ramo !== 'any') filtros.push("ramo='" + this.state.ramo + "'");
        if (this.state.institucion !== 'any') filtros.push("institucion='" + this.state.institucion + "'");

        let options = {
            url: process.env.REACT_APP_S2_BACKEND + '/api/v0/getAgrupaciones',
            json: true,
            method: "post",
            data: {
                filtros: filtros
            }
        };

        let v = "";
        if (this.state.ejercicio !== 'any' && this.state.ramo === 'any' && this.state.institucion === 'any')
            v = "group";
        else if (this.state.ejercicio!== 'any' && this.state.ramo !== 'any' && this.state.institucion === 'any')
            v = "subgroup"
        else if ((this.state.ejercicio !== 'any' && this.state.ramo !== 'any' && this.state.institucion !== 'any')
            || (this.state.ejercicio !== 'any' && this.state.ramo === 'any' && this.state.institucion !== 'any'))
            v = "subgroup";
        else if ((this.state.ejercicio === 'any' && this.state.ramo !== 'any' && this.state.institucion === 'any')
            || (this.state.ejercicio === 'any' && this.state.ramo === 'any' && this.state.institucion !== 'any')
            || (this.state.ejercicio === 'any' && this.state.ramo !== 'any' && this.state.institucion !== 'any'))
            v = "parent";

        axios(options).then(res => {
            let aux2 = res.data.data.map(item => ({
                    "value": parseInt(item.total, 10),
                    "subgroup": item.institucion,
                    "group": item.ramo,
                    "parent": item.ejercicio
                }));

            this.setState({
                config: {
                    data: aux2,
                    height: 400,
                    groupBy: v,
                    sum: "value",
                    tooltipConfig: {
                        tbody: [
                            ["Número de personas servidoras públicas: ", function (d) {
                                return d["value"]
                            }
                            ]
                        ]
                    },
                    legend: false,
                    shapeConfig: {
                        label: function (d) {
                            return d[v]?d[v]:"General \n" + d["value"] + " personas servidoras públicas"
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
            });
        }).catch(err => {
            console.log(err);
            this.setState({error: true})
        });
    }

    limpiarBusqueda = () => {
        const { ejercicios } = this.state;
        this.setState({
            ejercicio: ejercicios[ejercicios.length - 1].ejercicio,
            ramo: 'any',
            institucion: 'any',
            error: false
        })
    };

    handleChangeCampo = (varState, event) => {
        this.setState({
            [varState]: event ? (event.target ? event.target.value : event.value) : 'any'
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <ThemeProvider theme={ThemeV2}>
                <Grid container>
                    <Grid item xs={12} className={classes.item}>
                        <Typography variant={"h6"} className={classes.titulo}>
                            Ejercicios, ramos e instituciones
                        </Typography>

                        <Typography paragraph>
                            En las secciones anteriores se puede observar de manera general el comportamiento de los procesos de contratación.
                            Resulta interesante conocer cómo se distribuyen estos según distintas variables como ejercicio fiscal, ramo e institución.
                            De acuerdo con los valores que selecciones, podrás obtener 5 diferentes combinaciones que mostrarán lo siguiente:
                        </Typography>

                        <List>
                            <ListItem>
                                <ListItemText>
                                    1. <b>Ejercicio:</b> seleccionando únicamente el ejercicio, conocerás el total de funcionarios que intervinieron en procesos de contratación en cada uno de ellos.
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    2. <b>Ramo:</b> seleccionando únicamente el ramo, obtendrás el número de funcionarios que intervinieron en procesos de contratación dentro de ese ramo en cada uno de los ejercicios fiscales.
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    3. <b>Institución:</b> selecciona únicamente una institución o bien el ramo y la institución, para conocer el número de servidores que intervinieron en procesos de contratación que tuvo en cada uno de los ejercicios fiscales.
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    4. <b>Ejercicio y ramo: </b> Cada ramo cuenta con una serie de instituciones, selecciona un ejercicio fiscal y un ramo para conocer cómo se distribuyen el número de funcionarios en cada una de las Instituciones en los diferentes años.
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    5. <b>Ejercicio, ramo e institución: </b> Para conocer de manera puntual el número de servidores en procesos de contratación de determinada institución en cierto ejercicio, podrás seleccionar el ejercicio, ramo e institución o bien el ejercicio y la institución deseadas.
                                </ListItemText>
                            </ListItem>
                        </List>

                        <Typography paragraph>
                            Para comenzar, selecciona algún filtro y da clic en el botón <b>Buscar</b>
                        </Typography>

                    </Grid>

                    <Grid item md={4} xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="campoSelectEjercicio">Ejercicio</InputLabel>
                            <Select style={{marginTop: '0px'}}
                                    value={this.state.ejercicio}
                                    onChange={(e) => this.handleChangeCampo('ejercicio', e)}
                                    label = 'Ejercicio'
                            >
                                <MenuItem key={''} value={'any'}> TODOS</MenuItem>
                                {
                                    this.state.ejercicios.map(item => {
                                        return <MenuItem key={item.ejercicio} value={item.ejercicio}>
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
                                    label = {'Ramo'}
                            >
                                <MenuItem key={''} value={'any'}> TODOS</MenuItem>
                                {
                                    this.state.ramos.map(item => {
                                        return <MenuItem key={item.ramo} value={item.ramo}>
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
                                    label = {'Institución'}
                            >
                                <MenuItem key={''} value={'any'}>TODAS</MenuItem>
                                {
                                    this.state.instituciones.map(item => {
                                        return <MenuItem key={item.institucion} value={item.institucion}>
                                            {item.institucion}
                                        </MenuItem>
                                    })
                                }
                            </Select>

                        </FormControl>
                    </Grid>
                    <Grid item xs={11}/>
                    <Grid item xs={12} md={1} className={classes.buttonContainer}>
                        <Button variant="contained" color="secundario" className={classes.button}
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
                            <Alert severity="error">No disponible por el momento, intente más tarde.</Alert>
                        }
                    </Grid>
                </Grid>
            </ThemeProvider>

        )
    }
}

export default withStyles(styles)(Agrupaciones);