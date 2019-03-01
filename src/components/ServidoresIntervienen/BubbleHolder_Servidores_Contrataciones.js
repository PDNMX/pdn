import React from "react";
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid/Grid";
import BubbleChart from '../Charts/bubbles/BubbleChart';
import Bubbles from '../Charts/bubbles/Bubbles';
import {createNodes} from './utils';
import rp from "request-promise";
import {width, height, center} from './bubbles_constants'
import TablaDetalle from "./TablaDetalle";

// Styles
const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: '53px'
    },
    item: {
        maxWidth: '1024px'
    },
    title: {
        color: theme.palette.textPrincipal.color,
        fontSize: 20,
        textDecoration: 'underline',
        textDecorationColor: theme.palette.secondary.main,
        textUnderlinePosition: 'under'
    },
    font: {
        color: theme.palette.textPrincipal.color
    },
    center: {
        textAlign: 'center'
    },
    scroll: {
        overflowX: 'scroll'
    }
});

class BubbleHolder_Servidores_Contrataciones extends React.Component {
    state = {
        data: [],
        type: 'servidores',
        originalData: [],
        institucion: null,

    };

    componentDidMount() {
        this.getData();
    }

    getData() {
        let options = {
            uri: this.state.type === 'servidores' ? ' https://plataformadigitalnacional.org/api/servidores_contrataciones' : 'https://plataformadigitalnacional.org/api/provinha_dependencia',
            json: true
        };
        rp(options)
            .then(data => {
                let aux = JSON.parse(JSON.stringify(data));
                this.setState({
                    data: createNodes(aux, this.state.type),
                    originalData: data,
                });
            })
            .catch(err => {
                alert("_No se pudo obtener la información");
                console.log(err);
            });
    }

    onTypeChanged = (newType) => {
        if (this.state.type !== newType) {
            this.setState({
                type: newType,
                institucion: null
            }, () => {
                this.getData();
            });

        }
    };

    selectBubble = (bubble) => {
        this.setState({institucion: this.state.type !== 'servidores' ? bubble.dependencia : bubble.institucion});
        window.location.href = "#tablaDetalle";
    };

    render() {
        const {classes} = this.props;
        const {data, type} = this.state;
        return (
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant={"display1"} className={classes.title} paragraph>
                            Total de {this.state.type} por institución
                        </Typography>
                        {type === 'servidores' &&
                        <Typography variant={"subheading"} className={classes.font}>{
                            '¿Cuáles son las instituciones con más servidores públicos facultados para intervenir en procesos de contratación?'}
                        </Typography>
                        }

                        {type === 'sanciones' &&
                        <Typography variant={"subheading"} className={classes.font}>{
                            '¿Cuáles son las instituciones con mayor número de sanciones en procesos de contratación?'}
                        </Typography>
                        }
                        {type === 'monto' &&
                        <Typography variant={"subheading"} className={classes.font}>{
                            '¿Cuáles son las instituciones con mayor monto impuesto como sanción en procesos de contratación?'}
                        </Typography>
                        }
                    </Grid>
                </Grid>

                <Grid container spacing={0} justify={"center"}>
                    <Grid item xs={12} align="center" style={{overflowX: 'scroll'}}>
                        <BubbleChart width={width} height={height} style={{overflowX: 'scroll'}}>
                            <Bubbles data={data} forceStrength={0.3} center={center} type={type} style={{overflowX: 'scroll'}}
                                     selectBubble={this.selectBubble}/>
                        </BubbleChart>
                    </Grid>
                    <Grid item xs={12} id="tablaDetalle" style={{overflowX: 'auto'}}>
                        {this.state.institucion &&
                        <TablaDetalle institucion={this.state.institucion}/>
                        }
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(BubbleHolder_Servidores_Contrataciones);